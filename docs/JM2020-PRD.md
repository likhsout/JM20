# PRODUCT REQUIREMENTS DOCUMENT (PRD)
### JM 2K20 Science — Iftar Fund OS v2.0
**For:** Purbadhala J.M. Govt Pilot High School, Batch 2020 Science
**Document:** JM2020-PRD-2026-10-18 • v1.0 Draft
**Owner:** Batch Admins (Rofy & Shuhada) + Arena PM
**Audience:** Stakeholders, Designers, Engineers, QA

---

## 1. Vision & Strategy

### 1.1 Why Rebuild?
v1 (`jm2020science.netlify.app`) proved the idea: 10 members, 1,550 BDT, 8 approvals, 0 pending — **trust works**. But audit shows: 40+ batch-mates never joined, 4 profiles at 0 BDT, 2 rejections confused, cold ledger vibe, PIN auth friction, no reminders, no Iftar joy.

**Vision (1 sentence):** *The batch’s most trusted, most loved app — where paying for Iftar feels like joining family, not paying a bill.*

**North Star Metric:** **% of batch who are "Clear" (paid all 12 months)** — from 10% (1/10) today → 60% (30/50) by Iftar 2027.

### 1.2 Goals (Measurable, 6 months)

| Goal | Current (18 Oct 2026) | Target (Ramadan 2027 ~ Mar 2027) |
| :--- | :--- | :--- |
| Members onboarded | 10 | 40 (80% of ~50 science batch) |
| Collection rate | 1,550 / 6,000 (26% potential) | 15,000 BDT (50 × 12 × 25 avg) |
| Fully-paid members | 1 (Hasan Rofy) | 15 with 12/12 streak |
| Admin approval time | ~30 min median | < 5 min median (push + simple UI) |
| Monthly active payers | 4 in Oct | 20/month |

### 1.3 Non-Goals (What We Will NOT Do in v2)
- No merchant bKash gateway (cost + KYC); manual TxnID stays.
- No multi-school platform (stay batch-focused).
- No chat/forum (WhatsApp already does it better).
- No selling goods/e-commerce.

---

## 2. Users & Personas

### Persona 1: "Rahim the Reluctant Payer"
- **Age:** 22, Dhaka University 2nd year, lives in mess, tight budget.
- **Phone:** Redmi 9A, Bangla UI, 2GB data/month.
- **Pain:** "I want to pay but I forget, and I don’t know where to send. Messenger message gets lost. I don’t want to be shamed."
- **Need:** 1-tap reminder on 1st of month, big Pay button, see that friends already paid.

### Persona 2: "Shuhada the Treasurer"
- **Age:** 22, Netrakona, manages fund between classes.
- **Phone:** Always on the move, 10 pending approvals after Friday Jummah.
- **Pain:** "I get 5 TxnIDs on WhatsApp, I copy to site, I typo. People send Cash and I forget who gave."
- **Need:** Approve in 10 sec, auto-match TxnID, one list, push alert.

### Persona 3: "Nusrat the Observer" (female batch-mate, maybe non-payer)
- **Need:** See transparency without paying yet, feel included, maybe volunteer for Iftar decoration.

**Insight:** All 3 need **language Bangla, offline view, and zero learning**.

---

## 3. User Stories & Jobs

**Format:** As a [user], I want [goal] so that [benefit] → Acceptance in SRS.

- **US-01 (Member):** As Rahim, I want to pay for April+May (100 BDT) via bKash by pasting TxnID in <30 sec, so I’m clear before exam.
- **US-02 (Member):** As Foysal (0 BDT), I want to see that 9/10 paid April, so I feel motivated (social proof) not forced.
- **US-03 (Admin):** As Shuhada, I want to approve a bKash payment by re-typing TxnID and get auto-receipt, so I’m audit-safe.
- **US-04 (Admin):** As Rofy, I want to nudge 5 unpaid members with 1 pre-written WhatsApp message, so I don’t type 5 times.
- **US-05 (Everyone):** As a member, I want to download a receipt PDF with QR to post on Facebook, so I show I contributed.

**Priority:** P0 = Must (US-01,03,05), P1 = Should (US-02,04)

---

## 4. Product Scope (What Builds Trust & Joy)

### 4.1 Core Flows (Must Ship)

1.  **Onboard → Pay in 3 taps** (Guest pay allowed)
2.  **Approve/Reject with TxnID match** (with reason)
3.  **Live Home Dashboard** (progress to goal, recent feed, Pay CTA)
4.  **Full Ledger** (search, filter, export)
5.  **Bilingual + PWA**

### 4.2 Delighters (Ship if Time)

- Leaderboard (Top 3, no bottom shaming)
- Ramadan Countdown + Dua
- Bill photo uploads after Iftar
- Voice note to admins

### 4.3 Explicit NOT in v2
- Comments/likes on transactions (adds moderation)
- Auto bank sync

---

## 5. Design Principles (Hand to Designer)

1.  **Thumb First:** Bottom nav, 48px tap targets, no tiny dropdowns.
2.  **Bangla Beautiful:** Use Tiro Bangla for headlines, Hind Siliguri for body. Never machine-translate — hire a Bangla copywriter for 1 hour.
3.  **Celebrate, Don’t Shame:** Green for paid, grey for unpaid (not red). Streaks are rewards, not warnings.
4.  **One Primary Action Per Screen:** Pay screen = Pay button is 90% width, gold, sticky bottom.

