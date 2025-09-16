


// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Users, LogOut, CheckCircle, XCircle, Menu, LayoutDashboard, School, UserCheck, Settings } from 'lucide-react';
// // import axios from 'axios';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { FaMoneyBill } from 'react-icons/fa';

// // interface Evaluator {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   institution: string;
// //   expertise: string[];
// //   status: 'pending' | 'approved' | 'rejected';
// // }

// // interface School {
// //   _id: string;
// //   School_Name: string;
// //   UDISE_Code: string;
// //   Email_ID: string;
// //   District: string;
// //   Address: string;
// //   Office_Mobile: number;
// //   status: string;
// // }

// // interface EvaluatorList {
// //   _id: string;
// //   username: string;
// //   name: string;
// //   evaluationStage: string;
// //   email: string;
// //   institution: string;
// //   expertise: string[];
// //   status: 'pending' | 'approved' | 'rejected';
// // }

// // const districts = [
// //   "TENKASI",
// //   "TIRUNELVELI",
// //   "THOOTHUKUDI",
// //   "KANYAKUMARI",
// //   "VIRUTHUNAGAR",
// //   "MADURAI",
// // ];

// // export default function AdminDashboard() {
// //   const navigate = useNavigate();
// //   const [selectedMenu, setSelectedMenu] = useState('dashboard');
// //   const [evaluatorList, setEvaluatorList] = useState<EvaluatorList[]>([]);
// //   const [evaluators, setEvaluators] = useState<Evaluator[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [drawerOpen, setDrawerOpen] = useState(true);
// //   const [schools, setSchools] = useState<School[]>([]);
// //   const [editableIndex, setEditableIndex] = useState(null); // Only one row editable
// //   const [editableList, setEditableList] = useState([]);
// //   const [activeTab, setActiveTab] = useState("TENKASI");
// //   const [paymentData, setPaymentData] = useState([]);
// //   const [totalPayment, setTotalPayment] = useState(0);


// //   useEffect(() => {
// //     setEditableList(evaluatorList);
// //   }, [evaluatorList]);


// //   const handleInputChange = (index, field, value) => {
// //     const updated = [...editableList];
// //     updated[index][field] = value;
// //     setEditableList(updated);
// //   };

// //   const handleSave = async (index) => {
// //     const evaluator = editableList[index];
// //     try {
// //       await axios.put(`http://localhost:11129/api/admin/evaluators/${evaluator._id}`, evaluator);
// //       alert('Updated Successfully');
// //       setEditableIndex(null);
// //     } catch (err) {
// //       console.error(err);
// //       alert('Update failed');
// //     }
// //   };


// //   const handleDelete = async (index) => {
// //     const evaluator = editableList[index];
// //     try {
// //       await axios.put(`http://localhost:11129/api/admin/evaluators/${evaluator._id}`, { ...evaluator, status: 'rejected' });
// //       const updated = [...editableList];
// //       updated[index].status = 'rejected';
// //       setEditableList(updated);
// //       alert('Marked as Rejected');
// //     } catch (err) {
// //       console.error(err);
// //       alert('Failed to delete');
// //     }
// //   };

// //   useEffect(() => {
// //     if (activeTab) {
// //       fetchPayments(activeTab);
// //     }
// //   }, [activeTab]);

// //   const fetchPayments = async (district) => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(`http://localhost:11129/api/admin/payments/${district}`);
// //       const data = await response.json();
// //       setPaymentData(data);

// //       // Calculate total payment
// //       const total = data.reduce((sum, item) => sum + (Number(item.paymentAmount) || 0), 0);
// //       setTotalPayment(total);
// //     } catch (err) {
// //       console.error("Error fetching payments:", err);
// //       setTotalPayment(0);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };


// //   useEffect(() => {
// //     const adminToken = localStorage.getItem('adminToken');
// //     if (!adminToken) {
// //       navigate('/admin-login');
// //       return;
// //     }
// //     fetchEvaluators();
// //   }, [navigate]);

// //   useEffect(() => {
// //     if (selectedMenu === 'schools') {
// //       fetchSchools();
// //     }
// //     if (selectedMenu === 'eval-list') {
// //       fetchEvaluatorsList();
// //     }
// //   }, [selectedMenu]);

