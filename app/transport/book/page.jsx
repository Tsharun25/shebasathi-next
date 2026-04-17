"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";

export default function TransportBooking() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!from || !to || !date) {
      alert("সব তথ্য দিন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "transport",
          from,
          to,
          date,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-5 space-y-3">
      <h1 className="text-xl font-bold">🚗 যাতায়াত বুকিং</h1>

      <input placeholder="কোথা থেকে" className="input" onChange={(e)=>setFrom(e.target.value)} />
      <input placeholder="কোথায় যাবেন" className="input" onChange={(e)=>setTo(e.target.value)} />
      <input type="date" className="input" onChange={(e)=>setDate(e.target.value)} />

      <button onClick={handleBooking} className="bg-green-600 text-white w-full py-2 rounded">
        বুকিং করুন
      </button>
    </div>
  );
}