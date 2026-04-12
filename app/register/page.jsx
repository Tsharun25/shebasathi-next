"use client";

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://your-backend-url/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "রেজিস্টার ব্যর্থ");
        return;
      }

      alert("রেজিস্টার সফল ✔");

      window.location.href = "/login";

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-500">

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">রেজিস্টার</h2>

        <input
          placeholder="নাম"
          required
          className="border p-3 w-full rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="ইমেইল"
          required
          className="border p-3 w-full rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          required
          className="border p-3 w-full rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white w-full py-3 rounded">
          রেজিস্টার করুন
        </button>
      </form>

    </div>
  );
}