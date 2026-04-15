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
      .then(setBookings);
  }, [user]);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">📊 আমার বুকিং</h1>

      {bookings.length === 0 ? (
        <p>কোনো বুকিং নেই</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="border p-3 mb-2">
            <p>ডাক্তার: {b.doctor}</p>
            <p>তারিখ: {b.date}</p>
            <p>সময়: {b.time}</p>
          </div>
        ))
      )}
    </div>
  );
}