// // // // // import React, { useEffect, useState } from 'react';
// // // // // import axios from 'axios';

// // // // // const DailyProjectTracking = () => {
// // // // //   const [data, setData] = useState({});
// // // // //   const [today, setToday] = useState({});

// // // // //   useEffect(() => {
// // // // //     axios.get('http://localhost:11129/api/admin/getDailyTracking')
// // // // //       .then(res => {
// // // // //         setData(res.data.allDates);
// // // // //         setToday(res.data.today);
// // // // //       });
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="p-4">
// // // // //       <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
// // // // //       <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded">
// // // // //         <p>📅 Date: {new Date().toLocaleDateString()}</p>
// // // // //         <p>📤 Total Submitted: {today.total}</p>
// // // // //         <p>✅ Accepted: {today.accepted}</p>
// // // // //         <p>❌ Rejected: {today.rejected}</p>
// // // // //         <p>⏳ Pending: {today.pending}</p>
// // // // //       </div>

// // // // //       <h2 className="text-xl font-bold mt-8 mb-4">Daily Submission History</h2>
// // // // //       <table className="w-full table-auto border">
// // // // //         <thead>
// // // // //           <tr className="bg-gray-200">
// // // // //             <th className="border p-2">Date</th>
// // // // //             <th className="border p-2">Total</th>
// // // // //             <th className="border p-2">Accepted</th>
// // // // //             <th className="border p-2">Rejected</th>
// // // // //             <th className="border p-2">Pending</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {Object.entries(data).map(([date, stats]) => (
// // // // //             <tr key={date}>
// // // // //               <td className="border p-2">{date}</td>
// // // // //               <td className="border p-2">{stats.total}</td>
// // // // //               <td className="border p-2">{stats.accepted}</td>
// // // // //               <td className="border p-2">{stats.rejected}</td>
// // // // //               <td className="border p-2">{stats.pending}</td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DailyProjectTracking;


// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';
// // // // import DatePicker from 'react-datepicker';
// // // // import 'react-datepicker/dist/react-datepicker.css';

// // // // const DailyProjectTracking = () => {
// // // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // // //   const [dailyData, setDailyData] = useState(null);

// // // //   const fetchByDate = (date) => {
// // // //     const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
// // // //     axios.get(`http://localhost:11129/api/admin/getTrackingByDate?date=${formattedDate}`)
// // // //       .then(res => {
// // // //         setDailyData(res.data);
// // // //       })
// // // //       .catch(err => {
// // // //         console.error(err);
// // // //       });
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchByDate(selectedDate);
// // // //   }, [selectedDate]);

// // // //   return (
// // // //     <div className="p-4">
// // // //       <h2 className="text-xl font-bold mb-4">📅 Daily Project Tracking</h2>

// // // //       <DatePicker
// // // //         selected={selectedDate}
// // // //         onChange={(date) => setSelectedDate(date)}
// // // //         dateFormat="yyyy-MM-dd"
// // // //         className="border p-2 rounded"
// // // //       />

// // // //       {dailyData ? (
// // // //         <div className="mt-6 bg-gray-100 p-4 rounded">
// // // //           <h3 className="font-bold mb-2">Summary for {selectedDate.toDateString()}</h3>
// // // //           <p>📤 Total Submitted: {dailyData.total}</p>
// // // //           <p>✅ Accepted: {dailyData.accepted}</p>
// // // //           <p>❌ Rejected: {dailyData.rejected}</p>
// // // //           <p>⏳ Pending: {dailyData.pending}</p>
// // // //         </div>
// // // //       ) : (
// // // //         <p className="mt-4">Loading...</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DailyProjectTracking;


// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import DatePicker from 'react-datepicker';
// // // import 'react-datepicker/dist/react-datepicker.css';

// // // const DailyProjectTracking = () => {
// // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // //   const [dailyData, setDailyData] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   const fetchByDate = async (date) => {
// // //     const formattedDate = date.toISOString().split('T')[0];
// // //     setLoading(true);

// // //     try {
// // //       const res = await axios.get(`http://localhost:11129/api/admin/getTrackingByDate?date=${formattedDate}`);
// // //       setDailyData(res.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setDailyData(null);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchByDate(selectedDate);
// // //   }, [selectedDate]);

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
// // //       <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
// // //         <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
// // //           📅 Daily Project Tracking
// // //         </h2>

// // //         <div className="flex justify-center mb-6">
// // //           <DatePicker
// // //             selected={selectedDate}
// // //             onChange={(date) => setSelectedDate(date)}
// // //             dateFormat="yyyy-MM-dd"
// // //             className="border p-2 rounded w-full max-w-xs text-center"
// // //           />
// // //         </div>

