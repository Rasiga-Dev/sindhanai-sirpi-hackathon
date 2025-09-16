
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const EvaluatorManagement = () => {
// // //   const [evaluators, setEvaluators] = useState([]);
// // //   const [selectedEvaluator, setSelectedEvaluator] = useState(null);
// // //   const [assignedProjects, setAssignedProjects] = useState([]);
// // //   const [evaluatedProjects, setEvaluatedProjects] = useState([]);

// // //   useEffect(() => {
// // //     const fetchEvaluators = async () => {
// // //       try {
// // //         const res = await axios.get("http://localhost:11129/api/admin/get-all-evaluators");
// // //         setEvaluators(res.data);
// // //       } catch (err) {
// // //         console.error("Error fetching evaluators:", err);
// // //       }
// // //     };
// // //     fetchEvaluators();
// // //   }, []);

// // //   const handleView = async (evaluator) => {
// // //     setSelectedEvaluator(evaluator);
// // //     try {
// // //       const res = await axios.get(
// // //         `http://localhost:11129/api/admin/${evaluator.username}/projects`
// // //       );
// // //       setAssignedProjects(res.data.assignedProjects);
// // //       setEvaluatedProjects(res.data.evaluatedProjects);
// // //     } catch (err) {
// // //       console.error("Error fetching projects:", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6">
// // //       <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Evaluator Management</h2>

// // //       {/* Evaluators Table */}
// // //       <table className="min-w-full bg-white border rounded-lg shadow-md">
// // //         <thead>
// // //           <tr className="bg-gray-200 text-left">
// // //             <th className="p-2 border">#</th>
// // //             <th className="p-2 border">Name</th>
// // //             <th className="p-2 border">Email</th>
// // //             <th className="p-2 border">Phone</th>
// // //             <th className="p-2 border">District</th>
// // //             <th className="p-2 border">Action</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {evaluators.map((evaluator, index) => (
// // //             <tr key={evaluator._id} className="hover:bg-gray-50">
// // //               <td className="p-2 border">{index + 1}</td>
// // //               <td className="p-2 border">{evaluator.username}</td>
// // //               <td className="p-2 border">{evaluator.email}</td>
// // //               <td className="p-2 border">{evaluator.phone}</td>
// // //               <td className="p-2 border">{evaluator.district}</td>
// // //               <td className="p-2 border">
// // //                 <button
// // //                   className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// // //                   onClick={() => handleView(evaluator)}
// // //                 >
// // //                   View
// // //                 </button>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       {/* Selected Evaluator Projects */}
// // //       {selectedEvaluator && (
// // //         <div className="mt-6">
// // //           <h3 className="text-xl font-semibold mb-2">
// // //             Projects for {selectedEvaluator.username}
// // //           </h3>

// // //           {/* Assigned Projects */}
// // //           <h4 className="text-lg font-bold mt-4 mb-2">📌 Assigned Projects</h4>
// // //           {assignedProjects.length > 0 ? (
// // //             <table className="min-w-full bg-white border rounded-lg shadow-md mb-6">
// // //               <thead>
// // //                 <tr className="bg-gray-200 text-left">
// // //                   <th className="p-2 border">#</th>
// // //                   <th className="p-2 border">School</th>
// // //                   <th className="p-2 border">Title</th>
// // //                   <th className="p-2 border">Status</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {assignedProjects.map((p, i) => (
// // //                   <tr key={i} className="hover:bg-gray-50">
// // //                     <td className="p-2 border">{i + 1}</td>
// // //                     <td className="p-2 border">{p.schoolName}</td>
// // //                     <td className="p-2 border">{p.title}</td>
// // //                     <td className="p-2 border">{p.status || "N/A"}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           ) : (
// // //             <p className="text-gray-600">No assigned projects</p>
// // //           )}

// // //           {/* Evaluated Projects */}
// // //           <h4 className="text-lg font-bold mt-4 mb-2">✅ Evaluated Projects</h4>
// // //           {evaluatedProjects.length > 0 ? (
// // //             <table className="min-w-full bg-white border rounded-lg shadow-md">
// // //               <thead>
// // //                 <tr className="bg-gray-200 text-left">
// // //                   <th className="p-2 border">#</th>
// // //                   <th className="p-2 border">School</th>
// // //                   <th className="p-2 border">Title</th>
// // //                   <th className="p-2 border">Score</th>
// // //                   <th className="p-2 border">Status</th>
// // //                   <th className="p-2 border">Evaluated At</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {evaluatedProjects.map((p, i) => (
// // //                   <tr key={i} className="hover:bg-gray-50">
// // //                     <td className="p-2 border">{i + 1}</td>
// // //                     <td className="p-2 border">{p.schoolName}</td>
// // //                     <td className="p-2 border">{p.title}</td>
// // //                     <td className="p-2 border">{p.score}</td>
// // //                     <td className="p-2 border">{p.status}</td>
// // //                     <td className="p-2 border">
// // //                       {new Date(p.evaluatedAt).toLocaleDateString()}
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           ) : (
// // //             <p className="text-gray-600">No evaluated projects</p>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default EvaluatorManagement;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Dialog } from "@/components/ui/dialog"; // shadcn/ui
// // import { Button } from "@/components/ui/button";

// // const EvaluatorManagement = () => {
// //   const [evaluators, setEvaluators] = useState([]);
// //   const [selectedEvaluator, setSelectedEvaluator] = useState(null);
// //   const [assignedProjects, setAssignedProjects] = useState([]);
// //   const [evaluatedProjects, setEvaluatedProjects] = useState([]);
// //   const [open, setOpen] = useState(false);

// //   useEffect(() => {
// //     const fetchEvaluators = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:11129/api/admin/get-all-evaluators");
// //         setEvaluators(res.data);
// //       } catch (err) {
// //         console.error("Error fetching evaluators:", err);
// //       }
// //     };
// //     fetchEvaluators();
// //   }, []);

// //   const handleView = async (evaluator) => {
// //     setSelectedEvaluator(evaluator);
// //     setOpen(true); // ✅ open modal
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:11129/api/admin/${evaluator.username}/projects`
// //       );
// //       setAssignedProjects(res.data.assignedProjects);
// //       setEvaluatedProjects(res.data.evaluatedProjects);
// //     } catch (err) {
// //       console.error("Error fetching projects:", err);
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Evaluator Management</h2>

// //       {/* Evaluators Table */}
// //       <table className="min-w-full bg-white border rounded-lg shadow-md">
// //         <thead>
// //           <tr className="bg-gray-200 text-left">
// //             <th className="p-2 border">#</th>
// //             <th className="p-2 border">Name</th>
// //             <th className="p-2 border">Email</th>
// //             <th className="p-2 border">Phone</th>
// //             <th className="p-2 border">District</th>
// //             <th className="p-2 border">Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {evaluators.map((evaluator, index) => (
// //             <tr key={evaluator._id} className="hover:bg-gray-50">
// //               <td className="p-2 border">{index + 1}</td>
// //               <td className="p-2 border">{evaluator.username}</td>
// //               <td className="p-2 border">{evaluator.email}</td>
// //               <td className="p-2 border">{evaluator.phone}</td>
// //               <td className="p-2 border">{evaluator.district}</td>
// //               <td className="p-2 border">
// //                 <Button onClick={() => handleView(evaluator)}>View</Button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Popup / Modal */}
// //       <Dialog open={open} onOpenChange={setOpen}>
// //         <div className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl w-full">
// //           {selectedEvaluator && (
// //             <>
// //               <h3 className="text-2xl font-bold mb-4">
// //                 Evaluator: {selectedEvaluator.username}
// //               </h3>
// //               <p className="mb-2 text-gray-600">
// //                 📧 {selectedEvaluator.email} | 📱 {selectedEvaluator.phone} | 🏫{" "}
// //                 {selectedEvaluator.district}
// //               </p>

// //               {/* Assigned Projects */}
// //               <h4 className="text-lg font-bold mt-4 mb-2">📌 Assigned Projects</h4>
// //               {assignedProjects.length > 0 ? (
// //                 <table className="min-w-full bg-gray-50 border rounded-lg shadow-sm mb-6">
// //                   <thead>
// //                     <tr className="bg-gray-200 text-left">
// //                       <th className="p-2 border">#</th>
// //                       <th className="p-2 border">School</th>
// //                       <th className="p-2 border">Title</th>
// //                       <th className="p-2 border">Status</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {assignedProjects.map((p, i) => (
// //                       <tr key={i} className="hover:bg-gray-100">
// //                         <td className="p-2 border">{i + 1}</td>
// //                         <td className="p-2 border">{p.schoolName}</td>
// //                         <td className="p-2 border">{p.title}</td>
// //                         <td className="p-2 border">{p.status || "N/A"}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               ) : (
// //                 <p className="text-gray-600">No assigned projects</p>
// //               )}

// //               {/* Evaluated Projects */}
// //               <h4 className="text-lg font-bold mt-4 mb-2">✅ Evaluated Projects</h4>
// //               {evaluatedProjects.length > 0 ? (
// //                 <table className="min-w-full bg-gray-50 border rounded-lg shadow-sm">
// //                   <thead>
// //                     <tr className="bg-gray-200 text-left">
// //                       <th className="p-2 border">#</th>
// //                       <th className="p-2 border">School</th>
// //                       <th className="p-2 border">Title</th>
// //                       <th className="p-2 border">Score</th>
// //                       <th className="p-2 border">Status</th>
// //                       <th className="p-2 border">Evaluated At</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {evaluatedProjects.map((p, i) => (
// //                       <tr key={i} className="hover:bg-gray-100">
// //                         <td className="p-2 border">{i + 1}</td>
// //                         <td className="p-2 border">{p.schoolName}</td>
// //                         <td className="p-2 border">{p.title}</td>
// //                         <td className="p-2 border">{p.score}</td>
// //                         <td className="p-2 border">{p.status}</td>
// //                         <td className="p-2 border">
// //                           {new Date(p.evaluatedAt).toLocaleDateString()}
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               ) : (
// //                 <p className="text-gray-600">No evaluated projects</p>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default EvaluatorManagement;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EvaluatorManagement = () => {
//   const [evaluators, setEvaluators] = useState<any[]>([]);
//   const [selectedEvaluator, setSelectedEvaluator] = useState<any | null>(null);
//   const [assignedProjects, setAssignedProjects] = useState<any[]>([]);
//   const [evaluatedProjects, setEvaluatedProjects] = useState<any[]>([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fetchEvaluators = async () => {
//       try {
//         const res = await axios.get("http://localhost:11129/api/admin/get-all-evaluators");
//         setEvaluators(res.data);
//       } catch (err) {
//         console.error("Error fetching evaluators:", err);
//       }
//     };
//     fetchEvaluators();
//   }, []);

//   const handleView = async (evaluator: any) => {
//     setSelectedEvaluator(evaluator);
//     setOpen(true); // ✅ open modal
//     try {
//       const res = await axios.get(
//         `http://localhost:11129/api/admin/${evaluator.username}/projects`
//       );
//       setAssignedProjects(res.data.assignedProjects);
//       setEvaluatedProjects(res.data.evaluatedProjects);
//     } catch (err) {
//       console.error("Error fetching projects:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Evaluator Management</h2>

//       {/* Evaluators Table */}
//       <table className="min-w-full bg-white border rounded-lg shadow-md">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="p-2 border">#</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Phone</th>
//             <th className="p-2 border">District</th>
//             <th className="p-2 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {evaluators.map((evaluator, index) => (
//             <tr key={evaluator._id} className="hover:bg-gray-50">
//               <td className="p-2 border">{index + 1}</td>
//               <td className="p-2 border">{evaluator.username}</td>
//               <td className="p-2 border">{evaluator.email}</td>
//               <td className="p-2 border">{evaluator.phone}</td>
//               <td className="p-2 border">{evaluator.district}</td>
//               <td className="p-2 border">
//                 <button
//                   onClick={() => handleView(evaluator)}
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Normal Popup */}
//       {open && selectedEvaluator && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-4xl relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//               onClick={() => setOpen(false)}
//             >
//               ✖
//             </button>

