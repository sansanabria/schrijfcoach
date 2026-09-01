-- ─── SCHRIJFCOACH: user_state table + row-level security ──────────────────────
-- Run this ONCE in the Supabase dashboard → SQL Editor → New query → Run.
-- Safe to re-run: every statement is idempotent.

-- 1. The table. One row per (user, localStorage key).
--    `value` holds the exact JSON string already stored in localStorage,
--    so no data reshaping is needed on either side.
create table if not exists public.user_state (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  key        text        not null,
  value      text        not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- 2. Row-level security. THIS IS THE ONLY THING PROTECTING THE DATA,
--    because the anon key ships publicly in the browser.
alter table public.user_state enable row level security;

-- 3. One policy covering all four operations: you may only ever touch
--    rows whose user_id equals your own authenticated user id.
drop policy if exists "own rows only" on public.user_state;
create policy "own rows only"
  on public.user_state
  for all                        -- select, insert, update, delete
  using      (auth.uid() = user_id)   -- which existing rows you can read/modify
  with check (auth.uid() = user_id);  -- what you're allowed to write

-- 4. Keep updated_at honest on every write (used for last-write-wins merge).
create or replace function public.touch_user_state()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists user_state_touch on public.user_state;
create trigger user_state_touch
  before insert or update on public.user_state
  for each row execute function public.touch_user_state();
