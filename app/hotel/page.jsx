"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import BookingSuccessModal from "../../components/BookingSuccessModal";

export default function Hotel() {
  const [list, setList] = useState([]);
  const [forms, setForms] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const [successModal, setSuccessModal] = useState({
    open: false,
    bookingId: "",
    hotel: null,
    form: null,
    total: 0,
  });

  const { user, token } = useContext(AuthContext);
  const router = useRouter();

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel`)
      .then((res) => res.json())
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => setList([]));
  }, []);

  const updateForm = (index, field, value) => {
    setForms((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const openWhatsApp = () => {
    const hotel = successModal.hotel || {};
    const form = successModal.form || {};

    const message = `Assalamu Alaikum,

আমি সেবাসাথী থেকে থাকার ব্যবস্থা বুকিং করেছি।

Booking ID: ${successModal.bookingId || "N/A"}
নাম: ${user?.name || "User"}
মোবাইল/ইমেইল: ${user?.phone || user?.email || ""}
হোটেল/সেবা: ${hotel.name || "N/A"}
লোকেশন: ${hotel.location || "N/A"}
তারিখ: ${form.date || "N/A"}
দিন: ${form.days || "N/A"}
মানুষ: ${form.people || "N/A"} জন
রুম: ${form.rooms || "N/A"} টি
সম্ভাব্য মোট: ৳ ${successModal.total || 0}

অনুগ্রহ করে আমার বুকিংটি confirm করে জানাবেন।`;

    window.open(
      `https://wa.me/8801710071135?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleBook = async (h, index) => {
    const form = forms[index] || {};

    if (!user || !token) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!form.date || !form.days || !form.people || !form.rooms) {
      alert("সব তথ্য দিন");
      return;
    }

    if (form.date < today) {
      alert("Past date select করা যাবে না");
      return;
    }

    try {
      setLoadingId(index);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hotel-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service: h.name,
            date: form.date,
            days: Number(form.days),
            people: Number(form.people),
            rooms: Number(form.rooms),
            price: h.price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "বুকিং ব্যর্থ ❌");
        return;
      }

      const total =
        data.total ||
        Number(h.price || 0) *
          Number(form.days || 0) *
          Number(form.rooms || 0);

      setSuccessModal({
        open: true,
        bookingId: data.bookingId || "N/A",
        hotel: h,
        form,
        total,
      });
    } catch (err) {
      console.log("HOTEL BOOK ERROR:", err);
      alert("Server error ❌");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <BookingSuccessModal
        open={successModal.open}
        bookingId={successModal.bookingId}
        title="থাকার ব্যবস্থা বুকিং সফল হয়েছে"
        message="আপনার থাকার ব্যবস্থা booking request সফলভাবে জমা হয়েছে। Admin panel-এ booking চলে গেছে।"
        onWhatsApp={openWhatsApp}
        onDashboard={() => router.push("/dashboard")}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8 md:px-8 pb-28 md:pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              রোগী ও স্বজনদের জন্য নিরাপদ থাকার ব্যবস্থা
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold text-green-700">
              🏨 থাকার ব্যবস্থা
            </h1>

            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              আপনার বাজেট ও প্রয়োজন অনুযায়ী হোটেল / থাকার ব্যবস্থা বুক করুন।
            </p>
          </div>

          {list.length === 0 && (
            <div className="bg-white rounded-3xl shadow p-8 text-center text-gray-500">
              কোনো হোটেল পাওয়া যায়নি
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((h, i) => {
              const form = forms[i] || {};
              const total =
                Number(h.price || 0) *
                Number(form.days || 0) *
                Number(form.rooms || 0);

              return (
                <div
                  key={h._id || i}
                  className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition border border-gray-100 overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600" />

                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                      <div>
                        <div className="text-5xl mb-3">🏨</div>

                        <h2 className="text-2xl font-extrabold text-gray-900">
                          {h.name}
                        </h2>

                        <p className="text-gray-500 mt-1">📍 {h.location}</p>
                      </div>

                      <div className="bg-green-50 text-green-700 px-4 py-3 rounded-2xl text-center">
                        <p className="text-sm font-medium">প্রতি রুম / দিন</p>
                        <p className="text-xl font-extrabold">৳ {h.price}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="date"
                        min={today}
                        value={form.date || ""}
                        onChange={(e) => updateForm(i, "date", e.target.value)}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
                      />

                      <input
                        type="number"
                        min="1"
                        value={form.days || ""}
                        placeholder="কয়দিন থাকবেন"
                        onChange={(e) => updateForm(i, "days", e.target.value)}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
                      />

                      <input
                        type="number"
                        min="1"
                        value={form.people || ""}
                        placeholder="কয়জন থাকবেন"
                        onChange={(e) =>
                          updateForm(i, "people", e.target.value)
                        }
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
                      />

                      <input
                        type="number"
                        min="1"
                        value={form.rooms || ""}
                        placeholder="কয়টা রুম লাগবে"
                        onChange={(e) => updateForm(i, "rooms", e.target.value)}
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-300"
                      />
                    </div>

                    <div className="mt-5 bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                      <span className="text-gray-600 font-medium">
                        সম্ভাব্য মোট
                      </span>

                      <span className="text-2xl font-extrabold text-green-700">
                        ৳ {total || 0}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBook(h, i)}
                      disabled={loadingId === i}
                      className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-2xl font-bold hover:scale-[1.01] transition disabled:opacity-60"
                    >
                      {loadingId === i ? "বুকিং হচ্ছে..." : "বুক করুন →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}