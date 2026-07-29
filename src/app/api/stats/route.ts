import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total_songs: 8,
    decades: ['1980s', '1990s', '2000s', '2010s', '2020s'],
    genres: ['Pop', 'Rock', 'Hip-Hop', 'Mandopop', 'Cantopop', 'Electronic'],
    languages: ['zh', 'en'],
    bpm_range: '160-170',
    validation_method: '4-gate (Spotify 2× + cross-reference)',
    update_schedule: 'Every Sunday 2:00 AM MYT',
    status: 'building',
    message: 'Library growing week by week. Real data coming with Supabase + Spotify integration.',
  });
}
