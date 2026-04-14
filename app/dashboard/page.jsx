"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [doctor, setDoctor] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://shebasathi-backend.onrender.com/api/my-bookings/${
        user.phone || user.email
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data.doctor || []);
        setService(data.service || []);
      });
  }, [user]);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-5 text-center">
        📊 আমার বুকিংসমূহ
      </h1>

      {/* 👨‍⚕️ Doctor */}
      <h2 className="font-bold mt-5 mb-2">👨‍⚕️ ডাক্তার বুকিং</h2>
      {doctor.length === 0 ? (
        <p>কোনো ডাক্তার বুকিং নেই</p>
      ) : (
        doctor.map((b, i) => (
          <div key={i} className="bg-white p-3 mb-2 rounded shadow">
            <p>{b.doctor}</p>
            <p>{b.date}</p>
            <p>{b.time}</p>
          </div>
        ))
      )}

      {/* 🚑🏨 Service */}
      <h2 className="font-bold mt-5 mb-2">🚑 / 🏨 অন্যান্য সেবা</h2>
      {service.length === 0 ? (
        <p>কোনো সার্ভিস বুকিং নেই</p>
      ) : (
        service.map((s, i) => (
          <div key={i} className="bg-white p-3 mb-2 rounded shadow">
            <p>{s.service}</p>
            <p>{s.type}</p>
          </div>
        ))
      )}
    </div>
  );
}