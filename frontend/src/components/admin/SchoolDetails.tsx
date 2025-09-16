// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SchoolDetails = () => {
//     const { id } = useParams();
//     const [school, setSchool] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSchoolDetails = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:11129/api/admin/school/${id}`);
//                 setSchool(res.data);
//                 console.log("School details fetched:", res.data);
//             } catch (err) {
//                 console.error("Failed to load school details", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchSchoolDetails();
//     }, [id]);

//     if (loading) return <p>Loading school details...</p>;
//     if (!school) return <p>No data found.</p>;

//     return (
//         <div className="p-6 bg-white rounded shadow">
//             <h2 className="text-2xl font-semibold mb-4">{school.School_Name} Details</h2>
//             <p><strong>UDISE Code:</strong> {school.UDISE_Code}</p>
//             <p><strong>District:</strong> {school.District}</p>
//             <p><strong>Address:</strong> {school.Address}</p>
//             <p><strong>Mobile:</strong> {school.Office_Mobile}</p>
//             <p><strong>Email:</strong> {school.Email_ID}</p>

//             <hr className="my-4" />

//             {/* Guide Teachers */}
//             <h3 className="text-xl font-semibold mb-2">Guide Teachers</h3>
//             {school.guideTeachers && school.guideTeachers.length > 0 ? (
//                 <ul className="list-disc pl-6">
//                     {school.guideTeachers.map((teacher, index) => (
//                         <li key={index}>{teacher.name} – {teacher.subject}</li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No guide teachers available.</p>
//             )}

//             {/* Submitted Projects */}
//             <h3 className="text-xl font-semibold mt-6 mb-2">Submitted Projects</h3>
//             {school.projects && school.projects.length > 0 ? (
//                 <ul className="list-disc pl-6">
//                     {school.projects.map((project, index) => (
//                         <li key={index}>
//                             <strong>{project.title}</strong> – {project.description}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No submitted projects.</p>
//             )}
//         </div>
//     );
// };

// export default SchoolDetails;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';
// import {
//   SchoolIcon, MailIcon, PhoneIcon, MapPinIcon, CheckCircleIcon,
// } from 'lucide-react';

// interface School {
//   _id: string;
//   School_Name: string;
//   UDISE_Code: string;
//   Email_ID: string;
//   District: string;
//   Address: string;
//   Office_Mobile: number;
//   status: string;
// }

// interface Project {
//   _id: string;
//   title: string;
//   description: string;
//   status: string;
//   team: string; // assuming there's a team field or adjust accordingly
// }

// const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

// const SchoolAdminDashboard = () => {
//   const { id } = useParams();
//   const [school, setSchool] = useState<School | null>(null);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [guideTeachersCount, setGuideTeachersCount] = useState(0);
//   const [studentsCount, setStudentsCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const schoolRes = await axios.get(`http://localhost:11129/api/schools/${id}`);
//         setSchool(schoolRes.data);

//         const projectRes = await axios.get(`http://localhost:11129/api/schools/${id}/projects`);
//         setProjects(projectRes.data);

//         const teachersRes = await axios.get(`http://localhost:11129/api/schools/${id}/guide-teachers`);
//         setGuideTeachersCount(teachersRes.data.length);

//         const studentsRes = await axios.get(`http://localhost:11129/api/schools/${id}/students`);
//         setStudentsCount(studentsRes.data.length);
//       } catch (err) {
//         console.error('Error loading dashboard data:', err);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (!school) return <div className="p-6 text-center">Loading...</div>;

// //   const chartData = [
// //     { name: 'Projects', value: projects.length },
// //     { name: 'Teachers', value: guideTeachersCount },
// //     { name: 'Students', value: studentsCount },
// //   ];

// const chartData = [
//     { name: 'Projects', value: 30 },
//     { name: 'Teachers', value: 20 },
//     { name: 'Students', value: 50 },
//   ];

//   return (
//   <div className="p-6 bg-gray-50 min-h-screen space-y-8">
//     <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
//       🏫 {school.School_Name} Dashboard
//     </h1>

