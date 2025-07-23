import React, { useState } from "react";
import axios from "axios";

const ProjectForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = {
      title,
      description,
      requiredSkills: requiredSkills.split(",").map(skill => skill.trim()),
      deadline
    };

    const res = await axios.post("http://localhost:5000/api/projects", project);
    onAdd(res.data);

    // Reset fields
    setTitle("");
    setDescription("");
    setRequiredSkills("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Add Project</h2>
      <input
        type="text"
        placeholder="Project Title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Required Skills (comma separated)"
        className="border p-2 w-full mb-2"
        value={requiredSkills}
        onChange={(e) => setRequiredSkills(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
