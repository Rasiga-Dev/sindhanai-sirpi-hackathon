
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { School, MapPin, Mail, Phone, LogOut } from 'lucide-react';



import BMCLayout from '../BMCLayout';
import { API_BASE } from '../../config/api';

interface School {
  _id: string;
  School_Name: string;
  UDISE_Code: string;
  Email_ID: string;
  District: string;
  Address: string;
  Office_Mobile: number;
  status: string;
}

interface DashboardData {
  totalProjects: number;
  guideTeachers: number;
  submittedIdeas: number;
  teamsCount: number;

  guideTeachersList: {
    name: string;
    email: string;
    phone: string;
    status: string;
  }[];

  studentDetailsList: {
    name: string;
    fatherName: string;
    dateOfBirth: string;
    gender: string;
    community: string;
    district: string;
    standard: string;
    email: string;
    contactNumber: string;
  }[];



  completedProjectsList: {
    projectDetails: {
      title: string;
      description: string;
      teamSize?: number;
    };
    bmcDetails: {
      customerSegments: string;
      valuePropositions: string;
      channels: string;
      customerRelationships: string;
      revenueStreams: string;
      keyResources: string;
      keyActivities: string;
      keyPartners: string;
      costStructure: string;
    };
    documentFile?: {
      filename: string;
      contentType: string;
      base64: string;
    } | null;
  
  }[];

}


const SchoolDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [school, setSchool] = useState<School | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('guide');
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedBMCData, setSelectedBMCData] = useState(null);
  const [showBMCModal, setShowBMCModal] = useState(false);
  const [selectedBMC, setSelectedBMC] = useState(null);
