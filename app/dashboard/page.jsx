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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        📋 আমার বুকিং
      </h1>

      {bookings.length === 0 && (
        <p>কোনো বুকিং পাওয়া যায়নি</p>
      )}

      {bookings.map((b, i) => (
        <div key={i} className="border p-3 mb-2 rounded">
          <p>👨‍⚕️ {b.doctor}</p>
          <p>📅 {b.date}</p>
          <p>⏰ {b.time}</p>
        </div>
      ))}
    </div>
  );
}