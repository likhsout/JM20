# PHASE 3 — UX & ARCHITECTURE (Completed)
**Wireframes, User Flows, Sitemap, Data Model, API Spec**

---

## 3.1 Sitemap (New) — Visual

```
jm2020science.com (Next.js App Router)
├─ / (Home Dashboard)
│   ├─ Goal Ring: 1,550 / 15,000 BDT (10%) — animated arc
│   ├─ Countdown: "132 days to Iftar 2027 — 8 March 2027"
│   ├─ This Month Due Card: "October — 50 BDT — 6/10 paid" + Pay CTA
│   ├─ Recent Feed: 5 latest approvals (avatar + "Rofy approved Likhon — 2h ago")
│   ├─ Notices Banner (dismissible): "MONTHLY - 50 TAKA"
│   └─ Quick Contacts: Rofy | Shuhada (call/wa)
├─ /members (Grid)
│   ├─ Search + Filter (All | Paid | Unpaid | Pending)
│   └─ Cards: Photo, Name, Progress Ring (e.g., 6/12), Total
├─ /members/[id] (Profile)
│   ├─ Header: Photo, Name, Phone (masked if hide), Edit
│   ├─ Monthly Grid: 12 pills (Apr→Mar) green/amber/grey
│   └─ Timeline: Txns (date, method icon, amount, receipt)
├─ /pay (3-Tap Pay)
│   ├─ Who: Auto me (if auth) / Guest quick form (name+phone)
│   ├─ Months: Pill multi-select (only unpaid enabled) → Amount live
│   ├─ Method: Icon cards (bKash pink, Nagad red, Rocket purple, Bank, Cash)
│   ├─ Details: TxnID field (with example "e.g., DIT84TPYVU") or Cash Admin picker
│   └─ Success: Confetti + "Pending approval — we'll WhatsApp you"
├─ /ledger (Full Accounts)
│   ├─ Summary: Total Collected, Pending Count, Members
│   ├─ Timeline: Grouped by date, search + status filter
│   └─ FAB: Export PDF/CSV
├─ /me (My Space)
│   └─ My payments, receipts, settings (lang, privacy, logout)
└─ /admin
    ├─ /admin/pending (Queue with TxnID re-type)
    ├─ /admin/members (Table + bulk import)
    ├─ /admin/settings (School, months, payment methods)
    ├─ /admin/notices, /admin/expenses, /admin/messages, /admin/archives
```

**Navigation:** Mobile Bottom Tabs (5) — `Home Members Pay Ledger Me` — always visible. Desktop Top Nav same. No hamburger for primary.

## 3.2 User Flows (Text Wireframes)

### Flow A: Rahim Pays for May (Logged In, 30 sec)

1.  **Home** → sees "October Due — 6/10 paid" card → taps **Pay Now** (1)
2.  **Pay** → auto shows "Paying as: Mohammad Rahat (01960012929)" → months: Apr May `[x]` Jun Jul... (Apr already paid, disabled grey) → taps **May** pill → Amount updates: `50 BDT` (2)
3.  → taps **bKash** pink card → field appears "bKash TxnID" with hint `DIT84TPYVU` → pastes, taps **Submit** (3)
4.  → Success screen: "Submitted! ⏳ Pending Shuhada's approval" + confetti + receipt placeholder

### Flow B: Admin Approves (Shuhada on Rickshaw)

1.  Push: "New payment — Likhon — 50 BDT Nagad" → taps
2.  **Pending Queue** → card: Likhon, Oct (1mo), 50 BDT, Nagad, TxnID `765TWAEY` (masked `765***Y` in list), "Verify" button
3.  Card expands: "Re-enter TxnID from Nagad app:" input → types `765TWAEY` → **Approve** enables → tap
4.  → Toast "Approved — R-3Q843V issued" + feed updates

## 3.3 Data Model — Final SQL (Supabase)

```sql
-- Enable UUID
create extension if not exists "pgcrypto";

-- PROFILES
create table profiles (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 2 and 30),
  last_name text,
  phones jsonb not null default '[]'::jsonb, -- [{number:"01638820094", whatsapp:true}]
  hide_phone bool default false,
  avatar_url text,
  is_guest bool default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_profiles_created on profiles(created_at);
-- MONTHS (12)
create table months (
  id uuid primary key default gen_random_uuid(),
  key text unique not null, -- m_xxx
  en text not null, bn text not null,
  sort_order int not null,
  year int not null default 2027
);
-- TRANSACTIONS
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
-- SETTINGS (single row)
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
-- NOTICES, EXPENSES, MESSAGES, ARCHIVES (similar, omitted for brevity but in full SRS)
```

**RLS Policies (Supabase):**
- `profiles`: public read, auth users insert, owner update, admin all.
- `transactions`: public read approved/pending (masked), admin read rejected full, auth insert, admin update status.

## 3.4 API Spec (Next.js Route Handlers)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/members?q=&status=&page=` | Public | List members with pagination, filter |
| POST | `/api/members` | OTP | Create profile |
| PATCH | `/api/members/[id]` | Owner/Admin | Update |
| GET | `/api/transactions?status=&q=&profileId=` | Public | List, search ILIKE |
| POST | `/api/transactions` | OTP/Guest | Create pending |
| POST | `/api/transactions/[id]/approve` | Admin | Body `{reenteredTxnId}` → verify → approve |
| POST | `/api/transactions/[id]/reject` | Admin | Body `{reason}` |
| GET | `/api/receipt/[receiptNo]` | Public | PDF stream + QR |
| GET | `/api/ledger/export?format=pdf` | Admin/Public | PDF/CSV |

**Error Format:** `{code:"txn_mismatch", message:"TxnID doesn’t match", details:{expected:"DIT..."}}`

---

**Deliverables:** Sitemap, 2 Flows, SQL, API Spec.
**Next:** Phase 4 — UI Design System (Tokens + Components + Hi-Fi)
