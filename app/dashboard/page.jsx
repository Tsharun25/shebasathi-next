"use client";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>{user.name}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;