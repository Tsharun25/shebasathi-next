"use client";

export default function Dashboard() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        স্বাগতম {user?.name || "User"} 👋
      </h1>
    </div>
  );
}