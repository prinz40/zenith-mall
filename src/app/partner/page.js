"use client";
import { useState } from "react";
import Link from "next/link";

export default function Partner(){
  const [form,setForm]=useState({shop:"",owner:"",phone:"",wa:"",category:"Fashion",address:"",desc:""});
  const [agreed,setAgreed]=useState(false);
  const [done,setDone]=useState(false);

  const submit = (e) => {
    e.preventDefault();
    if(!agreed) return alert("You must agree to Integrity Proof & Free Delivery Included policy");
    const all = JSON.parse(localStorage.getItem("zenith-suppliers-pending")||"[]");
    const newSup = {
      id: "SUP"+Date.now().toString().slice(-5),
     ...form,
      date: new Date().toLocaleString(),
      status: "Pending Review",
      integritySigned: true,
      freeDeliverySigned: true
    };
    all.push(newSup);
    localStorage.setItem("zenith-suppliers-pending", JSON.stringify(all));
    setDone(true);
  };

  if(done) return(
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
      <div className="bg-white/[0.04] border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-black">Application Received! 🙏</h1>
        <p className="mt-3 text-sm text-white/60">Your shop <span className="text-yellow-400 font-bold">{form.shop}</span> is under Integrity Review.</p>
        <p className="mt-4 text-[11px] text-white/30">We will verify your business and products. If approved, you can start uploading products. Free Delivery MUST be included in your price. Rider must upload photo proof before you are paid.</p>
        <p className="mt-2 text-[11px] text-yellow-200/60">ID: {JSON.parse(localStorage.getItem("zenith-suppliers-pending")||"[]").slice(-1)[0]?.id}</p>
        <Link href="/" className="mt-6 block bg-yellow-400 text-black font-bold py-3 rounded-full">Back to Empire</Link>
      </div>
    </div>
  );

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <h1 className="text-3xl font-black mt-6">Become a Zenith Partner</h1>
        <p className="text-xs text-yellow-200/60 mt-1">Join the Peak of Commerce — Built on Integrity, Not Panic</p>

        <div className="mt-6 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 text-[11px] text-yellow-100/70 space-y-1">
          <p>✅ RULE 1: FREE DELIVERY INCLUDED — You must include delivery fee inside your product price. Customer sees only total price.</p>
          <p>🛡️ RULE 2: INTEGRITY PROOF — Every delivery requires buyer photo + foot wearing proof. No proof = No payment to you. Full refund if not as described.</p>
          <p>💰 RULE 3: PAY ON DELIVERY — We pay you after buyer confirms. God + Integrity = Long Empire.</p>
        </div>

        <form onSubmit={submit} className="mt-8 bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-4">
          <input required placeholder="Shop / Business Name e.g. Royal Kicks Lagos" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.shop} onChange={e=>setForm({...form,shop:e.target.value})}/>
          <input required placeholder="Owner Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})}/>
          <input required placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <input required placeholder="WhatsApp Number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.wa} onChange={e=>setForm({...form,wa:e.target.value})}/>
          <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            <option>Fashion</option><option>Electronics</option><option>Beauty</option><option>Footwear</option><option>Home</option><option>Other</option>
          </select>
          <input required placeholder="Shop Address / Market" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
          <textarea required placeholder="What do you sell? Why should ZenithMall trust you? (Integrity statement)" rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/>

          <label className="flex gap-3 items-start bg-black/50 rounded-xl p-3 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="mt-1"/>
            <span className="text-[11px] text-white/60">I swear by God and Integrity: I will include FREE DELIVERY in my price, I will deliver exactly what buyer saw, I accept photo + foot proof required before payment, and I accept full refund + rider return cost if not as described.</span>
          </label>

          <button type="submit" className="w-full bg-yellow-400 text-black font-black py-4 rounded-full">Submit Application — Join Empire</button>
          <p className="text-[10px] text-white/20 text-center">With God, our integrity speaks for us. No panic sales.</p>
        </form>
      </div>
    </div>
  )
}
