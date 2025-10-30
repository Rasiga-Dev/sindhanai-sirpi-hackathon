
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, MapPin, Mail, Phone, LogOut, User, Code, LocateIcon } from 'lucide-react';
import axios from 'axios';
import RegisterGuideTeacher from './RegisterGuideTeacher';
import HackathonPage from './HackathonPage';
import IdeaSubmissionForm from './IdeaSubmissionForm ';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import DocumentUploadForm from './DocumentUploadForm';
import Certificate from '../pages/Certificate';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import html2pdf from 'html2pdf.js';
import BankAccountDetails from './admin/BankAccountDetails';
import VITE_BASE_URL from '../config/api';


// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


interface SchoolDetails {
  name: string;
  udiseCode: string;
  district: string;
  email: string;
  hmName: string;
  hmEmail: string;
  hmMobile: string;
  address: string; // <-- Add this line
  submissions: {
    averageFilter: string;
  }[];
}

interface DashboardData {
  totalProjects: number;
  guideTeachers: number;
  submittedIdeas: number;
  studentsCount: number; // <-- Add this line
  schoolName: string;
  hasFilteredAverage: boolean; // <-- Add this line
  projectId: string;
  submissions: {
    _id: string;
    finalStage: string;
    rank: number;   // ✅ number ah fix panniten
    studentDetails: {
      name: string;
      standard: string;
    }[];
    projectDetails: {
      title: string;
    };
    averageFilter: string;
    schoolName: string;
  }[];
}


