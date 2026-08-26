// // import React, { useState } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { User, Lock, Loader, AlertCircle } from 'lucide-react';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import axios from 'axios';
// // import VITE_BASE_URL from '../config/api';

// // export default function EvaluatorLogin() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [credentials, setCredentials] = useState({ username: '', password: '' });
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const successMessage = location.state?.message;


// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post(`${VITE_BASE_URL}/evaluator/login`, credentials);
// //       const evaluator = response.data.evaluator;

// //       localStorage.setItem('evaluatorToken', response.data.token);
// //       localStorage.setItem('evaluatorId', evaluator._id);
// //       localStorage.setItem('evaluatorName', evaluator.username);
// //       localStorage.setItem('evaluatorUserName', evaluator.phone);
// //       localStorage.setItem('evaluatorDetails', JSON.stringify(evaluator));

// //       navigate('/evaluator-dashboard');
// //     } catch (err: any) {
// //       if (err.response && err.response.data && err.response.data.message) {
// //         // If error from backend (e.g., 403 = pending approval)
// //         setError(err.response.data.message); // Show message from backend
// //         toast.error(err.response.data.message); // Show toast notification
// //       } else {
// //         setError('An unexpected error occurred. Please try again.');
// //       }
// //     }
// //   };



// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Evaluator Login</h2>
// //         <p className="mt-2 text-center text-sm text-gray-600">Sign in to access your evaluator dashboard</p>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           {successMessage && (
// //             <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
// //               <div className="flex">
// //                 <div className="flex-shrink-0">
// //                   <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                   </svg>
// //                 </div>
// //                 <p className="ml-3 text-sm text-green-700">{successMessage}</p>
// //               </div>
// //             </div>
// //           )}

// //           {error && (
// //             <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
// //               <div className="flex">
// //                 <AlertCircle className="h-5 w-5 text-red-500" />
// //                 <p className="ml-3 text-sm text-red-700">{error}</p>
// //               </div>
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Username
// //               </label>
// //               <div className="relative">
// //                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //                 <input
// //                   type="text"
// //                   inputMode="numeric"
// //                   pattern="[0-9]{10}"
// //                   maxLength={10}
// //                   autoComplete="new-username"
// //                   required
// //                   className="w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm 
// //                  border-gray-300 placeholder-gray-400 
// //                  transition duration-150 ease-in-out"
// //                   placeholder="Enter 10-digit phone number"
// //                   value={credentials.username}
// //                   onChange={(e) => {
// //                     const value = e.target.value;
// //                     if (/^\d{0,10}$/.test(value)) {
// //                       setCredentials({ ...credentials, username: value });
// //                     }
// //                   }}
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //                 <input
// //                   type="password"
// //                   autoComplete="new-password"
// //                   required
// //                   className="w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm 
// //                  border-gray-300 placeholder-gray-400 
// //                  transition duration-150 ease-in-out"
// //                   placeholder="Enter your password"
// //                   value={credentials.password}
// //                   onChange={(e) => {
// //                     const value = e.target.value;
// //                     setCredentials({ ...credentials, password: value });
// //                   }}
// //                 />
// //               </div>
// //             </div>




// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <Loader className="animate-spin h-5 w-5 mr-3" />
// //                     Signing in...
// //                   </>
// //                 ) : (
// //                   'Sign in'
// //                 )}
// //               </button>
// //             </div>
// //           </form>

// //           <div className="mt-6">
// //             <div className="relative">
// //               <div className="absolute inset-0 flex items-center">
// //                 <div className="w-full border-t border-gray-300" />
// //               </div>
// //               <div className="relative flex justify-center text-sm">
// //                 <span className="px-2 bg-white text-gray-500">Not registered yet?</span>
// //               </div>
// //             </div>

// //             <div className="mt-6">
// //               <button
// //                 onClick={() => navigate('/evaluator-register')}
// //                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
// //               >
// //                 Register as an evaluator
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <ToastContainer position="top-right" autoClose={3000} />

// //     </div>
// //   );
// // }


// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { User, Lock, Loader, AlertCircle, EyeOff, Eye } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import VITE_BASE_URL from '../config/api';

// export default function EvaluatorLogin() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const successMessage = location.state?.message;
//   const [phoneError, setPhoneError] = useState('');

//   const isFormValid =
//     credentials.username.length === 10 && credentials.password.length > 0;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await axios.post(`${VITE_BASE_URL}/evaluator/login`, credentials);
//       const evaluator = response.data.evaluator;

