# JM 2K20 Science — Complete Redesign Master Plan
### Keep the Soul, Rebuild Everything Else
**Purbadhala J.M. Govt Pilot High School | Iftar Fund OS | v2.0 Vision**

> Core Intention (untouchable): *Make the annual Ramadan Iftar fund simple, transparent, together.*
> Everything else is negotiable.

---

## 0) The Philosophy Before The Plan

Your current site is **good at trust** — ledger, receipts, approval gate. It’s **weak at scale, joy, and simplicity**. People don’t pay because they’re confused, forget, or don’t feel the *warmth* of the Iftar.

**Redesign Principles for v2:**

1.  **Bangla-First, Mobile-Only** — 90% will use a 5" Android on 3G in Purbadhala/Netrakona/Dhaka. Design for thumb, not mouse.
2.  **3-Tap Rule** — Any batch-mate must go from Home → Payment Submitted in 3 taps. No profiles walls.
3.  **Transparency is the Feature** — Ledger is not a tab, it’s the homepage. Everyone sees everything by default.
4.  **Joyful Ritual, Not Bills** — This is Iftar, not tax. Show faces, memories, countdown to Iftar, dua, not just BDT.
5.  **Zero Training Admin** — Shuhada & Rofy should approve a payment in 10 seconds while on a rickshaw.
6.  **Offline & Low-Data** — Cache ledger locally. Work on 2G, <100KB load.

---

## 1) The Process — How We Do This Properly (6 Phases, 8-12 Weeks)

| Phase | Name | Duration | What Happens | Deliverable |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | **Discovery** | Week 1 | Stakeholder interviews (Rofy, Shuhada, 3 payers, 3 non-payers), review current `/api/state` + pain points, competitor scan (batch fund apps, Splitwise, Bangladeshi donation sites), define success metrics | Discovery Doc, User Map, Metrics Sheet |
| **P1** | **Define (SRS+PRD)** | Week 1-2 | Write full SRS (what to build) and PRD (why & for whom). Lock scope. Get batch vote on WhatsApp | **SRS v1, PRD v1** (see templates in this workspace) |
| **P2** | **UX & Architecture** | Week 2-4 | User flows, sitemap, low-fi wireframes, data model, API contract, tech stack decision | Wireframes (Figma), DB Schema, API Spec |
| **P3** | **UI Design System** | Week 3-5 | Design tokens, components, hi-fi screens (light/dark + Bangla), prototype for 3 flows, usability test with 5 users | Figma Design System, Interactive Prototype |
| **P4** | **Build** | Week 5-10 | Frontend + Backend + Admin, in 2-week sprints. Weekly demo to admins | Staging URL (`v2.jm2020science...`) |
| **P5** | **Launch & Migrate** | Week 10-12 | Migrate live 10 members + 1550 BDT history, train admins (10-min video), archive v1, announce to batch with broadcast + QR poster for school gate | Live v2, Training Loom, Launch Kit |

**Your Role:** Be the Product Owner. Approve PRD. Connect us to 3-4 batch-mates for 15-min interviews.
**Admins' Role:** Test pending approvals daily during build.

---

## 2) UI/UX Redesign — Everything Detailed

### A. Information Architecture (New Sitemap)

**Before:** 7 tabs hidden behind hamburger — people never find Ledger.
**After:** Bottom Tab Bar (always visible, thumb-reachable):

```
[ Home ] [ Members ] [ Pay ] [ Ledger ] [ Me ]
```

- **Home (new):** Not a hero + stats. It’s a **Live Iftar Dashboard**:
  - Top: Countdown: "87 days to Iftar 2027" + Circular progress: `1,550 / 6,000 BDT (Goal)` — animated.
  - Middle: **This Month's Due** card — 50 BDT — Pay Now button (big, gold).
  - Bottom: **Recent Activity Feed** — "Shuhada approved Likhon's Nagad — 2 hours ago" — like a social feed. This builds trust *and* FOMO.
  - Notices as dismissible banners, not a section.

