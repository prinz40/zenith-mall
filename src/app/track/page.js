"use client";
import { useState } from "react";
import Link from "next/link";

export default function Track(){
  const [phone,setPhone]=useState("");
  const [orders,setOrders]=useState([]);
  const [searched,setSearched]=useState(false);

  const search = () => {
    const all = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    const found = all.filter(o=>o.customer.phone.includes(phone) || o.id.toLowerCase()===phone.toLowerCase());
    setOrders(found);
    setSearched(true);
  };

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <h1 className="text-3xl font-black mt-6">Track Your Order</h1>
        <p className="text-xs text-white/40 mt-1">No panic. Full refund if not as described. Integrity Proof required.</p>

        <div className="mt-8 bg-white/[0.04] border border-white/10 rounded-2xl p-6">
          <p className="text-sm mb-3">Enter Phone Number or Order ID</p>
          <div className="flex gap-3">
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="e.g. 0810..." className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm"/>
            <button onClick={search} className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full">Track</button>
          </div>
        </div>

        {searched && (
          <div className="mt-8 space-y-4">
            {orders.length===0? <p className="text-center text-white/30">No order found for {phone}. Check number or Order ID like ZM123456</p> :
            orders.map(o=>(
              <div key={o.id} className="bg-white/[0.04] border border-yellow-400/20 rounded-2xl p-5">
                <div className="flex justify-between">
                  <p className="font-bold text-yellow-400">{o.id}</p>
                  <p className="text-xs text-white/40">{o.date}</p>
                </div>
                <p className="text-xs mt-1">Status: <span className="text-green-400">{o.status}</span></p>
                <p className="text-sm mt-3">Items: {o.items.length} — Total: ₦{o.total.toLocaleString()} <span className="text-[10px] text-yellow-200">FREE DELIVERY INCLUDED</span></p>
                <p className="text-xs text-white/40 mt-1">Customer: {o.customer.name} | {o.customer.address}, {o.customer.state}</p>
                <div className="mt-3 bg-black/50 rounded-xl p-3 text-[11px] text-white/30">
                  🛡️ Integrity Proof: Rider must upload buyer photo + foot wearing proof before seller gets paid. If not as described — full refund + rider covers return.
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 border-t border-white/10 pt-6 text-[11px] text-white/30 space-y-1">
          <p>📦 Delivery: Lagos 1-2 days, Southwest 2-3 days, Others 3-5 days</p>
          <p>💳 Pay on Delivery — No upfront payment</p>
          <p>✅ What buyer saw is what buyer gets — Zero panic policy</p>
        </div>
      </div>
    </div>
  )
}
