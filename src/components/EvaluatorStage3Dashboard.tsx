


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { School, LogOut, ArrowUp, ArrowDown } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';

// // const EvaluatorStage3Dashboard = () => {
// //     const [projects, setProjects] = useState([]);
// //     const [sortOrder, setSortOrder] = useState('asc');
// //     const navigate = useNavigate();

// //     const fetchProjects = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:11129/api/evaluator/getAcceptedEvaluatedProjects');
// //             setProjects(response.data.data);
// //         } catch (error) {
// //             console.error('Error fetching projects:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchProjects();
// //     }, []);

// //     const handleAccept = (schoolId, projectId) => {
// //         handleSubmit(schoolId, projectId, 'accept');
// //     };

// //     const handleReject = (schoolId, projectId) => {
// //         handleSubmit(schoolId, projectId, 'reject');
// //     };

// //     const handleSubmit = async (schoolId, projectId, status) => {
// //         try {
// //             const response = await axios.post('http://localhost:11129/api/evaluator/update-winner', {
// //                 schoolId,
// //                 projectId,
// //                 status // 'accept' or 'reject'
// //             });

// //             if (response.data.success) {
// //                 alert(`Status updated to ${status === 'accept' ? 'Winner' : 'Runner'}`);
// //                 fetchProjects(); // Refresh
// //             } else {
// //                 alert('Failed to submit: ' + response.data.message);
// //             }
// //         } catch (error) {
// //             console.error('Submit error:', error);
// //             alert('Server error. Try again later.');
// //         }
// //     };



// //     const handleLogout = () => {
// //         navigate('/evaluator-login');
// //     };

// //     const toggleSortOrder = () => {
// //         setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
// //     };

// //     const sortedProjects = [...projects].sort((a, b) => {
// //         const scoreA = a.averageScore ?? 0;
// //         const scoreB = b.averageScore ?? 0;
// //         return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
// //     });

// //     return (
// //         <div className="p-6">
// //             <div className="bg-red-800 px-4 py-4 sm:px-10">
// //                 <div className="flex justify-between items-center">
// //                     <h1 className="text-2xl font-bold text-white flex items-center gap-2">
// //                         <School className="w-6 h-6" />
// //                         Stage-3 Evaluator Dashboard
// //                     </h1>
// //                     <button
// //                         onClick={handleLogout}
// //                         className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
// //                     >
// //                         <LogOut className="w-4 h-4" />
// //                         Logout
// //                     </button>
// //                 </div>
// //             </div>

