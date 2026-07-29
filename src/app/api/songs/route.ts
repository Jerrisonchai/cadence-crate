import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const decade = searchParams.get('decade');
  const genre = searchParams.get('genre');
  const language = searchParams.get('lang');
  const sort = searchParams.get('sort') || 'bpm_desc';
  const q = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const offset = (page - 1) * limit;

  try {
    const supabase = await createClient();

    let query = supabase.from('songs').select('*', { count: 'exact' });

    // Decade filter
    if (decade) {
      const startYear = parseInt(decade);
      query = query.gte('release_year', startYear).lt('release_year', startYear + 10);
    }

    // Genre filter (GIN array containment)
    if (genre) {
      query = query.contains('genres', [genre]);
    }

    // Language filter
    if (language) {
      query = query.eq('language', language);
    }

    // Text search
    if (q) {
      query = query.or(`title.ilike.%${q}%,artist.ilike.%${q}%,album.ilike.%${q}%`);
    }

    // Sort
    switch (sort) {
      case 'bpm_asc':    query = query.order('bpm', { ascending: true }); break;
      case 'bpm_desc':   query = query.order('bpm', { ascending: false }); break;
      case 'newest':     query = query.order('release_year', { ascending: false }); break;
      case 'title_asc':  query = query.order('title', { ascending: true }); break;
      default:           query = query.order('bpm', { ascending: false });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

    return NextResponse.json({
      songs: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: (offset + limit) < (count || 0),
    });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
