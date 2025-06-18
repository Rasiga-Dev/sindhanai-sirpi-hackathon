

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-hot-toast';
// // import ProjectDetailsForm from './ProjectDetailsForm';
// // import StudentDetailsForm from './StudentDetailsForm';
// // import BMCForm from './BMCForm';
// // import DocumentUploadForm from './DocumentUploadForm';
// // import QRCodePaymentForm from './QRCodePaymentForm';
// // import { useNavigate } from 'react-router-dom';

// // interface TeamMember {
// //   name: string;
// //   fatherName: string;
// //   dateOfBirth: string;
// //   gender: string;
// //   community: string;
// //   district: string;
// //   standard: string;
// //   email: string;
// //   contactNumber: string;
// // }

// // interface ProjectDetails {
// //   teamSize: number;
// //   ideaTitle: string;
// //   ideaDescription: string;
// // }

// // interface BMCData {
// //   problem: string;
// //   solution: string;
// //   uniqueValueProposition: string;
// // }

// // const steps = [
// //   'Project Details',
// //   'Student Details',
// //   'BMC Details',
// //   'Project Document Upload',
// //   'QR Code Payment',
// // ];

// // const IdeaSubmissionForm: React.FC = () => {
// //   const [guideTeachers, setGuideTeachers] = useState<any[]>([]);
// //   const [message, setMessage] = useState('');
// //   const [selectedTeacher, setSelectedTeacher] = useState('');
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const [teamSize, setTeamSize] = useState(3);
// //   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
// //   const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
// //   const [bmcData, setBmcData] = useState<BMCData | null>(null);
// //   const [documentFile, setDocumentFile] = useState<File | null>(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const navigate = useNavigate();

// //   const fetchGuideTeachers = async () => {
// //     try {
// //       const token = localStorage.getItem('schoolToken');
// //       if (!token) {
// //         setMessage('You are not authenticated. Please log in again.');
// //         return;
// //       }

// //       const response = await axios.get('http://localhost:11129/api/school/get-registered-guide-teachers', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (response.data.length > 0) {
// //         setGuideTeachers(response.data);
// //         setMessage('');
// //       } else {
// //         setMessage('First, register a guide teacher to proceed.');
// //       }
// //     } catch (error: any) {
// //       console.error('Error fetching guide teachers:', error);
// //       if (error.response?.status === 401) {
// //         setMessage('Authentication failed. Please log in again.');
// //       } else {
// //         setMessage('Error loading guide teachers.');
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     fetchGuideTeachers();
// //   }, []);

// //   const handleSubmitTeacher = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (selectedTeacher) {
// //       setCurrentStep(0);
// //     } else {
// //       alert('Please choose a guide teacher.');
// //     }
// //   };

// //   const handleNext = () => {
// //     if (currentStep < steps.length - 1) {
// //       setCurrentStep(currentStep + 1);
// //     }
// //   };

// //   const handleBack = () => {
// //     if (currentStep > 0) {
// //       setCurrentStep(currentStep - 1);
// //     }
// //   };


// // const handleFinalSubmission = async ({ transactionId, screenshot }: { transactionId: string; screenshot: File }) => {
// //   setIsSubmitting(true);
// //   try {
// //     const schoolDetails = localStorage.getItem('schoolDetails');
// //     if (!schoolDetails) throw new Error('School details not found in local storage');

// //     const parsedSchoolDetails = JSON.parse(schoolDetails);
// //     if (!parsedSchoolDetails.udiseCode) throw new Error('UDISE Code is missing in school details');

// //     const formData = new FormData();
// //     formData.append('udiseCode', parsedSchoolDetails.udiseCode);
// //     formData.append('projectDetails', JSON.stringify(projectDetails));
// //     formData.append('studentDetails', JSON.stringify(teamMembers));
// //     formData.append('bmcDetails', JSON.stringify(bmcData));

// //     if (documentFile) {
// //       formData.append('documentFile', documentFile);
// //     }

// //     formData.append('transactionId', transactionId);
// //     formData.append('paymentScreenshot', screenshot);

// //     // Debug logs
// //     console.log('Submitting FormData entries:');
// //     for (let [key, value] of formData.entries()) {
// //       console.log(key, value);
// //     }

