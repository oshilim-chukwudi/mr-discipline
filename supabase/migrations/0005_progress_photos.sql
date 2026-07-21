-- Progress photos: users upload periodic photos to see real physical change
-- over a program, shown as a before/after comparison + timeline grid.
-- Run this in the Supabase SQL Editor (or `supabase db push` if you use the CLI).

create table if not exists progress_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_slug text not null default 'jumpstart',
  storage_path text not null,
  taken_at date not null default current_date,
  created_at timestamptz not null default now()
);

alter table progress_photos enable row level security;

drop policy if exists "progress_photos_select_own" on progress_photos;
create policy "progress_photos_select_own"
  on progress_photos for select
  using (auth.uid() = user_id);

drop policy if exists "progress_photos_insert_own" on progress_photos;
create policy "progress_photos_insert_own"
  on progress_photos for insert
  with check (auth.uid() = user_id);

drop policy if exists "progress_photos_delete_own" on progress_photos;
create policy "progress_photos_delete_own"
  on progress_photos for delete
  using (auth.uid() = user_id);

create index if not exists idx_progress_photos_user_program
  on progress_photos (user_id, program_slug, taken_at);

-- Private bucket — photos are only ever accessed via short-lived signed URLs.
insert into storage.buckets (id, name, public)
values ('progress-photos', 'progress-photos', false)
on conflict (id) do nothing;

-- Objects are stored at "<user_id>/<filename>" — these policies restrict
-- every operation to a user's own folder.
drop policy if exists "progress_photos_storage_select_own" on storage.objects;
create policy "progress_photos_storage_select_own"
  on storage.objects for select
  using (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "progress_photos_storage_insert_own" on storage.objects;
create policy "progress_photos_storage_insert_own"
  on storage.objects for insert
  with check (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "progress_photos_storage_delete_own" on storage.objects;
create policy "progress_photos_storage_delete_own"
  on storage.objects for delete
  using (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);
