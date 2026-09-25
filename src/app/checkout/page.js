"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Checkout(){
  const [cart,setCart]=useState([]);
  const [form,setForm]=useState({name:"",phone:"",address:"",state:"Lagos"});
  const [done,setDone]=useState(false);
  const [orderId,setOrderId]=useState("");

  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem("zenith-cart")||"[]"));
  },[]);

  const total = cart.reduce((a,b)=>a+b.price,0);

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
      deliveryIncluded: true
    };
    orders.push(newOrder);
    localStorage.setItem("zenith-orders", JSON.stringify(orders));

    // WhatsApp message for you
    const itemsList = cart.map(i=>`${i.name} ₦${i.price.toLocaleString()}`).join("%0A");
    const waMsg = `🔥 NEW ZENITHMALL ORDER ${id}%0A%0A${itemsList}%0A%0ATOTAL: ₦${total.toLocaleString()} (FREE DELIVERY INCLUDED)%0A%0ACustomer: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}, ${form.state}%0A%0A🛡️ Pay on Delivery — Delivery fee INSIDE price`;
    const waLink = `https://wa.me/2348104006146?text=${waMsg}`; // CHANGE to your WhatsApp number later

    localStorage.removeItem("zenith-cart");
    setCart([]);
    setDone(true);
    // window.open(waLink,"_blank"); // Uncomment after you put your real number
  };

  if(done) return(
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
      <div className="bg-white/[0.04] border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full">
        <h1 className="text-3xl">🎉 Order Confirmed!</h1>
        <p className="mt-4 text-yellow-400 font-black text-xl">Order ID: {orderId}</p>
        <p className="mt-2 text-sm text-white/60">Total: ₦{total.toLocaleString()} — FREE DELIVERY INCLUDED</p>
        <p className="mt-4 text-xs text-white/40">Customer will pay on delivery. No extra fee at door. Track with phone number: {form.phone}</p>
        <p className="mt-2 text-xs text-white/40">🛡️ Rider must upload buyer photo + foot proof before you pay rider.</p>
        <Link href="/" className="mt-6 block bg-yellow-400 text-black font-bold py-3 rounded-full">Back to Empire</Link>
        <Link href="/track" className="mt-3 block bg-white/10 text-white py-3 rounded-full text-sm">Track Order</Link>
      </div>
    </div>
  );

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <h1 className="text-3xl font-black mt-6">Checkout Vault</h1>
        <p className="text-xs text-yellow-200/60 mt-1">✅ FREE DELIVERY INCLUDED — No extra fee at door — Pay on Delivery</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Customer Details</h3>
            <form onSubmit={placeOrder} className="space-y-4">
              <input required placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              <input required placeholder="Phone Number (for tracking)" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              <input required placeholder="Delivery Address" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.state} onChange={e=>setForm({...form,state:e.target.value})}>
                <option>Lagos</option><option>Ogun</option><option>Oyo</option><option>Abuja FCT</option><option>Rivers</option><option>Others</option>
              </select>
              <button type="submit" className="w-full bg-yellow-400 text-black font-black py-4 rounded-full">Confirm Order — Pay on Delivery ₦{total.toLocaleString()}</button>
              <p className="text-[10px] text-white/30 text-center">By ordering, you agree to Integrity Proof verification. Photo + foot proof required.</p>
            </form>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Vault Summary ({cart.length})</h3>
            <div className="space-y-3 max-h-64 overflow-auto">
              {cart.map((p,i)=><div key={i} className="flex justify-between text-sm"><span className="text-white/70">{p.name}</span><span className="text-yellow-400 font-bold">₦{p.price.toLocaleString()}</span></div>)}
              {cart.length===0 && <p className="text-white/30 text-sm">Vault empty — Add treasures first</p>}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-black text-lg">
              <span>Total (Delivery Inside)</span><span className="text-yellow-400">₦{total.toLocaleString()}</span>
            </div>
            <div className="mt-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3">
              <p className="text-[11px] text-yellow-200">✅ FREE DELIVERY INCLUDED — Customer sees only ₦{total.toLocaleString()}. No + delivery. This protects integrity as you mandated.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
