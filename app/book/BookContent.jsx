"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function BookContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",") || [];

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    { label: "🌅 সকাল (10:00 AM)", value: "10:00 AM" },
    { label: "🌞 দুপুর (1:00 PM)", value: "1:00 PM" },
    { label: "🌇 বিকাল (4:00 PM)", value: "4:00 PM" },
    { label: "🌙 সন্ধ্যা (7:00 PM)", value: "7:00 PM" },
  ];

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
      `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-5">
        📅 বুকিং করুন
      </h1>

      <h2 className="mb-3 font-semibold">👨‍⚕️ {doctor}</h2>

      {/* DAY */}
      <div className="mb-5">
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

      {/* TIME */}
      {selectedDay && (
        <div className="mb-5">
          <p className="font-semibold mb-2">⏰ সময় নির্বাচন করুন:</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(t.value)}
                className={`px-3 py-1 rounded border ${
                  selectedTime === t.value
                    ? "bg-green-600 text-white"
                    : "bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}