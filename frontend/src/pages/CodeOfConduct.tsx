import React from 'react';
import { motion } from 'framer-motion';

export default function CodeOfConduct() {
  return (
    <div className="bg-white text-gray-800 px-4 py-16 sm:px-6 lg:px-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-800 mb-6">Code of Conduct</h1>
        <p className="mb-6 text-gray-600">
          At Vosa Tech, we are committed to creating a safe, inclusive, and respectful environment for everyone. This Code of Conduct outlines our expectations for all participants in our community.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">1. Respect and Inclusion</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Treat everyone with respect, dignity, and kindness.</li>
            <li>Discrimination or harassment of any kind will not be tolerated.</li>
            <li>Be inclusive and considerate of different perspectives and backgrounds.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">2. Harassment-Free Experience</h2>
          <p className="text-gray-600">
            We are dedicated to providing a harassment-free experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">3. Professional Behavior</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Use welcoming and inclusive language.</li>
            <li>Be constructive in feedback and discussions.</li>
            <li>Avoid any form of bullying, intimidation, or aggressive behavior.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">4. Reporting Issues</h2>
          <p className="text-gray-600">
            If you witness or experience any violation of this Code of Conduct, please report it to the Vosa Tech team immediately. Reports will be handled confidentially.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">5. Consequences of Violations</h2>
          <p className="text-gray-600">
            Participants asked to stop any harassing behavior are expected to comply immediately. Failure to adhere to this Code may result in removal from the platform or community activities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">6. Commitment</h2>
          <p className="text-gray-600">
            By participating in the Vosa Tech community, you agree to uphold this Code of Conduct and contribute to a safe, respectful, and inclusive environment.
          </p>
        </section>

        <p className="text-gray-600">Last updated: April 16, 2025</p>
      </motion.div>
    </div>
  );
}
