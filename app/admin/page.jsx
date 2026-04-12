"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; // ✅ FIXED
import { useRouter } from "next/navigation";

export default function Admin() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const user = auth?.user;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div>
      <h1>Admin Panel</h1>
      {user ? <p>Welcome {user.name}</p> : <p>Loading...</p>}
    </div>
  );
}