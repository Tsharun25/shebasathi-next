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
  const start = Number(params.get("start"));
  const end = Number(params.get("end"));

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // 🔥 Bangla Day Mapping
  const dayMap = {
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
    Sat: "শনিবার",
  };

  // 🔥 Next 2 months dates for selected day
  const getDates = (dayCode) => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const day = d.toLocaleDateString("en-US", { weekday: "short" });

      if (day === dayCode) {
        const formatted = d.toLocaleDateString("en-GB"); // dd/mm/yyyy
        result.push(formatted);
      }
    }

    return result;
  };

  // 🔥 Bangla Time Format
  const formatTime = (hour) => {
    if (hour >= 9 && hour <= 11) return `সকাল ${hour}.০০ টা`;

    if (hour >= 12 && hour <= 14)
      return `দুপুর ${hour === 12 ? 12 : hour - 12}.০০ টা`;

    if (hour >= 15 && hour <= 17) return `বিকাল ${hour - 12}.০০ টা`;

    if (hour >= 18 && hour <= 19) return `সন্ধ্যা ${hour - 12}.০০ টা`;

    if (hour >= 20 && hour <= 23) return `রাত ${hour - 12}.০০ টা`;

    return `${hour}:00`;
  };

  const timeSlots = [];
  for (let i = start; i <= end; i++) {
    timeSlots.push(i);
  }

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("তারিখ ও সময় নির্বাচন করুন");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctor,
        date: selectedDate,
        time: selectedTime,
        user: user.phone || user.email,
      }),
    });

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-5 max-w-xl mx-auto space-y-5">
      {/* Doctor */}
      <h1 className="text-xl font-bold text-center">👨‍⚕️ {doctor}</h1>

      {/* 🔥 DAY SELECT */}
      <div>
        <p className="font-semibold mb-2">📆 দিন নির্বাচন করুন:</p>
        <div className="flex flex-wrap gap-2">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedDay(d);
                setSelectedDate("");
                setSelectedTime("");
              }}
              className={`px-3 py-1 rounded border ${
                selectedDay === d ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {dayMap[d]}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 DATE SELECT */}
      {selectedDay && (
        <div>
          <p className="font-semibold mb-2">📅 তারিখ নির্বাচন করুন:</p>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {getDates(selectedDay).map((date, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime("");
                }}
                className={`px-3 py-1 rounded border text-sm ${
                  selectedDate === date ? "bg-green-600 text-white" : "bg-white"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 TIME SELECT */}
      {selectedDate && (
        <div>
          <p className="font-semibold mb-2">⏰ সময় নির্বাচন করুন:</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(formatTime(t))}
                className={`px-3 py-1 rounded border text-sm ${
                  selectedTime === formatTime(t)
                    ? "bg-purple-600 text-white"
                    : "bg-white"
                }`}
              >
                {formatTime(t)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 BUTTON */}
      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}
