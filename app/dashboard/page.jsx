"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings/${
        user.phone || user.email
      }`
    )
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [user]);

  const getTypeBangla = (type) => {
    if (type === "doctor") return "ডাক্তার";
    if (type === "hotel") return "হোটেল";
    if (type === "transport") return "যাতায়াত";
    return type;
  };

  const getVehicleType = (booking) => {
    return booking.vehicleType || booking.vehicle || "N/A";
  };

  const getAcType = (booking) => {
    return booking.acType || booking.ac || "N/A";
  };

  const getStatus = (booking) => {
    return booking.status || "Pending";
  };

  const getStatusClass = (status) => {
    const classes = {
      Pending: "bg-yellow-100 text-yellow-700",
      Confirmed: "bg-green-100 text-green-700",
      Processing: "bg-blue-100 text-blue-700",
      Completed: "bg-purple-100 text-purple-700",
      Cancelled: "bg-red-100 text-red-700",
    };

    return classes[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusBangla = (status) => {
    if (status === "Pending") return "অপেক্ষমান";
    if (status === "Confirmed") return "কনফার্মড";
    if (status === "Processing") return "প্রসেসিং";
    if (status === "Completed") return "সম্পন্ন";
    if (status === "Cancelled") return "বাতিল";
    return status;
  };

  const makeWhatsAppLink = (booking) => {
    const status = getStatus(booking);

    let message = `Assalamu Alaikum,\n\nআমি সেবাসাথী থেকে আমার বুকিং সম্পর্কে জানতে চাই।\n\n`;
    message += `Booking ID: ${booking.bookingId || "N/A"}\n`;
    message += `নাম: ${user?.name || "User"}\n`;
    message += `মোবাইল/ইমেইল: ${user?.phone || user?.email || ""}\n`;
    message += `সেবা: ${getTypeBangla(booking.type)}\n`;
    message += `Status: ${status}\n`;

    if (booking.type === "doctor") {
      message += `Doctor: ${booking.doctor || "N/A"}\n`;
      message += `Date: ${booking.date || "N/A"}\n`;
      message += `Time: ${booking.time || "N/A"}\n`;
    }

    if (booking.type === "hotel") {
      message += `Hotel: ${booking.service || "N/A"}\n`;
      message += `Date: ${booking.date || "N/A"}\n`;
      message += `People: ${booking.people || "N/A"} জন\n`;
      message += `Total: ৳ ${booking.total || 0}\n`;
    }

    if (booking.type === "transport") {
      message += `Route: ${booking.from || ""} → ${booking.to || ""}\n`;
      message += `Vehicle: ${getVehicleType(booking)}\n`;
      message += `Type: ${getAcType(booking)}\n`;
      message += `Fare: ${
        booking.fare ? `৳ ${booking.fare}` : "আলোচনা সাপেক্ষ"
      }\n`;
    }

    if (booking.adminNote) {
      message += `Admin Note: ${booking.adminNote}\n`;
    }

    return `https://wa.me/8801710071135?text=${encodeURIComponent(message)}`;
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.type === filter);

  const downloadPDF = async (booking) => {
    const { jsPDF } = await import("jspdf");

    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1450;
    const ctx = canvas.getContext("2d");

    const bg = ctx.createLinearGradient(0, 0, 1000, 1450);
    bg.addColorStop(0, "#eff6ff");
    bg.addColorStop(0.5, "#ffffff");
    bg.addColorStop(1, "#ecfdf5");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1000, 1450);

    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 10;
    roundRect(ctx, 80, 80, 840, 1220, 35, true, false);
    ctx.shadowColor = "transparent";

    const header = ctx.createLinearGradient(80, 80, 920, 220);
    header.addColorStop(0, "#2563eb");
    header.addColorStop(1, "#16a34a");
    ctx.fillStyle = header;
    roundRect(ctx, 80, 80, 840, 180, 35, true, false);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 52px Arial, sans-serif";
    ctx.fillText("সেবাসাথী", 500, 155);

    ctx.font = "24px Arial, sans-serif";
    ctx.fillText("Booking Confirmation", 500, 205);

    const status = getStatus(booking);

    ctx.fillStyle = "#dcfce7";
    roundRect(ctx, 360, 285, 280, 48, 24, true, false);
    ctx.fillStyle = "#15803d";
    ctx.font = "bold 22px Arial, sans-serif";
    ctx.fillText(`✓ ${status}`, 500, 317);

    ctx.textAlign = "left";

    let y = 390;

    const title = (text) => {
      ctx.fillStyle = "#1e40af";
      ctx.font = "bold 30px Arial, sans-serif";
      ctx.fillText(text, 130, y);
      y += 45;
    };

    const line = (label, value) => {
      ctx.fillStyle = "#374151";
      ctx.font = "bold 24px Arial, sans-serif";
      ctx.fillText(label, 130, y);

      ctx.fillStyle = "#111827";
      ctx.font = "24px Arial, sans-serif";
      ctx.fillText(String(value || "N/A"), 360, y);
      y += 48;
    };

    const multiline = (label, value) => {
      ctx.fillStyle = "#374151";
      ctx.font = "bold 24px Arial, sans-serif";
      ctx.fillText(label, 130, y);

      ctx.fillStyle = "#111827";
      ctx.font = "22px Arial, sans-serif";

      const text = String(value || "N/A");
      const words = text.split(" ");
      let lineText = "";
      const x = 360;
      const maxWidth = 440;

      for (let i = 0; i < words.length; i++) {
        const testLine = lineText + words[i] + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(lineText, x, y);
          lineText = words[i] + " ";
          y += 34;
        } else {
          lineText = testLine;
        }
      }

      ctx.fillText(lineText, x, y);
      y += 48;
    };

    title("👤 User Information");
    line("নাম:", user?.name || "User");
    line("মোবাইল/ইমেইল:", user?.phone || user?.email || "");

    y += 20;
    title("📋 Booking Details");
    line("Booking ID:", booking.bookingId || "N/A");
    line("সেবা:", getTypeBangla(booking.type));
    line("স্ট্যাটাস:", getStatusBangla(status));

    if (booking.type === "doctor") {
      line("ডাক্তার:", booking.doctor);
      line("তারিখ:", booking.date);
      line("সময়:", booking.time);
    }

    if (booking.type === "hotel") {
      line("হোটেল/সেবা:", booking.service);
      line("তারিখ:", booking.date);
      line("দিন:", booking.days);
      line("মানুষ:", `${booking.people || ""} জন`);
      line("মোট:", `৳ ${booking.total || 0}`);
    }

    if (booking.type === "transport") {
      line("রুট:", `${booking.from || ""} → ${booking.to || ""}`);
      line("গাড়ি:", getVehicleType(booking));
      line("ধরন:", getAcType(booking));
      line("তারিখ:", booking.date || "N/A");
      line("ভাড়া:", booking.fare ? `৳ ${booking.fare}` : "আলোচনা সাপেক্ষ");
    }

    if (booking.adminNote) {
      y += 15;
      title("📝 Admin Note");
      multiline("নোট:", booking.adminNote);
    }

    ctx.fillStyle = "#f0fdf4";
    roundRect(ctx, 130, 1145, 740, 95, 22, true, false);

    ctx.fillStyle = "#166534";
    ctx.textAlign = "center";
    ctx.font = "bold 24px Arial, sans-serif";
    ctx.fillText("প্রয়োজনে যোগাযোগ করুন: 01710071135", 500, 1185);

    ctx.font = "18px Arial, sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("Thank you for using ShebaSathi", 500, 1223);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save(
      `shebasathi-booking-${booking.bookingId || booking._id || Date.now()}.pdf`
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h1 className="text-xl font-bold text-red-500 mb-2">
            লগইন প্রয়োজন
          </h1>
          <p className="text-gray-600">বুকিং দেখতে আগে লগইন করুন।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow p-5 md:p-7 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700">
            📋 আমার বুকিং
          </h1>
          <p className="text-center text-gray-500 mt-2">
            আপনার সকল বুকিং ডিটেইলস ও আপডেট এখানে দেখতে পারবেন
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">
                {bookings.length}
              </p>
              <p className="text-sm text-gray-600">মোট বুকিং</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-green-700">
                {bookings.filter((b) => b.type === "doctor").length}
              </p>
              <p className="text-sm text-gray-600">ডাক্তার</p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-700">
                {bookings.filter((b) => b.type === "hotel").length}
              </p>
              <p className="text-sm text-gray-600">হোটেল</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-700">
                {bookings.filter((b) => b.type === "transport").length}
              </p>
              <p className="text-sm text-gray-600">যাতায়াত</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {["all", "doctor", "hotel", "transport"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {f === "all"
                ? "সব"
                : f === "doctor"
                  ? "ডাক্তার"
                  : f === "hotel"
                    ? "হোটেল"
                    : "যাতায়াত"}
            </button>
          ))}
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            Loading bookings...
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              কোনো বুকিং পাওয়া যায়নি
            </h2>
            <p className="text-gray-500">আপনার বুকিং করলে এখানে দেখাবে।</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {!loading &&
            filtered.map((b) => {
              const status = getStatus(b);

              return (
                <div
                  key={b._id}
                  className="bg-white rounded-3xl shadow hover:shadow-lg transition p-5 border border-gray-100 flex flex-col min-h-[380px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                      {getTypeBangla(b.type)}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                        status
                      )}`}
                    >
                      {getStatusBangla(status)}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-700 flex-1">
                    <p className="text-sm font-bold text-blue-700 bg-blue-50 rounded-xl px-3 py-2 inline-block">
                      🧾 Booking ID: {b.bookingId || "N/A"}
                    </p>

                    {b.type === "doctor" && (
                      <>
                        <p className="text-lg font-bold text-gray-900">
                          👨‍⚕️ {b.doctor}
                        </p>
                        <p>📅 তারিখ: {b.date}</p>
                        <p>⏰ সময়: {b.time}</p>
                      </>
                    )}

                    {b.type === "hotel" && (
                      <>
                        <p className="text-lg font-bold text-gray-900">
                          🏨 {b.service}
                        </p>
                        <p>📅 তারিখ: {b.date}</p>
                        <p>👥 মানুষ: {b.people} জন</p>
                        <p>🛏️ দিন: {b.days}</p>
                        <p className="font-bold text-green-700">
                          💰 মোট: ৳ {b.total}
                        </p>
                      </>
                    )}

                    {b.type === "transport" && (
                      <>
                        <p className="text-lg font-bold text-gray-900">
                          🚗 যাতায়াত
                        </p>
                        <p>
                          📍 রুট: {b.from} → {b.to}
                        </p>
                        <p>🚘 গাড়ি: {getVehicleType(b)}</p>
                        <p>❄️ ধরন: {getAcType(b)}</p>
                        <p>📅 তারিখ: {b.date || "N/A"}</p>
                        <p className="font-bold text-green-700">
                          💰 ভাড়া:{" "}
                          {b.fare ? `৳ ${b.fare}` : "আলোচনা সাপেক্ষ"}
                        </p>
                      </>
                    )}

                    {b.adminNote && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-2xl p-3">
                        <p className="font-bold text-yellow-700 mb-1">
                          📝 Admin Note
                        </p>
                        <p className="text-sm text-gray-700">{b.adminNote}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
                    <button
                      onClick={() => downloadPDF(b)}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2.5 rounded-xl font-bold hover:scale-[1.01] transition"
                    >
                      📄 PDF Download
                    </button>

                    <a
                      href={makeWhatsAppLink(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold hover:bg-green-700 transition text-center"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}