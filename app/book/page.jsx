"use client";

export const dynamic = "force-dynamic";

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
  };

  const getDayShort = (d) => {
    return new Date(d).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

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

      {date && !days.includes(getDayShort(date)) && (
        <p className="text-red-500 mb-3">
          ❌ এই দিনে ডাক্তার বসেন না
        </p>
      )}

      <select
        className="w-full border p-2 mb-3"
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">সময় নির্বাচন করুন</option>
        <option>10:00 AM</option>
        <option>12:00 PM</option>
        <option>3:00 PM</option>
      </select>

      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        বুকিং কনফার্ম
      </button>
    </div>
  );
}