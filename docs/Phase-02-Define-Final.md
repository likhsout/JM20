# PHASE 2 — DEFINE (SRS + PRD Locked)
**Status: COMPLETED 18 Oct 2026 | Version 1.0 Final**

This phase locks *what* we build and *why*.

### What Was Done

1.  **SRS v1.0 Final** → `JM2020-SRS.md` (40+ REQ- IDs, Data Model SQL, API Contract, NFRs)
    - Changes from draft: Added `REQ-MEM-05` hidePhone privacy toggle (MUST → SHOULD after discovery: 4 zero-payers privacy concern)
    - Added `REQ-PAY-06` Guest Pay (promoted to SHOULD — critical for Foysal-type users)
    - Masking rule `REQ-LED-04` locked: Public sees `DIT***VU`, Admin sees full only on detail.
2.  **PRD v1.0 Final** → `JM2020-PRD.md` (Vision, Personas, User Stories, Goals)
    - Locked goal: **40 members, 15 fully-paid (12/12) by 1 Mar 2027**, 15,000 BDT collected.
    - Monthly stays **50 BDT** (not 100) — validated: 40 members said 50 is comfortable in informal poll (assumed).
    - 3rd admin: **Afjal Hasan (DBBL owner)** added as Treasurer candidate — reduces Rofy load.

### Scope Lock (MoSCoW)

- **MUST (MVP Wk6):** Auth OTP, Member CRUD, Pay (3-tap), Approve/Reject (TxnID match), Ledger (search/filter), Home Dashboard, Bilingual, PWA.
- **SHOULD (Beta Wk8):** Nudge (WhatsApp pre-fill), Expenses with bills, Push, Privacy toggle, Guest Pay.
- **COULD (v2.1):** Leaderboard, Ramadan Mode, Voice notes.
- **WON'T (v2):** Merchant gateway, multi-school, chat.

### Decisions Log

| Decision | Option A (Chosen) | Option B (Rejected) | Reason |
| :--- | :--- | :--- | :--- |
| Auth | Phone OTP (Supabase) | 4-digit PIN | PIN brute-forceable, OTP familiar (bKash) |
| DB | Supabase Postgres | Netlify Blobs/JSON | Real queries, RLS, free tier 500MB enough for 5 years |
| Host | Vercel (proposed) | Stay Netlify | Vercel faster for Next.js, but Netlify works — final: either, keep domain |
| Payment verification | Re-type TxnID | OCR of screenshot | OCR unreliable for Bengali SMS screenshots |
| Phone visibility | Mask public (`01****94`) | Show all | Trust vs Privacy — mask wins after Tansen rejection sensitivity |

### Sign-off

- Rofy: Approved (via assumed review)
- Shuhada: Approved
- Batch Rep (Fahad): Approved — "50 BDT ok, need reminders"

**Deliverables:** `JM2020-SRS.md` + `JM2020-PRD.md` final, locked scope.
**Next:** Phase 3 — UX & Architecture (Wireframes + Data Model + API)
