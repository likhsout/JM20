# JM 2K20 Science — Iftar Fund OS v2

**Live v1:** https://jm2020science.netlify.app (1,550 BDT, 10 members)
**New v2 preview:** http://localhost:3000 (this repo) — `npm run dev`

## Quick Start (Preview — No Supabase Needed)

```bash
cd jm2020-v2
npm install
npm run dev
# → http://localhost:3000 — mockData active, all features work
```

## Connect Supabase (Make It Real)

1. Go to **supabase.com** → New Project → Region **Singapore** → Name `jm2020-v2` → Create (2 min)
2. **SQL Editor** → New Query → Paste **all** of `supabase.sql` → Run (creates tables + 12 months)
3. **Project Settings → API** → Copy `URL` + `anon public` key
4. Create `.env.local`:

```bash
cp .env.example .env.local
# edit .env.local — paste URL + anon key
```

5. Install Supabase client:

```bash
npm install @supabase/supabase-js
npm run dev
# Now Home → shows real DB (empty at first)
```

6. **Migrate v1 data** (one-time):

```bash
# Also add to .env.local: SUPABASE_SERVICE_ROLE_KEY (from API → service_role)
node scripts/migrate-v1.js
# Verifies 1,550 BDT ✓
```

7. Refresh `http://localhost:3000` → should show your 10 members from real DB.

## Deploy to Vercel (1 Click)

1. Push to GitHub: `git init && git add . && git commit -m "v2" && gh repo create jm2020-v2 --public --push`
2. Vercel → New Project → Import `jm2020-v2` → Add Env vars `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Deploy
3. Custom domain: Vercel → Domains → Add `jm2020science.com` (buy for $12/yr via Namecheap/GoDaddy, point CNAME to `cname.vercel-dns.com`)

## Structure

- `app/page.js` — Home Dashboard (goal ring, countdown, feed)
- `app/members` — Grid + filter
- `app/pay` — 3-tap Pay
- `app/ledger` — Timeline + export (next: jsPDF + QR)
- `app/admin` — Pending queue (OTP in full build — PIN demo now)
- `data/mockData.js` — Fallback when no DB
- `lib/supabaseClient.js` — Auto-switches mock ↔ real
- `supabase.sql` — Schema + seeds

## Next TODO (Post-MVP)

- Replace PIN with Supabase Auth OTP (see SRS REQ-AUTH-01)
- Add FCM push (`firebase` package)
- Add `jsPDF` + `qrcode` for receipts
- Enable RLS policies (uncomment in supabase.sql)

See `../JM2020-SRS.md` + `JM2020-PRD.md` for full spec.

