import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What is Vosa Tech?',
      answer: 'Vosa Tech is an innovative platform that connects talented individuals to participate in hackathons, tech events, and collaborate on various technological projects. We aim to foster creativity and innovation.'
    },
    {
      question: 'How do I participate in a hackathon?',
      answer: 'To participate in a hackathon, simply sign up on our platform, register for an upcoming event, and start collaborating with your team. Make sure to check the event details for requirements and deadlines.'
    },
    {
      question: 'Do I need a team to participate?',
      answer: 'No, you can participate individually, and we will connect you with like-minded people to form a team. If you already have a team, you can register together.'
    },
    {
      question: 'Are the hackathons free to join?',
      answer: 'Most of our hackathons are free to join, though some may have entry fees or require additional paid services like mentorship or workshops. Check the specific event details for more information.'
    },
    {
      question: 'How can I contact support?',
      answer: 'If you have any issues or questions, you can contact our support team via email at <a href="mailto:support@vosa.com" className="text-red-800">support@vosa.com</a> or visit our Help Center on the website.'
    }
  ];

  return (
    <div className="bg-white text-gray-800 px-4 py-16 sm:px-6 lg:px-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-800 mb-6">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-800">{item.question}</h3>
                <span className="text-gray-500 text-lg">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-gray-600"
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
