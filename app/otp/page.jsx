"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function OTPLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);

  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const sendOtp = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ phone }),
    });

    setSent(true);
    alert("OTP পাঠানো হয়েছে");
  };

  const verifyOtp = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();

    if (data.user) {
      setUser(data.user);
      router.push("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-5 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-3">🔐 OTP লগইন</h1>

      <input
        placeholder="মোবাইল"
        className="border p-2 w-full mb-2"
        onChange={(e) => setPhone(e.target.value)}
      />

      {!sent ? (
        <button onClick={sendOtp} className="bg-blue-600 text-white w-full py-2">
          OTP পাঠান
        </button>
      ) : (
        <>
          <input
            placeholder="OTP"
            className="border p-2 w-full mt-2"
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={verifyOtp} className="bg-green-600 text-white w-full py-2 mt-2">
            Verify
          </button>
        </>
      )}
    </div>
  );
}