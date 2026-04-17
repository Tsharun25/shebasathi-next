"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (!name) return alert("নাম দিন");
    if (!phone && !email)
      return alert("মোবাইল বা ইমেইল যেকোনো একটি দিন");
    if (!password) return alert("পাসওয়ার্ড দিন");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.message === "User created") {
        alert("রেজিস্ট্রেশন সফল ✅");
        router.push("/login");
      } else {
        alert(data.message || "রেজিস্ট্রেশন ব্যর্থ ❌");
      }
    } catch (err) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-5">
          📝 রেজিস্টার করুন
        </h1>

        <input
          type="text"
          placeholder="👤 নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="📱 মোবাইল নম্বর"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          placeholder="📧 ইমেইল (ঐচ্ছিক)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="🔑 পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          রেজিস্টার
        </button>

        {/* 🔥 FIXED LINK */}
        <p className="text-center mt-4 text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            লগইন করুন
          </span>
        </p>
      </div>
    </div>
  );
}