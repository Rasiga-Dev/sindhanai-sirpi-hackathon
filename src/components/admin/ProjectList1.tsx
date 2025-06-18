// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProjectDetailModal from './ProjectDetailModal';

// const ProjectList1 = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:11129/api/admin/all-projects")
//       .then((res) => setProjects(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">📁 Submitted Projects</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className="bg-gray-100 text-left text-sm font-semibold">
//               <th className="p-3 border">Project ID</th>
//               <th className="p-3 border">Title</th>
//               <th className="p-3 border">School</th>
//               <th className="p-3 border">District</th>
//               <th className="p-3 border">Stage</th>
//               <th className="p-3 border">Status</th>
//               <th className="p-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((proj, idx) => (
//               <tr key={idx} className="hover:bg-gray-50 text-sm">
//                 <td className="p-3 border">{proj.projectId}</td>
//                 <td className="p-3 border">{proj.title}</td>
//                 <td className="p-3 border">{proj.schoolName}</td>
//                 <td className="p-3 border">{proj.district}</td>
//                 <td className="p-3 border">{proj.stage}</td>
//                 <td className="p-3 border">{proj.status || "Pending"}</td>
//                 <td className="p-3 border">
//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     onClick={() =>
//                       setSelectedProject({
//                         schoolId: proj.projectId.split("-")[0],
//                         index: proj.projectId.split("-")[1],
//                       })
//                     }
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedProject && (
//         <ProjectDetailModal
//           project={selectedProject}
//           onClose={() => setSelectedProject(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectList1;


import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectDetailModal from "./ProjectDetailModal";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const ProjectList1 = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Filters
  const [searchDistrict, setSearchDistrict] = useState("");
  const [filterStage, setFilterStage] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:11129/api/admin/all-projects")
//       .then((res) => setProjects(res.data))
//       .catch((err) => console.error(err));
//   }, []);
useEffect(() => {
  axios
    .get("http://localhost:11129/api/admin/all-projects")
    .then((res) => {
      
      setProjects(res.data); // Set data to state
    })
    .catch((err) => console.error("Error fetching projects:", err));
}, []);


  // Filter projects based on search inputs
  const filteredProjects = projects.filter((proj) => {
    return (
      (!searchDistrict ||
        proj.district.toLowerCase().includes(searchDistrict.toLowerCase())) &&
      (!filterStage || proj.stage === filterStage) &&
      (!filterStatus || proj.status === filterStatus)
    );
  });

  // Pie Chart data
  const acceptedCount = projects.filter((p) => p.status === "Accepted").length;
  const rejectedCount = projects.filter((p) => p.status === "Rejected").length;
  const underReviewCount = projects.filter(
    (p) => p.status === "Under Review"
  ).length;

  const scoreData = [
    { name: "Accepted", value: acceptedCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Under Review", value: underReviewCount },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredProjects.map(({ projectId, title, schoolName, district, stage, status }) => ({
        "Project ID": projectId,
        Title: title,
        School: schoolName,
        District: district,
        Stage: stage,
        Status: status || "Pending",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    XLSX.writeFile(workbook, "projects.xlsx");
  };

  const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text("Project List", 14, 20);
  const tableColumn = [
    "Project ID",
    "Title",
    "School",
    "District",
    "Stage",
    "Status",
  ];
  const tableRows = [];

  filteredProjects.forEach((proj) => {
    const projData = [
      proj.projectId,
      proj.title,
      proj.schoolName,
      proj.district,
      proj.stage,
      proj.status || "Pending",
    ];
    tableRows.push(projData);
  });

  // Use autoTable function by passing doc instance
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("projects.pdf");
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📁 Submitted Projects</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by District"
          value={searchDistrict}
          onChange={(e) => setSearchDistrict(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Stages</option>
          <option value="Stage 1">Stage 1</option>
          <option value="Stage 2">Stage 2</option>
          <option value="Stage 3">Stage 3</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Under Review">Under Review</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Export buttons */}
      <div className="flex gap-4 mb-4 justify-end flex-wrap">
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export Excel
        </button>
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>

      {/* Project Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-3 border">Project ID</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">School</th>
              <th className="p-3 border">District</th>
              <th className="p-3 border">Stage</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((proj, idx) => (
              <tr key={idx} className="hover:bg-gray-50 text-sm">
                <td className="p-3 border">{proj.projectId}</td>
                <td className="p-3 border">{proj.title}</td>
                <td className="p-3 border">{proj.schoolName}</td>
                <td className="p-3 border">{proj.district}</td>
                <td className="p-3 border">{proj.stage}</td>
                <td className="p-3 border">{proj.status || "Pending"}</td>
                <td className="p-3 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() =>
                      setSelectedProject({
                        schoolId: proj.projectId.split("-")[0],
                        index: proj.projectId.split("-")[1],
                      })
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Score summary chart */}
      <div className="flex justify-center">
        <PieChart width={350} height={300}>
          <Pie
            data={scoreData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {scoreData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectList1;
