


import React from 'react';
import { Map, Lightbulb, Users, Code, Trophy } from "lucide-react";

export function RoadMap() {
  return (
    <div className="space-y-16">
      {/* Marquee Section */}
      <div className="bg-red-800 text-white py-3 overflow-hidden relative z-10 rounded-lg shadow">
        <div className="animate-marquee whitespace-nowrap text-center">
          <span className="mx-6">🚀 Unleash Innovation at EDII Hackathon 2025!</span>
          <span className="mx-6">💡 Solve Real-World Problems</span>
          <span className="mx-6">🏆 Win Prizes & Get Recognized</span>
          <span className="mx-6">📅 Registration Ends Soon!</span>
          <span className="mx-6">🚀 Collaborate. Innovate. Dominate!</span>
        </div>
      </div>




      {/* Our Journey Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center font-sans max-w-7xl mx-auto px-4 py-10">
        {/* Left Column: 6 columns */}
        <div className="md:col-span-6 space-y-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Map className="w-16 h-16 text-red-800 animate-bounce" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-800 tracking-tight">
            Our Journey
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Here’s how we guide participants from initial registration to delivering real-world solutions in just a few key steps.
          </p>
        </div>

        {/* Right Column: 6 columns */}
        <div className="md:col-span-6">
          <img
            src="roadmap.png"
            alt="EDII Hackathon Roadmap"
            className="w-full h-full object-contain"
          />
        </div>
      </div>




      {/* Milestones Section */}
      {/* <div className="bg-red-50 py-12 px-6 md:px-12 rounded-xl shadow-md space-y-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-red-800">Milestones to Achieve</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">📌 1000+ Participants</h3>
            <p className="text-gray-600 text-sm">From across the nation, ready to innovate and collaborate.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">🚀 100+ Projects</h3>
            <p className="text-gray-600 text-sm">Ground-breaking solutions solving real-world challenges.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">🏆 Top 10 Finalists</h3>
            <p className="text-gray-600 text-sm">Recognized for innovation, execution, and impact.</p>
          </div>
        </div>
      </div> */}

      {/* Final Image Banner */}
      <div className="w-full">
        <img
          src="roadmap1.png"
          alt="EDII Hackathon Roadmap"
          className="w-full h-auto max-h-[1000px] object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
