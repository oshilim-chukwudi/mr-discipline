-- Single-row store for the Instagram long-lived access token, refreshed by a
-- weekly cron job (see /api/cron/refresh-instagram-token) so the site never
-- relies on a token baked into an env var going stale after ~60 days.
-- Run this in the Supabase SQL Editor (or `supabase db push` if you use the CLI).

create table if not exists instagram_token (
  id smallint primary key default 1,
  access_token text not null,
  expires_at timestamptz not null,
  updated_at timestamptz not null default now(),
  constraint instagram_token_singleton check (id = 1)
);

alter table instagram_token enable row level security;

-- No public read/write policies on purpose — only the service-role key
-- (used by the cron route and the server-side data fetch) can touch this.
