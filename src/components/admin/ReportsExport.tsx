import React from 'react';
import axios from 'axios';

type ReportItem = {
  label: string;
  path: string;
};

const reports: ReportItem[] = [
  { label: "Schools List", path: "school-list" },
  { label: "Submitted Projects", path: "submitted-projects" },
  { label: "Evaluator Performance", path: "evaluator-performance" },
  { label: "Stage-wise Evaluation Report", path: "stage-evaluation-report" },
  { label: "Finalist List", path: "finalist-list" },
];

const ReportsExport: React.FC = () => {
  const handleDownload = async (path: string) => {
    try {
      const response = await axios.get(`http://localhost:11129/api/admin/${path}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${path}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove(); // Cleanup
    } catch (error) {
      console.error("Download failed", error);
      alert("Error downloading report");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reports & Export</h2>
      <ul className="space-y-4">
        {reports.map((report, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
          >
            <span>{report.label}</span>
            <button
              onClick={() => handleDownload(report.path)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsExport;
