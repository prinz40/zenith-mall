"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(()=>{ setOrders(JSON.parse(localStorage.getItem("zenith-orders")||"[]")) },[]);

  const markDelivered = (id) => {
    const updated = orders.map(o=> o.id===id? {...o, status:"Delivered", deliveredAt: new Date().toLocaleString()} : o);
    setOrders(updated);
    localStorage.setItem("zenith-orders", JSON.stringify(updated));
  };
  const deleteOrder = (id) => {
    if(!confirm("Delete this order permanently?")) return;
    const updated = orders.filter(o=>o.id!==id);
    setOrders(updated);
    localStorage.setItem("zenith-orders", JSON.stringify(updated));
  };

  const totalRevenue = orders.reduce((a,b)=>a+b.total,0);
  const delivered = orders.filter(o=>o.status==="Delivered").length;
  const pending = orders.filter(o=>o.status!=="Delivered").length;
  const withReview = orders.filter(o=>o.review).length;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
      <div className="max-w-5xl mx-auto mt-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black">IMPERIAL LEDGER 👑</h1>
            <p className="text-white/50 text-sm">CEO Command Center • Integrity Records • Evidence of Trust</p>
            <p className="text-[10px] text-yellow-400/60 mt-1">Delivery: Lagos 1-2D • SW 2-3D • Others 3-5D • Pay on Delivery</p>
          </div>
          <Link href="/admin/add-product" className="bg-yellow-400 text-black font-black px-5 py-2 rounded-full text-xs">+ Add Product</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-xs text-white/40">Total Orders</p><p className="text-2xl font-black">{orders.length}</p><p className="text-[10px] text-white/20">{pending} pending</p></div>
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4"><p className="text-xs text-yellow-300">Revenue</p><p className="text-2xl font-black text-yellow-400">₦{totalRevenue.toLocaleString()}</p><p className="text-[10px] text-yellow-200/50">Free Delivery Included</p></div>
          <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-4"><p className="text-xs text-green-300">Delivered</p><p className="text-2xl font-black text-green-400">{delivered}</p><p className="text-[10px] text-green-200/50">Photo proof done</p></div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-xs text-white/40">Integrity Reviews</p><p className="text-2xl font-black text-white">{withReview}</p><p className="text-[10px] text-white/20">Trust proof</p></div>
        </div>

        <div className="mt-8 space-y-4">
          {orders.length===0 && <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-2xl"><p className="text-4xl">👑</p><p className="text-white/30 mt-4">No orders yet. Test an order to see ledger!</p><Link href="/" className="mt-4 inline-block bg-yellow-400 text-black font-bold px-6 py-2 rounded-full text-xs">Go Create Test Order</Link></div>}

          {orders.map(o=>(
            <div key={o.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 hover:border-yellow-400/20 transition">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-white/30">ID: {o.id} • {o.date}</span>
                  <p className="font-bold mt-1">{o.customer.name} • <a href={`tel:${o.customer.phone}`} className="text-yellow-400">{o.customer.phone}</a></p>
                  <p className="text-xs text-white/50">{o.customer.address}, {o.customer.state} • Delivery in {o.customer.state?.toLowerCase().includes("lagos")?"1-2 Days":o.customer.state?.toLowerCase().match(/oyo|ogun|osun|ondo|ekiti/)?"2-3 Days":"3-5 Days"}</p>
                </div>
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${o.status==="Delivered"?"bg-green-400/20 text-green-300 border border-green-400/30":"bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"}`}>{o.status}</span>
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {o.items.map((i,idx)=>(
                  <div key={idx} className="flex items-center gap-2 bg-black border border-white/10 rounded-full pr-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      {i.image? <img src={i.image} alt="" className="w-full h-full object-cover"/> : <span className="text-xs">{i.emoji||"👑"}</span>}
                    </div>
                    <span className="text-xs">{i.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-3 font-bold">Total: <span className="text-yellow-400">₦{o.total.toLocaleString()}</span> <span className="text-[10px] text-white/30 font-normal">— FREE DELIVERY INCLUDED — Pay on Delivery</span></p>

              {o.review && (
                <div className="mt-3 bg-green-400/10 border border-green-400/30 rounded-lg p-3">
                  <p className="text-xs text-green-300 font-bold">⭐ BUYER INTEGRITY PROOF: {o.review.stars}/5 STARS</p>
                  <p className="text-sm mt-1 text-white">"{o.review.text}"</p>
                  <p className="text-[10px] text-white/40 mt-1">Reviewed: {o.review.date} ✓ Received as described • {o.customer.name} confirmed</p>
                </div>
              )}
              {!o.review && o.status==="Delivered" && <p className="text-xs text-white/30 mt-3 bg-white/5 p-2 rounded">Delivered {o.deliveredAt||""} but awaiting buyer review... Remind buyer to drop integrity photo!</p>}

              <div className="mt-3 flex gap-2">
                {o.status!=="Delivered" && <button onClick={()=>markDelivered(o.id)} className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full">Mark as Delivered ✓ + Ask for Review</button>}
                <a href={`https://wa.me/234${o.customer.phone?.slice(-10)}?text=Hello ${o.customer.name}, your ZenithMall order ${o.id} is on the way! Track here: zenith-mall.vercel.app/track`} target="_blank" className="bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold px-4 py-2 rounded-full">WhatsApp Buyer</a>
                <button onClick={()=>deleteOrder(o.id)} className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs px-3 py-2 rounded-full">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-yellow-400 text-black rounded-xl p-4 text-center text-sm font-black">👑 EMPIRE PROOF: {orders.length} Orders • {delivered} Delivered • {withReview} Integrity Reviews • ₦{totalRevenue.toLocaleString()} Revenue — FREE DELIVERY INCLUDED MODEL</div>
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          <Link href="/track" className="text-xs bg-white/10 px-4 py-2 rounded-full">📦 Track Page</Link>
          <Link href="/reviews" className="text-xs bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">Wall of Integrity</Link>
          <Link href="/partner" className="text-xs bg-white/10 border border-yellow-400/30 px-4 py-2 rounded-full">🤝 Partners</Link>
        </div>
      </div>
    </div>
  );
    }
