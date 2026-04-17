"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function BookContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",") || [];
  const timeRange = params.get("time");

  const [date, setDate] = useState("");

  const getDay = (d) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "short" });

  const isAvailable = date && days.includes(getDay(date));

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!date || !isAvailable) {
      alert("সঠিক দিন নির্বাচন করুন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor,
          date,
          time: timeRange,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">
        📅 বুকিং করুন
      </h1>

      <p className="font-semibold">👨‍⚕️ {doctor}</p>
      <p className="text-gray-600 mb-3">⏰ {timeRange}</p>

      {/* DATE */}
      <input
        type="date"
        className="w-full border p-2 mb-3 rounded"
        onChange={(e) => setDate(e.target.value)}
      />

      {!isAvailable && date && (
        <p className="text-red-500 text-sm">
          ❌ এই দিনে ডাক্তার বসেন না
        </p>
      )}

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded mt-3"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}