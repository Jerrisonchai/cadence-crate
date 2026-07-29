-- Cadence Crate Database Schema
-- Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- songs: The core table — verified 160-170 BPM running tracks
-- ============================================================
CREATE TABLE IF NOT EXISTS songs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spotify_id    TEXT UNIQUE NOT NULL,              -- Spotify track ID
  title         TEXT NOT NULL,
  artist        TEXT NOT NULL,
  album         TEXT,
  album_art_url TEXT,                              -- Spotify album cover (640px)

  -- BPM (THE key field)
  bpm           DECIMAL(5,1) NOT NULL,             -- e.g., 168.2
  bpm_confidence TEXT NOT NULL DEFAULT 'medium',   -- 'high' | 'medium' | 'low'

  -- Spotify metadata
  release_year  INTEGER,                           -- e.g., 2005
  language      TEXT,                              -- 'zh' | 'en' | null
  genres        TEXT[] DEFAULT '{}',               -- array: ['Mandopop','Pop']
  duration_ms   INTEGER,                           -- track length in ms
  preview_url   TEXT,                              -- 30s Spotify preview

  -- Audio features (Spotify)
  energy        DECIMAL(3,2),                      -- 0.00–1.00
  danceability  DECIMAL(3,2),
  valence       DECIMAL(3,2),
  acousticness  DECIMAL(5,4),
  instrumentalness DECIMAL(5,4),

  -- Validation
  spotify_bpm_1 DECIMAL(5,1),                      -- first query result
  spotify_bpm_2 DECIMAL(5,1),                      -- 24h re-query result
  tunebat_bpm   DECIMAL(5,1),                      -- cross-reference
  validation_method TEXT,                           -- 'spotify_2x+tunebat' | 'spotify_2x' | 'spotify_1x'

  -- Collection metadata
  collection_phase TEXT,                            -- '1980s-zh' | '1990s-en' | etc.
  collection_batch INTEGER DEFAULT 1,              -- batch number within phase

  -- Timestamps
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- pending_songs: Gate 2 staging table
-- Songs that passed Gate 1 but need 24h re-validation
-- ============================================================
CREATE TABLE IF NOT EXISTS pending_songs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spotify_id    TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  artist        TEXT NOT NULL,
  album         TEXT,
  album_art_url TEXT,
  bpm           DECIMAL(5,1) NOT NULL,
  release_year  INTEGER,
  language      TEXT,
  genres        TEXT[] DEFAULT '{}',
  duration_ms   INTEGER,
  preview_url   TEXT,
  energy        DECIMAL(3,2),
  danceability  DECIMAL(3,2),
  valence       DECIMAL(3,2),
  spotify_bpm_1 DECIMAL(5,1),
  collection_phase TEXT,

  -- Gate 2 status
  validated_at  TIMESTAMPTZ,                       -- when second query done
  bpm_match     BOOLEAN,                           -- did 2nd query match ±0.5?
  promoted      BOOLEAN DEFAULT FALSE,             -- promoted to songs table?

  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- collection_log: Track every cron run
-- ============================================================
CREATE TABLE IF NOT EXISTS collection_log (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phase         TEXT NOT NULL,                      -- '1980s-zh', '1990s-en', etc.
  searched      INTEGER DEFAULT 0,                 -- tracks searched
  candidates    INTEGER DEFAULT 0,                 -- passed Gate 1
  validated     INTEGER DEFAULT 0,                 -- passed Gate 2
  cross_refd    INTEGER DEFAULT 0,                 -- passed Gate 3
  inserted      INTEGER DEFAULT 0,                 -- new songs added
  avg_bpm       DECIMAL(5,1),
  errors        JSONB DEFAULT '[]',                -- error log
  run_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- quotes: Runner inspiration quotes
-- ============================================================
CREATE TABLE IF NOT EXISTS quotes (
  id            SERIAL PRIMARY KEY,
  quote         TEXT NOT NULL,
  author        TEXT NOT NULL,
  language      TEXT DEFAULT 'en',
  active        BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_songs_bpm ON songs(bpm);
CREATE INDEX IF NOT EXISTS idx_songs_language ON songs(language);
CREATE INDEX IF NOT EXISTS idx_songs_release_year ON songs(release_year);
CREATE INDEX IF NOT EXISTS idx_songs_genres ON songs USING GIN(genres);
CREATE INDEX IF NOT EXISTS idx_songs_created_at ON songs(created_at);
CREATE INDEX IF NOT EXISTS idx_pending_spotify_id ON pending_songs(spotify_id);
CREATE INDEX IF NOT EXISTS idx_collection_log_run_at ON collection_log(run_at);

-- ============================================================
-- Triggers: Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_songs_updated_at ON songs;
CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON songs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- RLS: Public read, service-role write
-- ============================================================
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Public can read active songs
CREATE POLICY "Public read songs" ON songs
  FOR SELECT USING (true);

-- Service role full access (for cron scripts)
-- (applied via supabase service_role key in collector scripts)

-- ============================================================
-- Seed data: Runner quotes
-- ============================================================
INSERT INTO quotes (quote, author) VALUES
  ('No human is limited.', 'Eliud Kipchoge'),
  ('The pain of running relieves the pain of living.', 'Jacqueline Simon Gunn'),
  ('Run when you can, walk if you have to, crawl if you must; just never give up.', 'Dean Karnazes'),
  ('Every day is a good day when you run.', 'Kevin Nelson'),
  ('Your body will argue that there is no justifiable reason to continue. Your only recourse is to call on your spirit.', 'Tim Noakes'),
  ('I run because long after my footprints fade away, maybe I will have inspired a few to reject the easy path.', 'Dean Karnazes'),
  ('Don''t dream of winning. Train for it.', 'Mo Farah'),
  ('The miracle isn''t that I finished. The miracle is that I had the courage to start.', 'John Bingham'),
  ('Running is about finding your inner peace, and so is a life well lived.', 'Dean Karnazes'),
  ('One run can change your day. Many runs can change your life.', 'Unknown'),
  ('吃不了训练的苦，就要吃比赛的苦。', '中国跑者'),
  ('人生就是一场马拉松。', '中国谚语'),
  ('每一步都算数。', '跑者格言'),
  ('不只跑得快，更要跑得远。', '马拉松精神'),
  ('坚持就是胜利。', '跑步哲学')
ON CONFLICT DO NOTHING;

-- ============================================================
-- Sample song (for dev — remove before production)
-- ============================================================
-- INSERT INTO songs (spotify_id, title, artist, album, bpm, bpm_confidence, release_year, language, genres, duration_ms, energy, danceability, valence, validation_method, collection_phase)
-- VALUES ('4pb7mM6MZANmg1l1VVplvh', '夜曲', 'Jay Chou', 'November''s Chopin', 168.2, 'high', 2005, 'zh', ARRAY['Mandopop', 'Pop'], 222000, 0.72, 0.45, 0.38, 'spotify_2x+tunebat', '2000s-zh');
