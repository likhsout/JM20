# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
### Purbadhala J.M. Govt Pilot High School — Batch 2K20 Science — Fund Management System v2.0
**Document ID:** JM2020-SRS-2026-10-18
**Version:** 1.0 (Draft for Review)
**Author:** Arena Agent (for Batch Admins Rofy & Shuhada)
**Status:** Draft • Needs stakeholder approval
**Stack:** Next.js + Supabase + Vercel/Netlify (proposed)

---

## 1. Introduction

### 1.1 Purpose
This SRS defines the software requirements for rebuilding `jm2020science.netlify.app` (v1) into a scalable, secure, mobile-first **Iftar Fund OS (v2)** for Batch 2020 Science. It preserves v1’s core promise — *simple, transparent annual contributions for the Ramadan Iftar party* — while fixing UX, security, and scalability gaps identified in the 18 Oct 2026 audit.

**Intended Audience:** Developers, UI/UX designers, QA, batch admins (product owners).

### 1.2 Scope
The system lets:
- Batch-mates (members) create profiles, pay monthly dues (50 BDT/month), view personal & global ledgers, download receipts.
- Admins (2-3 treasurers) approve/reject payments, manage members, post notices, publish post-Iftar expenses/bills, archive years, and nudge unpaid members.
- Public visitors (unauthenticated) view transparency data: total collected, member list, full ledger (with privacy controls).

**Out of Scope (v2):** Online payment gateway integration (bKash API for merchants is out of reach for personal fund — manual verification stays), multi-batch support (future v3), e-commerce/merch.

### 1.3 Definitions
- **Member:** A batch-mate with a profile (name + phone). 10 in v1, ~50 potential.
- **Transaction:** A payment for 1..12 months. Amount = `n × 50 BDT`. Status: `pending | approved | rejected`.
- **Month:** A tracking period: April→March (12). Not Gregorian calendar months — fund cycle.
- **Receipt:** `R-XXXXXX` unique ID generated on approval.
- **Admin:** Role with approve/edit rights. Currently Rofy & Shuhada.
- **Ledger:** Chronological list of all transactions + per-member monthly grid.
- **Archive:** Frozen snapshot of a year’s state (e.g., 2026).

### 1.4 References
- Live v1 state: `GET https://jm2020science.netlify.app/api/state` (v7, 18 Oct 2026)
- Audit Report: `JM2020Science-Report.html` (Arena, 18 Oct 2026)
- PRD: `JM2020-PRD.md` (companion doc)

---

## 2. Overall Description

### 2.1 Product Perspective
- **Current:** Single-page vanilla JS app + Netlify Functions JSON blob. Single document state, PIN auth, client hash routing.
- **Proposed:** Next.js App Router frontend + Supabase (Postgres) backend + Supabase Auth (Phone OTP) + Storage + FCM push. Real DB, real auth, real routes. Hosted on Vercel/Netlify Edge. Migrates v1 data losslessly.

### 2.2 User Classes & Characteristics

| User Class | Count | Tech Savvy | Primary Device | Language | Key Goal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Member (Payer)** | 40-60 potential | Low-Medium | Android, 5"-6", Chrome | Bangla pref, EN ok | Pay in 3 taps, see if I’m clear |
| **Member (Observer)** | 10-20 | Low | Same | Bangla | Just see who paid, no pay |
| **Admin (Treasurer)** | 2-3 | Medium | Android + Desktop | Both | Approve fast, manage, publish expenses |
| **Public (Future batch)** | — | Low | Mobile | Both | Template inspiration |

**Constraints:** Low bandwidth (3G), low storage, intermittent internet in rural Netrakona, shared family phones, Bangla numerals sometimes.

### 2.3 Operating Environment
- Clients: Android Chrome 90+, iOS Safari 15+, Desktop Chrome/Edge. PWA installable.
- Server: Vercel Edge / Netlify Edge (Node 20). Supabase (Postgres 15) in Singapore region (closest to BD).
- Network: TLS 1.2+, <150KB initial JS, <50KB data fetch.

### 2.4 Design & Implementation Constraints
- Must remain **free-tier hostable** (< $10/mo total — Supabase free, Vercel hobby, domain).
- Must stay **no-code maintainable** for admins (no CLI, no SQL).
- Must support **offline read** (cache ledger in IndexedDB via service worker).
- GDPR-ish: Phones are PII — must allow hide-from-public toggle.

### 2.5 Assumptions & Dependencies
- Admins will be available for weekly demo during build.
- Batch will agree on fixed monthly amount (50 BDT) for v2 year; changing mid-year complicates receipts.
- WhatsApp as primary nudge channel (manual for v2 — no WhatsApp Business API cost).

