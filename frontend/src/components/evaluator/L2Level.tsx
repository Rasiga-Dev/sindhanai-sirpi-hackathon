

// // import React, { useState, useEffect } from 'react';
// // import { toast } from 'react-toastify';
// // import axios from 'axios';
// // import BMCLayout from '../../components/BMCLayout';

// // // Types
// // interface Project {
// //     _id: string;
// //     schoolId: string;
// //     projectId: string;
// //     title: string;
// //     description: string;
// //     problemStatement: string;
// //     solution: string;
// //     bmcDetails: any; // You can replace 'any' with a more specific type if you have one
// //     evaluationStatus?: string;
// // }

// // interface L2LevelProps {
// //     projects: Project[];
// //     onProjectUpdate: (updatedProjects: Project[]) => void;
// // }

// // export default function L2Level({ projects, onProjectUpdate }: L2LevelProps) {

// //     const [openBMCProject, setOpenBMCProject] = useState<Project | null>(null);
// //     const [scores, setScores] = useState<{ [key: string]: number }>({});
// //     const [submittingProjectId, setSubmittingProjectId] = useState<string | null>(null);

// //   console.log('L2Level projects:', projects);


// //     const handleSubmitScore = async (projectId: string, score: number) => {
// //     if (score == null || isNaN(score) || score < 0 || score > 10) {
// //         toast.error('Please enter a valid score between 0 and 10');
// //         return;
// //     }

// //     const project = projects.find(p => p.projectId === projectId);
// //     if (!project) {
// //         toast.error('Project not found');
// //         return;
// //     }

// //     try {
// //         setSubmittingProjectId(projectId);

// //         const token = localStorage.getItem('evaluatorToken');
// //         const username = localStorage.getItem('evaluatorName');

// //         await axios.post(
// //             `http://localhost:11129/api/evaluator/submit-score`,
// //             {
// //                 schoolId: project.schoolId,
// //                 projectId: project.projectId,
// //                 evaluatorName: username,
// //                 score,
// //             },
// //             {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             }
// //         );

// //         toast.success('Score submitted successfully');

// //         const updatedProjects = projects.filter((p) => p._id !== project._id);
// //         onProjectUpdate(updatedProjects);

// //         setScores((prev) => {
// //             const copy = { ...prev };
// //             delete copy[projectId];
// //             return copy;
// //         });

// //         if (openBMCProject?._id === projectId) {
// //             setOpenBMCProject(null);
// //         }
// //     } catch (error) {
// //         console.error('Error submitting score:', error);
// //         toast.error('Failed to submit score');
// //     } finally {
// //         setSubmittingProjectId(null);
// //     }
// // };


// //     const handleScoreChange = (projectId: string, value: number) => {
// //         setScores({ ...scores, [projectId]: value });
// //     };

// //     const totalProjects = projects.length;
// //     const evaluatedProjects = projects.filter((p) => p.evaluationStatus === 'Evaluated').length;
// //     const pendingProjects = totalProjects - evaluatedProjects;

// //     return (
// //         <div className="space-y-6">
// //             <h2 className="text-2xl font-semibold text-gray-800">L2 Level Evaluation</h2>

// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
// //                 <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
// //                     <h3 className="text-lg font-semibold text-blue-800">Total Projects</h3>
// //                     <p className="text-3xl font-bold text-blue-900">{totalProjects}</p>
// //                 </div>
// //                 <div className="bg-green-100 p-4 rounded-xl shadow text-center">
// //                     <h3 className="text-lg font-semibold text-green-800">Evaluated Projects</h3>
// //                     <p className="text-3xl font-bold text-green-900">{evaluatedProjects}</p>
// //                 </div>
// //                 <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
// //                     <h3 className="text-lg font-semibold text-yellow-800">Pending Projects</h3>
// //                     <p className="text-3xl font-bold text-yellow-900">{pendingProjects}</p>
// //                 </div>
// //             </div>

