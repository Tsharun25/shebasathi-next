"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user) router.push("/login");
  }, [auth]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">
        Welcome {auth?.user?.name}
      </h1>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold">Doctor Booking</h2>
          <p className="text-sm text-gray-500">Book appointments easily</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold">Accommodation</h2>
          <p className="text-sm text-gray-500">Stay near hospital</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="font-bold">Transport</h2>
          <p className="text-sm text-gray-500">Easy travel support</p>
        </div>
      </div>
    </div>
  );
}