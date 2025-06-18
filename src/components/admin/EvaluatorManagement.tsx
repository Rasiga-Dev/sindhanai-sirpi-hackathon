// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const EvaluatorManagement = () => {
// //     const [evaluators, setEvaluators] = useState([]);
// //     const [selectedEvaluator, setSelectedEvaluator] = useState(null);
// //     const [filterStage, setFilterStage] = useState('');
// //     const [evaluatedProjectsDetails, setEvaluatedProjectsDetails] = useState([]);

// //     useEffect(() => {
// //         fetchEvaluators();
// //     }, []);

// //     const fetchEvaluators = async () => {
// //         try {
// //             const res = await axios.get('http://localhost:11129/api/admin/evaluators');
// //             setEvaluators(res.data);
// //         } catch (err) {
// //             console.error('Error fetching evaluators:', err);
// //         }
// //     };

// //     // Calculate average score for evaluated projects (stage3)
// //     const averageScores = (projects) => {
// //         if (!projects || projects.length === 0) return 0;
// //         const scores = projects.map(p => p.averageScore || 0);
// //         const total = scores.reduce((sum, s) => sum + s, 0);
// //         return (total / scores.length).toFixed(2);
// //     };

// //     // When "View" button is clicked, fetch detailed evaluated projects for that evaluator
// //     const handleViewClick = async (evaluator) => {
// //         console.log(evaluatedProjectsDetails, "evaluatedProjectsDetails")
// //         try {
// //             const res = await axios.get(`http://localhost:11129/api/admin/${evaluator._id}/evaluated-projects`);
// //             // Flatten the data for easier rendering
// //             const projects = [];
// //             res.data.forEach(school => {
// //                 school.submissions.forEach(sub => {
// //                     projects.push({
// //                         udiseCode: school.udiseCode,
// //                         schoolName: school.schoolName,
// //                         district: school.district,
// //                         projectTitle: sub.projectDetails?.title || 'No title',
// //                         projectDescription: sub.projectDetails?.description || 'No description',
// //                         projectDocument: sub.documentFile || null,
// //                         status: sub.evaluationStatus || 'N/A',
// //                         _id: sub._id,
// //                     });

// //                 });
// //             });


// //             setEvaluatedProjectsDetails(projects);
// //             console.log(projects, "projects")
// //             setSelectedEvaluator(evaluator);
// //         } catch (error) {
// //             console.error('Error fetching evaluated projects:', error);
// //         }
// //     };


// //     // Placeholder for status update (accept/reject) - you can implement API calls here
// //     const handleProjectStatusUpdate = (evaluatorId, projectId, newStatus) => {
// //         console.log(`Update project ${projectId} for evaluator ${evaluatorId} to status ${newStatus}`);
// //         // You should call backend API to update status, then update state accordingly
// //     };

// //     return (
// //         <div className="p-6">
// //             <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Evaluator Management</h2>

// //             {/* Filter */}
// //             <div className="mb-4">
// //                 <label className="mr-2 font-semibold">Filter by Stage:</label>
// //                 <select
// //                     className="border px-3 py-1 rounded"
// //                     value={filterStage}
// //                     onChange={(e) => setFilterStage(e.target.value)}
// //                 >
// //                     <option value="">All</option>
// //                     <option value="stage1">Stage 1</option>
// //                     <option value="stage2">Stage 2</option>
// //                     <option value="stage3">Stage 3</option>
// //                 </select>
// //             </div>

// //             {/* Evaluators Table */}
// //             <table className="w-full border shadow-sm rounded mb-8">
// //                 <thead className="bg-gray-100">
// //                     <tr>
// //                         <th className="p-2 border">Name</th>
// //                         <th className="p-2 border">Email</th>
// //                         <th className="p-2 border">Stage</th>
// //                         <th className="p-2 border">Status</th>
// //                         <th className="p-2 border">Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {evaluators
// //                         .filter(ev => !filterStage || ev.evaluationStage === filterStage)
// //                         .map(ev => (
// //                             <tr key={ev._id}>
// //                                 <td className="p-2 border">{ev.name}</td>
// //                                 <td className="p-2 border">{ev.email}</td>
// //                                 <td className="p-2 border">{ev.evaluationStage}</td>
// //                                 <td className="p-2 border">{ev.status}</td>
// //                                 <td className="p-2 border">
// //                                     <button
// //                                         onClick={() => handleViewClick(ev)}
// //                                         className="bg-blue-500 text-white px-2 py-1 rounded"
// //                                     >
// //                                         View
// //                                     </button>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                 </tbody>
// //             </table>