// //     // Remove manual content-type header!
// //     const response = await axios.post(
// //       'http://localhost:11129/api/schools/submit-idea',
// //       formData
// //     );

// //     toast.success('Submission completed successfully!');
// //     navigate('/thank-you');
// //   } catch (error) {
// //     console.error('Submission error:', error);
// //     toast.error('Failed to submit. Please try again.');
// //   } finally {
// //     setIsSubmitting(false);
// //   }
// // };



// //   const renderStepContent = () => {
// //     switch (currentStep) {
// //       case 0:
// //         return (
// //           <ProjectDetailsForm
// //             initialData={projectDetails}
// //             onNext={(data: ProjectDetails) => {
// //               setProjectDetails(data);
// //               setTeamSize(data.teamSize);
// //               if (teamMembers.length !== data.teamSize) {
// //                 setTeamMembers(
// //                   Array.from({ length: data.teamSize }, (_, index) => teamMembers[index] || {
// //                     name: '',
// //                     fatherName: '',
// //                     dateOfBirth: '',
// //                     gender: 'male',
// //                     community: 'General',
// //                     district: '',
// //                     standard: '',
// //                     email: '',
// //                     contactNumber: '',
// //                   })
// //                 );
// //               }
// //               handleNext();
// //             }}
// //           />
// //         );
// //       case 1:
// //         return (
// //           <StudentDetailsForm
// //             teamMemberCount={teamSize}
// //             initialData={teamMembers}
// //             onNext={(data: TeamMember[]) => {
// //               setTeamMembers(data);
// //               handleNext();
// //             }}
// //           />
// //         );
// //       case 2:
// //         return (
// //           <BMCForm
// //             initialData={bmcData}
// //             onNext={(data: BMCData) => {
// //               setBmcData(data);
// //               handleNext();
// //             }}
// //           />
// //         );
// //       case 3:
// //         return (
// //           <DocumentUploadForm
// //             initialFile={documentFile}
// //             onNext={(data: { file: File }) => {
// //               setDocumentFile(data.file);
// //               handleNext();
// //             }}
// //           />

// //         );
// //       case 4:
// //         return (
// //           <QRCodePaymentForm
// //             onNext={({ transactionId, screenshot }) =>
// //               handleFinalSubmission({ transactionId, screenshot })}
// //           />

// //         )

// //       //  <QRCodePaymentForm onNext={handleFinalSubmission} />;


// //       default:
// //         return <div>Unknown Step</div>;
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
// //       {!selectedTeacher ? (
// //         <>
// //           <h2 className="text-2xl font-semibold mb-4">Idea Submission Form</h2>
// //           <p className="text-gray-700 mb-4">
// //             {message || 'First of all, choose the guide teacher to submit your idea.'}
// //           </p>

// //           {guideTeachers.length > 0 && (
// //             <form onSubmit={handleSubmitTeacher}>
// //               <div className="mb-4">
// //                 <label htmlFor="guideTeacher" className="block text-sm font-medium text-gray-700">
// //                   Choose a Guide Teacher
// //                 </label>
// //                 <select
// //                   id="guideTeacher"
// //                   name="guideTeacher"
// //                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
// //                   value={selectedTeacher}
// //                   onChange={(e) => setSelectedTeacher(e.target.value)}
// //                 >
// //                   <option value="">Select a teacher</option>
// //                   {guideTeachers.map((teacher) => (
// //                     <option key={teacher.email} value={teacher.name}>
// //                       {teacher.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="w-full px-4 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-900"
// //               >
// //                 Proceed
// //               </button>
// //             </form>
// //           )}

// //           {guideTeachers.length === 0 && !message && (
// //             <p className="mt-4 text-red-600">No registered guide teachers found.</p>
// //           )}
// //         </>
// //       ) : (
// //         <>
// //           <div className="flex items-center justify-between mb-8">
// //             {steps.map((label, index) => (
// //               <div key={index} className="flex-1 flex flex-col items-center relative">
// //                 <div
// //                   className={`rounded-full w-8 h-8 flex items-center justify-center
// //                     ${index <= currentStep ? 'bg-red-800 text-white' : 'bg-gray-300 text-gray-600'}`}
// //                 >
// //                   {index + 1}
// //                 </div>
// //                 <span
// //                   className={`text-sm mt-2 ${index <= currentStep ? 'text-black font-medium' : 'text-gray-400'}`}
// //                 >
// //                   {label}
// //                 </span>

