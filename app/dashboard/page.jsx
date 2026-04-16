"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://shebasathi-backend.onrender.com/api/my-bookings/${
        user.phone || user.email
      }`
    )
      .then((res) => res.json())
      .then(setBookings)
      .catch(() => alert("Booking load error"));
  }, [user]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        📋 আমার বুকিং
      </h1>

      {bookings.length === 0 && (
        <p className="text-center">কোনো বুকিং পাওয়া যায়নি</p>
      )}

      {bookings.map((b, i) => (
        <div
          key={i}
          className="bg-white shadow p-3 mb-3 rounded-lg"
        >
          <p>👨‍⚕️ {b.doctor || b.service || "Service"}</p>
          <p>📅 {b.date || b.from}</p>
          <p>⏰ {b.time || b.to}</p>
          <p className="text-sm text-gray-500">Type: {b.type}</p>
        </div>
      ))}
    </div>
  );
}