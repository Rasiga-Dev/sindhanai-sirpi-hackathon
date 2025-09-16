
import React, { useEffect, useState } from "react";
import axios from "axios";
import BMCLayout from "../BMCLayout";
import { API_BASE } from "../../config/api";

const ProjectDetailModal = ({ project, onClose }) => {
    const [details, setDetails] = useState(null);
    const [showBMC, setShowBMC] = useState(false);

    const toggleBMC = () => setShowBMC((prev) => !prev);

    useEffect(() => {
        axios
            .get(`${API_BASE}/api/admin/project/${project.schoolId}/${project.index}`)
            .then((res) => {
               
                setDetails(res.data);
            })
            .catch((err) => console.error("Error fetching project details:", err));
    }, [project]);

    const handleDownload = () => {
        const { base64, filename, contentType } = details.documents;

        if (!base64) {
            alert("No file to download");
            return;
        }

        // Create an anchor and trigger click
        const a = document.createElement("a");
        a.href = base64;
        a.download = filename || "document";
        a.click();
    };


    if (!details) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 pt-10 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h3 className="text-3xl font-extrabold text-gray-900">Project Details</h3>
                    <button
                        onClick={onClose}
                        className="text-red-600 hover:text-red-800 font-semibold text-lg"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {/* Project Overview */}
                <section className="mb-8">
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">📌 Overview</h4>
                    <p className="text-lg font-semibold text-gray-800">{details.projectDetails.title}</p>
                    <p className="mt-2 text-gray-700">{details.projectDetails.description}</p>
                    <p className="mt-1 text-sm text-gray-500">Team Size: {details.projectDetails.teamSize}</p>
                    <p className="mt-1 text-sm text-gray-500">
                        School: <span className="font-medium">{details.schoolName}</span>, {details.district}
                    </p>
                </section>

                {/* Guide Teachers */}
                <section className="mb-8">
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">👨‍🏫 Guide Teachers</h4>
                    <p className="text-gray-800">
                        {details.guideTeachers?.length
                            ? details.guideTeachers.map((gt) => `${gt.name} (${gt.email})`).join(", ")
                            : "No guide teachers listed"}
                    </p>
                </section>

                {/* Students */}
                <section className="mb-8">
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">👩‍🎓 Students</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 p-2 border rounded-md bg-indigo-50">
                        {details.studentDetails.map((stu, i) => (
                            <li key={i}>
                                <p>
                                    <span className="font-semibold">{stu.name}</span> - {stu.standard} Std, {stu.gender},{" "}
                                    {stu.community}, {stu.district} <br />
                                    Contact: <a href={`tel:${stu.contactNumber}`} className="text-indigo-600 hover:underline">{stu.contactNumber}</a>
                                </p>
                                <p className="text-sm text-gray-600 mt-0.5">
                                    DOB: {stu.dateOfBirth} | Father: {stu.fatherName} | Email:{" "}
                                    <a href={`mailto:${stu.email}`} className="text-indigo-600 hover:underline">
                                        {stu.email}
                                    </a>
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* BMC Details */}
                <section className="mb-8">
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3 flex items-center justify-between">
                        <span>🧩 BMC Details</span>
                        <button
                            onClick={toggleBMC}
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            aria-expanded={showBMC}
                        >
                            {showBMC ? "Hide BMC" : "View BMC"}
                        </button>
                    </h4>
                    {showBMC && (
                        <div className="mt-4 border border-indigo-300 rounded-lg p-6 bg-white shadow-sm">
                            <BMCLayout bmcDetails={details.bmcDetails} />
                        </div>
                    )}
                </section>

                {/* Documents */}
                <section className="mb-8">
                    <h4 className="mt-4 font-semibold">📎 Document</h4>
                    {details.documents?.filename && (
                        <button onClick={handleDownload} className="text-blue-600 underline ml-2">
                            Download {details.documents.filename}
                        </button>
                    )}

                </section>

                {/* Evaluation History */}
                <section className="mb-8">
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">📊 Evaluation History</h4>
                    {details.evaluationScores?.length ? (
                        <ul className="list-disc list-inside space-y-2 text-gray-700 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 p-2 border rounded-md bg-indigo-50">
                            {details.evaluationScores.map((score, i) => (
                                <li key={i}>
                                    <p>
                                        <strong>{score.evaluatorName}</strong> – Score: {score.score} | Status:{" "}
                                        <span className={`font-semibold ${score.status === "Approved" ? "text-green-600" : score.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                                            {score.status}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600">Date: {new Date(score.evaluatedAt).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 italic">No evaluations found</p>
                    )}
                </section>

                {/* Evaluation Summary */}
                <section className="mb-2">
                    <h4 className="text-xl font-semibold text-indigo-700 mb-3">🎯 Evaluation Summary</h4>
                    <div className="space-y-1 text-gray-800">
                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                className={`font-semibold ${details.evaluationStatus === "Approved"
                                    ? "text-green-600"
                                    : details.evaluationStatus === "Rejected"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                    }`}
                            >
                                {details.evaluationStatus}
                            </span>
                        </p>
                        <p>
                            <strong>Reason:</strong> {details.statusReason || "N/A"}
                        </p>
                        <p>
                            <strong>Evaluated By:</strong>{" "}
                            {details.evaluatedBy
                                ? `${details.evaluatedBy.name} (${details.evaluatedBy.email})`
                                : "N/A"}
                        </p>
                        <p>
                            <strong>Evaluated At:</strong>{" "}
                            {details.evaluatedAt ? new Date(details.evaluatedAt).toLocaleString() : "N/A"}
                        </p>
                        <p>
                            <strong>Submitted At:</strong>{" "}
                            {details.submittedAt ? new Date(details.submittedAt).toLocaleString() : "N/A"}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectDetailModal;
