"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function ReviewsPage(){
  const [orders,setOrders]=useState([]);
  useEffect(()=>{ setOrders(JSON.parse(localStorage.getItem("zenith-orders")||"[]").filter(o=>o.status==="Delivered")) },[]);
  return(
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
      <h1 className="text-3xl font-black mt-6">WALL OF INTEGRITY 👑</h1>
      <p className="text-white/50 text-sm">Live proof - Real buyers confirming delivery as described</p>
      <div className="mt-6 grid gap-4">
        {orders.length===0 && <p className="text-white/30 py-10 text-center">No delivered proof yet. Be first to confirm!</p>}
        {orders.map(o=>(
          <div key={o.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
            <p className="text-yellow-400 font-bold">{o.customer.name} • {o.items.map(i=>i.name).join(", ")}</p>
            <p className="text-xs text-white/40">ID {o.id} • {o.date}</p>
            {o.review? (
              <div className="mt-3 bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                <p className="text-green-300 text-sm">{"⭐".repeat(o.review.stars)} {o.review.stars}/5 Integrity Confirmed</p>
                <p className="text-sm mt-1">"{o.review.text}"</p>
                <p className="text-[11px] text-white/40 mt-2">✓ Received as described by seller</p>
              </div>
            ) : <p className="text-xs text-white/30 mt-3">Awaiting buyer confirmation...</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