**Mood Board Keywords:** *Dusk, Lantern, Date, Warmth, Brotherhood, Trust*

---

## 6. Information Architecture & Navigation

```
App Shell
├─ Home (/): Dashboard (goal ring, countdown, this-month due, feed, notices banner)
├─ Members (/members): Grid → Profile (/members/[id])
├─ Pay (/pay): Month pills + Method + TxnID → Success → Receipt
├─ Ledger (/ledger): Timeline + Filters + Export
├─ Me (/me): My payments, Edit profile, Settings (lang, privacy), Admin entry
└─ Admin (/admin): Pending (badge), Members, Settings, Notices, Expenses, Messages, Archives
```
Mobile: Bottom tabs `Home | Members | Pay | Ledger | Me`. Desktop: Top nav same.

---

## 7. Key Features — PRD Detail (Why, Not How)

### 7.1 Home Dashboard — The Trust Engine
- **Problem:** Current home is generic hero + 3 numbers — no urgency, no story.
- **Solution:** Show goal progress (e.g., 1,550/15,000), recent 5 activities (social proof), "April due — 6 friends paid" nudge.
- **Success:** Click-through from Home → Pay increases from ~10% to >30%.

### 7.2 Payment: The 3-Tap Pay
- **Problem:** "Who is this for?" fork confuses first-timers. Month checkboxes are tiny.
- **Solution:** Remove fork. If logged in → pre-select me. If not → quick name+phone inline (creates profile). Month pills large, amount live.
- **Metric:** Time to submit < 30 sec (vs 90 sec now), drop-off <20%.

### 7.3 Admin: 10-Second Approval
- **Problem:** Approving on mobile is painful, typo risk.
- **Solution:** Pending cards with big Approve/Reject, TxnID re-type field with auto-focus, success confetti.
- **Metric:** Median approval <5 min.

### 7.4 Expenses & Photos — Closing the Loop
- **Why:** Members pay but never see where money went — trust erodes before next year.
- **What:** After Iftar, admin publishes: Food 12,000, Venue 3,000, Decoration 800 — with 3 bill photos + "Leftover 1,200 → donated to school library" note. Shown as expandable card on Home.

---

## 8. Metrics & Analytics

Track via PostHog (privacy-friendly, self-host):

| Event | Properties | Why |
| :--- | :--- | :--- |
| `view_home` | — | Traffic |
| `pay_started` | profileId | Funnel start |
| `pay_submitted` | amount, months, method | Conversion |
| `pay_approved` | method, approver | Admin speed |
| `ledger_searched` | query | Discovery |
| `nudge_sent` | adminId, memberId | Engagement |

**Dashboard:** Weekly: Collection rate, approval time, drop-off at Pay (where users quit).

---

## 9. Release Plan

- **MVP (Week 6):** Auth OTP + Members + Pay + Approve + Ledger + Home Dashboard — launch to 10 testers (current payers).
- **Beta (Week 8):** Expenses, Nudge, PWA, Bangla polish — invite 20 more via WhatsApp broadcast.
- **v2.0 Launch (Week 10-12):** Migrate data, Ramadan Mode teaser, posters with QR at school gate + Facebook.

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Admins busy, slow approvals | Trust loss, members stop paying | Push alerts + delegate 3rd admin (Afjal?) |
| Network poor in Netrakona, submit fails | Lost payments | Offline queue + WhatsApp fallback + low-data mode |
| TxnID fraud (fake IDs) | Money lost | Re-type verification + receipt QR + monthly bank statement audit (admin checks 10% random) |
| Low adoption (40 never join) | Goal miss | Leaderboard + friend invite reward (shoutout) + school teacher endorsement |
| Data loss (Supabase free limit) | Catastrophic | Daily auto-backup to Drive, archive year, export JSON weekly |

---

## 11. Open Questions for Stakeholders

1.  Confirm monthly amount stays 50 BDT for 2027 cycle? (If raise to 100, update PRD)
2.  Confirm DBBL account owner Afjal Hasan is okay as bank option, or add second bank?
3.  Who is 3rd backup admin if Rofy/Shuhada travel?
4.  Should unpaid members be gently visible (e.g., "4 friends pending") or fully private? (Current: fully public ledger — we propose masked = kindness)
5.  Budget for domain (`jm2020science.com` ~ 12 USD/yr) + Supabase Pro if we exceed free (25 USD/mo)?

---

## 12. Appendix — v1 Learnings to Preserve

Keep from v1 (love it): Monthly grid visual, receipt PDFs, bilingual, copy buttons, transparent ledger, admin pin concept (evolve to OTP), warm gold/ink palette (evolve to warmer).
Kill from v1: Custom layout editor (power user, no use), PIN-only auth, single JSON blob.

---

**Next Step:** Review SRS (`JM2020-SRS.md`) for build specs. Approve this PRD via WhatsApp thumbs-up, then we kick off P2 UX wireframes.

**Sign-off:** _____________ Rofy | _____________ Shuhada | _____________ Batch Rep | Date: _______

