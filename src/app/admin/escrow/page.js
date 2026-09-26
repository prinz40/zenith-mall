"use client";
import { useState, useEffect } from "react";
export default function EscrowPage(){
 const [orders, setOrders] = useState([]);
 useEffect(()=>{ setOrders(JSON.parse(localStorage.getItem("zenith-orders")||"[]")) },[]);
 const release = (id)=>{
   const updated = orders.map(o=> o.id===id ? {...o, status:"released"} : o);
   localStorage.setItem("zenith-orders", JSON.stringify(updated));
   setOrders(updated);
 };
 return (
  <div className="min-h-screen bg-black text-white p-4">
   <h1 className="text-xl font-bold text-yellow-400">Escrow Vault - CEO Control</h1>
   <p className="text-xs text-gray-400">contact.zenithmall@gmail.com | Release funds after 10% fee</p>
   <div className="mt-4 space-y-3">
    {orders.map(o=>(
     <div key={o.id} className="bg-zinc-900 p-3 rounded flex justify-between items-center">
       <div><p>Order {o.id?.slice(0,6)} - ₦{o.total}</p><p className="text-xs text-gray-400">{o.status}</p></div>
       <button onClick={()=>release(o.id)} className="bg-green-600 px-3 py-1 rounded text-sm">Release 90%</button>
     </div>
    ))}
   </div>
  </div>
 );
}