//             <h3 className="text-2xl font-bold mb-4">
//               Evaluator: {selectedEvaluator.username}
//             </h3>
//             <p className="mb-2 text-gray-600">
//               📧 {selectedEvaluator.email} | 📱 {selectedEvaluator.phone} | 🏫{" "}
//               {selectedEvaluator.district}
//             </p>

//             {/* Assigned Projects */}
//             <h4 className="text-lg font-bold mt-4 mb-2">📌 Assigned Projects</h4>
//             {assignedProjects.length > 0 ? (
//               <table className="min-w-full bg-gray-50 border rounded-lg shadow-sm mb-6">
//                 <thead>
//                   <tr className="bg-gray-200 text-left">
//                     <th className="p-2 border">#</th>
//                     <th className="p-2 border">School</th>
//                     <th className="p-2 border">Title</th>
//                     <th className="p-2 border">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {assignedProjects.map((p, i) => (
//                     <tr key={i} className="hover:bg-gray-100">
//                       <td className="p-2 border">{i + 1}</td>
//                       <td className="p-2 border">{p.schoolName}</td>
//                       <td className="p-2 border">{p.title}</td>
//                       <td className="p-2 border">{p.status || "N/A"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-gray-600">No assigned projects</p>
//             )}

//             {/* Evaluated Projects */}
//             <h4 className="text-lg font-bold mt-4 mb-2">✅ Evaluated Projects</h4>
//             {evaluatedProjects.length > 0 ? (
//               <table className="min-w-full bg-gray-50 border rounded-lg shadow-sm">
//                 <thead>
//                   <tr className="bg-gray-200 text-left">
//                     <th className="p-2 border">#</th>
//                     <th className="p-2 border">School</th>
//                     <th className="p-2 border">Title</th>
//                     <th className="p-2 border">Score</th>
//                     <th className="p-2 border">Status</th>
//                     <th className="p-2 border">Evaluated At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {evaluatedProjects.map((p, i) => (
//                     <tr key={i} className="hover:bg-gray-100">
//                       <td className="p-2 border">{i + 1}</td>
//                       <td className="p-2 border">{p.schoolName}</td>
//                       <td className="p-2 border">{p.title}</td>
//                       <td className="p-2 border">{p.score}</td>
//                       <td className="p-2 border">{p.status}</td>
//                       <td className="p-2 border">
//                         {new Date(p.evaluatedAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-gray-600">No evaluated projects</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluatorManagement;



