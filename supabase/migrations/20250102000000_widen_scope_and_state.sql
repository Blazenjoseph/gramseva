-- Migration: Widen scheme scope and state field
-- Group 5, Design Thinking, JAIN (Deemed-to-be University)

-- Remove restrictive check constraint on state in schemes table
alter table public.schemes drop constraint if exists schemes_state_check;

-- Add updated check or allow all state names and 'central'/'all-india'
alter table public.schemes add constraint schemes_state_not_empty check (length(trim(state)) > 0);

-- Add holding category and tenure metadata columns
alter table public.schemes add column if not exists holding_categories jsonb default '["marginal", "small", "semi-medium", "medium", "large"]'::jsonb;
alter table public.schemes add column if not exists tenure_types jsonb default '["owned", "shared"]'::jsonb;
alter table public.schemes add column if not exists crop_categories jsonb default '["food-grains", "horticulture", "plantation", "livestock", "other"]'::jsonb;
alter table public.schemes add column if not exists is_state_specific_placeholder boolean default false;
alter table public.schemes add column if not exists state_placeholder_target text;

-- Index on state
create index if not exists idx_schemes_state on public.schemes(state);
