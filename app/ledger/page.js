"use client";
import { transactions } from "../../data/mockData";
import { useState } from "react";

export default function Ledger() {
  const [q,setQ]=useState("");
  const [filter,setFilter]=useState("All");
  const list = transactions.filter(t=>{
    if (filter!=="All" && t.status!==filter.toLowerCase()) return false;
    if (q && !(t.name.toLowerCase().includes(q.toLowerCase()) || t.receipt.toLowerCase().includes(q.toLowerCase()) || t.txnId.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });
  return (
    <main className="max-w-[480px] mx-auto w-full pb-24 bg-paper min-h-screen">
      <header className="bg-white border-b border-black/10 sticky top-0 z-20">
        <div className="flex items-center gap-3 px-4 h-[56px]">
          <a href="/" className="text-xl">←</a>
          <h1 className="font-bold">Full Accounts</h1>
          <span className="ml-auto text-xs bg-sage text-white rounded-full px-3 py-1">1,550 BDT total</span>
        </div>
        <div className="px-4 pb-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, receipt, TxnID…" className="w-full bg-paper border border-black/10 rounded-xl px-4 py-2.5 text-sm" />
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {["All","Approved","Pending","Rejected"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${filter===f ? 'bg-ink text-white border-ink' : 'bg-white border-black/10'}`}>{f}</button>
            ))}
          </div>
        </div>
      </header>
      <div className="px-4 mt-3 grid grid-cols-3 gap-2">
        <div className="bg-white rounded-xl border border-black/5 p-3 text-center"><div className="font-bold">1,550</div><div className="text-[10px] uppercase text-muted">BDT Total</div></div>
        <div className="bg-white rounded-xl border border-black/5 p-3 text-center"><div className="font-bold">0</div><div className="text-[10px] uppercase text-muted">Pending</div></div>
        <div className="bg-white rounded-xl border border-black/5 p-3 text-center"><div className="font-bold">10</div><div className="text-[10px] uppercase text-muted">Members</div></div>
      </div>
      <div className="px-4 mt-3">
        <a className="w-full bg-white border border-black/10 rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2">📄 Download PDF</a>
      </div>
      <div className="px-4 mt-3 space-y-2">
        {list.map(t=>(
          <div key={t.id} className="bg-white rounded-2xl border border-black/5 shadow-card p-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted">{t.months} • {t.amount} BDT • {t.method} • {t.date}</div>
                <div className="mono text-xs mt-1">Txn: {t.txnId} • Receipt: {t.receipt} {t.by && `• By ${t.by}`}</div>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded-full font-bold border ${t.status==='approved'?'bg-sage/10 text-sage border-sage/20':'bg-rose/10 text-rose border-rose/20'}`}>{t.status}</span>
            </div>
          </div>
        ))}
        {list.length===0 && <div className="text-center text-sm text-muted py-8">No matching transactions.</div>}
      </div>
    </main>
  )
}
