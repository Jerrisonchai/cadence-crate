'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

// --- Types ---

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  bpm: number;
  year?: number;
  language: string;
  genres: string[];
  audio_url: string | null;
  decade?: string;
  energy?: number;
  danceability?: number;
  valence?: number;
}

export type RunMode = 'browse' | 'favorites';

interface PlayerState {
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  mode: RunMode;
}

interface PlayerControls {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  goToSong: (index: number) => void;
  setPlaylist: (songs: Song[], mode: RunMode) => void;
}

interface MusicPlayerContextValue {
  state: PlayerState;
  controls: PlayerControls;
  currentSong: Song | null;
}

// --- Context ---

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  return ctx;
}

// --- Provider ---

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef<PlayerState>({
    playlist: [],
    currentIndex: 0,
    isPlaying: false,
    mode: 'browse',
  });

  const [state, setState] = useState<PlayerState>({
    playlist: [],
    currentIndex: 0,
    isPlaying: false,
    mode: 'browse',
  });

  // Keep ref in sync
  stateRef.current = state;

  const currentSong: Song | null = state.playlist[state.currentIndex] || null;

  // --- Audio lifecycle: create once, swap src on song change ---

  // Create audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    // Auto-advance on song end
    const onEnded = () => {
      const s = stateRef.current;
      if (s.playlist.length <= 1) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        const nextIdx = (s.currentIndex + 1) % s.playlist.length;
        const nextSong = s.playlist[nextIdx];
        if (nextSong?.audio_url) {
          setState((prev) => ({ ...prev, currentIndex: nextIdx }));
          // Song change happens in the effect below
        }
      }
    };
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
      audio.remove();
      audioRef.current = null;
    };
  }, []);

  // When currentIndex or playlist changes, swap audio src
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const song = state.playlist[state.currentIndex];
    if (!song?.audio_url) return;

    const wasPlaying = !audio.paused;
    audio.src = song.audio_url;
    audio.load();

    // Resume playing if it was playing before (handles song changes)
    if (state.isPlaying || wasPlaying) {
      audio.play().catch(() => {});
    }

    // Media Session
    if ('mediaSession' in navigator) {
      const ms = (navigator as any).mediaSession;
      ms.metadata = new (window as any).MediaMetadata({
        title: song.title,
        artist: song.artist,
        album: song.album || '',
        artwork: [{ src: '/favicon.ico', sizes: '96x96', type: 'image/x-icon' }],
      });
    }
  }, [state.currentIndex, state.playlist]);

  // --- Controls ---

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    audio.play().catch(() => {});
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (stateRef.current.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [play, pause]);

  const next = useCallback(() => {
    const s = stateRef.current;
    if (s.playlist.length === 0) return;
    const nextIdx = (s.currentIndex + 1) % s.playlist.length;
    setState((prev) => ({ ...prev, currentIndex: nextIdx }));
    // Audio src swap + play happens in the effect
  }, []);

  const prev = useCallback(() => {
    const s = stateRef.current;
    if (s.playlist.length === 0) return;
    const prevIdx = (s.currentIndex - 1 + s.playlist.length) % s.playlist.length;
    setState((prevState) => ({ ...prevState, currentIndex: prevIdx }));
  }, []);

  const goToSong = useCallback((index: number) => {
    const s = stateRef.current;
    if (index < 0 || index >= s.playlist.length) return;
    setState((prevState) => ({ ...prevState, currentIndex: index }));
  }, []);

  const setPlaylist = useCallback((songs: Song[], mode: RunMode) => {
    setState({
      playlist: songs,
      currentIndex: 0,
      isPlaying: true, // Auto-play when playlist is set
      mode,
    });
    // Audio will be set up by the playlist/index effect
  }, []);

  // Media Session actions
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const ms = (navigator as any).mediaSession;
    ms.setActionHandler?.('previoustrack', prev);
    ms.setActionHandler?.('nexttrack', next);
    ms.setActionHandler?.('play', play);
    ms.setActionHandler?.('pause', pause);
  }, [play, pause, next, prev]);

  return (
    <MusicPlayerContext.Provider
      value={{
        state,
        controls: { play, pause, togglePlay, next, prev, goToSong, setPlaylist },
        currentSong,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}