// // //         {loading ? (
// // //           <div className="text-center text-gray-500">🔄 Fetching data...</div>
// // //         ) : dailyData ? (
// // //           <div className="bg-gray-50 p-4 rounded shadow-inner">
// // //             <h3 className="text-lg font-semibold mb-3 text-center">
// // //               Summary for <span className="text-blue-600">{selectedDate.toDateString()}</span>
// // //             </h3>
// // //             <div className="space-y-2 text-center">
// // //               <p className="text-lg font-medium">📤 Total Submitted: <span className="font-bold text-black">{dailyData.total}</span></p>
// // //               <p className="text-green-600">✅ Accepted: {dailyData.accepted}</p>
// // //               <p className="text-red-500">❌ Rejected: {dailyData.rejected}</p>
// // //               <p className="text-yellow-500">⏳ Pending: {dailyData.pending}</p>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <p className="text-center text-gray-500">📭 No data found for selected date</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DailyProjectTracking;


// // import React, { useState } from 'react';
// // import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// // import format from 'date-fns/format';
// // import parse from 'date-fns/parse';
// // import startOfWeek from 'date-fns/startOfWeek';
// // import getDay from 'date-fns/getDay';
// // import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import axios from 'axios';
// // import { enUS } from 'date-fns/locale';

// // const locales = {
// //   'en-US': enUS,
// // };

// // const localizer = dateFnsLocalizer({
// //   format,
// //   parse,
// //   startOfWeek,
// //   getDay,
// //   locales,
// // });

// // const DailyProjectTracking = () => {
// //   const [selectedDate, setSelectedDate] = useState(null);
// //   const [dailyData, setDailyData] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const fetchByDate = async (date) => {
// //     const formattedDate = date.toISOString().split('T')[0];
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`http://localhost:11129/api/admin/getTrackingByDate?date=${formattedDate}`);
// //       setDailyData(res.data);
// //     } catch (err) {
// //       console.error(err);
// //       setDailyData(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSelectDate = (slotInfo) => {
// //     const clickedDate = new Date(slotInfo.start);
// //     setSelectedDate(clickedDate);
// //     fetchByDate(clickedDate);
// //   };

// //   return (
// //     <div className="min-h-screen p-6 bg-gray-100">
// //       <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">📅 Daily Project Tracking</h2>

// //       <div className="bg-white shadow-md rounded-xl p-4 max-w-6xl mx-auto">
// //         <Calendar
// //           localizer={localizer}
// //           startAccessor="start"
// //           endAccessor="end"
// //           selectable
// //           onSelectSlot={handleSelectDate}
// //           style={{ height: 600 }}
// //         />
// //       </div>

// //       {selectedDate && (
// //         <div className="mt-6 max-w-xl mx-auto bg-white p-4 rounded shadow">
// //           <h3 className="text-lg font-bold text-center mb-3">
// //             Summary for <span className="text-blue-600">{selectedDate.toDateString()}</span>
// //           </h3>
// //           {loading ? (
// //             <p className="text-center text-gray-500">Loading...</p>
// //           ) : dailyData ? (
// //             <div className="space-y-2 text-center">
// //               <p className="text-lg">📤 Total Submitted: <span className="font-bold">{dailyData.total}</span></p>
// //               <p className="text-green-600">✅ Accepted: {dailyData.accepted}</p>
// //               <p className="text-red-500">❌ Rejected: {dailyData.rejected}</p>
// //               <p className="text-yellow-600">⏳ Pending: {dailyData.pending}</p>
// //             </div>
// //           ) : (
// //             <p className="text-center text-gray-500">No data available for this date.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DailyProjectTracking;




// import React, { useState, useRef } from 'react';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import { enUS } from 'date-fns/locale';
// import axios from 'axios';

// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const locales = {
//   'en-US': enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const DailyProjectTracking = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [dailyData, setDailyData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
//   const [showPopup, setShowPopup] = useState(false);

//   const calendarRef = useRef(null);

