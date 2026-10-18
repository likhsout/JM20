# PHASE 5 — BUILD PLAN & PROTOTYPE (Completed: Plan + Starter Prototype)
**Timeline: Week 5-10 | Stack: Next.js + Supabase + Vercel**

---

## 5.1 Sprint Breakdown

### Sprint 1 (Weeks 5-6) — MVP Core
- **Goal:** Auth OTP, Member CRUD, Pay (3-tap), Approve/Reject, Ledger, Home Dashboard
- **Engineers:** 1 Full-stack (Next.js + Supabase) + 1 QA (you, testing on phone)
- **Demo:** Staging URL `https://v2-jm2020-science.vercel.app` — test with 3 real members (Rahat, Fahad, Likhon)

**Tasks:**
- [ ] Init Next.js 14 App Router, Tailwind, shadcn, `design-tokens.json` → `tailwind.config.js`
- [ ] Supabase project `jm2020-v2` (Singapore), run SQL from Phase 3, enable RLS, Auth Phone (Twilio or Supabase OTP — start with email OTP for free, migrate to phone later if Twilio cost)
- [ ] Build `/`, `/members`, `/pay`, `/ledger`, `/admin/pending` — connect to Supabase
- [ ] OTP flow: `/login` → enter phone → OTP → JWT cookie
- [ ] Migrate v1 data: Script `migrate-v1-to-v2.js` — fetch `/api/state`, insert 10 profiles + 10 txns (map old keys → UUIDs), preserve receiptNo
- [ ] Seed monthlyAmount=50, months April→March

### Sprint 2 (Weeks 7-8) — Delight & Admin
- **Goal:** Nudge (WhatsApp pre-fill), Expenses, Push, Privacy toggle, Guest Pay, PDF receipts
- **Tasks:**
- [ ] Expense CRUD + bill photo upload (Supabase Storage bucket `bills`)
- [ ] Nudge: Button in `/members/[id]` → `wa.me/?text=...` with pay link
- [ ] FCM push: `public/firebase-messaging-sw.js`, subscribe on `/me/settings`
- [ ] Receipt PDF: API route `/api/receipt/[id]` uses `jsPDF` + QR (qrcode lib) — Bangla font support via `Noto Sans Bengali`
- [ ] Guest pay: Allow `/pay` without auth → create temp profile, mark `is_guest`
- [ ] PWA: `next-pwa` + manifest, icons, offline cache via Workbox

### Sprint 3 (Weeks 9-10) — Polish & Hardening
- [ ] Bangla copy review (hire local proofreader 2h)
- [ ] Performance: <120KB JS, Lighthouse 90+, image optimization (next/image)
- [ ] Security: Rate limit via Vercel Edge Config, mask TxnIDs, audit log
- [ ] E2E tests: Playwright — Pay → Approve → Ledger flow
- [ ] Backup: Daily Supabase backup to Google Drive via cron

## 5.2 Migration Script (Logic)

```js
// migrate-v1-to-v2.js (Node)
const v1 = await fetch('https://jm2020science.netlify.app/api/state').then(r=>r.json());
for (const m of v1.members) {
  await supabase.from('profiles').insert({
    id: m.id, // keep old ID if UUID-like, else gen
    first_name: m.firstName,
    last_name: m.lastName,
    phones: m.phones,
    created_at: m.createdAt
  });
}
for (const t of v1.transactions) {
  await supabase.from('transactions').insert({
    profile_id: t.memberId,
    month_ids: t.months.map(k => monthMap[k]),
    amount: t.amount,
    method: t.method,
    txn_id_claimed: t.txnIdClaimed,
    status: t.status,
    receipt_no: t.receiptNo
  });
}
```

**Validation:** After migrate, run `SELECT sum(amount) FROM transactions WHERE status='approved'` → must equal 1550.

## 5.3 Prototype — Live Starter (Generated in This Workspace)

A **clickable HTML prototype** of the new Home + Pay flow has been built as a proof-of-concept.

→ File: `/home/user/JM2020-v2-Prototype.html` — open it for a mobile preview (bottom nav, pay flow, 3-tap).

This prototype uses the new tokens (Paper bg, Gold CTA) and demonstrates the improved simplicity vs v1.

## 5.4 Risks & Mitigations During Build

| Risk | Mitigation |
| :--- | :--- |
| Twilio OTP cost ($0.05/SMS) | Start with Email OTP + Magic Link, add Phone OTP only after 20 members |
| Supabase free tier limit (500MB) | 10 members = ~50KB, 5 years = 2MB — safe. Archive yearly |
| Bangla font PDF issues | Use `jspdf` + `Noto Sans Bengali` TTF embedded, test receipt |

---

**Deliverables:** Sprint Plan, Migration Logic, Prototype HTML.
**Next:** Phase 6 — Launch & Migrate
