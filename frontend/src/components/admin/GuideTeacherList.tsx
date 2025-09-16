
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";

const districts = [
  "Tenkasi",
  "Tirunelveli",
  "Thoothukudi",
  "Madurai",
  "Kanniyakumari",
  "Viruthunagar",
  "Dindigul",
];

const GuideTeacherList = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("Tenkasi");

  useEffect(() => {
    const fetchGuideTeachers = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/admin/guide-teachers`
        );
        setTeachers(res.data);
        console.log(res.data, " Guide Teachers Data");
        setLoading(false);
      } catch (err) {
        setError("Failed to load guide teachers.");
        setLoading(false);
      }
    };
    fetchGuideTeachers();
  }, []);

  // ✅ filter teachers based on selected district
  const filteredTeachers = teachers.filter(
    (t) => t.district?.toLowerCase() === activeDistrict.toLowerCase()
  );


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-4">🧑‍🏫 Guide Teachers List</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {districts.map((district) => (
          <button
            key={district}
            onClick={() => setActiveDistrict(district)}
            className={`px-4 py-2 rounded-full border ${activeDistrict === district
                ? "bg-red-800 text-white border-red-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {district}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
        {loading ? (
          <div className="p-8 text-center text-gray-600">
            Loading guide teachers...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">{error}</div>
        ) : filteredTeachers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">School</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Project Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTeachers.map((teacher, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-gray-800">{teacher.name}</td>
                    <td className="px-4 py-3 text-gray-700">{teacher.school}</td>
                    <td className="px-4 py-3 text-gray-600">{teacher.email}</td>
                    <td className="px-4 py-3 text-gray-600">{teacher.phone}</td>
                    <td className="px-4 py-3 text-center font-medium text-blue-700">
                      {teacher.projectCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        ) : (
          <div className="p-8 text-center text-gray-500">
            No guide teachers found in {activeDistrict}.
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideTeacherList;