// //   const fetchSchools = async () => {
// //     try {
// //       const token = localStorage.getItem('adminToken');
// //       const res = await axios.get('http://localhost:11129/api/admin/get-registered-schools', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setSchools(res.data);
// //     } catch (err) {
// //       console.error('Error fetching schools', err);
// //       toast.error('Failed to load school details');
// //     }
// //   };

// //   const fetchEvaluators = async () => {
// //     const token = localStorage.getItem('adminToken');
// //     try {
// //       const response = await axios.get('http://localhost:11129/api/evaluator/pending', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setEvaluators(response.data);
// //     } catch (error) {
// //       console.error('Error fetching evaluators:', error);
// //       toast.error('Failed to fetch evaluators');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const fetchEvaluatorsList = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:11129/api/admin/get-evaluators');
// //       setEvaluatorList(res.data);
// //     } catch (err) {
// //       console.error('Error fetching evaluators:', err);
// //     }
// //   };

// //   const handleStatusChange = async (evaluatorId: string, status: 'approved' | 'rejected') => {
// //     try {
// //       const endpoint = `http://localhost:11129/api/evaluator/${status}/${evaluatorId}`;
// //       await axios.put(endpoint, {}, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
// //         },
// //       });
// //       toast.success(`Evaluator ${status} successfully`);
// //       fetchEvaluators();
// //     } catch (error) {
// //       console.error(`Error ${status} evaluator:`, error);
// //       toast.error(`Failed to ${status} evaluator`);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('adminToken');
// //     navigate('/admin-login');
// //   };

// //   const menuItems = [
// //     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
// //     { id: 'evaluators', label: 'Pending Evaluators', icon: Users },
// //     { id: 'schools', label: 'Schools', icon: School },
// //     { id: 'eval-list', label: 'Evaluator List', icon: UserCheck },
// //     { id: 'payment', label: 'Payment Details', icon: FaMoneyBill },

// //     { id: 'settings', label: 'Settings', icon: Settings },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <div className={`bg-white w-64 shadow-lg transition-transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed h-full`}>
// //         <div className="p-4 border-b flex justify-between items-center bg-red-800 text-white">
// //           <h2 className="text-xl font-semibold">Admin Panel</h2>
// //           <button onClick={() => setDrawerOpen(!drawerOpen)} className="md:hidden">
// //             <Menu className="h-6 w-6" />
// //           </button>
// //         </div>
// //         <nav className="p-4">
// //           {menuItems.map((item) => (
// //             <button
// //               key={item.id}
// //               onClick={() => setSelectedMenu(item.id)}
// //               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${selectedMenu === item.id
// //                 ? 'bg-red-100 text-red-800'
// //                 : 'text-gray-600 hover:bg-gray-100'
// //                 }`}
// //             >
// //               <item.icon className="h-5 w-5" />
// //               <span>{item.label}</span>
// //             </button>
// //           ))}
// //           <button
// //             onClick={handleLogout}
// //             className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 mt-8"
// //           >
// //             <LogOut className="h-5 w-5" />
// //             <span>Logout</span>
// //           </button>
// //         </nav>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 md:ml-64 p-8">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Dashboard Overview */}
// //           {selectedMenu === 'dashboard' && (
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

// //               <div className="bg-red-100 border-l-4 border-red-800 p-6 rounded-lg shadow mb-6">
// //                 <h3 className="text-2xl font-bold text-red-800">Total Schools</h3>
// //                 <p className="text-4xl font-extrabold text-red-900 mt-2">{schools.length}</p>
// //               </div>
// //               <div className="bg-red-100 border-l-4 border-red-800 p-6 rounded-lg shadow mb-6">
// //                 <h3 className="text-2xl font-bold text-red-800">Pending Evaluators</h3>
// //                 <p className="text-4xl font-extrabold text-red-900 mt-2">{evaluators.length}</p>
// //               </div>
// //               <div className="bg-red-100 border-l-4 border-red-800 p-6 rounded-lg shadow mb-6">
// //                 <h3 className="text-2xl font-bold text-red-800">Total Evaluators</h3>
// //                 <p className="text-4xl font-extrabold text-red-900 mt-2">{evaluatorList.length}</p>
// //               </div>
// //               <div className="bg-red-100 border-l-4 border-red-800 p-6 rounded-lg shadow mb-6">
// //                 <h3 className="text-2xl font-bold text-red-800">Total Payments Received</h3>
// //                 <p className="text-4xl font-extrabold text-red-900 mt-2">₹{totalPayment.toLocaleString()}</p>
// //               </div>

