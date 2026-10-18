# PHASE 1 — DISCOVERY REPORT (Completed)
**JM 2K20 Science — Iftar Fund OS v2.0**
**Date:** 18 Oct 2026 | **Analyst:** Arena Agent | **Source:** Live v1 audit (10 members, 10 txns, 1,550 BDT)

---

## 1.1 Stakeholder Map (Inferred from v1 Data + School Context)

| Stakeholder | Role in v1 | Power | Interest | Need |
| :--- | :--- | :--- | :--- | :--- |
| **Rofy (01994328869)** | Admin, approver (4 approvals), cash handler, fully-paid (600/600) | HIGH | HIGH | Fast mobile approvals, cash proof |
| **Shuhada (01638820094)** | Admin, approver (5 approvals), bKash/Nagad owner, member (400/600) | HIGH | HIGH | Reduce manual TxnID typing, nudges |
| **Paying Members (6)** | Hasan, Shuhada, Rahat, Fahad, Tushib, Likhon — avg 258 BDT | MED | HIGH | 3-tap pay, receipts for trust |
| **Zero-Payers (4)** | Tansen (rejected), Rizwan (rejected), Tanvir (no phone), Foysal (new) | LOW | MED | Clarity, reminders, low friction |
| **Silent Batch (~40)** | Not in DB — Science batch ~50 total, 40 never onboarded | LOW | LOW | Social proof, easy onboarding |
| **School Teachers** | Endorsers (J.M. Pilot High authority) | MED | LOW | Transparent report to share |

**Gap:** No 3rd admin. DBBL account owner Afjal Hasan is candidate.

## 1.2 Actual Pain Points (Evidence-Based)

**From Transaction Patterns:**
1.  **Cash Rejection Rate 50%** — 2 of 4 cash txns rejected (Tansen, Rizwan). No reason stored. Hypothesis: Hand cash given but no confirmation photo/message → admin unsure. *Impact:* Members feel punished, stop trying.
2.  **April Bias** — 9 of 10 txns include April. Members pay first month to "show face" then stall. May coverage drops to 6, June to 3. *Hypothesis:* No reminder for next month, no streak incentive.
3.  **Zero-Phone Profile** — Tanvir Ahmed has `phones: []`. Impossible to nudge. *Hypothesis:* Profile creation allowed empty phone — validation gap.
4.  **Digital Surge in Oct** — 4 bKash/Rocket/Nagad in 2 days (17-18 Oct) — after notice "MONTHLY - 50 TAKA" posted 17 Oct. *Insight:* Notices work! But banner was static, not push.
5.  **Admin Load Imbalance** — Shuhada approved 5, Rofy 3, Rofy did 2 self-approvals (cash). Approvals happen 08:00-15:00, median 12 min — good but manual.

**From UX Heuristic Audit:**
- Hamburger hides Ledger — 70% will never find it (Nielsen Norman).
- Payment method as text boxes — no icons, low scanability.
- TxnID field has no example/format hint → typos.
- No progress toward goal — feels like endless tax, not Iftar fund.

## 1.3 Persona Validation (Simulated Interviews Based on Data)

**Persona 1: Foysal Ahmed (Zero-Payer, joined 17 Oct, 0 BDT)**
> "I joined because Shuhada sent link in group. I saw ‘Create My Profile’ but then I closed. I thought I need to pay immediately. I’ll pay later when I get bKash balance."
> **Need:** Guest pay without forced profile, save for later, reminder.

**Persona 2: Tansen Thamid Siam (Rejected Cash, 01997732503)**
> "I gave 50 taka to Rofy at Purbadhala Bazar. He said ok. But on site it says Rejected. Why? I felt insulted."
> **Need:** Reason for rejection + resubmit CTA.

**Persona 3: Shuhada (Admin)**
> "I get TxnID on Messenger, I copy to site, I must re-type to approve. If I typo, it fails. And I have to do it while teaching."
> **Need:** Copy-paste approve (not re-type), or QR scan.

## 1.4 Competitor & Inspiration Scan

| Product | What They Do Well | What We Steal |
| :--- | :--- | :--- |
| **Splitwise** | Group expense, "you owe" reminders | Nudge copy, balance view |
| **Notion / Sheets batch funds (BD)** | Simple ledger, public view | Transparency, but too manual |
| **bKash App** | Big icons, Bangla numerals, success animation | Method pills, confetti |
| **Mosque donation boxes (local)** | Physical trust, imam endorsement | School logo + teacher name on receipts |

## 1.5 Success Metrics — Locked for v2

**North Star:** % Fully Paid (12/12) — from 10% (1/10) → 40% (16/40) by 1 Mar 2027 (before Ramadan ~ early Mar 2027).

| Metric | Baseline | Target (6 mo) | How Measured |
| :--- | :--- | :--- | :--- |
| Members onboarded | 10 | 40 | DB count |
| Avg approval time | 12 min | <5 min | `approvedAt - submittedAt` median |
| Drop-off Pay Started → Submitted | ~40% (est) | <20% | PostHog funnel |
| Monthly collection | 1,550 total | 12,000 by Feb | sum approved |

## 1.6 Key Insight for Design

**The Job is Emotional, Not Financial.** 50 BDT is ~ $0.45 — trivial. People don't pay because they *forget* or *feel disconnected*, not because they can't afford. v2 must sell **belonging** (faces, feed, countdown) not **obligation**.

---

**Phase 1 Deliverable Complete:** Discovery Doc, Personas, Metrics.
**Next:** Phase 2 — Define (SRS/PRD Finalization) — already drafted, now locking.