---

## 3. System Features (Functional Requirements)

Use classic `REQ-###` IDs for traceability to tests.

### 3.1 Authentication & Authorization

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-AUTH-01 | System shall authenticate members via **phone OTP** (6-digit, 5-min expiry, resend cool-down 60s). No passwords/PINs. | MUST |
| REQ-AUTH-02 | Admin role is granted by existing admin (invite by phone). First admin bootstrapped by domain owner. | MUST |
| REQ-AUTH-03 | Auth shall persist via Supabase JWT (httpOnly cookie + localStorage). Session TTL 30 days. | MUST |
| REQ-AUTH-04 | Guest (unauth) can view Home, Members, Ledger, Notices — but cannot Pay or see masked phones. | MUST |
| REQ-AUTH-05 | Failed OTP attempts rate-limited: 5 attempts / 15 min per phone (Supabase config). | MUST |

### 3.2 Member Management

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-MEM-01 | Create profile: `firstName` (req, 2-30 chars), `lastName` (opt), `phones[]` (1-2, BD format `01XXXXXXXXX`, validate 11 digits), `whatsapp` bool per phone, `avatarUrl` (opt upload). Duplicate phone blocked (warn, allow admin override). | MUST |
| REQ-MEM-02 | Edit own profile (name, phones). Delete only by admin with double confirm. | MUST |
| REQ-MEM-03 | Member list: paginated (20/page), search by name (fuzzy, Bangla+EN), filter `All | Paid Fully | Partial | Unpaid`. Show avatar, name, total given, progress ring (e.g., 3/12). | MUST |
| REQ-MEM-04 | Member detail: Monthly grid (12 cells, color: green paid / amber pending / grey unpaid), transaction history (date, method, amount, status, receipt link). | MUST |
| REQ-MEM-05 | Privacy toggle: Member can set `hidePhoneFromPublic = true` → public sees `01****XX94`, admins see full. Default false (needs consent banner). | SHOULD |
| REQ-MEM-06 | Bulk import: Admin can upload CSV (name, phone) to create shadow profiles for non-app users (e.g., 30 batch-mates). | COULD |

### 3.3 Payment Flow

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-PAY-01 | Pay screen: Auto-select logged-in member, show only unpaid months as selectable pills. Select 1..n months → amount auto = `n × monthlyAmount` (live from settings). | MUST |
| REQ-PAY-02 | Payment methods: Show as **icon cards** (Nagad, bKash, Rocket, Bank, Cash). Bank shows account details (AFJAL HASAN...). Copy number button. Cash requires picking receiving admin (dropdown of admin contacts). | MUST |
| REQ-PAY-03 | Digital methods require `txnId` (req, 6-20 alphanumeric, uppercase normalized). Cash requires `cashAdminId` (req). Validate: TxnID unique per method (warn on duplicate). | MUST |
| REQ-PAY-04 | Submit creates transaction `status=pending`, `submittedAt=now()`, `receiptNo=null`. Show success: "Submitted! Pending approval — you’ll get a WhatsApp when approved." | MUST |
| REQ-PAY-05 | Offline fallback: If `POST /api/transactions` fails, offer "Copy details → Send on WhatsApp to admin" with pre-filled summary. Store pending in IndexedDB, auto-retry when online. | SHOULD |
| REQ-PAY-06 | Guest pay (no login): Allow pay with just `name + phone` → creates temp profile if phone not exists, else links. Mark `isGuest=true` until they claim via OTP. | SHOULD |
| REQ-PAY-07 | Prevent double-pay: Locked months (already `approved`) are disabled with tooltip "Already paid — see receipt R-XXX". `pending` months show "Pending approval". | MUST |

### 3.4 Admin Approval Workflow

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-ADM-01 | Admin dashboard: **Pending queue** with badge count (bottom nav + push). Each card: member, months, amount, method, claimed TxnID, submittedAt, "Verify" CTA. | MUST |
| REQ-ADM-02 | Digital approval: Admin must **re-type TxnID from operator app/bank statement** into confirm field. System compares (case-insensitive, trimmed) to `txnIdClaimed`. Mismatch → error "Doesn’t match — check again." | MUST |
| REQ-ADM-03 | On approve: Set `status=approved`, `approvedAt=now()`, `approvedBy=adminId`, `receiptNo=R-<6-char>` (nanoid, unique indexed). Insert into ledger. Trigger notification (push + optional WhatsApp via admin’s manual send). | MUST |
| REQ-ADM-04 | On reject: Require `reason` (dropdown: "Incorrect TxnID" / "Amount mismatch" / "Cash not received" / "Other" + free text). Set `status=rejected`, notify member (push). | MUST |
| REQ-ADM-05 | Admin can edit any transaction pre-approval (fix typo), but post-approval edits create audit log entry (`edits[]: {by, at, from, to}`). | SHOULD |
| REQ-ADM-06 | Admin can manually add transaction (for hand cash without member action) — same validation, auto-approved if admin creates. | SHOULD |

