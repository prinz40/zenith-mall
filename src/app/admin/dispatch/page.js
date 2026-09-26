"use client";
import { useState, useEffect } from "react";
export default function DispatchPage(){
 const [orders, setOrders] = useState([]);
 useEffect(()=>{ setOrders(JSON.parse(localStorage.getItem("zenith-orders")||"[]")) },[]);
 const updateStatus = (id, status)=>{
   const updated = orders.map(o=> o.id===id ? {...o, status} : o);
   localStorage.setItem("zenith-orders", JSON.stringify(updated));
   setOrders(updated);
 };
 return (
  <div className="min-h-screen bg-black text-white p-4">
   <h1 className="text-xl font-bold text-yellow-400">Dispatch Queue - Amazon Level</h1>
   <p className="text-xs text-gray-400">Assign riders, update delivery status</p>
   <div className="mt-4 space-y-3">
    {orders.map(o=>(
     <div key={o.id} className="bg-zinc-900 p-3 rounded">
       <p>Order {o.id?.slice(0,6)} - {o.status}</p>
       <div className="flex gap-2 mt-2">
         <button onClick={()=>updateStatus(o.id,"out-for-delivery")} className="bg-blue-600 px-2 py-1 rounded text-xs">Out for Delivery</button>
         <button onClick={()=>updateStatus(o.id,"delivered")} className="bg-green-600 px-2 py-1 rounded text-xs">Delivered</button>
       </div>
     </div>
    ))}
   </div>
  </div>
 );
  }