// //                 {index !== steps.length - 1 && (
// //                   <div
// //                     className={`absolute top-4 right-0 w-full h-0.5
// //                       ${index < currentStep ? 'bg-red-800' : 'bg-gray-300'}`}
// //                     style={{ zIndex: -1 }}
// //                   ></div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           <h3 className="text-xl font-bold text-red-800 mb-4">{steps[currentStep]}</h3>
// //           <div className="mb-6">{renderStepContent()}</div>

// //           <div className="flex justify-between">
// //             <button
// //               onClick={handleBack}
// //               disabled={currentStep === 0 || isSubmitting}
// //               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400"
// //             >
// //               Back
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default IdeaSubmissionForm;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import ProjectDetailsForm from './ProjectDetailsForm';
// import StudentDetailsForm from './StudentDetailsForm';
// import BMCForm from './BMCForm';
// import DocumentUploadForm from './DocumentUploadForm';
// import QRCodePaymentForm from './QRCodePaymentForm';
// import { useNavigate } from 'react-router-dom';

// interface TeamMember {
//   name: string;
//   fatherName: string;
//   dateOfBirth: string;
//   gender: string;
//   community: string;
//   district: string;
//   standard: string;
//   email: string;
//   contactNumber: string;
// }

// interface ProjectDetails {
//   teamSize: number;
//   ideaTitle: string;
//   ideaDescription: string;
// }

// interface BMCData {
//   problem: string;
//   solution: string;
//   uniqueValueProposition: string;
// }

// const steps = [
//   'Project Details',
//   'Student Details',
//   'BMC Details',
//   'Project Document Upload',
//   'QR Code Payment',
// ];

// const IdeaSubmissionForm: React.FC = () => {
//   const [guideTeachers, setGuideTeachers] = useState<any[]>([]);
//   const [message, setMessage] = useState('');
//   const [selectedTeacher, setSelectedTeacher] = useState('');
//   const [currentStep, setCurrentStep] = useState(0);
//   const [teamSize, setTeamSize] = useState(3);
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
//   const [bmcData, setBmcData] = useState<BMCData | null>(null);
//   const [documentFile, setDocumentFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const navigate = useNavigate();

//   // Ref to track data changes for autosave
//   const dataChanged = useRef(false);

//   // Fetch guide teachers
//   const fetchGuideTeachers = async () => {
//     try {
//       const token = localStorage.getItem('schoolToken');
//       if (!token) {
//         setMessage('You are not authenticated. Please log in again.');
//         return;
//       }

//       const response = await axios.get('http://localhost:11129/api/school/get-registered-guide-teachers', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.length > 0) {
//         setGuideTeachers(response.data);
//         setMessage('');
//       } else {
//         setMessage('First, register a guide teacher to proceed.');
//       }
//     } catch (error: any) {
//       console.error('Error fetching guide teachers:', error);
//       if (error.response?.status === 401) {
//         setMessage('Authentication failed. Please log in again.');
//       } else {
//         setMessage('Error loading guide teachers.');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchGuideTeachers();
//   }, []);

//   // Mark data changed whenever user modifies any form data
//   // This helper will be called inside all setX functions or onChange handlers

//   // Handle manual draft save
//   // Add these functions inside your component
// const saveDraft = async (data: any) => {
//   try {
//     const schoolDetails = localStorage.getItem('schoolDetails');
//     if (!schoolDetails) throw new Error('School details not found');

//     const { udiseCode } = JSON.parse(schoolDetails);
//     const token = localStorage.getItem('schoolToken');

//     await axios.post(
//       'http://localhost:11129/api/schools/drafts',
//       {
//         udiseCode,
//         ...data
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );
//   } catch (error) {
//     console.error('Error saving draft:', error);
//     // Don't show error toast for auto-save
//   }
// };

// const loadDraft = async () => {
//   try {
//     const schoolDetails = localStorage.getItem('schoolDetails');
//     if (!schoolDetails) throw new Error('School details not found');

//     const { udiseCode } = JSON.parse(schoolDetails);
//     const token = localStorage.getItem('schoolToken');

//     const response = await axios.get(
//       `http://localhost:11129/api/schools/drafts/${udiseCode}`,
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     const draft = response.data;

