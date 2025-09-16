

// // import React from 'react';
// // import { useKeenSlider } from 'keen-slider/react';
// // import "keen-slider/keen-slider.min.css";

// // export function Speakers() {
// //   const [currentSlide, setCurrentSlide] = React.useState(0);
// //   const [loaded, setLoaded] = React.useState(false);

// //   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
// //     initial: 0,
// //     slideChanged(slider) {
// //       setCurrentSlide(slider.track.details.rel);
// //     },
// //     created() {
// //       setLoaded(true);
// //     },
// //     loop: true,
// //     mode: "snap",
// //     slides: {
// //       perView: () => {
// //         if (window.innerWidth < 640) return 1;
// //         if (window.innerWidth < 1024) return 2;
// //         return 3;
// //       },
// //       spacing: 16,
// //     },
// //   });

// //   const speakers = [
// //     { name: "Dr. Ramesh Kumar", title: "AI & ML Expert, Google", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" },
// //     { name: "Ms. Priya Sharma", title: "Cybersecurity Analyst, Microsoft", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" },
// //     { name: "Mr. Aditya Verma", title: "CTO, StartupX", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" },
// //     { name: "Dr. Anjali Mehta", title: "Professor, IIT Madras", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" },
// //     { name: "Mr. Karthik Rajan", title: "Lead Developer, TCS", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" },
// //   ];

// //   return (
// //     <div className="space-y-24">
// //       {/* Hero Section */}
// //       <section className="bg-red-700 text-white py-24 px-6 text-center">
// //         <h1 className="text-5xl font-bold mb-4 leading-tight">Meet Our Visionary Speakers</h1>
// //         <p className="text-xl mb-6 max-w-2xl mx-auto">Industry leaders sharing insights that shape the future.</p>
// //         <button className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">View Full Schedule</button>
// //       </section>

// //       {/* Why Attend */}
// //       <section className="max-w-6xl mx-auto px-4 text-center">
// //         <h2 className="text-4xl font-bold mb-8">Why Attend?</h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {[
// //             { icon: "🔍", label: "Discover Trends" },
// //             { icon: "💡", label: "Real-World Insights" },
// //             { icon: "🤝", label: "Connect with Experts" },
// //             { icon: "🎯", label: "Upgrade Skills" },
// //           ].map(({ icon, label }, i) => (
// //             <div key={i} className="p-6 bg-white shadow-md hover:shadow-xl rounded-xl transition">
// //               <div className="text-4xl">{icon}</div>
// //               <h3 className="mt-4 text-lg font-semibold">{label}</h3>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Speakers Carousel */}
// //       <section className="px-4 max-w-6xl mx-auto">
// //         <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Featured Speakers</h2>
// //         <div ref={sliderRef} className="keen-slider">
// //           {speakers.map((speaker, idx) => (
// //             <div key={idx} className="keen-slider__slide">
// //               <div className="bg-white rounded-xl shadow-md p-10 text-center hover:shadow-2xl transition">
// //                 <img 
// //                   src={speaker.image} 
// //                   alt={speaker.name}
// //                   className="w-50 h-50 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-700"
// //                 />
// //                 <h3 className="text-xl font-semibold">{speaker.name}</h3>
// //                 <p className="text-gray-600">{speaker.title}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //         {loaded && instanceRef.current && (
// //           <div className="flex justify-center gap-2 mt-6">
// //             {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
// //               <button
// //                 key={idx}
// //                 onClick={() => instanceRef.current?.moveToIdx(idx)}
// //                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
// //                   currentSlide === idx ? "bg-red-700 scale-110" : "bg-gray-300"
// //                 }`}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* Video Highlights */}
// //       <section className="bg-gray-100 py-20 px-4 text-center">
// //         <h2 className="text-4xl font-bold mb-10">Speaker Highlights</h2>
// //         <div className="max-w-4xl mx-auto aspect-video">
// //           <iframe
// //             src="https://www.youtube.com/embed/dQw4w9WgXcQ"
// //             title="Speaker Teaser"
// //             allowFullScreen
// //             className="rounded-xl shadow-lg w-full h-full"
// //           ></iframe>
// //         </div>
// //       </section>