// //             <div className="bg-white rounded-lg shadow overflow-x-auto">
// //                 <table className="min-w-full divide-y divide-gray-200">
// //                     <thead className="bg-gray-50">
// //                         <tr>
// //                             <th className="px-6 py-3">School ID</th>
// //                             <th className="px-6 py-3">Project ID</th>
// //                             <th className="px-6 py-3">Project Title</th>
// //                             <th className="px-6 py-3">Description</th>
// //                             <th className="px-6 py-3">Problem Statement</th>
// //                             <th className="px-6 py-3">Solution</th>
// //                             <th className="px-6 py-3">BMC Details</th>
// //                             <th className="px-6 py-3">Score</th>
// //                             <th className="px-6 py-3">Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-gray-200">
// //                         {projects.map((project) => (
// //                             <tr key={project.projectId}>
// //                                 <td className="px-6 py-4">{project.schoolId}</td>
// //                                 <td className="px-6 py-4">{project.projectId}</td>
// //                                 <td className="px-6 py-4">{project.title}</td>
// //                                 <td className="px-6 py-4">{project.description}</td>
// //                                 <td className="px-6 py-4">{project.problemStatement}</td>
// //                                 <td className="px-6 py-4">{project.solution}</td>
// //                                 <td className="px-6 py-4">
// //                                     <button
// //                                         onClick={() => setOpenBMCProject(project)}
// //                                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
// //                                     >
// //                                         View BMC
// //                                     </button>
// //                                 </td>
// //                                 <td className="px-6 py-4">
// //                                     <input
// //                                         type="number"
// //                                         min={0}
// //                                         max={10}
// //                                         value={scores[project.projectId] ?? ''}
// //                                         onChange={(e) =>
// //                                             handleScoreChange(
// //                                                 project.projectId,
// //                                                 parseInt(e.target.value) || 0
// //                                             )
// //                                         }
// //                                         className="border rounded px-2 py-1 w-20"
// //                                         placeholder="0-10"
// //                                         disabled={submittingProjectId === project.projectId}
// //                                     />
// //                                 </td>
// //                                 <td className="px-6 py-4">
// //                                     <button
// //                                         onClick={() =>
// //                                             handleSubmitScore(project.projectId, scores[project.projectId])
// //                                         }
// //                                         className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ${submittingProjectId === project.projectId ? 'opacity-50 cursor-not-allowed' : ''
// //                                             }`}
// //                                         disabled={submittingProjectId === project.projectId}
// //                                     >
// //                                         {submittingProjectId === project.projectId ? 'Submitting...' : 'Submit'}
// //                                     </button>

// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>

// //             {openBMCProject && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <div className="relative bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
// //                         <button
// //                             onClick={() => setOpenBMCProject(null)}
// //                             className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black"
// //                         >
// //                             &times;
// //                         </button>
// //                         <BMCLayout
// //                             bmcDetails={openBMCProject.bmcDetails}
// //                             schoolId={openBMCProject.schoolId}
// //                             projectTitle={openBMCProject.title}
// //                             projectId={openBMCProject.projectId}
// //                             projectDescription={openBMCProject.description}
// //                             projectProblemStatement={openBMCProject.problemStatement}
// //                             projectSolution={openBMCProject.solution}
// //                         />
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import BMCLayout from '../../components/BMCLayout';

// // Types
// interface EvaluationScore {
//     evaluatorName: string;
//     score: number;
//     status?: string;
//     evaluatedAt?: string;
// }

// interface Project {
//     _id: string;
//     schoolId: string;
//     projectId: string;
//     title: string;
//     description: string;
//     problemStatement: string;
//     solution: string;
//     bmcDetails: any;
//     evaluationStatus?: string;
//     evaluationScores?: EvaluationScore[];
// }

// interface L2LevelProps {
//     projects: Project[];
//     onProjectUpdate: (updatedProjects: Project[]) => void;
// }

