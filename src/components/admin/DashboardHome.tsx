// // // import React, { useEffect, useState } from 'react';

// // // type StatsType = {
// // //   totalSchools: number;
// // //   totalGuideTeachers: number;
// // //   totalProjects: number;
// // //   totalEvaluators: number;
// // //   totalEvaluatedProjects: number;
// // //   finalistTeams: number;
// // // };

// // // const DashboardHome: React.FC = () => {
// // //   const [stats, setStats] = useState<StatsType | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetch('http://localhost:11129/api/admin/dashboard-stats')
// // //       .then((res) => res.json())
// // //       .then((data) => {
// // //         setStats(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         console.error(err);
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   if (loading) return <p>Loading...</p>;
// // //   if (!stats) return <p>No data available</p>;

// // //   const statItems = [
// // //     { title: "Total Schools", value: stats.totalSchools, color: "bg-blue-500" },
// // //     { title: "Guide Teachers", value: stats.totalGuideTeachers, color: "bg-green-500" },
// // //     { title: "Projects Submitted", value: stats.totalProjects, color: "bg-purple-500" },
// // //     { title: "Evaluators", value: stats.totalEvaluators, color: "bg-yellow-400" },
// // //     { title: "Projects Evaluated", value: stats.totalEvaluatedProjects, color: "bg-pink-500" },
// // //     { title: "Finalist Teams", value: stats.finalistTeams, color: "bg-red-500" },
// // //   ];

// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
// // //       {statItems.map(({ title, value, color }) => (
// // //         <div
// // //           key={title}
// // //           className={`rounded-lg shadow-lg p-5 text-white ${color} flex flex-col items-center`}
// // //         >
// // //           <p className="text-lg font-semibold">{title}</p>
// // //           <p className="text-4xl font-bold mt-2">{value}</p>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default DashboardHome;


// // // DashboardHome.jsx
// // import React, { useEffect, useState } from 'react';
// // import { Bar, Pie } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   ArcElement
// // } from 'chart.js';

// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// // const DashboardHome = () => {
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetch('http://localhost:11129/api/admin/dashboard-stats')
// //       .then(res => res.json())
// //       .then(data => {
// //         console.log('Fetched stats:', data); 
// //         setStats(data);
// //         setLoading(false);
// //       })
// //       .catch(err => {
// //         console.error('Error fetching stats:', err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) return <p>Loading dashboard...</p>;
// //   if (!stats) return <p>No stats available.</p>;

// //   const statItems = [
// //     { title: "Total Schools Registered", value: stats.totalSchools, color: "bg-blue-500" },
// //     { title: "Total Guide Teachers", value: stats.totalGuideTeachers, color: "bg-green-500" },
// //     { title: "Total Projects Submitted", value: stats.totalProjects, color: "bg-purple-500" },
// //     { title: "Total Evaluators", value: stats.totalEvaluators, color: "bg-yellow-400" },
// //     { title: "Projects Evaluated (Stage-wise)", value: stats.totalEvaluatedProjects, color: "bg-pink-500" },
// //     { title: "Finalist Teams Count", value: stats.finalistTeams, color: "bg-red-500" },
// //   ];

// //   const barData = {
// //     labels: stats.submissionsPerDistrict?.map(item => item.district) || [],
// //     datasets: [
// //       {
// //         label: 'Submissions',
// //         data: stats.submissionsPerDistrict?.map(item => item.count) || [],
// //         backgroundColor: 'rgba(59, 130, 246, 0.6)',
// //         borderColor: 'rgba(59, 130, 246, 1)',
// //         borderWidth: 1,
// //       }
// //     ]
// //   };

// //   const pieData = {
// //     labels: ['Pending', 'Evaluated', 'Rejected'],
// //     datasets: [
// //       {
// //         data: [
// //           stats.projectStatusCounts?.pending || 0,
// //           stats.projectStatusCounts?.evaluated || 0,
// //           stats.projectStatusCounts?.rejected || 0,
// //         ],
// //         backgroundColor: ['#facc15', '#34d399', '#f87171'],
// //         borderWidth: 1
// //       }
// //     ]
// //   };

// //   return (
// //     <div className="space-y-10">
// //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
// //         {statItems.map(({ title, value, color }) => (
// //           <div
// //             key={title}
// //             className={`rounded-lg shadow-lg p-5 text-white ${color} flex flex-col items-center`}
// //           >
// //             <p className="text-center text-sm font-medium">{title}</p>
// //             <p className="text-3xl font-bold mt-2">{value}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
// //         <div className="bg-white rounded shadow p-5">
// //           <h2 className="text-lg font-semibold mb-4">Submissions per District</h2>
// //           <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
// //         </div>

// //         <div className="bg-white rounded shadow p-5">
// //           <h2 className="text-lg font-semibold mb-4">Project Status Distribution</h2>
// //           <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardHome;