//     // Restore form state
//     if (draft.projectDetails) setProjectDetails(draft.projectDetails);
//     if (draft.studentDetails) setTeamMembers(draft.studentDetails);
//     if (draft.bmcDetails) setBmcData(draft.bmcDetails);
//     if (draft.currentStep) setCurrentStep(draft.currentStep);

//     toast.success('Draft loaded successfully');
//   } catch (error) {
//     if (error.response?.status !== 404) {
//       console.error('Error loading draft:', error);
//       toast.error('Error loading draft');
//     }
//   }
// };

// // Add this useEffect to load draft on mount
// useEffect(() => {
//   loadDraft();
// }, []);

// // Modify your form step handlers to save drafts
// const handleProjectDetailsNext = (data: ProjectDetails) => {
//   setProjectDetails(data);
//   setTeamSize(data.teamSize);
//   if (teamMembers.length !== data.teamSize) {
//     setTeamMembers(
//       Array.from({ length: data.teamSize }, (_, index) => teamMembers[index] || {
//         name: '',
//         fatherName: '',
//         dateOfBirth: '',
//         gender: 'male',
//         community: 'General',
//         district: '',
//         standard: '',
//         email: '',
//         contactNumber: '',
//       })
//     );
//   }
//   saveDraft({
//     projectDetails: data,
//     currentStep: currentStep + 1
//   });
//   handleNext();
// };

// const handleStudentDetailsNext = (data: TeamMember[]) => {
//   setTeamMembers(data);
//   saveDraft({
//     studentDetails: data,
//     currentStep: currentStep + 1
//   });
//   handleNext();
// };

// const handleBMCNext = (data: BMCData) => {
//   setBmcData(data);
//   saveDraft({
//     bmcDetails: data,
//     currentStep: currentStep + 1
//   });
//   handleNext();
// };

// // Add auto-save functionality
// useEffect(() => {
//   const autoSaveInterval = setInterval(() => {
//     if (projectDetails || teamMembers.length || bmcData) {
//       saveDraft({
//         projectDetails,
//         studentDetails: teamMembers,
//         bmcDetails: bmcData,
//         currentStep
//       });
//     }
//   }, 30000); // Auto-save every 30 seconds

//   return () => clearInterval(autoSaveInterval);
// }, [projectDetails, teamMembers, bmcData, currentStep]);

//   // When user selects guide teacher
//   const handleSubmitTeacher = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedTeacher) {
//       setCurrentStep(0);
//     } else {
//       alert('Please choose a guide teacher.');
//     }
//   };

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//       dataChanged.current = true;
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//       dataChanged.current = true;
//     }
//   };

//   // When updating any data, mark changed
//   const updateProjectDetails = (data: ProjectDetails) => {
//     setProjectDetails(data);
//     setTeamSize(data.teamSize);
//     if (teamMembers.length !== data.teamSize) {
//       setTeamMembers(
//         Array.from({ length: data.teamSize }, (_, index) => teamMembers[index] || {
//           name: '',
//           fatherName: '',
//           dateOfBirth: '',
//           gender: 'male',
//           community: 'General',
//           district: '',
//           standard: '',
//           email: '',
//           contactNumber: '',
//         })
//       );
//     }
//     dataChanged.current = true;
//   };

//   const updateTeamMembers = (data: TeamMember[]) => {
//     setTeamMembers(data);
//     dataChanged.current = true;
//   };

//   const updateBmcData = (data: BMCData) => {
//     setBmcData(data);
//     dataChanged.current = true;
//   };

//   const updateDocumentFile = (file: File) => {
//     setDocumentFile(file);
//     dataChanged.current = true;
//   };

//   const handleFinalSubmission = async ({ transactionId, screenshot }: { transactionId: string; screenshot: File }) => {
//     setIsSubmitting(true);
//     try {
//       const schoolDetails = localStorage.getItem('schoolDetails');
//       if (!schoolDetails) throw new Error('School details not found in local storage');

//       const parsedSchoolDetails = JSON.parse(schoolDetails);
//       if (!parsedSchoolDetails.udiseCode) throw new Error('UDISE Code is missing in school details');

