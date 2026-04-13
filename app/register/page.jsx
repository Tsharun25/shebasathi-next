"use client";

import { useState } from "react";

const API = "https://shebasathi-backend.onrender.com";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    if (!form.phone) {
      alert("মোবাইল নাম্বার দিন");
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
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={submit}
        className="bg-white shadow-xl p-6 rounded-xl w-80 space-y-3"
      >
        <h2 className="text-xl font-bold text-center">রেজিস্টার</h2>

        <input
          placeholder="নাম"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="মোবাইল নাম্বার"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Email (optional)"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          রেজিস্টার করুন
        </button>
      </form>
    </div>
  );
}