//     {/* First Row: School Info + Count Cards */}
//     <div className="grid md:grid-cols-2 gap-6">
//       {/* School Details */}
//       <div className="bg-white p-6 rounded-2xl shadow-xl space-y-3">
//         <h2 className="text-xl font-semibold text-gray-700 mb-2">🎓 School Information</h2>
//         <ul className="space-y-2 text-gray-600">
//           <li><SchoolIcon className="inline-block w-5 mr-2 text-blue-500" /> <strong>Name:</strong> {school.School_Name}</li>
//           <li><MailIcon className="inline-block w-5 mr-2 text-blue-500" /> <strong>Email:</strong> {school.Email_ID}</li>
//           <li><PhoneIcon className="inline-block w-5 mr-2 text-blue-500" /> <strong>Mobile:</strong> {school.Office_Mobile}</li>
//           <li><MapPinIcon className="inline-block w-5 mr-2 text-blue-500" /> <strong>District:</strong> {school.District}</li>
//           <li><MapPinIcon className="inline-block w-5 mr-2 text-blue-500" /> <strong>Address:</strong> {school.Address}</li>
//           <li><strong>UDISE Code:</strong> {school.UDISE_Code}</li>
//           <li><CheckCircleIcon className="inline-block w-5 mr-2 text-blue-500" /> <strong>Status:</strong> {school.status}</li>
//         </ul>
//       </div>

//       {/* Count Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
//         <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
//           <h3 className="text-lg font-semibold">Guide Teachers</h3>
//           <p className="text-3xl font-bold text-blue-700">{guideTeachersCount}</p>
//         </div>
//         <div className="bg-green-100 p-6 rounded-lg shadow text-center">
//           <h3 className="text-lg font-semibold">Total Projects</h3>
//           <p className="text-3xl font-bold text-green-700">{projects.length}</p>
//         </div>
//         <div className="bg-yellow-100 p-6 rounded-lg shadow text-center col-span-2">
//           <h3 className="text-lg font-semibold">Total Students</h3>
//           <p className="text-3xl font-bold text-yellow-700">{studentsCount}</p>
//         </div>
//       </div>
//     </div>

//     {/* Second Row: Chart */}
//     <div className="bg-white p-6 rounded-2xl shadow-xl">
//       <h2 className="text-xl font-semibold mb-4">📊 School Overview Chart</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Legend />
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>

//     {/* Third Row: Project Table */}
//     <div className="bg-white shadow p-6 rounded-2xl">
//       <h2 className="text-xl font-semibold mb-4">📁 Project Details</h2>
//       {projects.length === 0 ? (
//         <p>No projects found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border text-sm">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="p-3 border">Title</th>
//                 <th className="p-3 border">Description</th>
//                 <th className="p-3 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((proj) => (
//                 <tr key={proj._id} className="text-center">
//                   <td className="p-3 border">{proj.title}</td>
//                   <td className="p-3 border">{proj.description}</td>
//                   <td className="p-3 border">{proj.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   </div>
// );

// };

// export default SchoolAdminDashboard;






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { School, MapPin, Mail, Phone, LogOut } from 'lucide-react';

// import { useNavigate } from 'react-router-dom';
// import RegisterGuideTeacher from './RegisterGuideTeacher';
// import IdeaSubmissionForm from './IdeaSubmissionForm ';
// import HackathonPage from './HackathonPage';


// interface School {
//   _id: string;
//   School_Name: string;
//   UDISE_Code: string;
//   Email_ID: string;
//   District: string;
//   Address: string;
//   Office_Mobile: number;
//   status: string;
// }

// interface Project {
//   _id: string;
//   title: string;
//   description: string;
//   status: string;
//   team: string; // assuming there's a team field or adjust accordingly
// }

// interface DashboardData {
//   totalProjects: number;
//   guideTeachers: number;
//   submittedIdeas: number;
//   studentsCount: number; // <-- Add this line
// }

// const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

// const SchoolAdminDashboard = () => {
//    const navigate = useNavigate();
//   const { id } = useParams();
//   const [school, setSchool] = useState<School | null>(null);
//     const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//       const [loading, setLoading] = useState(true);
//         const [activeTab, setActiveTab] = useState('guide');



//   const [projects, setProjects] = useState<Project[]>([]);
//   const [guideTeachersCount, setGuideTeachersCount] = useState(0);
//   const [studentsCount, setStudentsCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const schoolRes = await axios.get(`http://localhost:11129/api/schools/${id}`);
//         setSchool(schoolRes.data);

//       } catch (err) {
//         console.error('Error loading dashboard data:', err);
//       }
//     };

//     fetchData();
//     const fetchDashboardData = async () => {
//       try {
//         const response = await axios.get('http://localhost:11129/api/schools/dashboard', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDashboardData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [id]);

//   if (!school) return <div className="p-6 text-center">Loading...</div>;

// //   const chartData = [
// //     { name: 'Projects', value: projects.length },
// //     { name: 'Teachers', value: guideTeachersCount },
// //     { name: 'Students', value: studentsCount },
// //   ];