//       const formData = new FormData();
//       formData.append('udiseCode', parsedSchoolDetails.udiseCode);
//       formData.append('guideTeacher', selectedTeacher);
//       formData.append('projectDetails', JSON.stringify(projectDetails));
//       formData.append('studentDetails', JSON.stringify(teamMembers));
//       formData.append('bmcDetails', JSON.stringify(bmcData));

//       if (documentFile) {
//         formData.append('documentFile', documentFile);
//       }

//       formData.append('transactionId', transactionId);
//       formData.append('paymentScreenshot', screenshot);

//       const response = await axios.post(
//         'http://localhost:11129/api/schools/submit-idea',
//         formData
//       );

//       toast.success('Submission completed successfully!');
//       navigate('/thank-you');
//     } catch (error) {
//       console.error('Submission error:', error);
//       toast.error('Failed to submit. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <ProjectDetailsForm
//             initialData={projectDetails}
//             onNext={(data: ProjectDetails) => {
//               updateProjectDetails(data);
//               handleNext();
//             }}
//           />
//         );
//       case 1:
//         return (
//           <StudentDetailsForm
//             teamMemberCount={teamSize}
//             initialData={teamMembers}
//             onNext={(data: TeamMember[]) => {
//               updateTeamMembers(data);
//               handleNext();
//             }}
//           />
//         );
//       case 2:
//         return (
//           <BMCForm
//             initialData={bmcData}
//             onNext={(data: BMCData) => {
//               updateBmcData(data);
//               handleNext();
//             }}
//           />
//         );
//       case 3:
//         return (
//           <DocumentUploadForm
//             initialFile={documentFile}
//             onNext={(data: { file: File }) => {
//               updateDocumentFile(data.file);
//               handleNext();
//             }}
//           />
//         );
//       case 4:
//         return (
//           <QRCodePaymentForm
//             onNext={({ transactionId, screenshot }) =>
//               handleFinalSubmission({ transactionId, screenshot })
//             }
//           />
//         );
//       default:
//         return <div>Unknown Step</div>;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       {!selectedTeacher ? (
//         <>
//           <h2 className="text-2xl font-semibold mb-4">Idea Submission Form</h2>
//           <p className="text-gray-700 mb-4">
//             {message || 'First of all, choose the guide teacher to submit your idea.'}
//           </p>

//           {guideTeachers.length > 0 && (
//             <form onSubmit={handleSubmitTeacher}>
//               <div className="mb-4">
//                 <label htmlFor="guideTeacher" className="block text-sm font-medium text-gray-700">
//                   Choose a Guide Teacher
//                 </label>
//                 <select
//                   id="guideTeacher"
//                   name="guideTeacher"
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                   value={selectedTeacher}
//                   onChange={(e) => {
//                     setSelectedTeacher(e.target.value);
//                     dataChanged.current = true;
//                   }}
//                 >
//                   <option value="">Select a teacher</option>
//                   {guideTeachers.map((teacher) => (
//                     <option key={teacher.email} value={teacher.name}>
//                       {teacher.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-900"
//               >
//                 Proceed
//               </button>
//             </form>
//           )}

//           {guideTeachers.length === 0 && !message && (
//             <p className="mt-4 text-red-600">No registered guide teachers found.</p>
//           )}
//         </>
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-8">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 flex flex-col items-center relative">
//                 <div
//                   className={`rounded-full w-8 h-8 flex items-center justify-center
//                     ${index <= currentStep ? 'bg-red-800 text-white' : 'bg-gray-300 text-gray-600'}`}
//                 >
//                   {index + 1}
//                 </div>
//                 <span
//                   className={`text-sm mt-2 ${
//                     index <= currentStep ? 'text-red-800 font-semibold' : 'text-gray-600'
//                   }`}
//                 >
//                   {label}
//                 </span>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`absolute top-4 right-0 w-full h-1
//                       ${index < currentStep ? 'bg-red-800' : 'bg-gray-300'}`}
//                     style={{ zIndex: -1, left: '50%', right: '-50%' }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div>{renderStepContent()}</div>

//           <div className="flex justify-between mt-6">
//             <button
//               disabled={currentStep === 0}
//               onClick={handleBack}
//               className={`px-4 py-2 rounded-md border ${
//                 currentStep === 0
//                   ? 'border-gray-300 text-gray-400 cursor-not-allowed'
//                   : 'border-red-800 text-red-800 hover:bg-red-100'
//               }`}
//             >
//               Back
//             </button>

