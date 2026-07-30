// Cadence Crate — 32 songs, all verified (SongBPM, Tunebat, or user tap-test)
// BPM validation: direct 160-175, or double-time 80-87.5 (×2 → 160-175)
// Single source of truth for all pages

export interface SongData {
  id: string; title: string; artist: string; album: string; bpm: number;
  decade: string; language: string; year: number; genres: string[];
  energy: number; danceability: number; valence: number; audio_url: string | null;
  note?: string;
}

const songs: SongData[] = [
  // ===== 1-20: Previously verified =====
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

  // ===== 21-32: Jerrison tap-verified =====
  { id: '21', title: '告五人 — 又到天黑', artist: '告五人', album: 'Unknown', bpm: 160, decade: '2020s', language: 'zh', year: 2023, genres: ['Mandopop', 'Indie'], energy: 0.65, danceability: 0.5, valence: 0.45, audio_url: '/audio/44.mp3', note: 'Tap-verified ✅' },
  { id: '22', title: 'Jay Chou & Gary Yang — 我要夏天', artist: 'Jay Chou, Gary Yang', album: 'Unknown', bpm: 162, decade: '2010s', language: 'zh', year: 2016, genres: ['Mandopop'], energy: 0.75, danceability: 0.55, valence: 0.7, audio_url: '/audio/45.mp3', note: 'Tap-verified ✅' },
  { id: '23', title: '告五人 — 就說你想說的', artist: '告五人', album: 'Unknown', bpm: 164, decade: '2020s', language: 'zh', year: 2023, genres: ['Mandopop', 'Indie'], energy: 0.68, danceability: 0.52, valence: 0.5, audio_url: '/audio/46.mp3', note: 'Tap-verified ✅' },
  { id: '24', title: 'SKAI ISYOURGOD & AR劉夫陽 — 大展鴻圖', artist: 'SKAI ISYOURGOD, AR劉夫陽', album: 'Unknown', bpm: 175, decade: '2020s', language: 'zh', year: 2024, genres: ['Hip Hop', 'Mandopop'], energy: 0.85, danceability: 0.7, valence: 0.6, audio_url: '/audio/47.mp3', note: 'Tap-verified ✅' },
  { id: '25', title: '告五人 — 黑夜狂奔', artist: '告五人', album: 'Unknown', bpm: 167, decade: '2020s', language: 'zh', year: 2023, genres: ['Mandopop', 'Indie'], energy: 0.7, danceability: 0.5, valence: 0.45, audio_url: '/audio/48.mp3', note: 'Tap-verified ✅' },
  { id: '26', title: 'My Chemical Romance — I Don\'t Love You', artist: 'My Chemical Romance', album: 'The Black Parade', bpm: 170, decade: '2000s', language: 'en', year: 2006, genres: ['Rock', 'Emo'], energy: 0.82, danceability: 0.42, valence: 0.3, audio_url: '/audio/49.mp3', note: 'Tap-verified ✅' },
  { id: '27', title: 'Electric Light Orchestra — Mr. Blue Sky', artist: 'Electric Light Orchestra', album: 'Out of the Blue', bpm: 175, decade: '1970s', language: 'en', year: 1977, genres: ['Rock', 'Pop'], energy: 0.75, danceability: 0.55, valence: 0.9, audio_url: '/audio/50.mp3', note: 'Tap-verified ✅' },
  { id: '28', title: '告五人 — 好不容易', artist: '告五人', album: 'Unknown', bpm: 175, decade: '2020s', language: 'zh', year: 2023, genres: ['Mandopop', 'Indie'], energy: 0.65, danceability: 0.5, valence: 0.55, audio_url: '/audio/51.mp3', note: 'Tap-verified ✅' },
  { id: '29', title: 'Coldplay — Yellow', artist: 'Coldplay', album: 'Parachutes', bpm: 175, decade: '2000s', language: 'en', year: 2000, genres: ['Rock', 'Alternative'], energy: 0.66, danceability: 0.43, valence: 0.28, audio_url: '/audio/52.mp3', note: 'Tap-verified ✅' },
  { id: '30', title: 'Linkin Park — Somewhere I Belong', artist: 'Linkin Park', album: 'Meteora', bpm: 162, decade: '2000s', language: 'en', year: 2003, genres: ['Rock', 'Nu Metal'], energy: 0.9, danceability: 0.4, valence: 0.38, audio_url: '/audio/53.mp3', note: 'Tap-verified ✅' },
  { id: '31', title: 'Jay Chou — 浪漫手機', artist: 'Jay Chou', album: 'November\'s Chopin', bpm: 170, decade: '2000s', language: 'zh', year: 2005, genres: ['Mandopop'], energy: 0.55, danceability: 0.5, valence: 0.55, audio_url: '/audio/54.mp3', note: 'Tap-verified ✅' },
  { id: '32', title: 'Green Day — 21 Guns', artist: 'Green Day', album: '21st Century Breakdown', bpm: 160, decade: '2000s', language: 'en', year: 2009, genres: ['Rock', 'Punk'], energy: 0.72, danceability: 0.38, valence: 0.35, audio_url: '/audio/55.mp3', note: 'Tap-verified ✅' },
];

export default songs;
