import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EngineerForm from "./components/EngineerForm";
import EngineerList from "./components/EngineerList";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar"; 

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const handleAdd = () => setRefresh(!refresh);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Engineering Resource Management System
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <EngineerForm onAdd={handleAdd} />
          <EngineerList refresh={refresh} />
        </div>

        <div>
          <ProjectForm onAdd={handleAdd} />
          <ProjectList refresh={refresh} />
        </div>

        <div>
          <AssignmentForm onAssign={handleAdd} />
          <AssignmentList refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/login" />} />

        <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Navbar />
      <HomePage />  {/* Move the entire dashboard/form here */}
    </PrivateRoute>
  }
/>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
               <Navbar />
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>

    

    
  );
};

export default App;
