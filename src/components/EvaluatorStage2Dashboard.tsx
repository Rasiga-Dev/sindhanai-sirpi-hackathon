

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // interface EvaluationScore {
// //     evaluatorName: string;
// //     status: string;
// //     score?: number;
// // }

// // interface Project {
// //     _id: string;
// //     schoolId: string;
// //     projectId: string;
// //     title: string;
// //     description: string;
// //     documentUrl: string;
// //     evaluationStatus: string;
// //     evaluationScores: EvaluationScore[];
// // }

// // const EvaluatorStage2Dashboard: React.FC = () => {
// //     const [projects, setProjects] = useState<Project[]>([]);
// //     const [scores, setScores] = useState<Record<string, number>>({});

// //     useEffect(() => {
// //         const token = localStorage.getItem('evaluatorToken');
// //         const evaluatorName = localStorage.getItem('evaluatorUserName');

// //         if (!token || !evaluatorName) {
// //             alert('You must be logged in');
// //             return;
// //         }

// //         axios.get('http://localhost:11129/api/evaluator/accepted-projects', {
// //             headers: { 'Authorization': `Bearer ${token}` },
// //         })
// //             .then(res => {
// //                 const filteredProjects = res.data.filter((project: Project) => {
// //                     // Show only accepted projects
// //                     if (project.evaluationStatus !== 'accepted') return false;

// //                     // Check if this evaluator has already scored the project
// //                     const evaluatorEntry = project.evaluationScores?.find(
// //                         score => score.evaluatorName === evaluatorName
// //                     );

// //                     // Show project if evaluator hasn't scored yet or evaluator's score status is 'Pending'
// //                     return !evaluatorEntry || evaluatorEntry.status === 'Pending';
// //                 });

// //                 setProjects(filteredProjects);
// //             })
// //             .catch(err => console.error(err));
// //     }, []);

// //     const handleScoreChange = (projectId: string, value: number) => {
// //         setScores(prevScores => ({
// //             ...prevScores,
// //             [projectId]: value,
// //         }));
// //     };

// //     const handleSubmitScore = async (projectId: string, score: number, status = 'Evaluated') => {
// //         const token = localStorage.getItem('evaluatorToken');
// //         const evaluatorName = localStorage.getItem('evaluatorUserName');

// //         if (!token || !evaluatorName) {
// //             alert('You must be logged in to submit a score');
// //             return;
// //         }

// //         if (typeof score !== 'number' || isNaN(score)) {
// //             alert('Please enter a valid score');
// //             return;
// //         }

// //         try {
// //             await axios.post(
// //                 'http://localhost:11129/api/evaluator/submit-score',
// //                 {
// //                     projectId,
// //                     score,
// //                     evaluatorName,
// //                     status
// //                 },
// //                 {
// //                     headers: {
// //                         'Authorization': `Bearer ${token}`,
// //                     },
// //                 }
// //             );

// //             alert('Score submitted successfully!');

// //             // Remove from UI
// //             setProjects(prev => prev.filter(p => p.projectId !== projectId));

// //             // Optionally clear score
// //             setScores(prev => {
// //                 const newScores = { ...prev };
// //                 delete newScores[projectId];
// //                 return newScores;
// //             });

// //         } catch (error) {
// //             console.error('Error submitting score:', error);
// //             alert('Error submitting score');
// //         }
// //     };

// //     return (
// //         <div className="p-6">
// //             <h1 className="text-2xl font-bold mb-4">Evaluator Stage 2 Dashboard</h1>

// //             {projects.length === 0 ? (
// //                 <p>No projects available for evaluation.</p>
// //             ) : (
// //                 <table className="w-full border text-sm">
// //                     <thead className="bg-gray-200">
// //                         <tr>
// //                             <th className="p-2 border">School ID</th>
// //                             <th className="p-2 border">Project ID</th>
// //                             <th className="p-2 border">Title</th>
// //                             <th className="p-2 border">Description</th>
// //                             <th className="p-2 border">Document</th>
// //                             <th className="p-2 border">Score</th>
// //                             <th className="p-2 border">Action</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {projects.map((project) => (
// //                             <tr key={project._id} className="border">
// //                                 <td className="p-2 border">{project.schoolId}</td>
// //                                 <td className="p-2 border">{project.projectId}</td>
// //                                 <td className="p-2 border">{project.title}</td>
// //                                 <td className="p-2 border">{project.description}</td>
// //                                 <td className="p-2 border">
// //                                     <a href={project.documentUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">View</a>
// //                                 </td>
// //                                 <td className="p-2 border">
// //                                     <input
// //                                         type="number"
// //                                         className="border rounded px-2 py-1 w-20"
// //                                         value={scores[project.projectId] || ''}
// //                                         onChange={(e) => handleScoreChange(project.projectId, Number(e.target.value))}
// //                                     />
// //                                 </td>
// //                                 <td className="p-2 border">
// //                                     <button
// //                                         onClick={() => handleSubmitScore(project.projectId, scores[project.projectId])}
// //                                         className="bg-blue-600 text-white px-3 py-1 rounded"
// //                                     >
// //                                         Save
// //                                     </button>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             )}
// //         </div>
// //     );
// // };