// export default function L2Level({ projects, onProjectUpdate }: L2LevelProps) {
//     const [openBMCProject, setOpenBMCProject] = useState<Project | null>(null);
//     const [scores, setScores] = useState<{ [key: string]: number }>({});
//     const [submittingProjectId, setSubmittingProjectId] = useState<string | null>(null);

//     const username = localStorage.getItem('evaluatorName') || '';

//     const handleSubmitScore = async (projectId: string, score: number) => {
//         if (score == null || isNaN(score) || score < 0 || score > 10) {
//             toast.error('Please enter a valid score between 0 and 10');
//             return;
//         }

//         const project = projects.find(p => p.projectId === projectId);
//         if (!project) {
//             toast.error('Project not found');
//             return;
//         }

//         try {
//             setSubmittingProjectId(projectId);

//             const token = localStorage.getItem('evaluatorToken');

//             await axios.post(
//                 `http://localhost:11129/api/evaluator/submit-score`,
//                 {
//                     schoolId: project.schoolId,
//                     projectId: project.projectId,
//                     evaluatorName: username,
//                     score,
//                 },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             toast.success('Score submitted successfully');

//             const updatedProjects = projects.filter(p => p.projectId !== project.projectId);
//             onProjectUpdate(updatedProjects);

//             setScores((prev) => {
//                 const copy = { ...prev };
//                 delete copy[projectId];
//                 return copy;
//             });

//             if (openBMCProject?._id === projectId) {
//                 setOpenBMCProject(null);
//             }
//         } catch (error) {
//             console.error('Error submitting score:', error);
//             toast.error('Failed to submit score');
//         } finally {
//             setSubmittingProjectId(null);
//         }
//     };

//     const handleScoreChange = (projectId: string, value: number) => {
//         setScores({ ...scores, [projectId]: value });
//     };

//     const filteredProjects = projects.filter(
//         (p) => !p.evaluationScores?.some((es) => es.evaluatorName === username)
//     );

//     const totalProjects = filteredProjects.length;
//     const evaluatedProjects = projects.filter(
//         (p) => p.evaluationScores?.some((es) => es.evaluatorName === username)
//     ).length;
//     const pendingProjects = totalProjects;

//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-800">L2 Level Evaluation</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
//                 <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
//                     <h3 className="text-lg font-semibold text-blue-800">Total Projects</h3>
//                     <p className="text-3xl font-bold text-blue-900">{projects.length}</p>
//                 </div>
//                 <div className="bg-green-100 p-4 rounded-xl shadow text-center">
//                     <h3 className="text-lg font-semibold text-green-800">Evaluated by You</h3>
//                     <p className="text-3xl font-bold text-green-900">{evaluatedProjects}</p>
//                 </div>
//                 <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
//                     <h3 className="text-lg font-semibold text-yellow-800">Pending for You</h3>
//                     <p className="text-3xl font-bold text-yellow-900">{pendingProjects}</p>
//                 </div>
//             </div>

