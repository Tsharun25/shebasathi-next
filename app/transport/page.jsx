"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import BookingSuccessModal from "../../components/BookingSuccessModal";

export default function Transport() {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [successModal, setSuccessModal] = useState({
    open: false,
    bookingId: "",
    fare: null,
  });

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

  const openWhatsApp = () => {
    const message = `Assalamu Alaikum,

আমি সেবাসাথী থেকে যাতায়াত বুকিং করেছি।

Booking ID: ${successModal.bookingId || "N/A"}
নাম: ${user?.name || "User"}
মোবাইল/ইমেইল: ${user?.phone || user?.email || ""}
রুট: ${form.from} → ${form.to}
গাড়ি: ${form.vehicleType}
ধরন: ${form.acType}
তারিখ: ${form.date}
ভাড়া: ${
      successModal.fare ? `৳ ${successModal.fare}` : "আলোচনা সাপেক্ষ"
    }

অনুগ্রহ করে আমার বুকিংটি confirm করে জানাবেন।`;

    window.open(
      `https://wa.me/8801710071135?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleBooking = async () => {
    if (!user || !token) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (
      !form.from ||
      !form.to ||
      !form.date ||
      !form.vehicleType ||
      !form.acType
    ) {
      alert("সব তথ্য দিন");
      return;
    }

    if (form.date < today) {
      alert("Past date select করা যাবে না");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            from: form.from.trim(),
            to: form.to.trim(),
            date: form.date,
            vehicleType: form.vehicleType,
            acType: form.acType,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "বুকিং ব্যর্থ ❌");
        return;
      }

      setSuccessModal({
        open: true,
        bookingId: data.bookingId || "N/A",
        fare: data.fare || null,
      });
    } catch (err) {
      console.log("TRANSPORT BOOK ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BookingSuccessModal
        open={successModal.open}
        bookingId={successModal.bookingId}
        title="যাতায়াত বুকিং সফল হয়েছে"
        message="আপনার যাতায়াত booking request সফলভাবে জমা হয়েছে। Admin panel-এ booking চলে গেছে।"
        onWhatsApp={openWhatsApp}
        onDashboard={() => router.push("/dashboard")}
      />

      <div className="min-h-[calc(100vh-110px)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex justify-center items-start pt-8 md:pt-10 px-4 pb-28 md:pb-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              রোগী পরিবহন ও যাতায়াত সহায়তা
            </span>

            <h1 className="text-3xl font-extrabold text-green-700 mb-2">
              🚗 যাতায়াত বুকিং
            </h1>

            <p className="text-center text-gray-500 text-sm">
              গাড়ি / অ্যাম্বুলেন্স বুক করুন সহজে
            </p>
          </div>

          <div className="bg-white rounded-[28px] md:rounded-3xl shadow-xl p-5 md:p-6 space-y-4 border border-gray-100">
            <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-100">
              <div className="text-4xl mb-2">🚑</div>
              <h2 className="font-bold text-lg text-gray-800">
                যাতায়াত সহায়তা
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                রুট, গাড়ির ধরন ও তারিখ নির্বাচন করুন
              </p>
            </div>

            <input
              type="text"
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="📍 কোথায় থেকে"
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-green-300"
            />

            <input
              type="text"
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="📍 কোথায় যাবেন"
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-green-300"
            />

            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-green-300 bg-white"
            >
              <option value="">🚘 Car / Ambulance সিলেক্ট করুন</option>
              <option value="Car">Car</option>
              <option value="Ambulance">Ambulance</option>
            </select>

            <select
              name="acType"
              value={form.acType}
              onChange={handleChange}
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-green-300 bg-white"
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
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-green-300"
            />

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-sm text-blue-700 font-bold">
                ℹ️ ভাড়া সম্পর্কে
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                রুট অনুযায়ী ভাড়া admin confirm করে জানাবে। Fare list থাকলে
                booking-এর সাথে দেখাবে।
              </p>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3.5 rounded-2xl font-bold active:scale-[0.98] md:hover:scale-[1.01] transition disabled:opacity-60"
            >
              {loading ? "বুকিং হচ্ছে..." : "বুকিং কনফার্ম"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}