//       localStorage.setItem('evaluatorToken', response.data.token);
//       localStorage.setItem('evaluatorId', evaluator._id);
//       localStorage.setItem('evaluatorName', evaluator.username);
//       localStorage.setItem('evaluatorUserName', evaluator.phone);
//       localStorage.setItem('evaluatorDetails', JSON.stringify(evaluator));

//       navigate('/evaluator-dashboard');
//     } catch (err) {
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//         toast.error(err.response.data.message);
//       } else {
//         setError('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Evaluator Login
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Sign in to access your evaluator dashboard
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {successMessage && (
//             <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
//               <p className="text-sm text-green-700">{successMessage}</p>
//             </div>
//           )}

//           {error && (
//             <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
//             {/* Username */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <User
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={10}
//                   autoComplete="new-username"
//                   required
//                   className={`w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm 
//       placeholder-gray-400 transition duration-150 ease-in-out
//       ${error ? 'border-red-500' : 'border-gray-300'}`}
//                   placeholder="Enter 10-digit phone number"
//                   value={credentials.username}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, '');
//                     if (value.length <= 10) {
//                       setCredentials({ ...credentials, username: value });

//                       // ✅ Validation check
//                       if (value && !/^[6-9]/.test(value)) {
//                         setPhoneError('Phone number must start with digits 6 to 9.');
//                       } else if (value.length > 0 && value.length < 10) {
//                         setPhoneError('Phone number must be 10 digits.');
//                       } else {
//                         setPhoneError('');
//                       }
//                     }
//                   }}
//                 />
//               </div>

//               {/* 🔴 Error message display */}
//               {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
//             </div>


//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password <span className="text-red-500"> * </span>
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   inputMode="numeric"
//                   maxLength={10}
//                   autoComplete="new-password"
//                   required
//                   className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm 
//                   border-gray-300 placeholder-gray-400 
//                   transition duration-150 ease-in-out"
//                   placeholder="Enter 10-digit phone number"
//                   value={credentials.password}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, '');
//                     setCredentials({ ...credentials, password: value });
//                   }}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Sign in Button */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={!isFormValid || isLoading}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
//                   ${isFormValid ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'} 
//                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader className="animate-spin h-5 w-5 mr-3" />
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Register Section */}
//           <div className="mt-6">
//             <div className="flex items-center w-full">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
//                 Not registered yet?
//               </span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>


//             <button
//               onClick={() => navigate('/evaluator-register')}
//               className="mt-6 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
//               text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             >
//               Register as an evaluator
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Loader, AlertCircle, EyeOff, Eye } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import VITE_BASE_URL from '../config/api';

export default function EvaluatorLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const successMessage = location.state?.message;
  const [phoneError, setPhoneError] = useState('');

  // Now also require phoneError to be empty
  const isFormValid =
    credentials.username.length === 10 &&
    credentials.password.length > 0 &&
    phoneError === '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submit if phone validation failed
    if (phoneError) {
      setError('Please fix the phone number before signing in.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${VITE_BASE_URL}/evaluator/login`, credentials);
      const evaluator = response.data.evaluator;

      localStorage.setItem('evaluatorToken', response.data.token);
      localStorage.setItem('evaluatorId', evaluator._id);
      localStorage.setItem('evaluatorName', evaluator.username);
      localStorage.setItem('evaluatorUserName', evaluator.phone);
      localStorage.setItem('evaluatorDetails', JSON.stringify(evaluator));

      navigate('/evaluator-dashboard');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Evaluator Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your evaluator dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="new-username"
                  required
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm 
      placeholder-gray-400 transition duration-150 ease-in-out
      ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter 10-digit phone number"
                  value={credentials.username}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setCredentials({ ...credentials, username: value });

                      // Validation: must start with 6-9
                      if (value && !/^[6-9]/.test(value)) {
                        setPhoneError('Phone number must start with digits 6 to 9.');
                      } else if (value.length > 0 && value.length < 10) {
                        setPhoneError('Phone number must be 10 digits.');
                      } else {
                        setPhoneError('');
                      }
                    }
                  }}
                />
              </div>

              {/* 🔴 Error message display */}
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm 
                  border-gray-300 placeholder-gray-400 
                  transition duration-150 ease-in-out"
                  placeholder="Enter your password"
                  maxLength={10}
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials({ ...credentials, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign in Button */}
            <div>
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isFormValid ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-3" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Register Section */}
          <div className="mt-6">
            <div className="flex items-center w-full">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                Not registered yet?
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={() => navigate('/evaluator-register')}
              className="mt-6 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
              text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Register as an evaluator
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
