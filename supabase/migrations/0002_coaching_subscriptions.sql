-- Live Coach Consultation: recurring $99/mo subscription tracking.
-- Written by the Stripe webhook (service role) on subscription create/update/cancel.
-- Run this in the Supabase SQL Editor after 0001_jumpstart_program.sql.

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product_slug text not null default 'coaching',
  stripe_customer_id text not null,
  stripe_subscription_id text unique not null,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on subscriptions;
create policy "subscriptions_select_own"
  on subscriptions for select
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = lower(email));

-- No insert/update/delete policies for the client — only the service role
-- (Stripe webhook) may write to this table.

create index if not exists idx_subscriptions_email_product on subscriptions (lower(email), product_slug);
create index if not exists idx_subscriptions_stripe_customer on subscriptions (stripe_customer_id);
