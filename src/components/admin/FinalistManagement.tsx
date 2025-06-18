// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// interface Finalist {
//   projectId: string;
//   title: string;
//   schoolName: string;
//   district: string;
//   averageScore: number;
// }

// const FinalistManagement = () => {
//   const [finalists, setFinalists] = useState<Finalist[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFinalists();
//   }, []);

//   const fetchFinalists = async () => {
//     try {
//       const res = await axios.get("http://localhost:11129/api/admin/top-finalists");
//       setFinalists(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching finalists:", err);
//       setLoading(false);
//     }
//   };

//   const handleAcceptFinalist = async (projectId: string) => {
//     try {
//       await axios.post(`http://localhost:11129/api/admin/accept-finalist/${projectId}`);
//       alert("Marked as Finalist!");
//     } catch (err) {
//       console.error(err);
//       alert("Error marking finalist.");
//     }
//   };

//   const handleNotify = (project: Finalist) => {
//     // Placeholder for email/SMS logic
//     alert(`Notify team of ${project.schoolName} - ${project.title}`);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(finalists);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Finalists");
//     XLSX.writeFile(workbook, "finalist_list.xlsx");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Top 10 Finalists", 14, 15);

//     const tableColumn = ["Project Title", "School", "District", "Average Score"];
//     const tableRows = finalists.map((f) => [
//       f.title,
//       f.schoolName,
//       f.district,
//       f.averageScore,
//     ]);

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 20,
//     });

//     doc.save("finalist_list.pdf");
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🏅 Top 10 Finalist Teams</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="flex gap-4 mb-4">
//             <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded">Export Excel</button>
//             <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded">Export PDF</button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full border">
//               <thead>
//                 <tr className="bg-gray-200 text-left">
//                   <th className="p-2 border">#</th>
//                   <th className="p-2 border">Project Title</th>
//                   <th className="p-2 border">School</th>
//                   <th className="p-2 border">District</th>
//                   <th className="p-2 border">Average Score</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {finalists.map((proj, index) => (
//                   <tr key={proj.projectId}>
//                     <td className="p-2 border">{index + 1}</td>
//                     <td className="p-2 border">{proj.title}</td>
//                     <td className="p-2 border">{proj.schoolName}</td>
//                     <td className="p-2 border">{proj.district}</td>
//                     <td className="p-2 border">{proj.averageScore}</td>
//                     <td className="p-2 border flex gap-2">
//                       <button
//                         onClick={() => handleAcceptFinalist(proj.projectId)}
//                         className="bg-blue-600 text-white px-2 py-1 rounded"
//                       >
//                         Accept
//                       </button>
//                       <button
//                         onClick={() => handleNotify(proj)}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded"
//                       >
//                         Notify
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default FinalistManagement;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// interface Finalist {
//     projectId: string;
//     title: string;
//     schoolName: string;
//     district: string;
//     averageScore: number;
//     evaluationStatus?: string;
// }

// const FinalistManagement = () => {
//     const [finalists, setFinalists] = useState<Finalist[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchFinalists();
//     }, []);

//     const fetchFinalists = async () => {
//         try {
//             const res = await axios.get("http://localhost:11129/api/admin/top-finalists");
//             setFinalists(res.data);
//             setLoading(false);
//         } catch (err) {
//             console.error("Error fetching finalists:", err);
//             setLoading(false);
//         }
//     };

//     const handleAcceptFinalist = async (projectId: string) => {
//         try {
//             await axios.post(`http://localhost:11129/api/admin/accept-finalist/${projectId}`);
//             alert("Marked as Finalist!");
//             fetchFinalists(); // Refresh after update
//         } catch (err) {
//             console.error(err);
//             alert("Error marking finalist.");
//         }
//     };

//     const handleNotify = (project: Finalist) => {
//         alert(`Notify team of ${project.schoolName} - ${project.title}`);
//     };

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(finalists);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Finalists");
//         XLSX.writeFile(workbook, "finalist_list.xlsx");
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.text("Top 10 Finalists", 14, 15);

//         const tableColumn = ["Project Title", "School", "District", "Average Score"];
//         const tableRows = finalists.map((f) => [
//             f.title,
//             f.schoolName,
//             f.district,
//             f.averageScore,
//         ]);

//         doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 20,
//         });

//         doc.save("finalist_list.pdf");
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">🏅 Top 10 Finalist Teams</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <div className="flex gap-4 mb-4">
//                         <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded">
//                             Export Excel
//                         </button>
//                         <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded">
//                             Export PDF
//                         </button>
//                     </div>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full border">
//                             <thead>
//                                 <tr className="bg-gray-200 text-left">
//                                     <th className="p-2 border">#</th>
//                                     <th className="p-2 border">Project Title</th>
//                                     <th className="p-2 border">School</th>
//                                     <th className="p-2 border">District</th>
//                                     <th className="p-2 border">Average Score</th>
//                                     <th className="p-2 border">Status</th>
//                                     <th className="p-2 border">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {finalists.map((proj, index) => (
//                                     <tr key={proj.projectId} className="hover:bg-gray-50">
//                                         <td className="p-2 border">{index + 1}</td>
//                                         <td className="p-2 border">{proj.title}</td>
//                                         <td className="p-2 border">{proj.schoolName}</td>
//                                         <td className="p-2 border">{proj.district}</td>
//                                         <td className="p-2 border">{proj.averageScore}</td>
//                                         <td className="p-2 border">
//                                             {proj.evaluationStatus ? proj.evaluationStatus : "Pending"}
//                                         </td>

