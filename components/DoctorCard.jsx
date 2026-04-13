"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function DoctorCard({ doctor }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const book = async () => {
    // ❌ NOT logged in
    if (!user) {
      setShow(false); // modal close

      const goLogin = confirm("আপনি লগইন করেননি!\nলগইন করতে চান?");
      if (goLogin) {
        router.push("/login");
      } else {
        router.push("/register");
      }
      return;
    }

    if (!date || !time) {
      alert("তারিখ ও সময় নির্বাচন করুন");
      return;
    }

    // ✅ booking
    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          doctorId: doctor._id,
          doctorName: doctor.name,
          date,
          time,
        }),
      },
    );

    const data = await res.json();
    alert(data.message);
    setShow(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition">
      {/* <h2 className="text-xl font-bold">{doctor.name}</h2> */}

      {/* <p className="text-gray-600">{doctor.hospital}</p>

      <p>💰 ফি: ৳ {doctor.fee}</p>

      <p className="text-sm text-gray-500">
        📅 ডাক্তারের বসার দিন: রবি - বৃহস্পতি
      </p>

      <p className="text-sm text-gray-500">
        ⏰ রোগী দেখার সময়: বিকাল ৪টা - রাত ৯টা
      </p> */}

      <h2 className="text-lg font-bold">{doctor.name}</h2>

      <p>{doctor.department}</p>

      <p>{doctor.hospital}</p>

      <p>💰 ফি: ৳ {doctor.fee}</p>

      <p>📅 ডাক্তার বসেন: রবি - বৃহস্পতি</p>

      <p>⏰ রোগী দেখার সময়: বিকাল ৪টা - রাত ৯টা</p>

      <button
        onClick={() => setShow(true)}
        className="mt-3 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg"
      >
        অ্যাপয়েন্টমেন্ট নিন
      </button>

      {/* MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="font-bold mb-3">{doctor.name}</h3>

            <input
              type="date"
              className="border p-2 w-full mb-2"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              className="border p-2 w-full mb-3"
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">সময় নির্বাচন করুন</option>
              <option>4:00 PM</option>
              <option>5:00 PM</option>
              <option>6:00 PM</option>
              <option>7:00 PM</option>
            </select>

            <button
              onClick={book}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              নিশ্চিত করুন
            </button>

            {/* ✅ CANCEL BUTTON (VERY IMPORTANT FIX) */}
            <button
              onClick={() => setShow(false)}
              className="mt-2 text-red-500 w-full"
            >
              বাতিল
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
