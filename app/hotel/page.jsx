"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Hotel() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({});
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // 🔥 Load hotel list
  useEffect(() => {
    fetch("https://shebasathi-backend.onrender.com/api/hotel")
      .then(res => res.json())
      .then(setList);
  }, []);

  // 🔥 Booking function (FIXED)

const handleBook = async (h) => {
  if (!user) {
    alert("আগে লগইন করুন");
    router.push("/login");
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
        service: h.name,
        user: user.phone || user.email,
      }),
    }
  );

  const data = await res.json();
  alert(data.message);

  router.push("/dashboard"); // 🔥 SAME FLOW
};


  return (
    <div className="p-4 md:p-10">

      <h1 className="text-2xl font-bold text-green-700 mb-5 text-center">
        🏨 থাকার ব্যবস্থা
      </h1>

      {/* 🔥 HOTEL LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((h, i) => (
          <div
            key={i}
            className="bg-white p-4 md:p-5 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <h2 className="font-bold text-lg">{h.name}</h2>
            <p className="text-sm md:text-base">{h.location}</p>
            <p className="text-sm">💰 ৳ {h.price}</p>
          </div>
        ))}
      </div>

      {/* 🔥 BOOKING FORM */}
      <div className="mt-10 bg-white p-5 rounded-2xl shadow-md space-y-3 max-w-md mx-auto">

        <input
          placeholder="নাম"
          className="border p-2 w-full rounded"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="মোবাইল"
          className="border p-2 w-full rounded"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="লোকেশন"
          className="border p-2 w-full rounded"
          value={form.location || ""}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 w-full rounded"
          value={form.date || ""}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button
          onClick={handleBook}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition"
        >
          বুক করুন
        </button>
      </div>
    </div>
  );
}