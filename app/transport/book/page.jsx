"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";

export default function TransportBooking() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    vehicle: "Car",
    ac: "Non-AC",
  });

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!form.from || !form.to || !form.date) {
      alert("সব তথ্য দিন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          user: user.phone || user.email,
          type: "transport",
        }),
      },
    );

    const data = await res.json();

    // ✅ NEW ALERT (FARE SHOW)
    alert(
      data.fare
        ? `বুকিং সফল ✅\nভাড়া: ৳ ${data.fare}`
        : "বুকিং সফল ✅\nভাড়া: যোগাযোগ সাপেক্ষ",
    );

    // ✅ তারপর dashboard
    router.push("/dashboard");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-bold text-center">🚗 যাতায়াত বুকিং</h1>

      {/* FROM */}
      <input
        placeholder="📍 কোথা থেকে"
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, from: e.target.value })}
      />

      {/* TO */}
      <input
        placeholder="📍 কোথায় যাবেন"
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, to: e.target.value })}
      />

      {/* DATE */}
      <input
        type="date"
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      {/* VEHICLE TYPE */}
      <select
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
      >
        <option>Car</option>
        <option>Ambulance</option>
      </select>

      {/* AC / NON AC */}
      <select
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, ac: e.target.value })}
      >
        <option>Non-AC</option>
        <option>AC</option>
      </select>

      {/* INFO */}
      {/* <p className="text-sm text-gray-500 text-center">
        ⚠️ ভাড়া নির্ধারণের জন্য সরাসরি যোগাযোগ করুন
      </p> */}
      <p className="text-sm text-gray-500 mt-2">
        ⚠️ ভাড়া নির্ধারণ না থাকলে আমাদের সাথে যোগাযোগ করুন
      </p>

      {/* BUTTON */}
      <button
        onClick={handleBooking}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        বুকিং কনফার্ম
      </button>
    </div>
  );
}
