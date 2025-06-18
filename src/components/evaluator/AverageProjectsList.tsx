// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BMCLayout from '../BMCLayout';

// interface Score {
//   evaluatorName: string;
//   score: number;
//   status: string;
//   evaluatedAt: string;
// }

// interface Project {
//   schoolId: string;
//   projectId: string;
//   projectTitle: string;
//   projectDescription: string;
//   problemStatement: string;
//   solution: string;
//   evaluationScores: Score[];
// }

// const AverageProjectsList = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);


//   useEffect(() => {
//     fetchProjects();
//   }, []);


//   const fetchProjects = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get('http://localhost:11129/api/evaluator/average-projects');
//       setProjects(response.data);
//       console.log('Fetched average projects:', response.data);
//     } catch (err) {
//       console.error('Summary fetch error:', err);
//     } finally {
//       setIsLoading(false); // end loading
//     }
//   };

//   const calculateAverage = (scores: Score[]) => {
//     if (scores.length !== 3) return '0.00';
//     const total = scores.reduce((acc, curr) => acc + curr.score, 0);
//     return (total / 3).toFixed(2);
//   };

//   const openModal = (project) => {
//     setSelectedProject(project);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedProject(null);
//   };

//   return (
//     <div className="p-6 overflow-auto">
//       <h2 className="text-xl font-bold mb-4 text-gray-800">Projects Evaluated by 3 Evaluators</h2>
//       {isLoading ? (
//         <div className="text-center py-10 text-lg font-medium text-gray-600">
//           Loading projects...
//           <div className="flex justify-center items-center py-10">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-800"></div>
//           </div>
//         </div>
//       ) : projects.length === 0 ? (
//         <p>No projects found.</p>
//       ) : (

//         <div className="overflow-x-auto">

//           <table className="min-w-full border border-gray-300 text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="border px-3 py-2">#</th>
//                 <th className="border px-3 py-2">Project Title</th>
//                 <th className="border px-3 py-2">Project Description</th>
//                 <th className="border px-3 py-2">Project Statement</th>
//                 <th className="border px-3 py-2">Solution</th>
//                 <th className="border px-3 py-2">BMC Details</th>
//                 <th className="border px-3 py-2">Evaluator Scores</th>
//                 <th className="border px-3 py-2">Average Score</th>
//                 <th className="border px-3 py-2">Actions</th>

//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project, idx) => (
//                 <tr key={project.projectId} className="text-center hover:bg-gray-50">
//                   <td className="border px-3 py-2">{idx + 1}</td>
//                   <td className="border px-3 py-2">{project.projectTitle}</td>
//                   <td className="border px-3 py-2">{project.projectDescription}</td>
//                   <td className="border px-3 py-2">{project.problemStatement}</td>
//                   <td className="border px-3 py-2">{project.solution}</td>
//                   <td className="p-2 border">
//                     <button
//                       onClick={() => openModal(project)}
//                       className="text-blue-600 underline hover:text-blue-800"
//                     >
//                       View BMC
//                     </button>
//                   </td>
//                   <td className="border px-3 py-2 text-left">
//                     <ul className="list-disc list-inside">
//                       {project.evaluationScores.map((score, index) => (
//                         <li key={index}>
//                           <span className="font-medium capitalize">{score.evaluatorName}</span>: {score.score}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>

//                   <td className="border px-3 py-2 text-green-800 font-semibold">
//                     {calculateAverage(project.evaluationScores)}
//                   </td>
//                   <td className="border px-3 py-2">
//                     <button className="bg-green-800 text-white px-4 py-2 rounded hover:bg-blue-600">
//                       Accept
//                     </button>
//                     <button className="bg-red-800 text-white px-4 py-2 rounded hover:bg-blue-600">
//                       Reject
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && selectedProject && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto p-6 relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
//               onClick={closeModal}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>
//             <BMCLayout
//               bmcDetails={selectedProject.bmcDetails}
//               schoolId={selectedProject.schoolId}
//               projectId={selectedProject.projectId}
//               projectTitle={selectedProject.projectTitle}
//               projectDescription={selectedProject.projectDescription}
//               projectProblemStatement={selectedProject.problemStatement}
//               projectSolution={selectedProject.solution}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AverageProjectsList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BMCLayout from '../BMCLayout';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';


interface Score {
  evaluatorName: string;
  score: number;
  status: string;
  evaluatedAt: string;
}

interface Project {
  schoolId: string;
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  problemStatement: string;
  solution: string;
  evaluationScores: Score[];
  bmcDetails: any;
}

