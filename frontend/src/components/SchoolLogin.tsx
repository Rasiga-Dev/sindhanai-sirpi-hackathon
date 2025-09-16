

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { School, Lock, Loader } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SchoolLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [udiseCode, setUdiseCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const successMessage = location.state?.message;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:11129/api/schools/login', {
        udiseCode,
        password,
      });

      // Check if the response contains the expected data
      if (res.data?.token && res.data?.school) {
        // Store the token in localStorage
        localStorage.setItem('schoolToken', res.data.token);

        // Store school details in localStorage (Optional)
        localStorage.setItem('schoolDetails', JSON.stringify(res.data.school));
        console.log(res.data.school,"res.data.school");
        localStorage.setItem("udiseCode", res.data.school.udiseCode); // 👈 Save to localStorage


        toast.success('Login successful! Redirecting to dashboard...');

        // Delay before redirect to allow the toast to show
        setTimeout(() => {
          navigate('/dashboard'); // Ensure this path matches your route
        }, 1500);
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err: any) {
      // Log the full error for better debugging
      console.error(err);

      const errorMessage = err.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  const handleUdiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // Remove non-digits
    if (numericValue.length <= 11) {
      setUdiseCode(numericValue);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-red-50 rounded-full">
            <School className="h-12 w-12 text-red-800" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          School Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your school dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                UDISE Code
              </label>
              <div className="mt-1 relative">
                <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={udiseCode}
                  onChange={handleUdiseChange}
                  maxLength={11}
                  placeholder="Enter your UDISE code"
                  autoFocus
                  name="fake-username" // important
                  autoComplete="new-password"
                  className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-800 focus:border-red-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="fake-password" // important
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-800 focus:border-red-800"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-800 focus:ring-red-800 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="font-medium text-red-800 hover:text-red-700"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="font-medium text-red-800 hover:text-red-700"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