// //             {/* Evaluator Details Modal */}
// //             {selectedEvaluator && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //                     <div className="bg-white p-6 rounded w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto shadow-lg">
// //                         <h3 className="text-xl font-bold mb-2">Evaluator: {selectedEvaluator.name}</h3>
// //                         <p><strong>Email:</strong> {selectedEvaluator.email}</p>
// //                         <p><strong>Stage:</strong> {selectedEvaluator.evaluationStage}</p>
// //                         <p><strong>Status:</strong> {selectedEvaluator.status}</p>

// //                         <hr className="my-4" />
// //                         <h4 className="text-lg font-semibold mb-2">Evaluated Projects</h4>

// //                         {/* Stage 1 View */}
// //                         {selectedEvaluator.evaluationStage === 'stage1' && evaluatedProjectsDetails.length > 0 ? (
// //                             <div className="space-y-4">
// //                                 <table className="w-full border-collapse border">
// //                                     <thead>
// //                                         <tr>
// //                                             <th className="border p-2">UDISE</th>
// //                                             <th className="border p-2">School</th>
// //                                             <th className="border p-2">District</th>
// //                                             <th className="border p-2">Title</th>
// //                                             <th className="border p-2">Description</th>
// //                                             <th className="border p-2">Document</th>
// //                                             <th className="border p-2">Status</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {evaluatedProjectsDetails.map((proj, idx) => (
// //                                             <tr key={idx} className="hover:bg-gray-100">
// //                                                 <td className="border p-2">{proj.udiseCode}</td>
// //                                                 <td className="border p-2">{proj.schoolName}</td>
// //                                                 <td className="border p-2">{proj.district}</td>
// //                                                 <td className="border p-2">{proj.projectTitle}</td>
// //                                                 <td className="border p-2">{proj.projectDescription}</td>
// //                                                 <td className="border p-2">
// //                                                     {proj.projectDocument && proj.projectDocument.data ? (
// //                                                         <>
// //                                                             <a
// //                                                                 href={proj.projectDocument.data}
// //                                                                 download={proj.projectDocument.filename}
// //                                                                 className="text-blue-600 underline hover:text-blue-800 mr-2"
// //                                                             >
// //                                                                 Download
// //                                                             </a>
// //                                                             <button
// //                                                                 onClick={() => window.open(proj.projectDocument.data, "_blank")}
// //                                                                 className="text-green-600 underline hover:text-green-800"
// //                                                             >
// //                                                                 View
// //                                                             </button>
// //                                                         </>
// //                                                     ) : (
// //                                                         'N/A'
// //                                                     )}
// //                                                 </td>
// //                                                 <td className="border p-2">{proj.status}</td>
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                         ) : selectedEvaluator.evaluationStage === 'stage1' ? (
// //                             <p>No projects evaluated yet.</p>
// //                         ) : null}

// //                         {/* Stage 2 View */}
// //                         {selectedEvaluator.evaluationStage === 'stage2' && selectedEvaluator.evaluatedProjects?.length > 0 ? (
// //                             <table className="w-full border-collapse border mt-4">
// //                                 <thead>
// //                                     <tr>
// //                                         <th className="border p-2">UDISE</th>
// //                                         <th className="border p-2">School</th>
// //                                         <th className="border p-2">District</th>
// //                                         <th className="border p-2">Title</th>
// //                                         <th className="border p-2">Description</th>
// //                                         <th className="border p-2">Document</th>
// //                                         <th className="border p-2">Status</th>
// //                                         <th className="border p-2">Score</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {selectedEvaluator.evaluatedProjects.map((proj, idx) => (
// //                                         <tr key={idx} className="hover:bg-gray-100">
// //                                             <td className="border p-2">{proj.udiseCode}</td>
// //                                             <td className="border p-2">{proj.schoolName}</td>
// //                                             <td className="border p-2">{proj.district}</td>
// //                                             <td className="border p-2">{proj.projectTitle}</td>
// //                                             <td className="border p-2">{proj.projectDescription}</td>
// //                                             <td className="border p-2">
// //                                                 {proj.projectDocument && proj.projectDocument.base64 ? (
// //                                                     <a
// //                                                         href={proj.projectDocument.base64}
// //                                                         target="_blank"
// //                                                         rel="noreferrer"
// //                                                         className="text-blue-600 underline"
// //                                                     >
// //                                                         View
// //                                                     </a>
// //                                                 ) : 'N/A'}
// //                                             </td>
// //                                             <td className="border p-2">{proj.status}</td>
// //                                             <td className="border p-2">{proj.evaluationScore ?? 'Not Scored'}</td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                             </table>
// //                         ) : selectedEvaluator.evaluationStage === 'stage2' ? (
// //                             <p>No projects evaluated yet.</p>
// //                         ) : null}

// //                         <button
// //                             className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
// //                             onClick={() => setSelectedEvaluator(null)}
// //                         >
// //                             Close
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}


