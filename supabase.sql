-- JM 2K20 Science v2 — Supabase Schema (Singapore region)
-- Run this in Supabase SQL Editor after creating project jm2020-v2

create extension if not exists "pgcrypto";

-- Profiles
create table profiles (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 2 and 30),
  last_name text,
  phones jsonb not null default '[]'::jsonb,
  hide_phone bool default false,
  avatar_url text,
  is_guest bool default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_profiles_created on profiles(created_at);

-- Months
create table months (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  en text not null, bn text not null,
  sort_order int not null,
  year int not null default 2027
);

-- Transactions
create table transactions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade not null,
  month_ids uuid[] not null,
  amount int not null,
  method text not null check (method in ('Nagad','bKash','Rocket','Bank','Cash')),
  txn_id_claimed text,
  cash_admin_id uuid references profiles(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  rejection_reason text,
  submitted_at timestamptz default now(),
  approved_at timestamptz,
  approved_by uuid references profiles(id),
  receipt_no text unique
);
create index idx_txn_status on transactions(status);
create index idx_txn_profile on transactions(profile_id);
create index idx_txn_submitted on transactions(submitted_at desc);

-- Settings (single row)
create table settings (
  id int primary key check (id=1),
  school_name text not null default 'Purbadhala J.M. Govt Pilot High School',
  address text not null default 'Purbadhala, Netrakona',
  batch_label text default 'Batch 2K20 Science',
  monthly_amount int not null default 50,
  payment_methods jsonb,
  admin_contacts jsonb,
  hero_subtitle jsonb,
  updated_at timestamptz default now()
);
insert into settings (id) values (1) on conflict do nothing;

-- Seed months (April → March)
insert into months (key, en, bn, sort_order) values
('m_mul7nkmy5bdkb7','April','এপ্রিল',1),
('m_mu8w9rguzskpc0','May','মে',2),
('m_mu8wanbhpoaw31','June','জুন',3),
('m_mu8wb5m4fom43e','July','জুলাই',4),
('m_mu8wbp6y1xjz8e','August','আগস্ট',5),
('m_mu8wc9859oje8k','September','সেপ্টেম্বর',6),
('m_mu8wd0qbk24j3l','October','অক্টোবর',7),
('m_mu8wdixhnbnqib','November','নভেম্বর',8),
('m_mu8we24a391jl5','December','ডিসেম্বর',9),
('m_mu8wek5pozd5q5','January','জানুয়ারি',10),
('m_mu8wf1ycj5k2n1','February','ফেব্রুয়ারি',11),
('m_mul7w4gzf4rj30','March','মার্চ',12)
on conflict do nothing;

-- RLS (enable after auth setup)
-- alter table profiles enable row level security;
-- create policy "public read" on profiles for select using (true);
-- create policy "owner update" on profiles for update using (auth.uid() = id);