//                                         <td className="p-2 border">
//                                             <div className="flex gap-2">
//                                                 {proj.isFinalist ? (
//                                                     <span className="text-green-600 font-semibold">✅ Finalist</span>
//                                                 ) : (
//                                                     <button
//                                                         onClick={() => handleAcceptFinalist(proj.projectId)}
//                                                         className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                                                     >
//                                                         Accept
//                                                     </button>
//                                                 )}
//                                                 <button
//                                                     onClick={() => handleNotify(proj)}
//                                                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                                                 >
//                                                     Notify
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default FinalistManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


interface Finalist {
    projectId: string;
    title: string;
    schoolName: string;
    district: string;
    averageScore: number;
    evaluationStatus?: string;
    isFinalist?: boolean;
}

const FinalistManagement = () => {
    const [finalists, setFinalists] = useState<Finalist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFinalists();
    }, []);

    const fetchFinalists = async () => {
        try {
            const res = await axios.get("http://localhost:11129/api/admin/top-finalists");
            setFinalists(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching finalists:", err);
            setLoading(false);
        }
    };

    const handleAcceptFinalist = async (projectId: string) => {
        try {
            await axios.post(`http://localhost:11129/api/admin/accept-finalist/${projectId}`);
            alert("Marked as Finalist!");
            fetchFinalists(); // Refresh after update
        } catch (err) {
            console.error(err);
            alert("Error marking finalist.");
        }
    };

    const handleNotify = async (project: Finalist) => {
        try {
            await axios.post(`http://localhost:11129/api/admin/notify-finalist/${project.projectId}`);
            alert(`Notification sent to ${project.schoolName} successfully!`);
        } catch (error) {
            console.error("Notification Error:", error);
            alert("Failed to send notification.");
        }
    };


    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(finalists);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Finalists");
        XLSX.writeFile(workbook, "finalist_list.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Top 10 Finalists", 14, 20);

        const tableColumn = [
            "Project Title",
            "School",
            "District",
            "Average Score",
            "Status"
        ];

        const tableRows = [];

        finalists.forEach((proj) => {
            const projData = [
                proj.title,
                proj.schoolName,
                proj.district,
                proj.averageScore, // Assuming 'stage' is average score
                proj.evaluationStatus || "Pending",
            ];
            tableRows.push(projData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save("Top 10 Finalists.pdf");
    };






    const getStatusBadge = (status?: string) => {
        const baseStyle = "text-white px-2 py-1 rounded text-sm";
        switch (status?.toLowerCase()) {
            case "finalist":
                return <span className={`${baseStyle} bg-green-600`}>Finalist</span>;
            case "rejected":
                return <span className={`${baseStyle} bg-red-600`}>Rejected</span>;
            case "pending":
            default:
                return <span className={`${baseStyle} bg-yellow-500`}>Pending</span>;
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🏅 Top 10 Finalist Teams</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="flex gap-4 mb-4">
                        <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded">
                            Export Excel
                        </button>
                        <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded">
                            Export PDF
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-2 border">#</th>
                                    <th className="p-2 border">Project Title</th>
                                    <th className="p-2 border">School</th>
                                    <th className="p-2 border">District</th>
                                    <th className="p-2 border">Average Score</th>
                                    <th className="p-2 border">Status</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finalists.map((proj, index) => (
                                    <tr key={proj.projectId} className="hover:bg-gray-50">
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{proj.title}</td>
                                        <td className="p-2 border">{proj.schoolName}</td>
                                        <td className="p-2 border">{proj.district}</td>
                                        <td className="p-2 border">{proj.averageScore}</td>
                                        <td className="p-2 border">
                                            <span
                                                className={`px-2 py-1 rounded text-sm font-medium ${proj.evaluationStatus === "Finalist"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {proj.evaluationStatus || "Pending"}
                                            </span>
                                        </td>

                                        <td className="p-2 border">
                                            <div className="flex gap-2">
                                                {proj.evaluationStatus !== "Finalist" && (
                                                    <button
                                                        onClick={() => handleAcceptFinalist(proj.projectId)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleNotify(proj)}
                                                    disabled={proj.evaluationStatus !== "Finalist"}
                                                    className={`px-3 py-1 rounded text-white 
        ${proj.evaluationStatus === "Finalist"
                                                            ? "bg-yellow-500 hover:bg-yellow-600"
                                                            : "bg-gray-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    Notify
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default FinalistManagement;
