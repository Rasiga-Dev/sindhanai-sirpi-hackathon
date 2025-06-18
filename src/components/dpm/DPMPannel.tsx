// // DPMPannel.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DPMPannel = () => {
//     const [evaluators, setEvaluators] = useState([]);
//     const district = localStorage.getItem('dpmDistrict');

//     useEffect(() => {
//         const district = localStorage.getItem("dpmDistrict");

//         if (district) {
//             axios
//                 .get(`http://localhost:11129/api/dpm/by-district/${district}`)
//                 .then((res) => {
//                     setEvaluators(res.data);
//                     console.log(res.data,"evaluators");
//                 });
//         }
//     }, []);


//     return (
//         <div>
//             <h2>Evaluators from {district}</h2>
//             <ul>
//                 {evaluators.map((ev, idx) => (
//                     <li key={idx}>{ev.username} - {ev.email}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DPMPannel;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DPMPannel = () => {
  const [evaluators, setEvaluators] = useState([]);
  const district = localStorage.getItem('dpmDistrict');

  useEffect(() => {
    if (district) {
      axios
        .get(`http://localhost:11129/api/dpm/by-district/${district}`)
        .then((res) => {
          setEvaluators(res.data);
        });
    }
  }, [district]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Evaluators from {district}</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
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
              <tr key={idx}>
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
    </div>
  );
};

export default DPMPannel;
