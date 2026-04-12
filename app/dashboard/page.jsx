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

      <p className="mt-4">
        You can now book medical support services.
      </p>
    </div>
  );
}