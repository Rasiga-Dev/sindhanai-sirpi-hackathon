


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const DPMPannel = () => {
// //   const [evaluators, setEvaluators] = useState([]);
// //   const district = localStorage.getItem('dpmDistrict');

// //   useEffect(() => {
// //     if (district) {
// //       axios
// //         .get(`http://localhost:11129/api/dpm/by-district/${district}`)
// //         .then((res) => {
// //           setEvaluators(res.data);
// //         });
// //     }
// //   }, [district]);

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Evaluators from {district}</h2>

// //       <div className="overflow-x-auto">
// //         <table className="min-w-full border border-gray-300">
// //           <thead>
// //             <tr className="bg-gray-100">
// //               <th className="border px-4 py-2">Username</th>
// //               <th className="border px-4 py-2">Email</th>
// //               <th className="border px-4 py-2">Phone</th>
// //               <th className="border px-4 py-2">Expertise</th>
// //               <th className="border px-4 py-2">Status</th>
// //               <th className="border px-4 py-2">Accepted</th>
// //               <th className="border px-4 py-2">Pending</th>
// //               <th className="border px-4 py-2">Rejected</th>
// //               <th className="border px-4 py-2">Total (L1)</th>
// //               <th className="border px-4 py-2">Total (L2)</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {evaluators.map((ev, idx) => (
// //               <tr key={idx}>
// //                 <td className="border px-4 py-2">{ev.username}</td>
// //                 <td className="border px-4 py-2">{ev.email}</td>
// //                 <td className="border px-4 py-2">{ev.phone}</td>
// //                 <td className="border px-4 py-2">{ev.expertise?.join(', ')}</td>
// //                 <td className="border px-4 py-2">{ev.status}</td>
// //                 <td className="border px-4 py-2">{ev.summary?.accepted || 0}</td>
// //                 <td className="border px-4 py-2">{ev.summary?.pending || 0}</td>
// //                 <td className="border px-4 py-2">{ev.summary?.rejected || 0}</td>
// //                 <td className="border px-4 py-2">{ev.summary?.total || 0}</td>
// //                 <td className="border px-4 py-2">{ev.level2Summary?.total || 0}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DPMPannel;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DPMPannel = () => {
//   const [evaluators, setEvaluators] = useState([]);
//   const [activeTab, setActiveTab] = useState('school'); // school | evaluator
//   const district = localStorage.getItem('dpmDistrict');

//   useEffect(() => {
//     if (district && activeTab === 'evaluator') {
//       axios
//         .get(`http://localhost:11129/api/dpm/by-district/${district}`)
//         .then((res) => {
//           setEvaluators(res.data);
//         });
//     }
//   }, [district, activeTab]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <h2 className="text-2xl font-bold mb-6">District Dashboard - {district}</h2>

//       {/* Menu Tabs */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab('school')}
//           className={`px-4 py-2 rounded ${
//             activeTab === 'school' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
//           }`}
//         >
//           School
//         </button>
//         <button
//           onClick={() => setActiveTab('evaluator')}
//           className={`px-4 py-2 rounded ${
//             activeTab === 'evaluator' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
//           }`}
//         >
//           Evaluator
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'school' && (
//         <div className="bg-white p-6 rounded shadow">
//           <h3 className="text-xl font-semibold mb-4">School Details</h3>
//           <p className="text-gray-600">[ Add school-specific content here ]</p>
//         </div>
//       )}

//       {activeTab === 'evaluator' && (
//         <div className="bg-white p-6 rounded shadow overflow-x-auto">
//           <h3 className="text-xl font-semibold mb-4">Evaluators from {district}</h3>
//           <table className="min-w-full border border-gray-300 text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="border px-4 py-2">Username</th>
//                 <th className="border px-4 py-2">Email</th>
//                 <th className="border px-4 py-2">Phone</th>
//                 <th className="border px-4 py-2">Expertise</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2">Accepted</th>
//                 <th className="border px-4 py-2">Pending</th>
//                 <th className="border px-4 py-2">Rejected</th>
//                 <th className="border px-4 py-2">Total (L1)</th>
//                 <th className="border px-4 py-2">Total (L2)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {evaluators.map((ev, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{ev.username}</td>
//                   <td className="border px-4 py-2">{ev.email}</td>
//                   <td className="border px-4 py-2">{ev.phone}</td>
//                   <td className="border px-4 py-2">{ev.expertise?.join(', ')}</td>
//                   <td className="border px-4 py-2">{ev.status}</td>
//                   <td className="border px-4 py-2">{ev.summary?.accepted || 0}</td>
//                   <td className="border px-4 py-2">{ev.summary?.pending || 0}</td>
//                   <td className="border px-4 py-2">{ev.summary?.rejected || 0}</td>
//                   <td className="border px-4 py-2">{ev.summary?.total || 0}</td>
//                   <td className="border px-4 py-2">{ev.level2Summary?.total || 0}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DPMPannel;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const DPMPannel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('school');
  const [evaluators, setEvaluators] = useState([]);
  const district = localStorage.getItem('dpmDistrict');
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (district && activeTab === 'school') {
      axios.get(`http://localhost:11129/api/dpm/schools/by-district/${district}`)
        .then((res) => {
          setSchools(res.data);
        })
        .catch((err) => {
          console.error('Error fetching school data:', err);
        });
    }


    if (district && activeTab === 'evaluator') {
      axios.get(`http://localhost:11129/api/dpm/by-district/${district}`)
        .then((res) => setEvaluators(res.data));
    }
  }, [district, activeTab]);


  const totalProjectsInDistrict = schools.reduce(
    (total, school) => total + school.totalProjects, 0
  );