// //       {/* Schedule Snapshot */}
// //       <section className="max-w-4xl mx-auto px-4 text-center">
// //         <h2 className="text-4xl font-bold mb-8">Event Schedule</h2>
// //         <ul className="space-y-4 text-lg text-gray-700">
// //           <li>🕙 <strong>10:00 AM</strong> - Dr. Ramesh Kumar: <em>Future of AI</em></li>
// //           <li>🕦 <strong>11:30 AM</strong> - Ms. Priya Sharma: <em>Cybersecurity 2030</em></li>
// //           <li>🕑 <strong>2:00 PM</strong> - Mr. Aditya Verma: <em>Startup Innovation</em></li>
// //         </ul>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="bg-white py-20 px-4 text-center">
// //         <h2 className="text-4xl font-bold mb-12">What Attendees Say</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
// //           {[
// //             { feedback: "Amazing experience! Gained so much insight from industry pros.", name: "Ananya", role: "Student" },
// //             { feedback: "Loved the speaker lineup. The AR/VR sessions were mind-blowing!", name: "Rahul", role: "Developer" },
// //             { feedback: "One of the most inspiring tech events I've attended!", name: "Sneha", role: "Educator" },
// //           ].map((item, i) => (
// //             <div key={i} className="bg-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
// //               <p className="italic">"{item.feedback}"</p>
// //               <p className="mt-3 font-semibold">— {item.name}, {item.role}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Call to Action */}
// //       <section className="text-center py-20 bg-indigo-50 px-4">
// //         <h2 className="text-4xl font-bold mb-4">Ready to Join Us?</h2>
// //         <p className="mb-8 text-gray-700 text-lg max-w-xl mx-auto">Be part of a tech event that inspires change and innovation.</p>
// //         <button className="bg-indigo-600 text-white px-10 py-4 rounded-full text-lg hover:bg-indigo-700 transition">Register Now</button>
// //       </section>
// //     </div>
// //   );
// // }




// import React from 'react';


// export function Speakers() {





//   return (
//     <div className="space-y-24">
//       {/* Hero Section */}
//       <section className="bg-red-700 text-white py-24 px-6 text-center">
//         <h1 className="text-5xl font-bold mb-4 leading-tight">WINNERS</h1>
//         <p className="text-xl mb-6 max-w-2xl mx-auto">Students sharing insights that shape the future.</p>
//         <button className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">View Full Schedule</button>
//       </section>


//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export function Speakers() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.get("http://localhost:11129/api/schools/winners");
        setWinners(res.data);
      } catch (err) {
        console.error("Error fetching winners:", err);
      }
    };
    fetchWinners();
  }, []);

  // Rank images mapping
  const rankImages = {
    1: "first.jpg",     // 🥇 First prize image
    2: "second.jpg",    // 🥈 Second prize image
    3: "third.jpg",     // 🥉 Third prize image
    default: "consolation.jpg", // Consolation prize image
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-red-800 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          🏆 Hackathon Winners & Innovative Projects
        </h1>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Celebrating brilliant ideas, innovative projects, and the brightest minds from our schools.
        </p>
        <button className="bg-white text-red-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          View All Winners
        </button>
      </section>

      <div className="text-center my-10 m-0">
        <div className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white animate-blink p-5">
            WINNERS 🏆
          </h1>
        </div>

        {/* Blinking Winners Text */}
        <style jsx>{`
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    .animate-blink {
      animation: blink 1s infinite;
    }
  `}</style>
      </div>

      <div className="space-y-12 mt-5">
        {winners.map((winner, index) => {
          const isOdd = index % 2 === 0;
          const rankImage = rankImages[winner.rank] || rankImages.default;

          return (
            <div key={index} className="space-y-4">
              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left column */}
                <div className="flex justify-center items-center">
                  {isOdd ? (
                    // Odd row: rank image on left
                    <div className="w-100 h-100 flex items-center justify-center">
                      <img
                        src={rankImage}
                        alt={`Rank ${winner.rank}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    // Even row: content on left
                    <div className="space-y-3">
                      <h3 className="text-2xl font-extrabold text-gray-800">
                        {winner.projectTitle}
                      </h3>
                      <p className="text-gray-600">{winner.projectDescription}</p>
                      <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded-full">
                        🏫 {winner.schoolName}
                      </div>
                      <p className="text-gray-500 mt-1">📍 {winner.District}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {winner.students.map((stu, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                          >
                            {stu.name} ({stu.standard})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right column */}
                <div className="flex justify-center items-center">
                  {isOdd ? (
                    // Odd row: content on right
                    <div className="space-y-3">
                      <h3 className="text-2xl font-extrabold text-gray-800">
                        {winner.projectTitle}
                      </h3>
                      <p className="text-gray-600">{winner.projectDescription}</p>
                      <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded-full">
                        🏫 {winner.schoolName}
                      </div>
                      <p className="text-gray-500 mt-1">📍 {winner.District}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {winner.students.map((stu, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                          >
                            {stu.name} ({stu.standard})
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Even row: rank image on right
                    <div className="w-40 h-40 flex items-center justify-center">
                      <img
                        src={rankImage}
                        alt={`Rank ${winner.rank}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Horizontal line between rows */}
              {index !== winners.length - 1 && <hr className="border-gray-300 mt-6" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}








