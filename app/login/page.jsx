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
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={submit}
        className="bg-white shadow-xl p-6 rounded-xl w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">লগইন</h2>

        <input
          placeholder="ইমেইল"
          className="border p-2 w-full rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
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

        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          লগইন করুন
        </button>

        {/* 🔥 NEW PART */}
        <p className="text-center text-sm">
          এখনো একাউন্ট নেই?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            রেজিস্টার করুন
          </Link>
        </p>
      </form>
    </div>
  );
}