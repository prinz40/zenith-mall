"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS } from "../data/products.js";

export default function Home(){
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [allProducts, setAllProducts] = useState(PRODUCTS);

  useEffect(()=>{
    const savedCart = JSON.parse(localStorage.getItem("zenith-cart")||"[]");
    setCart(savedCart);
    const savedProducts = JSON.parse(localStorage.getItem("zenith-products")||"[]");
    const merged = [...PRODUCTS,...savedProducts];
    setAllProducts(merged);
    const allOrders = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    setReviews(allOrders.filter(o=>o.review).slice(-3).reverse());
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(loaded) localStorage.setItem("zenith-cart", JSON.stringify(cart));
  },[cart, loaded]);

  const filtered = allProducts.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()));
  const addToCart = (product)=>{ if(!cart.find(c=>c.id===product.id)) setCart([...cart,product]) };
  const removeFromCart = (id)=> setCart(cart.filter(c=>c.id!==id));
  const isInCart = (id)=> cart.some(c=>c.id===id);

  return(
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-yellow-500/20 sticky top-0 bg-black/80 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-widest">ZENITHMALL 👑</h1>
          <div className="flex-1 max-w-md mx-4 md:mx-8">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search treasures..." className="w-full bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-sm"/>
          </div>
          <Link href="/cart" className="bg-yellow-400 text-black font-bold px-5 py-2 rounded-full text-sm">Vault ({cart.length})</Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-yellow-400 tracking-[0.3em] text-xs mb-4">EST. 2026 - BUILT ON INTEGRITY</p>
        <h2 className="text-5xl md:text-6xl font-black leading-[0.9]">LUXURY.<br/>TRUST.<br/><span className="text-yellow-400">DELIVERED.</span></h2>
        <div className="mt-6 inline-flex bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1 text-[10px] text-yellow-200">🚚 Delivery Duration: <b className="mx-1">Lagos 1-2 Days</b> - SW 2-3 Days - Other States 3-5 Days - Pay on Delivery</div>
        <p className="text-white/40 text-xs mt-3">No panic. Track your order live with phone number. Full refund if not as described.</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-8"><h3 className="font-bold">Imperial Collection</h3><p className="text-[10px] text-white/20">{filtered.length} items</p></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((p)=>{
            const inCart = isInCart(p.id);
            return(
              <div key={p.id} className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 hover:border-yellow-400/30 transition">
                <Link href={`/product/${p.id}`}>
                  <div className="bg-gradient-to-br from-white/[0.06] to-transparent rounded-xl h-48 flex items-center justify-center overflow-hidden">
                    {p.image? <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-110 transition duration-700" /> : <span className="text-4xl">{p.emoji || "👑"}</span>}
                  </div>
                </Link>
                <div className="p-2">
                  <span className="text-[10px] tracking-widest bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full">{p.tag || p.supplier || "Zenith"}</span>
                  <Link href={`/product/${p.id}`}><h4 className="font-bold text-sm mt-2">{p.name}</h4></Link>
                  <p className="text-yellow-400 font-bold mt-1">₦{p.price.toLocaleString()}</p>
                  <p className="text-[10px] text-white/30 mt-1">{p.category || "Luxury"} • Free Delivery Included</p>
                  {inCart? <button onClick={()=>removeFromCart(p.id)} className="mt-3 w-full bg-white/10 border border-white/20 rounded-full py-2 text-xs">✓ In Vault - Remove</button> : <button onClick={()=>addToCart(p)} className="mt-3 w-full bg-yellow-400 text-black font-bold rounded-full py-2 text-xs">Add to Vault</button>}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {reviews.length>0 && (
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-white/[0.04] border border-yellow-400/20 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-400 text-xs">👑 LIVE INTEGRITY PROOF - What buyers saw</h4>
          <p className="text-[10px] text-white/30">Real deliveries confirmed as described</p>
          <div className="mt-4 space-y-3">
            {reviews.map((o,i)=>(
              <div key={i} className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <p className="text-[11px] font-bold text-green-300">⭐⭐⭐⭐⭐ {o.customer.name} confirmed</p>
                <p className="text-xs text-white/80 mt-1">"{o.review.text}"</p>
                <p className="text-[9px] text-white/30 mt-1">✓ {o.items[0]?.name} - Delivered in 2-3 days</p>
              </div>
            ))}
          </div>
          <Link href="/reviews" className="text-[11px] text-yellow-400 underline mt-4 block">View all proof on Wall of Integrity →</Link>
        </div>
      </section>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-gradient-to-r from-yellow-400/20 via-yellow-500/10 to-black border border-yellow-400/30 rounded-2xl p-6 md:flex justify-between items-center">
          <div>
            <h4 className="font-black text-lg">🤝 Want to Supply ZenithMall?</h4>
            <p className="text-[11px] text-white/80 mt-1 max-w-lg">Join 20 trusted Lagos suppliers. Free Delivery Included model, Pay on Delivery, Integrity Photo Proof before you get paid. God + Integrity = Long Empire.</p>
          </div>
          <Link href="/partner" className="mt-4 md:mt-0 inline-block bg-yellow-400 text-black font-black px-8 py-3 rounded-full text-sm">Become a Partner →</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h4 className="font-bold text-xs text-white/80 text-center">Our Terms, Service & Guidelines</h4>
          <div className="grid md:grid-cols-3 gap-4 mt-4 text-[11px]">
            <div><b className="text-white/80">🚚 Delivery:</b> Lagos 1-2 days, Southwest 2-3 days, others 3-5 days. Free. Tracking via phone.</div>
            <div><b className="text-white/80">💳 Pay on Delivery:</b> No upfront payment. Pay when rider delivers.</div>
            <div><b className="text-white/80">🛡️ Integrity:</b> Every delivery requires buyer photo proof before seller gets paid.</div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2 justify-center pb-6">
        <Link href="/track" className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs">📦 Track Order</Link>
        <Link href="/reviews" className="bg-yellow-400 text-black font-bold rounded-full px-4 py-2 text-xs">Wall of Integrity</Link>
        <Link href="/admin/orders" className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs">Imperial Ledger</Link>
        <Link href="/partner" className="bg-white text-black font-black rounded-full px-5 py-2 text-xs border-2 border-yellow-400">🤝 Become a Partner</Link>
      </div>

      <footer className="text-center text-[9px] text-white/20 pb-10">
        © 2026 ZENITHMALL - Built on Integrity<br/>Delivery: 2-5 Days Nationwide | Service: 8am-8pm | No scam zone - God watches.
      </footer>
    </div>
  )
    }
