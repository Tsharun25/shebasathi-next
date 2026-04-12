"use client";

import { useState } from "react";

const API = "https://shebasathi-backend.onrender.com";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("রেজিস্টার সফল ✅");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600">
      <form className="bg-white p-8 rounded-xl shadow w-96 space-y-4" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-center">রেজিস্টার</h2>

        <input
          placeholder="নাম"
          className="border p-3 w-full rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="ইমেইল"
          className="border p-3 w-full rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          className="border p-3 w-full rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-600 text-white w-full py-3 rounded">
          রেজিস্টার করুন
        </button>
      </form>
    </div>
  );
}