"use client";
import { useState } from "react";
import Link from "next/link";

export default function Track(){
  const [phone,setPhone]=useState("");
  const [orders,setOrders]=useState([]);
  const [searched,setSearched]=useState(false);
  const [reviewFor,setReviewFor]=useState(null);
  const [stars,setStars]=useState(5);
  const [reviewText,setReviewText]=useState("");

  const search = () => {
    const all = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    const found = all.filter(o=>o.customer.phone.includes(phone) || o.id.toLowerCase()===phone.toLowerCase());
    setOrders(found);
    setSearched(true);
  };

  const confirmDelivered = (id) => {
    const all = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    const updated = all.map(o=> o.id===id? {...o, status: "Delivered — Awaiting Integrity Review"} : o);
    localStorage.setItem("zenith-orders", JSON.stringify(updated));
    setOrders(orders.map(o=> o.id===id? {...o, status: "Delivered — Awaiting Integrity Review"} : o));
    alert("Marked as Delivered! Now leave integrity review with photo proof.");
  };

  const submitReview = () => {
    if(!reviewText) return alert("Write your review");
    const reviews = JSON.parse(localStorage.getItem("zenith-reviews")||"[]");
    reviews.push({ orderId: reviewFor, stars, text: reviewText, date: new Date().toLocaleString(), verified: true });
    localStorage.setItem("zenith-reviews", JSON.stringify(reviews));
    // also mark order as reviewed
    const all = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    const updated = all.map(o=> o.id===reviewFor? {...o, status: "Completed — Verified with Integrity"} : o);
    localStorage.setItem("zenith-orders", JSON.stringify(updated));
    setReviewFor(null); setReviewText(""); setStars(5);
    alert("✅ Integrity Review Saved! God bless you for truth!");
    search();
  };

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <h1 className="text-3xl font-black mt-6">Track Your Order</h1>
        <p className="text-xs text-white/40 mt-1">No panic. Full refund if not as described. Integrity Proof required. Track with phone.</p>

        <div className="mt-8 bg-white/[0.04] border border-white/10 rounded-2xl p-6">
          <p className="text-sm mb-3 font-bold">Enter Phone Number or Order ID</p>
          <div className="flex gap-3">
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="e.g. 0810... or ZM123456" className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm focus:border-yellow-400/50 outline-none"/>
            <button onClick={search} className="bg-yellow-400 text-black font-black px-8 py-3 rounded-full text-sm hover:bg-yellow-300">Track</button>
          </div>
        </div>

        {searched && (
          <div className="mt-8 space-y-4">
            {orders.length===0? <div className="text-center bg-white/[0.03] border border-white/10 rounded-2xl p-8"><p className="text-white/30">No order found for <span className="text-yellow-400">{phone}</span></p><p className="text-[11px] text-white/20 mt-2">Check number or Order ID like ZM123456 • Ensure you ordered on this device</p></div> :
            orders.map(o=>(
              <div key={o.id} className="bg-white/[0.04] border border-yellow-400/20 rounded-2xl p-5">
                <div className="flex justify-between items-start">
                  <p className="font-black text-yellow-400 tracking-widest">{o.id}</p>
                  <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${o.status.includes("Completed")? "bg-green-500/20 text-green-300 border border-green-500/30" : o.status.includes("Delivered")? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-yellow-400/20 text-yellow-200 border border-yellow-400/30"}`}>{o.status}</span>
                </div>
                <p className="text-xs text-white/30 mt-1">{o.date} • {o.deliveryEstimate||"1-5 Days"}</p>
                <div className="mt-4 space-y-2">
                  {o.items.map((it,i)=><div key={i} className="flex justify-between text-sm bg-black/30 rounded-xl p-2 border border-white/5"><span className="text-white/70">{it.name}</span><span className="text-yellow-400 font-bold">₦{it.price.toLocaleString()}</span></div>)}
                </div>
                <p className="text-sm mt-3 font-bold">Total: ₦{o.total.toLocaleString()} <span className="text-[10px] text-green-300 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">FREE DELIVERY INCLUDED</span></p>
                <p className="text-xs text-white/40 mt-1">Customer: {o.customer.name} | {o.customer.address}, {o.customer.state} | {o.customer.phone}</p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2 text-center"><p>✅</p><p className="text-white/40 mt-1">Pay on Delivery</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2 text-center"><p>🛡️</p><p className="text-white/40 mt-1">Integrity Proof</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2 text-center"><p>🔄</p><p className="text-white/40 mt-1">Full Refund if Fake</p></div>
                </div>

                <div className="mt-4 flex gap-2">
                  {o.status.includes("Processing") && <button onClick={()=>confirmDelivered(o.id)} className="flex-1 bg-white text-black font-bold py-2 rounded-full text-xs">I Received It — Confirm</button>}
                  {(o.status.includes("Delivered") || o.status.includes("Processing")) && <button onClick={()=>setReviewFor(o.id)} className="flex-1 bg-yellow-400 text-black font-black py-2 rounded-full text-xs">Leave Integrity Review ⭐</button>}
                </div>

                {reviewFor===o.id && (
                  <div className="mt-4 bg-black border border-yellow-400/20 rounded-xl p-4">
                    <p className="text-xs font-bold">Integrity Review for {o.id}</p>
                    <div className="flex gap-1 mt-2">{[1,2,3,4,5].map(s=><button key={s} onClick={()=>setStars(s)} className={`text-xl ${s<=stars? "text-yellow-400" : "text-white/20"}`}>★</button>)}</div>
                    <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder="Honest review: Is product exactly as seen? Foot wearing proof?" rows={3} className="w-full mt-3 bg-white/10 border border-white/20 rounded-xl p-3 text-xs"></textarea>
                    <p className="text-[10px] text-white/30 mt-2">🛡️ With God, our integrity speaks. Your honest review helps empire grow. Upload photo proof (rider should have taken photo).</p>
                    <div className="flex gap-2 mt-3"><button onClick={submitReview} className="flex-1 bg-yellow-400 text-black font-black py-2 rounded-full text-xs">Submit Review — Verified ✅</button><button onClick={()=>setReviewFor(null)} className="bg-white/10 text-white py-2 px-4 rounded-full text-xs">Cancel</button></div>
                  </div>
                )}

                <div className="mt-3 bg-black/50 rounded-xl p-3 text-[11px] text-white/30">
                  🛡️ Integrity Proof: Rider must upload buyer photo + foot wearing proof before seller gets paid. If not as described — full refund + rider covers return. God + Integrity = Long Empire.
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 border-t border-white/10 pt-6 text-[11px] text-white/30 space-y-1">
          <p>📦 Delivery: Lagos 1-2 days, Southwest 2-3 days, Others 3-5 days — FREE DELIVERY INCLUDED</p>
          <p>💳 Pay on Delivery — No upfront payment — What buyer saw is what buyer gets</p>
          <p>✅ Zero panic policy — Full refund if fake, you keep integrity</p>
          <Link href="/reviews" className="text-yellow-400">→ See Verified Reviews</Link>
        </div>
      </div>
    </div>
  )
    }
