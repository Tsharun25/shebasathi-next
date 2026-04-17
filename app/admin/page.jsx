"use client";

import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    specialist: "",
    hospital: "",
    fee: "",
    days: "",
    time: "",
  });

  const handleAdd = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/add-doctor`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          fee: Number(form.fee),
          days: form.days.split(","),
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-5">
        🛠️ Admin Panel
      </h1>

      <input placeholder="নাম" className="input" onChange={(e)=>setForm({...form,name:e.target.value})} />
      <input placeholder="Specialist" className="input" onChange={(e)=>setForm({...form,specialist:e.target.value})} />
      <input placeholder="Hospital" className="input" onChange={(e)=>setForm({...form,hospital:e.target.value})} />
      <input placeholder="Fee" className="input" onChange={(e)=>setForm({...form,fee:e.target.value})} />
      <input placeholder="Days (Sun,Mon,Tue)" className="input" onChange={(e)=>setForm({...form,days:e.target.value})} />
      <input placeholder="Time (সকাল ১০টা - দুপুর ২টা)" className="input" onChange={(e)=>setForm({...form,time:e.target.value})} />

      <button
        onClick={handleAdd}
        className="mt-4 w-full bg-purple-600 text-white py-2 rounded"
      >
        ডাক্তার যোগ করুন
      </button>
    </div>
  );
}