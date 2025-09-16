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
    projectTitle: string;
    schoolName: string;
    district: string;
    jully1: string;
    jully2: string;
    jully3: string;
    bannel: string;
    average: number;
    finalStage?: string;
    finalStatus?: string;
    rank?: number;
    evaluationStatus?: string;
    isFinalist?: boolean;
}

const FinalistManagement = () => {
    const [finalists, setFinalists] = useState<Finalist[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [selectedProject, setSelectedProject] = useState<Finalist | null>(null);
    const [selectedRank, setSelectedRank] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);



    useEffect(() => {
        fetchFinalists();
    }, []);

    const fetchFinalists = async () => {
        try {
            const res = await axios.get("http://localhost:11129/api/admin/top-finalists");
            setFinalists(res.data);
            setLoading(false);
            console.log("Finalists fetched:", res.data);
        } catch (err) {
            console.error("Error fetching finalists:", err);
            setLoading(false);
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
        doc.text("Sindhanai Sirpi Hackathon Top 10 Finalists", 14, 20);

        const tableColumn = [
            "Project Title",
            "School",
            "District",
            "Jully 1",
            "Jully 2",
            "Jully 3",
            "Banel",
            "Average Score",
        ];

        const tableRows = [];

        finalists.forEach((proj) => {
            const projData = [
                proj.projectTitle,
                proj.schoolName,
                proj.district,
                proj.jully1, // Assuming 'stage' is average score
                 proj.jully2,
                proj.jully3,
                proj.bannel,
                proj.average.toFixed(2), // Format average score to 2 decimal places
        
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

    const sortedFinalists = [...finalists].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.average - b.average;
        } else {
            return b.average - a.average;
        }
    });

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
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
                                    <th className="p-2 border">Jully 1</th>
                                    <th className="p-2 border">Jully 2</th>
                                    <th className="p-2 border">Jully 3</th>
                                    <th className="p-2 border">Banel</th>
                                    <th className="p-2 border cursor-pointer select-none" onClick={toggleSortOrder}>
                                        Average Score{" "}
                                        {sortOrder === "asc" ? (
                                            <span>&uarr;</span>
                                            // Arrow up
                                        ) : (

                                             <span>&darr;</span>
                                            // Arrow down
                                        )}
                                    </th>


                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedFinalists.map((proj, index) => (
                                    <tr key={proj.projectId} className="hover:bg-gray-50">
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{proj.projectTitle}</td>
                                        <td className="p-2 border">{proj.schoolName}</td>
                                        <td className="p-2 border">{proj.district}</td>
                                        <td className="p-2 border">{proj.jully1}</td>
                                        <td className="p-2 border">{proj.jully2}</td>
                                        <td className="p-2 border">{proj.jully3}</td>
                                        <td className="p-2 border">{proj.bannel}</td>
                                        <td className="p-2 border">
                                            <span
                                            >
                                                {proj.average.toFixed(2)}
                                                {/* {proj.average >= 18 ? "✅" : proj.average >= 15 ? "⚠️" : "❌"} */}
                                            </span>
                                        </td>



                                        <td className="p-2 border">
                                            <div className="flex gap-2">
                                                {proj.finalStage !== "Completed" && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedProject(proj);
                                                            setShowModal(true);
                                                        }}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleNotify(proj)}
                                                    disabled={proj.finalStatus !== "Finalist"}
                                                    className={`px-3 py-1 rounded text-white 
    ${proj.finalStatus === "Finalist"
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
                    {showModal && selectedProject && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg text-center space-y-4">
                                <h3 className="text-lg font-bold mb-2">
                                    Select Rank for <br />
                                    <span className="text-blue-600">{selectedProject.projectTitle}</span>
                                </h3>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {[...Array(15)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedRank(i + 1)}
                                            className={`w-10 h-10 rounded-full font-bold ${selectedRank === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-center gap-3 mt-4">
                                    <button
                                        onClick={async () => {
                                            if (!selectedProject || selectedRank === null) return;
                                            try {
                                                await axios.post(`http://localhost:11129/api/admin/accept-finalist/${selectedProject.projectId}`, {
                                                    rank: selectedRank,
                                                    finalStatus: "Finalist",
                                                });
                                                alert("Finalist accepted with rank!");
                                                setShowModal(false);
                                                setSelectedRank(null);
                                                setSelectedProject(null);
                                                fetchFinalists();
                                            } catch (err) {
                                                console.error(err);
                                                alert("Error saving finalist rank.");
                                            }
                                        }}
                                        disabled={selectedRank === null}
                                        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            setSelectedRank(null);
                                            setSelectedProject(null);
                                        }}
                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </>
            )}
        </div>

    );
};

export default FinalistManagement;
