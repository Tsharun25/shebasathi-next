"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function DoctorSlotUI({ params }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const days = params.get("days")?.split(",") || [];
  const start = parseInt(params.get("start"));
  const end = parseInt(params.get("end"));
  const doctor = params.get("doctor");

  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const dayMap = {
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
    Sat: "শনিবার",
  };

  // বাংলা সময়
  const formatTime = (t) => {
    if (t >= 9 && t <= 11) return `সকাল ${t}টা`;
    if (t >= 12 && t <= 14) return `দুপুর ${t === 12 ? 12 : t - 12}টা`;
    if (t >= 15 && t <= 17) return `বিকাল ${t - 12}টা`;
    if (t >= 18 && t <= 19) return `সন্ধ্যা ${t - 12}টা`;
    if (t >= 20) return `রাত ${t - 12}টা`;
    return `${t}:00`;
  };

  const getDates = (d) => {
    const list = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const dt = new Date();
      dt.setDate(today.getDate() + i);

      const dn = dt.toLocaleDateString("en-US", { weekday: "short" });

      if (dn === d) list.push(dt.toISOString().split("T")[0]);
    }

    return list;
  };

  // const getTimes = () => {
  //   const arr = [];
  //   for (let i = start; i <= end; i++) arr.push(i);
  //   return arr;
  // };

  const getBanglaTimeSlots = (start, end) => {
  const slots = [];

  for (let i = Number(start); i <= Number(end); i++) {
    let label = "";

    if (i >= 9 && i <= 11)
      label = `সকাল ${i}টা`;
    else if (i >= 12 && i <= 14)
      label = `দুপুর ${i === 12 ? 12 : i - 12}টা`;
    else if (i >= 15 && i <= 17)
      label = `বিকাল ${i - 12}টা`;
    else if (i >= 18 && i <= 19)
      label = `সন্ধ্যা ${i - 12}টা`;
    else if (i >= 20)
      label = `রাত ${i - 12}টা`;

    slots.push(label);
  }

  return slots;
};

  const handleConfirm = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!date || !time) return alert("সব নির্বাচন করুন");

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor,
          date,
          time: formatTime(time),
          user: user.phone || user.email,
          type: "doctor",
        }),
      }
    );

    alert("ডাক্তার বুকিং সফল ✅");
    router.push("/dashboard");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">👨‍⚕️ {doctor}</h1>

      {/* DAY */}
      <div>
        <p>📆 দিন নির্বাচন করুন:</p>
        <div className="flex gap-2 flex-wrap">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => {
                setDay(d);
                setDate("");
                setTime("");
              }}
              className={`px-3 py-1 rounded ${
                day === d ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {dayMap[d]}
            </button>
          ))}
        </div>
      </div>

      {/* DATE */}
      {day && (
        <div>
          <p>📅 তারিখ নির্বাচন করুন:</p>
          <div className="flex gap-2 flex-wrap">
            {getDates(day).map((dt) => (
              <button
                key={dt}
                onClick={() => {
                  setDate(dt);
                  setTime("");
                }}
                className={`px-3 py-1 rounded ${
                  date === dt ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                {dt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TIME */}
      {date && (
        <div>
          <p>⏰ সময় নির্বাচন করুন:</p>
          <div className="flex gap-2 flex-wrap">
            {getTimes().map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`px-3 py-1 rounded ${
                  time === t ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                {formatTime(t)}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleConfirm}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        বুকিং কনফার্ম
      </button>
    </div>
  );
}