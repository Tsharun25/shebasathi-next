"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function TransportBooking() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    distance: 0,
    fare: 0,
  });

  // 🔥 Fake distance calculation (later Google Map)
  const calculateDistance = () => {
    if (!form.from || !form.to) return;

    // 🔥 Demo distance (random for now)
    const distance = Math.floor(Math.random() * 20) + 5; // 5-25 km
    const farePerKm = 30;

    const totalFare = distance * farePerKm;

    setForm({
      ...form,
      distance,
      fare: totalFare,
    });
  };

  // 🔥 Booking
  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!form.from || !form.to || !form.date) {
      alert("সব তথ্য দিন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "transport",
          from: form.from,
          to: form.to,
          date: form.date,
          distance: form.distance,
          fare: form.fare,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-5 space-y-4">

      <h1 className="text-xl font-bold text-center text-green-600">
        🚗 যাতায়াত বুকিং
      </h1>

      {/* FROM */}
      <input
        placeholder="📍 কোথা থেকে"
        className="w-full border p-2 rounded"
        value={form.from}
        onChange={(e) =>
          setForm({ ...form, from: e.target.value })
        }
      />

      {/* TO */}
      <input
        placeholder="📍 কোথায় যাবেন"
        className="w-full border p-2 rounded"
        value={form.to}
        onChange={(e) =>
          setForm({ ...form, to: e.target.value })
        }
      />

      {/* DATE */}
      <input
        type="date"
        className="w-full border p-2 rounded"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      {/* CALCULATE */}
      <button
        onClick={calculateDistance}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        ভাড়া হিসাব করুন
      </button>

      {/* RESULT */}
      {form.distance > 0 && (
        <div className="bg-gray-100 p-3 rounded space-y-1 text-sm">
          <p>📏 দূরত্ব: {form.distance} কিমি</p>
          <p>💰 ভাড়া: ৳ {form.fare}</p>
        </div>
      )}

      {/* BOOK */}
      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        কনফার্ম বুকিং
      </button>
    </div>
  );
}