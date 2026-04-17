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
  const start = params.get("start");
  const end = params.get("end");

  const [selectedDay, setSelectedDay] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  // 🔥 generate next 7 dates based on selected day
  const generateDates = (day) => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const weekday = d.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (weekday === day) {
        result.push(d.toISOString().split("T")[0]);
      }
    }

    setDates(result);
    setSelectedDate("");
    setTimes([]);
  };

  // 🔥 generate hourly slots
  const generateTimes = () => {
    const startHour = parseInt(start);
    const endHour = parseInt(end);

    const result = [];

    for (let h = startHour; h < endHour; h++) {
      result.push(`${h}:00`);
    }

    setTimes(result);
  };

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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
      {
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
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">
        👨‍⚕️ {doctor}
      </h1>

      {/* STEP 1: DAY */}
      <p className="font-semibold mb-2">📆 দিন নির্বাচন করুন:</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedDay(d);
              generateDates(d);
            }}
            className={`px-3 py-1 border rounded ${
              selectedDay === d ? "bg-blue-600 text-white" : ""
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* STEP 2: DATE */}
      {dates.length > 0 && (
        <>
          <p className="font-semibold mb-2">📅 তারিখ নির্বাচন করুন:</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {dates.map((d, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(d);
                  generateTimes();
                }}
                className={`px-3 py-1 border rounded ${
                  selectedDate === d ? "bg-green-600 text-white" : ""
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </>
      )}

      {/* STEP 3: TIME */}
      {times.length > 0 && (
        <>
          <p className="font-semibold mb-2">⏰ সময় নির্বাচন করুন:</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {times.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(t)}
                className={`px-3 py-1 border rounded ${
                  selectedTime === t ? "bg-purple-600 text-white" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}