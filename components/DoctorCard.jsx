"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DoctorCard({ doctor }) {
  const { user } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);

  // load booked slots
  useEffect(() => {
    if (date) {
      fetch(`https://shebasathi-backend.onrender.com/api/booked/${doctor._id}/${date}`)
        .then(res => res.json())
        .then(data => setSlots(data));
    }
  }, [date]);

  const book = async () => {
    if (!user) return alert("আগে লগইন করুন");

    const day = new Date(date).toLocaleString("en-US", { weekday: "long" });

    if (!doctor.availableDays.includes(day)) {
      return alert("এই দিনে ডাক্তার বসেন না");
    }

    const res = await fetch("https://shebasathi-backend.onrender.com/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user.email,
        doctorId: doctor._id,
        doctorName: doctor.name,
        date,
        time,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-2">
      <h2 className="font-bold text-lg">{doctor.name}</h2>
      <p>{doctor.department}</p>
      <p>{doctor.hospital}</p>
      <p>💰 ৳ {doctor.fee}</p>

      <p>📅 ডাক্তার বসেন: {doctor.availableDays.join(", ")}</p>
      <p>⏰ সময়: {doctor.startTime} - {doctor.endTime}</p>

      <input
        type="date"
        className="border p-2 w-full"
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        onChange={(e) => setTime(e.target.value)}
      >
        <option>সময় নির্বাচন</option>

        {["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"].map((t) => (
          <option key={t} disabled={slots.includes(t)}>
            {t} {slots.includes(t) ? "❌" : ""}
          </option>
        ))}
      </select>

      <button
        onClick={book}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        বুক করুন
      </button>
    </div>
  );
}