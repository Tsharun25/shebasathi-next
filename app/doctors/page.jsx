"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import DoctorCard from "../../components/DoctorCard";
import { AuthContext } from "../../context/AuthContext";

export default function Doctors() {
  const [list, setList] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // ✅ ONLY redirect করবে
  const handleBook = (doctor) => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    router.push(
      `/book?doctor=${doctor.name}&days=${doctor.days.join(",")}`
    );
  };

  useEffect(() => {
    fetch("https://shebasathi-backend.onrender.com/api/doctors")
      .then((res) => res.json())
      .then(setList);
  }, []);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold text-blue-700 mb-5 text-center">
        👨‍⚕️ ডাক্তার তালিকা
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((d, i) => (
          <DoctorCard key={i} doctor={d} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}