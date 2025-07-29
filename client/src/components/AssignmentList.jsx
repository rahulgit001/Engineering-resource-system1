import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpoint } from "../constant/endpoint";

const AssignmentList = ({ refresh }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get(`${apiEndpoint}/assignments`).then((res) => setAssignments(res.data));
  }, [refresh]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Assignments</h2>
      <ul className="space-y-2">
        {assignments.map((a) => (
          <li key={a._id} className="p-3 bg-gray-100 rounded shadow-sm">
            <strong>{a.engineerId?.name}</strong> → {a.projectId?.title} — {a.allocatedPercent}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
