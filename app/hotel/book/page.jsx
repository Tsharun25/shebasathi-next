"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function HotelBooking() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
  });

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");

      setTimeout(() => {
        router.push("/login");
      }, 300);

      return;
    }

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/hotel-book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: "Hotel Booking",
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">🏨 হোটেল বুকিং</h1>

      <input
        placeholder="নাম"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="মোবাইল"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        type="date"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <button
        onClick={handleBooking}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        বুকিং কনফার্ম
      </button>
    </div>
  );
}