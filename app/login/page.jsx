"use client";

import { useState } from "react";

const API = "https://shebasathi-backend.onrender.com";

export default function Login() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/auth/login`, {
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

    localStorage.setItem("user", JSON.stringify(data.user));

    alert("লগইন সফল ✅");

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-500">
      <form className="bg-white p-8 rounded-xl shadow w-96 space-y-4" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-center">লগইন</h2>

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

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          লগইন করুন
        </button>
      </form>
    </div>
  );
}