//   const fetchByDate = async (date) => {
//     const formattedDate = date.toISOString().split('T')[0];
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:11129/api/admin/getTrackingByDate?date=${formattedDate}`);
//       setDailyData(res.data);
//     } catch (err) {
//       console.error(err);
//       setDailyData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectDate = (slotInfo) => {
//     const clickedDate = new Date(slotInfo.start);
//     setSelectedDate(clickedDate);
//     fetchByDate(clickedDate);

//     const calendarRect = calendarRef.current.getBoundingClientRect();
//     const x = window.innerWidth / 2 - 110; // center popup horizontally
//     const y = calendarRect.top + 100;      // approximate vertical position

//     setPopupPos({ top: y, left: x });
//     setShowPopup(true);

//     setTimeout(() => {
//       setShowPopup(false);
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 relative">
//       {/* <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
//         📅 Daily Project Tracking
//       </h2> */}

//       <div
//         className="bg-white shadow-md rounded-xl p-4 max-w-6xl mx-auto"
//         ref={calendarRef}
//       >
//         <Calendar
//           localizer={localizer}
//           startAccessor="start"
//           endAccessor="end"
//           selectable
//           onSelectSlot={handleSelectDate}
//           style={{ height: 600 }}
//         />
//       </div>

//       {/* {showPopup && selectedDate && dailyData && (
//         <div
//           className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50"
//           style={{
//             top: popupPos.top,
//             left: popupPos.left,
//             minWidth: '240px',
//           }}
//         >
//           <h3 className="font-bold mb-2 text-indigo-600 text-center">
//             {selectedDate.toDateString()}
//           </h3>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : (
//             <div className="space-y-1 text-sm text-center">
//               <p>
//                 📤 <strong>Total:</strong> {dailyData.total}
//               </p>
//               <p className="text-green-600">✅ Accepted: {dailyData.accepted}</p>
//               <p className="text-red-500">❌ Rejected: {dailyData.rejected}</p>
//               <p className="text-yellow-500">⏳ Pending: {dailyData.pending}</p>
//             </div>
//           )}
//         </div>
//       )} */}
//       {showPopup && selectedDate && dailyData && (
//   <div
//     className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50"
//     style={{ top: popupPos.top, left: popupPos.left, minWidth: '250px' }}
//   >
//     <h3 className="font-bold mb-2 text-indigo-600 text-center">
//       {selectedDate.toDateString()}
//     </h3>
//     <div className="space-y-1 text-sm text-center">
//       <p>📤 <strong>Total Submitted:</strong> {dailyData.total}</p>
//       <hr className="my-2" />
//       <h4 className="font-semibold mb-1">District-wise</h4>
//       {Object.entries(dailyData.districts).map(([district, count]) => (
//         <p key={district}>{district}: <span className="font-bold">{count}</span></p>
//       ))}
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default DailyProjectTracking;



import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";

const localizer = momentLocalizer(moment);

const DISTRICTS = [
    "VIRUDHUNAGAR",
    "MADURAI",
    "TIRUNELVELI",
    "THOOTHUKKUDI",
    "KANNIYAKUMARI",
    "TENKASI",
    "DINDIGUL"
];



const DailyProjectTracking = () => {
    const [projects, setProjects] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [popupData, setPopupData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:11129/api/admin/getTrackingByDate"); // adjust URL
            setProjects(res.data);
        } catch (err) {
            console.error("Failed to fetch projects", err);
        }
    };

    const events = projects.map((project) => ({
        title: project.title || "Project",
        start: new Date(project.createdAt),
        end: new Date(project.createdAt),
        allDay: true,
        resource: project,
    }));


    const handleSelectDate = async (slotInfo) => {
        const clickedDate = moment(slotInfo.start).format("YYYY-MM-DD");
        try {
            const res = await axios.get(
                `http://localhost:11129/api/admin/getTrackingByDate?date=${clickedDate}`
            );

            const districtsData = res.data.districts;

            // initialize with 0 for all districts
            const districtCounts = {};
            DISTRICTS.forEach((d) => {
                districtCounts[d] = 0;
            });

            // 🔥 Fix spelling/case/trim issues
            districtsData.forEach((d) => {
                const districtName = d._id?.trim().toUpperCase();
                if (DISTRICTS.includes(districtName)) {
                    districtCounts[districtName] = d.total;
                }
            });


            setSelectedDate(clickedDate);
            setPopupData({
                total: districtsData.reduce((sum, d) => sum + d.total, 0),
                districtCounts,
            });
            setIsModalOpen(true); // 🔥 open modal

        } catch (error) {
            console.error("Error fetching data by date", error);
        }
    };




    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Daily Project Tracking</h1>
            <div style={{ height: "80vh" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    views={["month"]}
                    onSelectSlot={handleSelectDate}
                    selectable={true}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "80%" }}
                />
            </div>

            {isModalOpen && popupData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] relative">
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-bold mb-3 text-center">
                            📅 {moment(selectedDate).format("DD/MM/YYYY")}
                        </h2>
                        <p className="text-center mb-2">
                            Total Projects Submitted: <b>{popupData.total}</b>
                        </p>

                        <ul className="mt-2 space-y-1">
                            {DISTRICTS.map((district) => (
                                <li key={district} className="flex justify-between">
                                    <span>{district}:</span>
                                    <span>{popupData.districtCounts[district]} projects</span>
                                </li>
                            ))}
                        </ul>

                        {/* WhatsApp Share */}
                        <div className="mt-4 flex justify-center">
                            <a
                                href={`https://wa.me/7448389404?text=${encodeURIComponent(
                                    `📅 ${moment(selectedDate).format("DD/MM/YYYY")}\nTotal Projects: ${popupData.total
                                    }\n\n${DISTRICTS.map(
                                        (d) => `${d}: ${popupData.districtCounts[d]}`
                                    ).join("\n")}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                    alt="WhatsApp"
                                    className="w-5 h-5"
                                />
                                Share on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DailyProjectTracking;
