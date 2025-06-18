
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, MapPin, Mail, Phone, LogOut, User, Code, LocateIcon } from 'lucide-react';
import axios from 'axios';
import RegisterGuideTeacher from './RegisterGuideTeacher';
import HackathonPage from './HackathonPage';
import IdeaSubmissionForm from './IdeaSubmissionForm ';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import DocumentUploadForm from './DocumentUploadForm';

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
  hasFilteredAverage: boolean; // <-- Add this line
  projectId: string;
}


export default function SchoolDashboard() {
  
  const navigate = useNavigate();
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState('guide');
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
    console.log('School Details:', JSON.parse(storedSchoolDetails));

    // Fetch the dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:11129/api/schools/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
        console.log('Dashboard Data:', response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);



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
                    Guide Teacher Registration
                  </button>
                  <button
                    onClick={() => setActiveTab('idea')}
                    className={`px-4 py-2 font-medium ${activeTab === 'idea' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Idea Submission
                  </button>
                  <button
                    onClick={() => setActiveTab('template')}
                    className={`px-4 py-2 font-medium ${activeTab === 'template' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Hackathon Template
                  </button>
                  <button
                    onClick={() => setActiveTab('documentation')}
                    className={`px-4 py-2 font-medium ${activeTab === 'documentation' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Upload Documentation
                  </button>
                  {/* <button
                    onClick={() => setActiveTab('jury-mark')}
                    className={`px-4 py-2 font-medium ${activeTab === 'jury-mark' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
                  >
                    Jury Mark
                  </button> */}
                </div>

                {/* Tab Content */}
                <div className="p-6 rounded-xl">
                  {activeTab === 'guide' && <RegisterGuideTeacher />}
                  {activeTab === 'idea' && <IdeaSubmissionForm />}
                  {activeTab === 'template' && <HackathonPage />}
                  {/* {activeTab === 'documentation' && (
                    <div className="text-gray-700">
                      {dashboardData?.hasFilteredAverage ? (
                        <>
                          <h2 className="text-xl font-semibold mb-4">Upload Documentation</h2>

                          <DocumentUploadForm />


                        </>
                      ) : (
                        <div className="text-red-600">
                          <h2 className="text-xl font-semibold mb-2">Documentation Upload Locked</h2>
                          <p className="text-sm text-gray-500">Documentation upload feature coming soon!</p>
                        </div>
                      )}
                    </div>
                  )} */}
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
                                      console.log('Uploaded for project', submission._id);
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

                  {/* {activeTab === 'jury-mark' && (
                    <div className="text-gray-700">
                      {dashboardData?.hasFilteredAverage ? (
                        <>
                          <h2 className="text-xl font-semibold mb-4">Jury Mark</h2>
                          <p className="text-sm text-gray-500 mb-4">Jury Mark 1</p>
                          <p className="text-sm text-gray-500 mb-4">Jury Mark 2</p>
                          <p className="text-sm text-gray-500 mb-4">Jury Mark 3</p> 

                         
                         


                        </>
                      ) : (
                        <div className="text-red-600">
                          <h2 className="text-xl font-semibold mb-2">Jury Mark Locked</h2>
                          <p className="text-sm text-gray-500">Jury Mark feature coming soon!</p>
                        </div>
                      )}
                    </div>
                  )} */}



                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
