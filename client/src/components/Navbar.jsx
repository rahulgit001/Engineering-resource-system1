// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between">
//       <h1 className="font-bold">ERMS</h1>
//       <div className="space-x-4">
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/admin">Admin</Link>
//         <Link to="/engineers">Engineers</Link>
//         <Link to="/projects">Projects</Link>
//         <Link to="/assignments">Assignments</Link>
//       </div>
//     </nav>
//   );
// };

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white p-4 shadow flex justify-between">
      <h1 className="text-xl font-bold">Resource Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};




export default Navbar;
