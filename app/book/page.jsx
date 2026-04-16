"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const timeSlots = ["সকাল", "দুপুর", "বিকাল", "সন্ধ্যা", "রাত"];

export default function Book() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",") || [];

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!selectedDay || !selectedTime) {
      alert("দিন ও সময় নির্বাচন করুন");
      return;
    }

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor,
          date: selectedDay,
          time: selectedTime,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard"); // 🔥 redirect after booking
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-5">
        📅 বুকিং করুন
      </h1>

      <h2 className="mb-3 font-semibold">ডাক্তার: {doctor}</h2>

      {/* Day selection */}
      <div className="mb-4">
        <p className="font-semibold mb-2">📅 দিন নির্বাচন করুন:</p>
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

      {/* Time selection */}
      <div className="mb-4">
        <p className="font-semibold mb-2">⏰ সময় নির্বাচন করুন:</p>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelectedTime(t)}
              className={`px-3 py-1 rounded border ${
                selectedTime === t
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}