export default function SchoolDashboard() {

  const navigate = useNavigate();
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState('guide');
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('schoolDetails');
    localStorage.removeItem('schoolToken');
    navigate('/school-login');
  };

  useEffect(() => {


    const token = localStorage.getItem('schoolToken');

    const storedSchoolDetails = localStorage.getItem('schoolDetails');

    if (!token || !storedSchoolDetails) {
      navigate('/school-login'); // Redirect to login if token or school details are missing
      return;
    }

    setSchoolDetails(JSON.parse(storedSchoolDetails));
   

    // Fetch the dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/schools/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
    
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);


  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSubmission(null);
    setShowModal(false);
  };

  const steps = [
    { level: 1, label: "Level 1" },
    { level: 2, label: "Level 2" },
    { level: 3, label: "Level 3" },
    { level: 4, label: "Level 4" },
    { level: 5, label: "Final" },
  ];

  const handleDownloadPDF = (student, schoolName) => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.width = '1123px';
    container.style.height = '794px';
    container.style.backgroundColor = 'white';
    container.setAttribute('id', 'pdf-wrapper');
    document.body.appendChild(container);

    const root = createRoot(container);

    // 👇 Wrap the certificate in an inner div with a known ID
    root.render(
      <div id="pdf-content">
        <Certificate
          studentName={student.name}
          standard={student.standard}
          schoolName={schoolName}
          participationType="Participant"
        />
      </div>
    );

    setTimeout(() => {
      const pdfElement = document.getElementById('pdf-content');
      if (!pdfElement) {
        console.error('PDF content not found');
        return;
      }

      html2pdf()
        .set({
          margin: 0,
          filename: `${student.name}-Certificate.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'px', format: [1123, 794], orientation: 'landscape' },
        })
        .from(pdfElement)
        .save()
        .then(() => {
          root.unmount();
          document.body.removeChild(container);
        });
    }, 1000); // wait for DOM to paint
  };




  if (loading) return <div>Loading...</div>;
  if (!schoolDetails) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-800 px-4 py-4 sm:px-10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <School className="w-6 h-6" />
                School Dashboard
              </h1>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-6 py-8 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* School Info (4 columns) */}
              <div className="md:col-span-3 space-y-6 sticky top-20 self-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">School Information</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <School className="w-5 h-5 text-red-800" />
                      <div>
                        <p className="text-sm text-gray-500">School Name</p>
                        <p className="font-medium">{schoolDetails.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-red-800" />
                      <div>
                        <p className="text-sm text-gray-500">District</p>
                        <p className="font-medium">{schoolDetails.district}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-red-800" />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{schoolDetails.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-red-800" />
                      <div>
                        <p className="text-sm text-gray-500">UDISE Code</p>
                        <p className="font-medium">{schoolDetails.udiseCode}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <LocateIcon className="w-5 h-5 text-red-800" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{schoolDetails.address}</p>
                      </div>
                    </div>

                  </div>
                </div>
                {/* Principal / HM Details */}
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-red-800" />
                  <div>
                    <p className="text-sm text-gray-500">HM / Principal Name</p>
                    <p className="font-medium">{schoolDetails.hmName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-800" />
                  <div>
                    <p className="text-sm text-gray-500">HM / Principal Email</p>
                    <p className="font-medium">{schoolDetails.hmEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-800" />
                  <div>
                    <p className="text-sm text-gray-500">HM / Principal Phone</p>
                    <p className="font-medium">{schoolDetails.hmMobile}</p>
                  </div>
                </div>

                {/* Example of displaying dashboard data */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Summary</h3>
                  <div className="flex flex-col space-y-5">

                    {/* Total Projects */}
                    <div className="flex items-center p-5 bg-gradient-to-r from-red-100 to-red-50 rounded-2xl shadow-md border border-red-200">
                      <div className="w-12 h-12 flex items-center justify-center bg-red-200 text-red-800 rounded-full text-lg font-bold">
                        📁
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Total Projects</p>
                        <p className="text-2xl font-semibold text-gray-800">{dashboardData?.totalProjects}</p>
                      </div>
                    </div>

                    {/* Guide Teachers */}
                    <div className="flex items-center p-5 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow-md border border-blue-200">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-200 text-blue-800 rounded-full text-lg font-bold">
                        👨‍🏫
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Guide Teachers</p>
                        <p className="text-2xl font-semibold text-gray-800">{dashboardData?.guideTeachers}</p>
                      </div>
                    </div>

                    {/* Submitted Ideas */}
                    <div className="flex items-center p-5 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl shadow-md border border-green-200">
                      <div className="w-12 h-12 flex items-center justify-center bg-green-200 text-green-800 rounded-full text-lg font-bold">
                        💡
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Total Students</p>
                        <p className="text-2xl font-semibold text-gray-800">{dashboardData?.studentsCount}</p>
                      </div>
                    </div>

                  </div>
                </div>



              </div>

              {/* Right Side Tabs & Content (8 columns) */}
              <div className="md:col-span-9 space-y-6 sticky top-20 self-start">
                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200 mb-4">
                  <button
                    onClick={() => setActiveTab('guide')}
                    className={`px-4 py-2 font-medium ${activeTab === 'guide' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Guide Teacher Entry Form
                  </button>
                  <button
                    onClick={() => setActiveTab('idea')}
                    className={`px-4 py-2 font-medium ${activeTab === 'idea' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Idea Submission
                  </button>
                 
                   <button
                    onClick={() => setActiveTab('submitted-idea')}
                    className={`px-4 py-2 font-medium ${activeTab === 'submitted-idea' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Submitted Ideas
                  </button>

                  <button
                    onClick={() => setActiveTab('documentation')}
                    className={`px-4 py-2 font-medium ${activeTab === 'documentation' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Upload Documentation
                  </button>

                  <button
                    onClick={() => setActiveTab('account-form')}
                    className={`px-4 py-2 font-medium ${activeTab === 'account-form' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Bank Account Form
                  </button>
                  <button
                    onClick={() => setActiveTab('download-certificate')}
                    className={`px-4 py-2 font-medium ${activeTab === 'download-certificate' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Download Participants Certificate
                  </button>

                   <button
                    onClick={() => setActiveTab('template')}
                    className={`px-4 py-2 font-medium ${activeTab === 'template' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Hackathon Template
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6 rounded-xl">
                  {activeTab === 'guide' && <RegisterGuideTeacher />}
                  {activeTab === 'idea' && <IdeaSubmissionForm />}
                 
                    {activeTab === "submitted-idea" && (
                    <div>
                      {!dashboardData?.submissions || dashboardData.submissions.length === 0 ? (
                        <div className="text-gray-800">No submitted ideas found.</div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                            <thead className="bg-red-800 text-white">
                              <tr>
                                <th className="px-4 py-2 border text-left">S.No</th>
                                <th className="px-4 py-2 border text-left">Project Title</th>
                                <th className="px-4 py-2 border text-left">Description</th>
                                <th className="px-4 py-2 border text-left">Team Size</th>
                                <th className="px-4 py-2 border text-left">Problem</th>
                                <th className="px-4 py-2 border text-left">Solution</th>
                                <th className="px-4 py-2 border text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {dashboardData.submissions.map((submission, index) => (
                                <tr key={submission._id?.$oid || submission._id} className="hover:bg-gray-100">
                                  <td className="px-4 py-2 border">{index + 1}</td>
                                  <td className="px-4 py-2 border">{submission.projectDetails?.title || "N/A"}</td>
                                  <td className="px-4 py-2 border">{submission.projectDetails?.description || "N/A"}</td>
                                  <td className="px-4 py-2 border">{submission.projectDetails?.teamSize || "-"}</td>
                                  <td className="px-4 py-2 border">{submission.projectDetails?.problemStatement || "N/A"}</td>
                                  <td className="px-4 py-2 border">{submission.projectDetails?.solution || "N/A"}</td>
                                  <td className="px-4 py-2 border">
                                    <button
                                      onClick={() => openModal(submission)}
                                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                      View Status
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {showModal && selectedSubmission && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4 mt-20">
                          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
                            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">✕</button>

                            <h2 className="text-xl font-semibold text-center mb-2 text-red-800">Project Status</h2>
                            <p className="text-center mb-4 font-medium text-gray-800">{selectedSubmission.projectDetails?.title}</p>

                            {(() => {
                              const statuses = selectedSubmission.levelStatuses || {
                                level1: "pending",
                                level2: "pending",
                                level3: "pending",
                                level4: "pending",
                                level5: "pending",
                              };

                              // helper: create friendly message for each level
                              function getLevelMessage(level, status, submission) {
                                const s = submission || {};
                                const evalStatus = s.evaluationStatus || "-";
                                const evalScoreStatus = s.evaluationScoreStatus || "-";
                                const avgFilter = s.averageFilter || "-";
                                const jullyAvg = s.jullyMarks && typeof s.jullyMarks.average !== "undefined" ? s.jullyMarks.average : null;
                                const finalStage = s.finalStage || "-";
                                const finalStatus = s.finalStatus || "-";

                                if (level === 1) {
                                  if (status === "accepted")
                                    return `Level 1 — Project Accepted by Evaluator. The project successfully passed the initial screening.`;
                                  if (status === "rejected")
                                    return `Level 1 — Project Rejected by Evaluator. The project did not pass the first-level evaluation.`;
                                  return `Level 1 — Waiting for evaluator to review and provide decision.`;
                                }

                                if (level === 2) {
                                  if (status === "completed")
                                    return `Level 2 — Evaluator scoring completed. The marks have been recorded successfully.`;
                                  return `Level 2 — Evaluation scores are yet to be entered by the evaluator.`;
                                }

                                if (level === 3) {
                                  if (status === "completed")
                                    return `Level 3 — Average filter applied. The project cleared the average marks requirement.`;
                                  return `Level 3 — Average filter process is pending.`;
                                }

                                if (level === 4) {
                                  if (status === "completed" && jullyAvg !== null)
                                    return `Level 4 — Jury evaluation completed.`;
                                  return `Level 4 — Awaiting jury evaluation or marks entry.`;
                                }

                                if (level === 5) {
                                  if (status === "winner")
                                    return `Level 5 — Final Result Declared: ${finalStage}. Congratulations to the team!`;
                                  return `Level 5 — Final round results are yet to be announced.`;
                                }

                                return "";
                              }



                              return (
                                <div className="space-y-6">
                                  {/* Stepper */}
                                  <div className="flex items-center gap-4">
                                    {steps.map((step, idx) => {
                                      const st = statuses[`level${step.level}`];
                                      const cls = statusToClasses(st); // circle, labelColor, chip, smallText
                                      const connectorActive = st === "accepted" || st === "completed" || st === "winner";

                                      return (
                                        <div key={step.level} className="flex-1 flex flex-col items-center relative">
                                          <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${cls.circle}`}>
                                            <span className="font-semibold">{step.level}</span>
                                          </div>

                                          <div className={`text-sm mt-2 text-center ${cls.labelColor}`}>{step.label}</div>

                                          <div className="mt-1 text-xs text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${cls.chip}`}>{cls.smallText}</span>
                                          </div>

                                          {idx < steps.length - 1 && (
                                            <div className={`absolute top-6 right-[-50%] w-[100%] h-1 ${connectorActive ? "bg-green-400" : "bg-gray-300"}`} style={{ zIndex: 0 }} />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Friendly messages area */}
                                  <div className="bg-gray-50 border rounded p-4">
                                    <h3 className="text-sm font-medium mb-2">Progress updates</h3>

                                    <ul className="space-y-3">
                                      {steps.map((step) => {
                                        const st = statuses[`level${step.level}`];
                                        const message = getLevelMessage(step.level, st, selectedSubmission);
                                        // choose icon based on status
                                        const icon = st === "accepted" || st === "completed" || st === "winner"
                                          ? "✔️"
                                          : st === "rejected"
                                            ? "✖️"
                                            : "⏳";

                                        return (
                                          <li key={step.level} className="flex items-start gap-3">
                                            <div className="mt-1 text-xl">{icon}</div>
                                            <div>
                                              <div className="text-sm font-semibold">{`Step ${step.level}: ${step.label}`}</div>
                                              <div className="text-sm text-gray-700">{message}</div>
                                            </div>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>

                                  {/* Action / Close */}
                                  <div className="text-right">
                                    <button onClick={closeModal} className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700">Close</button>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === 'documentation' && (
                    <div className="text-gray-700">
                      {dashboardData?.hasFilteredAverage ? (
                        <>
                          <h2 className="text-xl font-semibold mb-4">Upload Documentation</h2>

                          {dashboardData?.submissions?.filter?.(s => s.averageFilter === 'filtered')?.length > 0 ? (
                            dashboardData.submissions
                              .filter(sub => sub.averageFilter === 'filtered')
                              .map((submission, index) => (
                                <div key={index} className="mb-6 p-4 border border-gray-300 rounded">
                                  <h3 className="font-semibold mb-2">Project: {submission.projectDetails?.title}</h3>

                                  <DocumentUploadForm
                                    projectId={submission._id}
                                    onSuccess={() => {
                                      
                                    }}
                                  />

                                </div>
                              ))
                          ) : (
                            <p className="text-gray-500">No filtered submissions found.</p>
                          )}

                        </>
                      ) : (
                        <div className="text-red-600">
                          <h2 className="text-xl font-semibold mb-2">Documentation Upload Locked</h2>
                          <p className="text-sm text-gray-500">Documentation upload feature coming soon!</p>
                        </div>
                      )}
                    </div>
                  )}



                  {activeTab === 'download-certificate' && (
                    <div className="text-gray-700 py-6">
                      <h1 className="text-2xl font-semibold mb-6">Download Certificates</h1>

                      {dashboardData?.submissions?.length > 0 && dashboardData.schoolName ? (
                        dashboardData.submissions.map((submission, index) => (
                          <div key={index} className="mb-12">
                            {submission.studentDetails?.length > 0 ? (
                              submission.studentDetails.map((student, idx) => (
                                <div key={idx} className="flex justify-between items-center mb-4 px-4">
                                  <p className="text-lg font-medium">{student.name}</p>
                                  <button
                                    onClick={() => handleDownloadPDF(student, dashboardData.schoolName)}
                                    className="bg-red-800 text-white px-4 py-1 rounded hover:bg-red-700"
                                  >
                                    Download Certificate
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 italic">No students found for this submission</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No submissions available</p>
                      )}
                    </div>
                  )}

                
                  {activeTab === 'account-form' && (
                    <>
                      {dashboardData?.submissions?.some(
                        sub => sub.finalStage === "Completed" && sub.rank !== '0'
                      ) ? (
                        dashboardData.submissions
                          .filter(sub => sub.finalStage === "Completed" && sub.rank !== '0')
                          .map((sub, index) => (
                            <div key={index}>
                              <h2 className="text-xl font-semibold mb-6 text-center">
                                Bank Account Details - Team {index + 1}
                              </h2>

                              {sub.bankAccountDetails?.status === "bankDetailsUpdated" ? (
                                <p className="text-green-600 font-medium text-center mt-4">
                                  ✅ Bank account details have already been submitted for this team.
                                </p>
                              ) : (
                                <BankAccountDetails id={sub._id} title={sub.projectDetails.title} />
                              )}
                            </div>
                          ))
                      ) : (
                        <p className="text-center text-gray-500 text-lg mt-6">
                          ⚠️ No eligible teams found for bank account submission at this stage.
                        </p>
                      )}
                    </>
                  )}


                   {activeTab === 'template' && <HackathonPage />}


                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}


// map server status to classes + label
// statusToClasses helper (ensure it's in component)
function statusToClasses(status) {
  if (!status) status = "pending";
  if (status === "accepted" || status === "completed" || status === "winner") {
    return { circle: "bg-green-600 border-green-600 text-white", labelColor: "text-green-600", chip: "bg-green-100 text-green-800", smallText: status === "winner" ? "Winner" : "Completed" };
  }
  if (status === "rejected") {
    return { circle: "bg-red-600 border-red-600 text-white", labelColor: "text-red-600", chip: "bg-red-100 text-red-800", smallText: "Rejected" };
  }
  if (status === "in-progress" || status === "evaluating") {
    return { circle: "bg-yellow-500 border-yellow-500 text-white", labelColor: "text-yellow-600", chip: "bg-yellow-100 text-yellow-800", smallText: "In Progress" };
  }
  return { circle: "bg-white border-gray-300 text-gray-500", labelColor: "text-gray-500", chip: "bg-gray-100 text-gray-700", smallText: "Pending" };
}