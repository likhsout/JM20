"use client";
import { useState } from "react";
import { settings } from "../../data/mockData";

export default function PayPage() {
  const monthsKeys = settings.months; // 12
  const [selected, setSelected] = useState(["m_mu8w9rguzskpc0"]); // May default
  const [method, setMethod] = useState("bKash");
  const [txn, setTxn] = useState("");
  const [done, setDone] = useState(false);

  const toggle = (k) => {
    if (k==="m_mul7nkmy5bdkb7") return; // April already paid example — disabled
    setSelected(s=> s.includes(k) ? s.filter(x=>x!==k) : [...s, k]);
  }
  const amount = selected.length * settings.monthlyAmount;

  if (done) {
    return (
      <main className="max-w-[480px] mx-auto w-full min-h-screen bg-paper flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center text-white text-2xl">✓</div>
        <h1 className="text-xl font-bold mt-4">Submitted!</h1>
        <p className="text-sm text-muted text-center mt-2">Your payment of <b>{amount} BDT</b> for {selected.length} month(s) via {method} is pending admin approval. You’ll get a WhatsApp when approved.</p>
        <div className="bg-white rounded-xl border border-black/10 p-3 mt-4 w-full mono text-xs">
          Payer: Mohammad Rahat<br/>Months: {selected.join(", ")}<br/>TxnID: {txn}<br/>Receipt: will be R-XXXXXX after approval
        </div>
        <a href="/" className="mt-6 bg-ink text-white px-6 py-3 rounded-xl font-semibold">Back to Home</a>
      </main>
    )
  }

  return (
    <main className="max-w-[480px] mx-auto w-full pb-24 bg-paper min-h-screen">
      <header className="bg-white border-b border-black/10 sticky top-0 z-20">
        <div className="flex items-center gap-3 px-4 h-[56px]">
          <a href="/" className="text-xl">←</a>
          <h1 className="font-bold">Make a Payment</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Who */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-card p-4">
          <div className="text-xs uppercase tracking-widest text-muted font-semibold">Paying as</div>
          <div className="font-semibold mt-1">Mohammad Rahat • 01960012929</div>
          <div className="text-xs text-muted">Logged in • <a className="underline">Change</a></div>
        </div>

        {/* Months */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-card p-4">
          <div className="text-sm font-bold">Select months — 50 BDT each</div>
          <div className="text-xs text-muted">Tap to select. April is already paid.</div>
          <div className="flex flex-wrap gap-2 mt-3">
            {monthsKeys.map(m=>{
              const isPaid = m.key==="m_mul7nkmy5bdkb7"; // demo paid
              const sel = selected.includes(m.key);
              return (
                <button key={m.key} onClick={()=>toggle(m.key)} className={`px-3 py-2 rounded-full text-xs font-semibold border ${isPaid ? 'bg-sage text-white border-sage' : sel ? 'bg-ink text-white border-ink' : 'bg-white border-black/10'}`}>
                  {m.en} {isPaid ? '✓' : sel ? '✓' : ''}
                </button>
              )
            })}
          </div>
          <div className="mt-3 flex items-center justify-between bg-paper rounded-xl px-3 py-2">
            <div className="text-sm"><b>{selected.length} month{selected.length!==1?'s':''}</b> <span className="text-muted">• {amount} BDT</span></div>
            <div className="text-xs text-muted">Auto-calc</div>
          </div>
        </div>

        {/* Method */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-card p-4">
          <div className="text-sm font-bold">How will you pay?</div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {["bKash","Nagad","Rocket","Cash"].map(m=>(
              <button key={m} onClick={()=>setMethod(m)} className={`p-3 rounded-xl border text-left ${method===m ? 'bg-gold/10 border-gold' : 'bg-white border-black/10'}`}>
                <div className="text-sm font-bold">{m==='bKash'?'💗':m==='Nagad'?'🧡':m==='Rocket'?'💜':'💵'} {m}</div>
                <div className="text-xs text-muted mono mt-1">{settings.paymentMethods.find(p=>p.type===m)?.number}</div>
              </button>
            ))}
          </div>
          <div className="text-xs text-center mt-2"><a className="text-muted underline">Other: Bank — DBBL 2411050645291</a></div>
        </div>

        {/* Txn */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-card p-4">
          <label className="text-sm font-semibold">{method} Transaction ID {method!=='Cash' && '*'}</label>
          {method==='Cash' ? (
            <div className="mt-2">
              <select className="w-full border border-black/10 rounded-xl px-3 py-3 text-sm bg-white">
                <option>Which admin received cash?</option>
                <option>ROFY — +880 1994-328869</option>
                <option>SHUHADA — +880 1638820094</option>
              </select>
              <div className="text-xs text-muted mt-2">Cash hand-offs require admin confirmation.</div>
            </div>
          ) : (
            <>
              <input value={txn} onChange={e=>setTxn(e.target.value.toUpperCase())} placeholder={method==='bKash'?'e.g., DIT84TPYVU': method==='Nagad'?'e.g., 765TWAEY' : 'e.g., 7063210135'} className="w-full border border-black/10 rounded-xl px-3 py-3 text-sm mt-2 mono" />
              <div className="text-xs text-muted mt-1">Found in your {method} SMS/app confirmation.</div>
            </>
          )}
        </div>

        {/* Submit */}
        <button onClick={()=>{ if(method!=='Cash' && !txn) return alert('Enter TxnID'); setDone(true); }} className={`w-full py-3 rounded-xl font-bold text-[15px] ${amount>0 ? 'bg-gold text-ink' : 'bg-black/10 text-muted'}`}>Submit for Approval — {amount} BDT</button>
        <div className="text-xs text-center text-muted">Pending approval in ~5 min. You’ll be notified.</div>
      </div>
    </main>
  )
}