//             <button
//               onClick={saveDraft}
//               disabled={isSavingDraft}
//               className={`px-4 py-2 rounded-md bg-yellow-400 text-white hover:bg-yellow-500
//                 ${isSavingDraft ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               {isSavingDraft ? 'Saving Draft...' : 'Save Draft'}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default IdeaSubmissionForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ProjectDetailsForm from './ProjectDetailsForm';
import StudentDetailsForm from './StudentDetailsForm';
import BMCForm from './BMCForm';
import DocumentUploadForm from './DocumentUploadForm';
import QRCodePaymentForm from './QRCodePaymentForm';
import { useNavigate } from 'react-router-dom';

interface TeamMember {
  name: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  community: string;
  district: string;
  standard: string;
  email: string;
  contactNumber: string;
}

interface ProjectDetails {
  teamSize: number;
  ideaTitle: string;
  ideaDescription: string;
  problemStatement: string;
  solution: string;
}

interface BMCData {
  customerSegments: string;
  valuePropositions: string;
  channels: string;
  customerRelationships: string;
  revenueStreams: string;
  keyResources: string;
  keyActivities: string;
  keyPartners: string;
  costStructure: string;
}

const steps = [
  'Project Details',
  'Student Details',
  'BMC Details',
  'QR Code Payment',
];

