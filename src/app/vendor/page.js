"use client";
import { useState, useEffect } from "react";
export default function VendorDashboard() {
  const [phone, setPhone] = useState("");
  const [logged, setLogged] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const o = JSON.parse(localStorage.getItem("zenith-orders") || "[]");
    setOrders(o);
    const saved = localStorage.getItem("zenith-vendor-phone");
    if(saved){ setPhone(saved); setLogged(true); }
  }, []);
  const totalSales = orders.reduce((s,o)=> s + (o.total||0), 0);
  if(!logged) return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-yellow-400">Vendor Imperial Ledger</h1>
      <input className="p-3 rounded text-black w-72 mt-4" placeholder="Enter Vendor Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <button onClick={()=>{localStorage.setItem("zenith-vendor-phone", phone); setLogged(true)}} className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded font-bold">Enter Ledger</button>
      <p className="mt-2 text-sm text-gray-400">contact.zenithmall@gmail.com</p>
    </div>
  );
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold text-yellow-400">Imperial Ledger - {phone}</h1>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-zinc-900 p-3 rounded"><p className="text-xs">Total Sales</p><p className="font-bold text-yellow-400">₦{totalSales.toLocaleString()}</p></div>
        <div className="bg-zinc-900 p-3 rounded"><p className="text-xs">Fee 10%</p><p className="font-bold">₦{(totalSales*0.1).toLocaleString()}</p></div>
        <div className="bg-zinc-900 p-3 rounded"><p className="text-xs">Payout 90%</p><p className="font-bold text-green-400">₦{(totalSales*0.9).toLocaleString()}</p></div>
      </div>
    </div>
  );
    }
