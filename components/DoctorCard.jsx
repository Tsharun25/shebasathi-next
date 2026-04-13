"use client";

import { useState } from "react";

export default function DoctorCard({ doctor }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const book = async () => {
    if (!date || !time) {
      alert("তারিখ ও সময় দিন");
      return;
    }

    if (date < today) {
      alert("আগের তারিখ দেওয়া যাবে না");
      return;
    }

    alert(`Appointment Booked ✅\n${date} - ${time}`);
    setOpen(false);
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition">

        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl">
            ডা
          </div>

          <div>
            <h2 className="text-lg font-bold">{doctor.name}</h2>
            <p className="text-sm text-gray-600">{doctor.department}</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p>🏥 {doctor.hospital}</p>
          <p>💰 ফি: ৳ {doctor.fee}</p>
          <p>📅 Available: Sun - Thu</p>
          <p>⏰ 4PM - 9PM</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 rounded-lg"
        >
          Appointment নিন
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
            <h2 className="text-lg font-bold mb-3">{doctor.name}</h2>

            <input
              type="date"
              min={today}
              className="border p-2 w-full mb-2"
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              className="border p-2 w-full mb-3"
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">সময় নির্বাচন করুন</option>
              <option>4:00 PM</option>
              <option>5:00 PM</option>
              <option>6:00 PM</option>
              <option>7:00 PM</option>
            </select>

            <button
              onClick={book}
              className="bg-green-600 text-white px-4 py-2 w-full rounded"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setOpen(false)}
              className="mt-2 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}