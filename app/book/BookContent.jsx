"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function BookContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const type = params.get("type");

  // doctor params
  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",") || [];
  const start = params.get("start");
  const end = params.get("end");

  // hotel params
  const service = params.get("service");
  const price = params.get("price");

  // form states
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [form, setForm] = useState({
    date: "",
    days: "",
    people: "",
    from: "",
    to: "",
  });

  // 🔥 Day Map
  const dayMap = {
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
    Sat: "শনিবার",
  };

  // 🔥 Generate next dates for selected day
  const getDates = (day) => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      if (
        d.getDay() ===
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day)
      ) {
        result.push(d.toISOString().split("T")[0]);
      }
    }

    return result;
  };

  // 🔥 Bangla time slot
  const getTimeSlots = () => {
    const slots = [];

    for (let i = Number(start); i <= Number(end); i++) {
      let label = "";

      if (i >= 9 && i <= 11) label = `সকাল ${i}টা`;
      else if (i >= 12 && i <= 14) label = `দুপুর ${i === 12 ? 12 : i - 12}টা`;
      else if (i >= 15 && i <= 17) label = `বিকাল ${i - 12}টা`;
      else if (i >= 18 && i <= 19) label = `সন্ধ্যা ${i - 12}টা`;
      else if (i >= 20) label = `রাত ${i - 12}টা`;

      slots.push(label);
    }

    return slots;
  };

  // ================= DOCTOR BOOK =================
  const bookDoctor = async () => {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctor,
        date: selectedDate,
        time: selectedTime,
        user: user.phone || user.email,
        type: "doctor",
      }),
    });

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  // ================= HOTEL BOOK =================
  const bookHotel = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!form.date || !form.days || !form.people) {
      alert("সব তথ্য দিন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel-book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          date: form.date,
          days: Number(form.days),
          people: Number(form.people),
          price,
          user: user.phone || user.email,
        }),
      },
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  // ================= TRANSPORT BOOK =================
  const bookTransport = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!form.from || !form.to || !form.date) {
      alert("সব তথ্য দিন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          user: user.phone || user.email,
          type: "transport",
        }),
      },
    );

    const data = await res.json();

    alert(
      data.fare
        ? `বুকিং সফল ✅\nভাড়া: ৳ ${data.fare}`
        : "বুকিং সফল ✅\nভাড়া: আলোচনা সাপেক্ষ",
    );

    router.push("/dashboard");
  };

  // ================= UI =================

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      {/* DOCTOR */}
      {type === "doctor" && (
        <>
          <h1 className="text-xl font-bold">👨‍⚕️ ডাক্তার বুকিং</h1>

          {/* Day */}
          <p>📆 দিন নির্বাচন করুন:</p>
          <div className="flex gap-2 flex-wrap">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDay(d);
                  setSelectedDate("");
                  setSelectedTime("");
                }}
                className={`px-3 py-1 rounded border
      ${selectedDay === d ? "bg-blue-600 text-white" : "bg-blue-100"}
    `}
              >
                {dayMap[d]}
              </button>
            ))}
          </div>

          {/* Date */}
          {selectedDay && (
            <>
              <p>📅 তারিখ:</p>
              <div className="flex gap-2 flex-wrap">
                {getDates(selectedDay).map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime("");
                    }}
                    className={`px-2 py-1 rounded border
      ${selectedDate === date ? "bg-green-600 text-white" : "bg-green-100"}
    `}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Time */}
          {selectedDate && (
            <>
              <p>⏰ সময়:</p>
              <div className="flex gap-2 flex-wrap">
                {getTimeSlots().map((t, i) => (
  <button
    key={i}
    onClick={() => setSelectedTime(t)}
    className={`px-2 py-1 rounded border
      ${selectedTime === t ? "bg-yellow-500 text-white" : "bg-yellow-100"}
    `}
  >
    {t}
  </button>
))}
              </div>
            </>
          )}

          <button
            onClick={bookDoctor}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            বুকিং কনফার্ম
          </button>
        </>
      )}

      {/* HOTEL */}
      {type === "hotel" && (
        <>
          <h1 className="text-xl font-bold">🏨 হোটেল বুকিং</h1>

          <input
            type="date"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            placeholder="কয়দিন থাকবেন"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, days: e.target.value })}
          />

          <input
            placeholder="কয়জন থাকবেন"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, people: e.target.value })}
          />

          <button
            onClick={bookHotel}
            className="bg-green-600 text-white w-full py-2 rounded"
          >
            বুকিং কনফার্ম
          </button>
        </>
      )}

      {/* TRANSPORT */}
      {type === "transport" && (
        <>
          <h1 className="text-xl font-bold">🚗 যাতায়াত বুকিং</h1>

          <input
            placeholder="কোথা থেকে"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, from: e.target.value })}
          />

          <input
            placeholder="কোথায় যাবেন"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, to: e.target.value })}
          />

          <input
            type="date"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <button
            onClick={bookTransport}
            className="bg-yellow-600 text-white w-full py-2 rounded"
          >
            বুকিং কনফার্ম
          </button>
        </>
      )}
    </div>
  );
}
