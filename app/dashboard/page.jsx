"use client";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const auth = useContext(AuthContext);

  // safe fallback (VERY IMPORTANT)
  const user = auth?.user;

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Dashboard
      </h1>

      {user ? (
        <p style={{ marginTop: "10px" }}>
          Welcome, {user.name}
        </p>
      ) : (
        <p style={{ marginTop: "10px", color: "gray" }}>
          Loading user...
        </p>
      )}
    </div>
  );
};

export default Dashboard;