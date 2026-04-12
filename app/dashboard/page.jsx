"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const user = auth?.user;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {user ? (
        <p className="mt-4">Welcome, {user.name}</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}