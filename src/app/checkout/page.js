"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

export default function Checkout(){
  const [cart,setCart]=useState([]);
  const [form,setForm]=useState({name:"",phone:"",address:"",state:"Lagos"});
  const [done,setDone]=useState(false);
  const [orderId,setOrderId]=useState("");
  const [paymentMethod,setPaymentMethod]=useState("pay_on_delivery");

  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem("zenith-cart")||"[]")); },[]);

  const total = cart.reduce((s,b)=>s+b.price,0);
  const estimate = form.state.toLowerCase().includes("lagos")? "1-2 Days" : form.state.toLowerCase().match(/ogun|oyo|osun|ondo|ekiti/)? "2-3 Days" : "3-5 Days";

  const saveOrderAndNotify = (status, ref="") => {
    const id = "ZM"+Date.now().toString().slice(-6);
    setOrderId(id);
    const orders = JSON.parse(localStorage.getItem("zenith-orders")||"[]");
    const newOrder = {
      id, items: cart, total,
      customer: form,
      date: new Date().toLocaleString(),
      status: status,
      paymentRef: ref,
      deliveryIncluded: true,
      deliveryEstimate: estimate
    };
    orders.push(newOrder);
    localStorage.setItem("zenith-orders", JSON.stringify(orders));
    const itemList = cart.map(p=>`${p.title} (₦${Number(p.price).toLocaleString()})`).join("%0A");
    const waMsg = `🔥 NEW ZENITHMALL ORDER ${status} %0A%0A${itemList}%0AGRAND TOTAL: ₦${total.toLocaleString()} (FREE DELIVERY INCLUDED)%0AName: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}, ${form.state}%0APayment: ${status} ${ref? '- Ref:'+ref : ''}%0AEstimate: ${estimate}`;
    const waLink = `https://wa.me/2348104006148?text=${waMsg}`;
    localStorage.removeItem("zenith-cart");
    setCart([]);
    setDone(true);
    window.open(waLink,"_blank");
  };

  const payWithPaystack = () => {
    if(!form.name ||!form.phone){ alert("Fill name and phone first"); return; }
    const handler = window.PaystackPop.setup({
      key: "pk_test_22b404c1f15be9c94cbde8be2b54d9aa3bce9b4e",
      email: `${form.phone}@zenithmall.com`,
      amount: total * 100,
      currency: "NGN",
      ref: `ZM_${Date.now()}`,
      metadata: { custom_fields: [{display_name: "Customer Name", variable_name: "customer_name", value: form.name}] },
      callback: function(response){ saveOrderAndNotify("PAID - Integrity Check", response.reference); },
      onClose: function(){ alert("Payment closed - You can still use Pay on Delivery"); }
    });
    handler.openIframe();
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if(cart.length===0)return alert("Vault empty!");
    if(paymentMethod==="paystack"){
      payWithPaystack();
    } else {
      saveOrderAndNotify("Processing - Integrity Check");
    }
  };

if(done) return(
  <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 text-center">
    <div className="bg-white/10 border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full">
      <div className="text-5xl">✅</div>
      <h1 className="text-3xl font-black mt-4">Order Confirmed!</h1>
      <p className="mt-2 text-yellow-400 font-bold text-xl tracking-widest">Order ID: {orderId}</p>
      <p className="mt-2 text-sm text-white/70">Total: ₦{total.toLocaleString()} - FREE DELIVERY INCLUDED - {estimate}</p>
      <div className="mt-4 bg-black/40 border border-yellow-400/20 rounded-xl p-3 text-left text-[11px] text-yellow-100 space-y-1">
        <p>✓ Track with phone: {form.phone}</p>
        <p>✓ Pay on Delivery: No extra fee at door</p>
        <p>✓ Rider must upload buyer photo + proof</p>
        <p>✓ Full refund if not as described</p>
      </div>
      <Link href="/" className="mt-6 block bg-yellow-400 text-black font-black py-3 rounded-full">Back to Empire</Link>
      <Link href="/track" className="mt-3 block bg-white/10 text-white py-3 rounded-full text-sm font-bold">Track Order</Link>
    </div>
  </div>
);

