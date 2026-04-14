"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import DoctorCard from "../../components/DoctorCard";
import { AuthContext } from "../../context/AuthContext";

export default function Doctors() {
  const [list, setList] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const handleBook = (doctor) => {
    router.push(`/book?doctor=${doctor.name}&days=${doctor.days.join(",")}`);
  };

  useEffect(() => {
    fetch("https://shebasathi-backend.onrender.com/api/doctors")
      .then((res) => res.json())
      .then(setList);
  }, []);

  // 🔥 BOOK FUNCTION (FIXED)
  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!date || !time) {
      alert("তারিখ ও সময় নির্বাচন করুন");
      return;
    }

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor: selectedDoctor.name,
          date,
          time,
          user: user.phone || user.email, // 🔥 IMPORTANT
        }),
      },
    );

    const data = await res.json();

    alert(data.message);
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold text-blue-700 mb-5 text-center">
        👨‍⚕️ ডাক্তার তালিকা
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((d, i) => (
          <DoctorCard
            key={i}
            doctor={d}
            onBook={handleBook} // 🔥 FIX
          />
        ))}
      </div>
    </div>
  );
}
