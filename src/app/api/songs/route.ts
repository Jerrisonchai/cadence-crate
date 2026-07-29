import { NextResponse } from 'next/server';

// Placeholder — will be replaced with Supabase queries
const ALL_SONGS = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', bpm: 168, release_year: 2005, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 222000, energy: 0.72, danceability: 0.65, valence: 0.48 },
  { id: '2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', bpm: 165, release_year: 2003, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 269000, energy: 0.68, danceability: 0.55, valence: 0.52 },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', bpm: 171, release_year: 2020, language: 'en', genres: ['Pop', 'Electronic'], duration_ms: 200000, energy: 0.80, danceability: 0.51, valence: 0.38 },
  { id: '4', title: 'Take On Me', artist: 'a-ha', bpm: 169, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 225000, energy: 0.86, danceability: 0.57, valence: 0.86 },
  { id: '5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', bpm: 162, release_year: 2008, language: 'zh', genres: ['Mandopop'], duration_ms: 223000, energy: 0.55, danceability: 0.62, valence: 0.65 },
  { id: '6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', bpm: 169, release_year: 2001, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 270000, energy: 0.62, danceability: 0.58, valence: 0.72 },
  { id: '7', title: "Don't Stop Believin'", artist: 'Journey', bpm: 160, release_year: 1981, language: 'en', genres: ['Rock'], duration_ms: 251000, energy: 0.74, danceability: 0.43, valence: 0.32 },
  { id: '8', title: 'Running Up That Hill', artist: 'Kate Bush', bpm: 165, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 298000, energy: 0.56, danceability: 0.63, valence: 0.20 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const decade = searchParams.get('decade');
  const genre = searchParams.get('genre');
  const lang = searchParams.get('lang');
  const sort = searchParams.get('sort') || 'bpm_desc';
  const q = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');

  let results = [...ALL_SONGS];

  // Filter by decade
  if (decade) {
    const startYear = parseInt(decade);
    results = results.filter(
      (s) => s.release_year >= startYear && s.release_year < startYear + 10
    );
  }

  // Filter by genre
  if (genre) {
    results = results.filter((s) =>
      s.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
  }

  // Filter by language
  if (lang) {
    results = results.filter((s) => s.language === lang);
  }

  // Text search
  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.artist.toLowerCase().includes(query)
    );
  }

  // Sort
  switch (sort) {
    case 'bpm_desc':
      results.sort((a, b) => b.bpm - a.bpm);
      break;
    case 'bpm_asc':
      results.sort((a, b) => a.bpm - b.bpm);
      break;
    case 'newest':
      results.sort((a, b) => b.release_year - a.release_year);
      break;
    case 'title_asc':
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  // Pagination
  const total = results.length;
  const offset = (page - 1) * limit;
  const paginated = results.slice(offset, offset + limit);

  return NextResponse.json({
    songs: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
