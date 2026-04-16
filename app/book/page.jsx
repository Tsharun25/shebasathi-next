"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const timeSlots = [
  "সকাল ১০টা - ১২টা",
  "দুপুর ১২টা - ৩টা",
  "বিকাল ৩টা - ৬টা",
  "সন্ধ্যা ৬টা - ৮টা",
];

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

    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-5">
        📅 বুকিং করুন
      </h1>

      <h2 className="mb-4 font-semibold text-lg">
        👨‍⚕️ {doctor}
      </h2>

      {/* Day */}
      <p className="mb-2 font-semibold">📅 দিন নির্বাচন করুন:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(d)}
            className={`px-3 py-1 rounded border ${
              selectedDay === d
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Time */}
      <p className="mb-2 font-semibold">⏰ সময় নির্বাচন করুন:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {timeSlots.map((t, i) => (
          <button
            key={i}
            onClick={() => setSelectedTime(t)}
            className={`px-3 py-1 rounded border ${
              selectedTime === t
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}