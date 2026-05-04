"use client";

export default function BookingSuccessModal({
  open,
  bookingId,
  title = "বুকিং সফল হয়েছে",
  message = "আপনার বুকিংটি সফলভাবে জমা হয়েছে।",
  onDashboard,
  onWhatsApp,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 text-center border border-gray-100">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-5xl mb-4">
          ✅
        </div>

        <h2 className="text-2xl font-extrabold text-green-700 mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-4">{message}</p>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-5">
          <p className="text-sm text-gray-500 font-medium">Booking ID</p>
          <p className="text-xl font-extrabold text-blue-700 mt-1">
            {bookingId || "N/A"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={onWhatsApp}
            className="w-full bg-green-600 text-white py-3 rounded-2xl font-bold hover:bg-green-700 transition"
          >
            💬 WhatsApp এ confirm করুন
          </button>

          <button
            onClick={onDashboard}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition"
          >
            📋 Dashboard এ যান
          </button>
        </div>
      </div>
    </div>
  );
}