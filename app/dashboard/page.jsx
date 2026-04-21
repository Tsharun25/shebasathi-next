"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings/${
        user.phone || user.email
      }`,
    )
      .then((res) => res.json())
      .then(setBookings);
  }, [user]);

  // 🔥 Cancel booking
  const handleCancel = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cancel-booking/${id}`, {
      method: "DELETE",
    });

    setBookings(bookings.filter((b) => b._id !== id));
  };

  // 🔥 Filter
  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
        📋 আমার বুকিং
      </h1>

      {/* 🔥 FILTER */}
      <div className="flex justify-center gap-2 mb-5 flex-wrap">
        {["all", "doctor", "hotel", "transport"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {f === "all"
              ? "সব"
              : f === "doctor"
                ? "ডাক্তার"
                : f === "hotel"
                  ? "হোটেল"
                  : "যাতায়াত"}
          </button>
        ))}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500">কোনো বুকিং নেই</p>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-xl p-4 shadow-md transform transition duration-300 hover:scale-105"
          >
            {/* STATUS */}
            <div className="flex justify-between mb-2">
              <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
                ✅ Confirmed
              </span>

              <button
                onClick={() => handleCancel(b._id)}
                className="text-red-500 text-sm"
              >
                বাতিল
              </button>
            </div>

            {/* TYPE */}
            {b.type === "doctor" && (
              <>
                <h2 className="font-bold text-blue-700">👨‍⚕️ {b.doctor}</h2>
                <p>📅 {b.date}</p>
                <p>⏰ {b.time}</p>
              </>
            )}

            {b.type === "transport" && (
              <>
                <p>
                  📍 {b.from} → {b.to}
                </p>
                <p>📅 {b.date}</p>

                <p>
                  💰 {b.fare ? `৳ ${b.fare}` : "আলোচনা সাপেক্ষ"}
                </p>
              </>
            )}

            {b.type === "hotel" && (
              <>
                <h2 className="font-bold text-green-700">🏨 {b.service}</h2>
                <p>📅 {b.date}</p>
                <p>👥 {b.people} জন</p>
                <p>🛏️ {b.days} দিন</p>
                <p className="font-bold text-green-600">💰 ৳ {b.total}</p>
              </>
            )}

            {b.type === "transport" && (
              <>
                <h2 className="font-bold text-yellow-700">🚗 যাতায়াত</h2>
                <p>
                  📍 {b.from} → {b.to}
                </p>
                <p>📅 {b.date}</p>
                <p className="font-bold text-yellow-600">💰 ৳ {b.total}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
