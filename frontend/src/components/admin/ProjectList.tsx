import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:11129/api/admin/project-list');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching project list:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">📄 Project List</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-red-500">No projects submitted yet.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-blue-100 text-left text-sm font-medium text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">School Name</th>
                
                <th className="px-4 py-2 border">Project Title</th>
                <th className="px-4 py-2 border">Team Size</th>
                <th className="px-4 py-2 border">Guide Teacher</th>
                <th className="px-4 py-2 border">Submitted At</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Evaluation Status</th>
                <th className="px-4 py-2 border">Document</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {projects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{project.schoolName}</td>
                 
                  <td className="px-4 py-2 border">{project.projectDetails.title}</td>
                  <td className="px-4 py-2 border">{project.projectDetails.teamSize}</td>
                   <td className="px-4 py-2 border">{project.guideTeacherName}</td>
                  <td className="px-4 py-2 border">
                    {project.submittedAt ? new Date(project.submittedAt).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.paymentStatus === 'successful'
                          ? 'bg-green-100 text-green-700'
                          : project.paymentStatus === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {project.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{project.evaluationStatus}</td>
                  <td className="px-4 py-2 border text-center">
                    {project.projectDocument ? (
                      <a
                        href={project.projectDocument.base64}
                        download={project.projectDocument.filename}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Download
                      </a>
                    ) : (
                      'Not Uploaded'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
