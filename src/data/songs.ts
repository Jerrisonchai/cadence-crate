// Cadence Crate — 20 verified songs (160-175 BPM effective)
// BPM validation: direct 160-175, or double-time 80-87.5 (×2 → 160-175)
// All values verified via SongBPM, Tunebat, or user tap-test
// numpy/scipy onset detection: ABANDONED (unreliable on pop arrangements)
// Single source of truth for all pages

export interface SongData {
  id: string; title: string; artist: string; album: string; bpm: number;
  decade: string; language: string; year: number; genres: string[];
  energy: number; danceability: number; valence: number; audio_url: string | null;
  note?: string;  // e.g. "Double-time" for half-time songs counted at 2×
}

const songs: SongData[] = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: 'November\'s Chopin', bpm: 175, decade: '2000s', language: 'zh', year: 2005, genres: ['Mandopop', 'Pop'], energy: 0.72, danceability: 0.45, valence: 0.38, audio_url: '/audio/1.mp3' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', bpm: 171, decade: '2020s', language: 'en', year: 2020, genres: ['Pop', 'Electronic'], energy: 0.8, danceability: 0.5, valence: 0.38, audio_url: '/audio/3.mp3' },
  { id: '3', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', bpm: 169, decade: '1980s', language: 'en', year: 1985, genres: ['Pop', 'Rock'], energy: 0.86, danceability: 0.57, valence: 0.85, audio_url: '/audio/4.mp3' },
  { id: '4', title: 'Taylor Swift — Shake It Off', artist: 'Taylor Swift', album: '1989', bpm: 160, decade: '2010s', language: 'en', year: 2014, genres: ['Pop'], energy: 0.8, danceability: 0.65, valence: 0.94, audio_url: '/audio/9.mp3' },
  { id: '5', title: 'Jimmy Eat World — The Middle', artist: 'Jimmy Eat World', album: 'Bleed American', bpm: 162, decade: '2000s', language: 'en', year: 2001, genres: ['Rock'], energy: 0.78, danceability: 0.48, valence: 0.65, audio_url: '/audio/10.mp3' },
  { id: '6', title: 'Simple Plan — I\'d Do Anything', artist: 'Simple Plan', album: 'No Pads, No Helmets…', bpm: 169, decade: '2000s', language: 'en', year: 2002, genres: ['Rock'], energy: 0.85, danceability: 0.42, valence: 0.55, audio_url: '/audio/11.mp3' },
  { id: '7', title: 'Pharrell Williams — Happy', artist: 'Pharrell Williams', album: 'G I R L', bpm: 160, decade: '2010s', language: 'en', year: 2013, genres: ['Pop', 'Funk'], energy: 0.82, danceability: 0.65, valence: 0.96, audio_url: '/audio/12.mp3' },
  { id: '8', title: 'The Black Keys — Lonely Boy', artist: 'The Black Keys', album: 'El Camino', bpm: 166, decade: '2010s', language: 'en', year: 2011, genres: ['Rock'], energy: 0.8, danceability: 0.5, valence: 0.7, audio_url: '/audio/13.mp3' },
  { id: '9', title: 'We The Kings — Check Yes Juliet', artist: 'We The Kings', album: 'We The Kings', bpm: 167, decade: '2000s', language: 'en', year: 2007, genres: ['Rock', 'Pop Punk'], energy: 0.85, danceability: 0.45, valence: 0.65, audio_url: '/audio/24.mp3' },
  { id: '10', title: 'Panic! At The Disco — I Write Sins Not Tragedies', artist: 'Panic! At The Disco', album: 'A Fever You Can\'t Sweat Out', bpm: 170, decade: '2000s', language: 'en', year: 2005, genres: ['Rock', 'Emo'], energy: 0.82, danceability: 0.42, valence: 0.55, audio_url: '/audio/25.mp3' },
  { id: '11', title: 'Avril Lavigne — Girlfriend', artist: 'Avril Lavigne', album: 'The Best Damn Thing', bpm: 164, decade: '2000s', language: 'en', year: 2007, genres: ['Pop', 'Rock'], energy: 0.9, danceability: 0.55, valence: 0.85, audio_url: '/audio/26.mp3' },
  { id: '12', title: 'New Found Glory — Hit Or Miss', artist: 'New Found Glory', album: 'Nothing Gold Can Stay', bpm: 175, decade: '1990s', language: 'en', year: 1999, genres: ['Rock', 'Pop Punk'], energy: 0.92, danceability: 0.4, valence: 0.6, audio_url: '/audio/27.mp3' },
  { id: '13', title: 'Motion City Soundtrack — Everything Is Alright', artist: 'Motion City Soundtrack', album: 'Commit This to Memory', bpm: 161, decade: '2000s', language: 'en', year: 2005, genres: ['Rock', 'Pop Punk'], energy: 0.88, danceability: 0.48, valence: 0.7, audio_url: '/audio/28.mp3' },
  { id: '14', title: 'Paramore — Misery Business', artist: 'Paramore', album: 'Riot!', bpm: 173, decade: '2000s', language: 'en', year: 2007, genres: ['Rock', 'Pop Punk'], energy: 0.92, danceability: 0.45, valence: 0.6, audio_url: '/audio/19.mp3' },
  { id: '15', title: 'Yellowcard — Ocean Avenue', artist: 'Yellowcard', album: 'Ocean Avenue', bpm: 174, decade: '2000s', language: 'en', year: 2003, genres: ['Rock', 'Pop Punk'], energy: 0.88, danceability: 0.42, valence: 0.55, audio_url: '/audio/20.mp3' },
  { id: '16', title: 'Foo Fighters — The Pretender', artist: 'Foo Fighters', album: 'Echoes, Silence, Patience & Grace', bpm: 173, decade: '2000s', language: 'en', year: 2007, genres: ['Rock'], energy: 0.9, danceability: 0.4, valence: 0.5, audio_url: '/audio/21.mp3' },
  { id: '17', title: 'Twenty One Pilots — Stressed Out', artist: 'Twenty One Pilots', album: 'Blurryface', bpm: 170, decade: '2010s', language: 'en', year: 2015, genres: ['Alternative', 'Hip Hop'], energy: 0.64, danceability: 0.72, valence: 0.5, audio_url: '/audio/22.mp3' },
  { id: '18', title: 'Eminem — Lose Yourself', artist: 'Eminem', album: '8 Mile Soundtrack', bpm: 171, decade: '2000s', language: 'en', year: 2002, genres: ['Hip Hop'], energy: 0.86, danceability: 0.68, valence: 0.45, audio_url: '/audio/23.mp3' },
  { id: '19', title: '周杰伦 — 乱舞春秋', artist: '周杰伦', album: '七里香', bpm: 170, decade: '2000s', language: 'zh', year: 2004, genres: ['Mandopop'], energy: 0.7, danceability: 0.55, valence: 0.5, audio_url: '/audio/14.mp3', note: 'Double-time (85→170 BPM)' },
  { id: '20', title: '周杰伦 — 爷爷泡的茶', artist: '周杰伦', album: '八度空间', bpm: 168, decade: '2000s', language: 'zh', year: 2002, genres: ['Mandopop'], energy: 0.65, danceability: 0.55, valence: 0.65, audio_url: '/audio/16.mp3', note: 'Double-time (84→168 BPM)' },
];

export default songs;
