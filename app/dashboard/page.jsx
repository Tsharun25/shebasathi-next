"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings/${user.phone || user.email}`,
    )
      .then((res) => res.json())
      .then(setBookings);
  }, [user]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">📋 আমার বুকিং</h1>

      {bookings.map((b, i) => (
        <div key={i} className="bg-white shadow p-4 mb-3 rounded-xl">
          {b.type === "doctor" && (
            <>
              <p>👨‍⚕️ ডাক্তার: {b.doctor}</p>
              <p>📅 তারিখ: {b.date}</p>
              <p>⏰ সময়: {b.time}</p>
            </>
          )}

          {b.type === "transport" && (
            <div className="bg-white p-4 rounded-xl shadow mb-3">
              <h2 className="font-bold text-blue-700">🚗 যাতায়াত</h2>

              <p>
                📍 {b.from} → {b.to}
              </p>
              <p>📅 {b.date}</p>

              <p className="font-bold text-lg">💰 ভাড়া: ৳ {b.total}</p>
            </div>
          )}

          {b.type === "hotel" && (
            <div className="bg-white p-4 rounded-xl shadow mb-3">
              <h2 className="font-bold text-green-700">🏨 {b.service}</h2>

              <p>📅 {b.date}</p>
              <p>👥 {b.people} জন</p>
              <p>🛏️ {b.days} দিন</p>

              <p className="font-bold text-lg">💰 মোট: ৳ {b.total}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
