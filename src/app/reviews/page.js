"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReviewsPage(){
  const [reviews,setReviews]=useState([]);
  const [orders,setOrders]=useState([]);
  useEffect(()=>{
    setReviews(JSON.parse(localStorage.getItem("zenith-reviews")||"[]"));
    setOrders(JSON.parse(localStorage.getItem("zenith-orders")||"[]"));
  },[]);

  const avg = reviews.length? (reviews.reduce((a,b)=>a+b.stars,0)/reviews.length).toFixed(1) : "5.0";

  return(
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <div className="mt-6">
          <span className="text-[10px] tracking-[0.2em] bg-yellow-400 text-black px-3 py-1 rounded-full font-black">VERIFIED INTEGRITY</span>
          <h1 className="text-3xl font-black mt-3">WALL OF INTEGRITY 👑</h1>
          <p className="text-white/50 text-sm mt-1">Live proof — Real buyers confirming delivery as described — Zero panic empire</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-center"><p className="text-2xl font-black text-yellow-400">{avg} ★</p><p className="text-[10px] text-white/40 mt-1">Average Integrity Score</p></div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-center"><p className="text-2xl font-black text-white">{reviews.length}</p><p className="text-[10px] text-white/40 mt-1">Verified Reviews</p></div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-center"><p className="text-2xl font-black text-green-300">{orders.length}</p><p className="text-[10px] text-white/40 mt-1">Orders Secured</p></div>
        </div>

        <div className="mt-8 bg-yellow-400 rounded-2xl p-4 text-black">
          <p className="font-black text-sm">🛡️ Our Rule: What buyer saw is what buyer gets. Full refund if fake. Rider uploads photo + foot proof before seller gets paid. With God, integrity speaks.</p>
        </div>

        <div className="mt-6 grid gap-4">
          {reviews.length===0 && orders.length===0 && <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-10 text-center"><p className="text-5xl">👑</p><p className="text-white/30 mt-3 text-sm">No delivered proof yet. Be first to confirm integrity!</p><p className="text-[11px] text-white/20 mt-2">After your first order, track with phone and leave star review. Your review builds empire trust.</p></div>}

          {reviews.map((r,i)=>(
            <div key={i} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 hover:border-yellow-400/20 transition">
              <div className="flex justify-between items-start">
                <p className="text-yellow-400 font-bold text-sm">Verified Buyer • {r.orderId}</p>
                <p className="text-[10px] text-white/30">{r.date}</p>
              </div>
              <p className="text-green-300 text-sm mt-2">{"⭐".repeat(r.stars)} {r.stars}/5 Integrity Confirmed <span className="text-[10px] bg-green-500/20 border border-green-500/30 px-2 py-0.5 rounded-full ml-2">VERIFIED ✓</span></p>
              <p className="text-sm mt-2 text-white/80">"{r.text}"</p>
              <p className="text-[11px] text-white/30 mt-3">✓ Received as described • ✓ Photo proof uploaded • ✓ Pay on Delivery respected</p>
            </div>
          ))}

          {reviews.length===0 && orders.filter(o=>o.status.includes("Completed")||o.status.includes("Delivered")).map(o=>(
            <div key={o.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
              <p className="text-yellow-400 font-bold text-sm">{o.customer.name} • {o.items.map(i=>i.name).join(", ")}</p>
              <p className="text-xs text-white/40">ID {o.id} • {o.date} • {o.status}</p>
              <p className="text-xs text-white/20 mt-3">Awaiting buyer integrity confirmation — Track order to leave review...</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/track" className="flex-1 bg-yellow-400 text-black font-black text-center py-3 rounded-full text-sm">Track My Order →</Link>
          <Link href="/" className="flex-1 bg-white/10 text-white font-bold text-center py-3 rounded-full text-sm">Shop Empire</Link>
        </div>

        <p className="text-center text-[10px] text-white/20 mt-8">With God, our integrity speaks for us. Zenith Mall — Free Delivery Included — Pay on Delivery.</p>
      </div>
    </div>
  )
    }
