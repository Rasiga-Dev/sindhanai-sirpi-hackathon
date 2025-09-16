
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

const RegisterGuideTeacher = () => {
  const [teacherName, setTeacherName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [udiseCode, setUdiseCode] = useState('');

  const validateFields = () => {
    if (!teacherName || !phoneNumber || !email || !udiseCode) {
      toast.error('All fields are required');
      return false;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(teacherName)) {
      toast.error('Teacher name should contain only letters');
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Phone number must be exactly 10 digits');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }

    const udiseRegex = /^[0-9]{11}$/;
    if (!udiseRegex.test(udiseCode)) {
      toast.error('UDISE code must be exactly 11 digits');
      return false;
    }

    return true;
  };


  useEffect(() => {
    const details = localStorage.getItem('schoolDetails');
    if (details) {
      const school = JSON.parse(details);
      setUdiseCode(school.udiseCode); // **Set udiseCode from localStorage**
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:11129/api/school/register-guide-teacher', {
        teacherName,
        phoneNumber,
        email,
        UDISE_Code: udiseCode, // **send localStorage udiseCode, not manually entered**
      });
      toast.success(response.data.message);
      setTeacherName('');
      setPhoneNumber('');
      setEmail('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };



  return (
    <>
      <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold rounded-md shadow-sm animate-pulse">
        📢  Additional Guide Teachers and ATL Lab In-Charges can also register individually
      </div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">


        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-red-800 mb-6">Register Guide Teacher</h2>
          <form>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Teacher Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ''))} // only digits allowed while typing
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">UDISE Code</label>
                <input
                  type="text"
                  maxLength={11}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={udiseCode}
                  onChange={(e) => setUdiseCode(e.target.value.replace(/\D/, ''))} // only digits allowed while typing
                  disabled
                />
              </div>

              <div>
                <button
                  type="button"
                  className="w-full py-2 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={handleRegister}
                >
                  Register Teacher
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Toast Container for success and error messages */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="relative z-[9999]" // ✅ Toast ku higher z-index
          bodyClassName="relative z-[9999]"
        />

      </div>
    </>
  );
};

export default RegisterGuideTeacher;
