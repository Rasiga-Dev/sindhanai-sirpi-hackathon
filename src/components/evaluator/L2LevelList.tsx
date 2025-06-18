// import React from 'react'

// const L2LevelList = () => {
//   return (
//     <div>L2LevelList</div>
//   )
// }

// export default L2LevelList


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BMCLayout from '../BMCLayout';


export default function L2LevelList({ projects, username }) {
        const [isLoading, setIsLoading] = useState(false);
   
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
  
 const [projectList, setProjectList] = useState([]);


 useEffect(() => {
        setProjectList(projects); // ✅ Sync when props change
       
    }, [projects]);


    const openModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProject(null);
    };
    
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Level 2 scored Projects List</h2>


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
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded">
                    <table className="w-full table-auto border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">School ID</th>
                                <th className="p-2 border">Project ID</th>
                                <th className="p-2 border">Project Title</th>
                                <th className="p-2 border">Project Description</th>
                                <th className="p-2 border">Project Statement</th>
                                <th className="p-2 border">Solution</th>
                                <th className="p-2 border">BMC Details</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Status Reason</th>
                                <th className="p-2 border">Score</th>


                            </tr>
                        </thead>
                        <tbody>
                            {projectList.map((project, index) => (
                                <tr key={project.projectId} className="text-center align-top">
                                    <td className="p-2 border">{index + 1}</td>
                                    <td className="p-2 border break-words">{project.schoolId}</td>
                                    <td className="p-2 border break-words">{project.projectId}</td>
                                    <td className="p-2 border break-words">{project.projectTitle}</td>
                                    <td className="p-2 border break-words">{project.projectDescription}</td>
                                    <td className="p-2 border break-words">{project.problemStatement}</td>
                                    <td className="p-2 border break-words">{project.solution}</td>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => openModal(project)}
                                            className="text-blue-600 underline hover:text-blue-800"
                                        >
                                            View BMC
                                        </button>
                                    </td>
                                    <td className="p-2 border">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold 
      ${project.evaluationStatus === 'Evaluated' ? 'bg-green-100 text-green-800' : ''}
      ${project.evaluationStatus === 'accept' ? 'bg-yellow-100 text-yellow-800' : ''}
      ${project.evaluationStatus === 'reject' ? 'bg-red-100 text-red-800' : ''}
      ${!['Evaluated', 'Pending', 'Rejected'].includes(project.evaluationStatus) ? 'bg-gray-100 text-gray-800' : ''}
    `}
                                        >
                                            {project.evaluationStatus}
                                        </span>
                                    </td>

                                    <td className="p-2 border">
                                        {project.statusReason}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {project.evaluationScore ? (
                                            <>
                                                <div>{project.evaluationScore.score}</div>
                                                {/* <div>Status: {project.evaluationScore.status}</div>
                                                <div>
                                                    Evaluated At:{' '}
                                                    {new Date(project.evaluationScore.evaluatedAt).toLocaleString()}
                                                </div> */}
                                            </>
                                        ) : (
                                            <div className="text-gray-500 italic">No score given yet</div>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
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
