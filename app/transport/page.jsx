"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Transport() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    vehicleType: "",
    acType: "",
  });

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!form.from || !form.to || !form.date || !form.vehicleType || !form.acType) {
      alert("সব তথ্য দিন");
      return;
    }

    if (form.date < today) {
      alert("Past date select করা যাবে না");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: form.from.trim(),
          to: form.to.trim(),
          date: form.date,
          vehicleType: form.vehicleType,
          acType: form.acType,
          user: user.phone || user.email,
          userName: user.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "বুকিং ব্যর্থ ❌");
        return;
      }

      alert(
        data.fare
          ? `বুকিং সফল ✅\nভাড়া: ৳ ${data.fare}`
          : "বুকিং সফল ✅\nভাড়া: আলোচনা সাপেক্ষ"
      );

      router.push("/dashboard");
    } catch (err) {
      console.log("TRANSPORT BOOK ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex justify-center items-start pt-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          🚗 যাতায়াত বুকিং
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
          <input
            type="text"
            name="from"
            value={form.from}
            onChange={handleChange}
            placeholder="📍 কোথায় থেকে"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
          />

          <input
            type="text"
            name="to"
            value={form.to}
            onChange={handleChange}
            placeholder="📍 কোথায় যাবেন"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
          />

          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300 bg-white"
          >
            <option value="">🚘 Car / Ambulance সিলেক্ট করুন</option>
            <option value="Car">Car</option>
            <option value="Ambulance">Ambulance</option>
          </select>

          <select
            name="acType"
            value={form.acType}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300 bg-white"
          >
            <option value="">❄️ AC / Non AC সিলেক্ট করুন</option>
            <option value="AC">AC</option>
            <option value="Non AC">Non AC</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            min={today}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
          />

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
          >
            {loading ? "বুকিং হচ্ছে..." : "বুকিং কনফার্ম"}
          </button>
        </div>
      </div>
    </div>
  );
}