const IdeaSubmissionForm: React.FC = () => {
  const [guideTeachers, setGuideTeachers] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [teamSize, setTeamSize] = useState(3);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const [bmcData, setBmcData] = useState<BMCData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Load draft on mount
  useEffect(() => {
    loadDraft();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (projectDetails || teamMembers.length || bmcData) {
        saveDraft({
          projectDetails,
          studentDetails: teamMembers,
          bmcDetails: bmcData,
          currentStep
        });
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [projectDetails, teamMembers, bmcData, currentStep]);

  const saveDraft = async (data: any) => {
    try {
      const schoolDetails = localStorage.getItem('schoolDetails');
      if (!schoolDetails) throw new Error('School details not found');

      const { udiseCode } = JSON.parse(schoolDetails);
      const token = localStorage.getItem('schoolToken');

      await axios.post(
        'http://localhost:11129/api/schools/drafts',
        {
          udiseCode,
          ...data
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const loadDraft = async () => {
    try {
      const schoolDetails = localStorage.getItem('schoolDetails');
      if (!schoolDetails) throw new Error('School details not found');

      const { udiseCode } = JSON.parse(schoolDetails);
      const token = localStorage.getItem('schoolToken');

      const response = await axios.get(
        `http://localhost:11129/api/schools/drafts/${udiseCode}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const draft = response.data;

      if (draft.projectDetails) setProjectDetails(draft.projectDetails);
      if (draft.studentDetails) setTeamMembers(draft.studentDetails);
      if (draft.bmcDetails) setBmcData(draft.bmcDetails);
      if (draft.currentStep) setCurrentStep(draft.currentStep);

      toast.success('Draft loaded successfully');
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error loading draft:', error);
        toast.error('Error loading draft');
      }
    }
  };

  const fetchGuideTeachers = async () => {
    try {
      const token = localStorage.getItem('schoolToken');
      if (!token) {
        setMessage('You are not authenticated. Please log in again.');
        return;
      }

      const response = await axios.get('http://localhost:11129/api/school/get-registered-guide-teachers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.length > 0) {
        setGuideTeachers(response.data);
        setMessage('');
      } else {
        setMessage('First, register a guide teacher to proceed.');
      }
    } catch (error: any) {
      console.error('Error fetching guide teachers:', error);
      if (error.response?.status === 401) {
        setMessage('Authentication failed. Please log in again.');
      } else {
        setMessage('Error loading guide teachers.');
      }
    }
  };

  useEffect(() => {
    fetchGuideTeachers();
  }, []);

  const handleSubmitTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeacher) {
      setCurrentStep(0);
    } else {
      toast.error('Please choose a guide teacher.');
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmission = async ({
    transactionId,
  }) => {
    setIsSubmitting(true);
    try {
      const schoolDetails = localStorage.getItem('schoolDetails');
      if (!schoolDetails) throw new Error('School details not found in local storage');

      const parsedSchoolDetails = JSON.parse(schoolDetails);
      if (!parsedSchoolDetails.udiseCode) throw new Error('UDISE Code is missing in school details');

      const formData = new FormData();
      formData.append('udiseCode', parsedSchoolDetails.udiseCode);
      formData.append('projectDetails', JSON.stringify(projectDetails));
      formData.append('studentDetails', JSON.stringify(teamMembers));
      formData.append('bmcDetails', JSON.stringify(bmcData));



      formData.append('transactionId', transactionId);

      const response = await axios.post(
        'http://localhost:11129/api/schools/submit-idea',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // Delete draft after successful submission
      const token = localStorage.getItem('schoolToken');
      await axios.delete(
        `http://localhost:11129/api/schools/drafts/${parsedSchoolDetails.udiseCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Submission completed successfully!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectDetailsForm
            initialData={projectDetails}
            onNext={(data: ProjectDetails) => {
              setProjectDetails(data);
              setTeamSize(data.teamSize);
              if (teamMembers.length !== data.teamSize) {
                setTeamMembers(
                  Array.from({ length: data.teamSize }, (_, index) => teamMembers[index] || {
                    name: '',
                    fatherName: '',
                    dateOfBirth: '',
                    gender: 'male',
                    community: 'General',
                    district: '',
                    standard: '',
                    email: '',
                    contactNumber: '',
                  })
                );
              }
              saveDraft({
                projectDetails: data,
                currentStep: currentStep + 1
              });
              handleNext();
            }}
          />
        );
      case 1:
        return (
          <StudentDetailsForm
            teamMemberCount={teamSize}
            initialData={teamMembers}
            onNext={(data: TeamMember[]) => {
              setTeamMembers(data);
              saveDraft({
                studentDetails: data,
                currentStep: currentStep + 1
              });
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <BMCForm
            initialData={bmcData}
            onNext={(data: BMCData) => {
              setBmcData(data);
              saveDraft({
                bmcDetails: data,
                currentStep: currentStep + 1
              });
              handleNext();
            }}
          />
        );


      case 3:
        return (
          <QRCodePaymentForm
            onNext={({ transactionId }) =>
              handleFinalSubmission({ transactionId })}
          />
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  useEffect(() => {
    if (
      currentStep >= 1 &&
      projectDetails?.teamSize &&
      (!teamMembers || teamMembers.length !== projectDetails.teamSize)
    ) {
      setTeamMembers(
        Array.from({ length: projectDetails.teamSize }, (_, index) => teamMembers?.[index] || {
          name: '',
          fatherName: '',
          dateOfBirth: '',
          gender: 'male',
          community: 'General',
          district: '',
          standard: '',
          email: '',
          contactNumber: '',
        })
      );
    }
  }, [currentStep, projectDetails, teamMembers]);


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {!selectedTeacher ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Idea Submission Form</h2>
          <p className="text-gray-700 mb-4">
            {message || 'First of all, choose the guide teacher to submit your idea.'}
          </p>

          {guideTeachers.length > 0 && (
            <form onSubmit={handleSubmitTeacher}>
              <div className="mb-4">
                <label htmlFor="guideTeacher" className="block text-sm font-medium text-gray-700">
                  Choose a Guide Teacher
                </label>
                <select
                  id="guideTeacher"
                  name="guideTeacher"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">Select a teacher</option>
                  {guideTeachers.map((teacher) => (
                    <option key={teacher.email} value={teacher.name}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-900"
              >
                Proceed
              </button>
            </form>
          )}

          {guideTeachers.length === 0 && !message && (
            <p className="mt-4 text-red-600">No registered guide teachers found.</p>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            {steps.map((label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative">
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center
                    ${index <= currentStep ? 'bg-red-800 text-white' : 'bg-gray-300 text-gray-600'}`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm mt-2 ${index <= currentStep ? 'text-black font-medium' : 'text-gray-400'}`}
                >
                  {label}
                </span>

                {index !== steps.length - 1 && (
                  <div
                    className={`absolute top-4 right-0 w-full h-0.5
                      ${index < currentStep ? 'bg-red-800' : 'bg-gray-300'}`}
                    style={{ zIndex: -1 }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-red-800 mb-4">{steps[currentStep]}</h3>
          <div className="mb-6">{renderStepContent()}</div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default IdeaSubmissionForm;