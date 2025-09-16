
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BMCLayout from '../../components/BMCLayout';
import { API_BASE } from '../../config/api';

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

      const response = await axios.post(`${API_BASE}/api/evaluator/submit-score`, {
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
      const response = await axios.get(`${API_BASE}/api/evaluator/level-2-summary`, {
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
