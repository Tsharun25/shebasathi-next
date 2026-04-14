"use client";

import { useEffect, useState } from "react";

export default function Hotel() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch("https://shebasathi-backend.onrender.com/api/hotel")
      .then(res => res.json())
      .then(setList);
  }, []);

  const book = async () => {
    const res = await fetch("https://shebasathi-backend.onrender.com/api/hotel-book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <h1 className="text-2xl font-bold text-green-700 mb-5">
        🏨 থাকার ব্যবস্থা
      </h1>

      <div className="grid md:grid-cols-2 gap-5">
        {list.map((h, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition">
            <h2 className="font-bold text-lg">{h.name}</h2>
            <p>{h.location}</p>
            <p>💰 ৳ {h.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <input placeholder="নাম" className="border p-2 w-full"
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input placeholder="মোবাইল" className="border p-2 w-full"
          onChange={e => setForm({ ...form, phone: e.target.value })} />

        <input placeholder="লোকেশন" className="border p-2 w-full"
          onChange={e => setForm({ ...form, location: e.target.value })} />

        <input type="date" className="border p-2 w-full"
          onChange={e => setForm({ ...form, date: e.target.value })} />

        <button onClick={book}
          className="bg-green-600 text-white w-full py-2 rounded-lg hover:scale-105 transition">
          বুক করুন
        </button>
      </div>
    </div>
  );
}