
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircle, XCircle, Pencil, Save } from 'lucide-react';
import { API_BASE } from '../../config/api';

interface Evaluator {
    _id: string;
    username: string;
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
            const res = await axios.get(`${API_BASE}/api/admin/get-evaluators`);
            setEvaluatorList(res.data);
        } catch (err) {
            console.error('Error fetching evaluators:', err);
        }
    };

    const fetchEvaluators = async (status: 'pending' | 'get-evaluators') => {
        try {
            const res = await axios.get(`${API_BASE}/api/evaluator/${status}`, {
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
            await axios.put(`${API_BASE}/api/evaluator/${status}/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(`Evaluator ${status}`);
            fetchEvaluators(tab);
        } catch (err) {
            toast.error(`Failed to ${status} evaluator`);
        }
    };

   


    const handleInputChange = (index: number, field: keyof EvaluatorList, value: string) => {
        const updated = [...editableList];
        updated[index][field] = value;
        setEditableList(updated);
    };

    const handleSave = async (index: number) => {
        const evaluator = editableList[index];
        try {
            await axios.put(`${API_BASE}/api/admin/evaluators/${evaluator._id}`, evaluator, {
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
            await axios.put(`${API_BASE}/api/admin/evaluators/${evaluator._id}`, { ...evaluator, status: 'rejected' }, {
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
                                    <th className="px-4 py-2 text-left">Expertise</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluators.map((e) => (
                                  
                                    <tr key={e._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{e.username}</td>
                                        <td className="px-4 py-2">{e.email}</td>
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
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-left">Email</th>
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
