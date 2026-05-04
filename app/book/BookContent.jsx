"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function BookContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const type = params.get("type");

  // ================= DOCTOR =================
  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",") || [];
  const start = parseInt(params.get("start"));
  const end = parseInt(params.get("end"));

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const dayMap = {
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
    Sat: "শনিবার",
  };

  const getDates = (day) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const dayName = d.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (dayName === day) {
        dates.push(d.toISOString().split("T")[0]);
      }
    }

    return dates;
  };

  const formatTime = (h) => {
    if (h >= 9 && h <= 11) return `সকাল ${h}টা`;
    if (h >= 12 && h <= 14) return `দুপুর ${h === 12 ? 12 : h - 12}টা`;
    if (h >= 15 && h <= 17) return `বিকাল ${h - 12}টা`;
    if (h >= 18 && h <= 19) return `সন্ধ্যা ${h - 12}টা`;
    if (h >= 20) return `রাত ${h - 12}টা`;
    return `${h}`;
  };

  const openWhatsApp = (bookingId) => {
    const message = `Assalamu Alaikum,

আমি সেবাসাথী থেকে বুকিং করেছি।

Booking ID: ${bookingId}
নাম: ${user?.name || "User"}
মোবাইল: ${user?.phone || user?.email || ""}

Doctor: ${doctor}
Date: ${selectedDate}
Time: ${selectedTime}

অনুগ্রহ করে confirm করুন।`;

    window.open(
      `https://wa.me/8801710071135?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleDoctorBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("সব নির্বাচন করুন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctor,
            date: selectedDate,
            time: selectedTime,
            user: user.phone || user.email,
            userName: user.name,
            type: "doctor",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Booking failed ❌");
        return;
      }

      const bookingId = data.bookingId || "N/A";

      const confirmWhatsApp = confirm(
        `বুকিং সফল ✅

Booking ID: ${bookingId}

WhatsApp এ booking details পাঠাতে চান?`
      );

      if (confirmWhatsApp) {
        openWhatsApp(bookingId);
      }

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  if (type === "doctor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 flex justify-center items-start pt-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            👨‍⚕️ ডাক্তার বুকিং
          </h1>

          <div className="bg-blue-50 rounded-2xl p-4 text-center mb-5">
            <h2 className="text-xl font-bold">{doctor}</h2>
            <p className="text-gray-500 text-sm mt-1">
              দিন, তারিখ ও সময় নির্বাচন করুন
            </p>
          </div>

          <p className="font-bold mb-2">📆 দিন নির্বাচন করুন</p>

          <div className="flex gap-2 flex-wrap mb-5">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedDay(d);
                  setSelectedDate("");
                  setSelectedTime("");
                }}
                className={`px-4 py-2 rounded-xl border font-semibold transition ${
                  selectedDay === d
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {dayMap[d]}
              </button>
            ))}
          </div>

          {selectedDay && (
            <>
              <p className="font-bold mb-2">📅 তারিখ নির্বাচন করুন</p>

              <div className="flex gap-2 flex-wrap mb-5">
                {getDates(selectedDay).map((d, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDate(d);
                      setSelectedTime("");
                    }}
                    className={`px-3 py-2 rounded-xl border text-sm transition ${
                      selectedDate === d
                        ? "bg-green-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedDate && (
            <>
              <p className="font-bold mb-2">⏰ সময় নির্বাচন করুন</p>

              <div className="flex gap-2 flex-wrap mb-6">
                {Array.from(
                  { length: end - start + 1 },
                  (_, i) => start + i
                ).map((h, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(formatTime(h))}
                    className={`px-4 py-2 rounded-xl border transition ${
                      selectedTime === formatTime(h)
                        ? "bg-purple-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {formatTime(h)}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            onClick={handleDoctorBooking}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold"
          >
            {loading ? "বুকিং হচ্ছে..." : "বুকিং কনফার্ম"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 text-center text-red-500">
      ⚠️ Invalid booking
    </div>
  );
}