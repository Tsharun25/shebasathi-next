"use client";

export default function BookingSlipModal({
  open,
  onClose,
  booking,
  onWhatsApp,
}) {
  if (!open || !booking) return null;

  const serviceLabel =
    booking.type === "doctor"
      ? "ডাক্তার বুকিং"
      : booking.type === "hotel"
      ? "থাকার ব্যবস্থা"
      : booking.type === "transport"
      ? "যাতায়াত / পরিবহন"
      : "সেবা";

  return (
    <div className="fixed inset-0 z-[9999] bg-black/45 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-[30px] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-5 text-center">
          <h2 className="text-2xl font-extrabold">🧾 বুকিং স্লিপ</h2>
          <p className="text-white/90 text-sm mt-1">
            এই স্লিপটি WhatsApp-এ পাঠাতে পারবেন
          </p>
        </div>

        <div className="p-5">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center mb-4">
            <p className="text-xs text-gray-500 font-bold">Booking ID</p>
            <p className="text-2xl font-extrabold text-blue-700 mt-1">
              {booking.bookingId || "N/A"}
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
              {booking.status || "Pending"}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <Info label="সেবা" value={serviceLabel} />

            {booking.type === "doctor" && (
              <>
                <Info label="ডাক্তার" value={booking.doctor} />
                <Info label="তারিখ" value={booking.date} />
                <Info label="সময়" value={booking.time} />
              </>
            )}

            {booking.type === "hotel" && (
              <>
                <Info label="হোটেল / সেবা" value={booking.service} />
                <Info label="তারিখ" value={booking.date} />
                <Info label="মানুষ" value={`${booking.people || "N/A"} জন`} />
                <Info label="রুম" value={`${booking.rooms || "N/A"} টি`} />
                <Info label="দিন" value={`${booking.days || "N/A"} দিন`} />
                <Info
                  label="মোট"
                  value={`৳ ${booking.total || booking.price || "N/A"}`}
                />
              </>
            )}

            {booking.type === "transport" && (
              <>
                <Info label="কোথায় থেকে" value={booking.from} />
                <Info label="কোথায় যাবেন" value={booking.to} />
                <Info label="গাড়ি" value={booking.vehicleType || booking.vehicle} />
                <Info label="ধরন" value={booking.acType || booking.ac} />
                <Info
                  label="ভাড়া"
                  value={booking.fare ? `৳ ${booking.fare}` : "Admin জানাবে"}
                />
              </>
            )}

            {booking.adminNote && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-3 mt-3">
                <p className="text-xs font-bold text-green-700 mb-1">
                  Admin Note
                </p>
                <p className="text-gray-700">{booking.adminNote}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 mt-5">
            <button
              onClick={onWhatsApp}
              className="w-full bg-green-600 text-white py-3.5 rounded-2xl font-bold shadow hover:bg-green-700 active:scale-[0.98] transition"
            >
              💬 WhatsApp এ স্লিপ পাঠান
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(booking.bookingId || "");
                alert("Booking ID কপি হয়েছে ✅");
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold"
            >
              📋 Booking ID কপি করুন
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold"
            >
              বন্ধ করুন
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-3">
            দরকার হলে স্ক্রিনশট নিয়েও রাখতে পারেন
          </p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-3">
      <span className="text-gray-500 font-bold">{label}</span>
      <span className="text-gray-900 font-extrabold text-right">
        {value || "N/A"}
      </span>
    </div>
  );
}