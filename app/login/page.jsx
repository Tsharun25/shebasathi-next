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
    if (!phone && !email) {
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
          ...(phone.trim() && { phone: phone.trim() }),
          ...(email.trim() && { email: email.trim() }),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.user) {
        setUser(data.user, data.token);
        alert("লগইন সফল ✅");

        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
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
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-start pt-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🔐 লগইন করুন
        </h1>

        <div className="bg-white rounded-2xl shadow p-6">
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
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন"}
          </button>

          <p className="text-center text-sm mt-4">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="text-green-600 font-semibold">
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}