// //             {/* Top 10 Evaluators for Stage 3 */}
// //             {filterStage === 'stage3' && (
// //                 <div className="mt-10">
// //                     <h3 className="text-xl font-bold mb-2">🏁 Top 10 Evaluators (Avg Score)</h3>
// //                     <table className="w-full border shadow">
// //                         <thead className="bg-gray-100">
// //                             <tr>
// //                                 <th className="p-2 border">Evaluator</th>
// //                                 <th className="p-2 border">Avg. Score</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {evaluators
// //                                 .filter((ev) => ev.evaluationStage === 'stage3')
// //                                 .map((ev) => ({
// //                                     ...ev,
// //                                     avg: averageScores(ev.evaluatedProjects),
// //                                 }))
// //                                 .sort((a, b) => b.avg - a.avg)
// //                                 .slice(0, 10)
// //                                 .map((ev, index) => (
// //                                     <tr key={index}>
// //                                         <td className="p-2 border">{ev.name}</td>
// //                                         <td className="p-2 border">{ev.avg}</td>
// //                                     </tr>
// //                                 ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default EvaluatorManagement;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const EvaluatorManagement = () => {
//     const [evaluators, setEvaluators] = useState([]);
//     const [selectedEvaluator, setSelectedEvaluator] = useState(null);
//     const [filterStage, setFilterStage] = useState('');
//     const [evaluatedProjectsDetails, setEvaluatedProjectsDetails] = useState([]);

//     useEffect(() => {
//         fetchEvaluators();
//     }, []);

//     const fetchEvaluators = async () => {
//         try {
//             const res = await axios.get('http://localhost:11129/api/admin/evaluators');
//             setEvaluators(res.data);
//         } catch (err) {
//             console.error('Error fetching evaluators:', err);
//         }
//     };

//     // Calculate average score for evaluated projects (stage3)
//     const averageScores = (projects) => {
//         if (!projects || projects.length === 0) return 0;
//         const scores = projects.map(p => p.averageScore || 0);
//         const total = scores.reduce((sum, s) => sum + s, 0);
//         return (total / scores.length).toFixed(2);
//     };

//     // When "View" button is clicked, fetch detailed evaluated projects for that evaluator

//     const handleViewClick = async (evaluator) => {
//         try {
//             const res = await axios.get(`http://localhost:11129/api/admin/${evaluator._id}/evaluated-projects`);

//             const projects = [];
//             res.data.forEach(school => {
//                 school.submissions.forEach(sub => {
//                     // Find evaluator's score from evaluationScores array
//                     const evaluatorScoreObj = sub.evaluationScores?.find(score => score.evaluatorName === evaluator.username);

//                     projects.push({
//                         udiseCode: school.udiseCode,
//                         schoolName: school.schoolName,
//                         district: school.district,
//                         projectTitle: sub.projectDetails?.title || 'No title',
//                         projectDescription: sub.projectDetails?.description || 'No description',
//                         projectDocument: sub.documentFile || null,
//                         status: sub.evaluationStatus || 'N/A',
//                         evaluationScore: evaluatorScoreObj?.score ?? 'Not scored',
//                         averageScore: sub.averageScore ?? 'N/A',  // assuming you add this field later or calculate on backend
//                         _id: sub._id,
//                     });
//                 });
//             });

