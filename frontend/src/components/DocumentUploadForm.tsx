import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config/api';

const DocumentUploadForm = ({ projectId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');

  useEffect(() => {
    // Fetch project/submission details to check if document is already uploaded
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/schools/project/${projectId}`);
        const submission = res.data.submission;

        if (submission?.documentFile?.data) {
          setAlreadyUploaded(true);
          setProjectTitle(submission.projectDetails.title || 'this project');
          // setMessage(`Document already uploaded successfully for "${submission.title}"`);
        } else {
          setAlreadyUploaded(false);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setMessage('Error loading project info');
      }
    };

    fetchProject();
  }, [projectId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await axios.post(
        `${API_BASE}/api/schools/upload-document/${projectId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('Upload response:', res.data);
      setMessage(res.data.msg || 'Document uploaded successfully');
      setAlreadyUploaded(true);
      setFile(null);
      onSuccess && onSuccess();
  
    } catch (error) {
      setMessage('Upload failed: ' + (error.response?.data?.msg || 'Server error'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      {alreadyUploaded ? (
        <p className="text-green-600 text-sm font-medium">
          ✅ Document already uploaded successfully 
          {/* for "<strong>{projectTitle}</strong>" */}
        </p>
      ) : (
        <>
          <input
            type="file"
            accept=".ppt,.pptx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600"
            disabled={uploading}
          />
          <button
            type="submit"
            disabled={uploading || alreadyUploaded}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </>
      )}

      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default DocumentUploadForm;