// // DashboardHome.jsx
// import React, { useEffect, useState } from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const DashboardHome = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetch('http://localhost:11129/api/admin/dashboard-stats')
//       .then(async (res) => {
//         if (!res.ok) {
//           // Try to parse error message from response
//           const errorData = await res.json();
//           throw new Error(errorData.error || 'Failed to fetch stats');
//         }
//         return res.json();
//       })
//       .then(data => {
//         setStats(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching stats:', err);
//         setStats(null);
//         setLoading(false);
//         setError(err.message);
//       });
//   }, []);

//   if (loading) return <p>Loading dashboard...</p>;
//   if (error) return <p className="text-red-600">Error: {error}</p>;
//   if (!stats) return <p>No stats available.</p>;

//   const statItems = [
//     { title: "Total Schools Registered", value: stats.totalSchools, color: "bg-blue-500" },
//     { title: "Total Guide Teachers", value: stats.totalGuideTeachers, color: "bg-green-500" },
//     { title: "Total Projects Submitted", value: stats.totalProjects, color: "bg-purple-500" },
//     { title: "Total Evaluators", value: stats.totalEvaluators, color: "bg-yellow-400" },
//     { title: "Projects Evaluated (Stage-wise)", value: stats.totalEvaluatedProjects, color: "bg-pink-500" },
//     { title: "Finalist Teams Count", value: stats.finalistTeams, color: "bg-red-500" },
//   ];

//   const barData = {
//     labels: stats.submissionsPerDistrict?.map(item => item.district) || [],
//     datasets: [
//       {
//         label: 'Submissions',
//         data: stats.submissionsPerDistrict?.map(item => item.count) || [],
//         backgroundColor: 'rgba(59, 130, 246, 0.6)',
//         borderColor: 'rgba(59, 130, 246, 1)',
//         borderWidth: 1,
//       }
//     ]
//   };

//   const pieData = {
//     labels: ['Pending', 'Evaluated', 'Rejected'],
//     datasets: [
//       {
//         data: [
//           stats.projectStatusCounts?.pending || 0,
//           stats.projectStatusCounts?.evaluated || 0,
//           stats.projectStatusCounts?.rejected || 0,
//         ],
//         backgroundColor: ['#facc15', '#34d399', '#f87171'],
//         borderWidth: 1
//       }
//     ]
//   };

//   return (
//     <div className="space-y-10">
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
//         {statItems.map(({ title, value, color }) => (
//           <div
//             key={title}
//             className={`rounded-lg shadow-lg p-5 text-white ${color} flex flex-col items-center`}
//           >
//             <p className="text-center text-sm font-medium">{title}</p>
//             <p className="text-3xl font-bold mt-2">{value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="bg-white rounded shadow p-5">
//           <h2 className="text-lg font-semibold mb-4">Submissions per District</h2>
//           <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
//         </div>

//         <div className="bg-white rounded shadow p-5">
//           <h2 className="text-lg font-semibold mb-4">Project Status Distribution</h2>
//           <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:11129/api/admin/dashboard-stats')
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch stats');
        }
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setStats(null);
        setLoading(false);
        setError(err.message);
      });
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!stats) return <p>No stats available.</p>;

  // Summary cards
  const statItems = [
    { title: "Total Schools", value: stats.totalSchools, color: "bg-blue-500" },
    { title: "Total Guide Teachers", value: stats.totalGuideTeachers, color: "bg-green-500" },
    { title: "Total Projects Submitted", value: stats.totalProjects, color: "bg-purple-500" },
    { title: "Total Evaluators", value: stats.totalEvaluators, color: "bg-yellow-400" },
    { title: "Projects Evaluated (Stage-wise)", value: stats.totalEvaluatedProjects, color: "bg-pink-500" },
    { title: "Finalist Teams Count", value: stats.finalistTeams, color: "bg-red-500" },
  ];

  // Bar chart data - correct keys from your data (_id and submissionsCount)
  const barData = {
    labels: stats.submissionsPerDistrict?.map(item => item._id) || [],
    datasets: [
      {
        label: 'Submissions',
        data: stats.submissionsPerDistrict?.map(item => item.submissionsCount) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Pie chart - show all statuses from projectStatusCounts dynamically
  const statusLabels = Object.keys(stats.projectStatusCounts);
  const statusValues = Object.values(stats.projectStatusCounts);
  const pieColors = [
    '#facc15', // yellow
    '#34d399', // green
    '#f87171', // red
    '#60a5fa', // blue
    '#a78bfa', // purple
    '#fb7185', // pink
  ];

  const pieData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusValues,
        backgroundColor: pieColors.slice(0, statusLabels.length),
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="space-y-10 p-5">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statItems.map(({ title, value, color }) => (
          <div
            key={title}
            className={`rounded-lg shadow-lg p-5 text-white ${color} flex flex-col items-center`}
          >
            <p className="text-center text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Submissions per District</h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        <div className="bg-white rounded shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Project Status Distribution</h2>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
