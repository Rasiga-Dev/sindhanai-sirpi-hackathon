

// // import React, { useState, useEffect } from 'react';
// // import { Upload, AlertCircle } from 'lucide-react';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // interface DocumentUploadFormProps {
// //   onNext: (data: { file: File | null }) => void;
// //   initialFile?: File | null; // Optional prop to accept an initial file
// // }

// // const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onNext, initialFile }) => {
// //   const [file, setFile] = useState<File | null>(initialFile || null);
// //   const [error, setError] = useState<string>('');

// //   useEffect(() => {
// //     if (initialFile) {
// //       setFile(initialFile);
// //     }
// //   }, [initialFile]);

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const selectedFile = e.target.files?.[0];
    
// //     if (!selectedFile) {
// //       setError('Please select a file');
// //       setFile(null);
// //       toast.error('Please select a file');
// //       return;
// //     }

// //     if (!selectedFile.name.endsWith('.pptx')) {
// //       setError('Only .pptx files are allowed');
// //       setFile(null);
// //       toast.error('Only .pptx files are allowed');
// //       return;
// //     }

// //     setError('');
// //     setFile(selectedFile);
// //     toast.success('File selected successfully!');
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!file) {
// //       setError('Please select a file');
// //       toast.error('Please select a file');
// //       return;
// //     }

// //     toast.success('File uploaded successfully!');
// //     onNext({ file });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
// //         <input
// //           type="file"
// //           accept=".pptx"
// //           onChange={handleFileChange}
// //           className="hidden"
// //           id="file-upload"
// //         />
// //         <label
// //           htmlFor="file-upload"
// //           className="cursor-pointer flex flex-col items-center justify-center space-y-4"
// //         >
// //           <Upload className="w-12 h-12 text-gray-400" />
// //           <div className="space-y-2">
// //             <p className="text-lg font-medium text-gray-700">
// //               Upload your presentation
// //             </p>
// //             <p className="text-sm text-gray-500">
// //               Only .pptx files are allowed
// //             </p>
// //           </div>
// //         </label>
// //       </div>

// //       {error && (
// //         <div className="flex items-center space-x-2 text-red-600">
// //           <AlertCircle className="w-5 h-5" />
// //           <span>{error}</span>
// //         </div>
// //       )}

// //       {file && (
// //         <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
// //           <p className="text-green-800">
// //             Selected file: {file.name}
// //           </p>
// //         </div>
// //       )}

// //       <div className="flex justify-end">
// //         <button
// //           type="submit"
// //           className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300"
// //           disabled={!file}
// //         >
// //           Save & Continue
// //         </button>
// //       </div>
      
// //       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
// //     </form>
// //   );
// // };

// // export default DocumentUploadForm;


// import React, { useState, useEffect } from 'react';
// import { Upload, AlertCircle } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface DocumentUploadFormProps {
//   onNext: (data: { file: File | null }) => void;
//   initialFile?: File | null;
// }

// const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onNext, initialFile }) => {
//   const [file, setFile] = useState<File | null>(initialFile || null);
//   const [error, setError] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (initialFile) {
//       setFile(initialFile);
//     }
//   }, [initialFile]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];

//     if (!selectedFile) {
//       setError('Please select a file');
//       setFile(null);
//       toast.error('Please select a file');
//       return;
//     }

//     const isPPTX = selectedFile.name.endsWith('.pptx');
//     const isValidMimeType =
//       selectedFile.type ===
//       'application/vnd.openxmlformats-officedocument.presentationml.presentation';

//     if (!isPPTX || !isValidMimeType) {
//       setError('Only .pptx files are allowed');
//       setFile(null);
//       toast.error('Only .pptx files are allowed');
//       return;
//     }

//     if (selectedFile.size > 5 * 1024 * 1024) {
//     setError('File too large. Max 5MB allowed.');
//     setFile(null);
//     toast.error('File too large. Max 5MB allowed.');
//     return;
//   }


//     setError('');
//     setFile(selectedFile);
//     toast.success('File selected successfully!');
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file');
//       toast.error('Please select a file');
//       return;
//     }

//     setLoading(true);

//     // Simulate a short delay if needed
//     setTimeout(() => {
//       toast.success('File uploaded successfully!');
//       onNext({ file });
//       setLoading(false);
//     }, 500);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
//         <input
//           type="file"
//           accept=".pptx"
//           onChange={handleFileChange}
//           className="hidden"
//           id="file-upload"
//         />
//         <label
//           htmlFor="file-upload"
//           className="cursor-pointer flex flex-col items-center justify-center space-y-4"
//         >
//           <Upload className="w-12 h-12 text-gray-400" />
//           <div className="space-y-2">
//             <p className="text-lg font-medium text-gray-700">
//               Upload your presentation
//             </p>
//             <p className="text-sm text-gray-500">Only .pptx files are allowed</p>
//           </div>
//         </label>
//       </div>

//       {error && (
//         <div className="flex items-center space-x-2 text-red-600">
//           <AlertCircle className="w-5 h-5" />
//           <span>{error}</span>
//         </div>
//       )}

//       {file && (
//         <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
//           <p className="text-green-800">Selected file: {file.name}</p>
//         </div>
//       )}

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300 disabled:opacity-50"
//           disabled={!file || loading}
//         >
//           {loading ? 'Uploading...' : 'Submit'}
//         </button>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </form>
//   );
// };

// export default DocumentUploadForm;
// import React, { useState } from 'react';
// import axios from 'axios';

// const DocumentUploadForm = ({ projectId, submissionIndex, onSuccess }) => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setMessage('');
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage('Please select a file');
//       return;
//     }

//     setUploading(true);
//     const formData = new FormData();
//     formData.append('document', file);
//     console.log('Uploading file:', file);
//     console.log('Project ID:', projectId);

//     try {
//       const res = await axios.post(
//         `http://localhost:11129/api/schools/upload-document/${projectId}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
    
//       console.log('Upload response:', res.data);

//       setMessage(res.data.msg || 'Document uploaded successfully');
//       setFile(null);
//       onSuccess && onSuccess();
//     } catch (error) {
//       setMessage('Upload failed: ' + (error.response?.data?.msg || 'Server error'));
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleUpload} className="space-y-4">
//       <div>
//         <input
//           type="file"
//           accept=".ppt,.pptx"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-600"
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={uploading}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//       >
//         {uploading ? 'Uploading...' : 'Upload Document'}
//       </button>
//       {message && <p className="text-sm text-green-600">{message}</p>}
//     </form>
//   );
// };

// export default DocumentUploadForm;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        const res = await axios.get(`http://localhost:11129/api/schools/project/${projectId}`);
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
        `http://localhost:11129/api/schools/upload-document/${projectId}`,
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
          ✅ Document already uploaded successfully for "<strong>{projectTitle}</strong>"
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
