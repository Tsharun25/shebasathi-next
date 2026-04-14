"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://shebasathi-backend.onrender.com/api/admin/stats")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-5 rounded">Users: {data.users}</div>
        <div className="bg-green-100 p-5 rounded">Doctors: {data.doctors}</div>
        <div className="bg-yellow-100 p-5 rounded">Bookings: {data.bookings}</div>
      </div>
    </div>
  );
}