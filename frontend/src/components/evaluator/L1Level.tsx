
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BMCLayout from '../BMCLayout';


export default function L1Level({ projects, onStatusChange, username, refreshL2List, refreshProjects, refreshLevel1List }) {
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectList, setProjectList] = useState([]);


    const [summary, setSummary] = useState({
        total: 0,
        accepted: 0,
        rejected: 0,
        pending: 0,
    });

    useEffect(() => {
        setProjectList(projects); // ✅ Sync when props change
        fetchSummary();
    }, [projects]);


    const fetchSummary = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('evaluatorToken');
            const response = await axios.get('http://localhost:11129/api/evaluator/level-1-summary', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSummary(response.data);
        } catch (err) {
            console.error('Summary fetch error:', err);
        } finally {
            setIsLoading(false); // end loading
        }
    };



    const openModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    const handleEvaluate = async (project) => {
        if (!project.status) {
            alert('Please select a status (accept or reject).');
            return;
        }

        try {
            const payload = {
                schoolId: project.schoolId,
                projectId: project.projectId,
                status: project.status,
                reason: project.reason || '',
                evaluatedBy: username,
            };

            await axios.post('http://localhost:11129/api/evaluator/evaluate-project', payload);
            alert('Project evaluated successfully!');

            // Remove project locally to hide it immediately:
            setProjectList(prev => prev.filter(p => p.projectId !== project.projectId));

            // Optionally also refresh projects from server:
            // if (refreshProjects) {
            //     refreshProjects();
            // }

            refreshProjects(); // if needed
            refreshLevel1List(); // 👈 this ensures L1 Level List updates
            refreshL2List(); // 👈 this ensures L2 Level List updates
        } catch (error) {
            console.error('Evaluation error:', error);
            alert('Failed to evaluate project.');
        }
    };

    const handleSkip = async (project) => {
        try {
            const token = localStorage.getItem('evaluatorToken');

            await axios.post('http://localhost:11129/api/evaluator/skip-project', {
                projectId: project.projectId,
                evaluatorId: username // or pass evaluator _id if needed
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Project skipped and reassigned!');
            setProjects(prev => prev.filter(p => p.projectId !== project.projectId));

            if (refreshProjects) refreshProjects();

        } catch (error) {
            console.error('Skip error:', error);
            alert('Failed to skip project');
        }
    };






    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Level 1 Assigned Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
                <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-semibold text-blue-800">Total Evaluate Projects</h3>
                    <p className="text-3xl font-bold text-blue-900">{summary.total}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-semibold text-green-800">Accepted Projects</h3>
                    <p className="text-3xl font-bold text-green-900">{summary.accepted}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-semibold text-red-800">Rejected Projects</h3>
                    <p className="text-3xl font-bold text-red-900">{summary.rejected}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-semibold text-yellow-800">Pending Projects</h3>
                    <p className="text-3xl font-bold text-yellow-900">{summary.pending}</p>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10 text-lg font-medium text-gray-600">
                    Loading projects...
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-800"></div>
                    </div>
                </div>
            ) : projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                // <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded">
                //     <table className="w-full table-auto border border-gray-300">
                //         <thead>
                //             <tr className="bg-gray-200">
                //                 <th className="p-2 border">#</th>
                //                 <th className="p-2 border">School ID</th>
                //                 <th className="p-2 border">Project ID</th>
                //                 <th className="p-2 border">Project Title</th>
                //                 <th className="p-2 border">Project Description</th>
                //                 <th className="p-2 border">Project Statement</th>
                //                 <th className="p-2 border">Solution</th>
                //                 <th className="p-2 border">BMC Details</th>
                //                 <th className="p-2 border">Status</th>
                //                 <th className="p-2 border">Status Reason</th>
                //                 <th className="p-2 border">Actions</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {projectList.map((project, index) => (

                //                 <tr key={project.projectId} className="text-center align-top">
                //                     <td className="p-2 border">{index + 1}</td>
                //                     <td className="p-2 border break-words">{project.schoolId}</td>
                //                     <td className="p-2 border break-words">{project.projectId}</td>
                //                     <td className="p-2 border break-words">{project.projectTitle}</td>
                //                     <td className="p-2 border break-words">{project.projectDescription}</td>
                //                     <td className="p-2 border break-words">{project.problemStatement}</td>
                //                     <td className="p-2 border break-words">{project.solution}</td>
                //                     <td className="p-2 border">
                //                         <button
                //                             onClick={() => openModal(project)}
                //                             className="text-blue-600 underline hover:text-blue-800"
                //                         >
                //                             View BMC
                //                         </button>
                //                     </td>
                //                     <td className="p-2 border">
                //                         <select
                //                             value={project.status || ''}
                //                             onChange={(e) => {
                //                                 const updated = [...projectList];
                //                                 updated[index].status = e.target.value;
                //                                 setProjectList(updated);
                //                             }}

                //                             className="border px-2 py-1 rounded"
                //                         >
                //                             <option value="">Select</option>
                //                             <option value="accept">Accept</option>
                //                             <option value="reject">Reject</option>
                //                         </select>
                //                     </td>


                //                     {/* ✅ New Column: Status Reason Textarea */}
                //                     <td className="p-2 border">
                //                         <textarea
                //                             rows="2"
                //                             className="w-48 h-25 border rounded px-2 py-1"
                //                             placeholder="Enter reason"
                //                             value={project.reason || ''}
                //                             onChange={(e) => {
                //                                 const updated = [...projectList];
                //                                 updated[index].reason = e.target.value;
                //                                 setProjectList(updated);
                //                             }}

                //                         />
                //                     </td>

                //                     <td className="p-2 border">
                //                         <button
                //                             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                //                             onClick={() => handleEvaluate(project)}

                //                         >
                //                             Evaluate
                //                         </button>
                //                         {/* <button
                //                             className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                //                             onClick={() => handleSkip(projectList[index])}
                //                         >
                //                             Skip
                //                         </button> */}


                //                     </td>
                //                 </tr>
                //             ))}
                //         </tbody>

                //     </table>
                // </div>
                <div className="grid gap-4 max-h-[500px] overflow-y-auto p-4">
                    {projectList.map((project, index) => (
                        <div
                            key={project.projectId}
                            className="border rounded-xl shadow-md p-4 bg-white space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {index + 1}. {project.projectTitle}
                                    </h2>
                                    <p className="text-sm text-gray-500">Project ID: {project.projectId}</p>
                                    <p className="text-sm text-gray-500">School ID: {project.schoolId}</p>
                                </div>
                                <button
                                    onClick={() => handleEvaluate(project)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Evaluate
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <p className="text-gray-700 font-medium">Description:</p>
                                    <p className="text-gray-600 text-sm">{project.projectDescription}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Problem Statement:</p>
                                    <p className="text-gray-600 text-sm">{project.problemStatement}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Solution:</p>
                                    <p className="text-gray-600 text-sm">{project.solution}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">BMC Details:</p>
                                    <button
                                        onClick={() => openModal(project)}
                                        className="text-blue-600 underline hover:text-blue-800 text-sm"
                                    >
                                        View BMC
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 items-center">
                                <div>
                                    <label className="text-gray-700 font-medium">Status:</label>
                                    <select
                                        value={project.status || ''}
                                        onChange={(e) => {
                                            const updated = [...projectList];
                                            updated[index].status = e.target.value;
                                            setProjectList(updated);
                                        }}
                                        className="border w-full px-3 py-2 mt-1 rounded"
                                    >
                                        <option value="">Select</option>
                                        <option value="accept">Accept</option>
                                        <option value="reject">Reject</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-700 font-medium">Reason:</label>
                                    <textarea
                                        rows="2"
                                        className="w-full border rounded px-3 py-2 mt-1"
                                        placeholder="Enter reason"
                                        value={project.reason || ''}
                                        onChange={(e) => {
                                            const updated = [...projectList];
                                            updated[index].reason = e.target.value;
                                            setProjectList(updated);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <BMCLayout
                            bmcDetails={selectedProject.bmcDetails}
                            schoolId={selectedProject.schoolId}
                            projectId={selectedProject.projectId}
                            projectTitle={selectedProject.projectTitle}
                            projectDescription={selectedProject.projectDescription}
                            projectProblemStatement={selectedProject.problemStatement}
                            projectSolution={selectedProject.solution}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
