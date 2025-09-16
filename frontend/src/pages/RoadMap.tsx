


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
