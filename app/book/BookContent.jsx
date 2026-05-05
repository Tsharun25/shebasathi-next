"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import BookingSuccessModal from "../../components/BookingSuccessModal";

export default function BookContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, token } = useContext(AuthContext);

  const type = params.get("type");
  const doctor = params.get("doctor");
  const days = params.get("days")?.split(",").filter(Boolean) || [];
  const start = parseInt(params.get("start"));
  const end = parseInt(params.get("end"));

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [successModal, setSuccessModal] = useState({
    open: false,
    bookingId: "",
  });

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
    return `${h}টা`;
  };

  const buildAdminWhatsAppMessage = (bookingId) => {
    return `Assalamu Alaikum,

নতুন ডাক্তার বুকিং এসেছে।

Booking ID: ${bookingId || "N/A"}
নাম: ${user?.name || "User"}
মোবাইল/ইমেইল: ${user?.phone || user?.email || "N/A"}
সেবা: ডাক্তার বুকিং
Doctor: ${doctor || "N/A"}
Date: ${selectedDate || "N/A"}
Time: ${selectedTime || "N/A"}

অনুগ্রহ করে বুকিংটি confirm করুন।`;
  };

  const openWhatsApp = (bookingId = successModal.bookingId) => {
    const message = buildAdminWhatsAppMessage(bookingId);

    window.open(
      `https://wa.me/8801710071135?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleDoctorBooking = async () => {
    if (!user || !token) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("দিন, তারিখ ও সময় নির্বাচন করুন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Booking failed ❌");
        return;
      }

      const bookingId = data.bookingId || "N/A";

      setSuccessModal({
        open: true,
        bookingId,
      });


    } catch (err) {
      console.log("DOCTOR BOOK ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  if (type === "doctor") {
    const hasValidSchedule =
      days.length > 0 &&
      !Number.isNaN(start) &&
      !Number.isNaN(end) &&
      end >= start;

    return (
      <>
        <BookingSuccessModal
          open={successModal.open}
          bookingId={successModal.bookingId}
          title="ডাক্তার বুকিং সফল হয়েছে"
          message="আপনার ডাক্তার অ্যাপয়েন্টমেন্ট request সফলভাবে জমা হয়েছে। WhatsApp message ready করা হয়েছে।"
          onWhatsApp={() => openWhatsApp(successModal.bookingId)}
          onDashboard={() => router.push("/dashboard")}
        />

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 sm:px-5 py-7 md:py-10 pb-28 md:pb-10 flex justify-center items-start">
          <div className="w-full max-w-md bg-white rounded-[28px] md:rounded-3xl shadow-xl p-5 sm:p-6 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-4xl shadow-lg mb-4">
                👨‍⚕️
              </div>

              <h1 className="text-3xl font-extrabold text-blue-700">
                ডাক্তার বুকিং
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                দিন, তারিখ ও সময় নির্বাচন করুন
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 text-center mb-5 border border-blue-100">
              <p className="text-xs font-bold text-blue-600 mb-1">
                নির্বাচিত ডাক্তার
              </p>
              <h2 className="text-xl font-extrabold text-gray-900 leading-snug">
                {doctor || "Doctor"}
              </h2>
            </div>

            {!hasValidSchedule ? (
              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <h2 className="font-extrabold text-gray-900">
                  সময়সূচি পাওয়া যায়নি
                </h2>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  এই ডাক্তারের সময়সূচি এখনো ঠিকভাবে যুক্ত করা হয়নি। WhatsApp
                  অথবা call করে appointment confirm করুন।
                </p>

                <div className="grid grid-cols-1 gap-3 mt-5">
                  <a
                    href="tel:+8801710071135"
                    className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-bold text-center"
                  >
                    📞 Call করুন
                  </a>

                  <a
                    href="https://wa.me/8801710071135"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-3.5 rounded-2xl font-bold text-center"
                  >
                    💬 WhatsApp করুন
                  </a>
                </div>
              </div>
            ) : (
              <>
                <p className="font-bold mb-2 text-gray-800">
                  📆 দিন নির্বাচন করুন
                </p>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  {days.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedDay(d);
                        setSelectedDate("");
                        setSelectedTime("");
                      }}
                      className={`px-4 py-3 rounded-2xl border font-bold transition active:scale-[0.98] ${
                        selectedDay === d
                          ? "bg-blue-600 text-white border-blue-600 shadow"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      {dayMap[d] || d}
                    </button>
                  ))}
                </div>

                {selectedDay && (
                  <>
                    <p className="font-bold mb-2 text-gray-800">
                      📅 তারিখ নির্বাচন করুন
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-5 max-h-52 overflow-y-auto pr-1">
                      {getDates(selectedDay).map((d, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedDate(d);
                            setSelectedTime("");
                          }}
                          className={`px-3 py-3 rounded-2xl border text-sm font-bold transition active:scale-[0.98] ${
                            selectedDate === d
                              ? "bg-green-600 text-white border-green-600 shadow"
                              : "bg-white text-gray-700 border-gray-200"
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
                    <p className="font-bold mb-2 text-gray-800">
                      ⏰ সময় নির্বাচন করুন
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {Array.from(
                        { length: Math.max(0, end - start + 1) },
                        (_, i) => start + i
                      ).map((h, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTime(formatTime(h))}
                          className={`px-4 py-3 rounded-2xl border font-bold transition active:scale-[0.98] ${
                            selectedTime === formatTime(h)
                              ? "bg-purple-600 text-white border-purple-600 shadow"
                              : "bg-white text-gray-700 border-gray-200"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3.5 rounded-2xl font-bold active:scale-[0.98] md:hover:scale-[1.01] transition disabled:opacity-60"
                >
                  {loading ? "বুকিং হচ্ছে..." : "বুকিং কনফার্ম"}
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-[calc(100vh-110px)] p-10 text-center text-red-500">
      ⚠️ Invalid booking
    </div>
  );
}