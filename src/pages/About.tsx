


import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Users2, Lightbulb } from 'lucide-react';
// import { FaMoneyBillWave, FaTrophy, FaUserGraduate, FaLightbulb, FaUsers } from "react-icons/fa";
import { FaMoneyBillWave, FaTrophy, FaUserGraduate, FaLightbulb, FaUsers, FaCode, FaRobot, FaLaptopCode } from "react-icons/fa";


export function About() {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden">

      {/* 🔴 Marquee Section */}
      <div className="bg-red-800 text-white py-3 overflow-hidden relative z-10">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">🚀 Unleash Innovation at EDII Hackathon 2025!</span>
          <span className="mx-8">💡 Solve Real-World Problems</span>
          <span className="mx-8">🏆 Win Prizes & Get Recognized</span>
          <span className="mx-8">📅 Registration Ends Soon!</span>
        </div>
      </div>

      {/* 🌟 About Section */}
      {/* <div className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="/sinthanai_sirpi.jpg"
          alt="About Us"
          className="h-[550px] w-full object-fit rounded-x"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        />


        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-red-800">About Sinthanai Sirpi Hackathon</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            SINTHANAI SIRPI is where ideas meet innovation. It’s a vibrant space for students and creators to solve real-world problems, gain mentorship, and showcase their skills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-red-800 text-lg">Innovation</h3>
              <p className="text-sm text-gray-700 mt-1">Smart solutions for real challenges.</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-red-800 text-lg">Collaboration</h3>
              <p className="text-sm text-gray-700 mt-1">Great ideas start with teamwork.</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-red-800 text-lg">Leadership</h3>
              <p className="text-sm text-gray-700 mt-1">Lead and inspire change.</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-red-800 text-lg">Impact</h3>
              <p className="text-sm text-gray-700 mt-1">Make a difference that matters.</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-red-800 text-lg">Learning</h3>
              <p className="text-sm text-gray-700 mt-1">Gain skills & mentorship.</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-red-800 text-lg">Recognition</h3>
              <p className="text-sm text-gray-700 mt-1">Prizes, certificates & growth.</p>
            </div>
          </div>
        </motion.div>

      </div> */}

      <div className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        {/* Image with icons */}
        <div className="relative w-full max-w-7xl mx-auto">
          <motion.img
            src="/sinthanai_sirpi.jpg"
            alt="About Us"
            className="h-[550px] w-full object-cover rounded-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />

          {/* Top Left */}
          <motion.div className="absolute top-[-30px] left-[-30px] bg-green-100 p-5 rounded-full shadow-xl text-green-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 }}>
            <FaMoneyBillWave size={42} />
          </motion.div>

          {/* Top Right */}
          <motion.div className="absolute top-[-30px] right-[-30px] bg-yellow-100 p-5 rounded-full shadow-xl text-yellow-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }}>
            <FaTrophy size={42} />
          </motion.div>

          {/* Bottom Left */}
          <motion.div className="absolute bottom-[-30px] left-[-30px] bg-purple-100 p-5 rounded-full shadow-xl text-purple-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }}>
            <FaUserGraduate size={42} />
          </motion.div>

          {/* Bottom Right */}
          <motion.div className="absolute bottom-[-30px] right-[-30px] bg-pink-100 p-5 rounded-full shadow-xl text-pink-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }}>
            <FaLightbulb size={42} />
          </motion.div>

          {/* Center Left */}
          <motion.div className="absolute top-1/2 left-[-35px] -translate-y-1/2 bg-blue-100 p-5 rounded-full shadow-xl text-blue-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }}>
            <FaUsers size={42} />
          </motion.div>

          {/* Center Right */}
          <motion.div className="absolute top-1/2 right-[-35px] -translate-y-1/2 bg-red-100 p-5 rounded-full shadow-xl text-red-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }}>
            <FaCode size={42} />
          </motion.div>

          {/* Top Center */}
          <motion.div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-cyan-100 p-5 rounded-full shadow-xl text-cyan-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }}>
            <FaLaptopCode size={42} />
          </motion.div>

          {/* Bottom Center */}
          <motion.div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-indigo-100 p-5 rounded-full shadow-xl text-indigo-600"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }}>
            <FaRobot size={42} />
          </motion.div>
        </div>



        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-red-800">About Sinthanai Sirpi Hackathon</h2>

          {/* Sub Title */}
          <h3 className="text-2xl font-semibold text-red-600">
            Empowering Young Innovators Across Tamil Nadu
          </h3>

          {/* Main Paragraph */}
          <p className="text-gray-600 leading-relaxed text-lg">
            SINTHANAI SIRPI is where ideas meet innovation. It’s a vibrant space for students and creators to solve real-world problems, gain mentorship, and showcase their skills.
          </p>

          {/* Extra Content */}
          <p className="text-gray-600 text-base">
            This initiative encourages students from schools and colleges to bring forward their creative solutions to everyday problems. Through hands-on experience, guided mentorship, and collaborative teamwork, participants grow their technical and leadership abilities — preparing them to be the changemakers of tomorrow.
          </p>

          <p className="text-gray-600 text-base">
            Whether you're building a groundbreaking app, designing a sustainable solution, or improving community services, Sinthanai Sirpi is your platform to shine. The hackathon is not just a competition — it's a movement that celebrates creativity, innovation, and the spirit of problem-solving.
          </p>

          {/* Feature Cards (same as before) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* ...your feature cards go here... */}
          </div>
        </motion.div>

      </div>

      {/* ✅ Why Participate Section */}
      <motion.div
        className="px-6 py-16 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Participate in Sinthanai Sirpi Hackathon?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gradient-to-tr from-red-100 via-red-50 to-white p-6 rounded-2xl shadow hover:scale-105 transition-all">
            <Lightbulb className="mx-auto text-red-600" size={36} />
            <h4 className="font-semibold mt-4 text-lg text-red-800">Innovate Freely</h4>
            <p className="text-sm text-gray-600">Pitch bold, creative, and groundbreaking ideas without limits.</p>
          </div>
          <div className="bg-gradient-to-tr from-yellow-100 via-yellow-50 to-white p-6 rounded-2xl shadow hover:scale-105 transition-all">
            <Users2 className="mx-auto text-yellow-600" size={36} />
            <h4 className="font-semibold mt-4 text-lg text-yellow-800">Build Connections</h4>
            <p className="text-sm text-gray-600">Collaborate with students, mentors, and industry experts.</p>
          </div>
          <div className="bg-gradient-to-tr from-green-100 via-green-50 to-white p-6 rounded-2xl shadow hover:scale-105 transition-all">
            <Brain className="mx-auto text-green-700" size={36} />
            <h4 className="font-semibold mt-4 text-lg text-green-800">Learn by Doing</h4>
            <p className="text-sm text-gray-600">Enhance your technical and soft skills through real-world challenges.</p>
          </div>
          <div className="bg-gradient-to-tr from-blue-100 via-blue-50 to-white p-6 rounded-2xl shadow hover:scale-105 transition-all">
            <Trophy className="mx-auto text-blue-700" size={36} />
            <h4 className="font-semibold mt-4 text-lg text-blue-800">Win Big</h4>
            <p className="text-sm text-gray-600">Exciting prizes, internship opportunities, and industry recognition await.</p>
          </div>
        </div>
      </motion.div>


      {/* 🌟 Unique Features Section */}
      <motion.div
        className="px-6 py-20 bg-gradient-to-b from-white via-red-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
          What Makes <span className="text-red-600">Sinthanai Sirpi Hackathon</span> Unique?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
            <img src="https://tse4.mm.bing.net/th?id=OIP.gmCunRPH2WNc586vT2HiUwHaEK&pid=Api&P=0&h=220" alt="Mentorship" className="h-20 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-red-700 text-center">Expert Mentorship</h4>
            <p className="text-gray-600 text-sm text-center mt-2">Work with industry experts and startup founders throughout the hackathon.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
            <img src="https://tse3.mm.bing.net/th?id=OIP._o6MUsDUCYk4afCbWJdP-QHaEr&pid=Api&P=0&h=220" alt="Startup Launch" className="h-20 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-red-700 text-center">Startup Incubation</h4>
            <p className="text-gray-600 text-sm text-center mt-2">Get a chance to pitch your idea for incubation and funding support.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition">
            <img src="https://tse3.mm.bing.net/th?id=OIP.PhjiK9nEm6iTncBJsVfMegHaGE&pid=Api&P=0&h=220" alt="Networking" className="h-20 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-red-700 text-center">Massive Networking</h4>
            <p className="text-gray-600 text-sm text-center mt-2">Meet and connect with developers, founders, and recruiters from across India.</p>
          </div>
        </div>
      </motion.div>

    </div>



  );
}