### 3.5 Ledger & Transparency

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-LED-01 | Full Accounts: Global timeline grouped by date (newest first). Each row: avatar, name, months (e.g., "Apr–May"), amount, method icon, status badge, receipt link. Server pagination (20/page). | MUST |
| REQ-LED-02 | Filters: `All | Approved | Pending | Rejected` + Search (name, receiptNo, txnId). Search debounced 300ms, server-side ILIKE. | MUST |
| REQ-LED-03 | Export: Admin can download **PDF** (branded: school logo, batch, date, totals, all rows) + **CSV/JSON** (for Excel). Public can export filtered view (masked TxnIDs). | MUST |
| REQ-LED-04 | Masking:Public (non-admin) sees TxnIDs as `DJI***N5` (first 3 + *** + last 1). Admins see full in detail view only (not list). | SHOULD |
| REQ-LED-05 | Receipt PDF: Per-transaction branded PDF: Header (school logo, JM 2K20), Receipt No., Date, Member, Months, Amount, Method, TxnID, Approved by. QR code encoding `https://jm2020..?receipt=R-XXX` for verification. | MUST |

### 3.6 Content Management (Admin)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-CMS-01 | Notices: CRUD (EN+BN), `pinned` bool (pinned sorts first), `publishedAt`. Max 10 active. Display as banner on Home. | MUST |
| REQ-CMS-02 | Settings: School name, address, batch label, monthlyAmount (50), months (CRUD, EN/BN, order), paymentMethods (CRUD, type, number, note, QR upload, active toggle). | MUST |
| REQ-CMS-03 | Homepage: Hero subtitle EN/BN, section order (drag), visibility toggles — but simplified to 5 sections max (Hero, Notice, Pay CTA, Leaderboard, Contacts). | MUST |
| REQ-CMS-04 | Expenses: CRUD items `{category, amount, billUrl?}`. `published` bool + `closingNote EN/BN`. When published, Home shows "Spent X of Y — see breakdown" with expand. Total auto-sum. | MUST |
| REQ-CMS-05 | Messages Inbox: List from "Message Admins" form (name, phone, message, read). Mark read, reply via tel/wa.me link. | SHOULD |

### 3.7 Notifications & Nudges

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-NOT-01 | Push: On `transaction.status` change (pending→approved/rejected), send FCM push: Title "Payment approved — 100 BDT for May" + deep link to receipt. Permission prompt after first pay. | SHOULD |
| REQ-NOT-02 | Nudge: Admin → Member list → "Nudge" button → pre-fills WhatsApp text: `Assalamu Alaikum [Name], your [Months] (BDT X) is pending. Pay via bKash 01638820094: [Pay Link]` + copy. No auto-send (manual respects privacy). | MUST |
| REQ-NOT-03 | Banner: Auto-notice "July dues in 3 days" based on `new Date()` + month due dates (admin sets 1st of month as due). | COULD |

### 3.8 Archive & Year Rollover

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| REQ-ARC-01 | Archive: Admin can "Close Year" → snapshot `JSON(members, transactions, notices, expenses)` into `archives` table, tag `yearLabel` (e.g., "2026 — Iftar 2026"), keep photos/bills. | MUST |
| REQ-ARC-02 | After archive, system resets `transactions` for next cycle but keeps `profiles`. Months re-initialized (April–March). Previous ledgers viewable under "Past Years". | MUST |
| REQ-ARC-03 | Past Years page: List cards (year, total, member count, 2 photos, PDF download). | MUST |

---

## 4. Non-Functional Requirements

