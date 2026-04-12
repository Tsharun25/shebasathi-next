"use client";

import { useState } from "react";

const API = "https://shebasathi-backend.onrender.com";

export default function DoctorCard({ doctor }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const book = async () => {
    if (!user) {
      alert("আগে লগইন করুন ❌");
      return;
    }

    if (!date || !time) {
      alert("তারিখ ও সময় দিন");
      return;
    }

    const res = await fetch(`${API}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user.email,
        doctorName: doctor.name,
        date,
        time,
      }),
    });

    const data = await res.json();
    alert(data.message);
    setOpen(false);
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="relative p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl hover:scale-105 transition cursor-pointer"
      >
        {/* Avatar */}
        <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold mb-3">
          {doctor.name[0]}
        </div>

        <h2 className="text-lg font-bold">{doctor.name}</h2>
        <p className="text-sm text-gray-600">{doctor.department}</p>
        <p className="text-sm">{doctor.hospital}</p>

        <p className="mt-2 font-semibold text-blue-600">
          ৳ {doctor.fee}
        </p>

        <div className="mt-3 text-sm text-green-600">
          Click to Book →
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96 space-y-3">
            <h2 className="text-xl font-bold">{doctor.name}</h2>

            <input
              type="date"
              className="border p-2 w-full"
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className="border p-2 w-full"
              onChange={(e) => setTime(e.target.value)}
            />

            <button
              onClick={book}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setOpen(false)}
              className="text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}