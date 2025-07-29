import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpoint } from "../constant/endpoint";

const AssignmentForm = ({ onAssign }) => {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [engineerId, setEngineerId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [allocatedPercent, setAllocatedPercent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${apiEndpoint}/engineers`).then((res) => setEngineers(res.data));
    axios.get(`${apiEndpoint}/projects`).then((res) => setProjects(res.data));
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${apiEndpoint}/assignments`, {
      engineerId,
      projectId,
      allocatedPercent: parseInt(allocatedPercent),
    });
    setEngineerId(""); setProjectId(""); setAllocatedPercent("");
    setError("");
    onAssign();
  } catch (err) {
    setError(err.response?.data?.error || "Failed to assign.");
  }
};
  

  

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <h2 className="text-xl font-bold mb-2">Assign Engineer to Project</h2>

      <select className="border p-2 w-full mb-2" value={engineerId} onChange={(e) => setEngineerId(e.target.value)} required>
        <option value="">Select Engineer</option>
        {engineers.map((eng) => (
          <option key={eng._id} value={eng._id}>{eng.name}</option>
        ))}
      </select>

      <select className="border p-2 w-full mb-2" value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
        <option value="">Select Project</option>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>{proj.title}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Allocation %"
        className="border p-2 w-full mb-2"
        value={allocatedPercent}
        onChange={(e) => setAllocatedPercent(e.target.value)}
        required
      />

      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Assign
      </button>
    </form>
  );
};

export default AssignmentForm;