// //             </div>
// //           )}

// //           {/* Pending Evaluators Section */}
// //           {selectedMenu === 'evaluators' && (
// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Evaluator Applications</h2>
// //               {isLoading ? (
// //                 <div className="text-center py-4">Loading...</div>
// //               ) : evaluators.length === 0 ? (
// //                 <div className="text-center py-4 text-gray-500">No pending applications</div>
// //               ) : (
// //                 <div className="overflow-x-auto">
// //                   <table className="min-w-full divide-y divide-gray-200">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Institution</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expertise</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {evaluators.map((evaluator) => (
// //                         <tr key={evaluator._id} className="hover:bg-gray-50">
// //                           <td className="px-6 py-4">{evaluator.name}</td>
// //                           <td className="px-6 py-4">{evaluator.email}</td>
// //                           <td className="px-6 py-4">{evaluator.institution}</td>
// //                           <td className="px-6 py-4">{evaluator.expertise.join(', ')}</td>
// //                           <td className="px-6 py-4">
// //                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${evaluator.status === 'approved'
// //                               ? 'bg-green-100 text-green-800'
// //                               : evaluator.status === 'rejected'
// //                                 ? 'bg-red-100 text-red-800'
// //                                 : 'bg-yellow-100 text-yellow-800'
// //                               }`}>
// //                               {evaluator.status}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4">
// //                             <div className="flex space-x-2">
// //                               <button
// //                                 onClick={() => handleStatusChange(evaluator._id, 'approved')}
// //                                 className="text-green-600 hover:text-green-900"
// //                               >
// //                                 <CheckCircle className="h-5 w-5" />
// //                               </button>
// //                               <button
// //                                 onClick={() => handleStatusChange(evaluator._id, 'rejected')}
// //                                 className="text-red-600 hover:text-red-900"
// //                               >
// //                                 <XCircle className="h-5 w-5" />
// //                               </button>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Schools Section */}
// //           {selectedMenu === 'schools' && (
// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-bold text-gray-900 mb-4">Registered Schools</h2>
// //               {schools.length === 0 ? (
// //                 <div className="text-center py-4 text-gray-500">No registered schools found</div>
// //               ) : (
// //                 <div className="overflow-x-auto">
// //                   <table className="min-w-full divide-y divide-gray-200">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UDISE Code</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {schools.map((school) => (
// //                         <tr key={school._id} className="hover:bg-gray-50">
// //                           <td className="px-4 py-2">{school.UDISE_Code}</td>
// //                           <td className="px-4 py-2">{school.School_Name}</td>
// //                           <td className="px-4 py-2">{school.Email_ID}</td>
// //                           <td className="px-4 py-2">{school.District}</td>
// //                           <td className="px-4 py-2">{school.Office_Mobile}</td>
// //                           <td className="px-4 py-2">
// //                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${school.status === 'registered'
// //                               ? 'bg-green-100 text-green-800'
// //                               : 'bg-yellow-100 text-yellow-800'
// //                               }`}>
// //                               {school.status}
// //                             </span>
// //                           </td>
// //                           <td className="px-4 py-2 text-blue-600 hover:text-blue-800">
// //                             <Link to={`/school/${school._id}`}>View Details</Link>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Evaluator List Section */}
// //           {selectedMenu === 'eval-list' && (
// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-bold text-gray-900 mb-4">Evaluator List</h2>
// //               {evaluatorList.length === 0 ? (
// //                 <div className="text-center py-4 text-gray-500">No evaluators found</div>
// //               ) : (
// //                 <div className="overflow-x-auto">
// //                   <table className="min-w-full divide-y divide-gray-200">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expertise</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// //                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>

// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {editableList.map((ev, index) => (
// //                         <tr key={ev._id} className="hover:bg-gray-50">
// //                           <td className="px-4 py-2">
// //                             {editableIndex === index ? (
// //                               <input
// //                                 type="text"
// //                                 value={ev.name}
// //                                 onChange={(e) => handleInputChange(index, 'name', e.target.value)}
// //                                 className="border rounded px-2 py-1 w-full"
// //                               />
// //                             ) : (
// //                               ev.name
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-2">
// //                             {editableIndex === index ? (
// //                               <input
// //                                 type="text"
// //                                 value={ev.username}
// //                                 onChange={(e) => handleInputChange(index, 'username', e.target.value)}
// //                                 className="border rounded px-2 py-1 w-full"
// //                               />
// //                             ) : (
// //                               ev.username
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-2">
// //                             {editableIndex === index ? (
// //                               <input
// //                                 type="email"
// //                                 value={ev.email}
// //                                 onChange={(e) => handleInputChange(index, 'email', e.target.value)}
// //                                 className="border rounded px-2 py-1 w-full"
// //                               />
// //                             ) : (
// //                               ev.email
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-2">
// //                             {editableIndex === index ? (
// //                               <input
// //                                 type="text"
// //                                 value={ev.evaluationStage}
// //                                 onChange={(e) => handleInputChange(index, 'evaluationStage', e.target.value)}
// //                                 className="border rounded px-2 py-1 w-full"
// //                               />
// //                             ) : (
// //                               ev.evaluationStage
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-2">
// //                             {editableIndex === index ? (
// //                               <input
// //                                 type="text"
// //                                 value={ev.expertise.join(', ')}
// //                                 onChange={(e) =>
// //                                   handleInputChange(index, 'expertise', e.target.value.split(',').map(s => s.trim()))
// //                                 }
// //                                 className="border rounded px-2 py-1 w-full"
// //                               />
// //                             ) : (
// //                               ev.expertise.join(', ')
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-2">
// //                             {editableIndex === index ? (
// //                               <select
// //                                 value={ev.status}
// //                                 onChange={(e) => handleInputChange(index, 'status', e.target.value)}
// //                                 className="border rounded px-2 py-1 w-full"
// //                               >
// //                                 <option value="pending">Pending</option>
// //                                 <option value="approved">Approved</option>
// //                                 <option value="rejected">Rejected</option>
// //                                 <option value="inactive">Inactive</option>
// //                               </select>
// //                             ) : (
// //                               <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${ev.status === 'approved'
// //                                 ? 'bg-green-100 text-green-800'
// //                                 : ev.status === 'rejected'
// //                                   ? 'bg-red-100 text-red-800'
// //                                   : ev.status === 'inactive'
// //                                     ? 'bg-gray-200 text-gray-600'
// //                                     : 'bg-yellow-100 text-yellow-800'
// //                                 }`}>
// //                                 {ev.status}
// //                               </span>
// //                             )}
// //                           </td>
// //                           <td className="px-4 py-2 text-right space-x-2">
// //                             {editableIndex === index ? (
// //                               <button
// //                                 onClick={() => handleSave(index)}
// //                                 className="text-green-600 hover:text-green-800"
// //                                 title="Save"
// //                               >
// //                                 💾
// //                               </button>
// //                             ) : (
// //                               <button
// //                                 onClick={() => setEditableIndex(index)}
// //                                 className="text-blue-600 hover:text-blue-800"
// //                                 title="Edit"
// //                               >
// //                                 ✏️
// //                               </button>
// //                             )}
// //                             <button
// //                               onClick={() => handleDelete(index)}
// //                               className="text-red-600 hover:text-red-800"
// //                               title="Delete"
// //                             >
// //                               🗑️
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>


// //                   </table>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Settings Section */}
// //           {selectedMenu === 'settings' && (
// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
// //               <p className="text-gray-600">Admin settings and configuration options will be available here.</p>
// //             </div>
// //           )}
// //           {/* Payment Details Section */}
// //           {selectedMenu === 'payment' && (
// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>


