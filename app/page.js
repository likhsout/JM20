"use client";
import { settings, members, transactions } from "../data/mockData";
import { useState } from "react";

export default function Home() {
  const [banner, setBanner] = useState(true);
  const pct = Math.round((settings.collected / settings.goal) * 100);
  const deg = pct * 3.6;

  return (
    <main className="max-w-[480px] mx-auto w-full pb-24 bg-paper min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-black/10 sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 h-[60px]">
          <div className="flex items-center gap-3">
            <img src="https://jm2020science.netlify.app/api/state" onError={(e)=>e.target.style.display='none'} alt="" className="hidden"/>
            <div className="w-9 h-9 rounded-xl bg-ink flex items-center justify-center text-gold text-sm font-bold">JM</div>
            <div>
              <div className="text-[13px] font-bold leading-tight">Purbadhala J.M. Govt Pilot</div>
              <div className="text-[11px] text-muted">Purbadhala, Netrakona • {settings.pdfBatchName}</div>
            </div>
          </div>
          <a href="#" className="border border-black/10 rounded-full px-3 py-1.5 text-xs font-semibold">বাংলা</a>
        </div>
      </header>

      {/* Hero — Goal Ring */}
      <section className="bg-paper px-4 pt-5 pb-3 text-center">
        <div className="relative w-[142px] h-[142px] mx-auto rounded-full flex items-center justify-center" style={{background:`conic-gradient(#E8A838 ${deg}deg, #E9DCC0 ${deg}deg)`}}>
          <div className="absolute inset-[14px] bg-white rounded-full shadow-card"></div>
          <div className="relative z-10">
            <div className="text-[11px] tracking-widest uppercase text-muted font-semibold">Collected</div>
            <div className="text-[22px] font-bold leading-none mt-1">{settings.collected.toLocaleString()} BDT</div>
            <div className="text-[11px] text-muted mt-1">of {settings.goal.toLocaleString()} goal • {pct}%</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 text-xs mt-4">
          🕌 132 days to Iftar 2027 — 8 Mar
        </div>
        <div className="flex justify-center gap-6 mt-3 text-center">
          <div><div className="text-lg font-bold">{settings.collected.toLocaleString()}</div><div className="text-[10px] uppercase tracking-widest text-muted">BDT Collected</div></div>
          <div className="w-px bg-black/10"></div>
          <div><div className="text-lg font-bold">{members.length}</div><div className="text-[10px] uppercase tracking-widest text-muted">Members</div></div>
          <div className="w-px bg-black/10"></div>
          <div><div className="text-lg font-bold">12</div><div className="text-[10px] uppercase tracking-widest text-muted">Months</div></div>
        </div>
      </section>

      {/* This Month Due */}
      <section className="px-4">
        <div className="bg-white rounded-card shadow-card border border-black/5 p-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted font-semibold">This Month — October</div>
            <div className="text-[16px] font-bold mt-1">50 BDT due</div>
            <div className="text-xs text-muted mt-0.5">6 of 10 paid • 4 pending</div>
          </div>
          <a href="/pay" className="bg-gold text-ink font-bold px-5 py-2.5 rounded-xl text-sm">Pay Now →</a>
        </div>
      </section>

      {/* Notice */}
      {banner && (
        <div className="mx-4 mt-3 bg-[#FFF3D6] border border-[#F0D98A] rounded-xl px-4 py-3 flex items-center justify-between text-sm">
          <span>📢 <b>MONTHLY — 50 TAKA</b> <span className="text-muted text-xs ml-2">17 Oct 2026</span></span>
          <button onClick={()=>setBanner(false)} className="text-muted p-1">✕</button>
        </div>
      )}

      {/* Where to Send */}
      <section className="px-4 mt-4">
        <h2 className="text-sm font-bold mb-2">Where to Send Money</h2>
        <div className="grid grid-cols-2 gap-3">
          {settings.paymentMethods.slice(0,4).map(m=>(
            <div key={m.type} className="bg-white rounded-2xl p-3 border border-black/5 shadow-card">
              <div className="text-xs font-bold" style={{color:m.color}}>{m.type}</div>
              <div className="mono text-[13px] font-semibold mt-1 break-all">{m.number}</div>
              {m.note && <div className="text-[10px] text-muted mt-1">{m.note}</div>}
              <button onClick={()=>navigator.clipboard.writeText(m.number)} className="mt-2 text-[11px] border border-black/10 rounded-full px-3 py-1">Copy</button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-3 border border-black/5 shadow-card mt-3">
          <div className="text-xs font-bold">🏦 DUTCH BANGLA BANK LTD (DBBL)</div>
          <div className="text-xs text-muted mt-1">NAME: AFJAL HASAN • Branch: NETRAKONA</div>
          <div className="mono text-sm font-bold mt-1">2411050645291</div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-4 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Recent Activity</h2>
          <a href="/ledger" className="text-xs text-muted underline">View all</a>
        </div>
        <div className="bg-white rounded-card shadow-card border border-black/5 mt-2 divide-y divide-black/5">
          {transactions.slice(-3).reverse().map(t=>(
            <div key={t.id} className="flex gap-3 items-center p-3">
              <div className="w-9 h-9 rounded-full bg-paper2 flex items-center justify-center text-xs font-bold">{t.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm leading-tight"><b>{t.name}</b> <span className="text-muted">• {t.method}</span></div>
                <div className="text-xs text-muted">{t.months} • {t.amount} BDT • {t.date}</div>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded-full font-bold ${t.status==='approved'?'bg-sage/10 text-sage border border-sage/20':'bg-rose/10 text-rose border border-rose/20'}`}>{t.status==='approved'?'✓ Paid':'Rejected'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-4 mt-5">
        <div className="bg-white rounded-card shadow-card border border-black/5 p-4">
          <h3 className="font-bold text-sm">About This Batch</h3>
          <p className="text-sm text-muted mt-2 leading-relaxed">We’re batch-mates from Purbadhala J.M. Govt. Pilot High School who get together every year for an Iftar party during Ramadan. This site keeps our fund collection simple and transparent for everyone in the batch.</p>
        </div>
      </section>

      {/* Help */}
      <section className="px-4 mt-4 mb-4">
        <div className="bg-white rounded-card shadow-card border border-black/5 p-4">
          <h3 className="font-bold text-sm">Need help? Contact an admin</h3>
          <div className="flex gap-3 mt-3">
            {settings.admins.map(a=>(
              <div key={a.name} className="flex-1 bg-paper rounded-xl p-3 text-center">
                <div className="text-sm font-bold">{a.name}</div>
                <div className="text-xs text-muted mono">{a.phone}</div>
                <div className="flex gap-2 mt-2 justify-center">
                  <a href={`tel:${a.phone}`} className="bg-white border border-black/10 rounded-full px-3 py-1 text-xs">Call</a>
                  <a href={`https://wa.me/${a.wa}`} className="bg-[#25D366] text-white rounded-full px-3 py-1 text-xs">WhatsApp</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center text-[11px] text-muted pb-2">v2.0 • Built for JM 2K20 Science • 18 Oct 2026</div>
    </main>
  )
}
