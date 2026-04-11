"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {user.user.name}
      </h1>

      <p className="mt-4">
        Role: {user.user.role}
      </p>
    </div>
  );
}