- **Members:** Grid of **faces** (not just initials). Each card: photo (optional), name, progress ring (e.g., 8/12 paid), Total. Tap to see their ledger. Search + Filter: `All | Paid | Unpaid`.

- **Pay:** Single screen, no "who is this for?" fork. Auto-detects logged-in user. Smart month picker: shows only unpaid months as pills (green = select, grey = paid). Amount auto-updates with haptic. Payment method: **large icons** (bKash pink, Nagad red, Rocket purple) — not dropdowns.

- **Ledger (Full Accounts):** The hero feature. Not a table. It’s:
  - Summary cards: Total, Approved, Pending.
  - Timeline view: Grouped by date, with avatar, method icon, receipt link. Search sticks to top. PDF export FAB.

- **Me:** My profile, My payments, My receipts, Settings, Language, Logout.

### B. UI Visual Direction

**Current Vibe:** Formal, government-ledger, dark ink + gold. Trusted but cold.
**New Vibe:** **Warm, Festive, Modern Bangladeshi** — Iftar at Dusk.

- **Palette:** Keep Ink (#16233A) as header only. Primary background becomes **Warm White #FFF8E7**. Accent becomes **Iftar Gold #E8A838** + **Date Brown #5C2B0E** + **Palm Green #2D6A4F** for success. Softer, more inviting.
- **Typography:** Keep Tiro Bangla + Hind Siliguri (excellent choice) but add **Baloo Da 2** for numbers/BDT to make amounts pop.
- **Components:** 
  - **Glass Cards:** Soft shadow, 16px radius, white with subtle paper texture.
  - **Progress Rings:** Not numbers — visual rings for each member.
  - **Method Pills:** Big, colored, with icons — tap, not select.
  - **Empty States:** Illustrations (e.g., empty lantern) not "No one found".
- **Motion:** Micro-interactions only: pay button scale, approval confetti, pull-to-refresh. 60fps on low-end Android.

### C. Simplicity Tactics

1.  **Progressive Disclosure:** Show 3 payment methods first, "More (Bank)" expands. Don't show 5 boxes on load.
2.  **Guest Pay:** Allow payment *without* creating full profile — just name + phone + months → creates shadow profile. Friction kills 30% of payments.
3.  **One-Phone Rule:** Auto-format `01XXXXXXXXX`, validate 11 digits live. WhatsApp toggle is auto-on if number is on WhatsApp.
4.  **No PIN Hell:** Login via **OTP over SMS/WhatsApp** (or magic link), not 4-digit PIN. Admins also use OTP.
5.  **Bangla by Default:** If phone is BD, default language is Bangla. Toggle is a switch, not a page reload.

---

## 3) Functionality — What to Keep, Kill, Add

### KEEP (Core DNA)
- Monthly ledger (12 months), approval gate, receipt generation, copy number buttons, member profiles, notices, bilingual.

### KILL / FIX
- **Kill:** Custom layout editors (payment box x/y drag) — too complex, no one uses. Use fixed, beautiful templates.
- **Kill:** Top-bar override text fields — confusion.
- **Fix:** 404 on `/members` — use real Next.js routes + proper URLs.
- **Fix:** Cash flow — currently 2 rejections with no reason. Require photo proof or admin note.

### ADD — The v2 Superpowers

1.  **Smart Reminders:** Auto-WhatsApp/SMS on 1st & 25th: "Assalamu Alaikum Rahat, May's 50 BDT is due — Pay in 10 sec: [link]". Admin can send 1-tap nudge from Members list.
2.  **Install as App (PWA):** "Add to Home Screen" — works offline, shows my balance, push notification on "Your payment approved — Receipt R-XXXX".
3.  **Expense Transparency 2.0:** Not just hidden line items. After Iftar: Upload **bills + photos** (receipts, venue, food), total auto-calc, leftover shown, community vote on leftover use.
4.  **Ramadan Mode:** Auto-activates 30 days before Ramadan: Countdown, Dua of the Day, Iftar menu poll, seating plan, live expense ticker during event.
5.  **Leaderboard & Streaks:** "Top Contributors", "6-month streak 🔥" — gentle gamification. No shaming — celebrate, don't expose slackers harshly.
6.  **History & Archives:** Every year is an archive. See "2026: 1,550 BDT — 10 members — Photos" then reset. Permanent memory.
7.  **Voice Note Messages:** Instead of typing to admins, send 15-sec voice note — much easier for BD users.

---

## 4) Simplicity — The Ruthless Checklist

Before shipping any screen, ask:

- [ ] Can my nani use this in 10 seconds?
- [ ] Does it work without internet after first load?
- [ ] Is every Bangla translation human (not Google-translate)?
- [ ] Is the next step the biggest button on screen?
- [ ] Is there only ONE way to do the main job (Pay)?

---

## 5) Technology — What to Rebuild With

**Current:** Single `index.html` + JSON blob on Netlify Functions. Works, but won’t scale past 100 members/transactions, no real DB queries, no auth.

**Recommended v2 Stack (Modern, Simple, Bangladesh-friendly):**

- **Frontend:** **Next.js 14+ (App Router)** + **Tailwind + shadcn/ui** — real routes (`/members/[id]`), SEO, fast. Deployed on **Vercel or Netlify**.
- **Backend:** **Supabase (Postgres + Auth + Storage)** — free tier is enough for 1000 members. Better than Netlify Blobs. Real SQL for ledger queries.
- **Auth:** **Supabase Auth (Phone OTP)** — no PINs. Admin roles via Row Level Security.
- **Storage:** Supabase Storage for QRs, logos, bill photos.
- **PDF:** Keep `jsPDF` but server-generate via API route for better fonts (Bangla support).
- **Push:** **Firebase Cloud Messaging** for reliable push on Android (WhatsApp is primary, push is secondary).
- **Analytics:** **PostHog** (self-hostable) — track `Pay Started`, `Pay Submitted`, `Approved` — know where people drop.
- **Domain:** Keep `jm2020science.netlify.app` but add custom `jm2020science.com` (10 USD/year) for trust.

**Data Model (Supabase Tables):**
`profiles (id, name, phones[], avatar_url, created_at)`
`months (id, en, bn, year, due_date)`
`transactions (id, profile_id, month_ids[], amount, method, txn_id, cash_admin, status, submitted_at, approved_by, receipt_no)`
`notices (id, en, bn, pinned, created_at)`
`expenses (id, year, category, amount, bill_url, published)`
`archives (id, year, snapshot_json)`

---

## 6) SRS & PRD — What They Are & Where They Are

I’ve drafted **complete, fill-in-ready templates** for your project in this workspace:

- **SRS (Software Requirements Specification)** — *What the system must do* — for developers. Includes functional reqs, non-functional (performance, security), data model, API contracts, constraints.
  → `/home/user/JM2020-SRS.md`

- **PRD (Product Requirements Document)** — *Why & for whom* — for stakeholders. Includes vision, personas, user stories, success metrics, roadmap, risks.
  → `/home/user/JM2020-PRD.md`

They are interlinked. **Read PRD first** (vision), then SRS (build). You can hand them to any freelancer/agency and they’ll know exactly what to build.

---

## 7) Your Immediate Action Plan — This Week

1.  **Approve the Vision** (today) — Read the "Philosophy" above. Does "Warm Iftar, not Cold Ledger" feel right?
2.  **3 Interviews** (tomorrow) — Call Rofy, Shuhada, + 1 non-payer (e.g., Foysal Ahmed). Ask: "Why haven’t you paid? What confused you?"
3.  **Lock PRD** (Day 3) — Edit `JM2020-PRD.md` — fill in Goal amount for 2027 (e.g., 5,000 BDT?), confirm monthly fee stays 50 BDT.
4.  **I Will Build** — Once you say "go", I can generate: Figma design tokens, Supabase schema SQL, and a live Next.js starter prototype in this workspace (with preview link).

Want me to generate the **Figma-ready design system** and **Supabase SQL** next, or refine the SRS/PRD first?

