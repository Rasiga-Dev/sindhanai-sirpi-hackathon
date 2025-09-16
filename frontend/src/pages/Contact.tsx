

import React from 'react';
import RazorpayButton from './RazorpayButton';
import Certificate from './Certificate';
import ThankYouPage from '../components/ThankYouPage';

export function Contact() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center bg-red-800 text-white py-16 px-4">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg">We’d love to hear from you! Let’s get in touch.</p>
      </section>

      {/* Contact Form + Image */}
      <section className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-red-800 focus:border-red-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-red-800 focus:border-red-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea rows={4} className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-red-800 focus:border-red-800"></textarea>
            </div>
            <button type="submit" className="w-full bg-red-800 text-white rounded-lg py-2 hover:bg-red-900 transition">Send Message</button>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="contact.jpg"
            alt="Contact Illustration"
            className="w-100 rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Our Contact Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold">📍 Address</h4>
              <p>158/6, RJS Complex, KTC Nagar, Tirunelveli - 627011.</p>
            </div>
            <div>
              <h4 className="font-semibold">📞 Phone</h4>
              <p>+91 9363051004</p>
            </div>
            <div>
              <h4 className="font-semibold">📧 Email</h4>
              <p>sindhanaisirpi01@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Find Us Here</h2>
        <div className="overflow-hidden rounded-xl shadow-lg aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.853110793469!2d80.2209779147011!3d13.047487390802622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e99c4c1e9d%3A0xe5d5b745191f53ea!2sChennai!5e0!3m2!1sen!2sin!4v1616584793833!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>
      </section> */}

      {/* FAQ Section
      <section className="bg-white py-16 px-4 text-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg">How can I participate in the event?</h4>
              <p className="text-gray-600">Simply register through our website and we’ll send you all the details.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Do I need technical background?</h4>
              <p className="text-gray-600">Not at all! Our sessions are curated for all experience levels.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Can I contact you for sponsorship?</h4>
              <p className="text-gray-600">Yes, please use the contact form or email us at sponsor@yourcompany.com.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Newsletter Subscription */}
      <section className="bg-red-800 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Get updates on speakers, sessions, and more!</p>
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg px-4 py-2 text-gray-900 focus:outline-none"
          />
          <button className="bg-white text-red-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </section>

     
    </div>
  );
}

