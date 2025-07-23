import React from "react";
import EngineerForm from "../components/EngineerForm";
import EngineerList from "../components/EngineerList";

const EngineerPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Engineer Management</h2>
      <EngineerForm />
      <EngineerList />
    </div>
  );
};

export default EngineerPage;
