# Deploy Checklist — JM 2K20 v2

## Step 1: Supabase (5 min)
- [ ] Go to supabase.com → New Project → Singapore → `jm2020-v2`
- [ ] SQL Editor → Paste `supabase.sql` → Run → Verify 12 months inserted
- [ ] Table Editor → check `profiles`, `transactions` exist
- [ ] Settings → API → Copy URL + anon key → Create `.env.local`

## Step 2: Test Migration (3 min)
- [ ] `npm install @supabase/supabase-js`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- [ ] `node scripts/migrate-v1.js` → should say Verified 1550 BDT ✓

## Step 3: Vercel (3 min)
- [ ] `git push` to GitHub
- [ ] vercel.com → New Project → Import → Add Env Vars → Deploy
- [ ] Test https://your-vercel-url.vercel.app/pay — submit test 50 BDT

## Step 4: Domain (5 min + DNS propagate)
- [ ] Buy jm2020science.com ($12 Namecheap)
- [ ] Vercel → Domains → Add → Update nameservers
- [ ] Keep old netlify.app as redirect

## Step 5: Launch Night
- [ ] Freeze v1, export final state
- [ ] Run migrate again for latest 1-2 txns
- [ ] WhatsApp broadcast + QR poster