import React, { useEffect, useState } from "react";
import axios from "axios";

const EvaluatorManagement = () => {
  const [evaluators, setEvaluators] = useState<any[]>([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState<any | null>(null);
  const [assignedProjects, setAssignedProjects] = useState<any[]>([]);
  const [evaluatedProjects, setEvaluatedProjects] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const res = await axios.get("http://localhost:11129/api/admin/get-all-evaluators");
        setEvaluators(res.data);
      } catch (err) {
        console.error("Error fetching evaluators:", err);
      }
    };
    fetchEvaluators();
  }, []);

  const handleView = async (evaluator: any) => {
    setSelectedEvaluator(evaluator);
    setOpen(true); // ✅ open modal
    try {
      const res = await axios.get(
        `http://localhost:11129/api/admin/${evaluator.username}/projects`
      );
      setAssignedProjects(res.data.assignedProjects);
      setEvaluatedProjects(res.data.evaluatedProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Evaluator Management</h2>

      {/* Evaluators Table */}
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">District</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {evaluators.map((evaluator, index) => (
            <tr key={evaluator._id} className="hover:bg-gray-50">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{evaluator.username}</td>
              <td className="p-2 border">{evaluator.email}</td>
              <td className="p-2 border">{evaluator.phone}</td>
              <td className="p-2 border">{evaluator.district}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleView(evaluator)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Normal Popup */}
      {open && selectedEvaluator && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-5xl relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-4">
              Evaluator: {selectedEvaluator.username}
            </h3>
            <p className="mb-2 text-gray-600">
              📧 {selectedEvaluator.email} | 📱 {selectedEvaluator.phone} | 🏫{" "}
              {selectedEvaluator.district}
            </p>

            {/* Assigned Projects */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold">📌 Assigned Projects</h4>
                <span className="text-gray-600 font-medium">
                  Total: {assignedProjects.length}
                </span>
              </div>
              {assignedProjects.length > 0 ? (
                <div className="max-h-40 overflow-y-auto border rounded-lg">
                  <table className="min-w-full bg-gray-50">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">School</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedProjects.map((p, i) => (
                        <tr key={i} className="hover:bg-gray-100">
                          <td className="p-2 border">{i + 1}</td>
                          <td className="p-2 border">{p.schoolName}</td>
                          <td className="p-2 border">{p.title}</td>
                          <td className="p-2 border">{p.status || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No assigned projects</p>
              )}
            </div>

            {/* Evaluated Projects */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold">✅ Evaluated Projects</h4>
                <span className="text-gray-600 font-medium">
                  Total: {evaluatedProjects.length}
                </span>
              </div>
              {evaluatedProjects.length > 0 ? (
                <div className="max-h-40 overflow-y-auto border rounded-lg">
                  <table className="min-w-full bg-gray-50">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">School</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Score</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Evaluated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluatedProjects.map((p, i) => (
                        <tr key={i} className="hover:bg-gray-100">
                          <td className="p-2 border">{i + 1}</td>
                          <td className="p-2 border">{p.schoolName}</td>
                          <td className="p-2 border">{p.title}</td>
                          <td className="p-2 border">{p.score}</td>
                          <td className="p-2 border">{p.status}</td>
                          <td className="p-2 border">
                            {new Date(p.evaluatedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No evaluated projects</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluatorManagement;
