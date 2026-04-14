"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Book() {
  const params = useSearchParams();
  const doctorName = params.get("doctor");
  const daysParam = params.get("days");

  const availableDays = daysParam ? daysParam.split(",") : [];

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  // 🕒 Slots (Bangla format)
  const slots = [
    "বিকাল ৪.০০ টা",
    "বিকাল ৫.০০ টা",
    "সন্ধ্যা ৬.০০ টা",
    "সন্ধ্যা ৭.০০ টা",
    "রাত ৮.০০ টা",
  ];

  // 📅 Next 7 days generate
  const getNextDays = () => {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);

      const dateStr = d.toISOString().split("T")[0];
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];

      arr.push({ date: dateStr, day: dayName });
    }
    return arr;
  };

  const daysList = getNextDays();

  // 🔒 booked slots load
  useEffect(() => {
    if (!selectedDate || !user) return;

    fetch(
      `https://shebasathi-backend.onrender.com/api/my-bookings/${user.phone || user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter(
            (b) => b.doctor === doctorName && b.date === selectedDate
          )
          .map((b) => b.time);

        setBookedSlots(filtered);
      });
  }, [selectedDate, user]);

  // 📌 booking function
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
      "https://shebasathi-backend.onrender.com/api/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor: doctorName,
          date: selectedDate,
          time: selectedTime,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    if (data.message.includes("success")) {
      router.push("/dashboard");
    }
  };

  // 📆 Bangla day convert
  const toBanglaDay = (day) => {
    const map = {
      Sun: "রবি",
      Mon: "সোম",
      Tue: "মঙ্গল",
      Wed: "বুধ",
      Thu: "বৃহস্পতি",
      Fri: "শুক্র",
      Sat: "শনি",
    };
    return map[day] || day;
  };

  return (
    <div className="p-4 md:p-10 max-w-md mx-auto">

      <h1 className="text-xl font-bold text-center mb-4">
        🩺 {doctorName}
      </h1>

      {/* 📅 CALENDAR */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {daysList.map((d, i) => {
          const disabled = !availableDays.includes(d.day);

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => setSelectedDate(d.date)}
              className={`
                p-3 rounded-xl border text-sm font-semibold
                ${selectedDate === d.date ? "bg-blue-600 text-white" : ""}
                ${disabled ? "bg-gray-200 cursor-not-allowed" : "hover:bg-blue-100"}
              `}
            >
              {toBanglaDay(d.day)}
              <br />
              {d.date.slice(8)}
            </button>
          );
        })}
      </div>

      {/* ⏰ SLOT */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {slots.map((s, i) => {
          const isBooked = bookedSlots.includes(s);

          return (
            <button
              key={i}
              disabled={isBooked}
              onClick={() => setSelectedTime(s)}
              className={`
                p-2 rounded-lg border text-sm
                ${selectedTime === s ? "bg-green-600 text-white" : ""}
                ${isBooked ? "bg-gray-300 cursor-not-allowed" : "hover:bg-green-100"}
              `}
            >
              {s}
              {isBooked && " ❌"}
            </button>
          );
        })}
      </div>

      {/* ✅ BOOK BUTTON */}
      <button
        onClick={handleBooking}
        className="bg-green-600 text-white w-full py-3 rounded-xl text-lg"
      >
        নিশ্চিত করুন
      </button>
    </div>
  );
}