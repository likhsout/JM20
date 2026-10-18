# PHASE 4 — UI DESIGN SYSTEM (Completed)
**JM 2K20 Science v2 — Warm Iftar at Dusk**
**Files:** `design-tokens.json` + This Spec + Hi-Fi Descriptions

---

## 4.1 Design Tokens (Live JSON)

Full tokens in `design-tokens.json` — import into Figma Tokens plugin or Tailwind `tailwind.config.js`.

**Palette Rationale:**
- **Ink #16233A** — trust, school authority (header/nav only, not background)
- **Paper #FFF8E7** — warm white, like iftar table cloth — primary bg (not cold #FBF7EE)
- **Gold #E8A838** — date, lantern — primary CTA (more vibrant than old #B27C33)
- **Sage #2D6A4F** — palm, success — paid states
- **Rose #AD5C46** — sunset — danger/rejected (softer)

## 4.2 Components (shadcn/ui Based)

| Component | Spec | States |
| :--- | :--- | :--- |
| **Button** | Primary: Ink bg, white text, 48px height, 12px radius, font 16px semi-bold. Gold variant for Pay. Full width on mobile. | default, hover (darken 8%), active (scale 0.98), disabled (50% opacity) |
| **Card** | White, 16px radius, 1px line border, soft shadow `0 4px 20px rgba(22,35,58,.06)`, padding 16px | — |
| **Badge** | Paid: sage/12% bg, sage text, dot. Pending: gold/14% bg. Rejected: rose/12%. 20px height, 999px radius | — |
| **Member Card** | Avatar (48px circle, initials or photo), name 15px 600, progress ring (SVG arc, 36px), total 13px muted. Tap → profile | — |
| **Month Pill** | 36px height, 999px radius, border. Unpaid: paper bg, ink text. Active (selected): Ink bg, white text. Paid: Sage bg, white check. Pending: Gold bg. Disabled: grey | default, selected, paid, pending, disabled |
| **Method Card** | 64px height, icon 28px left, name, number 12px. bKash pink border, Nagad orange, etc. Selected: 2px gold border + check | default, selected |
| **Bottom Nav** | 64px height, white, top border, 5 icons (Home, Members, Pay, Ledger, Me). Active: Gold + label bold. Badge for pending (rose dot + count) | — |
| **Input** | 44px height, 10px radius, line border, paper bg, 15px text. Focus: gold 2px. Error: rose | default, focus, error |

## 4.3 Hi-Fi Screens (Described for Figma — 5 Key Screens)

### Screen 1: Home Dashboard (Mobile, 390px)
- **Top:** Ink header 72px: Left logo (school) + "JM 2K20 Science" + "Purbadhala, Netrakona" 11px. Right: lang toggle `বাংলা` pill + avatar (if logged in).
- **Hero:** Paper bg, not dark. Center: Circular progress (140px): `10%` arc gold, center `1,550 BDT` 22px bold, subtitle `of 15,000 goal`. Below: Countdown pill: `🕌 132 days to Iftar 2027`.
- **Due Card:** White card, shadow: Left: `October` 14px + `50 BDT due` 16px bold, Right: `6/10 paid` + **Pay Now** gold button (120px).
- **Feed:** Title `Recent Activity` 13px muted + `View all`. List: 3 rows: `[Avatar] Shuhada approved Likhon's Nagad • 2h ago • 50 BDT [✓]`.
- **Notices:** Amber banner: `📢 MONTHLY - 50 TAKA` + dismiss x.
- **Bottom Nav:** Fixed.

### Screen 2: Pay — Month & Method
- Header: `Make a Payment` + `Back`.
- Step 1: `Paying as: Rahat (01960012929) [Change]` — auto.
- Step 2: `Select months` — pills: Apr `[✓ Paid]` disabled grey, May `[ ]` white, Jun `[ ]`... Tapping adds to amount bar (sticky bottom: `2 months = 100 BDT — Continue`).
- Step 3: `How will you pay?` — 2x2 grid: [bKash] [Nagad] [Rocket] [Cash] — icons, names. Bank as small link `Other: Bank →`.
- Step 4 (appears): Input `bKash TxnID` with helper `Found in bKash SMS: "TxnID DIT84TPYVU"` + paste icon. Submit gold button sticky bottom.

### Screen 3: Admin Pending Queue
- Header: `Pending (3)`.
- Cards: Each: Member avatar + name, `May, Jun (2) • 100 BDT • bKash`, `Claimed: DIT84TPYVU` mono, `Submitted 12 min ago`, input `Re-enter TxnID to approve` + **Approve** (ink) + **Reject** (rose outline).

### Screen 4: Ledger Timeline
- Search bar sticky: `Search name, receipt, TxnID...`.
- Filters: `All | Approved | Pending | Rejected` pills (active ink).
- Summary: 3 mini cards: `Total 1,550`, `Pending 0`, `Members 10`.
- Timeline: Group `Today` → rows: `Likhon • Apr • 50 BDT • Nagad • 08:12 • R-3Q843V [Approved by Shuhada]`.

### Screen 5: Member Profile
- Header: Large avatar 72px, name 20px, phone, `Edit`.
- Progress: Ring `6/12 months • 300 BDT` + bar `50%`.
- Grid: 12 cells: Apr `[✓]` green, May `[✓]` green... Dec grey. Tap cell shows txn.
- History: Below grid, list of 2 txns.

## 4.4 Accessibility & Bangla

- Bangla strings reviewed by native (not Google Translate) — e.g., "মাস নির্বাচন করুন" for Select months.
- Contrast: Ink on Paper 12:1, Gold on Ink 6:1 — AA.
- Tap targets 48px min, focus rings gold 2px.

---

**Deliverables:** `design-tokens.json`, Component Spec, 5 Hi-Fi descriptions (ready for Figma).
**Next:** Phase 5 — Build (Prototype + Staging)
