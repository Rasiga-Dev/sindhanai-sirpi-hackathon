

import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';


// Admin Pages
import DashboardHome from "./admin/DashboardHome";
import SchoolManagement from "./admin/SchoolManagement";
import GuideTeacherList from "./admin/GuideTeacherList";
import ProjectList from "./admin/ProjectList";
import EvaluatorManagement from "./admin/EvaluatorManagement";
import ProjectList1 from "./admin/ProjectList1";
import FinalistManagement from "./admin/FinalistManagement";
import ReportsExport from "./admin/ReportsExport";
import EvaluationRequest from "./admin/EvaluationRequest";
import JullyMark from "./admin/JullyMark";
import DailyProjectTracking from "./admin/DailyProjectTracking";


const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  // Dynamically render selected page
  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <DashboardHome />;
      case "schools":
        return <SchoolManagement />;
      case "guideTeachers":
        return <GuideTeacherList />;
      case "projects":
        return <ProjectList />;
      case "evaluators":
        return <EvaluatorManagement />;
      // case "project evaluation tracking":
      //   return <ProjectList1 />;
      case "evaluation request":
        return <EvaluationRequest />;
      case "finalists":
        return <FinalistManagement />;
        case "jully mark":
        return <JullyMark />;
      case "reports":
        return <ReportsExport />;
      case "daily tracking":
        return <DailyProjectTracking />; // Assuming this is the correct component for daily tracking
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar selectedPage={selectedPage} onSelectPage={setSelectedPage} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
// Sidebar.jsx
export const Sidebar = ({ selectedPage, onSelectPage }) => {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "schools", label: "Schools" },
    { id: "guideTeachers", label: "Guide Teachers" },
    { id: "projects", label: "Projects" },
    { id: "evaluators", label: "Evaluators" },
    { id: "evaluation request", label: "Evaluation Request" },
    
    { id: "jully mark", label: "Jury Mark Entry" },
    { id: "finalists", label: "Finalists" },
    { id: "reports", label: "Reports" },
    { id: "daily tracking", label: "Daily Project Tracking" },

  ];

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        {items.map(({ id, label }) => (
          <li
            key={id}
            className={`cursor-pointer text-gray-700 hover:text-blue-600 ${
              selectedPage === id ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => onSelectPage(id)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};


// Header.jsx
export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Hackathon Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};
