-- JumpStart video program: content catalog, per-user progress, and purchase records.
-- Run this in the Supabase SQL Editor (or `supabase db push` if you use the CLI).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- program_content: the day-by-day catalog for any program (jumpstart, future
-- programs use the same table via a different program_slug).
-- ---------------------------------------------------------------------------
create table if not exists program_content (
  id uuid primary key default gen_random_uuid(),
  program_slug text not null,
  day_number smallint not null,
  title text not null,
  duration_seconds integer not null,
  video_embed_url text,
  description text,
  sort_order smallint not null,
  created_at timestamptz not null default now(),
  unique (program_slug, day_number)
);

alter table program_content enable row level security;

drop policy if exists "program_content_public_read" on program_content;
create policy "program_content_public_read"
  on program_content for select
  using (true);

-- ---------------------------------------------------------------------------
-- user_progress: one row per buyer per program day. Mood is a 1-5 scale
-- captured immediately before and after the session.
-- ---------------------------------------------------------------------------
create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_slug text not null,
  day_number smallint not null,
  mood_before smallint check (mood_before between 1 and 5),
  mood_after smallint check (mood_after between 1 and 5),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, program_slug, day_number)
);

alter table user_progress enable row level security;

drop policy if exists "user_progress_select_own" on user_progress;
create policy "user_progress_select_own"
  on user_progress for select
  using (auth.uid() = user_id);

drop policy if exists "user_progress_insert_own" on user_progress;
create policy "user_progress_insert_own"
  on user_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "user_progress_update_own" on user_progress;
create policy "user_progress_update_own"
  on user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- purchases: written ONLY by the Stripe webhook using the service-role key.
-- No client-side insert/update policy exists on purpose — the client can only
-- ever read its own row, matched by the authenticated user's email.
-- ---------------------------------------------------------------------------
create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  program_slug text not null,
  stripe_session_id text unique,
  stripe_customer_id text,
  amount_cents integer,
  created_at timestamptz not null default now()
);

alter table purchases enable row level security;

drop policy if exists "purchases_select_own" on purchases;
create policy "purchases_select_own"
  on purchases for select
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = lower(email));

create index if not exists idx_purchases_email_program on purchases (lower(email), program_slug);
create index if not exists idx_user_progress_user_program on user_progress (user_id, program_slug);
create index if not exists idx_program_content_slug on program_content (program_slug, day_number);

-- ---------------------------------------------------------------------------
-- Seed: JumpStart, 14 days. video_embed_url is left null until the real
-- Vimeo links are uploaded (see README/manual steps).
-- ---------------------------------------------------------------------------
insert into program_content
  (program_slug, day_number, title, duration_seconds, video_embed_url, description, sort_order)
values
  ('jumpstart', 1,  'Foundation: First Moves',      75,  null, 'A short, gentle first session to support your mood and get you moving.', 1),
  ('jumpstart', 2,  'Foundation: Find Your Base',    60,  null, 'Simple movement to settle in and build a steady base.', 2),
  ('jumpstart', 3,  'Foundation: Steady Start',      90,  null, 'A little longer today — keep it easy and consistent.', 3),
  ('jumpstart', 4,  'Rhythm: Get Moving',           120,  null, 'We start finding a rhythm — nothing complicated, just movement.', 4),
  ('jumpstart', 5,  'Rhythm: Build the Beat',       150,  null, 'A bit more flow today to support your mood and energy.', 5),
  ('jumpstart', 6,  'Rhythm: Stay With It',         165,  null, 'Consistency over intensity — stay with the rhythm.', 6),
  ('jumpstart', 7,  'Rhythm: Full Flow',            180,  null, 'One week in — a fuller session to bring it together.', 7),
  ('jumpstart', 8,  'Build: Intervals Begin',       180,  null, 'Short intervals introduced — work, rest, repeat.', 8),
  ('jumpstart', 9,  'Build: Push the Pace',         195,  null, 'A little more pace today, still at your own effort.', 9),
  ('jumpstart', 10, 'Build: Halfway Push',          210,  null, 'You are past the halfway point — keep showing up.', 10),
  ('jumpstart', 11, 'Build: Stack the Reps',        225,  null, 'Stacking a bit more work on what you have built so far.', 11),
  ('jumpstart', 12, 'Build: Almost There',          240,  null, 'The longest build session — almost to the finish.', 12),
  ('jumpstart', 13, 'Proof: Show Up',               300,  null, 'A fuller session to show yourself what two weeks of showing up looks like.', 13),
  ('jumpstart', 14, 'Proof: You Did It',            300,  null, 'The final session. Notice how you feel before and after — that is the proof.', 14)
on conflict (program_slug, day_number) do nothing;
