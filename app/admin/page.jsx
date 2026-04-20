"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  // 🔥 Doctor Form
  const [doctor, setDoctor] = useState({
    name: "",
    specialist: "",
    hospital: "",
    fee: "",
    days: "",
    start: "",
    end: "",
  });

  // 🔥 Fare Form (Transport)
  const [fareForm, setFareForm] = useState({
    from: "",
    to: "",
    fare: "",
  });

  // ================= LOAD DATA =================
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`)
      .then((res) => res.json())
      .then(setUsers);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`)
      .then((res) => res.json())
      .then(setBookings);
  }, []);

  // ================= ADD DOCTOR =================
  const addDoctor = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-doctor`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...doctor,
          days: doctor.days.split(","),
          time: {
            start: doctor.start,
            end: doctor.end,
          },
        }),
      },
    );

    const data = await res.json();
    alert(data.message);
  };

  // ================= ADD FARE =================
  const addFare = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-fare`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fareForm),
      },
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">⚙️ Admin Panel</h1>

      {/* ================= USERS ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">👤 Users</h2>
        {users.map((u) => (
          <p key={u._id}>
            {u.name} ({u.phone || u.email})
          </p>
        ))}
      </div>

      {/* ================= BOOKINGS ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">📦 Bookings</h2>
        {bookings.map((b) => (
          <div key={b._id} className="border-b py-2">
            <p>📌 Type: {b.type}</p>
            <p>👤 User: {b.user}</p>

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
                <p>💰 ৳ {b.total}</p>
              </>
            )}

            {b.type === "transport" && (
              <>
                <p>
                  📍 {b.from} → {b.to}
                </p>
                <p>💰 ৳ {b.fare || "আলোচনা সাপেক্ষ"}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ================= ADD DOCTOR ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">👨‍⚕️ ডাক্তার যোগ করুন</h2>

        <input
          placeholder="নাম"
          className="input"
          onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
        />
        <input
          placeholder="বিভাগ"
          className="input"
          onChange={(e) => setDoctor({ ...doctor, specialist: e.target.value })}
        />
        <input
          placeholder="হাসপাতাল"
          className="input"
          onChange={(e) => setDoctor({ ...doctor, hospital: e.target.value })}
        />
        <input
          placeholder="ফি"
          className="input"
          onChange={(e) => setDoctor({ ...doctor, fee: e.target.value })}
        />
        <input
          placeholder="দিন (Sun,Tue)"
          className="input"
          onChange={(e) => setDoctor({ ...doctor, days: e.target.value })}
        />
        <input
          placeholder="শুরু সময় (10)"
          className="input"
          onChange={(e) => setDoctor({ ...doctor, start: e.target.value })}
        />
        <input
          placeholder="শেষ সময় (17)"
          className="input"
          onChange={(e) => setDoctor({ ...doctor, end: e.target.value })}
        />

        <button onClick={addDoctor} className="btn mt-2">
          Add Doctor
        </button>
      </div>

      {/* ================= ADD FARE ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">🚗 ভাড়া সেট করুন</h2>

        <input
          placeholder="From (Dhaka)"
          className="input"
          onChange={(e) => setFareForm({ ...fareForm, from: e.target.value })}
        />

        <input
          placeholder="To (Rangpur)"
          className="input"
          onChange={(e) => setFareForm({ ...fareForm, to: e.target.value })}
        />

        <input
          placeholder="Fare"
          type="number"
          className="input"
          onChange={(e) => setFareForm({ ...fareForm, fare: e.target.value })}
        />

        <button
          onClick={addFare}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          Save Fare
        </button>
      </div>
    </div>
  );
}
