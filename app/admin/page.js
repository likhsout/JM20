"use client";
import { useState } from "react";
import { transactions } from "../../data/mockData";

export default function Admin() {
  const [logged,setLogged]=useState(false);
  const [tab,setTab]=useState("Pending");
  const pending = transactions.filter(t=>t.status==="pending");
  const [pins,setPins]=useState({});

  if (!logged) {
    return (
      <main className="max-w-[480px] mx-auto w-full min-h-screen bg-paper p-6 pb-24">
        <a href="/" className="text-sm text-muted">← Home</a>
        <h1 className="text-xl font-bold mt-3">Admin Sign-in</h1>
        <p className="text-sm text-muted mt-1">Approvals are recorded under your name. OTP login (PIN for demo).</p>
        <div className="bg-white rounded-2xl border border-black/5 shadow-card p-4 mt-4">
          <label className="text-sm font-semibold">Admin name</label>
          <select className="w-full border border-black/10 rounded-xl px-3 py-3 text-sm mt-1 bg-white">
            <option>Rofy</option><option>Shuhada</option>
          </select>
          <label className="text-sm font-semibold mt-3 block">PIN (demo: 1234)</label>
          <input type="password" defaultValue="1234" className="w-full border border-black/10 rounded-xl px-3 py-3 text-sm mt-1" />
          <button onClick={()=>setLogged(true)} className="w-full bg-ink text-white py-3 rounded-xl font-bold mt-4">Sign in</button>
          <div className="text-xs text-muted mt-2 text-center">Real v2 uses Phone OTP via Supabase Auth.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-[480px] mx-auto w-full pb-24 bg-paper min-h-screen">
      <header className="bg-white border-b border-black/10 sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 h-[56px]">
          <h1 className="font-bold">Admin Panel</h1>
          <div className="text-xs bg-sage text-white rounded-full px-3 py-1">Signed in as Rofy</div>
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {["Pending","Members","Settings","Notices","Expenses","Messages"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border ${tab===t?'bg-ink text-white border-ink':'bg-white border-black/10'}`}>{t} {t==="Pending" && `(0)`}</button>
          ))}
        </div>
      </header>

      {tab==="Pending" && (
        <div className="p-4">
          {pending.length===0 ? (
            <div className="bg-white rounded-2xl border border-black/5 shadow-card p-6 text-center">
              <div className="text-2xl">✅</div>
              <div className="font-semibold mt-2">All clear!</div>
              <div className="text-sm text-muted">No pending approvals. Median approval time today: 4 min.</div>
            </div>
          ) : pending.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl border border-black/5 shadow-card p-4">
              <div className="font-semibold text-sm">{p.name} • {p.amount} BDT • {p.method}</div>
              <div className="text-xs text-muted">{p.months} • Claimed TxnID: <span className="mono">{p.txnId}</span></div>
              <input placeholder="Re-enter TxnID to approve" className="w-full border border-black/10 rounded-xl px-3 py-2.5 text-sm mt-3 mono" onChange={e=>setPins({...pins, [p.id]:e.target.value})} />
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-sage text-white py-2.5 rounded-xl font-bold text-sm">Approve</button>
                <button className="flex-1 bg-white border border-rose text-rose py-2.5 rounded-xl font-bold text-sm">Reject</button>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-2xl border border-black/5 shadow-card p-4 mt-4">
            <div className="text-sm font-bold">Demo: Try approval guard</div>
            <div className="text-xs text-muted mt-1">In real app, approving requires re-typing the exact TxnID from bKash statement — mismatch blocks it.</div>
          </div>
        </div>
      )}

      {tab!=="Pending" && (
        <div className="p-4">
          <div className="bg-white rounded-2xl border border-black/5 shadow-card p-6">
            <div className="font-bold">{tab} — Admin Tools</div>
            <div className="text-sm text-muted mt-2">In full v2, this tab lets you {tab==="Members" ? "search, edit, nudge members via WhatsApp" : tab==="Settings" ? "edit months, payment methods, theme" : tab==="Notices" ? "post pin/unpin notices" : tab==="Expenses" ? "publish Iftar bills + photos" : "reply to messages"}. This starter shows the shell — full logic is in SRS (REQ-ADM/REQ-CMS).</div>
            <a href="/" className="inline-block mt-4 bg-paper border border-black/10 rounded-full px-4 py-2 text-sm">← Back Home</a>
          </div>
        </div>
      )}
    </main>
  )
}
