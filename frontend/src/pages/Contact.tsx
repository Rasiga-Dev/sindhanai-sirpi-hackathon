

// import React from 'react';
// import RazorpayButton from './RazorpayButton';
// import Certificate from './Certificate';
// import ThankYouPage from '../components/ThankYouPage';

// export function Contact() {
//   return (
//     <div className="space-y-24">
//       {/* Hero Section */}
//       <section className="text-center bg-red-800 text-white py-16 px-4">
//         <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
//         <p className="text-lg">We’d love to hear from you! Let’s get in touch.</p>
//       </section>

//       {/* Contact Form + Image */}
//       <section className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-12 px-4">
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h2>
//           <form className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-red-800 focus:border-red-800" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input type="email" className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-red-800 focus:border-red-800" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Message</label>
//               <textarea rows={4} className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-red-800 focus:border-red-800"></textarea>
//             </div>
//             <button type="submit" className="w-full bg-red-800 text-white rounded-lg py-2 hover:bg-red-900 transition">Send Message</button>
//           </form>
//         </div>
//         <div className="flex items-center justify-center">
//           <img
//             src="contact.jpg"
//             alt="Contact Illustration"
//             className="w-100 rounded-xl shadow-md"
//           />
//         </div>
//       </section>

//       {/* Contact Info Section */}
//       <section className="bg-gray-100 py-16 px-4">
//         <div className="max-w-4xl mx-auto text-center space-y-6">
//           <h2 className="text-3xl font-bold">Our Contact Details</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             <div>
//               <h4 className="font-semibold">📍 Address</h4>
//               <p>158/6, RJS Complex, KTC Nagar, Tirunelveli - 627011.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">📞 Phone</h4>
//               <p>+91 9363051004</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">📧 Email</h4>
//               <p>sindhanaisirpi01@gmail.com</p>
//             </div>
//           </div>
//         </div>
//       </section>


//       {/* Newsletter Subscription */}
//       <section className="bg-red-800 text-white py-16 px-4 text-center">
//         <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
//         <p className="mb-6">Get updates on speakers, sessions, and more!</p>
//         <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full rounded-lg px-4 py-2 text-gray-900 focus:outline-none"
//           />
//           <button className="bg-white text-red-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
//             Subscribe
//           </button>
//         </div>
//       </section>

     
//     </div>
//   );
// }

  import React, { useState, useEffect } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // All fields non-empty
    const allFilled =
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.message.trim();

    // No validation errors
    const noErrors = !errors.name && !errors.email && !errors.phone;

    setIsFormValid(Boolean(allFilled) && noErrors);
  }, [formData, errors]);

  const validateName = (value) => {
    if (!/^[A-Za-z\s]*$/.test(value)) {
      return "Only alphabets and spaces are allowed.";
    }
    if (value.trim().length > 0 && value.trim().length < 3) {
      return "Name must be at least 3 characters long.";
    }
    if (value.length > 50) {
      return "Name cannot exceed 50 characters.";
    }
    return "";
  };

  const validateEmail = (value) => {
    // Basic but practical email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value.trim())) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePhone = (value) => {
    // Allow only digits; check length and starting digit 6-9
    if (!/^\d*$/.test(value)) {
      return "Phone number must contain only digits.";
    }
    if (value.length !== 10) {
      return "Phone number must be exactly 10 digits.";
    }
    if (!/^[6-9]/.test(value)) {
      return "Phone number must start with 6, 7, 8 or 9.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;

    // For phone field, sanitize to digits only and enforce maxlength 10
    if (name === "phone") {
      value = rawValue.replace(/\D/g, "").slice(0, 10);
    }

    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate fields on change
    if (name === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "phone") {
      // Only show phone errors when length is >0 to avoid early message
      const phoneErr =
        value.length === 0 ? "Phone number is required." : validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: phoneErr }));
    }
  };

  // Prevent non-letter key presses in name
  const handleNameKeyPress = (e) => {
    const char = e.key;
    if (!/^[A-Za-z\s]$/.test(char)) {
      e.preventDefault();
    }
  };

  // Sanitize paste into name (remove non-letters)
  const handleNamePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const sanitized = pasted.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
    setFormData((prev) => ({ ...prev, name: sanitized }));
    setErrors((prev) => ({ ...prev, name: validateName(sanitized) }));
  };

  // Prevent non-digit key presses for phone
  const handlePhoneKeyPress = (e) => {
    const char = e.key;
    if (!/^\d$/.test(char)) {
      e.preventDefault();
    }
  };

  // Sanitize pasted phone content
  const handlePhonePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const sanitized = pasted.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: sanitized }));
    setErrors((prev) => ({ ...prev, phone: validatePhone(sanitized) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    // Final validation checks
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);

    setErrors({ name: nameErr, email: emailErr, phone: phoneErr });

    if (nameErr || emailErr || phoneErr) {
      alert("⚠️ Please correct the highlighted fields before sending.");
      return;
    }

    // WhatsApp message format
    const whatsappMessage = `Hello! 👋\n\nYou have a new contact message:\n\n📛 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n💬 Message: ${message}`;
    const phoneNumber = "7448389404";
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Clear form fields and errors after sending
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
    });
    setIsFormValid(false);
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onKeyPress={handleNameKeyPress}
                onPaste={handleNamePaste}
                maxLength={50}
                placeholder="Enter your full name"
                className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:ring-red-800 focus:border-red-800 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {errors.name && (
                <p id="name-error" className="text-red-600 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    email: validateEmail(formData.email),
                  }))
                }
                placeholder="you@example.com"
                className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:ring-red-800 focus:border-red-800 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onKeyPress={handlePhoneKeyPress}
                onPaste={handlePhonePaste}
                placeholder="10 digit phone number"
                maxLength={10}
                className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:ring-red-800 focus:border-red-800 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.phone}
                aria-describedby="phone-error"
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-600 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-red-800 focus:border-red-800"
              ></textarea>
            </div>

            {/* Submit Button - disabled until form is valid */}
            <button
              type="submit"
              disabled={!isFormValid}
              aria-disabled={!isFormValid}
              className={`w-full rounded-lg py-2 font-semibold transition-all ${
                isFormValid
                  ? "bg-red-800 text-white hover:bg-red-900"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Send via WhatsApp
            </button>
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
      <section className="bg-red-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white space-y-6">
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
      {/* <section className="bg-red-800 text-white py-16 px-4 text-center">
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
      </section> */}
    </div>
  );
}
