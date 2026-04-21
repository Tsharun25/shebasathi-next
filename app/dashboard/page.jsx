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
      }`
    )
      .then((res) => res.json())
      .then(setBookings);
  }, [user]);

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.type === filter);

  return (
    <div className="p-4">
      <h1 className="text-xl text-center mb-4">📋 আমার বুকিং</h1>

      {/* <div className="flex gap-2 justify-center mb-4">
        {["all", "doctor", "hotel", "transport"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div> */}

      <div className="flex justify-center gap-2 mb-5 flex-wrap">
  {["all", "doctor", "hotel", "transport"].map((f) => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`px-4 py-1 rounded-full text-sm font-medium transition
        ${
          filter === f
            ? "bg-blue-600 text-white shadow"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

      {filtered.map((b) => (
        <div key={b._id} className="border p-3 mb-3 rounded">

          {b.type === "doctor" && (
            <>
              <p>👨‍⚕️ {b.doctor}</p>
              <p>📅 {b.date}</p>
              <p>⏰ {b.time}</p>
            </>
          )}

          {b.type === "hotel" && (
            <>
              <p>🏨 {b.service}</p>
              <p>📅 {b.date}</p>
              <p>👥 {b.people} জন</p>
              <p>💰 ৳ {b.total}</p>
            </>
          )}

          {b.type === "transport" && (
            <>
              <p>🚗 যাতায়াত</p>
              <p>📍 {b.from} → {b.to}</p>
              <p>📅 {b.date}</p>
              <p>
                💰 {b.fare ? `৳ ${b.fare}` : "আলোচনা সাপেক্ষ"}
              </p>
            </>
          )}

        </div>
      ))}
    </div>
  );
}