//             setEvaluatedProjectsDetails(projects);
//             setSelectedEvaluator(evaluator);
//         } catch (error) {
//             console.error('Error fetching evaluated projects:', error);
//         }
//     };


//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Evaluator Management</h2>

//             {/* Filter */}
//             <div className="mb-4">
//                 <label className="mr-2 font-semibold">Filter by Stage:</label>
//                 <select
//                     className="border px-3 py-1 rounded"
//                     value={filterStage}
//                     onChange={(e) => setFilterStage(e.target.value)}
//                 >
//                     <option value="">All</option>
//                     <option value="stage1">Stage 1</option>
//                     <option value="stage2">Stage 2</option>
//                     <option value="stage3">Stage 3</option>
//                 </select>
//             </div>

//             {/* Evaluators Table */}
//             <table className="w-full border shadow-sm rounded mb-8">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="p-2 border">Name</th>
//                         <th className="p-2 border">Email</th>
//                         <th className="p-2 border">Stage</th>
//                         <th className="p-2 border">Status</th>
//                         <th className="p-2 border">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {evaluators
//                         .filter(ev => !filterStage || ev.evaluationStage === filterStage)
//                         .map(ev => (
//                             <tr key={ev._id}>
//                                 <td className="p-2 border">{ev.name}</td>
//                                 <td className="p-2 border">{ev.email}</td>
//                                 <td className="p-2 border">{ev.evaluationStage}</td>
//                                 <td className="p-2 border">{ev.status}</td>
//                                 <td className="p-2 border">
//                                     <button
//                                         onClick={() => handleViewClick(ev)}
//                                         className="bg-blue-500 text-white px-2 py-1 rounded"
//                                     >
//                                         View
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                 </tbody>
//             </table>

//             {/* Evaluator Details Modal */}
//             {selectedEvaluator && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto shadow-lg">
//                         <h3 className="text-xl font-bold mb-2">Evaluator: {selectedEvaluator.name}</h3>
//                         <p><strong>Email:</strong> {selectedEvaluator.email}</p>
//                         <p><strong>Stage:</strong> {selectedEvaluator.evaluationStage}</p>
//                         <p><strong>Status:</strong> {selectedEvaluator.status}</p>

//                         <hr className="my-4" />
//                         <h4 className="text-lg font-semibold mb-2">Evaluated Projects</h4>

//                         {/* Stage 1 View */}
//                         {selectedEvaluator.evaluationStage === 'stage1' && evaluatedProjectsDetails.length > 0 ? (
//                             <table className="w-full border-collapse border">
//                                 <thead>
//                                     <tr>
//                                         <th className="border p-2">UDISE</th>
//                                         <th className="border p-2">School</th>
//                                         <th className="border p-2">District</th>
//                                         <th className="border p-2">Title</th>
//                                         <th className="border p-2">Description</th>
//                                         <th className="border p-2">Document</th>
//                                         <th className="border p-2">Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {evaluatedProjectsDetails.map((proj, idx) => (
//                                         <tr key={idx} className="hover:bg-gray-100">
//                                             <td className="border p-2">{proj.udiseCode}</td>
//                                             <td className="border p-2">{proj.schoolName}</td>
//                                             <td className="border p-2">{proj.district}</td>
//                                             <td className="border p-2">{proj.projectTitle}</td>
//                                             <td className="border p-2">{proj.projectDescription}</td>
//                                             <td className="border p-2">
//                                                 {proj.projectDocument && proj.projectDocument.data ? (
//                                                     <>
//                                                         <a
//                                                             href={proj.projectDocument.data}
//                                                             download={proj.projectDocument.filename}
//                                                             className="text-blue-600 underline hover:text-blue-800 mr-2"
//                                                         >
//                                                             Download
//                                                         </a>
//                                                         <button
//                                                             onClick={() => window.open(proj.projectDocument.data, "_blank")}
//                                                             className="text-green-600 underline hover:text-green-800"
//                                                         >
//                                                             View
//                                                         </button>
//                                                     </>
//                                                 ) : (
//                                                     'N/A'
//                                                 )}
//                                             </td>
//                                             <td className="border p-2">{proj.status}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         ) : selectedEvaluator.evaluationStage === 'stage1' ? (
//                             <p>No projects evaluated yet.</p>
//                         ) : null}

