import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="bg-white text-gray-800 px-4 py-16 sm:px-6 lg:px-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-800 mb-6">Terms of Service</h1>
        <p className="mb-6 text-gray-600">
          These Terms of Service ("Terms") govern your use of the Vosa Tech platform and services. By accessing or using our website, you agree to be bound by these Terms.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By using our website, you agree to comply with these Terms and any applicable laws. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Use of the Service</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>You must be at least 13 years old to use our platform.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree not to use our platform for any unlawful or unauthorized purpose.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Intellectual Property</h2>
          <p className="text-gray-600">
            All content on this platform, including text, graphics, logos, and software, is the property of Vosa Tech and protected by copyright laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to suspend or terminate your access to the platform if you violate any part of these Terms or engage in any harmful activity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Limitation of Liability</h2>
          <p className="text-gray-600">
            Vosa Tech shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Modifications to the Terms</h2>
          <p className="text-gray-600">
            We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting. Continued use of the service implies acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Governing Law</h2>
          <p className="text-gray-600">
            These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to conflict of law principles.
          </p>
        </section>

        <p className="text-gray-600">Last updated: April 16, 2025</p>
      </motion.div>
    </div>
  );
}
