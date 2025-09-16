import React, { useState } from 'react';
import axios from 'axios';
import { FaSignInAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  udiseCode: string;
  schoolName: string;
  email: string;
  district: string;
  password: string;
  confirmPassword: string;
  hmName: string;
  hmEmail: string;
  hmMobile: string;
}


const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    udiseCode: '',
    schoolName: '',
    email: '',
    district: '',
    password: '',
    confirmPassword: '',
    hmName: '',
    hmEmail: '',
    hmMobile: '',
  });


  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const handleUDISEChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;

    // Allow only digits and max 11 characters
    if (!/^\d{0,11}$/.test(code)) return;

    setFormData({ ...formData, udiseCode: code });

    // Trigger API only when exactly 11 digits
    if (code.length === 11) {
      try {
        const res = await axios.get(`http://localhost:11129/api/schools/udise/${code}`);
        const { School_Name, Email_ID, District } = res.data;
        setFormData((prev) => ({
          ...prev,
          schoolName: School_Name,
          email: Email_ID,
          district: District,
        }));
      } catch (err) {
        setFormData((prev) => ({
          ...prev,
          schoolName: '',
          email: '',
          district: '',
        }));
      }
    }
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });

    const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPwdRegex.test(pwd)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
    } else {
      setPasswordError('');
    }

    if (formData.confirmPassword && pwd !== formData.confirmPassword) {
      setConfirmError('Passwords do not match');
    } else {
      setConfirmError('');
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPwd = e.target.value;
    setFormData({ ...formData, confirmPassword: confirmPwd });

    if (formData.password !== confirmPwd) {
      setConfirmError('Passwords do not match');
    } else {
      setConfirmError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordError && !confirmError) {
      try {
        const res = await axios.post('http://localhost:11129/api/schools/register', {
          udiseCode: formData.udiseCode,
          password: formData.password,
          hmName: formData.hmName,
          hmEmail: formData.hmEmail,
          hmMobile: formData.hmMobile,
        });


        toast.success(res.data.message || 'Registration successful!');
        
        setFormData({
          udiseCode: '',
          schoolName: '',
          email: '',
          district: '',
          password: '',
          confirmPassword: '',
          hmName: '',
          hmEmail: '',
          hmMobile: '',
        });


      // also clear errors
      setPasswordError('');
      setConfirmError('');


      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Something went wrong');
         setFormData({
          udiseCode: '',
          schoolName: '',
          email: '',
          district: '',
          password: '',
          confirmPassword: '',
          hmName: '',
          hmEmail: '',
          hmMobile: '',
        });


      // also clear errors
      setPasswordError('');
      setConfirmError('');

      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left Side - Login Icon */}
        <div className="w-1/2 bg-red-800 flex flex-col items-center justify-center text-white p-10">
          <FaSignInAlt className="text-9xl mb-4" />
          <h2 className="text-3xl font-bold">Welcome!</h2>
          <p className="mt-2 text-lg">Please sign up to continue</p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6 text-red-800 text-center">School Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700">UDISE Code</label>
              <input
                type="text"
                value={formData.udiseCode}
                onChange={handleUDISEChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter UDISE Code"
              />
              {formData.udiseCode && formData.udiseCode.length !== 11 && (
                <p className="text-red-600 text-sm mt-1">UDISE Code must be exactly 11 digits</p>
              )}

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input
                type="text"
                value={formData.schoolName}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                value={formData.district}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">HM/Principal Name</label>
              <input
                type="text"
                value={formData.hmName}
                onChange={(e) => setFormData({ ...formData, hmName: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter Headmaster/Principal Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">HM/Principal Email</label>
              <input
                type="email"
                value={formData.hmEmail}
                onChange={(e) => {
                  setFormData({ ...formData, hmEmail: e.target.value });
                }}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter Headmaster/Principal Email"
              />
              {formData.hmEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.hmEmail) && (
                <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
              )}
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">HM/Principal Mobile</label>
              <input
                type="tel"
                value={formData.hmMobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setFormData({ ...formData, hmMobile: value });
                  }
                }}
                maxLength={10}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter Headmaster/Principal Mobile"
              />
              {formData.hmMobile && formData.hmMobile.length < 10 && (
                <p className="text-red-600 text-sm mt-1">Mobile number must be 10 digits</p>
              )}
            </div>




            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter strong password"
              />
              {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={handleConfirmChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Re-enter password"
              />
              {confirmError && <p className="text-red-600 text-sm mt-1">{confirmError}</p>}
            </div>

            <button
              type="submit"
              disabled={!!passwordError || !!confirmError}
              className={`w-full py-2 rounded-lg text-white font-semibold transition ${passwordError || confirmError ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-800 hover:bg-red-900'
                }`}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/school-login" className="text-red-800 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignupForm;
