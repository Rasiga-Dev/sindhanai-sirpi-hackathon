// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const SchoolManagement = () => {
//     const navigate = useNavigate();

//     const [schools, setSchools] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Optional filters
//     const [districtFilter, setDistrictFilter] = useState("");
//     const [statusFilter, setStatusFilter] = useState("");
//     const [search, setSearch] = useState("");



//     const fetchSchools = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             let url = `http://localhost:11129/api/admin/schools?`;

//             const params = [];
//             if (districtFilter) params.push(`district=${districtFilter}`);
//             if (statusFilter) params.push(`status=${statusFilter}`);
//             if (search) params.push(`search=${search}`);

//             url += params.join("&");


//             const res = await axios.get(url);
//             setSchools(res.data);
//         } catch (err) {
//             setError("Failed to fetch schools");
//         }

//         setLoading(false);
//     };


//     useEffect(() => {
//         fetchSchools();
//     }, [districtFilter, statusFilter, search]);

//     return (
//         <div className="p-6 bg-white rounded shadow">
//             <h2 className="text-2xl font-semibold mb-4">School Management</h2>

//             {/* Filters */}
//             <div className="flex gap-4 mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search by School Name"
//                     className="border px-3 py-2 rounded flex-1"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <select
//                     className="border px-3 py-2 rounded"
//                     value={districtFilter}
//                     onChange={(e) => setDistrictFilter(e.target.value)}
//                 >
//                     <option value="">All Districts</option>
//                     <option value="TENKASI">Tenkasi</option>
//                     <option value="TIRUNELVELI">Tirunelveli</option>
//                     <option value="THOOTHUKUDI">Thoothukudi</option>
//                     <option value="KANYAKUMARI">Kanyakumari</option>
//                     <option value="MADURAI">Madurai</option>
//                     <option value="VIRUTHUNAGAR">Viruthunagar</option>
//                 </select>
//             </div>

//             {/* Loading and error */}
//             {loading && <p>Loading schools...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full table-auto border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border border-gray-300 px-4 py-2">UDISE Code</th>
//                             <th className="border border-gray-300 px-4 py-2">School Name</th>
//                             <th className="border border-gray-300 px-4 py-2">District</th>

//                             <th className="border border-gray-300 px-4 py-2">Address</th>
//                             <th className="border border-gray-300 px-4 py-2">Office_Mobile</th>
//                             <th className="border border-gray-300 px-4 py-2">Email_ID</th>
//                             <th className="border border-gray-300 px-4 py-2">Status</th>
//                             <th className="border border-gray-300 px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {schools.length === 0 && !loading && (
//                             <tr>
//                                 <td colSpan={8} className="text-center p-4">
//                                     No schools found.
//                                 </td>
//                             </tr>
//                         )}

//                         {schools.map((school) => (
//                             <tr key={school._id} className="hover:bg-gray-100">
//                                 <td className="border border-gray-300 px-4 py-2">{school.UDISE_Code}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{school.School_Name}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{school.District}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{school.Address}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{school.Office_Mobile}</td>

//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {school.Email_ID ? school.Email_ID : "N/A"}
//                                 </td>




//                                 <td className="border border-gray-300 px-4 py-2 capitalize">{school.status ? 'Registered' : 'Not Registered'}</td>
//                                 <td className="border border-gray-300 px-4 py-2 space-x-2">
//                                     <button
//                                         onClick={() => alert(`Approve school: ${school.School_Name}`)}
//                                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                                     >
//                                         ✅ 
//                                     </button>
//                                     <button
//                                         onClick={() => alert(`Reject school: ${school.School_Name}`)}
//                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                     >
//                                         ❌ 
//                                     </button>
//                                     <button
//                                         onClick={() => navigate(`/school-details/${school._id}`)}
//                                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                     >
//                                         🔍 
//                                     </button>
//                                 </td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default SchoolManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SchoolManagement = () => {
    const navigate = useNavigate();

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [districtFilter, setDistrictFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");

    const fetchSchools = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `http://localhost:11129/api/admin/schools?`;
            const params = [];
            if (districtFilter) params.push(`district=${districtFilter}`);
            if (statusFilter) params.push(`status=${statusFilter}`);
            if (search) params.push(`search=${search}`);
            url += params.join("&");
            const res = await axios.get(url);
            setSchools(res.data);
        } catch (err) {
            setError("Failed to fetch schools");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSchools();
    }, [districtFilter, statusFilter, search]);

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">School Management</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by School Name"
                    className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                >
                    <option value="">All Districts</option>
                    <option value="TENKASI">Tenkasi</option>
                    <option value="TIRUNELVELI">Tirunelveli</option>
                    <option value="THOOTHUKKUDI">Thoothukudi</option>
                    <option value="KANNIYAKUMARI">Kanyakumari</option>
                    <option value="MADURAI">Madurai</option>
                    <option value="VIRUDHUNAGAR">Viruthunagar</option>
                </select>
            </div>

            {/* Loading/Error */}
            {loading && <p className="text-blue-500 font-medium mb-4">Loading schools...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 rounded">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            {[
                                "UDISE Code",
                                "School Name",
                                "District",
                                "Address",
                                "Office Mobile",
                                "Email ID",
                                "Status",
                                "Actions",
                            ].map((header) => (
                                <th key={header} className="border px-4 py-3 text-left text-sm font-semibold">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {schools.length === 0 && !loading && (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500">
                                    No schools found.
                                </td>
                            </tr>
                        )}

                        {schools.map((school) => (
                            <tr key={school._id} className="hover:bg-gray-50 text-sm">
                                <td className="border px-4 py-3">{school.UDISE_Code}</td>
                                <td className="border px-4 py-3">{school.School_Name}</td>
                                <td className="border px-4 py-3">{school.District}</td>
                                <td className="border px-4 py-3">{school.Address}</td>
                                <td className="border px-4 py-3">{school.Office_Mobile}</td>
                                <td className="border px-4 py-3">{school.Email_ID || "N/A"}</td>
                                <td className="border px-4 py-3 capitalize">
                                    {school.status ? "Registered" : "Not Registered"}
                                </td>
                                <td className="border px-4 py-3 flex gap-2">
                                    <button
                                        onClick={() => navigate(`/school-details/${school._id}`)}
                                        title="View Details"
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        🔍
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SchoolManagement;
