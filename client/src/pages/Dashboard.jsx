// src/pages/Dashboard.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}</h2>
      <p className="text-sm text-gray-700 mb-4">Role: {user.role}</p>

      {/* Optionally link to admin dashboard */}
      {user.role === "admin" && (
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Admin Dashboard
        </button>
      )}
    </div>
  );
};

export default Dashboard;
