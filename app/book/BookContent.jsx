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

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const timeOptions = [
    { en: "10:00 AM", bn: "সকাল" },
    { en: "12:00 PM", bn: "দুপুর" },
    { en: "3:00 PM", bn: "বিকাল" },
    { en: "6:00 PM", bn: "সন্ধ্যা" },
  ];

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/book",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor,
          date,
          time,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  const getDay = (d) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "short" });

  const isAvailable = date && days.includes(getDay(date));

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">
        বুকিং: {doctor}
      </h1>

      <input
        type="date"
        className="w-full border p-2 mb-3"
        onChange={(e) => setDate(e.target.value)}
      />

      {!isAvailable && date && (
        <p className="text-red-500">❌ এই দিনে ডাক্তার বসেন না</p>
      )}

      {isAvailable && (
        <select
          className="w-full border p-2 mb-3"
          onChange={(e) => setTime(e.target.value)}
        >
          <option>সময় নির্বাচন করুন</option>
          {timeOptions.map((t, i) => (
            <option key={i} value={t.en}>
              {t.bn}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        কনফার্ম
      </button>
    </div>
  );
}