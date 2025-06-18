


import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Trophy,
  Send,
  CheckCircle,
  Star,
  FileText,
  Zap,
  Layers,
  TrendingUp,
  Upload,
  MonitorCheck,
  Medal,
} from 'lucide-react';

const prizes = [
  {
    icon: <Trophy className="w-12 h-12 text-white mb-4" />,
    title: 'First Prize',
    reward: '1 L + Foreign Trip Opportunity',
    emoji: '🥇',
  },
  {
    icon: <Star className="w-12 h-12 text-white mb-4" />,
    title: 'Second Prize',
    reward: '50 K + Awards + Certificate',
    emoji: '🥈',
  },
  {
    icon: <Medal className="w-12 h-12 text-white mb-4" />,
    title: 'Third Prize',
    reward: '25 K + Awards + Certificate',
    emoji: '🥉',
  },
];

export function Guidelines() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 space-y-20">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-800 tracking-wide">
          Hackathon Guidelines
        </h2>

        {/* Guidelines Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto px-4">
          {/* Left Column: Image */}
          <div className="w-full h-full">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.PJx3jWuuHLU5lvjQYRRHAAHaEJ&pid=Api&P=0&h=220"
              alt="Guideline Illustration"
              className="w-full h-full object-fit rounded-xl"
            />
          </div>


          {/* Right Column: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 justify-center">
            {[
              {
                title: 'Team Formation',
                description: 'Form a team of 3–5 members from your school',
                icon: Users,
              },
              {
                title: 'Project Requirements',
                description: 'Focus on innovative solutions for real-world problems',
                icon: Trophy,
              },
              {
                title: 'Submission Process',
                description: 'Submit your project with documentation and presentation',
                icon: Send,
              },
            ].map((guideline, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <guideline.icon className="w-12 h-12 text-red-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                  {guideline.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {guideline.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="relative bg-gradient-to-tr from-red-100 via-white to-red-50 rounded-2xl p-10 shadow-xl border border-red-200">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-extrabold text-red-800 mb-3 tracking-tight">
              Eligibility Criteria
            </h3>
            <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto">
              To participate in the EDII Hackathon, please ensure your team meets the following requirements:
            </p>
          </div>

          <ul className="space-y-5 max-w-3xl mx-auto">
            {[
              'Participants must be enrolled in a recognized educational institution.',
              'Each team must have 2–5 members.',
              'All teams must submit their project within the specified deadlines.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-800 text-lg leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Judging + Submission Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-4">
          {/* Judging Criteria */}
          <div className="rounded-2xl p-8 bg-gradient-to-br from-red-50 to-white border border-red-200 shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl font-extrabold text-red-800 mb-4 text-center">
              Judging Criteria
            </h3>
            <p className="text-gray-700 text-base md:text-lg mb-6 text-center">
              Projects will be evaluated on the following parameters:
            </p>
            <ul className="space-y-4">
              {[
                { icon: Star, text: 'Innovation & Creativity' },
                { icon: Zap, text: 'Relevance to the Problem Statement' },
                { icon: Layers, text: 'Technical Implementation' },
                { icon: TrendingUp, text: 'Impact and Scalability' },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-red-600 mt-1" />
                  <span className="text-gray-800 text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Guidelines */}
          <div className="rounded-2xl p-8 bg-gradient-to-br from-red-50 to-white border border-red-200 shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl font-extrabold text-red-800 mb-4 text-center">
              Submission Guidelines
            </h3>
            <p className="text-gray-700 text-base md:text-lg mb-6 text-center">
              All participants are required to submit the following:
            </p>
            <ul className="space-y-4">
              {[
                { icon: Upload, text: 'Final Project Submission' },
                { icon: FileText, text: 'Complete Documentation' },
                { icon: MonitorCheck, text: 'Project Presentation (demo or explanation)' },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-red-600 mt-1" />
                  <span className="text-gray-800 text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prize Section */}
        <div className="py-12 px-4 md:px-8 rounded-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-red-800 mb-10">
            🏆 Prize Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {prizes.map((prize, index) => (
              <motion.div
                key={index}
                className="bg-red-800 rounded-2xl text-white text-center p-6 md:p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500"
                whileHover={{ rotateY: 10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="text-5xl animate-bounce mb-4">{prize.emoji}</div>
                {prize.icon}
                <h3 className="text-xl font-bold mb-2">{prize.title}</h3>
                <p className="text-base font-medium">{prize.reward}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
