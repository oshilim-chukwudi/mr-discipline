-- Email leads captured from the free lead-magnet products (Discipline Reset,
-- Weight Loss Shopping List, etc.) — written only by the service-role key via
-- /api/leads, so this becomes a real, exportable list instead of one-off
-- notification emails per signup.
-- Run this in the Supabase SQL Editor (or `supabase db push` if you use the CLI).

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product_slug text not null,
  product_name text,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- No public read/write policies on purpose — only the service-role key
-- (used by /api/leads) can touch this table.

create index if not exists idx_leads_product_slug on leads (product_slug);
create index if not exists idx_leads_email on leads (lower(email));
