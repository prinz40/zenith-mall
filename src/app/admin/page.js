"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Admin(){
  const [sups,setSups]=useState([]);
  const [orders,setOrders]=useState([]);

  useEffect(()=>{
    setSups(JSON.parse(localStorage.getItem("zenith-suppliers-pending")||"[]"));
    setOrders(JSON.parse(localStorage.getItem("zenith-orders")||"[]"));
  },[]);

  const approve = (id) => {
    const all = JSON.parse(localStorage.getItem("zenith-suppliers-pending")||"[]");
    const updated = all.map(s=>s.id===id?{...s,status:"Approved — Zenith Partner"}:s);
    localStorage.setItem("zenith-suppliers-pending", JSON.stringify(updated));
    const approvedList = JSON.parse(localStorage.getItem("zenith-suppliers-approved")||"[]");
    const one = all.find(s=>s.id===id);
    approvedList.push({...one,status:"Approved — Zenith Partner"});
    localStorage.setItem("zenith-suppliers-approved", JSON.stringify(approvedList));
    setSups(updated);
    alert(`✅ ${one.shop} APPROVED!`);
  };

  const clearOrders = () => {
    if(confirm("Clear all orders? For testing only")){
      localStorage.removeItem("zenith-orders");
      setOrders([]);
    }
  };

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <h1 className="text-3xl font-black mt-6">Zenith Admin — Imperial Control 👑</h1>
        <p className="text-xs text-white/40">Secret Office — Only for CEO</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
            <h3 className="font-bold">Pending Suppliers ({sups.filter(s=>s.status.includes("Pending")).length})</h3>
            <div className="mt-4 space-y-3 max-h-[500px] overflow-auto">
              {sups.filter(s=>s.status.includes("Pending")).map(s=>(
                <div key={s.id} className="bg-black/50 border border-yellow-400/20 rounded-xl p-3 text-xs">
                  <p className="font-bold text-yellow-400">{s.shop} — {s.id}</p>
                  <p className="text-white/60">{s.owner} | {s.phone} | {s.wa}</p>
                  <p className="text-white/40">{s.category} | {s.address}</p>
                  <p className="mt-2 text-white/50 italic">"{s.desc}"</p>
                  <p className="mt-2 text-[10px] text-green-300">🛡️ Integrity + Free Delivery Signed: YES</p>
                  <button onClick={()=>approve(s.id)} className="mt-3 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-xs">Approve Partner</button>
                </div>
              ))}
              {sups.filter(s=>s.status.includes("Pending")).length===0 && <p className="text-white/20 text-sm">No pending applications</p>}
            </div>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between">
              <h3 className="font-bold">All Orders ({orders.length}) — Imperial Ledger</h3>
              <button onClick={clearOrders} className="text-[10px] text-red-400 border border-red-400/20 px-2 py-1 rounded-full">Clear (Test)</button>
            </div>
            <div className="mt-4 space-y-3 max-h-[500px] overflow-auto">
              {orders.map(o=>(
                <div key={o.id} className="bg-black/50 border border-white/10 rounded-xl p-3 text-xs">
                  <p className="font-bold text-yellow-400">{o.id} — ₦{o.total.toLocaleString()} <span className="text-[9px]">FREE DEL INCLUDED</span></p>
                  <p className="text-white/40">{o.date} | {o.status}</p>
                  <p className="text-white/60">{o.customer.name} | {o.customer.phone}</p>
                  <p className="text-white/40">{o.customer.address}, {o.customer.state}</p>
                  <p className="text-white/30 mt-1">{o.items.map(i=>i.name).join(", ")}</p>
                </div>
              ))}
              {orders.length===0 && <p className="text-white/20 text-sm">No orders yet — Empire awaits first sale</p>}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 text-[11px] text-yellow-100/60">
          <p>🔐 How to get real suppliers after this: Post this link on WhatsApp Status / Facebook: <span className="text-yellow-400 font-bold">your-site.vercel.app/partner</span> with message: "ZenithMall is now onboarding 20 trusted Lagos suppliers — Free Delivery Included, Pay on Delivery, Integrity Proof before payment. DM if interested. Built on God + Integrity."</p>
        </div>
      </div>
    </div>
  )
}