//                         {/* Stage 2 View */}
//                         {selectedEvaluator.evaluationStage === 'stage2' && evaluatedProjectsDetails.length > 0 ? (
//                             <table className="w-full border-collapse border mt-4">
//                                 <thead>
//                                     <tr>
//                                         <th className="border p-2">UDISE</th>
//                                         <th className="border p-2">School</th>
//                                         <th className="border p-2">District</th>
//                                         <th className="border p-2">Title</th>
//                                         <th className="border p-2">Description</th>
//                                         <th className="border p-2">Document</th>
//                                         <th className="border p-2">Status</th>
//                                         <th className="border p-2">Score</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {evaluatedProjectsDetails.map((proj, idx) => (
//                                         <tr key={idx} className="hover:bg-gray-100">
//                                             <td className="border p-2">{proj.udiseCode}</td>
//                                             <td className="border p-2">{proj.schoolName}</td>
//                                             <td className="border p-2">{proj.district}</td>
//                                             <td className="border p-2">{proj.projectTitle}</td>
//                                             <td className="border p-2">{proj.projectDescription}</td>
//                                             <td className="border p-2">
//                                                 {proj.projectDocument && proj.projectDocument.data ? (
//                                                     <>
//                                                         <a
//                                                             href={proj.projectDocument.data}
//                                                             download={proj.projectDocument.filename}
//                                                             className="text-blue-600 underline hover:text-blue-800 mr-2"
//                                                         >
//                                                             Download
//                                                         </a>
//                                                         <button
//                                                             onClick={() => window.open(proj.projectDocument.data, "_blank")}
//                                                             className="text-green-600 underline hover:text-green-800"
//                                                         >
//                                                             View
//                                                         </button>
//                                                     </>
//                                                 ) : (
//                                                     'N/A'
//                                                 )}
//                                             </td>
//                                             <td className="border p-2">{proj.status}</td>
//                                             <td className="border p-2">{proj.evaluationScore ?? 'Not Scored'}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         ) : selectedEvaluator.evaluationStage === 'stage2' ? (
//                             <p>No projects evaluated yet.</p>
//                         ) : null}

//                         <button
//                             className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
//                             onClick={() => setSelectedEvaluator(null)}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}


//             {filterStage === 'stage3' && (
//                 <div className="mt-10">
//                     <h3 className="text-xl font-bold mb-2">🏁 Top 10 Evaluators (Avg Score)</h3>
//                     <table className="w-full border shadow mb-6">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="p-2 border">Evaluator</th>
//                                 <th className="p-2 border">Avg. Score</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {evaluators
//                                 .filter((ev) => ev.evaluationStage === 'stage3')
//                                 .map((ev) => ({
//                                     ...ev,
//                                     avg: averageScores(ev.evaluatedProjects ?? []),
//                                 }))
//                                 .sort((a, b) => b.avg - a.avg)
//                                 .slice(0, 10)
//                                 .map((ev, index) => (
//                                     <tr key={index}>
//                                         <td className="p-2 border">{ev.name}</td>
//                                         <td className="p-2 border">{ev.avg.toFixed(2)}</td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>

