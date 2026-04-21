
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor,
          date: selectedDate,
          time: selectedTime,
          user: user.phone || user.email,
          type: "doctor",
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
    router.push("/dashboard");
  };

  // ================= TRANSPORT =================
  const [tForm, setTForm] = useState({
    from: "",
    to: "",
    date: "",
  });

  const handleTransport = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!tForm.from || !tForm.to || !tForm.date) {
      alert("সব তথ্য দিন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tForm,
          user: user.phone || user.email,
          type: "transport",
        }),
      }
    );

    const data = await res.json();

    alert(
      data.fare
        ? `বুকিং সফল ✅\nভাড়া: ৳ ${data.fare}`
        : "বুকিং সফল ✅\nভাড়া: আলোচনা সাপেক্ষ"
    );

    router.push("/dashboard");
  };

  // ================= HOTEL =================
  const service = params.get("service");
  const price = params.get("price");

  const [hForm, setHForm] = useState({
    date: "",
    days: "",
    people: "",
  });

  const handleHotel = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!hForm.date || !hForm.days) {
      alert("সব তথ্য দিন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel-book`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          date: hForm.date,
          days: Number(hForm.days),
          people: Number(hForm.people || 1),
          price: Number(price),
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();

    alert(data.message);
    router.push("/dashboard");
  };

  // ================= UI =================

  // 🔵 DOCTOR UI
  if (type === "doctor") {
    return (
      <div className="p-4 max-w-md mx-auto space-y-3">
        <h1 className="text-xl font-bold text-center">👨‍⚕️ ডাক্তার বুকিং</h1>

        <p>📆 দিন নির্বাচন করুন:</p>
        <div className="flex gap-2 flex-wrap">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedDay(d);
                setSelectedDate("");
              }}
              className={`px-3 py-1 border rounded ${
                selectedDay === d ? "bg-blue-600 text-white" : ""
              }`}
            >
              {dayMap[d]}
            </button>
          ))}
        </div>

        {selectedDay && (
          <>
            <p>📅 তারিখ:</p>
            <div className="flex gap-2 flex-wrap">
              {getDates(selectedDay).map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`px-2 py-1 border rounded ${
                    selectedDate === d ? "bg-green-500 text-white" : ""
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
            <p>⏰ সময়:</p>
            <div className="flex gap-2 flex-wrap">
              {Array.from(
                { length: end - start + 1 },
                (_, i) => start + i
              ).map((h, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(formatTime(h))}
                  className={`px-3 py-1 border rounded ${
                    selectedTime === formatTime(h)
                      ? "bg-purple-500 text-white"
                      : ""
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
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          বুকিং কনফার্ম
        </button>
      </div>
    );
  }

  // 🟡 TRANSPORT UI
  if (type === "transport") {
    return (
      <div className="p-4 max-w-md mx-auto space-y-3">
        <h1 className="text-xl font-bold text-center">🚗 যাতায়াত বুকিং</h1>

        <input
          placeholder="📍 কোথা থেকে"
          className="border p-2 w-full"
          onChange={(e) =>
            setTForm({ ...tForm, from: e.target.value })
          }
        />

        <input
          placeholder="📍 কোথায় যাবেন"
          className="border p-2 w-full"
          onChange={(e) =>
            setTForm({ ...tForm, to: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          onChange={(e) =>
            setTForm({ ...tForm, date: e.target.value })
          }
        />

        <button
          onClick={handleTransport}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          বুকিং কনফার্ম
        </button>
      </div>
    );
  }

  // 🟢 HOTEL UI
  if (type === "hotel") {
    return (
      <div className="p-4 max-w-md mx-auto space-y-3">
        <h1 className="text-xl font-bold text-center">🏨 হোটেল বুকিং</h1>

        <p>{service}</p>

        <input
          type="date"
          className="border p-2 w-full"
          onChange={(e) =>
            setHForm({ ...hForm, date: e.target.value })
          }
        />

        <input
          placeholder="কয়দিন"
          className="border p-2 w-full"
          onChange={(e) =>
            setHForm({ ...hForm, days: e.target.value })
          }
        />

        <input
          placeholder="কয়জন"
          className="border p-2 w-full"
          onChange={(e) =>
            setHForm({ ...hForm, people: e.target.value })
          }
        />

        <button
          onClick={handleHotel}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          বুকিং কনফার্ম
        </button>
      </div>
    );
  }

  if (!type) {
  return <div className="p-4 text-center">⚠️ Invalid booking</div>;
}
}