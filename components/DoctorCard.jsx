"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

// 🔥 English → Bangla day map
const dayMap = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

export default function DoctorCard({ doctor }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");

  // 🔥 load booked slots
  useEffect(() => {
    if (date) {
      fetch(
        `https://shebasathi-backend.onrender.com/api/booked/${doctor._id}/${date}`
      )
        .then((res) => res.json())
        .then((data) => setSlots(data));
    }
  }, [date]);

  // 🔥 generate time slots dynamically
  const generateSlots = () => {
    if (!doctor.startTime || !doctor.endTime) return [];

    const start = parseInt(doctor.startTime.split(":")[0]);
    const end = parseInt(doctor.endTime.split(":")[0]);

    let times = [];

    for (let i = start; i < end; i++) {
      const hour = i > 12 ? i - 12 : i;
      const ampm = i >= 12 ? "PM" : "AM";
      times.push(`${hour}:00 ${ampm}`);
    }

    return times;
  };

  const allSlots = generateSlots();

  // 🔥 only available day allow
  const isValidDay = (date) => {
    const day = new Date(date).toLocaleString("en-US", {
      weekday: "long",
    });
    return doctor.availableDays?.includes(day);
  };

  const book = async () => {
    if (!user) {
      if (confirm("⚠️ আগে লগইন করুন")) {
        router.push("/login");
      }
      return;
    }

    if (!date || !time) {
      return alert("তারিখ ও সময় নির্বাচন করুন");
    }

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/book",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          doctorId: doctor._id,
          doctorName: doctor.name,
          date,
          time,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="backdrop-blur-lg bg-white/70 border border-gray-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition space-y-3">

      <h2 className="text-xl font-bold text-blue-700">
        {doctor.name}
      </h2>

      <p className="text-gray-600">{doctor.department}</p>
      <p className="text-gray-600">{doctor.hospital}</p>

      <p className="font-semibold text-green-600">
        💰 ফি: ৳ {doctor.fee}
      </p>

      <p className="text-sm">
        📅 ডাক্তার বসেন:{" "}
        {doctor.availableDays?.map(d => dayMap[d]).join(", ")}
      </p>

      <p className="text-sm">
        ⏰ সময়: {doctor.startTime} - {doctor.endTime}
      </p>

      {/* DATE */}
      <input
        type="date"
        className="border p-2 w-full rounded"
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* SLOT BUTTONS (🔥 NO DROPDOWN) */}
      <div className="grid grid-cols-3 gap-2">
        {allSlots.map((t) => {
          const disabled =
            !isValidDay(date) || slots.includes(t);

          return (
            <button
              key={t}
              disabled={disabled}
              onClick={() => setTime(t)}
              className={`p-2 rounded text-sm
                ${
                  time === t
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }
                ${disabled && "opacity-40 cursor-not-allowed"}
              `}
            >
              {t}
            </button>
          );
        })}
      </div>

      <button
        onClick={book}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-full py-2 rounded-xl hover:scale-105 transition"
      >
        অ্যাপয়েন্টমেন্ট নিন
      </button>
    </div>
  );
}