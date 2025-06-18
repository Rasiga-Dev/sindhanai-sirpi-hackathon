import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-800 px-4 py-16 sm:px-6 lg:px-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-800 mb-6">Privacy Policy</h1>
        <p className="mb-6 text-gray-600">
          At <span className="font-semibold text-gray-800">Vosa Tech</span>, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Personal Information (name, email, phone number)</li>
            <li>Account credentials</li>
            <li>Usage data and cookies</li>
            <li>Any other data you voluntarily provide</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To communicate with you</li>
            <li>To improve our platform</li>
            <li>For marketing and promotional purposes (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Sharing Your Information</h2>
          <p className="text-gray-600">
            We do not sell or rent your personal data. We may share it with trusted third-party service providers who assist us in operating our website, conducting business, or serving our users — as long as those parties agree to keep the information confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Cookies</h2>
          <p className="text-gray-600">
            We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and interactions. You can choose to turn off cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal data. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at <span className="text-red-800 font-medium">support@vosatech.com</span>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this privacy policy from time to time. Changes will be posted on this page with a revised effective date.
          </p>
        </section>

        <p className="text-gray-600">Last updated: April 16, 2025</p>
      </motion.div>
    </div>
  );
}