return(
  <div className="min-h-screen bg-black text-white">
  <Script src="https://js.paystack.co/v1/inline.js" />
  <div className="max-w-5xl mx-auto p-6">
    <Link href="/" className="text-yellow-400 text-sm">← Back to Empire</Link>
    <div className="mt-6"><span className="text-[10px] tracking-[0.2em] bg-yellow-400 text-black px-3 py-1 rounded-full font-black">TRUSTED CHECKOUT</span></div>

    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
        <h3 className="font-bold mb-4">Customer Details</h3>
        <p className="text-[11px] text-white/30 mb-4">For tracking & Integrity Proof</p>
        <form onSubmit={placeOrder} className="space-y-4">
          <input required placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input required placeholder="Phone Number (for tracking)" className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input required placeholder="Delivery Address e.g. 12 Allen Ave, Ikeja" className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
          <select className="w-full bg-black/10 border border-white/20 rounded-xl p-3 text-sm" value={form.state} onChange={e=>setForm({...form,state:e.target.value})}>
            <option>Lagos</option><option>Ogun</option><option>Oyo</option><option>Osun</option><option>Ondo</option><option>Abuja</option><option>Others</option>
          </select>
          <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-[11px]">
            <p>🚚 Delivery Estimate: <span className="text-yellow-400 font-bold">{estimate}</span> - Free Delivery</p>
            <p className="mt-1">📸 Integrity Proof: Rider uploads buyer photo + wearing proof before seller gets paid</p>
          </div>

          {/* PAYMENT METHOD SELECTION - NEW */}
          <div className="border border-yellow-400/30 rounded-xl p-3 space-y-3">
            <p className="text-sm font-bold text-yellow-400">Choose Payment Method:</p>
            <label className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-lg cursor-pointer"><input type="radio" checked={paymentMethod==="pay_on_delivery"} onChange={()=>setPaymentMethod("pay_on_delivery")} /> 📦 Pay on Delivery (No extra fee)</label>
            <label className="flex items-center gap-2 text-sm bg-green-600/20 border border-green-500/30 p-3 rounded-lg cursor-pointer"><input type="radio" checked={paymentMethod==="paystack"} onChange={()=>setPaymentMethod("paystack")} /> 💳 Pay Now with Paystack - Card, Transfer, USSD</label>
          </div>

          <button type="submit" className="w-full bg-yellow-400 text-black font-black py-4 rounded-full text-sm hover:bg-yellow-300">
            {paymentMethod==="paystack"? "💳 Pay ₦"+total.toLocaleString()+" Now" : "🛒 Place Order - Pay on Delivery"}
          </button>
          <p className="text-[10px] text-white/20 text-center">With God, our Integrity speaks. Secure • Trusted • & Fast</p>
        </form>
      </div>

      <div className="bg-white/10 border border-white/10 rounded-2xl p-6 h-fit">
        <h3 className="font-bold mb-4">Vault Summary ({cart.length})</h3>
        <div className="space-y-3">
          {cart.map((p,i)=>(
            <div key={i} className="flex gap-3 items-center bg-black/40 border border-white/5 rounded-xl p-2">
              <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">{p.image?<img src={p.image} className="w-full h-full object-cover" />: <div className="flex items-center justify-center h-full">👜</div>}</div>
              <div className="flex-1"><p className="text-sm font-semibold line-clamp-1">{p.title}</p><span className="text-yellow-400 font-bold text-xs">₦{p.price.toLocaleString()}</span></div>
            </div>
          ))}
        </div>
        {(cart.length>0) && <p className="text-white/30 text-sm text-center py-8">Vault empty - Add treasures from Empire</p>}
        <div className="border-t border-white/10 mt-4 pt-4">
          <div className="flex justify-between text-xs text-green-300"><span>Subtotal ({cart.length} items)</span><span>₦{total.toLocaleString()}</span></div>
          <div className="flex justify-between text-xs text-green-300 mt-1"><span>Delivery Fee</span><span>₦0 - FREE</span></div>
          <div className="flex justify-between font-black text-lg mt-2"><span>Total Pay on Delivery</span><span>₦{total.toLocaleString()}</span></div>
        </div>
        <div className="mt-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3"><p className="text-[11px] text-yellow-200">🔒 Your order is secured with Integrity Photo Proof. No scam zone.</p></div>
      </div>
    </div>
  </div>
  </div>
)
  }
