"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function OTPLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const sendOtp = async () => {
    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      alert("মোবাইল নম্বর দিন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "OTP পাঠানো যায়নি ❌");
        return;
      }

      setSent(true);
      alert("OTP পাঠানো হয়েছে ✅");
    } catch (err) {
      console.log("SEND OTP ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const cleanPhone = phone.trim();
    const cleanOtp = otp.trim();

    if (!cleanPhone || !cleanOtp) {
      alert("মোবাইল নম্বর এবং OTP দিন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, otp: cleanOtp }),
      });

      const data = await res.json();

      if (res.ok && data?.user && data?.token) {
        setUser(data.user, data.token);
        router.push("/dashboard");
      } else {
        alert(data?.message || "OTP verify failed ❌");
      }
    } catch (err) {
      console.log("VERIFY OTP ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex justify-center items-start pt-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          🔐 OTP লগইন
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          মোবাইল নম্বর দিয়ে সহজে লগইন করুন
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <input
            type="text"
            placeholder="📱 মোবাইল নম্বর"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={sent}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100 mb-3"
          />

          {!sent ? (
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold hover:scale-[1.01] transition disabled:opacity-60"
            >
              {loading ? "OTP পাঠানো হচ্ছে..." : "OTP পাঠান"}
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="🔢 OTP লিখুন"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300 mb-3"
              />

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:scale-[1.01] transition disabled:opacity-60"
              >
                {loading ? "Verify হচ্ছে..." : "Verify করুন"}
              </button>

              <button
                onClick={() => {
                  setSent(false);
                  setOtp("");
                }}
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                নম্বর পরিবর্তন করুন
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}