// // export default EvaluatorStage2Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface EvaluationScore {
//     evaluatorName: string;
//     status: string;
//     score?: number;
//     evaluatedAt: Date;
// }

// interface Project {
//     _id: string;
//     schoolId: string;
//     projectId: string;
//     title: string;
//     description: string;
//     documentUrl: string;
//     evaluationStatus: string;
//     evaluationScores: EvaluationScore[];
// }

// const EvaluatorStage2Dashboard: React.FC = () => {
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [scores, setScores] = useState<Record<string, number>>({});
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const token = localStorage.getItem('evaluatorToken');
//                 const evaluatorName = localStorage.getItem('evaluatorUserName');

//                 if (!token || !evaluatorName) {
//                     toast.error('Authentication required');
//                     return;
//                 }

//                 const response = await axios.get('http://localhost:11129/api/evaluator/accepted-projects', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });

//                 // Filter projects:
//                 // 1. Only show accepted projects
//                 // 2. Only show projects that haven't been evaluated by this evaluator
//                 // const filteredProjects = response.data.filter((project: Project) => {
//                 //   const hasEvaluated = project.evaluationScores?.some(
//                 //     score => score.evaluatorName === evaluatorName && score.status === 'Evaluated'
//                 //   );
//                 //   return project.evaluationStatus === 'accepted' && !hasEvaluated;
//                 // });

//                 const filteredProjects = response.data.filter((project: Project) => {
//                     const matchingScore = project.evaluationScores?.find(
//                         score => score.evaluatorName?.toLowerCase() === evaluatorName.toLowerCase()
//                     );

//                     // Show if:
//                     // 1. No evaluation by this evaluator yet
//                     // 2. OR status is 'Pending' for this evaluator
//                     return project.evaluationStatus === 'accepted' && (
//                         !matchingScore || matchingScore.status === 'Pending'
//                     );
//                 });



//                 setProjects(filteredProjects);
//             } catch (error) {
//                 console.error('Error fetching projects:', error);
//                 toast.error('Failed to fetch projects');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     const handleScoreChange = (projectId: string, value: string) => {
//         const numValue = parseInt(value, 10);
//         if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
//             setScores(prev => ({
//                 ...prev,
//                 [projectId]: numValue
//             }));
//         }
//     };

//     const handleSubmitScore = async (projectId: string) => {
//         const score = scores[projectId];
//         if (typeof score !== 'number' || score < 0 || score > 100) {
//             toast.error('Please enter a valid score between 0 and 100');
//             return;
//         }

//         try {
//             const token = localStorage.getItem('evaluatorToken');
//             const evaluatorName = localStorage.getItem('evaluatorUserName');

//             if (!token || !evaluatorName) {
//                 toast.error('Authentication required');
//                 return;
//             }

//             await axios.post(
//                 'http://localhost:11129/api/evaluator/submit-score',
//                 {
//                     projectId,
//                     evaluatorName,
//                     score,
//                     status: 'Evaluated'
//                 },
//                 {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }
//             );

//             // Remove the evaluated project and clear its score
//             setProjects(prev => prev.filter(p => p.projectId !== projectId));
//             setScores(prev => {
//                 const newScores = { ...prev };
//                 delete newScores[projectId];
//                 return newScores;
//             });

//             toast.success('Score submitted successfully');
//         } catch (error) {
//             console.error('Error submitting score:', error);
//             toast.error('Failed to submit score');
//         }
//     };

//     if (isLoading) {
//         return <div className="p-6 text-center">Loading projects...</div>;
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-6">Stage 2 Evaluation Dashboard</h1>

//             {projects.length === 0 ? (
//                 <div className="text-center py-8 bg-gray-50 rounded-lg">
//                     <p className="text-gray-600">No projects available for evaluation at this time.</p>
//                 </div>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse border border-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="p-3 text-left border">School ID</th>
//                                 <th className="p-3 text-left border">Project Title</th>
//                                 <th className="p-3 text-left border">Description</th>
//                                 <th className="p-3 text-left border">Document</th>
//                                 <th className="p-3 text-left border">Score</th>
//                                 <th className="p-3 text-left border">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {projects.map((project) => (
//                                 <tr key={project._id} className="hover:bg-gray-50">
//                                     <td className="p-3 border">{project.schoolId}</td>
//                                     <td className="p-3 border">{project.title}</td>
//                                     <td className="p-3 border">{project.description}</td>
//                                     <td className="p-3 border">
//                                         <a
//                                             href={project.documentUrl}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-blue-600 hover:text-blue-800 underline"
//                                         >
//                                             View Document
//                                         </a>
//                                     </td>
//                                     <td className="p-3 border">
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="100"
//                                             className="w-20 p-1 border rounded"
//                                             value={scores[project.projectId] || ''}
//                                             onChange={(e) => handleScoreChange(project.projectId, e.target.value)}
//                                             placeholder="0-100"
//                                         />
//                                     </td>
//                                     <td className="p-3 border">
//                                         <button
//                                             onClick={() => handleSubmitScore(project.projectId)}
//                                             disabled={!scores[project.projectId]}
//                                             className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             Submit Score
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             <ToastContainer position="top-right" autoClose={3000} />
//         </div>
//     );
// };

