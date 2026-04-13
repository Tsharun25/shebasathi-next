"use client";

import { useState } from "react";

const API = "https://shebasathi-backend.onrender.com";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email && !form.phone) {
      alert("Email অথবা Mobile দিতে হবে");
      return;
    }

    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message);
  };

  return (
    <form className="p-10 max-w-md mx-auto space-y-3" onSubmit={submit}>
      <h2 className="text-xl font-bold">রেজিস্টার</h2>

      <input
        placeholder="নাম"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email (optional)"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Mobile Number"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-blue-600 text-white w-full py-2">
        Register
      </button>
    </form>
  );
}