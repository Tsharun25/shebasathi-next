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
  });

  const [fare, setFare] = useState(null);

  // 🔥 LIVE FARE PREVIEW
  const calculateFare = () => {
    let base = 200;
    if (form.from && form.to && form.from !== form.to) {
      base += 100;
    }
    setFare(base);
  };

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();

    alert(`বুকিং সফল ✅\nমোট ভাড়া: ৳ ${data.total}`);

    router.push("/dashboard");
  };

  return (
    <div className="p-5 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-bold text-center">
        🚗 যাতায়াত বুকিং
      </h1>

      <input
        placeholder="কোথা থেকে"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, from: e.target.value })
        }
      />

      <input
        placeholder="কোথায় যাবেন"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, to: e.target.value })
        }
      />

      <input
        type="date"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button
        onClick={calculateFare}
        className="bg-gray-200 w-full py-2 rounded"
      >
        ভাড়া দেখুন
      </button>

      {fare && (
        <div className="text-center text-lg font-bold text-green-600">
          💰 আনুমানিক ভাড়া: ৳ {fare}
        </div>
      )}

      <button
        onClick={handleBooking}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        বুকিং করুন
      </button>
    </div>
  );
}