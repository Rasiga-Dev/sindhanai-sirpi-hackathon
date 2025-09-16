import React from 'react';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
  return (
    <div className="bg-white text-gray-800 px-4 py-16 sm:px-6 lg:px-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-800 mb-6">Cookie Policy</h1>
        <p className="mb-6 text-gray-600">
          This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our website or use our services. It outlines what information we collect, why we collect it, and how we use it to improve your experience.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">1. What Are Cookies?</h2>
          <p className="text-gray-600">
            Cookies are small text files that are stored on your device when you visit a website. They allow the website to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you don’t have to re-enter them whenever you return to the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">2. Types of Cookies We Use</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Essential Cookies:</strong> These are necessary for the website to function correctly and to provide you with the services you request, such as logging in or submitting a form.</li>
            <li><strong>Performance Cookies:</strong> These cookies collect information about how visitors use the website, like which pages are visited most often, to improve the performance of the website.</li>
            <li><strong>Functional Cookies:</strong> These cookies remember your preferences, such as language or region, to offer a more personalized experience.</li>
            <li><strong>Advertising Cookies:</strong> These cookies are used to deliver personalized ads to you based on your interests, and to limit the number of times you see an ad.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">3. How We Use Cookies</h2>
          <p className="text-gray-600">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To provide and personalize our services.</li>
            <li>To remember your preferences and improve your user experience.</li>
            <li>To monitor the performance of our website and optimize content.</li>
            <li>To serve you personalized ads based on your interests and browsing behavior.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">4. How to Control Cookies</h2>
          <p className="text-gray-600">
            You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or set warnings before cookies are stored. However, please note that blocking or deleting cookies may affect the functionality of our website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">5. Third-Party Cookies</h2>
          <p className="text-gray-600">
            We may allow third-party service providers to place cookies on your device. These cookies help us with services like analytics and advertising. These third parties may also collect data about your online activities across various websites, and you can manage your preferences directly with them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">6. Changes to This Cookie Policy</h2>
          <p className="text-gray-600">
            We may update this Cookie Policy from time to time. Any changes will be posted on this page, and the updated policy will be effective as of the date of posting. Please review this policy regularly to stay informed about how we use cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">7. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or concerns about our Cookie Policy or the use of cookies on our site, please contact us at <a href="mailto:info@vosa.com" className="text-red-800">info@vosa.com</a>.
          </p>
        </section>

        <p className="text-gray-600">Last updated: April 16, 2025</p>
      </motion.div>
    </div>
  );
}
