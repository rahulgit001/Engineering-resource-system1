import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CSVLink } from "react-csv";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/assignments").then((res) => setAssignments(res.data));
    axios.get("http://localhost:5000/api/engineers").then((res) => setEngineers(res.data));
  }, []);

  const getEngineerUtil = () => {
    const data = engineers.map((eng) => {
      const assigned = assignments
        .filter((a) => a.engineerId?._id === eng._id)
        .reduce((sum, a) => sum + a.allocatedPercent, 0);
      return { name: eng.name, value: assigned };
    });
    return data;
  };

  const getProjectCounts = () => {
    const counts = {};
    for (const a of assignments) {
      const title = a.projectId?.title || "Unknown";
      counts[title] = (counts[title] || 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engineers per project pie chart */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Engineers per Project</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getProjectCounts()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {getProjectCounts().map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Engineer Capacity Progress */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Engineer Capacity</h3>
          <ul className="space-y-2">
            {getEngineerUtil().map((e, i) => (
              <li key={i}>
                <p className="text-sm font-medium">{e.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      e.value < 50 ? "bg-green-500" : e.value <= 100 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${e.value}%` }}
                  ></div>
                </div>
                <p className="text-xs">{e.value}% assigned</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
