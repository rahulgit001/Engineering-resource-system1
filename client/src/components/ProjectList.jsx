import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectList = ({ refresh }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, [refresh]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Project List</h2>
      <ul className="space-y-2">
        {projects.map((proj) => (
          <li key={proj._id} className="p-3 bg-gray-100 rounded shadow-sm">
            <strong>{proj.title}</strong> - Skills: {proj.requiredSkills.join(", ")} | Deadline: {new Date(proj.deadline).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