const handleLogout = () => {
    navigate('/dpm-login');
  };
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-lg">
        <div className="p-6 text-2xl font-bold text-blue-700">DPM Panel</div>
        <nav className="flex flex-col space-y-2 p-4">
          <button
            onClick={() => setActiveTab('school')}
            className={`text-left px-4 py-2 rounded-md transition ${activeTab === 'school'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-blue-100 text-gray-700'
              }`}
          >
            Schools
          </button>
          <button
            onClick={() => setActiveTab('evaluator')}
            className={`text-left px-4 py-2 rounded-md transition ${activeTab === 'evaluator'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-blue-100 text-gray-700'
              }`}
          >
            Evaluators
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">District : {district}</h2>
           <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
        </div>







        {/* School Search + Total Projects */}
        {activeTab === 'school' && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              {/* Search Input with Icon */}
              <div className="relative w-full md:w-1/2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search School Name..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Total Projects Box */}
              <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-xl shadow-md text-lg font-semibold">
                Total Projects: {totalProjectsInDistrict}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="max-h-[400px] overflow-y-auto border rounded-lg">
                <table className="min-w-full text-sm border-collapse">
                  <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                    <tr>
                      <th className="border px-4 py-2 sticky top-0 bg-gray-100">S.No</th>
                      <th className="border px-4 py-2 sticky top-0 bg-gray-100">School Name</th>
                      <th className="border px-4 py-2 sticky top-0 bg-gray-100">Total Projects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools
                      .filter((school) =>
                        school.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((school, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{idx + 1}</td>
                          <td className="border px-4 py-2">{school.name}</td>
                          <td className="border px-4 py-2">{school.totalProjects}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}


        {activeTab === 'evaluator' && (
          <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
            {/* <h3 className="text-xl font-semibold mb-4">Evaluators from {district}</h3> */}
            <table className="min-w-full text-sm border border-gray-300">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Expertise</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Accepted</th>
                  <th className="border px-4 py-2">Pending</th>
                  <th className="border px-4 py-2">Rejected</th>
                  <th className="border px-4 py-2">Total (L1)</th>
                  <th className="border px-4 py-2">Total (L2)</th>
                </tr>
              </thead>
              <tbody>
                {evaluators.map((ev, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{ev.username}</td>
                    <td className="border px-4 py-2">{ev.email}</td>
                    <td className="border px-4 py-2">{ev.phone}</td>
                    <td className="border px-4 py-2">{ev.expertise?.join(', ')}</td>
                    <td className="border px-4 py-2">{ev.status}</td>
                    <td className="border px-4 py-2">{ev.summary?.accepted || 0}</td>
                    <td className="border px-4 py-2">{ev.summary?.pending || 0}</td>
                    <td className="border px-4 py-2">{ev.summary?.rejected || 0}</td>
                    <td className="border px-4 py-2">{ev.summary?.total || 0}</td>
                    <td className="border px-4 py-2">{ev.level2Summary?.total || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DPMPannel;
