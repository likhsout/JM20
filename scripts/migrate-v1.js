// One-time migration: v1 JSON blob → Supabase v2
// Usage: node scripts/migrate-v1.js
// Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY

const fs = require("fs");

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Missing env: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(url, serviceKey);

  console.log("Fetching v1 state from https://jm2020science.netlify.app/api/state ...");
  const v1 = await fetch("https://jm2020science.netlify.app/api/state").then(r=>r.json());
  console.log(`v1: ${v1.members.length} members, ${v1.transactions.length} txns, v${v1.meta.v}`);

  // Fetch months to map old keys → new UUIDs
  const { data: months } = await supabase.from("months").select("id, key, en");
  const monthMap = Object.fromEntries(months.map(m=>[m.key, m.id]));
  console.log("Month map:", monthMap);

  // Insert profiles
  for (const m of v1.members) {
    const { error } = await supabase.from("profiles").upsert({
      id: m.id.length===36 ? m.id : undefined, // keep if UUID, else generate
      first_name: m.firstName,
      last_name: m.lastName,
      phones: m.phones,
      created_at: m.createdAt,
    }, { onConflict: "id" });
    if (error) console.error("Profile insert error:", m.firstName, error.message);
    else console.log("✓ Profile:", m.firstName, m.lastName);
  }

  // Insert transactions
  for (const t of v1.transactions) {
    const monthIds = t.months.map(k => monthMap[k]).filter(Boolean);
    if (!monthIds.length) console.warn("Missing month map for", t.id, t.months);
    const { error } = await supabase.from("transactions").upsert({
      id: t.id.length===36 ? t.id : undefined,
      profile_id: t.memberId,
      month_ids: monthIds,
      amount: t.amount,
      method: t.method,
      txn_id_claimed: t.txnIdClaimed,
      cash_admin_id: t.cashAdmin ? v1.members.find(m=>m.firstName.toLowerCase().includes(t.cashAdmin.toLowerCase()))?.id : null,
      status: t.status,
      submitted_at: t.submittedAt,
      approved_at: t.approvedAt,
      receipt_no: t.receiptNo || null,
    }, { onConflict: "id" });
    if (error) console.error("Txn error:", t.id, error.message);
    else console.log("✓ Txn:", t.receiptNo || t.id, t.amount, t.status);
  }

  // Verify
  const { data: verify } = await supabase.from("transactions").select("amount, status");
  const total = verify.filter(t=>t.status==="approved").reduce((s,t)=>s+t.amount,0);
  console.log(`\nVerified total approved: ${total} BDT (expected 1550) — ${total===1550 ? "✓ PASS" : "✗ FAIL"}`);
  console.log("Migration done. Check Supabase Table Editor → profiles, transactions");
}

run().catch(e=>{ console.error(e); process.exit(1); });
