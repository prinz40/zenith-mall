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
    // Also notify owner via WhatsApp
    const msg = `NEW PARTNER APPLICATION %0A Shop: ${form.shop} %0A Owner: ${form.owner} %0A Phone: ${form.phone} %0A WA: ${form.wa} %0A Category: ${form.category} %0A ID: ${newSup.id}`;
    window.open(`https://wa.me/2348100000000?text=${msg}`, '_blank');
    setDone(true);
  };

  if(done) return(
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
      <div className="bg-white/[0.04] border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full">
        <div className="text-5xl">👑</div>
        <h1 className="text-3xl font-black mt-4">Application Received! 🙏</h1>
        <p className="mt-3 text-sm text-white/60">Your shop <span className="text-yellow-400 font-bold">{form.shop}</span> is under Integrity Review.</p>
        <p className="mt-2 text-xs text-white/40">ID: {JSON.parse(localStorage.getItem("zenith-suppliers-pending")||"[]").slice(-1)[0]?.id} • Status: Pending</p>
        <div className="mt-6 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3 text-[11px] text-yellow-100/70 text-left">
          <p>✅ Next: We verify your products</p>
          <p>✅ You upload with real images (no emoji)</p>
          <p>✅ Buyer pays on delivery, you get paid after photo proof</p>
        </div>
        <Link href="/" className="mt-6 block bg-yellow-400 text-black font-black py-3 rounded-full">Back to Empire</Link>
        <Link href="/admin/orders" className="mt-2 block bg-white/10 text-white font-bold py-3 rounded-full text-xs">View as Admin</Link>
      </div>
    </div>
  );

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <div className="mt-6">
          <span className="text-[10px] tracking-[0.2em] bg-yellow-400 text-black px-3 py-1 rounded-full font-black">PARTNER EMPIRE</span>
          <h1 className="text-4xl font-black mt-4 leading-tight">Become a Zenith Partner</h1>
          <p className="text-sm text-white/50 mt-2">Join the Peak of Commerce — Sell to 200M Nigerians • Built on Integrity, Not Panic</p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mt-6">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4"><p className="text-yellow-400 font-black text-lg">10% Fee</p><p className="text-[11px] text-white/40 mt-1">Only when you sell. No listing fee. We make money when you make money.</p></div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4"><p className="text-yellow-400 font-black text-lg">Free Delivery Model</p><p className="text-[11px] text-white/40 mt-1">Include delivery in price. Buyer sees ONE price. Trust x10.</p></div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4"><p className="text-yellow-400 font-black text-lg">Pay on Delivery</p><p className="text-[11px] text-white/40 mt-1">Buyer trusts you. Rider collects. You are paid after integrity photo proof.</p></div>
        </div>

        <div className="mt-6 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 text-[11px] text-yellow-100/70 space-y-2">
          <p className="font-bold text-yellow-300 text-xs">🛡️ INTEGRITY CONTRACT (Read Carefully):</p>
          <p>✅ <b>RULE 1: FREE DELIVERY INCLUDED</b> — You MUST include delivery fee inside your product price. Customer sees only total price. No surprise at door.</p>
          <p>✅ <b>RULE 2: INTEGRITY PROOF</b> — Every delivery requires buyer photo + foot wearing / product proof. No proof = No payment to you. Full refund if not as described, you pay return.</p>
          <p>✅ <b>RULE 3: PAY ON DELIVERY + TRUST</b> — We pay you after buyer confirms. God + Integrity = Long Empire. Scammers banned forever.</p>
        </div>

        <form onSubmit={submit} className="mt-8 bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-4">
          <p className="text-xs font-bold tracking-widest text-white/30">YOUR SHOP DETAILS</p>
          <input required placeholder="Shop / Business Name e.g. Royal Kicks Lagos" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:border-yellow-400/50 outline-none" value={form.shop} onChange={e=>setForm({...form,shop:e.target.value})}/>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Owner Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})}/>
            <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              <option>Fashion</option><option>Electronics</option><option>Beauty</option><option>Footwear</option><option>Home</option><option>Other</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
            <input required placeholder="WhatsApp Number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.wa} onChange={e=>setForm({...form,wa:e.target.value})}/>
          </div>
          <input required placeholder="Shop Address / Market e.g. Balogun Market Lagos" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
          <textarea required placeholder="What do you sell? Why should ZenithMall trust you? (Integrity statement)" rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/>

          <label className="flex gap-3 items-start bg-black border border-yellow-400/20 rounded-xl p-4 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="mt-1"/>
            <span className="text-[11px] text-white/60">I swear by God and Integrity: I will include FREE DELIVERY in my price, I will deliver exactly what buyer saw, I accept photo + foot proof required before payment, and I accept full refund + rider return cost if not as described. I want long-term empire, not quick scam.</span>
          </label>

          <button type="submit" className="w-full bg-yellow-400 text-black font-black py-4 rounded-full text-sm hover:bg-yellow-300 transition">Submit Application — Join Empire 👑</button>
          <p className="text-[10px] text-white/20 text-center">With God, our integrity speaks for us. No panic sales. • Applications reviewed in 24h</p>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-white/30">Already a partner? <Link href="/admin/add-product" className="text-yellow-400">Upload Product</Link> • <Link href="/admin/orders" className="text-yellow-400">View Ledger</Link></p>
        </div>
      </div>
    </div>
  )
    }
