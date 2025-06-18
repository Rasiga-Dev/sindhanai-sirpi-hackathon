// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // import { Users, LogOut, CheckCircle, XCircle, Menu, LayoutDashboard, School, UserCheck, Settings } from 'lucide-react';

// // interface Evaluator {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   institution: string;
// //   expertise: string[];
// //   status: 'pending' | 'approved' | 'rejected';
// // }
// // const EvaluationRequest = () => {
// //   const navigate = useNavigate();

// //   const [isLoading, setIsLoading] = useState(true);
// //   const [evaluators, setEvaluators] = useState<Evaluator[]>([]);

// //     const handleStatusChange = async (evaluatorId: string, status: 'approved' | 'rejected') => {
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

// //   useEffect(() => {
// //     const adminToken = localStorage.getItem('adminToken');
// //     if (!adminToken) {
// //       navigate('/admin-login');
// //       return;
// //     }
// //     fetchEvaluators();
// //   }, [navigate]);


// //  const fetchEvaluators = async () => {
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

// //   return (
// //     <div className="bg-white rounded-lg shadow-md p-6">
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
// //   )
// // }

// // export default EvaluationRequest

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { CheckCircle, XCircle } from 'lucide-react';

// interface Evaluator {
//   _id: string;
//   name: string;
//   email: string;
//   institution: string;
//   evaluationStage : string;
//   expertise: string[];
//   status: 'pending' | 'approved' | 'rejected';
// }
// interface EvaluatorList {
//   _id: string;
//   username: string;
//   name: string;
//   evaluationStage: string;
//   email: string;
//   institution: string;
//   expertise: string[];
//   status: 'pending' | 'approved' | 'rejected';
// }
// const EvaluationRequest = () => {
//   const navigate = useNavigate();
//   const [evaluatorList, setEvaluatorList] = useState<EvaluatorList[]>([]);
//   const [editableIndex, setEditableIndex] = useState(null); // Only one row editable
//   const [editableList, setEditableList] = useState([]);


//   const [tab, setTab] = useState<'pending' | 'approved'>('pending');
//   const [isLoading, setIsLoading] = useState(true);
//   const [evaluators, setEvaluators] = useState<Evaluator[]>([]);

//   const fetchEvaluators = async (status: 'pending' | 'approved') => {
//     const token = localStorage.getItem('adminToken');
//     try {
//       const response = await axios.get(`http://localhost:11129/api/evaluator/${status}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvaluators(response.data);
//     } catch (error) {
//       console.error('Error fetching evaluators:', error);
//       toast.error('Failed to fetch evaluators');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusChange = async (evaluatorId: string, status: 'approved' | 'rejected') => {
//     try {
//       const endpoint = `http://localhost:11129/api/evaluator/${status}/${evaluatorId}`;
//       await axios.put(endpoint, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
//         },
//       });
//       toast.success(`Evaluator ${status} successfully`);
//       fetchEvaluators(tab); // Refresh current tab
//     } catch (error) {
//       console.error(`Error ${status} evaluator:`, error);
//       toast.error(`Failed to ${status} evaluator`);
//     }
//   };

//   useEffect(() => {
//     const adminToken = localStorage.getItem('adminToken');
//     if (!adminToken) {
//       navigate('/admin-login');
//     } else {
//       fetchEvaluators(tab);
//     }
//   }, [tab, navigate]);

//    useEffect(() => {
//     setEditableList(evaluatorList);
//   }, [evaluatorList]);

//   const handleInputChange = (index, field, value) => {
//     const updated = [...editableList];
//     updated[index][field] = value;
//     setEditableList(updated);
//   };

//  const handleSave = async (index) => {
//     const evaluator = editableList[index];
//     try {
//       await axios.put(`http://localhost:11129/api/admin/evaluators/${evaluator._id}`, evaluator);
//       alert('Updated Successfully');
//       setEditableIndex(null);
//     } catch (err) {
//       console.error(err);
//       alert('Update failed');
//     }
//   };


