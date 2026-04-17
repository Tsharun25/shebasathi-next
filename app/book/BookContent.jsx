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
  const timeRange = params.get("time"); // 🔥 NEW

  const [selectedDay, setSelectedDay] = useState("");

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!selectedDay) {
      alert("দিন নির্বাচন করুন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor,
          date: selectedDay,
          time: timeRange, // ✅ doctor time use
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

      <p className="font-semibold mb-1">👨‍⚕️ {doctor}</p>
      <p className="text-gray-600 mb-4">⏰ {timeRange}</p>

      {/* Days */}
      <div className="mb-4">
        <p className="mb-2 font-semibold">দিন নির্বাচন করুন</p>
        <div className="flex flex-wrap gap-2">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1 rounded border ${
                selectedDay === d
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}