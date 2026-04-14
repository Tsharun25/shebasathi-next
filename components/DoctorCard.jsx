"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

function convertSlotToBangla(time) {
  const [hourMin, periodRaw] = time.split(" "); // "6:00 PM"
  const [hourStr, minute] = hourMin.split(":");

  let hour = parseInt(hourStr);
  const period = periodRaw.toUpperCase(); // AM / PM

  let label = "";

  if (period === "AM") {
    label = "সকাল";
  } else {
    // PM time
    if (hour === 12 || hour <= 3) {
      label = "দুপুর";
    } else if (hour >= 4 && hour <= 5) {
      label = "বিকাল";
    } else if (hour >= 6 && hour <= 7) {
      label = "সন্ধ্যা";
    } else {
      label = "রাত";
    }
  }

  return `${label} ${toBanglaNumber(hour)}:${toBanglaNumber(minute)}`;
}

function convertToBanglaTime(time) {
  const hour = parseInt(time.split(":")[0]);

  let period = "";
  let displayHour = hour;

  if (hour >= 4 && hour < 12) {
    period = "সকাল";
  } else if (hour >= 12 && hour < 16) {
    period = "দুপুর";
    displayHour = hour === 12 ? 12 : hour - 12;
  } else if (hour >= 16 && hour < 18) {
    period = "বিকাল";
    displayHour = hour - 12;
  } else {
    period = "রাত";
    displayHour = hour > 12 ? hour - 12 : hour;
  }

  return `${period} ${toBanglaNumber(displayHour)}.০০ টা`;
}

function toBanglaNumber(numStr) {
  const map = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return numStr.toString().replace(/[0-9]/g, (d) => map[d]);
}

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
        `https://shebasathi-backend.onrender.com/api/booked/${doctor._id}/${date}`,
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
      },
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl font-bold text-blue-700">{doctor.name}</h2>

      <p className="text-sm md:text-base">{doctor.department}</p>
      <p className="text-sm md:text-base">{doctor.hospital}</p>

      <p className="font-semibold text-green-600">
        💰 ফি: ৳ {toBanglaNumber(doctor.fee)} টাকা
      </p>

      <p className="text-sm">
        📅 ডাক্তার বসেন:{" "}
        {doctor.availableDays?.map((d) => dayMap[d]).join(", ")}
      </p>

      <p className="text-sm font-medium text-gray-700">
        ⏰ রোগী দেখার সময়:{" "}
        {doctor.startTime && doctor.endTime
          ? `${convertToBanglaTime(doctor.startTime)} - ${convertToBanglaTime(doctor.endTime)}`
          : "তথ্য নেই"}
      </p>

      {/* DATE */}
      <input
        type="date"
        className="border p-2 w-full rounded"
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* SLOT BUTTONS (🔥 NO DROPDOWN) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {allSlots.map((t) => {
          const disabled = !isValidDay(date) || slots.includes(t);

          return (
            <button
              key={t}
              disabled={disabled}
              onClick={() => setTime(t)}
              className={`
          px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200
          
          ${
            time === t
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
              : "bg-white border hover:border-blue-400 hover:bg-blue-50"
          }

          ${disabled && "opacity-30 cursor-not-allowed"}
        `}
            >
              {convertSlotToBangla(t)}
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