// export default EvaluatorStage2Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EvaluationScore {
    evaluatorName: string;
    status: string;
    score?: number;
    evaluatedAt: Date;
}

interface Project {
    _id: string;
    schoolId: string;
    projectId: string;
    title: string;
    description: string;
    documentFile: {
        filename: string;
        contentType: string;
        data: {
            data: number[];
        };
    };
    evaluationStatus: string;
    evaluationScores: EvaluationScore[];
}

const EvaluatorStage2Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('evaluatorToken');
                const evaluatorName = localStorage.getItem('evaluatorUserName');

                if (!token || !evaluatorName) {
                    toast.error('Authentication required');
                    return;
                }

                const response = await axios.get('http://localhost:11129/api/evaluator/accepted-projects', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // Filter projects:
                // 1. Only show accepted projects
                // 2. Only show projects where this evaluator hasn't submitted a score
                const filteredProjects = response.data.filter((project: Project) => {
                    // Check if project is accepted
                    if (project.evaluationStatus !== 'accepted') return false;

                    // Check if this evaluator has already submitted a score with status "Evaluated"
                    const alreadyEvaluated = project.evaluationScores?.some(
                        score =>
                            score.evaluatorName.toLowerCase() === evaluatorName.toLowerCase() &&
                            score.status.toLowerCase() === 'evaluated'
                    );

                    // Only include if not already evaluated
                    return !alreadyEvaluated;
                });

               

                setProjects(filteredProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
                toast.error('Failed to fetch projects');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleScoreChange = (projectId: string, value: string) => {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
            setScores(prev => ({
                ...prev,
                [projectId]: numValue
            }));
        }
    };

    const handleSubmitScore = async (projectId: string) => {
        const score = scores[projectId];
        if (typeof score !== 'number' || score < 0 || score > 100) {
            toast.error('Please enter a valid score between 0 and 100');
            return;
        }

        try {
            const token = localStorage.getItem('evaluatorToken');
            const evaluatorName = localStorage.getItem('evaluatorUserName');

            if (!token || !evaluatorName) {
                toast.error('Authentication required');
                return;
            }

            await axios.post(
                'http://localhost:11129/api/evaluator/submit-score',
                {
                    projectId,
                    evaluatorName,
                    score,
                    status: 'Evaluated'
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            // Remove the evaluated project and clear its score
            setProjects(prev => prev.filter(p => p.projectId !== projectId));
            setScores(prev => {
                const newScores = { ...prev };
                delete newScores[projectId];
                return newScores;
            });

            toast.success('Score submitted successfully');
        } catch (error) {
            console.error('Error submitting score:', error);
            toast.error('Failed to submit score');
        }
    };


    const downloadDocument = (project: Project) => {
        const bufferData = project.documentFile.data?.data || project.documentFile.data;
        const byteArray = new Uint8Array(bufferData);
        const blob = new Blob([byteArray], { type: project.documentFile.contentType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = project.documentFile.filename || 'document.pptx';
        document.body.appendChild(link); // Ensure it's in the DOM
        link.click();
        document.body.removeChild(link);
    };



    if (isLoading) {
        return <div className="p-6 text-center">Loading projects...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Stage 2 Evaluation Dashboard</h1>

            {projects.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No projects available for evaluation at this time.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left border">School ID</th>
                                <th className="p-3 text-left border">Project Title</th>
                                <th className="p-3 text-left border">Description</th>
                                <th className="p-3 text-left border">Document</th>
                                <th className="p-3 text-left border">Score</th>
                                <th className="p-3 text-left border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project._id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{project._id}</td>
                                    <td className="p-3 border">{project.title}</td>
                                    <td className="p-3 border">{project.description}</td>
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => downloadDocument(project)}
                                            className="text-blue-600 underline"
                                        >
                                            Download
                                        </button>
                                    </td>
                                    <td className="p-3 border">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            className="w-20 p-1 border rounded"
                                            value={scores[project.projectId] || ''}
                                            onChange={(e) => handleScoreChange(project.projectId, e.target.value)}
                                            placeholder="0-100"
                                        />
                                    </td>
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => handleSubmitScore(project.projectId)}
                                            disabled={!scores[project.projectId]}
                                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Submit Score
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default EvaluatorStage2Dashboard;