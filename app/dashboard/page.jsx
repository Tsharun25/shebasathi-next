"use client";

import { useEffect, useState } from "react";

const API = "https://shebasathi-backend.onrender.com";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    if (u) {
      fetch(`${API}/api/my-bookings/${u.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, []);

  if (!user) return <p className="p-10">লগইন করা হয়নি</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        স্বাগতম {user.name}
      </h1>

      <h2 className="mt-6 text-xl font-semibold">আপনার বুকিংসমূহ</h2>

      <div className="mt-4 space-y-3">
        {bookings.map((b, i) => (
          <div key={i} className="p-4 bg-white shadow rounded">
            <p>👨‍⚕️ {b.doctorName}</p>
            <p>📅 {b.date}</p>
            <p>⏰ {b.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}