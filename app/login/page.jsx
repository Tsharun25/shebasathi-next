"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanPhone && !cleanEmail) {
      alert("মোবাইল বা ইমেইল যেকোনো একটি দিন");
      return;
    }

    if (!password) {
      alert("পাসওয়ার্ড দিন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(cleanPhone && { phone: cleanPhone }),
          ...(cleanEmail && { email: cleanEmail }),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.user && data?.token) {
        setUser(data.user, data.token);

        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(data?.message || "লগইন ব্যর্থ ❌");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex justify-center items-start pt-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          🔐 লগইন করুন
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          আপনার বুকিং ও সেবার আপডেট দেখতে লগইন করুন
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <input
            type="text"
            placeholder="📱 মোবাইল নম্বর"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-3 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="email"
            placeholder="📧 ইমেইল (ঐচ্ছিক)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="password"
            placeholder="🔑 পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold hover:scale-[1.01] transition disabled:opacity-60"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন"}
          </button>

          <p className="text-center text-sm mt-4">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="text-green-600 font-bold">
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}