// //             {/* Table */}
// //             {sortedProjects.length === 0 ? (
// //                 <p className="text-center text-gray-500 mt-10">No projects found.</p>
// //             ) : (
// //                 <div className="table-responsive mt-6">
// //                     <table className="table table-striped table-bordered w-full">
// //                         <thead className="bg-gray-400 text-white">
// //                             <tr>
// //                                 <th className="px-4 py-2 border">School ID</th>
// //                                 <th className="px-4 py-2 border">Project ID</th>
// //                                 <th className="px-4 py-2 border">Title</th>
// //                                 <th className="px-4 py-2 border">Description</th>
// //                                 <th className="px-4 py-2 border">Document</th>
// //                                 <th className="px-4 py-2 border">Eval. Status</th>
// //                                 <th className="px-4 py-2 border">Reason</th>
// //                                 <th className="px-4 py-2 border cursor-pointer" onClick={toggleSortOrder}>
// //                                     <div className="flex items-center justify-center gap-1">
// //                                         Avg Score
// //                                         {sortOrder === 'asc' ? <ArrowUp size={30} /> : <ArrowDown size={30} />}
// //                                     </div>
// //                                 </th>
// //                                 <th className="px-4 py-2 border">Action</th>
// //                                 <th className="px-4 py-2 border">Submit</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {sortedProjects.map((proj, idx) => (
// //                                 <tr key={idx}>
// //                                     <td className="border px-2 py-1">{proj.schoolId}</td>
// //                                     <td className="border px-2 py-1">{proj.projectId}</td>
// //                                     <td className="border px-2 py-1">{proj.projectTitle}</td>
// //                                     <td className="border px-2 py-1">{proj.projectDescription}</td>
// //                                     <td className="border px-2 py-1">
// //                                         {proj.projectDocument ? (
// //                                             <a
// //                                                 href={`/uploads/${proj.projectDocument}`}
// //                                                 target="_blank"
// //                                                 rel="noopener noreferrer"
// //                                                 className="text-blue-600 underline"
// //                                             >
// //                                                 View
// //                                             </a>
// //                                         ) : (
// //                                             'No File'
// //                                         )}
// //                                     </td>
// //                                     <td className="border px-2 py-1">{proj.evaluationStatus}</td>
// //                                     <td className="border px-2 py-1">{proj.evaluationReason}</td>
// //                                     <td className="border px-2 py-1">{proj.averageScore}</td>
// //                                     <td className="border px-2 py-1">
// //                                         <select
// //                                             className="form-control"
// //                                             onChange={(e) => {
// //                                                 const value = e.target.value;
// //                                                 if (value === 'accept') handleAccept(proj.schoolId, proj.projectId);
// //                                                 else if (value === 'reject') handleReject(proj.schoolId, proj.projectId);
// //                                             }}
// //                                             defaultValue=""
// //                                         >
// //                                             <option value="" disabled>Select</option>
// //                                             <option value="accept">Accept</option>
// //                                             <option value="reject">Reject</option>
// //                                         </select>
// //                                     </td>
// //                                     <td className="border px-2 py-1">
// //                                         <button
// //                                             onClick={() => handleSubmit(proj.schoolId, proj.projectId)}
// //                                             className="btn btn-primary btn-sm"
// //                                         >
// //                                             Submit
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default EvaluatorStage3Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { School, LogOut, ArrowUp, ArrowDown } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const EvaluatorStage3Dashboard = () => {
//     const [projects, setProjects] = useState([]);
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [selectedStatus, setSelectedStatus] = useState({});
//     const navigate = useNavigate();

//     const fetchProjects = async () => {
//         try {
//             const response = await axios.get('http://localhost:11129/api/evaluator/getAcceptedEvaluatedProjects');
//             setProjects(response.data.data);
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//         }
//     };

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const handleSubmit = async (schoolId, projectId, status) => {
//         try {
//             const response = await axios.post('http://localhost:11129/api/evaluator/update-winner', {
//                 schoolId,
//                 projectId,
//                 status // 'accept' or 'reject'
//             });

//             if (response.data.success) {
//                 alert(`Status updated to ${status === 'accept' ? 'Winner' : 'Runner'}`);
//                 fetchProjects(); // Refresh data
//                 setSelectedStatus((prev) => {
//                     const newStatus = { ...prev };
//                     delete newStatus[`${schoolId}-${projectId}`];
//                     return newStatus;
//                 });
//             } else {
//                 alert('Failed to submit: ' + response.data.message);
//             }
//         } catch (error) {
//             console.error('Submit error:', error);
//             alert('Server error. Try again later.');
//         }
//     };

//     const handleLogout = () => {
//         navigate('/evaluator-login');
//     };

//     const toggleSortOrder = () => {
//         setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
//     };

//     const sortedProjects = [...projects].sort((a, b) => {
//         const scoreA = a.averageScore ?? 0;
//         const scoreB = b.averageScore ?? 0;
//         return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
//     });

//     return (
//         <div className="p-6">
//             <div className="bg-red-800 px-4 py-4 sm:px-10">
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//                         <School className="w-6 h-6" />
//                         Stage-3 Evaluator Dashboard
//                     </h1>
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
//                     >
//                         <LogOut className="w-4 h-4" />
//                         Logout
//                     </button>
//                 </div>
//             </div>

//             {sortedProjects.length === 0 ? (
//                 <p className="text-center text-gray-500 mt-10">No projects found.</p>
//             ) : (
//                 <div className="table-responsive mt-6">
//                     <table className="table table-striped table-bordered w-full">
//                         <thead className="bg-gray-400 text-white">
//                             <tr>
//                                 <th className="px-4 py-2 border">School ID</th>
//                                 <th className="px-4 py-2 border">Project ID</th>
//                                 <th className="px-4 py-2 border">Title</th>
//                                 <th className="px-4 py-2 border">Description</th>
//                                 <th className="px-4 py-2 border">Document</th>
//                                 <th className="px-4 py-2 border">Eval. Status</th>
//                                 <th className="px-4 py-2 border">Reason</th>
//                                 <th className="px-4 py-2 border cursor-pointer" onClick={toggleSortOrder}>
//                                     <div className="flex items-center justify-center gap-1">
//                                         Avg Score
//                                         {sortOrder === 'asc' ? <ArrowUp size={30} /> : <ArrowDown size={30} />}
//                                     </div>
//                                 </th>
//                                 <th className="px-4 py-2 border">Action</th>
//                                 <th className="px-4 py-2 border">Submit</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {sortedProjects.map((proj, idx) => {
//                                 const key = `${proj.schoolId}-${proj.projectId}`;
//                                 const currentStatus = selectedStatus[key] || "";

//                                 return (
//                                     <tr key={idx}>
//                                         <td className="border px-2 py-1">{proj.schoolId}</td>
//                                         <td className="border px-2 py-1">{proj.projectId}</td>
//                                         <td className="border px-2 py-1">{proj.projectTitle}</td>
//                                         <td className="border px-2 py-1">{proj.projectDescription}</td>
//                                         <td className="border px-2 py-1">
//                                             {proj.projectDocument ? (
//                                                 <a
//                                                     href={`/uploads/${proj.projectDocument}`}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-blue-600 underline"
//                                                 >
//                                                     View
//                                                 </a>
//                                             ) : (
//                                                 'No File'
//                                             )}
//                                         </td>
//                                         <td className="border px-2 py-1">{proj.evaluationStatus}</td>
//                                         <td className="border px-2 py-1">{proj.evaluationReason}</td>
//                                         <td className="border px-2 py-1">{proj.averageScore}</td>
//                                         <td className="border px-2 py-1">
//                                             <select
//                                                 className="form-control"
//                                                 value={currentStatus}
//                                                 onChange={(e) => {
//                                                     const value = e.target.value;
//                                                     setSelectedStatus((prev) => ({
//                                                         ...prev,
//                                                         [key]: value
//                                                     }));
//                                                 }}
//                                             >
//                                                 <option value="" disabled>Select</option>
//                                                 <option value="accept">Accept</option>
//                                                 <option value="reject">Reject</option>
//                                             </select>
//                                         </td>
//                                         <td className="border px-2 py-1">
//                                             <button
//                                                 onClick={() => {
//                                                     if (!currentStatus) {
//                                                         alert("Please select Accept or Reject before submitting.");
//                                                         return;
//                                                     }
//                                                     handleSubmit(proj.schoolId, proj.projectId, currentStatus);
//                                                 }}
//                                                 className="btn btn-primary btn-sm"
//                                             >
//                                                 Submit
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EvaluatorStage3Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { School, LogOut, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EvaluatorStage3Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedStatus, setSelectedStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            setLoading(true); // start loader
            const response = await axios.get('http://localhost:11129/api/evaluator/getAcceptedEvaluatedProjects');
            setProjects(response.data.data);
            setLoading(false); // stop loader
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false); // stop loader
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (schoolId, projectId, status) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:11129/api/evaluator/update-winner', {
                schoolId,
                projectId,
                status
            });

            if (response.data.success) {
                alert(`Status updated to ${status === 'accept' ? 'Winner' : 'Runner'}`);
                await fetchProjects();
                setSelectedStatus((prev) => {
                    const newStatus = { ...prev };
                    delete newStatus[`${schoolId}-${projectId}`];
                    return newStatus;
                });
            } else {
                alert('Failed to submit: ' + response.data.message);
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Server error. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        navigate('/evaluator-login');
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const sortedProjects = [...projects].sort((a, b) => {
        const scoreA = a.averageScore ?? 0;
        const scoreB = b.averageScore ?? 0;
        return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
    });

    return (
        <div className="p-6">
            <div className="bg-red-800 px-4 py-4 sm:px-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <School className="w-6 h-6" />
                        Stage-3 Evaluator Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center mt-10 text-lg font-semibold text-gray-600">
                    Loading data... Please wait.
                </div>
            ) : projects.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No projects found.</p>
            ) : (
                <div className="table-responsive mt-6">
                    <table className="table table-striped table-bordered w-full">
                        <thead className="bg-gray-400 text-white">
                            <tr>
                                <th className="px-4 py-2 border">School ID</th>
                                <th className="px-4 py-2 border">Project ID</th>
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">Description</th>
                                <th className="px-4 py-2 border">Document</th>
                                <th className="px-4 py-2 border">Eval. Status</th>
                                <th className="px-4 py-2 border">Reason</th>
                                <th className="px-4 py-2 border cursor-pointer" onClick={toggleSortOrder}>
                                    <div className="flex items-center justify-center gap-1">
                                        Avg Score
                                        {sortOrder === 'asc' ? <ArrowUp size={30} /> : <ArrowDown size={30} />}
                                    </div>
                                </th>
                                <th className="px-4 py-2 border">Action</th>
                                <th className="px-4 py-2 border">Submit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProjects.map((proj, idx) => {
                                const key = `${proj.schoolId}-${proj.projectId}`;
                                const currentStatus = selectedStatus[key] || "";

                                return (
                                    <tr key={idx}>
                                        <td className="border px-2 py-1">{proj.schoolId}</td>
                                        <td className="border px-2 py-1">{proj.projectId}</td>
                                        <td className="border px-2 py-1">{proj.projectTitle}</td>
                                        <td className="border px-2 py-1">{proj.projectDescription}</td>
                                        <td className="border px-2 py-1">
                                            {proj.projectDocument ? (
                                                <a
                                                    href={`/uploads/${proj.projectDocument}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    View
                                                </a>
                                            ) : (
                                                'No File'
                                            )}
                                        </td>
                                        <td className="border px-2 py-1">{proj.evaluationStatus}</td>
                                        <td className="border px-2 py-1">{proj.evaluationReason}</td>
                                        <td className="border px-2 py-1">{proj.averageScore}</td>
                                        <td className="border px-2 py-1">
                                            <select
                                                className="form-control"
                                                value={currentStatus}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSelectedStatus((prev) => ({
                                                        ...prev,
                                                        [key]: value
                                                    }));
                                                }}
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="accept">Accept</option>
                                                <option value="reject">Reject</option>
                                            </select>
                                        </td>
                                        <td className="border px-2 py-1">
                                            <button
                                                onClick={() => {
                                                    if (!currentStatus) {
                                                        alert("Please select Accept or Reject before submitting.");
                                                        return;
                                                    }
                                                    handleSubmit(proj.schoolId, proj.projectId, currentStatus);
                                                }}
                                                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                                            >
                                                Submit
                                            </button>

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EvaluatorStage3Dashboard;