//             <div className="bg-white rounded-lg shadow overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3">School ID</th>
//                             <th className="px-6 py-3">Project ID</th>
//                             <th className="px-6 py-3">Project Title</th>
//                             <th className="px-6 py-3">Description</th>
//                             <th className="px-6 py-3">Problem Statement</th>
//                             <th className="px-6 py-3">Solution</th>
//                             <th className="px-6 py-3">BMC Details</th>
//                             <th className="px-6 py-3">Score</th>
//                             <th className="px-6 py-3">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {filteredProjects.map((project) => (
//                             <tr key={project.projectId}>
//                                 <td className="px-6 py-4">{project.schoolId}</td>
//                                 <td className="px-6 py-4">{project.projectId}</td>
//                                 <td className="px-6 py-4">{project.title}</td>
//                                 <td className="px-6 py-4">{project.description}</td>
//                                 <td className="px-6 py-4">{project.problemStatement}</td>
//                                 <td className="px-6 py-4">{project.solution}</td>
//                                 <td className="px-6 py-4">
//                                     <button
//                                         onClick={() => setOpenBMCProject(project)}
//                                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                                     >
//                                         View BMC
//                                     </button>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <input
//                                         type="number"
//                                         min={0}
//                                         max={10}
//                                         value={scores[project.projectId] ?? ''}
//                                         onChange={(e) =>
//                                             handleScoreChange(
//                                                 project.projectId,
//                                                 parseInt(e.target.value) || 0
//                                             )
//                                         }
//                                         className="border rounded px-2 py-1 w-20"
//                                         placeholder="0-10"
//                                         disabled={submittingProjectId === project.projectId}
//                                     />
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <button
//                                         onClick={() =>
//                                             handleSubmitScore(project.projectId, scores[project.projectId])
//                                         }
//                                         className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ${
//                                             submittingProjectId === project.projectId
//                                                 ? 'opacity-50 cursor-not-allowed'
//                                                 : ''
//                                         }`}
//                                         disabled={submittingProjectId === project.projectId}
//                                     >
//                                         {submittingProjectId === project.projectId ? 'Submitting...' : 'Submit'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {openBMCProject && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="relative bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//                         <button
//                             onClick={() => setOpenBMCProject(null)}
//                             className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black"
//                         >
//                             &times;
//                         </button>
//                         <BMCLayout
//                             bmcDetails={openBMCProject.bmcDetails}
//                             schoolId={openBMCProject.schoolId}
//                             projectTitle={openBMCProject.title}
//                             projectId={openBMCProject.projectId}
//                             projectDescription={openBMCProject.description}
//                             projectProblemStatement={openBMCProject.problemStatement}
//                             projectSolution={openBMCProject.solution}
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BMCLayout from '../../components/BMCLayout';

// Types
interface EvaluationScore {
  evaluatorName: string;
  score: number;
  status?: string;
  evaluatedAt?: string;
}

interface Project {
  _id: string;
  schoolId: string;
  projectId: string;
  title: string;
  description: string;
  problemStatement: string;
  solution: string;
  bmcDetails: any;
  evaluationStatus?: string;
  evaluationScores?: EvaluationScore[];
}

interface L2LevelProps {
  projects: Project[];
  onProjectUpdate: (updatedProjects: Project[]) => void;
}

