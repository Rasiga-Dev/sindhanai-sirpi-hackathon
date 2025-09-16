

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BMCLayout from '../BMCLayout';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE } from '../../config/api';


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
      const response = await axios.get(`${API_BASE}/api/evaluator/average-projects`);
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
      await axios.put(`${API_BASE}/api/evaluator/update-evaluation-status`, {
        schoolId,
        projectId,
        status,
        avg,
      });

      toast.success(`Project ${status === 'filtered' ? 'accepted' : 'rejected'} successfully!`);
      setProjects(prev => prev.filter(p => p.projectId !== projectId));
    } catch (err) {
      console.error('Error updating evaluation status:', err);
      toast.error('Failed to update project status');
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

         <div className="grid gap-4 max-h-[70vh] overflow-y-auto p-4">
      {projects.map((project, idx) => (
        <div
          key={project.projectId}
          className="border rounded-2xl shadow-xl bg-white p-5 space-y-4 hover:shadow-2xl transition duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-blue-900">{idx + 1}. {project.projectTitle}</h2>
              <p className="text-sm text-gray-600 mt-1">{project.projectDescription}</p>
            </div>
            <button
              onClick={() => openModal(project)}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
            >
              View BMC
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 font-medium">Problem Statement:</p>
              <p className="text-blue-900 font-semibold">{project.problemStatement}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Solution:</p>
              <p className="text-blue-900 font-semibold">{project.solution}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Evaluator Scores:</p>
              <ul className="space-y-1">
                {project.evaluationScores.map((score, i) => (
                  <li key={i}>
                    <span className="text-gray-800 font-medium capitalize">{score.evaluatorName}</span>: {" "}
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
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Avg. Score</span>
              <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm shadow">
                {calculateAverage(project.evaluationScores)}
              </span>
              <span
                className="cursor-pointer select-none"
                onClick={handleSortByAverage}
              >
                {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
              </span>
            </div>

            <div className="flex gap-2 mt-2 md:mt-0">
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
            </div>
          </div>
        </div>
      ))}
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

      <ToastContainer  position="top-right"  autoClose={3000} />

    </div>
  );
};

export default AverageProjectsList;
