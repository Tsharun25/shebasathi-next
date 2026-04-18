"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  // 🔐 Protect admin
  useEffect(() => {
    if (!user) router.push("/login");
    else if (user.role !== "admin") router.push("/");
  }, [user]);

  // 🔥 Load data
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`)
      .then(res => res.json())
      .then(setUsers);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`)
      .then(res => res.json())
      .then(setBookings);
  }, []);

  // ❌ delete booking
  const deleteBooking = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-booking/${id}`, {
      method: "DELETE",
    });

    setBookings(bookings.filter(b => b._id !== id));
  };

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">⚙️ Admin Dashboard</h1>

      {/* USERS */}
      <div className="mb-6">
        <h2 className="font-bold text-blue-600 mb-2">
          👤 Users ({users.length})
        </h2>

        {users.map((u) => (
          <div key={u._id} className="border p-2 mb-1 rounded">
            {u.name} - {u.phone}
          </div>
        ))}
      </div>

      {/* BOOKINGS */}
      <div>
        <h2 className="font-bold text-green-600 mb-2">
          📦 Bookings ({bookings.length})
        </h2>

        {bookings.map((b) => (
          <div key={b._id} className="border p-3 mb-2 rounded">
            <p>👤 {b.user}</p>

            {b.type === "doctor" && <p>👨‍⚕️ {b.doctor}</p>}
            {b.type === "hotel" && <p>🏨 {b.service}</p>}
            {b.type === "transport" && (
              <p>🚗 {b.from} → {b.to}</p>
            )}

            <button
              onClick={() => deleteBooking(b._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}