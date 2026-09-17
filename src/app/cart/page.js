"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem("zenith-cart")||"[]")) },[]);
  const remove = (id)=>{ const n=cart.filter(c=>c.id!==id); setCart(n); localStorage.setItem("zenith-cart", JSON.stringify(n)); };
  const total = cart.reduce((a,b)=>a+b.price,0);

  if(cart.length===0) return <div className="min-h-screen bg-black text-white p-10 text-center"><h2 className="text-2xl font-bold">Your Vault is Empty</h2><Link href="/" className="text-yellow-400 underline mt-4 block">Return to Empire</Link></div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-black">YOUR VAULT 👑</h1><p className="text-white/40 text-sm">{cart.length} treasures secured by integrity</p>
        <div className="mt-6 space-y-3">{cart.map(c=><div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-2xl">{c.emoji}</span><div><p className="font-semibold text-sm">{c.name}</p><p className="text-yellow-400 text-xs">₦{c.price.toLocaleString()}</p></div></div><button onClick={()=>remove(c.id)} className="text-red-400 text-xs">Remove</button></div>)}</div>
        <div className="bg-yellow-400 rounded-2xl p-5 mt-6 text-black"><p className="font-bold text-sm">Total: ₦{total.toLocaleString()}</p><p className="text-xs mt-1">Checkout with integrity - Pay on Delivery available</p><Link href="/checkout" className="block w-full bg-black text-yellow-400 font-black text-center py-3 rounded-full mt-4 text-sm">Proceed to Secure Checkout →</Link></div>
      </div>
    </div>
  );
}
