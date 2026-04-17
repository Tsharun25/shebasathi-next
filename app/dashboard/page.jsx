"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings/${
        user.phone || user.email
      }`
    )
      .then((res) => res.json())
      .then(setBookings);
  }, [user]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-5 text-center">
        📋 আমার বুকিং
      </h1>

      {bookings.length === 0 && (
        <p className="text-center">কোনো বুকিং পাওয়া যায়নি</p>
      )}

      <div className="grid gap-4">
        {bookings.map((b, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-md border"
          >
            <p className="font-bold text-lg text-blue-700 mb-2">
              {b.type === "doctor" && "👨‍⚕️ Doctor"}
              {b.type === "transport" && "🚗 Transport"}
              {b.type === "hotel" && "🏨 Hotel"}
            </p>

            {b.doctor && <p>👨‍⚕️ {b.doctor}</p>}
            {b.service && <p>🏨 {b.service}</p>}
            {b.from && <p>📍 From: {b.from}</p>}
            {b.to && <p>📍 To: {b.to}</p>}

            {b.date && <p>📅 {b.date}</p>}
            {b.time && <p>⏰ {b.time}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}