-- ═══════════════════════════════════════════════════════════════════════════
-- Schrijfcoach — Supabase schema
--
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- It is idempotent: running it twice is harmless.
--
-- Afterwards check Database → Tables → progress shows a green "RLS enabled"
-- badge. If it does not, stop — without RLS every account could read every
-- other account's progress.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Main table: one row per user ───────────────────────────────────────────
-- data      = hot. Stats, SRS, flags, reading history… changes constantly,
--             small. Values are the raw localStorage strings, so this layer
--             never needs to understand any key's schema.
-- sentences = cold. ~207 KB (949 sentences) and only changes when the user
--             edits sentences. Kept in its own column so an ordinary exercise
--             answer does not re-upload it over mobile data.
create table if not exists public.progress (
  user_id              uuid primary key references auth.users (id) on delete cascade,
  data                 jsonb       not null default '{}'::jsonb,
  sentences            jsonb,
  updated_at           timestamptz not null default now(),
  sentences_updated_at timestamptz,
  created_at           timestamptz not null default now()
);

-- Bound runaway payloads. octet_length(jsonb::text) is immutable, so it is
-- legal in a CHECK constraint (pg_column_size is not).
alter table public.progress drop constraint if exists progress_size_guard;
alter table public.progress add constraint progress_size_guard check (
  octet_length(data::text) < 4000000
  and (sentences is null or octet_length(sentences::text) < 4000000)
);

-- ── Row Level Security ─────────────────────────────────────────────────────
-- This is what makes the anon key safe to ship in the browser: every request
-- it makes is evaluated here, and an anonymous visitor has no auth.uid().
alter table public.progress enable row level security;

drop policy if exists progress_select_own on public.progress;
drop policy if exists progress_insert_own on public.progress;
drop policy if exists progress_update_own on public.progress;
drop policy if exists progress_delete_own on public.progress;

create policy progress_select_own on public.progress
  for select to authenticated using (auth.uid() = user_id);
create policy progress_insert_own on public.progress
  for insert to authenticated with check (auth.uid() = user_id);
create policy progress_update_own on public.progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy progress_delete_own on public.progress
  for delete to authenticated using (auth.uid() = user_id);

grant select, insert, update, delete on public.progress to authenticated;
revoke all on public.progress from anon;

-- ── Server-generated clocks ────────────────────────────────────────────────
-- Conflict resolution is "newest wins", so the timestamps must be trustworthy.
-- The old Gist sync compared two client-generated ISO strings; a phone with a
-- skewed clock silently made the wrong side "newer" and ate progress. Here
-- both sides always come from the same Postgres clock and the client never
-- writes updated_at.
create or replace function public.progress_touch()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.updated_at := now();
  if tg_op = 'INSERT' then
    if new.sentences is not null then new.sentences_updated_at := now(); end if;
  elsif new.sentences is distinct from old.sentences then
    new.sentences_updated_at := now();
  end if;
  return new;
end; $$;

drop trigger if exists progress_touch_trg on public.progress;
create trigger progress_touch_trg before insert or update on public.progress
  for each row execute function public.progress_touch();

-- ── Safety net ─────────────────────────────────────────────────────────────
-- "Newest wins" resolves silently, so keep whatever is about to be
-- overwritten. The client inserts here before a destructive sync, not on
-- every push.
create table if not exists public.progress_backup (
  id         bigserial primary key,
  user_id    uuid not null references auth.users (id) on delete cascade,
  data       jsonb,
  sentences  jsonb,
  reason     text,
  created_at timestamptz not null default now()
);
create index if not exists progress_backup_user_idx
  on public.progress_backup (user_id, created_at desc);

alter table public.progress_backup enable row level security;

drop policy if exists progress_backup_select_own on public.progress_backup;
drop policy if exists progress_backup_insert_own on public.progress_backup;

create policy progress_backup_select_own on public.progress_backup
  for select to authenticated using (auth.uid() = user_id);
create policy progress_backup_insert_own on public.progress_backup
  for insert to authenticated with check (auth.uid() = user_id);

grant select, insert on public.progress_backup to authenticated;
grant usage on sequence public.progress_backup_id_seq to authenticated;
revoke all on public.progress_backup from anon;
