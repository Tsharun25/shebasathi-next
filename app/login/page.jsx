"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.token) {
      login(data);
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 px-4">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">লগইন</h2>

        <input
          placeholder="মোবাইল বা ইমেইল"
          className="border p-2 w-full rounded"
          onChange={(e) =>
            setForm({ ...form, identifier: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          className="border p-2 w-full rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          লগইন করুন
        </button>

        <p className="text-center text-sm">
          একাউন্ট নেই?{" "}
          <Link href="/register" className="text-blue-600 font-semibold">
            রেজিস্টার করুন
          </Link>
        </p>
      </form>
    </div>
  );
}