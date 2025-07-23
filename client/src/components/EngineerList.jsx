import React, { useEffect, useState } from "react";
import axios from "axios";

const EngineerList = ({ refresh }) => {
  const [engineers, setEngineers] = useState([]);

  const fetchEngineers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/engineers");
      setEngineers(res.data);
    } catch (err) {
      console.error("Error fetching engineers:", err);
    }
  };

  useEffect(() => {
    fetchEngineers();
  }, [refresh]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Engineer List</h2>
      <ul className="space-y-2">
        {engineers.map((eng) => (
          <li key={eng._id} className="p-3 bg-gray-100 rounded shadow-sm">
            <strong>{eng.name}</strong> — Skills: {eng.skills.join(", ")} | Availability: {eng.availability}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EngineerList;