//   const handleDelete = async (index) => {
//     const evaluator = editableList[index];
//     try {
//       await axios.put(`http://localhost:11129/api/admin/evaluators/${evaluator._id}`, { ...evaluator, status: 'rejected' });
//       const updated = [...editableList];
//       updated[index].status = 'rejected';
//       setEditableList(updated);
//       alert('Marked as Rejected');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete');
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-900">Evaluator Applications</h2>
//         <div className="flex space-x-2">
//           <button
//             className={`px-4 py-2 rounded ${tab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//             onClick={() => {
//               setTab('pending');
//               setIsLoading(true);
//             }}
//           >
//             Pending
//           </button>
//           <button
//             className={`px-4 py-2 rounded ${tab === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//             onClick={() => {
//               setTab('approved');
//               setIsLoading(true);
//             }}
//           >
//             Approved
//           </button>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="text-center py-4">Loading...</div>
//       ) : evaluators.length === 0 ? (
//         <div className="text-center py-4 text-gray-500">No {tab} evaluators found.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expertise</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 {tab === 'pending' && (
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {evaluators.map((evaluator) => (
//                 <tr key={evaluator._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">{evaluator.name}</td>
//                   <td className="px-6 py-4">{evaluator.email}</td>
//                   <td className="px-6 py-4">{evaluator.evaluationStage}</td>
//                   <td className="px-6 py-4">{evaluator.expertise.join(', ')}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       evaluator.status === 'approved'
//                         ? 'bg-green-100 text-green-800'
//                         : evaluator.status === 'rejected'
//                           ? 'bg-red-100 text-red-800'
//                           : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {evaluator.status}
//                     </span>
//                   </td>
//                   {tab === 'pending' && (
//                     <td className="px-6 py-4">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleStatusChange(evaluator._id, 'approved')}
//                           className="text-green-600 hover:text-green-900"
//                         >
//                           <CheckCircle className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleStatusChange(evaluator._id, 'rejected')}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <XCircle className="h-5 w-5" />
//                         </button>
//                       </div>
//                     </td>
//                   )}
//                    {tab === 'approved' && (
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                <h2 className="text-xl font-bold text-gray-900 mb-4">Evaluator List</h2>
//                {evaluatorList.length === 0 ? (
//                 <div className="text-center py-4 text-gray-500">No evaluators found</div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expertise</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>

//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {editableList.map((ev, index) => (
//                         <tr key={ev._id} className="hover:bg-gray-50">
//                           <td className="px-4 py-2">
//                             {editableIndex === index ? (
//                               <input
//                                 type="text"
//                                 value={ev.name}
//                                 onChange={(e) => handleInputChange(index, 'name', e.target.value)}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             ) : (
//                               ev.name
//                             )}
//                           </td>
//                           <td className="px-4 py-2">
//                             {editableIndex === index ? (
//                               <input
//                                 type="text"
//                                 value={ev.username}
//                                 onChange={(e) => handleInputChange(index, 'username', e.target.value)}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             ) : (
//                               ev.username
//                             )}
//                           </td>
//                           <td className="px-4 py-2">
//                             {editableIndex === index ? (
//                               <input
//                                 type="email"
//                                 value={ev.email}
//                                 onChange={(e) => handleInputChange(index, 'email', e.target.value)}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             ) : (
//                               ev.email
//                             )}
//                           </td>
//                           <td className="px-4 py-2">
//                             {editableIndex === index ? (
//                               <input
//                                 type="text"
//                                 value={ev.evaluationStage}
//                                 onChange={(e) => handleInputChange(index, 'evaluationStage', e.target.value)}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             ) : (
//                               ev.evaluationStage
//                             )}
//                           </td>
//                           <td className="px-4 py-2">
//                             {editableIndex === index ? (
//                               <input
//                                 type="text"
//                                 value={ev.expertise.join(', ')}
//                                 onChange={(e) =>
//                                   handleInputChange(index, 'expertise', e.target.value.split(',').map(s => s.trim()))
//                                 }
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             ) : (
//                               ev.expertise.join(', ')
//                             )}
//                           </td>
//                           <td className="px-4 py-2">
//                             {editableIndex === index ? (
//                               <select
//                                 value={ev.status}
//                                 onChange={(e) => handleInputChange(index, 'status', e.target.value)}
//                                 className="border rounded px-2 py-1 w-full"
//                               >
//                                 <option value="pending">Pending</option>
//                                 <option value="approved">Approved</option>
//                                 <option value="rejected">Rejected</option>
//                                 <option value="inactive">Inactive</option>
//                               </select>
//                             ) : (
//                               <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${ev.status === 'approved'
//                                 ? 'bg-green-100 text-green-800'
//                                 : ev.status === 'rejected'
//                                   ? 'bg-red-100 text-red-800'
//                                   : ev.status === 'inactive'
//                                     ? 'bg-gray-200 text-gray-600'
//                                     : 'bg-yellow-100 text-yellow-800'
//                                 }`}>
//                                 {ev.status}
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-4 py-2 text-right space-x-2">
//                             {editableIndex === index ? (
//                               <button
//                                 onClick={() => handleSave(index)}
//                                 className="text-green-600 hover:text-green-800"
//                                 title="Save"
//                               >
//                                 💾
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() => setEditableIndex(index)}
//                                 className="text-blue-600 hover:text-blue-800"
//                                 title="Edit"
//                               >
//                                 ✏️
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleDelete(index)}
//                               className="text-red-600 hover:text-red-800"
//                               title="Delete"
//                             >
//                               🗑️
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>


//                   </table>
//                 </div>
//               )}
//             </div>
//                   )}
//                 </tr>
//               ))}


//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluationRequest;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircle, XCircle, Pencil, Save } from 'lucide-react';

interface Evaluator {
    _id: string;
    name: string;
    email: string;
    institution: string;
    evaluationStage: string;
    expertise: string[];
    status: 'pending' | 'approved' | 'rejected';
}

interface EvaluatorList {
    _id: string;
    username: string;
    name: string;
    evaluationStage: string;
    email: string;
    institution: string;
    expertise: string[];
    status: 'pending' | 'approved' | 'rejected';
}
const districts = [
    "TENKASI",
    "TIRUNELVELI",
    "THOOTHUKUDI",
    "KANYAKUMARI",
    "VIRUTHUNAGAR",
    "MADURAI",
];
const EvaluationRequest = () => {
    const navigate = useNavigate();

    const [tab, setTab] = useState<'pending' | 'get-evaluators'>('pending');
    const [isLoading, setIsLoading] = useState(true);
    const [evaluators, setEvaluators] = useState<Evaluator[]>([]);
    const [evaluatorList, setEvaluatorList] = useState<EvaluatorList[]>([]);
    const [editableList, setEditableList] = useState<EvaluatorList[]>([]);
    const [editableIndex, setEditableIndex] = useState<number | null>(null);

    const token = localStorage.getItem('adminToken');

    const fetchEvaluatorsList = async () => {
        try {
            const res = await axios.get('http://localhost:11129/api/admin/get-evaluators');
            setEvaluatorList(res.data);
        } catch (err) {
            console.error('Error fetching evaluators:', err);
        }
    };

    const fetchEvaluators = async (status: 'pending' | 'get-evaluators') => {
        try {
            const res = await axios.get(`http://localhost:11129/api/evaluator/${status}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (status === 'pending') {
                setEvaluators(res.data);
            } else {
                setEvaluatorList(res.data);
                setEditableList(res.data);
            }
        } catch (err) {
            toast.error('Failed to fetch evaluators');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/admin-login');
        } else {
            fetchEvaluators(tab);

        }
    }, [tab]);

    const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
        try {
            await axios.put(`http://localhost:11129/api/evaluator/${status}/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(`Evaluator ${status}`);
            fetchEvaluators(tab);
        } catch (err) {
            toast.error(`Failed to ${status} evaluator`);
        }
    };

    // const handleInputChange = (index: number, field: keyof EvaluatorList, value: string) => {
    //     const updated = [...editableList];
    //     updated[index][field] = value;
    //     setEditableList(updated);
    // };


    const handleInputChange = (index: number, field: keyof EvaluatorList, value: string) => {
  const updated = [...editableList];
  updated[index][field] = value;
  setEditableList(updated);
};

    const handleSave = async (index: number) => {
        const evaluator = editableList[index];
        try {
            await axios.put(`http://localhost:11129/api/admin/evaluators/${evaluator._id}`, evaluator, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Evaluator updated');
            setEditableIndex(null);
            fetchEvaluators('get-evaluators');
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const handleRejectApproved = async (index: number) => {
        const evaluator = editableList[index];
        try {
            await axios.put(`http://localhost:11129/api/admin/evaluators/${evaluator._id}`, { ...evaluator, status: 'rejected' }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Evaluator marked as rejected');
            fetchEvaluators('get-evaluators');
        } catch (err) {
            toast.error('Failed to reject');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Evaluator Applications</h2>
                <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded ${tab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => { setTab('pending'); setIsLoading(true); }}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${tab === 'get-evaluators' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => { setTab('get-evaluators'); setIsLoading(true); }}
                    >
                        Approved
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-4">Loading...</div>
            ) : tab === 'pending' ? (
                evaluators.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No pending evaluators.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Stage</th>
                                    <th className="px-4 py-2 text-left">Expertise</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluators.map((e) => (
                                    <tr key={e._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{e.name}</td>
                                        <td className="px-4 py-2">{e.email}</td>
                                        <td className="px-4 py-2">{e.evaluationStage}</td>
                                        <td className="px-4 py-2">{e.expertise.join(', ')}</td>
                                        <td className="px-4 py-2 capitalize">{e.status}</td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <button onClick={() => handleStatusChange(e._id, 'approved')} className="text-green-600">
                                                <CheckCircle />
                                            </button>
                                            <button onClick={() => handleStatusChange(e._id, 'rejected')} className="text-red-600">
                                                <XCircle />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Stage</th>
                                <th className="px-4 py-2 text-left">Expertise</th>
                                <th className="px-4 py-2 text-left">Status</th>

                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editableList.map((ev, index) => (
                                <tr key={ev._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        {editableIndex === index ? (
                                            <input
                                                type="text"
                                                value={ev.name}
                                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : ev.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editableIndex === index ? (
                                            <input
                                                type="text"
                                                value={ev.username}
                                                onChange={(e) => handleInputChange(index, 'username', e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : ev.username}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editableIndex === index ? (
                                            <input
                                                type="email"
                                                value={ev.email}
                                                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : ev.email}
                                    </td>
                                    <td className="px-4 py-2">{ev.evaluationStage}</td>
                                    <td className="px-4 py-2">{ev.expertise.join(', ')}</td>
                                    <td className="px-4 py-2">
                                        {editableIndex === index ? (
                                            <select
                                                value={ev.status}
                                                onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            >
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                                <option value="pending">Pending</option>
                                                <option value="main">Main Evaluator</option>

                                            </select>
                                        ) : (
                                            <span className="capitalize">{ev.status}</span>
                                        )}
                                    </td>


                                    <td className="px-4 py-2 flex space-x-2">
                                        {editableIndex === index ? (
                                            <button onClick={() => handleSave(index)} className="text-blue-600">
                                                <Save />
                                            </button>
                                        ) : (
                                            <button onClick={() => setEditableIndex(index)} className="text-yellow-600">
                                                <Pencil />
                                            </button>
                                        )}
                                        <button onClick={() => handleRejectApproved(index)} className="text-red-600">
                                            <XCircle />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EvaluationRequest;
