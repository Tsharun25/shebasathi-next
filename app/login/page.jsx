"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data); // 🔥 DEBUG

      // ✅ FIX (IMPORTANT)
      if (data && data.user) {
        setUser(data.user);
        alert("লগইন সফল ✅");
        router.push("/dashboard");
      } else {
        alert(data?.message || "লগইন ব্যর্থ ❌");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-5">
          🔐 লগইন করুন
        </h1>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          লগইন
        </button>

        <p className="text-center mt-4 text-sm">
          নতুন অ্যাকাউন্ট?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            রেজিস্টার করুন
          </span>
        </p>
      </div>
    </div>
  );
}