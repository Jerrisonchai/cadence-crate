// Shared song catalog for Cadence Crate
// Single source of truth — used by HomeContent, song detail, favorites, and Run Mode pages
// Updated by the weekly collector cron

export interface SongData {
  id: string;
  title: string;
  artist: string;
  album: string;
  bpm: number;
  decade: string;
  language: string;
  year: number;
  genres: string[];
  energy: number;
  danceability: number;
  valence: number;
  audio_url: string | null;
}

const songs: SongData[] = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: 'November\'s Chopin', bpm: 168, decade: '2000s', language: 'zh', year: 2005, genres: ["Pop", "Mandopop"], energy: 0.72, danceability: 0.45, valence: 0.38, audio_url: '/audio/1.mp3' },
  { id: '2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', bpm: 165, decade: '2000s', language: 'zh', year: 2003, genres: ["Pop", "Mandopop"], energy: 0.68, danceability: 0.52, valence: 0.41, audio_url: '/audio/2.mp3' },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', bpm: 171, decade: '2020s', language: 'en', year: 2020, genres: ["Pop", "Electronic"], energy: 0.8, danceability: 0.5, valence: 0.38, audio_url: '/audio/3.mp3' },
  { id: '4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', bpm: 169, decade: '1980s', language: 'en', year: 1985, genres: ["Pop", "Rock"], energy: 0.86, danceability: 0.57, valence: 0.85, audio_url: '/audio/4.mp3' },
  { id: '5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', bpm: 162, decade: '2000s', language: 'zh', year: 2008, genres: ["Pop", "Mandopop"], energy: 0.55, danceability: 0.6, valence: 0.72, audio_url: '/audio/5.mp3' },
  { id: '6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', bpm: 169, decade: '2000s', language: 'zh', year: 2001, genres: ["Pop", "Mandopop"], energy: 0.62, danceability: 0.48, valence: 0.65, audio_url: '/audio/6.mp3' },
  { id: '7', title: 'Don\'t Stop Believin\'', artist: 'Journey', album: 'Escape', bpm: 160, decade: '1980s', language: 'en', year: 1981, genres: ["Rock"], energy: 0.74, danceability: 0.49, valence: 0.33, audio_url: '/audio/7.mp3' },
  { id: '8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', bpm: 165, decade: '1980s', language: 'en', year: 1985, genres: ["Pop", "Rock"], energy: 0.56, danceability: 0.63, valence: 0.2, audio_url: '/audio/8.mp3' },
  { id: '9', title: 'Taylor Swift — Shake It Off', artist: 'Taylor Swift', album: 'Unknown', bpm: 160.0, decade: '2010s', language: 'en', year: 2015, genres: ["Pop"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/9.mp3' },
  { id: '10', title: 'Jimmy Eat World — The Middle', artist: 'Jimmy Eat World', album: 'Unknown', bpm: 162.0, decade: '2000s', language: 'en', year: 2005, genres: ["Rock"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/10.mp3' },
  { id: '11', title: 'Simple Plan — I\'d Do Anything', artist: 'Simple Plan', album: 'Unknown', bpm: 169.0, decade: '2000s', language: 'en', year: 2005, genres: ["Rock"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/11.mp3' },
  { id: '12', title: 'Pharrell Williams — Happy', artist: 'Pharrell Williams', album: 'Unknown', bpm: 160.0, decade: '2010s', language: 'en', year: 2015, genres: ["Pop"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/12.mp3' },
  { id: '13', title: 'The Black Keys — Lonely Boy', artist: 'The Black Keys', album: 'Unknown', bpm: 166.0, decade: '2010s', language: 'en', year: 2015, genres: ["Rock"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/13.mp3' },
  { id: '14', title: '周杰伦 - 乱舞春秋', artist: '周杰伦', album: 'Unknown', bpm: 158.3, decade: '2000s', language: 'zh', year: 2005, genres: ["Mandopop"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/14.mp3' },
  { id: '15', title: '萧敬腾 - 王妃', artist: '萧敬腾', album: 'Unknown', bpm: 162.5, decade: '2000s', language: 'zh', year: 2005, genres: ["Mandopop"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/15.mp3' },
  { id: '16', title: '周杰伦 - 爷爷泡的茶', artist: '周杰伦', album: 'Unknown', bpm: 169.4, decade: '2000s', language: 'zh', year: 2005, genres: ["Mandopop"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/16.mp3' },
  { id: '17', title: '周杰伦 - 蛇舞', artist: '周杰伦', album: 'Unknown', bpm: 171.8, decade: '2000s', language: 'zh', year: 2005, genres: ["Mandopop"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/17.mp3' },
  { id: '18', title: '萧亚轩 - 爱的主打歌', artist: '萧亚轩', album: 'Unknown', bpm: 171.8, decade: '2000s', language: 'zh', year: 2005, genres: ["Mandopop"], energy: 0.6, danceability: 0.5, valence: 0.5, audio_url: '/audio/18.mp3' },
];

export default songs;