// //               {/* Tabs */}
// //               <div className="mb-6 border-b border-gray-200">
// //                 <nav className="-mb-px flex space-x-4">
// //                   {districts.map((tab) => (
// //                     <button
// //                       key={tab}
// //                       onClick={() => setActiveTab(tab)}
// //                       className={`whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm ${activeTab === tab
// //                         ? "border-red-800 text-red-800"
// //                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
// //                         }`}
// //                     >
// //                       {tab}
// //                     </button>
// //                   ))}
// //                 </nav>
// //               </div>

// //               {/* Total Payment Box */}
// //               <div className="mb-6">
// //                 <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow p-6 text-center">
// //                   <h3 className="text-lg font-semibold">Total Payments in {activeTab}</h3>
// //                   <p className="text-3xl font-bold mt-2">₹{totalPayment.toLocaleString()}</p>
// //                 </div>
// //               </div>

// //               {/* Table Section */}
// //               <div className="text-gray-700">
// //                 <div className="overflow-x-auto">
// //                   <table className="min-w-full divide-y divide-gray-200 border">
// //                     <thead className="bg-gray-100">
// //                       <tr>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">School ID</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Project ID</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Transaction ID</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">District</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Payment Amount</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Payment Status</th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Payment Screenshot</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {isLoading ? (
// //                         <tr>
// //                           <td colSpan="7" className="text-center py-4">
// //                             Loading...
// //                           </td>
// //                         </tr>
// //                       ) : paymentData.length === 0 ? (
// //                         <tr>
// //                           <td colSpan="7" className="text-center py-4">
// //                             No payment data found.
// //                           </td>
// //                         </tr>
// //                       ) : (
// //                         paymentData.map((item, index) => (
// //                           <tr key={index}>
// //                             <td className="px-4 py-2 text-sm text-gray-800">{item.schoolId}</td>
// //                             <td className="px-4 py-2 text-sm text-gray-800">{item.projectId}</td>
// //                             <td className="px-4 py-2 text-sm text-gray-800">{item.transactionId}</td>
// //                             <td className="px-4 py-2 text-sm text-gray-800">{item.district}</td>
// //                             <td className="px-4 py-2 text-sm text-gray-800">₹{item.paymentAmount}</td>
// //                             <td className="px-4 py-2 text-sm text-gray-800">{item.paymentStatus}</td>
// //                             <td className="px-4 py-2 text-sm text-gray-800">
// //                               {item.paymentScreenshot ? (
// //                                 <a
// //                                   href={`/uploads/${item.paymentScreenshot}`}
// //                                   target="_blank"
// //                                   rel="noopener noreferrer"
// //                                   className="text-blue-600 underline"
// //                                 >
// //                                   View Screenshot
// //                                 </a>
// //                               ) : (
// //                                 "N/A"
// //                               )}
// //                             </td>
// //                           </tr>
// //                         ))
// //                       )}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>

// //             </div>
// //           )}

// //         </div>
// //       </div>

// //       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
// //     </div>
// //   );
// // }






// // AdminDashboardLayout.jsx
// import React, { useState } from "react";

// import DashboardHome from "./admin/DashboardHome";
// import SchoolManagement from "./admin/SchoolManagement";  // Import your school component
// import GuideTeacherList from "./admin/GuideTeacherList";
// import ProjectList from "./admin/ProjectList";
// import EvaluatorManagement from "./admin/EvaluatorManagement";
// import ProjectList1 from "./admin/ProjectList1";
// import FinalistManagement from "./admin/FinalistManagement";
// import ReportsExport from "./admin/ReportsExport";
// import EvaluationRequest from "./admin/EvaluationRequest";
// // import other components as needed

// const AdminDashboard = () => {
//   const [selectedPage, setSelectedPage] = useState("dashboard");