| ID | Category | Requirement |
| :--- | :--- | :--- |
| NFR-PERF-01 | Performance | Lighthouse Performance ≥ 90 on Moto G4 (3G). First Contentful Paint < 2s, TTI < 3.5s. JS bundle < 120KB gz. |
| NFR-PERF-02 | Offline | Service worker caches Home, Members, Ledger list, own profile. Pay submission queues offline, syncs on reconnect. |
| NFR-SEC-01 | Security | Rate limit OTP 5/15min, ledger GET 100/min IP, admin POST 30/min. Row Level Security: members read all, write own, admin write all. TxnID masking. |
| NFR-SEC-02 | Privacy | HTTPS only, httpOnly JWT, no PII in URL, phones encrypted at rest (Supabase pgsodium opt). |
| NFR-A11Y-01 | Accessibility | WCAG 2.1 AA: contrast 4.5:1, keyboard nav, screen reader labels, Bangla lang tag, focus rings. |
| NFR-I18N-01 | i18n | All user strings in `i18n.json` EN/BN. Date format `DD MMM YYYY` (BN uses Bengali numerals option). Number format `1,550 BDT`. |
| NFR-SCAL-01 | Scalability | Support 500 members, 5k transactions/year without perf drop (DB indexed on `profile_id`, `status`, `submittedAt`). |
| NFR-MAINT-01 | Maintainability | 80% test coverage on approval logic, lint + typecheck CI, env-based config (no hardcoded numbers). |

---

## 5. Data Model (Supabase Postgres)

```sql
-- profiles
create table profiles (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  phones jsonb not null -- [{number:"01XXXXXXXXX", whatsapp:bool}]
  hide_phone bool default false,
  avatar_url text,
  created_at timestamptz default now(),
  is_guest bool default false
);
-- months
create table months (
  id uuid primary key default gen_random_uuid(),
  key text unique not null, -- m_xxx
  en text not null, bn text not null,
  sort_order int not null,
  year int not null
);
-- transactions
create table transactions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  month_ids uuid[] not null,
  amount int not null check (amount = array_length(month_ids,1) * 50), -- enforce via trigger
  method text not null check (method in ('Nagad','bKash','Rocket','Bank','Cash')),
  txn_id_claimed text, -- null for Cash
  cash_admin_id uuid references profiles(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  rejection_reason text,
  submitted_at timestamptz default now(),
  approved_at timestamptz,
  approved_by uuid references profiles(id),
  receipt_no text unique -- R-XXXXXX, generated on approve
);
create index on transactions (status);
create index on transactions (profile_id);
-- notices, expenses, messages, archives, settings (single row)
create table settings (
  id int primary key check (id=1),
  school_name text, address text, batch_label text, pdf_batch_name text,
  monthly_amount int default 50,
  payment_methods jsonb, admin_contacts jsonb,
  hero_subtitle jsonb, -- {en,bn}
  updated_at timestamptz
);
```

---

## 6. API Contract (Next.js Route Handlers + Supabase)

- `GET /api/members?q=&status=&page=` → `{members[], total}`
- `POST /api/members` (auth) → create profile
- `GET /api/transactions?status=&q=&profileId=&page=` → `{transactions[], total}`
- `POST /api/transactions` (auth) → create pending
- `POST /api/transactions/:id/approve` (admin) → {reenterTxnId}
- `POST /api/transactions/:id/reject` (admin) → {reason}
- `GET /api/receipt/:receiptNo` → PDF blob + QR verification
- `GET /api/ledger/export?format=pdf|csv`

All responses JSON + HTTP status. Error format `{code, message, details}`.

---

## 7. UI Requirements (Link to PRD & Figma)

- Design System: Tailwind tokens in `design-tokens.json` (colors, radius, shadows, fonts).
- Components: Button, Card, Badge, MonthPill, MemberCard, TxnRow, Receipt, Banner — in Storybook.
- Responsive: Mobile bottom nav, desktop top nav. No hamburger for primary nav.

---

## 8. Acceptance Criteria (Sample)

- AC-PAY-01: Given I am Foysal Ahmed (unpaid), when I select April + May (2 pills) and bKash + TxnID `ABC123XYZ`, then amount shows 100 BDT and Submit enables.
- AC-ADM-02: Given pending txn TxnID `DIT84TPYVU`, when admin types `dit84tpyvu` (case-insensitive), approval succeeds and receipt `R-XXXXXX` issued.
- AC-LED-02: Given public user searches "Shuhada", ledger returns only Shuhada’s 2 txns with masked TxnIDs.

---

## 9. Open Issues / TBD

- [ ] Supabase vs Firebase — decide after cost test (Supabase free = 500MB DB, enough).
- [ ] WhatsApp Business API? For v2, manual is fine; auto costs $0.02/message.
- [ ] Bank auto-reconciliation? DBBL offers no personal API — keep manual.

---

**Sign-off:** _____________________ (Batch Admin Rofy)  _____________________ (Batch Admin Shuhada)  Date: ______

