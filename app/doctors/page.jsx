"use client";

import { useEffect, useState } from "react";
import DoctorCard from "../../components/DoctorCard";

const API = "https://shebasathi-backend.onrender.com";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">ডাক্তার তালিকা</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doc, i) => (
          <DoctorCard key={i} doctor={doc} />
        ))}
      </div>
    </div>
  );
}