//   // Function to render the page based on selectedPage
//   const renderPage = () => {
//     switch (selectedPage) {
//       case "schools":
//         return <SchoolManagement />;
//       case "dashboard":
//         return <DashboardHome />;
//       case "guideTeachers":
//         return <GuideTeacherList/>; // Replace with actual component
//       case "projects":
//         return <ProjectList/>; // Replace with actual component
//       // Add more cases for other sidebar items
//       case "evaluators":
//         return <EvaluatorManagement/>; // Replace with actual component
//       case "project evaluation tracking":
//         return <ProjectList1/>; // Replace with actual component
//       case "evaluation request":
//         return <EvaluationRequest/>; // Replace with actual component
//       case "finalists":
//         return <FinalistManagement/>; // Replace with actual component
//       case "reports":
//         return <ReportsExport/>; // Replace with actual component
//       default:
//         return <DashboardHome />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar selectedPage={selectedPage} onSelectPage={setSelectedPage} />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// // Sidebar.jsx
// export const Sidebar = ({ selectedPage, onSelectPage }) => {
//   const items = [
//     { id: "dashboard", label: "Dashboard" },
//     { id: "schools", label: "Schools" },
//     { id: "guideTeachers", label: "Guide Teachers" },
//     { id: "projects", label: "Projects" },
//     { id: "evaluators", label: "Evaluators" },
//     { id: "project evaluation tracking", label: "Project Evaluation Tracking" },
//     { id: "evaluation request", label: "Evaluation Request" },
//     { id: "finalists", label: "Finalists" },
//     { id: "reports", label: "Reports" },
//   ];

//   return (
//     <div className="w-64 bg-white shadow-lg p-4">
//       <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//       <ul className="space-y-4">
//         {items.map(({ id, label }) => (
//           <li
//             key={id}
//             className={`cursor-pointer text-gray-700 hover:text-blue-600 ${
//               selectedPage === id ? "text-blue-600 font-semibold" : ""
//             }`}
//             onClick={() => onSelectPage(id)}
//           >
//             {label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// // Header.jsx
// export const Header = () => {
//   return (
//     <div className="bg-white shadow p-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-gray-800">Hackathon Admin Dashboard</h1>
//       <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//         Logout
//       </button>
//     </div>
//   );
// };


import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';


// Admin Pages
import DashboardHome from "./admin/DashboardHome";
import SchoolManagement from "./admin/SchoolManagement";
import GuideTeacherList from "./admin/GuideTeacherList";
import ProjectList from "./admin/ProjectList";
import EvaluatorManagement from "./admin/EvaluatorManagement";
import ProjectList1 from "./admin/ProjectList1";
import FinalistManagement from "./admin/FinalistManagement";
import ReportsExport from "./admin/ReportsExport";
import EvaluationRequest from "./admin/EvaluationRequest";
import JullyMark from "./admin/JullyMark";
import DailyProjectTracking from "./admin/DailyProjectTracking";


const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  // Dynamically render selected page
  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <DashboardHome />;
      case "schools":
        return <SchoolManagement />;
      case "guideTeachers":
        return <GuideTeacherList />;
      case "projects":
        return <ProjectList />;
      case "evaluators":
        return <EvaluatorManagement />;
      // case "project evaluation tracking":
      //   return <ProjectList1 />;
      case "evaluation request":
        return <EvaluationRequest />;
      case "finalists":
        return <FinalistManagement />;
        case "jully mark":
        return <JullyMark />;
      case "reports":
        return <ReportsExport />;
      case "daily tracking":
        return <DailyProjectTracking />; // Assuming this is the correct component for daily tracking
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar selectedPage={selectedPage} onSelectPage={setSelectedPage} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
// Sidebar.jsx
export const Sidebar = ({ selectedPage, onSelectPage }) => {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "schools", label: "Schools" },
    { id: "guideTeachers", label: "Guide Teachers" },
    { id: "projects", label: "Projects" },
    { id: "evaluators", label: "Evaluators" },
    // { id: "project evaluation tracking", label: "Project Evaluation Tracking" },
    { id: "evaluation request", label: "Evaluation Request" },
    
    { id: "jully mark", label: "Jury Mark Entry" },
    { id: "finalists", label: "Finalists" },
    { id: "reports", label: "Reports" },
    { id: "daily tracking", label: "Daily Project Tracking" },

  ];

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        {items.map(({ id, label }) => (
          <li
            key={id}
            className={`cursor-pointer text-gray-700 hover:text-blue-600 ${
              selectedPage === id ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => onSelectPage(id)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};


// Header.jsx
export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Hackathon Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};
