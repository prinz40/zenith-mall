"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem("zenith-cart")||"[]")) },[]);
  const remove = (idx)=>{ const n=cart.filter((_,i)=>i!==idx); setCart(n); localStorage.setItem("zenith-cart", JSON.stringify(n)); };
  const clear = ()=>{ setCart([]); localStorage.removeItem("zenith-cart"); };
  const total = cart.reduce((a,b)=>a+b.price,0);

  if(cart.length===0) return <div className="min-h-screen bg-black text-white p-10 text-center flex flex-col items-center justify-center"><div className="text-6xl">👑</div><h2 className="text-2xl font-black mt-4">Your Vault is Empty</h2><p className="text-white/40 text-sm mt-2">No treasures secured yet. Go find luxury!</p><Link href="/" className="bg-yellow-400 text-black font-black px-8 py-3 rounded-full mt-6 text-sm">Return to Empire</Link></div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
      <div className="max-w-3xl mx-auto mt-8">
        <div className="flex justify-between items-start">
          <div><h1 className="text-3xl font-black">YOUR VAULT 👑</h1><p className="text-white/40 text-sm">{cart.length} treasures secured • FREE DELIVERY INCLUDED</p></div>
          <button onClick={clear} className="text-[10px] bg-white/10 px-3 py-1 rounded-full">Clear Vault</button>
        </div>

        <div className="mt-6 space-y-3">
          {cart.map((c,idx)=>
            <div key={idx} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 flex justify-between items-center hover:border-yellow-400/20 transition">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/10 overflow-hidden flex items-center justify-center">
                  {c.image? <img src={c.image} alt={c.name} className="w-full h-full object-cover"/> : <span className="text-xl">{c.emoji||"👑"}</span>}
                </div>
                <div>
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-yellow-400 text-xs font-bold">₦{c.price?.toLocaleString()} <span className="text-white/30 font-normal text-[10px]">• Delivery Included</span></p>
                  <p className="text-[10px] text-white/30">{c.supplier||"Zenith Empire"}</p>
                </div>
              </div>
              <button onClick={()=>remove(idx)} className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">Remove</button>
            </div>
          )}
        </div>

        <div className="bg-yellow-400 rounded-2xl p-5 mt-6 text-black">
          <div className="flex justify-between"><p className="font-black text-lg">Total: ₦{total.toLocaleString()}</p><p className="text-xs bg-black text-yellow-400 px-2 py-1 rounded-full font-bold">FREE DELIVERY</p></div>
          <p className="text-xs mt-2 opacity-70">✅ No extra fee at door • Pay on Delivery available • Integrity Proof required • Lagos 1-2 Days, Others 3-5 Days</p>
          <Link href="/checkout" className="block w-full bg-black text-yellow-400 font-black text-center py-4 rounded-full mt-4 text-sm">Proceed to Secure Checkout →</Link>
          <Link href="/" className="block w-full bg-white/20 text-black font-bold text-center py-3 rounded-full mt-2 text-xs">← Continue Shopping</Link>
        </div>

        <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-[11px] text-white/40">
          <p>🛡️ With God, our integrity speaks for us. You pay only after you see and confirm your product. Photo proof required for seller payment.</p>
        </div>
      </div>
    </div>
  );
    }
