"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(()=>{ setOrders(JSON.parse(localStorage.getItem("zenith-orders")||"[]")) },[]);

  const markDelivered = (id) => {
    const updated = orders.map(o=> o.id===id? {...o, status:"Delivered"} : o);
    setOrders(updated);
    localStorage.setItem("zenith-orders", JSON.stringify(updated));
  };
  const totalRevenue = orders.reduce((a,b)=>a+b.total,0);
  const delivered = orders.filter(o=>o.status==="Delivered").length;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
      <div className="max-w-5xl mx-auto mt-6">
        <h1 className="text-3xl font-black">IMPERIAL LEDGER 👑</h1>
        <p className="text-white/50 text-sm">Integrity Records • Evidence of Trust</p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-xs text-white/40">Total Orders</p><p className="text-2xl font-black">{orders.length}</p></div>
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4"><p className="text-xs text-yellow-300">Revenue</p><p className="text-2xl font-black text-yellow-400">₦{totalRevenue.toLocaleString()}</p></div>
          <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-4"><p className="text-xs text-green-300">Delivered</p><p className="text-2xl font-black text-green-400">{delivered}</p></div>
        </div>
        <div className="mt-8 space-y-4">
          {orders.length===0 && <p className="text-white/30 text-center py-10">No orders yet. Test an order to see ledger!</p>}
          {orders.map(o=>(
            <div key={o.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
              <div className="flex justify-between"><span className="text-xs text-white/40">ID: {o.id}</span><span className={`text-xs px-2 py-1 rounded-full ${o.status==="Delivered"?"bg-green-400/20 text-green-300":"bg-yellow-400/20 text-yellow-300"}`}>{o.status}</span></div>
              <p className="font-bold mt-2">{o.customer.name} • {o.customer.phone}</p>
              <p className="text-xs text-white/50">{o.customer.address}, {o.customer.state} • {o.date}</p>
              <p className="text-sm mt-2">{o.items.map(i=>i.name).join(", ")} — <span className="text-yellow-400 font-bold">₦{o.total.toLocaleString()}</span></p>

              {o.review && (
                <div className="mt-3 bg-green-400/10 border border-green-400/30 rounded-lg p-3">
                  <p className="text-xs text-green-300 font-bold">⭐ BUYER INTEGRITY REVIEW: {o.review.stars}/5</p>
                  <p className="text-sm mt-1 text-white">"{o.review.text}"</p>
                  <p className="text-[10px] text-white/40 mt-1">Reviewed: {o.review.date} ✓ Received as described</p>
                </div>
              )}
              {!o.review && o.status==="Delivered" && <p className="text-xs text-white/30 mt-3">Delivered but awaiting buyer review...</p>}

              {o.status!=="Delivered" && <button onClick={()=>markDelivered(o.id)} className="mt-3 bg-white text-black text-xs font-bold px-4 py-2 rounded-full">Mark as Delivered ✓</button>}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-yellow-400 text-black rounded-xl p-4 text-center text-sm font-bold">This ledger is PUBLIC PROOF! Shows {orders.length} Orders, {delivered} Delivered, {orders.filter(o=>o.review).length} Integrity Reviews</div>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/track" className="text-xs bg-white/10 px-4 py-2 rounded-full">Go to Track Page</Link>
          <Link href="/reviews" className="text-xs bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">View Integrity Wall</Link>
        </div>
      </div>
    </div>
  );
}