// const chartData = [
//     { name: 'Projects', value: 30 },
//     { name: 'Teachers', value: 20 },
//     { name: 'Students', value: 50 },
//   ];

//    const handleLogout = () => {

//     navigate('/admin-dashboard');
//   };

//   return (

//   <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-8xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-red-800 px-4 py-4 sm:px-10">
//             <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//                 <School className="w-6 h-6" />
//                  {school.School_Name} Dashboard
//               </h1>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Back
//               </button>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="px-6 py-8 sm:px-10">
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
//               {/* School Info (4 columns) */}
//               <div className="md:col-span-3 space-y-6 sticky top-20 self-start">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">School Information</h3>
//                   <div className="mt-4 space-y-4">
//                     <div className="flex items-center gap-3">
//                       <School className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">School Name</p>
//                         <p className="font-medium">{school.School_Name}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <MapPin className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">District</p>
//                         <p className="font-medium">{school.District}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Mail className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">Email Address</p>
//                         <p className="font-medium">{school.Email_ID}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Phone className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">UDISE Code</p>
//                         <p className="font-medium">{school.UDISE_Code}</p>
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//                 {/* Example of displaying dashboard data */}
//                 <div className="mt-8">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Summary</h3>
//                   <div className="flex flex-col space-y-5">

//                     {/* Total Projects */}
//                     <div className="flex items-center p-5 bg-gradient-to-r from-red-100 to-red-50 rounded-2xl shadow-md border border-red-200">
//                       <div className="w-12 h-12 flex items-center justify-center bg-red-200 text-red-800 rounded-full text-lg font-bold">
//                         📁
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm text-gray-500">Total Projects</p>
//                         <p className="text-2xl font-semibold text-gray-800">{dashboardData?.totalProjects}</p>
//                       </div>
//                     </div>

//                     {/* Guide Teachers */}
//                     <div className="flex items-center p-5 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow-md border border-blue-200">
//                       <div className="w-12 h-12 flex items-center justify-center bg-blue-200 text-blue-800 rounded-full text-lg font-bold">
//                         👨‍🏫
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm text-gray-500">Guide Teachers</p>
//                         <p className="text-2xl font-semibold text-gray-800">{dashboardData?.guideTeachers}</p>
//                       </div>
//                     </div>

//                     {/* Submitted Ideas */}
//                     <div className="flex items-center p-5 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl shadow-md border border-green-200">
//                       <div className="w-12 h-12 flex items-center justify-center bg-green-200 text-green-800 rounded-full text-lg font-bold">
//                         💡
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm text-gray-500">Total Students</p>
//                         <p className="text-2xl font-semibold text-gray-800">{dashboardData?.studentsCount}</p>
//                       </div>
//                     </div>

//                   </div>
//                 </div>



//               </div>

//               {/* Right Side Tabs & Content (8 columns) */}
//               <div className="md:col-span-9 space-y-6 sticky top-20 self-start">
//                 {/* Tabs */}
//                 <div className="flex gap-4 border-b border-gray-200 mb-4">
//                   <button
//                     onClick={() => setActiveTab('guide')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'guide' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Guide Teacher List
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('student')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'idea' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Student List
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('pending')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'template' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Pending Project List 
//                   </button>
//                    <button
//                     onClick={() => setActiveTab('completed')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'template' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Completed Project List 
//                   </button>
//                 </div>

//                 {/* Tab Content */}
//                 <div className="p-6 rounded-xl">
//                   {activeTab === 'guide' && <RegisterGuideTeacher />}
//                   {activeTab === 'student' && <IdeaSubmissionForm />}
//                   {activeTab === 'pending' && <HackathonPage />}
//                 </div>
//               </div>
//             </div>


//           </div>
//         </div>
//       </div>
//     </div>
// );

// };

// export default SchoolAdminDashboard;
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { School, MapPin, Mail, Phone, LogOut } from 'lucide-react';

// import RegisterGuideTeacher from './RegisterGuideTeacher';
// import IdeaSubmissionForm from './IdeaSubmissionForm ';
// import HackathonPage from './HackathonPage';

// interface School {
//   _id: string;
//   School_Name: string;
//   UDISE_Code: string;
//   Email_ID: string;
//   District: string;
//   Address: string;
//   Office_Mobile: number;
//   status: string;
// }

// interface DashboardData {
//   totalProjects: number;
//   guideTeachers: number;
//   submittedIdeas: number;
//   studentsCount: number;
// }

// const SchoolAdminDashboard = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [school, setSchool] = useState<School | null>(null);
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('guide');

