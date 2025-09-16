import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import { API_BASE } from "../../config/api";

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
            const res = await axios.get(`${API_BASE}/api/admin/getTrackingByDate`); // adjust URL
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
                `${API_BASE}/api/admin/getTrackingByDate?date=${clickedDate}`
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
