"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const timeSlots = [
  "সকাল ১০টা - ১২টা",
  "দুপুর ১২টা - ৩টা",
  "বিকাল ৩টা - ৬টা",
  "সন্ধ্যা ৬টা - ৮টা",
];

export default function BookInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",") || [];

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctor,
        date: selectedDay,
        time: selectedTime,
        user: user.phone || user.email,
      }),
    });

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">📅 বুকিং</h1>

      <p>ডাক্তার: {doctor}</p>

      <div className="flex gap-2 mt-3">
        {days.map((d, i) => (
          <button key={i} onClick={() => setSelectedDay(d)}>
            {d}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        {timeSlots.map((t, i) => (
          <button key={i} onClick={() => setSelectedTime(t)}>
            {t}
          </button>
        ))}
      </div>

      <button onClick={handleBooking} className="mt-4 bg-blue-500 text-white px-4 py-2">
        Confirm
      </button>
    </div>
  );
}