const AverageProjectsList = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const username = localStorage.getItem('evaluatorName') || 'Evaluator';
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:11129/api/evaluator/average-projects');
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvaluationStatus = async (
    schoolId: string,
    projectId: string,
    status: string,
    avg: string
  ) => {
    try {
      await axios.put('http://localhost:11129/api/evaluator/update-evaluation-status', {
        schoolId,
        projectId,
        status,
        avg,
      });

      alert(`Project ${status === 'filtered' ? 'accepted' : 'rejected'} successfully!`);
      setProjects(prev => prev.filter(p => p.projectId !== projectId));
    } catch (err) {
      console.error('Error updating evaluation status:', err);
      alert('Failed to update project status');
    }
  };



  const calculateAverage = (scores: Score[]) => {
    if (scores.length !== 3) return '0.00';
    const total = scores.reduce((acc, curr) => acc + curr.score, 0);
    return (total / 3).toFixed(2);
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('evaluatorToken');
    localStorage.removeItem('evaluatorName');
    localStorage.removeItem('evaluatorId');
    navigate('/evaluator-login');
  };

  const handleSortByAverage = () => {
    const sorted = [...projects].sort((a, b) => {
      const avgA = parseFloat(calculateAverage(a.evaluationScores));
      const avgB = parseFloat(calculateAverage(b.evaluationScores));
      return sortOrder === 'asc' ? avgA - avgB : avgB - avgA;
    });

    setProjects(sorted);
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };


  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-50 min-h-screen">
      <header className="bg-red-800 shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-semibold text-white">Evaluator Projetcs View Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white text-red-800 flex items-center justify-center font-semibold">
                {username?.charAt(0).toUpperCase()}
              </div>
              <span className="text-white">{username}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white hover:text-white"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow-sm">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>

      ) : (

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Scroll wrapper */}
          <div className="max-h-[70vh] overflow-y-auto overflow-x-auto">
            <table className="w-full table-fixed text-sm text-gray-700">
              <thead className="sticky top-0 z-10 bg-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider border-b border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left w-[40px]">#</th>
                  <th className="px-6 py-4 text-left w-[180px]">Project Title</th>
                  <th className="px-6 py-4 text-left w-[250px]">Description</th>
                  <th className="px-6 py-4 text-left w-[220px]">Problem</th>
                  <th className="px-6 py-4 text-left w-[220px]">Solution</th>
                  <th className="px-6 py-4 text-center w-[100px]">BMC</th>
                  <th className="px-6 py-4 text-left w-[200px]">Evaluator Scores</th>
                  <th
                    className="px-6 py-4 text-center w-[100px] cursor-pointer select-none flex items-center justify-center gap-1"
                    onClick={handleSortByAverage}
                  >
                    <span className="font-semibold text-xs uppercase text-gray-600">Avg.</span>
                    {sortOrder === 'asc' ? (
                      <FaArrowUp className="text-base text-gray-700" />
                    ) : (
                      <FaArrowDown className="text-base text-gray-700" />
                    )}
                  </th>


                  <th className="px-6 py-4 text-center w-[350px]">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {projects.map((project, idx) => (
                  <tr
                    key={project.projectId}
                    className="hover:bg-gray-50 transition duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 w-[40px] font-medium text-gray-800">{idx + 1}</td>
                    <td className="px-6 py-4 w-[180px] font-semibold text-blue-900 break-words">{project.projectTitle}</td>
                    <td className="px-6 py-4 w-[250px] font-semibold text-blue-900 break-words">{project.projectDescription}</td>
                    <td className="px-6 py-4 w-[220px] font-semibold text-blue-900 break-words">{project.problemStatement}</td>
                    <td className="px-6 py-4 w-[220px] font-semibold text-blue-900 break-words">{project.solution}</td>
                    <td className="px-6 py-4 w-[100px] text-center">
                      <button
                        onClick={() => openModal(project)}
                        className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
                      >
                        View BMC
                      </button>
                    </td>
                    <td className="px-6 py-4 w-[220px]">
                      <ul className="space-y-1">
                        {project.evaluationScores.map((score, i) => (
                          <li key={i}>
                            <span className="text-gray-800 font-medium capitalize">{score.evaluatorName}</span>:{" "}
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-white text-xs font-semibold ${score.score >= 7
                                ? "bg-emerald-500"
                                : score.score >= 5
                                  ? "bg-yellow-500"
                                  : "bg-rose-500"
                                }`}
                            >
                              {score.score}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 w-[100px] text-center">
                      <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm shadow">
                        {calculateAverage(project.evaluationScores)}
                      </span>
                    </td>
                    <td className="px-6 py-4 w-[350px] text-center space-x-2">
                      <button
                        onClick={() =>
                          updateEvaluationStatus(
                            project.schoolId,
                            project.projectId,
                            'filtered',
                            calculateAverage(project.evaluationScores)
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-xs transition shadow"
                      >
                        Accept
                      </button>


                      <button
                        onClick={() =>
                          updateEvaluationStatus(
                            project.schoolId,
                            project.projectId,
                            'not-filtered',
                            calculateAverage(project.evaluationScores)
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-xs transition shadow"
                      >
                        Reject
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      )}

      {/* Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
          <div className="bg-white/90 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-700 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
            <div className="p-6">
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
        </div>
      )}
    </div>
  );
};

export default AverageProjectsList;
