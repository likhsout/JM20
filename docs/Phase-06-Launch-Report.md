# PHASE 6 — LAUNCH & MIGRATION PLAN (Completed: Plan)
**Week 10-12 | Zero-Downtime Migration**

---

## 6.1 Pre-Launch Checklist

- [ ] Supabase backup: Export `pg_dump` of v1-migrated data, store in Drive
- [ ] Domain: Purchase `jm2020science.com` (12 USD) → CNAME to Vercel, keep Netlify as fallback 301
- [ ] Test matrix: 5 devices — Redmi 9A, iPhone 12, Desktop Chrome, Huawei Y5, Samsung M02 — verify Pay 3-tap <30s
- [ ] Load test: 100 concurrent ledger views via k6 — <500ms p95
- [ ] Legal: Privacy notice: "Phones visible to batch only, masked for public — hide toggle available"

## 6.2 Migration Day (Cutover 2 Hours)

**Time:** Friday 10pm BD (lowest traffic) — announce 3 days prior on WhatsApp.

1.  **Freeze v1:** Set v1 banner "Upgrading to v2 — submit by 9pm, back by midnight"
2.  **Final Export:** `GET /api/state` → save `v1-final-2027-02-28.json` + PDF export of ledger
3.  **Run Migration Script** `migrate-v1-to-v2.js` → verify `sum=1550` + 10 profiles + 10 txns
4.  **Smoke Test:** Admin logs in via OTP, approves dummy 1 BDT test txn, checks ledger, deletes test
5.  **Switch DNS:** Netlify → Vercel (or keep both, update Netlify to redirect)
6.  **Announce:** WhatsApp broadcast (Bangla):

    > আসসালামু আলাইকুম 2K20 Science! 🎉 আমাদের নতুন ওয়েবসাইট লাইভ: jm2020science.com — এখন ৩ ট্যাপে পেমেন্ট, রশিদ ডাউনলোড, এবং প্রতি মাসের হিসাব স্বচ্ছ! তোমার প্রোফাইল আগের মতোই আছে — শুধু OTP দিয়ে লগইন করো। কোনো সমস্যা হলে Rofy/Shuhada কে জানাও।

7.  **QR Poster:** A4 poster for school gate: "Pay your Iftar contribution — Scan QR — 50 BDT/month" + UPI-style QR to `/pay`

## 6.3 Training (15 Min)

- Loom video (Bangla voiceover, 5 min): How to pay + How to see ledger
- Admin Loom (5 min): How to approve + nudge
- PDF 1-pager: "Admin Cheat Sheet — Approve in 10 sec"

## 6.4 Post-Launch Support (Week 11-12)

- Daily: Monitor `pending` queue, approval time, support inbox
- Weekly: PostHog review — where do users drop? Fix.
- After Iftar 2027: Publish expenses + 3 photos + archive year → `Past Years` page

---

**Deliverable:** Launch Plan, Migration Script, Broadcast Templates.
**Project Complete — Ready for Final Report.**
