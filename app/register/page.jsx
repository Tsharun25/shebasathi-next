"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || (!cleanPhone && !cleanEmail) || !password) {
      alert("সব তথ্য দিন");
      return;
    }

    if (password.length < 6) {
      alert("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            ...(cleanPhone && { phone: cleanPhone }),
            ...(cleanEmail && { email: cleanEmail }),
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("রেজিস্ট্রেশন সফল ✅ এখন লগইন করুন");
        router.push("/login");
      } else {
        alert(data?.message || "রেজিস্ট্রেশন ব্যর্থ ❌");
      }
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex justify-center pt-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-2">
          📝 রেজিস্টার করুন
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          সেবাসাথী থেকে সেবা নিতে একটি অ্যাকাউন্ট তৈরি করুন
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <input
            type="text"
            placeholder="👤 নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
          />

          <input
            type="text"
            placeholder="📱 মোবাইল নম্বর"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-3 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
          />

          <input
            type="email"
            placeholder="📧 ইমেইল (ঐচ্ছিক)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
          />

          <input
            type="password"
            placeholder="🔑 পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:scale-[1.01] transition disabled:opacity-60"
          >
            {loading ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার"}
          </button>

          <p className="text-center text-sm mt-4">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="text-blue-600 font-bold">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}