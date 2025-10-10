// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import VITE_BASE_URL from '../config/api';

// interface FormData {
//   udiseCode: string;
//   schoolName: string;
//   email: string;
//   district: string;
//   password: string;
//   confirmPassword: string;
//   hmName: string;
//   hmEmail: string;
//   hmMobile: string;
// }


// const SignupForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     udiseCode: '',
//     schoolName: '',
//     email: '',
//     district: '',
//     password: '',
//     confirmPassword: '',
//     hmName: '',
//     hmEmail: '',
//     hmMobile: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmError, setConfirmError] = useState('');



//   const handleUDISEChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const code = e.target.value;

//     // Allow only digits and max 11 characters
//     if (!/^\d{0,11}$/.test(code)) return;

//     setFormData({ ...formData, udiseCode: code });

//     // Trigger API only when exactly 11 digits
//     if (code.length === 11) {
//       try {
//         const res = await axios.get(`${VITE_BASE_URL}/schools/udise/${code}`);
//         const { School_Name, Email_ID, District } = res.data;
//         setFormData((prev) => ({
//           ...prev,
//           schoolName: School_Name,
//           email: Email_ID,
//           district: District,
//         }));
//       } catch (err) {
//         setFormData((prev) => ({
//           ...prev,
//           schoolName: '',
//           email: '',
//           district: '',
//         }));
//       }
//     }
//   };


//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const pwd = e.target.value;
//     setFormData({ ...formData, password: pwd });

//     const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     if (!strongPwdRegex.test(pwd)) {
//       setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
//     } else {
//       setPasswordError('');
//     }

//     if (formData.confirmPassword && pwd !== formData.confirmPassword) {
//       setConfirmError('Passwords do not match');
//     } else {
//       setConfirmError('');
//     }
//   };

//   const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const confirmPwd = e.target.value;
//     setFormData({ ...formData, confirmPassword: confirmPwd });

//     if (formData.password !== confirmPwd) {
//       setConfirmError('Passwords do not match');
//     } else {
//       setConfirmError('');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Final client-side validations before API call
//     const hmMobileValid = /^[6-9]\d{9}$/.test(formData.hmMobile);
//     const hmNameValid = /^[A-Za-z\s]{2,50}$/.test(formData.hmName.trim());

//     if (!hmNameValid) {
//       toast.error("HM/Principal name is invalid. Only letters and spaces allowed (2-50 chars).");
//       return;
//     }

//     if (!hmMobileValid) {
//       toast.error("HM/Principal mobile must be 10 digits and start with 6-9.");
//       return;
//     }

//     if (passwordError || confirmError) {
//       toast.error("Please fix password errors before submitting.");
//       return;
//     }

//     // existing API call code follows...
//     try {
//       const res = await axios.post(`${VITE_BASE_URL}/schools/register`, {
//         udiseCode: formData.udiseCode,
//         password: formData.password,
//         hmName: formData.hmName,
//         hmEmail: formData.hmEmail,
//         hmMobile: formData.hmMobile,
//         // include other fields if needed
//       });

//       toast.success(res.data.message || 'Registration successful!');

//       setFormData({
//         udiseCode: '',
//         schoolName: '',
//         email: '',
//         district: '',
//         password: '',
//         confirmPassword: '',
//         hmName: '',
//         hmEmail: '',
//         hmMobile: '',
//       });

//       setPasswordError('');
//       setConfirmError('');
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || 'Something went wrong');
//       // keep fields so user can correct; optional: don't clear fields on error
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex">
//         {/* Left Side - Login Icon */}
//         <div className="w-1/2 bg-red-800 flex flex-col items-center justify-center text-white p-10">
//           <FaSignInAlt className="text-9xl mb-4" />
//           <h2 className="text-3xl font-bold">Welcome!</h2>
//           <p className="mt-2 text-lg">Please sign up to continue</p>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div className="w-1/2 p-10">
//           <h2 className="text-3xl font-bold mb-6 text-red-800 text-center">School Signup</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">

