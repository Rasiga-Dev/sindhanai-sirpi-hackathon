

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaLaptopCode, FaAward, FaUserFriends } from 'react-icons/fa';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Lightbulb, Award, Users, BookOpen, Rocket } from "lucide-react";

export function Home() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 15,
    },
  });


  const features = [
    {
      icon: <Lightbulb className="text-white w-8 h-8" />,
      title: "Ignite Innovation",
      desc: "Encourage students to think beyond textbooks and solve real-world problems creatively.",
    },
    {
      icon: <Users className="text-white w-8 h-8" />,
      title: "Team Collaboration",
      desc: "Promote teamwork through structured innovation teams with teacher mentors.",
    },
    {
      icon: <BookOpen className="text-white w-8 h-8" />,
      title: "Hands-on Learning",
      desc: "From idea generation to final expo — students learn by doing.",
    },
    {
      icon: <Award className="text-white w-8 h-8" />,
      title: "Statewide Recognition",
      desc: "Stand a chance to present ideas at state-level expos and win exciting rewards.",
    },
  ];

  // 👇 Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 2000); // 3 seconds

    return () => clearInterval(interval);
  }, [slider]);

  // ...rest of your code (no changes needed below this)


  const HomeBanners = () => (
    <div className="space-y-4 mb-10">
      {/* Marquee Banner */}
      <div className="bg-red-800 text-white py-3 overflow-hidden rounded-lg">
        <div className="animate-marquee whitespace-nowrap text-sm sm:text-base">
          <span className="mx-4">🚀 Register now for the EDII Hackathon 2025!</span>
          <span className="mx-4">💡 Solve real-world challenges</span>
          <span className="mx-4">🏆 Win cash prizes & career opportunities</span>
          <span className="mx-4">📅 Registration closes: Jun 30, 2025</span>
        </div>
      </div>

      {/* Responsive Banner Images */}
      <div className="relative h-auto overflow-hidden rounded-xl">
        <div className="flex flex-col sm:flex-row h-full">
          <img
            src="school2.avif"
            alt="Banner 1"
            className="w-full sm:w-1/2 h-64 sm:h-auto object-cover"
          />
          <img
            src="banner.png"
            alt="Banner 2"
            className="w-full sm:w-1/2 h-64 sm:h-auto object-fit"
          />
        </div>
      </div>
    </div>
  );

  const buttonStyle = {
    padding: '13px 34px',
    marginBottom: '16px',
    backgroundColor: '#ffffff',
    color: '#991B1B',
    fontWight: '600', // Note: should be 'fontWeight' (typo)
    fontSize: '20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };


  return (
    <div className="relative overflow-hidden">

      {/* Home Banner */}
      <HomeBanners />

      {/* GRID CONTAINER FOR HERO + BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Hero Section */}
        <div className="md:col-span-9 bg-red-800 text-white p-6 md:p-12 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(20)].map((_, i) => {
              const top = `${Math.random() * 100}%`;
              const left = `${Math.random() * 100}%`;
              const animationDuration = `${2 + Math.random() * 3}s`;

              return (
                <span
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-300 opacity-20 blur-md animate-ping"
                  style={{ top, left, animationDuration }}
                />
              );
            })}
          </div>


          {/* Glow Ring */}
          <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[180px] opacity-20 z-0 animate-pulse" />

          {/* Main Text */}
          <motion.h1
            style={{ lineHeight: 1.5 }}
            className="text-4xl md:text-7xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-pink-300 drop-shadow-2xl z-10 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            சிந்தனை சிற்பி 2025
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto text-center text-yellow-100 z-10 relative"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            The ultimate celebration of school innovation. <br />
            Build. Showcase. Inspire. Win. 🌟
          </motion.p>

          {/* Images */}
          <motion.img
            src="/award3.png"
            alt="Mascot Left"
            className="absolute bottom-8 left-8 h-60 w-24 mx-[-4rem] md:w-72 z-20"
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="/student.png"
            alt="Mascot Right"
            className="absolute bottom-8 right-8 h-60 w-24 mx-[-4rem] md:w-72 z-20"
            animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* CTA */}
          <motion.div
            className="mt-10 text-center z-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <button className="bg-gradient-to-r from-yellow-300 to-pink-400 text-black font-extrabold py-3 px-8 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
              🔥 Join Now
            </button>
          </motion.div>
        </div>

        {/* Buttons Section */}
        <div className="md:col-span-3 flex flex-col items-center justify-center space-y-4 bg-red-800 text-white p-6 md:p-12 relative overflow-hidden">
          {['Request Information', 'Apply Now', 'Log In'].map((text, index) => (
            <button
              key={index}
              className="text-red-800 w-full text-center font-bold text-xl border"
              style={buttonStyle}
            >
              {text}
            </button>
          ))}

        </div>
      </div>






      {/* Highlights */}
      <div className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-4 gap-8 text-center">
        {[
          { icon: FaLightbulb, title: 'Innovate', desc: 'Bring out your creative problem-solving ideas.' },
          { icon: FaLaptopCode, title: 'Build', desc: 'Collaborate and code in a competitive environment.' },
          { icon: FaAward, title: 'Win Prizes', desc: 'Stand a chance to win cash and Foreign Trip offers.' },
          { icon: FaUserFriends, title: 'Network', desc: 'Connect with experts, mentors, and fellow techies.' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * i, duration: 0.5 }}
          >
            <item.icon className="text-red-700 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <section className="bg-gradient-to-br from-red-50 to-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold text-red-800 mb-4">
              Sindhanai Sirpi
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              A visionary platform that inspires school students to dream, design,
              and deliver innovative solutions to real-life problems.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-red-800 text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Program Flow */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24"
          >
            <h3 className="text-3xl font-bold text-red-800 text-center mb-10">
              How the Program Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Team Registration & Idea Submission",
                "District-Level Training & Mentoring",
                "State-Level Sindhanai Sirpi Expo",
              ].map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white border border-red-500 p-6 rounded-xl shadow-md text-center"
                >
                  <div className="text-red-600 font-bold text-2xl mb-2">
                    Step {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center py-20 bg-gradient-to-r from-red-700 to-red-900 text-white">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Rocket className="mx-auto w-10 h-10 text-white-600 mb-4" />
          Ready to Spark Innovation?
        </motion.h2>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Form your team today and take the first step toward becoming a
          Sindhanai Sirpi!
        </motion.p>
        <motion.a
          href="#"
          className="inline-block bg-white text-red-800 font-bold py-3 px-6 rounded-full shadow hover:shadow-lg transition"
          whileHover={{ scale: 1.05 }}
        >
          Register Now
        </motion.a>
      </div>
    </div>
  );
}