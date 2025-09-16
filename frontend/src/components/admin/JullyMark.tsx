

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CheckCircle } from 'lucide-react';
import { API_BASE } from '../../config/api';

const JullyMark = () => {
    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [marks, setMarks] = useState({});
    const [showListMode, setShowListMode] = useState(false);
    const [savedMarks, setSavedMarks] = useState({});
    const [pdfURL, setPdfURL] = useState('');
    const [pdfFileName, setPdfFileName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        // 1st API Call: jully-marks
        axios.get(`${API_BASE}/api/admin/jully-marks`)
            .then((res) => {
                const fetched = res.data;
                const saved = {};
                const unlockedProjects = fetched.filter(item => !(item.jullyMarks?.locked));

                fetched.forEach((item) => {
                    if (item.jullyMarks) {
                        saved[item.submissionId] = {
                            jully1: item.jullyMarks.jully1,
                            jully2: item.jullyMarks.jully2,
                            jully3: item.jullyMarks.jully3,
                            bannel: item.jullyMarks.bannel,
                            average: item.jullyMarks.average,
                            locked: item.jullyMarks.locked,
                        };
                    }
                });

                setProjects(unlockedProjects);
                setAllProjects(unlockedProjects);
                setSavedMarks(saved);
            })
            .catch((err) => console.error('Error fetching projects:', err));

        // 2nd API Call: latest-pdf
        axios
            .get(`${API_BASE}/api/jully/latest`)
            .then((res) => {
                if (res.data) {
                    setPdfURL(`${API_BASE}/api/jully/pdf/${res.data.filename}`);
                    setPdfName(res.data.originalName);
                    setIsUploaded(true);
                }
            })
            .catch(() => {
                console.log('No PDF uploaded yet.');
            });
    }, []);


    const handleJullyMarkList = () => setShowListMode(true);

    const handleMarkChange = (submissionId, field, value) => {
        setMarks((prev) => ({
            ...prev,
            [submissionId]: {
                ...prev[submissionId],
                [field]: value,
            },
        }));
    };

    const calculateAverage = (markObj) => {
        const { jully1 = '', jully2 = '', jully3 = '', bannel = '' } = markObj || {};
        const nums = [jully1, jully2, jully3].map(n => Number(n));
        const validMarks = nums.filter(n => !isNaN(n));
        const jullyAvg = validMarks.length ? (validMarks.reduce((a, b) => a + b, 0) / validMarks.length) : 0;
        const finalScore = jullyAvg + (isNaN(Number(bannel)) ? 0 : Number(bannel));
        return finalScore.toFixed(2);
    };


    const handleExportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ['S.No', 'Project Name', 'Jully Mark 1', 'Jully Mark 2', 'Jully Mark 3'];
        const tableRows = [];

        projects.forEach((item, idx) => {
            const markObj = {
                ...savedMarks[item.submissionId],
                ...marks[item.submissionId],
            };
            tableRows.push([
                idx + 1,
                item.projectName || '',
                markObj.jully1 || '',
                markObj.jully2 || '',
                markObj.jully3 || '',
            ]);
        });

        doc.setFontSize(18);
        doc.text('Sindhanai Sirpi Hackathon - Jury Mark Sheet', 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            didDrawPage: (data) => {
                const pageHeight = doc.internal.pageSize.height;

                // Signature Section
                doc.setFontSize(12);
                doc.text("Signature:", 14, pageHeight - 40);
                doc.text("Jury 1 Evaluator", 14, pageHeight - 30);
                doc.text("Jury 2 Evaluator", 80, pageHeight - 30);
                doc.text("Jury 3 Evaluator", 150, pageHeight - 30);

                doc.line(14, pageHeight - 25, 60, pageHeight - 25);   // Signature Line 1
                doc.line(80, pageHeight - 25, 125, pageHeight - 25);  // Signature Line 2
                doc.line(150, pageHeight - 25, 195, pageHeight - 25); // Signature Line 3
            }
        });

        doc.save('Jury_Marks_Report.pdf');
    };


    const handleSave = async (item) => {
        const markObj = marks[item.submissionId];
        if (!markObj) return alert('Please enter marks');

        const payload = {
            submissionId: item.submissionId,
            jully1: Number(markObj.jully1),
            jully2: Number(markObj.jully2),
            jully3: Number(markObj.jully3),
            bannel: Number(markObj.bannel),
            average: Number(calculateAverage(markObj)),
        };

        try {
            await axios.post(`${API_BASE}/api/admin/jully-marks/save`, payload);

            setProjects((prev) => prev.filter(p => p.submissionId !== item.submissionId));
            setAllProjects((prev) => prev.filter(p => p.submissionId !== item.submissionId));

            setMarks((prev) => {
                const updated = { ...prev };
                delete updated[item.submissionId];
                return updated;
            });

            alert('Marks saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Save failed.');
        }
    };

    const filteredProjects = projects.filter((p) =>
        p.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post(`${API_BASE}/api/jully/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadedFilename = response.data.data.filename;
            const previewURL = `${API_BASE}/api/jully/pdf/${uploadedFilename}`;
            setPdfURL(previewURL); // ✅ Set the preview URL

            alert('Upload successful!');
        } catch (err) {
            console.error(err);
            alert('Upload failed.');
        }
    };




    return (
        <div className="p-6 space-y-6">
            {!showListMode && (
                <>
                    <div className="grid md:grid-cols-2 gap-4 items-center">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">Jury Marks Entry</h2>
                            <input
                                type="text"
                                placeholder="Search by Project Name..."
                                className="px-4 py-2 border rounded w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap md:justify-end gap-2 items-center">
                            <button
                                onClick={handleJullyMarkList}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Upload Jury Mark Document
                            </button>
                            <button
                                onClick={handleExportPDF}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Export PDF
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto border rounded shadow">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                                <tr>
                                    <th className="border px-4 py-2">S.No</th>
                                    <th className="border px-4 py-2">School Name</th>
                                    <th className="border px-4 py-2">Project Name</th>
                                    <th className="border px-4 py-2">Jury Mark 1</th>
                                    <th className="border px-4 py-2">Jury Mark 2</th>
                                    <th className="border px-4 py-2">Jury Mark 3</th>
                                    <th className="border px-4 py-2">Bannel</th>
                                    <th className="border px-4 py-2">Average</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((item, idx) => {
                                    const markObj = {
                                        ...savedMarks[item.submissionId],
                                        ...marks[item.submissionId],
                                    };

                                    return (
                                        <tr key={item.submissionId} className="hover:bg-gray-50">
                                            <td className="border px-2 py-2">{idx + 1}</td>
                                            <td className="border px-2 py-2">{item.schoolName}</td>
                                            <td className="border px-2 py-2">{item.projectName}</td>
                                            {['jully1', 'jully2', 'jully3', 'bannel'].map((field) => (
                                                <td key={field} className="border px-2 py-1">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={10}
                                                        className="w-16 border rounded px-1"
                                                        value={marks[item.submissionId]?.[field] ?? savedMarks[item.submissionId]?.[field] ?? ''}
                                                        onChange={(e) =>
                                                            handleMarkChange(
                                                                item.submissionId,
                                                                field,
                                                                Math.min(10, Math.max(0, Number(e.target.value)))
                                                            )
                                                        }
                                                    />
                                                </td>
                                            ))}
                                            <td className="border px-4 py-2 text-center font-semibold text-blue-700">
                                                {calculateAverage(markObj)}
                                            </td>
                                            <td className="border px-2 py-2">
                                                <button
                                                    onClick={() => handleSave(item)}
                                                    disabled={
                                                        !markObj.jully1 || markObj.jully1 <= 0 ||
                                                        !markObj.jully2 || markObj.jully2 <= 0 ||
                                                        !markObj.jully3 || markObj.jully3 <= 0
                                                    }
                                                    className={`flex items-center font-medium ${(!markObj.jully1 || markObj.jully1 <= 0 ||
                                                            !markObj.jully2 || markObj.jully2 <= 0 ||
                                                            !markObj.jully3 || markObj.jully3 <= 0)
                                                            ? "text-gray-400 cursor-not-allowed"
                                                            : "text-green-600 hover:text-green-800"
                                                        }`}
                                                >
                                                    <CheckCircle className="w-5 h-5 mr-1" />
                                                    Save
                                                </button>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {showListMode && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Jury Mark Document</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Upload Document (PDF only):</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => handleFileUpload(e)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        {pdfURL && (
                            <iframe
                                src={pdfURL}
                                width="100%"
                                height="350px"
                                title="Jully PDF Preview"
                                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
                            ></iframe>
                        )}
                    </div>


                    <div className="text-center">
                        <button
                            onClick={() => setShowListMode(false)}
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JullyMark;
