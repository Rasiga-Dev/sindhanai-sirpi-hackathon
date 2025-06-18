import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-red-800 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your idea has been successfully submitted. We appreciate your participation!
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-red-800 text-white px-6 py-3 rounded-full hover:bg-red-900 transition duration-300"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default ThankYouPage;