const [showBMC, setShowBMC] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolRes = await axios.get(`${API_BASE}/api/schools/${id}`);
        setSchool(schoolRes.data);
        console.log('School Data:', schoolRes.data);

        const dashboardRes = await axios.get(`${API_BASE}/api/admin/summary/${id}`);
        setDashboardData(dashboardRes.data);
        console.log('Dashboard Dataaaaaaaaaaaaaaaa:', dashboardRes.data);
       

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLogout = () => {
    navigate('/admin-dashboard');
  };

  if (loading || !school) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-800 px-4 py-4 sm:px-10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <School className="w-6 h-6" />
                {school.School_Name} Dashboard
              </h1>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left: School Info */}
              <div className="md:col-span-3 space-y-6 sticky top-20 self-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">School Information</h3>
                  <div className="mt-4 space-y-4">
                    <InfoItem icon={<School className="w-5 h-5 text-red-800" />} label="School Name" value={school.School_Name} />
                    <InfoItem icon={<MapPin className="w-5 h-5 text-red-800" />} label="District" value={school.District} />
                    <InfoItem icon={<Mail className="w-5 h-5 text-red-800" />} label="Email Address" value={school.Email_ID} />
                    <InfoItem icon={<Phone className="w-5 h-5 text-red-800" />} label="UDISE Code" value={school.UDISE_Code} />
                  </div>
                </div>

                {/* Dashboard Summary */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Summary</h3>
                  <div className="flex flex-col space-y-5">
                    <SummaryCard color="red" label="Total Projects" icon="📁" value={dashboardData?.totalProjects || 0} />
                    <SummaryCard color="blue" label="Guide Teachers" icon="👨‍🏫" value={dashboardData?.guideTeachers || 0} />
                    <SummaryCard color="green" label="Total Teams" icon="💡" value={dashboardData?.teamsCount || 0} />

                  </div>
                </div>
              </div>

              {/* Right: Tabs */}
              <div className="md:col-span-9 space-y-6">
                <div className="flex gap-4 border-b border-gray-200 mb-4">
                  {['guide', 'student', 'pending', 'completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'
                        }`}
                    >
                      {tab === 'guide' && 'Guide Teachers List'}
                      {tab === 'student' && 'Students List'}
                      {tab === 'completed' && 'Completed Projects List'}
                    </button>
                  ))}
                </div>

                <div className="p-6 rounded-xl bg-white shadow-sm border">
                  {activeTab === 'guide' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Guide Teachers List</h2>
                      {dashboardData?.guideTeachersList?.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                              <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dashboardData.guideTeachersList.map((teacher, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                  <td className="border px-4 py-2">{i + 1}</td>
                                  <td className="border px-4 py-2">{teacher.name}</td>
                                  <td className="border px-4 py-2">{teacher.email}</td>
                                  <td className="border px-4 py-2">{teacher.phone}</td>
                                  <td className="border px-4 py-2">{teacher.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : <p>No guide teachers found.</p>}
                    </div>
                  )}


                  {activeTab === 'student' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Students List</h2>
                      {dashboardData?.studentDetailsList?.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                              <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Father's Name</th>
                                <th className="border px-4 py-2">DOB</th>
                                <th className="border px-4 py-2">District</th>
                                <th className="border px-4 py-2">Community</th>
                                <th className="border px-4 py-2">Standard</th>
                                <th className="border px-4 py-2">Gender</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Contact</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dashboardData.studentDetailsList.map((student, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                  <td className="border px-4 py-2">{i + 1}</td>
                                  <td className="border px-4 py-2">{student.name}</td>
                                  <td className="border px-4 py-2">{student.fatherName}</td>
                                  <td className="border px-4 py-2">{student.dateOfBirth}</td>
                                  <td className="border px-4 py-2">{student.district}</td>
                                  <td className="border px-4 py-2">{student.community}</td>
                                  <td className="border px-4 py-2">{student.standard}</td>
                                  <td className="border px-4 py-2">{student.gender}</td>
                                  <td className="border px-4 py-2">{student.email}</td>
                                  <td className="border px-4 py-2">{student.contactNumber}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : <p>No students found.</p>}
                    </div>
                  )}



                  {activeTab === 'completed' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Completed Projects List</h2>
                      {dashboardData?.completedProjectsList?.length > 0 ? (
                        <div className="overflow-auto">
                          <table className="min-w-full border border-gray-300 rounded text-sm">
                            <thead className="bg-green-100">
                              <tr>
                                <th className="border px-4 py-2 text-left">Title</th>
                               
                                <th className="border px-4 py-2 text-left">BMC Details</th>

                               
                                <th className="border px-4 py-2 text-left">Document</th>
                               
                              </tr>
                            </thead>
                            <tbody>
                              {dashboardData.completedProjectsList.map((project, index) => (
                                <tr key={index} className="bg-white hover:bg-gray-50">
                                  <td className="border px-4 py-2">{project.projectDetails?.title || 'N/A'}</td>
                                  
                                  <td className="border px-4 py-2">
                                    <button
                                      className="text-blue-600 underline"
                                      onClick={() => {
                                        setSelectedBMC(project.bmcDetails); // save bmcDetails in state
                                        setShowBMC(true); // control modal visibility
                                      }}
                                    >
                                      View BMC
                                    </button>
                                    {showBMC && selectedBMC && (
                                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
                                          <button
                                            onClick={() => setShowBMC(false)}
                                            className="absolute top-2 right-4 text-2xl font-bold text-red-600"
                                          >
                                            &times;
                                          </button>
                                          <BMCLayout bmcDetails={selectedBMC} />
                                        </div>
                                      </div>
                                    )}

                                  </td>


                                  <td className="border px-4 py-2">
                                    {project.documentFile?.base64 ? (
                                      <a
                                        href={`data:${project.documentFile.contentType};base64,${project.documentFile.base64}`}
                                        download={project.documentFile.filename}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                      >
                                        View Document
                                      </a>
                                    ) : 'N/A'}
                                  </td>

                                
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p>No completed projects found.</p>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SchoolDetails;

// Helper component for Info section
const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

// Helper component for dashboard summary cards
const SummaryCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: 'red' | 'blue' | 'green';
}) => {
  const bgFrom = {
    red: 'from-red-100',
    blue: 'from-blue-100',
    green: 'from-green-100',
  }[color];

  const bgTo = {
    red: 'to-red-50',
    blue: 'to-blue-50',
    green: 'to-green-50',
  }[color];

  const border = {
    red: 'border-red-200',
    blue: 'border-blue-200',
    green: 'border-green-200',
  }[color];

  const text = {
    red: 'text-red-800',
    blue: 'text-blue-800',
    green: 'text-green-800',
  }[color];

  const bgCircle = {
    red: 'bg-red-200',
    blue: 'bg-blue-200',
    green: 'bg-green-200',
  }[color];

  return (
    <div className={`flex items-center p-5 bg-gradient-to-r ${bgFrom} ${bgTo} rounded-2xl shadow-md border ${border}`}>
      <div className={`w-12 h-12 flex items-center justify-center ${bgCircle} ${text} rounded-full text-lg font-bold`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

