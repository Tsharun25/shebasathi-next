"use client";

import { useContext, useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { AuthContext } from "../../context/AuthContext";
import BookingSlipModal from "../../components/BookingSlipModal";

export default function Dashboard() {
  const router = useRouter();
  const { user, token, authLoading, logout } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoadingId, setPdfLoadingId] = useState(null);
  const [slipBooking, setSlipBooking] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const getTypeLabel = (type) => {
    if (type === "doctor") return "ডাক্তার বুকিং";
    if (type === "hotel") return "থাকার ব্যবস্থা";
    if (type === "transport") return "যাতায়াত / পরিবহন";
    return "সেবা";
  };

  const loadBookings = useCallback(
    async (silent = false) => {
      if (!token) return;

      try {
        if (!silent) setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            logout();
            router.push("/login");
          }
          setBookings([]);
          return;
        }

        setBookings(Array.isArray(data) ? data : []);
        setLastUpdated(new Date());
      } catch (err) {
        console.log("DASHBOARD LOAD ERROR:", err);
        if (!silent) setBookings([]);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [token, logout, router]
  );

  useEffect(() => {
    if (authLoading) return;

    if (!user || !token) {
      router.push("/login");
      return;
    }

    loadBookings();

    const interval = setInterval(() => {
      loadBookings(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [authLoading, user, token, router, loadBookings]);

  const getStatusStyle = (status) => {
    if (status === "Confirmed") return "bg-green-100 text-green-700";
    if (status === "Completed") return "bg-blue-100 text-blue-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const openWhatsApp = (booking) => {
    if (!booking) return;

    const msg = `Assalamu Alaikum,

আমি সেবাসাথী থেকে বুকিং করেছি।

Booking ID: ${booking.bookingId || "N/A"}
Service: ${getTypeLabel(booking.type)}
Status: ${booking.status || "Pending"}
Date: ${booking.date || "N/A"}

অনুগ্রহ করে আমার বুকিংটি confirm করে জানাবেন।`;

    window.open(
      `https://wa.me/8801710071135?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const downloadBookingPdf = async (booking) => {
    try {
      setPdfLoadingId(booking._id);

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFillColor(239, 246, 255);
      pdf.rect(0, 0, pageWidth, 297, "F");

      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(16, 14, pageWidth - 32, 268, 8, 8, "F");

      pdf.setFillColor(37, 99, 235);
      pdf.roundedRect(22, 20, pageWidth - 44, 38, 6, 6, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(25);
      pdf.text("ShebaSathi", pageWidth / 2, 35, { align: "center" });

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        "Trusted Medical & Support Coordination Service",
        pageWidth / 2,
        44,
        { align: "center" }
      );

      pdf.setTextColor(15, 23, 42);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(19);
      pdf.text("Booking Confirmation Copy", pageWidth / 2, 73, {
        align: "center",
      });

      pdf.setTextColor(100, 116, 139);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("Please keep this copy for your reference.", pageWidth / 2, 81, {
        align: "center",
      });

      pdf.setFillColor(219, 234, 254);
      pdf.roundedRect(34, 91, pageWidth - 68, 28, 6, 6, "F");

      pdf.setTextColor(30, 64, 175);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("BOOKING ID", pageWidth / 2, 101, { align: "center" });

      pdf.setFontSize(21);
      pdf.text(booking.bookingId || "N/A", pageWidth / 2, 113, {
        align: "center",
      });

      const status = booking.status || "Pending";
      pdf.setFillColor(254, 249, 195);
      pdf.roundedRect(pageWidth / 2 - 23, 124, 46, 10, 5, 5, "F");
      pdf.setTextColor(161, 98, 7);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text(status.toUpperCase(), pageWidth / 2, 131, { align: "center" });

      const rows = [
        ["Booking ID", booking.bookingId || "N/A"],
        ["Customer", user?.name || booking.userName || "User"],
        ["Contact", user?.phone || user?.email || booking.user || "N/A"],
        [
          "Service",
          booking.type === "doctor"
            ? "Doctor Appointment"
            : booking.type === "hotel"
            ? "Accommodation Support"
            : booking.type === "transport"
            ? "Transport Support"
            : "Service",
        ],
        ["Status", booking.status || "Pending"],
      ];

      if (booking.type === "doctor") {
        rows.push(["Doctor", booking.doctor || "N/A"]);
        rows.push(["Date", booking.date || "N/A"]);
        rows.push(["Time", booking.time || "N/A"]);
      }

      if (booking.type === "hotel") {
        rows.push(["Hotel / Service", booking.service || "N/A"]);
        rows.push(["Date", booking.date || "N/A"]);
        rows.push(["People", booking.people || "N/A"]);
        rows.push(["Rooms", booking.rooms || "N/A"]);
        rows.push(["Days", booking.days || "N/A"]);
        rows.push(["Total", `BDT ${booking.total || booking.price || 0}`]);
      }

      if (booking.type === "transport") {
        rows.push(["From", booking.from || "N/A"]);
        rows.push(["To", booking.to || "N/A"]);
        rows.push(["Vehicle", booking.vehicleType || booking.vehicle || "N/A"]);
        rows.push(["AC Type", booking.acType || booking.ac || "N/A"]);
        rows.push([
          "Fare",
          booking.fare ? `BDT ${booking.fare}` : "Will be confirmed by admin",
        ]);
      }

      pdf.setTextColor(15, 23, 42);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text("Booking Details", 26, 150);

      let y = 162;

      rows.forEach(([label, value], index) => {
        pdf.setFillColor(
          index % 2 === 0 ? 248 : 241,
          index % 2 === 0 ? 250 : 245,
          index % 2 === 0 ? 252 : 249
        );
        pdf.roundedRect(26, y - 8, pageWidth - 52, 12, 3, 3, "F");

        pdf.setTextColor(71, 85, 105);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9.5);
        pdf.text(String(label), 31, y);

        pdf.setTextColor(15, 23, 42);
        pdf.setFont("helvetica", "normal");
        pdf.text(String(value || "N/A"), pageWidth - 31, y, {
          align: "right",
        });

        y += 14;
      });

      pdf.setFillColor(236, 253, 245);
      pdf.roundedRect(26, 230, pageWidth - 52, 28, 5, 5, "F");

      pdf.setTextColor(22, 101, 52);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text("Need help or confirmation?", pageWidth / 2, 241, {
        align: "center",
      });

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("Call / WhatsApp: +8801710071135", pageWidth / 2, 250, {
        align: "center",
      });

      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(8.5);
      pdf.text(
        "This is a system-generated booking copy from ShebaSathi.",
        pageWidth / 2,
        275,
        { align: "center" }
      );

      pdf.save(`ShebaSathi-Booking-${booking.bookingId || "copy"}.pdf`);
    } catch (err) {
      console.log("PDF ERROR:", err);
      alert("বুকিং কপি তৈরি করা যায়নি ❌");
    } finally {
      setPdfLoadingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-4xl mb-3">⏳</div>
          <p className="font-bold text-gray-700">ড্যাশবোর্ড লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8 md:px-8 pb-28 md:pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[30px] shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-blue-600 font-bold mb-2">আমার ড্যাশবোর্ড</p>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                  স্বাগতম, {user?.name || "User"} 👋
                </h1>
                <p className="text-gray-500 mt-3">
                  আপনার সব বুকিং request এখানে দেখতে পারবেন।
                </p>

                {lastUpdated && (
                  <p className="text-xs text-green-600 mt-2 font-semibold">
                    🔄 সর্বশেষ আপডেট:{" "}
                    {lastUpdated.toLocaleTimeString("bn-BD")}
                  </p>
                )}
              </div>

              <button
                onClick={() => router.push("/services")}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold shadow active:scale-[0.98] md:hover:scale-[1.02] transition"
              >
                নতুন সেবা নিন
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8">
            <Stat
              title="মোট বুকিং"
              value={bookings.length}
              color="text-blue-700"
            />
            <Stat
              title="Pending"
              value={bookings.filter((b) => b.status === "Pending").length}
              color="text-yellow-600"
            />
            <Stat
              title="Confirmed"
              value={bookings.filter((b) => b.status === "Confirmed").length}
              color="text-green-600"
            />
          </div>

          <div className="bg-white rounded-[30px] shadow-xl border border-gray-100 p-5 md:p-7">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              📋 আমার বুকিংসমূহ
            </h2>

            {bookings.length === 0 ? (
              <div className="text-center py-14">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-800">
                  এখনো কোনো বুকিং নেই
                </h3>
                <p className="text-gray-500 mt-2">
                  ডাক্তার, পরিবহন বা থাকার সেবা নিতে নতুন বুকিং করুন।
                </p>

                <button
                  onClick={() => router.push("/services")}
                  className="mt-6 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                >
                  সেবা দেখুন
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                            {getTypeLabel(booking.type)}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                              booking.status
                            )}`}
                          >
                            {booking.status || "Pending"}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-gray-900">
                          Booking ID: {booking.bookingId || "N/A"}
                        </h3>

                        <div className="mt-3 space-y-1 text-gray-600">
                          {booking.type === "doctor" && (
                            <>
                              <p>
                                👨‍⚕️ ডাক্তার:{" "}
                                <span className="font-bold">
                                  {booking.doctor || "N/A"}
                                </span>
                              </p>
                              <p>📅 তারিখ: {booking.date || "N/A"}</p>
                              <p>⏰ সময়: {booking.time || "N/A"}</p>
                            </>
                          )}

                          {booking.type === "hotel" && (
                            <>
                              <p>
                                🏨 সেবা:{" "}
                                <span className="font-bold">
                                  {booking.service || "N/A"}
                                </span>
                              </p>
                              <p>📅 তারিখ: {booking.date || "N/A"}</p>
                              <p>👥 মানুষ: {booking.people || "N/A"}</p>
                              <p>🚪 রুম: {booking.rooms || "N/A"}</p>
                              <p>🌙 দিন: {booking.days || "N/A"}</p>
                              <p>
                                ৳ মোট: {booking.total || booking.price || "N/A"}
                              </p>
                            </>
                          )}

                          {booking.type === "transport" && (
                            <>
                              <p>🚗 From: {booking.from || "N/A"}</p>
                              <p>📍 To: {booking.to || "N/A"}</p>
                              <p>
                                🚘 গাড়ি:{" "}
                                {booking.vehicleType ||
                                  booking.vehicle ||
                                  "N/A"}
                              </p>
                              <p>
                                ❄️ ধরন: {booking.acType || booking.ac || "N/A"}
                              </p>
                              <p>
                                ৳ ভাড়া:{" "}
                                {booking.fare ? booking.fare : "Admin জানাবে"}
                              </p>
                            </>
                          )}

                          {booking.adminNote && (
                            <p className="mt-3 bg-white rounded-2xl p-3 border text-gray-700">
                              📝 Admin Note: {booking.adminNote}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 md:w-52">
                        <button
                          onClick={() => setSlipBooking(booking)}
                          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-center hover:from-indigo-700 hover:to-blue-700 transition shadow"
                        >
                          🧾 বুকিং স্লিপ দেখুন
                        </button>

                        <button
                          onClick={() => openWhatsApp(booking)}
                          className="px-5 py-3 rounded-2xl bg-green-500 text-white font-bold text-center hover:bg-green-600 transition shadow"
                        >
                          💬 WhatsApp করুন
                        </button>

                        <button
                          onClick={() => downloadBookingPdf(booking)}
                          disabled={pdfLoadingId === booking._id}
                          className="hidden md:block text-xs text-gray-500 hover:text-blue-600 text-center font-semibold mt-1"
                        >
                          {pdfLoadingId === booking._id
                            ? "কপি তৈরি হচ্ছে..."
                            : "PDF কপি নিন"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingSlipModal
        open={!!slipBooking}
        booking={slipBooking}
        onClose={() => setSlipBooking(null)}
        onWhatsApp={() => openWhatsApp(slipBooking)}
      />
    </>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="bg-white rounded-3xl shadow p-4 md:p-6 border border-gray-100 text-center">
      <p className="text-gray-500 font-semibold text-xs md:text-base">
        {title}
      </p>
      <h2 className={`text-3xl md:text-4xl font-extrabold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}