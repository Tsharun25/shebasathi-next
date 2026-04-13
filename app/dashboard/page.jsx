"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://shebasathi-backend.onrender.com/api/my-bookings/${user.email}`
    )
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [user]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">
        📋 আপনার বুকিং তালিকা
      </h1>

      {data.map((b, i) => (
        <div key={i} className="border p-4 mb-3 rounded-lg">
          <p>👨‍⚕️ {b.doctorName}</p>
          <p>📅 {b.date}</p>
          <p>⏰ {b.time}</p>
        </div>
      ))}
    </div>
  );
}