//                     {evaluators
//                         .filter((ev) => ev.evaluationStage === 'stage3')
//                         .map((ev) => ({
//                             ...ev,
//                             avg: averageScores(ev.evaluatedProjects ?? []),
//                         }))
//                         .sort((a, b) => b.avg - a.avg)
//                         .slice(0, 10)
//                         .map((ev, idx) => (
//                             <div key={`projects-${idx}`} className="mb-8">
//                                 <h4 className="font-semibold text-lg mb-2">{ev.name}'s Winning/Runner Projects</h4>
//                                 {ev.evaluatedProjects && ev.evaluatedProjects.length > 0 ? (
//                                     <table className="w-full border shadow">
//                                         <thead className="bg-gray-100">
//                                             <tr>
//                                                 <th className="p-2 border">Project Title</th>
//                                                 <th className="p-2 border">Status</th>
//                                                 <th className="p-2 border">Average Score</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {ev.evaluatedProjects
//                                                 .filter((proj) => proj.status === 'winner' || proj.status === 'runner')
//                                                 .map((proj, i) => (
//                                                     <tr key={i} className="hover:bg-gray-100">
//                                                         <td className="p-2 border">{proj.projectTitle}</td>
//                                                         <td className="p-2 border">{proj.status}</td>
//                                                         <td className="p-2 border">{proj.averageScore ?? 'N/A'}</td>
//                                                     </tr>
//                                                 ))}
//                                             {ev.evaluatedProjects.filter((proj) => proj.status === 'winner' || proj.status === 'runner').length === 0 && (
//                                                 <tr>
//                                                     <td className="p-2 border text-center" colSpan={3}>
//                                                         No winning or runner projects.
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 ) : (
//                                     <p>No projects available.</p>
//                                 )}
//                             </div>
//                         ))}
//                 </div>
//             )}


//         </div>
//     );
// };

// export default EvaluatorManagement;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvaluatorManagement = () => {
    const [evaluators, setEvaluators] = useState([]);
    const [selectedEvaluator, setSelectedEvaluator] = useState(null);
    const [filterStage, setFilterStage] = useState('');
    const [evaluatedProjectsDetails, setEvaluatedProjectsDetails] = useState([]);

    useEffect(() => {
        fetchEvaluators();
    }, []);

    const fetchEvaluators = async () => {
        try {
            const res = await axios.get('http://localhost:11129/api/admin/evaluators');
            setEvaluators(res.data);
        } catch (err) {
            console.error('Error fetching evaluators:', err);
        }
    };

    const handleDownload = (base64Data, filename) => {
        if (!base64Data) {
            alert("No file to download");
            return;
        }

        const base64Str = String(base64Data); // ensure it's a string

        // Add prefix only if needed
        const dataUrl = base64Str.startsWith("data:")
            ? base64Str
            : `data:application/octet-stream;base64,${base64Str}`;

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = filename || "document";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };




    const averageScores = (projects) => {
        if (!projects || projects.length === 0) return 0;
        const scores = projects.map(p => p.averageScore || 0);
        const total = scores.reduce((sum, s) => sum + s, 0);
        return (total / scores.length).toFixed(2);
    };

    const handleViewClick = async (evaluator) => {
        try {
            const res = await axios.get(`http://localhost:11129/api/admin/${evaluator._id}/evaluated-projects`);
   

            const projects = [];
            res.data.forEach(school => {
                school.submissions.forEach(sub => {
                    const evaluatorScoreObj = sub.evaluationScores?.find(score => score.evaluatorName === evaluator.username);

                    projects.push({
                        udiseCode: school.udiseCode,
                        schoolName: school.schoolName,
                        district: school.district,
                        projectTitle: sub.projectDetails?.title || 'No title',
                        projectDescription: sub.projectDetails?.description || 'No description',
                        projectDocument: sub.documentFile || null,
                        status: sub.evaluationStatus || 'N/A',
                        evaluationScore: evaluatorScoreObj?.score ?? ' - ',
                        averageScore: sub.averageScore ?? 0,
                        _id: sub._id,
                    });
                });
            });
           
            setEvaluatedProjectsDetails(projects);
            setSelectedEvaluator(evaluator);
        } catch (error) {
            console.error('Error fetching evaluated projects:', error);
        }
    };

    const getTopEvaluators = () => {
        const stage3Evaluators = evaluators.filter(ev => ev.evaluationStage === 'stage3');
        const ranked = stage3Evaluators.map(ev => {
            const scoreList = ev.evaluatedProjects?.map(p => p.averageScore || 0) || [];
            const total = scoreList.reduce((sum, s) => sum + s, 0);
            const avg = scoreList.length ? total / scoreList.length : 0;
            return { ...ev, avgScore: avg.toFixed(2) };
        });

        return ranked
            .sort((a, b) => b.avgScore - a.avgScore)
            .slice(0, 10);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Evaluator Management</h2>

            {/* Filter */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by Stage:</label>
                <select
                    className="border px-3 py-1 rounded"
                    value={filterStage}
                    onChange={(e) => setFilterStage(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="stage1">Stage 1</option>
                    <option value="stage2">Stage 2</option>
                    <option value="stage3">Stage 3</option>
                </select>
            </div>

            {/* Evaluators Table */}
            <table className="w-full border shadow-sm rounded mb-8">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Stage</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluators
                        .filter(ev => !filterStage || ev.evaluationStage === filterStage)
                        .map(ev => (
                            <tr key={ev._id}>
                                <td className="p-2 border">{ev.name}</td>
                                <td className="p-2 border">{ev.email}</td>
                                <td className="p-2 border">{ev.evaluationStage}</td>
                                <td className="p-2 border">{ev.status}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleViewClick(ev)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Evaluator Modal */}
            {selectedEvaluator && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-[95%] md:w-[70%] max-h-[90vh] overflow-y-auto shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Evaluator: {selectedEvaluator.name}</h3>
                        <p><strong>Email:</strong> {selectedEvaluator.email}</p>
                        <p><strong>Stage:</strong> {selectedEvaluator.evaluationStage}</p>
                        <p><strong>Status:</strong> {selectedEvaluator.status}</p>

                        <hr className="my-4" />
                        <h4 className="text-lg font-semibold mb-2">Evaluated Projects</h4>

                        {/* Shared Project Table */}
                        <table className="w-full border-collapse border mt-2">
                            <thead>
                                <tr>
                                    <th className="border p-2">UDISE</th>
                                    <th className="border p-2">School</th>
                                    <th className="border p-2">District</th>
                                    <th className="border p-2">Title</th>
                                    <th className="border p-2">Description</th>
                                    <th className="border p-2">Document</th>
                                    <th className="border p-2">Status</th>
                                    {selectedEvaluator.evaluationStage !== 'stage1' && (
                                        <>
                                            <th className="border p-2">Score</th>
                                            {selectedEvaluator.evaluationStage === 'stage3' && (
                                                <th className="border p-2">Avg Score</th>
                                            )}
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {evaluatedProjectsDetails.length > 0 ? (
                                    evaluatedProjectsDetails.map((proj, idx) => (
                                        <tr key={idx} className="hover:bg-gray-100">
                                            <td className="border p-2">{proj.udiseCode}</td>
                                            <td className="border p-2">{proj.schoolName}</td>
                                            <td className="border p-2">{proj.district}</td>
                                            <td className="border p-2">{proj.projectTitle}</td>
                                            <td className="border p-2">{proj.projectDescription}</td>
                                            <td className="border p-2">
                                                {/* {proj.projectDocument?.data ? (
                                                    <>
                                                        <a
                                                            href={proj.projectDocument.data}
                                                            download={proj.projectDocument.filename}
                                                            className="text-blue-600 underline hover:text-blue-800 mr-2"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => window.open(proj.projectDocument.data, "_blank")}
                                                            className="text-green-600 underline hover:text-green-800"
                                                        >
                                                            View
                                                        </button>
                                                    </>
                                                ) : 'N/A'} */}
                                                <button
                                                    onClick={() =>
                                                        handleDownload(proj.projectDocument.data, proj.projectDocument.filename)
                                                    }
                                                    className="text-blue-600 underline mr-2"
                                                >
                                                    Download
                                                </button>


                                            </td>
                                            <td className="border p-2">{proj.status}</td>
                                            {selectedEvaluator.evaluationStage !== 'stage1' && (
                                                <>
                                                    <td className="border p-2">{proj.evaluationScore}</td>
                                                    {selectedEvaluator.evaluationStage === 'stage3' && (
                                                        <td className="border p-2">{proj.averageScore}</td>
                                                    )}
                                                </>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={9} className="p-4 text-center">No projects evaluated yet.</td></tr>
                                )}
                            </tbody>
                        </table>

                        <button
                            className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
                            onClick={() => setSelectedEvaluator(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Top 10 Evaluators for Stage 3 */}
            {filterStage === 'stage3' && (
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-2">🏁 Top 10 Evaluators (Avg Score)</h3>
                    <table className="w-full border shadow mb-6">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Evaluator</th>
                                <th className="p-2 border">Avg. Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getTopEvaluators().map((ev, index) => (
                                <tr key={index}>
                                    <td className="p-2 border">{ev.name}</td>
                                    <td className="p-2 border">{ev.avgScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EvaluatorManagement;
