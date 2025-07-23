// client/src/components/EngineerForm.jsx
import React, { useState } from "react";
import axios from "axios";

const EngineerForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const engineer = {
      name,
      skills: skills.split(",").map(s => s.trim()),
      availability: parseInt(availability)
    };
    const res = await axios.post("http://localhost:5000/api/engineers", engineer);
    onAdd(res.data);
    setName(""); setSkills(""); setAvailability("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-2">Add Engineer</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Skills (comma separated)"
        className="border p-2 w-full mb-2"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Availability %"
        className="border p-2 w-full mb-2"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Engineer
      </button>
    </form>
  );
};

export default EngineerForm;
