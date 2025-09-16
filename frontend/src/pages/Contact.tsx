

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

