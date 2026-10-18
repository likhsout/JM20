"use client";
import { members } from "../../data/mockData";
import { useState } from "react";

export default function MembersPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const list = members.filter(m => {
    if (q && !(`${m.firstName} ${m.lastName}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (filter==="Paid" && m.status!=="full") return false;
    if (filter==="Unpaid" && m.status!=="unpaid") return false;
    if (filter==="Partial" && m.status!=="partial") return false;
    return true;
  });
  return (
    <main className="max-w-[480px] mx-auto w-full pb-24 bg-paper min-h-screen">
      <header className="bg-white border-b border-black/10 sticky top-0 z-20">
        <div className="flex items-center gap-3 px-4 h-[56px]">
          <a href="/" className="text-xl">←</a>
          <h1 className="font-bold">All Members</h1>
          <span className="ml-auto text-xs bg-paper2 rounded-full px-3 py-1">{list.length} / {members.length}</span>
        </div>
        <div className="px-4 pb-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name…" className="w-full bg-paper border border-black/10 rounded-xl px-4 py-2.5 text-sm" />
          <div className="flex gap-2 mt-2">
            {["All","Paid","Partial","Unpaid"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${filter===f ? 'bg-ink text-white border-ink' : 'bg-white border-black/10'}`}>{f}</button>
            ))}
          </div>
        </div>
      </header>
      <div className="px-4 mt-3 space-y-3">
        {list.map(m=>(
          <div key={m.id} className="bg-white rounded-2xl border border-black/5 shadow-card p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-paper2 flex items-center justify-center font-bold text-sm">{m.firstName[0]}{m.lastName[0]||''}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{m.firstName} {m.lastName}</div>
              <div className="text-xs text-muted truncate">{m.phones.join(", ") || "No phone"}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">{m.total} BDT</div>
              <div className={`text-[11px] px-2 py-0.5 rounded-full inline-block ${m.status==='full'?'bg-sage text-white': m.status==='partial'?'bg-gold/20 text-[#8A5A00]':'bg-black/5 text-muted'}`}>
                {m.status==='full'?'✓ All Paid' : m.status==='partial' ? `${m.paid}/12 paid` : 'Unpaid'}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 mt-4">
        <a href="#" className="block bg-ink text-white text-center py-3 rounded-xl font-semibold text-sm">+ Create My Profile</a>
      </div>
    </main>
  )
}
