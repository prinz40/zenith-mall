"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Checkout(){
  const [cart,setCart]=useState([]);
  const [form,setForm]=useState({name:"",phone:"",address:"",state:"Lagos"});
  const [done,setDone]=useState(false);
  const [orderId,setOrderId]=useState("");
  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem("zenith-cart")||"[]")); },[]);
  const total = cart.reduce((a,b)=>a+b.price,0);
  const estimate = form.state.toLowerCase().includes("lagos")? "1-2 Days" : form.state.toLowerCase().match(/ogun|oyo|osun|ondo|ekiti/)? "2-3 Days" : "3-5 Days";

  const placeOrder = (e) => {
    e.preventDefault();
    if(cart.length===0) return alert("Vault empty!");
    const id = "ZM"+Date.now().toString().slice(-6);
    setOrderId(id);
    const orders = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    const newOrder = {
      id, items: cart, total,
      customer: form,
      date: new Date().toLocaleString(),
      status: "Processing — Integrity Check",
      deliveryIncluded: true,
      deliveryEstimate: estimate
    };
    orders.push(newOrder);
    localStorage.setItem("zenith-orders", JSON.stringify(orders));
    const itemsList = cart.map(i=>`${i.name} ₦${i.price.toLocaleString()}`).join("%0A");
    const waMsg = `🔥 NEW ZENITHMALL ORDER ${id}%0A%0A${itemsList}%0A%0ATOTAL: ₦${total.toLocaleString()} (FREE DELIVERY INCLUDED)%0A%0ACustomer: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}, ${form.state}%0AEstimate: ${estimate}%0A%0A🛡️ Pay on Delivery`;
    // CHANGE 234XXXXXXXXX to YOUR real WhatsApp later
    const waLink = `https://wa.me/2340000000000?text=${waMsg}`;
    localStorage.removeItem("zenith-cart");
    setCart([]);
    setDone(true);
    // window.open(waLink,"_blank");
  };

  if(done) return(
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
      <div className="bg-white/[0.04] border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full">
        <div className="text-5xl">🎉</div>
        <h1 className="text-3xl font-black mt-3">Order Confirmed!</h1>
        <p className="mt-4 text-yellow-400 font-black text-2xl tracking-widest">Order ID: {orderId}</p>
        <p className="mt-2 text-sm text-white/60">Total: ₦{total.toLocaleString()} — FREE DELIVERY INCLUDED • {estimate}</p>
        <div className="mt-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3 text-left text-[11px] text-yellow-100/80">
          <p>✅ Track with phone: {form.phone}</p>
          <p>✅ Pay on Delivery — No extra fee at door</p>
          <p>✅ Rider must upload buyer photo + foot proof</p>
          <p>✅ Full refund if not as described</p>
        </div>
        <Link href="/" className="mt-6 block bg-yellow-400 text-black font-black py-3 rounded-full">Back to Empire</Link>
        <Link href="/track" className="mt-3 block bg-white/10 text-white py-3 rounded-full text-sm font-bold">Track Order →</Link>
      </div>
    </div>
  );

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <div className="mt-6"><span className="text-[10px] tracking-[0.2em] bg-yellow-400 text-black px-3 py-1 rounded-full font-black">SECURE CHECKOUT</span><h1 className="text-3xl font-black mt-3">Checkout Vault</h1><p className="text-xs text-yellow-200/60 mt-1">✅ FREE DELIVERY INCLUDED — No extra fee at door — Pay on Delivery — {estimate}</p></div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-1">Customer Details</h3><p className="text-[11px] text-white/30 mb-4">For tracking & delivery — Phone is your tracking ID</p>
            <form onSubmit={placeOrder} className="space-y-4">
              <input required placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:border-yellow-400/50 outline-none" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              <input required placeholder="Phone Number (for tracking)" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              <input required placeholder="Delivery Address e.g. 12 Allen Ave, Ikeja" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.state} onChange={e=>setForm({...form,state:e.target.value})}>
                <option>Lagos</option><option>Ogun</option><option>Oyo</option><option>Osun</option><option>Ondo</option><option>Ekiti</option><option>Abuja FCT</option><option>Rivers</option><option>Kano</option><option>Others</option>
              </select>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-[11px] text-white/50">
                <p>📦 Delivery Estimate: <span className="text-yellow-400 font-bold">{estimate}</span> • Free Delivery Inside Price</p>
                <p className="mt-1">🛡️ Integrity Proof: Rider uploads buyer photo + wearing proof before seller gets paid.</p>
              </div>
              <button type="submit" className="w-full bg-yellow-400 text-black font-black py-4 rounded-full text-sm hover:bg-yellow-300 transition">Confirm Order — Pay on Delivery ₦{total.toLocaleString()} →</button>
              <p className="text-[10px] text-white/20 text-center">With God, our integrity speaks. Secure • Trusted • No panic</p>
            </form>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 h-fit">
            <h3 className="font-bold mb-4">Vault Summary ({cart.length})</h3>
            <div className="space-y-3 max-h-72 overflow-auto pr-2">
              {cart.map((p,i)=>
                <div key={i} className="flex gap-3 items-center bg-black/40 border border-white/5 rounded-xl p-2">
                  <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">{p.image? <img src={p.image} className="w-full h-full object-cover"/> : <span className="flex items-center justify-center h-full">{p.emoji}</span>}</div>
                  <div className="flex-1"><p className="text-sm font-semibold">{p.name}</p><p className="text-[10px] text-white/30">{p.supplier||"Zenith Empire"}</p></div>
                  <span className="text-yellow-400 font-bold text-xs">₦{p.price.toLocaleString()}</span>
                </div>
              )}
              {cart.length===0 && <p className="text-white/30 text-sm text-center py-8">Vault empty — Add treasures first</p>}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4">
              <div className="flex justify-between text-xs text-white/40"><span>Subtotal ({cart.length} items)</span><span>₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-xs text-green-300 mt-1"><span>Delivery Fee</span><span>₦0 — INCLUDED</span></div>
              <div className="flex justify-between font-black text-lg mt-3"><span>Total Pay on Delivery</span><span className="text-yellow-400">₦{total.toLocaleString()}</span></div>
            </div>
            <div className="mt-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3"><p className="text-[11px] text-yellow-200">✅ FREE DELIVERY INCLUDED — Customer sees only ₦{total.toLocaleString()}. No surprise fee. This is your Empire Rule.</p></div>
          </div>
        </div>
      </div>
    </div>
  )
    }
