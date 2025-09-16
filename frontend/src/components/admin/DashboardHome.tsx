
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
// import { Line } from "react-chartjs-2";

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

//   // Summary cards
//   const statItems = [
//     { title: "Total Schools", value: stats.totalSchools, color: "bg-blue-500" },
//     { title: "Total Guide Teachers", value: stats.totalGuideTeachers, color: "bg-green-500" },
//     { title: "Total Projects Submitted", value: stats.totalProjects, color: "bg-purple-500" },
//     { title: "Total Evaluators", value: stats.totalEvaluators, color: "bg-yellow-400" },
//     { title: "Projects Evaluated (Stage-wise)", value: stats.totalEvaluatedProjects, color: "bg-pink-500" },
//     { title: "Finalist Teams Count", value: stats.finalistTeams, color: "bg-red-500" },
//   ];

//   // Bar chart data - correct keys from your data (_id and submissionsCount)
//   const barData = {
//     labels: stats.submissionsPerDistrict?.map(item => item._id) || [],
//     datasets: [
//       {
//         label: 'Submissions',
//         data: stats.submissionsPerDistrict?.map(item => item.submissionsCount) || [],
//         backgroundColor: 'rgba(59, 130, 246, 0.6)',
//         borderColor: 'rgba(59, 130, 246, 1)',
//         borderWidth: 1,
//       }
//     ]
//   };



//   // Pie chart - show all statuses from projectStatusCounts dynamically
//   const statusLabels = Object.keys(stats.projectStatusCounts);
//   const statusValues = Object.values(stats.projectStatusCounts);
//   const pieColors = [
//     '#facc15', // yellow
//     '#34d399', // green
//     '#f87171', // red
//     '#60a5fa', // blue
//     '#a78bfa', // purple
//     '#fb7185', // pink
//   ];

//   const pieData = {
//     labels: statusLabels,
//     datasets: [
//       {
//         data: statusValues,
//         backgroundColor: pieColors.slice(0, statusLabels.length),
//         borderWidth: 1
//       }
//     ]
//   };



//   return (
//     <div className="space-y-10 p-5">
//       {/* Stats cards */}
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

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="bg-white rounded shadow p-5">
//           <h2 className="text-lg font-semibold mb-4">Submissions per District</h2>
//           <Bar
//             data={barData}
//             options={{
//               responsive: true,
//               plugins: { legend: { display: false } },
//               scales: {
//                 y: { beginAtZero: true }
//               }
//             }}
//           />
//         </div>

//         <div className="bg-white rounded shadow p-5">
//           <h2 className="text-lg font-semibold mb-4">Project Status Distribution</h2>
//           <Pie
//             data={pieData}
//             options={{
//               responsive: true,
//               plugins: { legend: { position: 'bottom' } }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;



import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentsPerDistrict, setPaymentsPerDistrict] = useState([]);

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
        setPaymentsPerDistrict(data.paymentsPerDistrict || []);
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
    { title: "Registered School", value: stats.registeredSchools, color: "bg-pink-500" },
    { title: "Total Guide Teachers", value: stats.totalGuideTeachers, color: "bg-green-500" },
    { title: "Total Projects Submitted", value: stats.totalProjects, color: "bg-purple-500" },
    { title: "Total Evaluators", value: stats.totalEvaluators, color: "bg-yellow-400" },
    // { title: "Projects Evaluated (Stage-wise)", value: stats.totalEvaluatedProjects, color: "bg-pink-500" },
    { title: "Finalist Teams", value: stats.finalistTeams, color: "bg-red-500" },
  ];

  // Submissions per district
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

  // Project status distribution
  const statusLabels = Object.keys(stats.projectStatusCounts);
  const statusValues = Object.values(stats.projectStatusCounts);
  const pieColors = ['#facc15', '#34d399', '#f87171', '#60a5fa', '#a78bfa', '#fb7185'];
  const pieData = {
    labels: statusLabels,
    datasets: [{ data: statusValues, backgroundColor: pieColors.slice(0, statusLabels.length), borderWidth: 1 }]
  };

  // Submissions over time (Line chart)
  const lineData = {
    labels: stats.submissionsOverTime?.map(item => item._id) || [],
    datasets: [
      {
        label: "Submissions per Day",
        data: stats.submissionsOverTime?.map(item => item.count) || [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true
      }
    ]
  };

  // Evaluator-wise project counts
  const evaluatorData = {
    labels: stats.evaluatorCounts?.map(item => item._id) || [],
    datasets: [
      {
        label: "Projects Evaluated",
        data: stats.evaluatorCounts?.map(item => item.count) || [],
        backgroundColor: "rgba(99, 102, 241, 0.6)"
      }
    ]
  };

  // Final stage distribution
  const doughnutData = {
    labels: stats.finalStageCounts?.map(item => item._id) || [],
    datasets: [
      {
        data: stats.finalStageCounts?.map(item => item.count) || [],
        backgroundColor: ["#34d399", "#facc15", "#f87171", "#60a5fa"]
      }
    ]
  };

  // Payments per district (Bar Chart)
  const paymentBarData = {
    labels: paymentsPerDistrict.map((item) => item._id),
    datasets: [
      {
        label: "Total Payments",
        data: paymentsPerDistrict.map((item) => item.totalPayments),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // overall total
  const overallTotal = paymentsPerDistrict.reduce(
    (sum, item) => sum + item.totalPayments,
    0
  );



  return (
    <div className="space-y-10 p-5">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statItems.map(({ title, value, color }) => (
          <div key={title} className={`rounded-lg shadow-lg p-5 text-white ${color} flex flex-col items-center`}>
            <p className="text-center text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar */}
        <div className="bg-white rounded shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Submissions per District</h2>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
        </div>

        {/* Pie */}
        <div className="bg-white rounded shadow p-5 w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">Project Status Distribution</h2>
          <div style={{ width: '500px', height: '300px' }}>
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }}
            />
          </div>
        </div>


        {/* Line */}
        <div className="bg-white rounded shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Submissions Over Time</h2>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>

        {/* Evaluator Bar */}
        <div className="bg-white rounded shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Evaluator-wise Projects</h2>
          <Bar data={evaluatorData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
        </div>

        {/* Doughnut */}
        {/* <div className="bg-white rounded shadow p-5 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Final Stage Distribution</h2>
          <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div> */}



      </div>

       <div className="bg-white rounded shadow p-5 w-full flex">
      {/* Chart */}
      <div style={{ width: "70%", height: "300px" }}>
        <h2 className="text-lg font-semibold mb-4">District-wise Payments</h2>
        <Bar
          data={paymentBarData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return "₹" + value.toLocaleString();
                  },
                },
              },
            },
          }}
        />
      </div>

      {/* Total highlight */}
      <div className="flex items-center justify-center w-1/3">
        <div className="bg-green-100 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-xl font-bold text-green-700">Total Amount</h3>
          <p className="text-4xl font-extrabold text-green-800 mt-2">
            ₹{overallTotal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>



    </div>
  );
};

export default DashboardHome;