//             <div>
//               <label className="block text-sm font-medium text-gray-700">UDISE Code <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 value={formData.udiseCode}
//                 onChange={handleUDISEChange}
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
//                 placeholder="Enter UDISE Code"
//               />
//               {formData.udiseCode && formData.udiseCode.length !== 11 && (
//                 <p className="text-red-600 text-sm mt-1">UDISE Code must be exactly 11 digits</p>
//               )}

//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">School Name <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 value={formData.schoolName}
//                 readOnly
//                 className="w-full border bg-gray-100 rounded-lg px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 readOnly
//                 className="w-full border bg-gray-100 rounded-lg px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">District <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 value={formData.district}
//                 readOnly
//                 className="w-full border bg-gray-100 rounded-lg px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 HM/Principal Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.hmName}
//                 maxLength={50}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   // Allow only alphabets and spaces
//                   if (/^[A-Za-z\s]*$/.test(value)) {
//                     setFormData({ ...formData, hmName: value });
//                   }
//                 }}
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
//                 placeholder="Enter Headmaster/Principal Name"
//               />
//             </div>


//             <div>
//               <label className="block text-sm font-medium text-gray-700">HM/Principal Email <span className="text-red-500">*</span></label>
//               <input
//                 type="email"
//                 value={formData.hmEmail}
//                 onChange={(e) => {
//                   setFormData({ ...formData, hmEmail: e.target.value });
//                 }}
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
//                 placeholder="Enter Headmaster/Principal Email"
//               />
//               {formData.hmEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.hmEmail) && (
//                 <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
//               )}
//             </div>


//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 HM/Principal Mobile <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 value={formData.hmMobile}
//                 onChange={(e) => {
//                   const value = e.target.value;

//                   // Allow only digits up to 10
//                   if (/^\d{0,10}$/.test(value)) {
//                     setFormData({ ...formData, hmMobile: value });
//                   }
//                 }}
//                 maxLength={10}
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
//                 placeholder="Enter Headmaster/Principal Mobile"
//               />

//               {/* Validation messages */}
//               {formData.hmMobile && !/^[6-9]/.test(formData.hmMobile) && (
//                 <p className="text-red-600 text-sm mt-1">Mobile number must start with 6–9</p>
//               )}
//               {formData.hmMobile && formData.hmMobile.length !== 10 && (
//                 <p className="text-red-600 text-sm mt-1">Mobile number must be exactly 10 digits</p>
//               )}
//             </div>





//             {/* Password Field */}
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handlePasswordChange}
//                 className="w-full border rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-red-800"
//                 placeholder="Enter strong password"
//                 autoComplete="new-password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((p) => !p)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-600 focus:outline-none"
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//               {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
//             </div>

//             {/* Confirm Field (same idea) */}
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">
//                 Confirm Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={handleConfirmChange}
//                 className="w-full border rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-red-800"
//                 placeholder="Re-enter password"
//                 autoComplete="new-password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword((p) => !p)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-600 focus:outline-none"
//                 aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//               {confirmError && <p className="text-red-600 text-sm mt-1">{confirmError}</p>}
//             </div>


//             <button
//               type="submit"
//               disabled={
//                 !!passwordError ||
//                 !!confirmError ||
//                 !/^[A-Za-z\s]{2,50}$/.test(formData.hmName.trim()) ||
//                 !/^[6-9]\d{9}$/.test(formData.hmMobile)
//               }
//               className={`w-full py-2 rounded-lg text-white font-semibold transition ${(passwordError || confirmError || !/^[A-Za-z\s]{2,50}$/.test(formData.hmName.trim()) || !/^[6-9]\d{9}$/.test(formData.hmMobile))
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-red-800 hover:bg-red-900'
//                 }`}
//             >
//               Sign Up
//             </button>

//           </form>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{' '}
//             <a href="/school-login" className="text-red-800 font-semibold hover:underline">
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SignupForm;



