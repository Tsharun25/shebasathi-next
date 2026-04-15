"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Book() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",") || [];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const times = ["10:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];

  // 🔥 English → Bangla day convert
  const dayMap = {
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
    Sat: "শনিবার",
  };

  // selected day check
  const selectedDay = date
    ? new Date(date).toLocaleDateString("en-US", { weekday: "short" })
    : "";

  const isAvailable = days.includes(selectedDay);

  // ✅ BOOK FUNCTION
  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!date || !time) {
      alert("তারিখ ও সময় নির্বাচন করুন");
      return;
    }

    if (!isAvailable) {
      alert("এই দিনে ডাক্তার বসেন না");
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
          date,
          time,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();

    alert(data.message);

    // ✅ redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-green-700">
        📅 বুকিং - {doctor}
      </h2>

      {/* DATE */}
      <input
        type="date"
        className="border p-2 w-full mb-3 rounded"
        onChange={(e) => setDate(e.target.value)}
      />

      {/* DAY STATUS */}
      {date && (
        <p
          className={`mb-3 text-center font-semibold ${
            isAvailable ? "text-green-600" : "text-red-600"
          }`}
        >
          {isAvailable
            ? `✅ ${dayMap[selectedDay]} - ডাক্তার বসেন`
            : `❌ ${dayMap[selectedDay]} - ডাক্তার বসেন না`}
        </p>
      )}

      {/* TIME SLOT */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {times.map((t, i) => (
          <button
            key={i}
            onClick={() => setTime(t)}
            disabled={!isAvailable}
            className={`p-2 rounded border ${
              time === t
                ? "bg-green-600 text-white"
                : "bg-white text-black"
            } ${!isAvailable && "opacity-50 cursor-not-allowed"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        বুকিং কনফার্ম করুন
      </button>
    </div>
  );
}