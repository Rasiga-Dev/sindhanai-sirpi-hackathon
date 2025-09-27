import React from 'react';

interface Project {
  _id: string;
  schoolId: string;
  projectDetails?: {
    title: string;
  };
  evaluationStatus: string;
  evaluationScores?: Array<{
    evaluatorName: string;
    score: number;
    status: string;
    evaluatedAt: string;
  }>;
  tempReason?: string;
}

interface Props {
  projects: Project[];
  listType: 'l1' | 'l2';
  username: string;
}

export default function EvaluatedList({ projects, listType, username }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        {listType === 'l1' ? 'L1 Level Evaluated Projects' : 'L2 Level Evaluated Projects'}
      </h2>
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score/Feedback</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4">{project.schoolId}</td>
                <td className="px-6 py-4">{project.projectDetails?.title}</td>
                <td className="px-6 py-4">{project.evaluationStatus}</td>
                <td className="px-6 py-4">
                  {listType === 'l2'
                    ? project.evaluationScores?.find(score => score.evaluatorName === username)?.score
                    : project.tempReason}
                </td>
                <td className="px-6 py-4">
                  {new Date(project.evaluationScores?.[0]?.evaluatedAt || '').toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}