

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  AlarmClock,
  Lightbulb,
  HelpCircle,
  Timer,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle,
  Layers,
} from 'lucide-react';

export function Schedule() {
  const tips = [
  { title: "Stage 1 - Inaugural Function", desc: "Launching the Hackathon – August 16, 2025" },
  { title: "Stage 2 - Circular to Schools", desc: "Circular released through CEO Office – First Week of September, 2025" },
  { title: "Stage 3 - Guide Teacher Registration", desc: "Registration for guide teachers starts – October, 2025" },
  { title: "Stage 4 - Orientation to DPM / Master Trainers", desc: "Orientation for DPM and Master Trainers – Last Week of October, 2025" },
  { title: "Stage 5 - Guide Teacher Training (PPT)", desc: "Training session for guide teachers – First Week of November, 2025" },
  { title: "Stage 6 - Awareness Programmes", desc: "School Awareness & Digital Marketing Sessions – Second Week of November, 2025" },
  { title: "Stage 7 - Team Formation", desc: "Teams formed via Guide Teacher WhatsApp Group – Third Week of November, 2025" },
  { title: "Stage 8 - Idea Submission", desc: "Teams submit their ideas – Second Week of January, 2026" },
  { title: "Stage 9 - Last Date for Idea Submission", desc: "Deadline for idea submission – First Week of January, 2026" },
  { title: "Stage 10 - Orientation for Evaluators", desc: "Orientation program for evaluators – Last Week of December, 2025" },
  { title: "Stage 11 - Online Evaluation Level 1", desc: "First-level evaluation of submitted ideas – Third Week of December, 2025" },
  { title: "Stage 12 - Online Evaluation Level 2", desc: "Second-level evaluation – Second Week of December, 2025" },
  { title: "Stage 13 - Online Evaluation Level 3", desc: "Final evaluation round – First Week of December, 2025" },
  { title: "Stage 14 - Ideation Camp Selection", desc: "Top ideas selected for district-level camp – November & December, 2025" },
  { title: "Stage 15 - Ideation Camp (District Level)", desc: "Practical ideas showcased – Third Week of January, 2026" },
  { title: "Stage 16 - Boot Camp Selection", desc: "Selection for boot camp – Last Week of January, 2026" },
  { title: "Stage 17 - Prototype Development", desc: "Two weeks for prototype building – First Week of February, 2026" },
  { title: "Stage 18 - 2 Day Boot Camp (Regional Level)", desc: "Regional boot camp – Second Week of February, 2026" },
  { title: "Stage 19 - Final Pitch Selection", desc: "Selection of final pitches – Third Week of February, 2026" },
  { title: "Stage 20 - Final Pitch (Regional Level)", desc: "Final pitch presentations – Last Week of February, 2026" },
  { title: "Stage 21 - Winner Announcement", desc: "Winners announced – Last Week of March, 2025" },
  { title: "Stage 22 - Award Distribution", desc: "Awards ceremony – First Week of March, 2025" },
  { title: "Special Prize", desc: "Foreign Trip for winners – First Week of March, 2025" },
];

  const faqs = [
    { q: 'Is the event online or offline?', a: 'The hackathon will be conducted online.' },
    { q: 'Can solo participants join?', a: 'Yes, but we recommend team participation for better collaboration.' },
    { q: 'Is there any registration fee?', a: 'Yes, participation is not completely free!' },
    { q: 'Do we receive a certificate?', a: 'Yes, all participants will get an e-certificate.' },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (idx) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  return (
    <div className="space-y-16 bg-gradient-to-br from-white via-red-50 to-white">

      {/* Marquee Section */}
      <div className="bg-red-800 text-white py-3 overflow-hidden relative z-10">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">🚀 Unleash Innovation at EDII Hackathon 2025!</span>
          <span className="mx-8">💡 Solve Real-World Problems</span>
          <span className="mx-8">🏆 Win Prizes & Get Recognized</span>
          <span className="mx-8">📅 Registration Ends Soon!</span>
          <span className="mx-8">🚀 Collaborate. Innovate. Dominate!</span>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <img src="event.png" alt="Schedule" className="w-100 h-90 rounded-xl" />
        </div>

        {/* <div className="rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-red-800 flex items-center gap-2">
            <AlarmClock className="w-6 h-6" /> Event Timeline
          </h2>
          <div className="space-y-6">
            {[
              { date: "June 1, 2025", title: "Registration Opens", description: "Start of participant registration and team formation" },
              { date: "July 31, 2025", title: "Registration Closes", description: "Last date to register your team" },
              { date: "July 5, 2025", title: "Idea Submission", description: "Submit your Project proposals" },
              { date: "September 4, 2025", title: "Hackathon Day", description: "Main event begins!" }
            ].map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-red-100 text-red-900 font-bold rounded-full flex items-center justify-center shadow-inner">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.date}</p>
                  <p className="text-gray-700 mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 m-5">
            <div className="bg-red-200 p-4 rounded-lg text-center shadow">
              <Calendar className="w-6 h-6 text-red-900 mx-auto mb-2" />
              <span className="text-sm font-semibold">June 01 - September 05</span>
            </div>
            <div className="bg-red-200 p-4 rounded-lg text-center shadow">
              <Clock className="w-6 h-6 text-red-900 mx-auto mb-2" />
              <span className="text-sm font-semibold">24 Hours</span>
            </div>
          </div>
        </div> */}





        <div className="rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-red-800 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" /> Event Flow
          </h2>

          <div className="space-y-8">
            {/* 1. Registration */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                1. Registration
              </h3>
              <p className="text-gray-700 flex items-center gap-2">
                School Registration <ArrowRight className="w-4 h-4" />
                Guide Registration <ArrowRight className="w-4 h-4" />
                Idea Submission
              </p>
            </div>

            {/* 2. Evaluation */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                2. Evaluation Process
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Level 1 Evaluation
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-green-600" />
                  Level 2 Evaluation
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  Level 3 Evaluation
                </li>
              </ul>
            </div>


            {/* 3. Bootcamp */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">3. Bootcamp</h3>
              <p className="text-gray-700">
                Hands-on sessions and mentoring for shortlisted teams.
              </p>
            </div>

            {/* 4. Jury Review */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                4. Jury Review
              </h3>
              <p className="text-gray-700">
                Jury members provide marks. Scores are finalized based on reviews
                from <strong>3 Juries</strong> and the <strong>Panel</strong> (with
                additional scores considered).
              </p>
            </div>


            {/* 5. Final Winners */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                5. Final Winners
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <strong>1st Place</strong> – Cash Prize + Award + Certificate
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gray-500" />
                  <strong>2nd Place</strong> – Cash Prize + Award + Certificate
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-700" />
                  <strong>3rd Place</strong> – Cash Prize + Award + Certificate
                </li>
              </ul>
            </div>

            {/* 6. Consolation */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                6. Consolation Prizes
              </h3>
              <p className="text-gray-700">
                Top <strong>10 Teams</strong> – Cash Prize + Award + Certificate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preparation Tips - Timeline Style */}
      {/* Preparation Tips - Custom Timeline */}
      <div className="bg-white rounded-xl shadow-md p-8 border border-red-100">
        <h2 className="text-2xl font-bold text-center justify-center text-red-800 mb-10 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-center" /> Hackathon Preparation Timeline
        </h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200"></div>

          {tips.map((tip, idx) => (
            <div key={idx} className="mb-12 flex flex-col md:flex-row items-center relative">
              {/* Left side */}
              {idx % 2 === 0 ? (
                <>
                  <div className="w-full md:w-1/2 pr-6 md:pr-12 text-right md:text-right">
                    <div className="inline-block bg-red-100 p-5 rounded-lg shadow transition hover:scale-105">
                      <h4 className="text-lg font-bold text-red-700">{tip.title}</h4>
                      <p className="text-sm text-gray-700 mt-1">{tip.desc}</p>
                    </div>
                  </div>
                  <div className="z-10 w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full shadow-md mx-4">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="w-full md:w-1/2"></div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-1/2"></div>
                  <div className="z-10 w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full shadow-md mx-4">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="w-full md:w-1/2 pl-6 md:pl-12 text-left md:text-left">
                    <div className="inline-block bg-red-100 p-5 rounded-lg shadow transition hover:scale-105">
                      <h4 className="text-lg font-bold text-red-700">{tip.title}</h4>
                      <p className="text-sm text-gray-700 mt-1">{tip.desc}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* FAQ Section - Accordion Style */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100">
          <h2 className="text-2xl font-bold justify-center text-red-800 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-red-200 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left p-4 flex justify-between items-center bg-red-50 hover:bg-red-100 transition"
                  onClick={() => toggleFAQ(idx)}
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <span className="text-red-700">{openFAQ === idx ? '−' : '+'}</span>
                </button>
                {openFAQ === idx && (
                  <div className="p-4 text-sm text-gray-700 bg-white border-t border-red-100 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      {/* <div className="bg-red-100 p-8 rounded-xl text-center shadow">
        <Timer className="mx-auto text-red-800 mb-4 w-8 h-8 animate-pulse" />
        <h2 className="text-2xl font-bold text-red-800">⏳ Countdown to Hackathon</h2>
        <p className="text-gray-700 text-sm mt-2">
          Only <strong className="text-red-700">15 Days</strong> left! Gear up to innovate, collaborate & shine!
        </p>
      </div> */}
    </div>
  );
}
