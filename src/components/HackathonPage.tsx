


import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HackathonPage = () => {
  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch('http://localhost:11129/api/download/template');
      if (!response.ok) throw new Error('Failed to download template');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hackathon_template.pptx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Template downloaded successfully');
    } catch (error) {
      toast.error('Failed to download template');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-red-800 mb-6">Hackathon Template Download</h1>
        <p className="text-lg text-center mb-6">
          Download the official Hackathon template to get started with your submissions.
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleDownloadTemplate}
            className="bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-900 transition duration-300"
          >
            Download Template
          </button>
        </div>
      </div>

      {/* Toast container for showing notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default HackathonPage;
