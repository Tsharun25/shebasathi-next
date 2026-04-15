"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DoctorCard from "../../components/DoctorCard";

export default function Doctors() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://shebasathi-backend.onrender.com/api/doctors")
      .then((res) => res.json())
      .then(setList);
  }, []);

  const handleBook = (doctor) => {
    router.push(
      `/book?doctor=${doctor.name}&days=${doctor.days.join(",")}`
    );
  };

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