export default function L2Level({ projects, username, refreshProjects, refreshLevel2List, refreshL2List }: L2LevelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [openBMCProject, setOpenBMCProject] = useState<Project | null>(null);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [submittedScores, setSubmittedScores] = useState<{ [key: string]: number }>({});
  const [submittingProjectId, setSubmittingProjectId] = useState<string | null>(null);
  const [summary, setSummary] = useState({
    total: 0,
    scored: 0,
  });

  // const username = localStorage.getItem('evaluatorName') || '';

  // const handleSubmitScore = async (projectId: string, score: number) => {
  //   if (score == null || isNaN(score) || score < 0 || score > 10) {
  //     toast.error('Please enter a valid score between 0 and 10');
  //     return;
  //   }

  //   const project = projects.find(p => p.projectId === projectId);
  //   if (!project) {
  //     toast.error('Project not found');
  //     return;
  //   }

  //   try {
  //     setSubmittingProjectId(projectId);

  //     const token = localStorage.getItem('evaluatorToken');

  //     await axios.post(`http://localhost:11129/api/evaluator/submit-score`, {
  //       schoolId: project.schoolId,
  //       projectId: project.projectId,
  //       evaluatorName: username,
  //       score,
  //     }, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     toast.success('Score submitted successfully');


  //     setSubmittedScores(prev => ({ ...prev, [projectId]: score }));
  //     setScores(prev => {
  //       const updated = { ...prev };
  //       delete updated[projectId];
  //       return updated;
  //     });

  //     refreshL2List();
  //     refreshLevel2List();

  //   } catch (error: any) {
  //     console.error('Error submitting score:', error);
  //     toast.error(error?.response?.data?.message || 'Failed to submit score');
  //   } finally {
  //     setSubmittingProjectId(null);
  //   }
  // };
  const handleSubmitScore = async (projectId: string, score: number) => {
    if (score == null || isNaN(score) || score < 0 || score > 10) {
      toast.error('Please enter a valid score between 0 and 10');
      return;
    }

    const project = projects.find(p => p.projectId === projectId);
    if (!project) {
      toast.error('Project not found');
      return;
    }

    try {
      setSubmittingProjectId(projectId);

      const token = localStorage.getItem('evaluatorToken');

      const response = await axios.post(`http://localhost:11129/api/evaluator/submit-score`, {
        schoolId: project.schoolId,
        projectId: project.projectId,
        evaluatorName: username,
        score,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ❗️Check if backend sent any error message in response
      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      // ✅ Success
      toast.success(response.data.message || 'Score submitted successfully');

      setSubmittedScores(prev => ({ ...prev, [projectId]: score }));
      setScores(prev => {
        const updated = { ...prev };
        delete updated[projectId];
        return updated;
      });

      // refreshL2List();
      refreshLevel2List();
      refreshProjects();

    } catch (error: any) {
      console.error('Error submitting score:', error);
      toast.error(error?.response?.data?.error || 'Failed to submit score');
    } finally {
      setSubmittingProjectId(null);
    }
  };


  const handleScoreChange = (projectId: string, value: number) => {
    setScores({ ...scores, [projectId]: value });
  };


  useEffect(() => {

    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('evaluatorToken');
      const response = await axios.get('http://localhost:11129/api/evaluator/level-2-summary', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSummary(response.data);
    } catch (err) {
      console.error('Summary fetch error:', err);
    } finally {
      setIsLoading(false); // end loading
    }
  };


  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const alreadyEvaluated = project.evaluationScores?.some(es => es.evaluatorName === username);
      const totalEvaluated = project.evaluationScores?.length || 0;
      return alreadyEvaluated || totalEvaluated < 3;
    });
  }, [projects, username]);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">L2 Level Evaluation</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-blue-800">Total Scored Projects</h3>
          <p className="text-3xl font-bold text-blue-900">{summary.total}</p>
        </div>

      </div>

      {/* Table */}
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

        // <div className="bg-white rounded-lg shadow overflow-x-auto max-h-[500px] overflow-y-auto border rounded">
        //   <table className="min-w-full divide-y divide-gray-200">
        //     <thead className="bg-gray-50">
        //       <tr>
        //         <th className="px-6 py-3">School ID</th>
        //         <th className="px-6 py-3">Project ID</th>
        //         <th className="px-6 py-3">Title</th>
        //         <th className="px-6 py-3">Description</th>
        //         <th className="px-6 py-3">Problem</th>
        //         <th className="px-6 py-3">Solution</th>
        //         <th className="px-6 py-3">BMC</th>
        //         <th className="px-6 py-3">Score</th>
        //         <th className="px-6 py-3">Actions</th>
        //       </tr>
        //     </thead>


        //     <tbody className="divide-y divide-gray-200">

        //       {/* {filteredProjects.map(project => {
        //         const alreadyEvaluated = project.evaluationScores?.some(es => es.evaluatorName === username);
        //         const submittedScore = submittedScores[project.projectId];
        //         const scoreGiven = project.evaluationScores?.find(es => es.evaluatorName === username)?.score;

        //         return (
        //           <tr key={project.projectId}>
        //             <td className="px-6 py-4">{project.schoolId}</td>
        //             <td className="px-6 py-4">{project.projectId}</td>
        //             <td className="px-6 py-4">{project.title}</td>
        //             <td className="px-6 py-4">{project.description}</td>
        //             <td className="px-6 py-4">{project.problemStatement}</td>
        //             <td className="px-6 py-4">{project.solution}</td>
        //             <td className="px-6 py-4">
        //               <button
        //                 onClick={() => setOpenBMCProject(project)}
        //                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        //               >
        //                 View BMC
        //               </button>
        //             </td>
        //             <td className="px-6 py-4">
        //               {alreadyEvaluated || submittedScore ? (
        //                 <span className="text-green-700 font-semibold">
        //                   {submittedScore ?? scoreGiven}
        //                 </span>
        //               ) : (
        //                 <input
        //                   type="number"
        //                   min={0}
        //                   max={10}
        //                   value={scores[project.projectId] ?? ''}
        //                   onChange={(e) => handleScoreChange(project.projectId, parseInt(e.target.value))}
        //                   className="border rounded px-2 py-1 w-20"
        //                   placeholder="0-10"
        //                 />
        //               )}
        //             </td>
        //             <td className="px-6 py-4">
        //               {alreadyEvaluated || submittedScore ? (
        //                 <span className="text-sm font-semibold text-green-700">Evaluated</span>
        //               ) : (
        //                 <button
        //                   onClick={() => handleSubmitScore(project.projectId, scores[project.projectId])}
        //                   className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ${submittingProjectId === project.projectId ? 'opacity-50 cursor-not-allowed' : ''
        //                     }`}
        //                   disabled={submittingProjectId === project.projectId}
        //                 >
        //                   {submittingProjectId === project.projectId ? 'Submitting...' : 'Submit'}
        //                 </button>
        //               )}
        //             </td>
        //           </tr>
        //         );
        //       })} */}
        //       {filteredProjects.map(project => {
        //         // const alreadyEvaluated = project.evaluationScores?.some(es => es.evaluatorName === username);
        //         const submittedScore = submittedScores[project.projectId];
        //         // const scoreGiven = project.evaluationScores?.find(es => es.evaluatorName === username)?.score;
        //         const alreadyEvaluated = project.evaluationScores?.some(score => score.evaluatorName === username);
        //         console.log("alreadyEvaluated:", alreadyEvaluated);


        //         console.log('Project Evaluation Scores:', project.evaluationScores);
               

        //         const scoreGiven = project.evaluationScores?.find(
        //           (es) => es.evaluatorName?.toLowerCase() === username.toLowerCase()
        //         )?.score;


        //         return (
        //           <tr key={project.projectId}>
        //             <td className="px-6 py-4">{project.schoolId}</td>
        //             <td className="px-6 py-4">{project.projectId}</td>
        //             <td className="px-6 py-4">{project.title}</td>
        //             <td className="px-6 py-4">{project.description}</td>
        //             <td className="px-6 py-4">{project.problemStatement}</td>
        //             <td className="px-6 py-4">{project.solution}</td>
        //             <td className="px-6 py-4">
        //               <button
        //                 onClick={() => setOpenBMCProject(project)}
        //                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        //               >
        //                 View BMC
        //               </button>
        //             </td>
        //             {/* <td className="px-6 py-4">
        //               {alreadyEvaluated || submittedScore ? (
        //                 <span className="text-green-700 font-semibold">
        //                   {submittedScore ?? scoreGiven}
        //                 </span>
        //               ) : (
        //                 <input
        //                   type="number"
        //                   min={0}
        //                   max={10}
        //                   value={scores[project.projectId] ?? ''}
        //                   onChange={(e) => handleScoreChange(project.projectId, parseInt(e.target.value))}
        //                   className="border rounded px-2 py-1 w-20"
        //                   placeholder="0-10"
        //                 />
        //               )}
        //             </td>
        //             <td className="px-6 py-4">
        //               {alreadyEvaluated || submittedScore ? (
        //                 <span className="text-sm font-semibold text-green-700">Evaluated</span>
        //               ) : (
        //                 <button
        //                   onClick={() => handleSubmitScore(project.projectId, scores[project.projectId])}
        //                   className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ${submittingProjectId === project.projectId ? 'opacity-50 cursor-not-allowed' : ''
        //                     }`}
        //                   disabled={submittingProjectId === project.projectId}
        //                 >
        //                   {submittingProjectId === project.projectId ? 'Submitting...' : 'Submit'}
        //                 </button>
        //               )}
        //             </td> */}

        //             {alreadyEvaluated || submittedScores[project.projectId] !== undefined ? (
        //               <>
        //                 <td className="text-green-600 font-semibold">
        //                   {submittedScores[project.projectId] ?? scoreGiven ?? '-'}
        //                 </td>
        //                 <td>
        //                   <span className="text-green-700 font-medium">Evaluated</span>
        //                 </td>
        //               </>
        //             ) : (
        //               <>
        //                 <td>
        //                   <input
        //                     type="number"
        //                     min={0}
        //                     max={10}
        //                     value={scores[project.projectId] ?? ''}
        //                     onChange={(e) =>
        //                       handleScoreChange(project.projectId, parseInt(e.target.value))
        //                     }
        //                     className="border rounded px-2 py-1 w-20"
        //                     placeholder="0-10"
        //                   />
        //                 </td>
        //                 <td>
        //                   <button
        //                     onClick={() =>
        //                       handleSubmitScore(project.projectId, scores[project.projectId])
        //                     }
        //                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        //                   >
        //                     Submit
        //                   </button>
        //                 </td>
        //               </>
        //             )}


        //           </tr>
        //         );
        //       })}





        //     </tbody>

        //   </table>
        // </div>
         <div className="grid gap-4 max-h-[500px] overflow-y-auto p-4">
      {filteredProjects.map((project) => {
        const submittedScore = submittedScores[project.projectId];
        const alreadyEvaluated = project.evaluationScores?.some(
          (es) => es.evaluatorName?.toLowerCase() === username.toLowerCase()
        );
        const scoreGiven = project.evaluationScores?.find(
          (es) => es.evaluatorName?.toLowerCase() === username.toLowerCase()
        )?.score;

        return (
          <div
            key={project.projectId}
            className="border rounded-xl shadow-md p-4 bg-white space-y-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-500">Project ID: {project.projectId}</p>
                <p className="text-sm text-gray-500">School ID: {project.schoolId}</p>
              </div>
              <button
                onClick={() => setOpenBMCProject(project)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View BMC
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="text-gray-700 font-medium">Description:</p>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Problem Statement:</p>
                <p className="text-gray-600 text-sm">{project.problemStatement}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Solution:</p>
                <p className="text-gray-600 text-sm">{project.solution}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 items-center">
              {alreadyEvaluated || submittedScore !== undefined ? (
                <>
                  <div>
                    <label className="text-gray-700 font-medium">Score:</label>
                    <p className="text-green-700 font-semibold">
                      {submittedScore ?? scoreGiven ?? '-'}
                    </p>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Evaluated</span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-gray-700 font-medium">Enter Score (0-10):</label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={scores[project.projectId] ?? ''}
                      onChange={(e) =>
                        handleScoreChange(project.projectId, parseInt(e.target.value))
                      }
                      className="border rounded px-2 py-1 w-24 mt-1"
                      placeholder="0-10"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleSubmitScore(project.projectId, scores[project.projectId])
                      }
                      className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-5 ${
                        submittingProjectId === project.projectId
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={submittingProjectId === project.projectId}
                    >
                      {submittingProjectId === project.projectId
                        ? 'Submitting...'
                        : 'Submit'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
      )}

      {/* BMC Modal */}
      {openBMCProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto p-6 relative">
            <button
              onClick={() => setOpenBMCProject(null)}
              className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <BMCLayout
              bmcDetails={openBMCProject.bmcDetails}
              schoolId={openBMCProject.schoolId}
              projectTitle={openBMCProject.title}
              projectId={openBMCProject.projectId}
              projectDescription={openBMCProject.description}
              projectProblemStatement={openBMCProject.problemStatement}
              projectSolution={openBMCProject.solution}
            />
          </div>
        </div>
      )}
    </div>
  );
}
