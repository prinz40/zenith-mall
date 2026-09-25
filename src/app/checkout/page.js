"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { NIGERIA } from "../nigeriaData";

export default function Checkout(){
  const [cart,setCart]=useState([]);
  const [form,setForm]=useState({name:"",phone:"",address:"",state:"Lagos",lga:""});
  const [stateSearch,setStateSearch]=useState("Lagos");
  const [lgaSearch,setLgaSearch]=useState("");
  const [showStateList,setShowStateList]=useState(false);
  const [showLgaList,setShowLgaList]=useState(false);
  const [done,setDone]=useState(false);
  const [orderId,setOrderId]=useState("");
  const [paymentMethod,setPaymentMethod]=useState("pay_on_delivery");

  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem("zenith-cart")||"[]")); },[]);
  const total = cart.reduce((s,b)=>s+b.price,0);
  const estimate = form.state.toLowerCase().includes("lagos")? "1-2 Days" : form.state.toLowerCase().match(/ogun|oyo|osun|ondo|ekiti/)? "2-3 Days" : "3-5 Days";
  const filteredStates = Object.keys(NIGERIA).filter(s=> s.toLowerCase().includes(stateSearch.toLowerCase()));
  const filteredLga = (NIGERIA[form.state]||[]).filter(l=> l.toLowerCase().includes(lgaSearch.toLowerCase()));

  const saveOrderAndNotify = (status, ref="") => {
    const id = "ZM"+Date.now().toString().slice(-6);
    setOrderId(id);
    const orders = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    const newOrder = { id, items: cart, total, customer: form, date: new Date().toLocaleString(), status, paymentRef: ref, deliveryIncluded: true, deliveryEstimate: estimate };
    orders.push(newOrder);
    localStorage.setItem("zenith-orders", JSON.stringify(orders));
    const itemList = cart.map(p=>`${p.title||p.name} ₦${Number(p.price).toLocaleString()}`).join("%0A");
    const waMsg = `🔥 NEW ORDER ${id} ${status} %0A${itemList}%0ATOTAL: ₦${total.toLocaleString()} FREE DELIVERY%0AName:${form.name}%0APhone:${form.phone}%0AAddress:${form.address}%0AState:${form.state}%0ALGA:${form.lga}%0APayment:${status} ${ref}%0AEst:${estimate}`;
    window.open(`https://wa.me/2348104006148?text=${waMsg}`,"_blank");
    localStorage.removeItem("zenith-cart"); setCart([]); setDone(true);
  };

  const payWithPaystack = () => {
    if(!form.name||!form.phone||!form.address||!form.lga) return alert("Fill Name, Phone, Address, State & LGA for perfect delivery");
    const handler = window.PaystackPop.setup({
      key: "pk_test_22b404c1f15be9c94cbde8be2b54d9aa3bce9b4e",
      email: `${form.phone}@zenithmall.com`,
      amount: total*100, currency: "NGN", ref: `ZM_${Date.now()}`,
      metadata: { custom_fields: [{display_name: "Customer", variable_name: "customer_name", value: form.name}] },
      callback: function(response){ saveOrderAndNotify("PAID - Integrity Check", response.reference); },
      onClose: function(){ alert("Payment closed - You can still use Pay on Delivery"); }
    });
    handler.openIframe();
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if(cart.length===0) return alert("Vault empty!");
<<<<<<< HEAD
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
=======
    if(!form.lga) return alert("Please search and select LGA - very important for rider");
    if(paymentMethod==="paystack") payWithPaystack(); else saveOrderAndNotify("Processing - Pay on Delivery");
>>>>>>> 3a37f1144263cdce37edc547919107024bf37eeb
  };

  if(done) return(
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
      <div className="bg-white/[0.04] border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full">
        <div className="text-5xl">✅</div>
        <h1 className="text-3xl font-black mt-4">Order Confirmed!</h1>
        <p className="mt-2 text-yellow-400 font-bold text-xl tracking-widest">Order ID: {orderId}</p>
        <p className="mt-2 text-sm text-white/70">{form.state} - {form.lga} • {estimate} • FREE DELIVERY</p>
        <Link href="/" className="mt-6 block bg-yellow-400 text-black font-black py-3 rounded-full">Back to Empire</Link>
        <Link href="/track" className="mt-3 block bg-white/10 text-white py-3 rounded-full text-sm font-bold">Track Order</Link>
      </div>
    </div>
  );

  return(
    <div className="min-h-screen bg-black text-white">
      <Script src="https://js.paystack.co/v1/inline.js" />
      <div className="max-w-5xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <div className="mt-6"><span className="text-[10px] tracking-[0.2em] bg-yellow-400 text-black px-3 py-1 rounded-full font-black">TRUSTED CHECKOUT - 36 STATES + LGA SEARCH</span><h1 className="text-3xl font-black mt-3">Checkout Vault</h1><p className="text-xs text-yellow-200/60 mt-1">Search State & LGA - No mistake delivery - {estimate}</p></div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-1">Customer Details</h3><p className="text-[11px] text-white/30 mb-4">Phone = Tracking ID - LGA helps rider find you fast</p>
            <form onSubmit={placeOrder} className="space-y-4">
              <input required placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              <input required placeholder="Phone Number (for tracking)" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              <input required placeholder="Delivery Address e.g. Beside Ezekiel College, Ujoelen, Ekpoma" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
              <div className="relative"><label className="text-[11px] text-yellow-400 font-bold">STATE - Type to search e.g. Edo</label><input className="w-full mt-1 bg-black border border-yellow-400/30 rounded-xl px-4 py-3 text-sm" value={stateSearch} onFocus={()=>setShowStateList(true)} onChange={e=>{setStateSearch(e.target.value); setShowStateList(true);}} />{showStateList && <div className="absolute z-50 mt-1 w-full max-h-56 overflow-auto bg-black border border-yellow-400/30 rounded-xl">{filteredStates.map(s=><div key={s} onClick={()=>{setForm({...form,state:s,lga:""}); setStateSearch(s); setLgaSearch(""); setShowStateList(false);}} className="px-4 py-2 text-sm hover:bg-yellow-400 hover:text-black cursor-pointer">{s}</div>)}</div>}</div>
              <div className="relative"><label className="text-[11px] text-yellow-400 font-bold">LGA - Type to search - Rider needs this!</label><input required className="w-full mt-1 bg-black border border-white/20 rounded-xl px-4 py-3 text-sm" value={lgaSearch} placeholder={form.state? `Search LGA in ${form.state}...`:"Select State first"} onFocus={()=>setShowLgaList(true)} onChange={e=>{setLgaSearch(e.target.value); setShowLgaList(true);}} />{showLgaList && <div className="absolute z-50 mt-1 w-full max-h-56 overflow-auto bg-black border border-white/20 rounded-xl">{filteredLga.map(l=><div key={l} onClick={()=>{setForm({...form,lga:l}); setLgaSearch(l); setShowLgaList(false);}} className="px-4 py-2 text-sm hover:bg-yellow-400 hover:text-black cursor-pointer">{l}</div>)}</div>}</div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-[11px]"><p>🚚 <span className="text-yellow-400 font-bold">{form.state} - {form.lga||"Choose LGA"}</span> • {estimate} - Free</p><p className="mt-1">📸 Integrity: Rider uploads buyer photo in {form.lga||"LGA"} before seller gets paid</p></div>
              <div className="border border-yellow-400/30 rounded-xl p-3 space-y-2"><p className="text-sm font-bold text-yellow-400">Choose Payment:</p><label className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-lg cursor-pointer"><input type="radio" checked={paymentMethod==="pay_on_delivery"} onChange={()=>setPaymentMethod("pay_on_delivery")} /> 📦 Pay on Delivery (No fee)</label><label className="flex items-center gap-2 text-sm bg-green-600/20 border border-green-500/30 p-3 rounded-lg cursor-pointer"><input type="radio" checked={paymentMethod==="paystack"} onChange={()=>setPaymentMethod("paystack")} /> 💳 Pay Now - Card / Transfer / USSD</label></div>
              <button type="submit" className="w-full bg-yellow-400 text-black font-black py-4 rounded-full text-sm hover:bg-yellow-300">{paymentMethod==="paystack"? `💳 Pay ₦${total.toLocaleString()} Now` : `📦 Place Order - Pay on Delivery ₦${total.toLocaleString()}`}</button>
              <p className="text-[10px] text-white/20 text-center">With God, our Integrity speaks. Secure • Trusted • No Scam</p>
            </form>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 h-fit"><h3 className="font-bold mb-4">Vault Summary ({cart.length})</h3><div className="space-y-3 max-h-72 overflow-auto">{cart.map((p,i)=><div key={i} className="flex gap-3 items-center bg-black/40 border border-white/5 rounded-xl p-2"><div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">{p.image? <img src={p.image} className="w-full h-full object-cover"/> : <span className="flex items-center justify-center h-full">👜</span>}</div><div className="flex-1"><p className="text-sm font-semibold">{p.title}</p><p className="text-[10px] text-white/30">Deliver to: {form.lga||form.state}</p></div><span className="text-yellow-400 font-bold text-xs">₦{p.price.toLocaleString()}</span></div>)}</div><div className="border-t border-white/10 mt-4 pt-4"><div className="flex justify-between text-xs text-white/40"><span>Subtotal ({cart.length})</span><span>₦{total.toLocaleString()}</span></div><div className="flex justify-between text-xs text-green-300 mt-1"><span>Delivery to {form.lga||form.state}</span><span>₦0 — FREE</span></div><div className="flex justify-between font-black text-lg mt-3"><span>Total</span><span className="text-yellow-400">₦{total.toLocaleString()}</span></div></div><div className="mt-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3"><p className="text-[11px] text-yellow-200">🔒 Order secured with LGA Photo Proof. No scam zone - Empire forever in Jesus name.</p></div></div>
        </div>
      </div>
    </div>
  )
                                 }
