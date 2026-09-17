"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS as BASE_PRODUCTS } from "../../../data/products.js";

export default function ProductDetails(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("zenith-products")||"[]");
    const all = [...BASE_PRODUCTS,...saved];
    const found = all.find(p=>String(p.id)===String(id));
    setProduct(found);
  },[id]);

  const addToVault = () => {
    if(!product) return;
    const cart = JSON.parse(localStorage.getItem("zenith-cart")||"[]");
    for(let i=0;i<qty;i++) cart.push(product);
    localStorage.setItem("zenith-cart", JSON.stringify(cart));
    alert(`✅ ${qty} x ${product.name} added to Vault! FREE DELIVERY INCLUDED!`);
    window.location.href="/";
  };

  if(!product) return <div className="min-h-screen bg-black text-white p-10 text-center">Loading treasure... 👑</div>;

  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 flex items-center justify-center min-h-[400px]">
            {product.image?.startsWith("data:")?
              <img src={product.image} alt={product.name} className="w-full h-auto max-h-[450px] object-contain rounded-2xl"/> :
              <div className="text-8xl">{product.emoji}</div>
            }
          </div>
          <div>
            <span className="text-[10px] tracking-widest bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full">{product.category}</span>
            <h1 className="text-3xl font-black mt-4">{product.name}</h1>
            <p className="text-white/40 text-xs mt-1">By {product.supplier || "Zenith Empire"} | Verified Partner</p>
            <div className="mt-6 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4">
              <p className="text-3xl font-black text-yellow-400">₦{product.price?.toLocaleString()}</p>
              <p className="text-[11px] text-yellow-200/70 mt-1">✅ FREE DELIVERY INCLUDED — Total Price | No extra fee at door | Pay on Delivery</p>
            </div>
            <p className="text-sm text-white/60 mt-6">{product.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
                <button onClick={()=>setQty(Math.max(1,qty-1))} className="font-bold">-</button>
                <span className="font-bold">{qty}</span>
                <button onClick={()=>setQty(qty+1)} className="font-bold">+</button>
              </div>
              <p className="text-xs text-white/40">Total ₦{(product.price*qty).toLocaleString()} — Delivery Inside</p>
            </div>

            <button onClick={addToVault} className="w-full mt-6 bg-yellow-400 text-black font-black py-4 rounded-full">Add {qty} to Vault 🛒</button>
            <Link href="/checkout" className="w-full mt-3 bg-white text-black font-bold py-3 rounded-full text-center block">Proceed to Checkout</Link>

            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="text-[11px] text-white/30">🛡️ Integrity Proof required. Track with phone number. No panic.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
