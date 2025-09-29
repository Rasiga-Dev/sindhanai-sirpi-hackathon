// pages/privacy-policy.tsx
import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy(): JSX.Element {
  return (
    <div className="bg-white text-gray-800 px-4 py-12 sm:px-6 lg:px-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className="text-4xl font-bold text-red-800 mb-6">Privacy Policy</h1>

        <p className="mb-6 text-gray-600">
          This Privacy Policy describes how <span className="font-semibold text-gray-800">Sindhanai Sirpi Hackathon</span> (operated by Vosa Tech) collects, uses, and shares your personal information when you use our website <span className="font-medium">https://www.sindhanaisirpihackathon.com</span> and related services.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Personal information:</strong> name, email, phone number, organization/school details, UDISE or registration IDs you provide.</li>
            <li><strong>Payment information:</strong> payment-related metadata (payments are processed by Razorpay — we do not store full card details on our servers).</li>
            <li><strong>Usage data:</strong> pages visited, actions taken, IP address, device & browser information, and analytics data.</li>
            <li><strong>Cookies & similar technologies:</strong> used to remember preferences and improve the site experience.</li>
            <li><strong>Any data you volunteer:</strong> messages, files or content you submit as part of registration or support requests.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To process registrations and payments, and to provide event-related services and communications.</li>
            <li>To send important notices about the event, invoices, confirmations and support responses.</li>
            <li>To analyze usage and improve our platform, features, and user experience.</li>
            <li>For marketing and promotional communications only if you have opted in; you can opt-out anytime.</li>
            <li>To comply with legal obligations and to prevent fraud or abuse.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Payment Processing</h2>
          <p className="text-gray-600">
            We use Razorpay as our payment gateway. When you make a payment, Razorpay collects and processes your payment details. We receive payment confirmation and related metadata (payment id, order id, status) from Razorpay. Please refer to Razorpay's privacy policy for details on how they handle payment information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Cookies & Tracking</h2>
          <p className="text-gray-600 mb-2">
            We use cookies and similar technologies to operate the website, remember your preferences, provide analytics, and for basic security. You can control cookies through your browser settings. Disabling cookies may affect site functionality.
          </p>
          <p className="text-gray-600">
            We may use third-party analytics (e.g., Google Analytics) or advertising/measurement providers; these providers may set their own cookies and collect information about your use of the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Sharing & Disclosure</h2>
          <p className="text-gray-600">
            We do not sell or rent your personal information. We may share information with:
          </p>
          <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
            <li>Service providers and partners who perform services on our behalf (payment processors, email providers, analytics).</li>
            <li>Organizers or sponsors for event-related logistics where required.</li>
            <li>When required by law, to protect rights, or in connection with a merger or acquisition.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Data Retention & Security</h2>
          <p className="text-gray-600 mb-2">
            We retain personal information for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. We implement reasonable technical and organizational measures to protect data, but no online transmission or storage can be guaranteed 100% secure.
          </p>
          <p className="text-gray-600">
            Payment card data is handled by Razorpay; we only store non-sensitive payment metadata (ids, status).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Your Rights</h2>
          <p className="text-gray-600 mb-2">
            Depending on your jurisdiction, you may have rights to access, correct, update, or delete your personal data. To exercise these rights, or to request a copy of the data we hold about you, contact us at the details below.
          </p>
          <p className="text-gray-600">
            We will respond to verified requests within a reasonable timeframe (typically within 30 days).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">8. Children</h2>
          <p className="text-gray-600">
            Our services are not directed to children under 13. We do not knowingly collect or maintain information from children under 13. If you believe we have collected data from a child, please contact us to request deletion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">9. Third-Party Links</h2>
          <p className="text-gray-600">
            Our site may contain links to third-party sites. We are not responsible for the privacy practices of those sites. Please review their privacy policies before providing personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">10. Contact Us</h2>
          <p className="text-gray-600 mb-2">
            For privacy questions, data access requests, or other concerns, contact:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Email (General): <a href="mailto:sindhanaisirpi01@gmail.com" className="text-red-800 font-medium">sindhanaisirpi01@gmail.com</a></li>
            <li>Email (Payments & Refunds): <a href="mailto:sindhanaisirpi01@gmail.com" className="text-red-800 font-medium">sindhanaisirpi01@gmail.com</a></li>
            <li>Email (Privacy): <a href="mailto:sindhanaisirpi01@gmail.com" className="text-red-800 font-medium">sindhanaisirpi01@gmail.com</a></li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">11. Changes to this Policy</h2>
          <p className="text-gray-600">
            We may update this policy from time to time. The updated policy will be posted on this page with a revised effective date.
          </p>
        </section>

        <p className="text-gray-600">Effective date: April 16, 2025</p>
      </motion.div>
    </div>
  );
}