//   useEffect(() => {
//     const fetchSchoolData = async () => {
//       try {
//         const schoolRes = await axios.get(`http://localhost:11129/api/schools/${id}`);
//         setSchool(schoolRes.data);
//       } catch (err) {
//         console.error('Error loading school data:', err);
//       }
//     };



//     fetchSchoolData();

//   }, [id]);

//   const handleLogout = () => {
//     navigate('/admin-dashboard');
//   };

//   if (!school || loading) {
//     return <div className="p-6 text-center">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-8xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-red-800 px-4 py-4 sm:px-10">
//             <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//                 <School className="w-6 h-6" />
//                 {school.School_Name} Dashboard
//               </h1>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Back
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="px-6 py-8 sm:px-10">
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
//               {/* Left: School Info */}
//               <div className="md:col-span-3 space-y-6 sticky top-20 self-start">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">School Information</h3>
//                   <div className="mt-4 space-y-4">
//                     <div className="flex items-center gap-3">
//                       <School className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">School Name</p>
//                         <p className="font-medium">{school.School_Name}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <MapPin className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">District</p>
//                         <p className="font-medium">{school.District}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Mail className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">Email Address</p>
//                         <p className="font-medium">{school.Email_ID}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Phone className="w-5 h-5 text-red-800" />
//                       <div>
//                         <p className="text-sm text-gray-500">UDISE Code</p>
//                         <p className="font-medium">{school.UDISE_Code}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Dashboard Summary */}
//                 <div className="mt-8">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Summary</h3>
//                   <div className="flex flex-col space-y-5">
//                     <div className="flex items-center p-5 bg-gradient-to-r from-red-100 to-red-50 rounded-2xl shadow-md border border-red-200">
//                       <div className="w-12 h-12 flex items-center justify-center bg-red-200 text-red-800 rounded-full text-lg font-bold">
//                         📁
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm text-gray-500">Total Projects</p>
//                         <p className="text-2xl font-semibold text-gray-800">{dashboardData?.totalProjects}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center p-5 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow-md border border-blue-200">
//                       <div className="w-12 h-12 flex items-center justify-center bg-blue-200 text-blue-800 rounded-full text-lg font-bold">
//                         👨‍🏫
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm text-gray-500">Guide Teachers</p>
//                         <p className="text-2xl font-semibold text-gray-800">{dashboardData?.guideTeachers}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center p-5 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl shadow-md border border-green-200">
//                       <div className="w-12 h-12 flex items-center justify-center bg-green-200 text-green-800 rounded-full text-lg font-bold">
//                         💡
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm text-gray-500">Total Students</p>
//                         <p className="text-2xl font-semibold text-gray-800">{dashboardData?.studentsCount}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right: Tabs */}
//               <div className="md:col-span-9 space-y-6 sticky top-20 self-start">
//                 <div className="flex gap-4 border-b border-gray-200 mb-4">
//                   <button
//                     onClick={() => setActiveTab('guide')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'guide' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Guide Teacher List
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('student')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'student' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Student List
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('pending')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Pending Project List
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('completed')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'completed' ? 'border-b-4 border-red-800 text-red-800' : 'text-gray-600'}`}
//                   >
//                     Completed Project List
//                   </button>
//                 </div>

//                 {/* Tab Content */}
//                 <div className="p-6 rounded-xl">
//                   {activeTab === 'guide' && <RegisterGuideTeacher />}
//                   {activeTab === 'student' && <IdeaSubmissionForm />}
//                   {activeTab === 'pending' && <HackathonPage />}
//                   {activeTab === 'completed' && <div>Completed Projects Component (add yours)</div>}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>  
//     </div>
//   );
// };

// export default SchoolAdminDashboard;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { School, MapPin, Mail, Phone, LogOut } from 'lucide-react';



import BMCLayout from '../BMCLayout';

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
        const schoolRes = await axios.get(`http://localhost:11129/api/schools/${id}`);
        setSchool(schoolRes.data);
        console.log('School Data:', schoolRes.data);

        const dashboardRes = await axios.get(`http://localhost:11129/api/admin/summary/${id}`);
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

                                  {/* <td className="border px-4 py-2">
                                    {project.paymentScreenshot?.base64 ? (
                                      <img
                                        src={`data:${project.paymentScreenshot.contentType};base64,${project.paymentScreenshot.base64}`}
                                        alt="Payment Screenshot"
                                        className="w-24 h-auto rounded shadow"
                                      />
                                    ) : 'N/A'}
                                  </td> */}
                                 


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

