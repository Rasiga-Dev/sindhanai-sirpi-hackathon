


import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  ArrowUp,
  Youtube
} from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Road Map', href: '/roadmap' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Blog', href: '/blog' },
    ],
    resources: [
      { name: 'Schedule', href: '/schedule' },
      { name: 'Guidelines', href: '/guidelines' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Speakers', href: '/speakers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Code of Conduct', href: '/code-of-conduct' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com' },
    { icon: Instagram, href: 'https://www.instagram.com' },
    { icon: Linkedin, href: 'https://www.linkedin.com' },
    { icon: Youtube, href: 'https://www.youtube.com' },
  ];
  return (
    <footer className="bg-gradient-to-br from-red-50 to-white border-t border-red-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* <Code2 className="h-10 w-10 text-red-800" /> */}
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-red-900">
              சிந்தனை சிற்பி
              </span>
            </motion.div>
            <motion.p
              className="mt-4 text-gray-600 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join the most innovative hackathon platform where ideas transform into reality. 
              Connect with brilliant minds and shape the future of technology.
            </motion.p>
            <motion.div
              className="mt-6 flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-700 transition-transform transform"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-red-700 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="flex items-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> by Vosa Tech Team
            </motion.p>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-sm text-gray-500">
                © {new Date().getFullYear()} Vosa Tech. All rights reserved.
              </span>
              <motion.button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
