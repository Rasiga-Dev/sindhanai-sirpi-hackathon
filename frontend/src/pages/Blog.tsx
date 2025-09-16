import React from 'react';
import { motion } from 'framer-motion';

export default function Blog() {
  const blogPosts = [
    {
      title: 'The Future of Hackathons: Trends and Predictions',
      date: 'March 25, 2025',
      author: 'John Doe',
      excerpt: 'Hackathons are evolving, and in this blog, we’ll explore upcoming trends in the world of hackathons and how they’re changing the tech landscape.',
      href: '/blog/future-of-hackathons',
    },
    {
      title: 'How to Build a Winning Team for a Hackathon',
      date: 'February 17, 2025',
      author: 'Jane Smith',
      excerpt: 'A great hackathon team can make or break your project. Here’s how you can assemble a team that works together seamlessly and achieves success.',
      href: '/blog/winning-hackathon-team',
    },
    {
      title: '5 Key Skills Every Hackathon Participant Should Have',
      date: 'January 5, 2025',
      author: 'Michael Brown',
      excerpt: 'Whether you’re a beginner or a seasoned pro, there are certain skills that can help you stand out in a hackathon. Learn what you need to know.',
      href: '/blog/key-skills-hackathon',
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-800 text-center mb-8">Our Blog</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 hover:text-red-800">
                <a href={post.href}>{post.title}</a>
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                <span>{post.date}</span> | <span>{post.author}</span>
              </p>
              <p className="mt-4 text-gray-700">{post.excerpt}</p>
              <a href={post.href} className="mt-4 text-red-800 hover:text-red-900 inline-block">Read More</a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
