"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";

export default function TransportBooking() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [fareList, setFareList] = useState([]);
  const [selectedFare, setSelectedFare] = useState(null);

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    vehicle: "Car",
    ac: "Non-AC",
  });

  // ================= LOAD FARES =================
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/fares`)
      .then((res) => res.json())
      .then((data) => setFareList(data));
  }, []);

  // ================= SELECT ROUTE =================
  const handleRouteChange = (value) => {
    const [from, to] = value.split("-");

    setForm({ ...form, from, to });

    const match = fareList.find(
      (f) =>
        (f.from === from && f.to === to) || (f.from === to && f.to === from),
    );

    setSelectedFare(match ? match.fare : null);
  };

  // ================= BOOK =================
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
          ...form,
          user: user.phone || user.email,
        }),
      },
    );

    const data = await res.json();

    alert(
      data.fare
        ? `বুকিং সফল ✅\nভাড়া: ৳ ${data.fare}`
        : "বুকিং সফল ✅\nভাড়া: আলোচনা সাপেক্ষ",
    );

    router.push("/dashboard");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-bold text-center">🚗 যাতায়াত বুকিং</h1>

      {/* ROUTE SELECT */}
      <select
        className="border p-2 w-full rounded"
        onChange={(e) => handleRouteChange(e.target.value)}
      >
        <option value="">📍 রুট নির্বাচন করুন</option>
        {fareList.map((f, i) => (
          <option key={i} value={`${f.from}-${f.to}`}>
            {f.from} → {f.to}
          </option>
        ))}
      </select>

      {/* OR MANUAL INPUT */}
      <input
        placeholder="📍 কোথা থেকে"
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, from: e.target.value })}
      />

      <input
        placeholder="📍 কোথায় যাবেন"
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, to: e.target.value })}
      />

      {/* DATE */}
      <input
        type="date"
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />


      <select
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
      >
        <option>Car</option>
        <option>Ambulance</option>
      </select>

      <select
        className="border p-2 w-full rounded"
        onChange={(e) => setForm({ ...form, ac: e.target.value })}
      >
        <option>Non-AC</option>
        <option>AC</option>
      </select>

      {/* BUTTON */}
      <button
        onClick={handleBooking}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        বুকিং কনফার্ম
      </button>
    </div>
  );
}
