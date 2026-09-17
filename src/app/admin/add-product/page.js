"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS as BASE_PRODUCTS } from "../../../data/products.js";

export default function AddProductPage(){
  const [products,setProducts]=useState([]);
  const [form,setForm]=useState({name:"", price:"", category:"", emoji:"👑", supplier:"", phone:"", image:""});
  const [preview,setPreview]=useState("");

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("zenith-products")||"[]");
    setProducts([...BASE_PRODUCTS,...saved]);
  },[]);

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm({...form, image: ev.target.result});
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addProduct = () => {
    if(!form.name ||!form.price){ alert("Please enter product name and price!"); return; }
    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseInt(form.price),
      category: form.category || "Zenith Collection",
      emoji: form.emoji || "👑",
      image: form.image,
      supplier: form.supplier || "Zenith Empire",
      supplierPhone: form.phone || "08104006146",
      description: "Supplied via ZenithMall Integrity Partnership - Free Delivery Included"
    };
    const saved = JSON.parse(localStorage.getItem("zenith-products")||"[]");
    const updated = [...saved, newProduct];
    localStorage.setItem("zenith-products", JSON.stringify(updated));
    setProducts([...BASE_PRODUCTS,...updated]);
    alert(`✅ ${form.name} Added! Image saved from gallery! Now visible on Mall!`);
    setForm({name:"", price:"", category:"", emoji:"👑", supplier:"", phone:"", image:""});
    setPreview("");
  };

  const deleteProduct = (id) => {
    if(!confirm("Delete this product?")) return;
    const saved = JSON.parse(localStorage.getItem("zenith-products")||"[]");
    const updated = saved.filter(p=>p.id!==id);
    localStorage.setItem("zenith-products", JSON.stringify(updated));
    setProducts([...BASE_PRODUCTS,...updated]);
  };

  return(
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
      <h1 className="text-2xl font-black mt-4">Admin Add Product 👑</h1>
      <p className="text-xs text-white/50">Add goods from phone gallery — Free Delivery Included</p>

      <div className="bg-white/[0.05] border border-yellow-400/20 rounded-2xl p-5 mt-6">
        <h2 className="font-bold text-yellow-400 text-sm mb-4">Add New Partnership Product</h2>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Product Name" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-yellow-400" />
        <div className="flex gap-2">
          <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Total Price (Product + Delivery + Profit) e.g 18000" type="number" className="flex-1 bg-black border border-white/20 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-yellow-400" />
          <input value={form.emoji} onChange={e=>setForm({...form, emoji:e.target.value})} placeholder="👑" className="w-20 bg-black border border-white/20 rounded-xl px-4 py-3 text-sm mb-3 text-center outline-none" />
        </div>
        <input value={form.category} onChange={e=>setForm({...form, category:e.target.value})} placeholder="Category" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-yellow-400" />
        <input value={form.supplier} onChange={e=>setForm({...form, supplier:e.target.value})} placeholder="Supplier Business Name" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-yellow-400" />
        <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Supplier Phone" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-yellow-400" />

        <div className="bg-black border border-yellow-400/30 rounded-xl p-3 mb-3">
          <p className="text-[11px] text-yellow-400 mb-2">📸 Tap to select picture from phone gallery / camera:</p>
          <input type="file" accept="image/*" onChange={handleImageFile} className="w-full text-xs text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-yellow-400 file:text-black" />
          {preview && <img src={preview} alt="preview" className="mt-3 w-full h-48 object-contain rounded-xl border border-white/10"/>}
        </div>

        <button onClick={addProduct} className="w-full bg-yellow-400 text-black font-black py-3 rounded-full">Add to ZenithMall Empire ✅</button>
        <p className="text-[10px] text-white/30 mt-3 text-center">Price you enter = FINAL price customer pays. Delivery already inside. No argument at door.</p>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-sm">All Products in Mall ({products.length})</h3>
        <div className="mt-3 space-y-2">
          {products.map(p=>(
            <div key={p.id} className="flex justify-between items-center bg-white/[0.03] border border-white/10 p-3 rounded-xl">
              <div className="flex items-center gap-3">
                {p.image?.startsWith("data:")? <img src={p.image} className="w-10 h-10 rounded object-cover"/> : <span>{p.emoji}</span>}
                <div><p className="text-sm font-bold">{p.name} - ₦{p.price?.toLocaleString()}</p><p className="text-[10px] text-white/40">{p.supplier} | Free Delivery Included</p></div>
              </div>
              {p.id>1000 && <button onClick={()=>deleteProduct(p.id)} className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full">Delete</button>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-10 justify-center">
        <Link href="/admin/orders" className="text-xs bg-white/10 px-4 py-2 rounded-full">View Ledger</Link>
        <Link href="/" className="text-xs bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">View Mall</Link>
      </div>
    </div>
  )
}
