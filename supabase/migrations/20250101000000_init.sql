-- Scheme Access Kit Database Schema
-- Group 5, Design Thinking, JAIN (Deemed-to-be University)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Schemes table
create table if not exists public.schemes (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  department text not null,
  state text not null check (state in ('karnataka', 'central')),
  badge_category text not null check (badge_category in ('cash-benefit', 'subsidy', 'infrastructure', 'identity')),
  what_it_gives text not null,
  who_it_is_for text not null,
  land_size_min_acres numeric(4,2) default 0,
  land_size_max_acres numeric(4,2),
  eligible_crops jsonb default '["all"]'::jsonb,
  requires_land_record boolean default true,
  requires_farmer_id boolean default true,
  requires_aadhaar_bank_link boolean default true,
  benefit_amount text,
  documents_needed jsonb not null default '[]'::jsonb,
  where_to_apply jsonb not null default '{}'::jsonb,
  watch_for text not null,
  source_url text not null,
  last_verified_on date not null default current_date,
  verified_by text not null default 'Group 5 Research Desk',
  is_hypothesis boolean default false,
  published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint check_source_url_not_empty check (length(trim(source_url)) > 5)
);

-- 2. Scheme Translations
create table if not exists public.scheme_translations (
  id uuid primary key default uuid_generate_v4(),
  scheme_id uuid references public.schemes(id) on delete cascade not null,
  locale text not null check (locale in ('en', 'kn', 'hi', 'ta', 'ml')),
  title text not null,
  what_it_gives text not null,
  who_it_is_for text not null,
  documents_needed jsonb default '[]'::jsonb,
  watch_for text not null,
  is_machine_translated boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (scheme_id, locale)
);

-- 3. News & Verified Updates Feed
create table if not exists public.news_items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  summary text not null,
  category text not null check (category in ('payment-release', 'deadline', 'portal-update', 'verification')),
  scheme_slug text references public.schemes(slug) on delete set null,
  published_at date not null default current_date,
  last_verified_on date not null default current_date,
  source_url text not null,
  verified_by text not null default 'Group 5 Research Desk',
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint check_news_source_url check (length(trim(source_url)) > 5)
);

-- 4. Help Offices
create table if not exists public.help_offices (
  id uuid primary key default uuid_generate_v4(),
  district text not null,
  district_kannada text,
  office_name text not null,
  address text not null,
  pincode text not null,
  working_hours text not null default '10:00 AM - 5:30 PM (Mon-Sat, 2nd/4th Sat holidays)',
  phone text not null,
  email text,
  services_provided jsonb not null default '[]'::jsonb,
  data_source_note text not null default 'Karnataka State Agriculture Directory 2025-26',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Glossary Items
create table if not exists public.glossary_items (
  id uuid primary key default uuid_generate_v4(),
  term_key text unique not null,
  english_equivalent text not null,
  translations jsonb not null default '{}'::jsonb,
  simple_explanation jsonb not null default '{}'::jsonb,
  why_it_matters jsonb not null default '{}'::jsonb,
  common_mistake jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Feedback (No personal identification numbers permitted)
create table if not exists public.feedback (
  id uuid primary key default uuid_generate_v4(),
  name_or_role text,
  district text,
  category text not null check (category in ('scheme-rule', 'office-contact', 'translation', 'general')),
  message text not null,
  ip_hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'pending_review' check (status in ('pending_review', 'verified', 'dismissed'))
);

-- 7. Audit Log
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  performed_by text not null,
  changes jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for fast lookup
create index if not exists idx_schemes_slug on public.schemes(slug);
create index if not exists idx_schemes_published on public.schemes(published);
create index if not exists idx_scheme_translations_lookup on public.scheme_translations(scheme_id, locale);
create index if not exists idx_news_published on public.news_items(published, published_at desc);
create index if not exists idx_help_offices_district on public.help_offices(district);
create index if not exists idx_audit_created on public.audit_logs(created_at desc);

-- Enable Row Level Security (RLS) on all exposed tables
alter table public.schemes enable row level security;
alter table public.scheme_translations enable row level security;
alter table public.news_items enable row level security;
alter table public.help_offices enable row level security;
alter table public.glossary_items enable row level security;
alter table public.feedback enable row level security;
alter table public.audit_logs enable row level security;

-- Public READ policies (for anonymous visitors)
create policy "Allow public read published schemes"
  on public.schemes for select
  to anon, authenticated
  using (published = true);

create policy "Allow public read scheme translations"
  on public.scheme_translations for select
  to anon, authenticated
  using (true);

create policy "Allow public read news"
  on public.news_items for select
  to anon, authenticated
  using (published = true);

create policy "Allow public read help offices"
  on public.help_offices for select
  to anon, authenticated
  using (true);

create policy "Allow public read glossary"
  on public.glossary_items for select
  to anon, authenticated
  using (true);

-- Feedback INSERT policy: anyone can submit feedback (no read access for anon)
create policy "Allow anon insert feedback"
  on public.feedback for insert
  to anon, authenticated
  with check (length(message) >= 5 and length(message) <= 2000);

-- Authenticated Admin policies
create policy "Allow authenticated admin full schemes access"
  on public.schemes for all
  to authenticated
  using (true)
  with check (length(trim(source_url)) > 5);

create policy "Allow authenticated admin full news access"
  on public.news_items for all
  to authenticated
  using (true)
  with check (length(trim(source_url)) > 5);

create policy "Allow authenticated admin read feedback"
  on public.feedback for select
  to authenticated
  using (true);

create policy "Allow authenticated insert and read audit logs"
  on public.audit_logs for all
  to authenticated
  using (true)
  with check (true);
