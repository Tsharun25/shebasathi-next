"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    fetch(
      `https://shebasathi-backend.onrender.com/api/my-bookings/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [user]);

  if (!user) return null;

  return (
    <div className="p-5 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
          স্বাগতম, {user.name}
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          লগ আউট
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        আপনার বুকিং সমূহ
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">কোনো বুকিং নেই</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {bookings.map((b, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow"
            >
              <h3 className="font-bold text-lg">
                {b.doctorName}
              </h3>

              <p>📅 তারিখ: {b.date}</p>
              <p>⏰ সময়: {b.time}</p>

              <p className="text-green-600 font-semibold">
                ✔ নিশ্চিত
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}