import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VITE_BASE_URL from '../config/api';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // helper: is form fully valid (all required fields present + formats ok)
  const isFormValid = () => {
    const udise = formData.udiseCode.trim();
    const school = formData.schoolName.trim();
    const email = formData.email.trim();
    const district = formData.district.trim();
    const hmName = formData.hmName.trim();
    const hmEmail = formData.hmEmail.trim();
    const hmMobile = formData.hmMobile.trim();
    const pwd = formData.password;
    const cpwd = formData.confirmPassword;

    // required non-empty
    if (!udise || !school || !email || !district || !hmName || !hmEmail || !hmMobile || !pwd || !cpwd) {
      return false;
    }

    // UDISE: exactly 11 digits
    if (!/^\d{11}$/.test(udise)) return false;

    // HM name: letters & spaces, 2-50 chars
    if (!/^[A-Za-z\s]{3,50}$/.test(hmName)) return false;

    // HM email: basic email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hmEmail)) return false;

    // HM mobile: start with 6-9 and 10 digits
    if (!/^[6-9]\d{9}$/.test(hmMobile)) return false;

    // password strength
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pwd)) return false;

    // confirm password match
    if (pwd !== cpwd) return false;

    // no password/confirm error states
    if (passwordError || confirmError) return false;

    return true;
  };

  const handleUDISEChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;

    // Allow only digits and max 11 characters
    if (!/^\d{0,11}$/.test(code)) return;

    setFormData({ ...formData, udiseCode: code });

    // Trigger API only when exactly 11 digits
    if (code.length === 11) {
      try {
        const res = await axios.get(`${VITE_BASE_URL}/schools/udise/${code}`);
        const { School_Name, Email_ID, District } = res.data;
        setFormData((prev) => ({
          ...prev,
          schoolName: School_Name || '',
          email: Email_ID || '',
          district: District || '',
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

    // final guard
    if (!isFormValid()) {
      toast.error('Please complete all required fields correctly before submitting.');
      return;
    }

    try {
      const res = await axios.post(`${VITE_BASE_URL}/schools/register`, {
        udiseCode: formData.udiseCode,
        password: formData.password,
        hmName: formData.hmName,
        hmEmail: formData.hmEmail,
        hmMobile: formData.hmMobile,
        // include other fields if needed
        schoolName: formData.schoolName,
        email: formData.email,
        district: formData.district,
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

      setPasswordError('');
      setConfirmError('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
      // keep fields so user can correct; optional: don't clear fields on error
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
              <label className="block text-sm font-medium text-gray-700">UDISE Code <span className="text-red-500">*</span></label>
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
              <label className="block text-sm font-medium text-gray-700">School Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.schoolName}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">District <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.district}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                HM/Principal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.hmName}
                maxLength={50}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only alphabets and spaces
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setFormData({ ...formData, hmName: value });
                  }
                }}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter Headmaster/Principal Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">HM/Principal Email <span className="text-red-500">*</span></label>
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
              <label className="block text-sm font-medium text-gray-700">
                HM/Principal Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.hmMobile}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only digits up to 10
                  if (/^\d{0,10}$/.test(value)) {
                    setFormData({ ...formData, hmMobile: value });
                  }
                }}
                maxLength={10}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
                placeholder="Enter Headmaster/Principal Mobile"
              />

              {/* Validation messages */}
              {formData.hmMobile && !/^[6-9]/.test(formData.hmMobile) && (
                <p className="text-red-600 text-sm mt-1">Mobile number must start with 6–9</p>
              )}
              {formData.hmMobile && formData.hmMobile.length !== 10 && (
                <p className="text-red-600 text-sm mt-1">Mobile number must be exactly 10 digits</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-800"
                  placeholder="Enter strong password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="relative mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleConfirmChange}
                  className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-800"
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {confirmError && <p className="text-red-600 text-sm mt-1">{confirmError}</p>}
            </div>



            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-2 rounded-lg text-white font-semibold transition ${!isFormValid() ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-800 hover:bg-red-900'}`}
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
