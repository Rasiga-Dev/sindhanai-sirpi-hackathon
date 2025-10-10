
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css'; // Import default styles
// // import VITE_BASE_URL from '../config/api';

// // const RegisterGuideTeacher = () => {
// //   const [teacherName, setTeacherName] = useState('');
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [udiseCode, setUdiseCode] = useState('');

// //   const validateFields = () => {
// //     if (!teacherName || !phoneNumber || !email || !udiseCode) {
// //       toast.error('All fields are required');
// //       return false;
// //     }

// //     const nameRegex = /^[A-Za-z\s]+$/;
// //     if (!nameRegex.test(teacherName)) {
// //       toast.error('Teacher name should contain only letters');
// //       return false;
// //     }

// //     const phoneRegex = /^[0-9]{10}$/;
// //     if (!phoneRegex.test(phoneNumber)) {
// //       toast.error('Phone number must be exactly 10 digits');
// //       return false;
// //     }

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(email)) {
// //       toast.error('Invalid email format');
// //       return false;
// //     }

// //     const udiseRegex = /^[0-9]{11}$/;
// //     if (!udiseRegex.test(udiseCode)) {
// //       toast.error('UDISE code must be exactly 11 digits');
// //       return false;
// //     }

// //     return true;
// //   };


// //   useEffect(() => {
// //     const details = localStorage.getItem('schoolDetails');
// //     if (details) {
// //       const school = JSON.parse(details);
// //       setUdiseCode(school.udiseCode); // **Set udiseCode from localStorage**
// //     }
// //   }, []);

// //   const handleRegister = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(`${VITE_BASE_URL}/school/register-guide-teacher`, {
// //         teacherName,
// //         phoneNumber,
// //         email,
// //         UDISE_Code: udiseCode, // **send localStorage udiseCode, not manually entered**
// //       });
// //       toast.success(response.data.message);
// //       setTeacherName('');
// //       setPhoneNumber('');
// //       setEmail('');
// //     } catch (error: any) {
// //       toast.error(error.response?.data?.message || 'Registration failed');
// //     }
// //   };



// //   return (
// //     <>
// //       <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold rounded-md shadow-sm animate-pulse">
// //         📢  Additional Guide Teachers and Lab In-Charges can also register individually
// //       </div>
// //       <div className="flex justify-center items-center min-h-screen bg-gray-100">


// //         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
// //           <h2 className="text-2xl font-semibold text-center text-red-800 mb-6">Register Guide Teacher</h2>
// //           <form>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">Teacher Name <span className="text-red-500">*</span></label>
// //                 <input
// //                   type="text"
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                   value={teacherName}
// //                   onChange={(e) => setTeacherName(e.target.value)}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
// //                 <input
// //                   type="tel"
// //                   maxLength={10}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                   value={phoneNumber}
// //                   onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ''))} // only digits allowed while typing
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
// //                 <input
// //                   type="email"
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">UDISE Code <span className="text-red-500">*</span></label>
// //                 <input
// //                   type="text"
// //                   maxLength={11}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                   value={udiseCode}
// //                   onChange={(e) => setUdiseCode(e.target.value.replace(/\D/, ''))} // only digits allowed while typing
// //                   disabled
// //                 />
// //               </div>

// //               <div>
// //                 <button
// //                   type="button"
// //                   className="w-full py-2 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
// //                   onClick={handleRegister}
// //                 >
// //                   Register Teacher
// //                 </button>
// //               </div>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Toast Container for success and error messages */}
// //         <ToastContainer
// //           position="bottom-right"
// //           autoClose={3000}
// //           newestOnTop={true}
// //           closeOnClick
// //           pauseOnHover
// //           draggable
// //           toastClassName="relative z-[9999]" // ✅ Toast ku higher z-index
// //           bodyClassName="relative z-[9999]"
// //         />

// //       </div>
// //     </>
// //   );
// // };

// // export default RegisterGuideTeacher;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import default styles
// import VITE_BASE_URL from '../config/api';

// const RegisterGuideTeacher = () => {
//   const [teacherName, setTeacherName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [udiseCode, setUdiseCode] = useState('');

//   const [formErrors, setFormErrors] = useState({
//     teacherName: '',
//     phoneNumber: '',
//     email: '',
//     udiseCode: '',
//   });

//   useEffect(() => {
//     const details = localStorage.getItem('schoolDetails');
//     if (details) {
//       const school = JSON.parse(details);
//       // set udiseCode from localStorage (keep disabled in UI)
//       setUdiseCode(school.udiseCode || '');
//     }
//   }, []);

//   // live validation helpers
//   const validateName = (name: string) => {
//     const trimmed = name.trim();
//     if (!trimmed) return 'Teacher name is required';
//     if (!/^[A-Za-z\s]+$/.test(trimmed)) return 'Name should contain only letters and spaces';
//     return '';
//   };

//   const validatePhone = (phone: string) => {
//     if (!phone) return 'Phone number is required';
//     if (!/^[6-9]\d{9}$/.test(phone)) return 'Phone must be 10 digits and start with 6-9';
//     return '';
//   };

//   const validateEmail = (em: string) => {
//     if (!em) return 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return 'Invalid email format';
//     return '';
//   };

//   const validateUdise = (u: string) => {
//     if (!u) return 'UDISE code is required';
//     if (!/^\d{11}$/.test(u)) return 'UDISE code must be exactly 11 digits';
//     return '';
//   };

//   // input handlers with allowed-characters enforcement + live error set
//   const handleNameChange = (v: string) => {
//     // allow only letters and spaces while typing
//     if (/^[A-Za-z\s]*$/.test(v)) {
//       setTeacherName(v);
//       setFormErrors((prev) => ({ ...prev, teacherName: validateName(v) }));
//     }
//   };

//   const handlePhoneChange = (v: string) => {
//     // digits only
//     const digits = v.replace(/\D/g, '').slice(0, 10);
//     setPhoneNumber(digits);
//     setFormErrors((prev) => ({ ...prev, phoneNumber: digits.length === 0 ? 'Phone number is required' : (digits.length < 10 ? 'Phone must be exactly 10 digits' : ( /^[6-9]\d{9}$/.test(digits) ? '' : 'Phone must start with 6-9' ))}));
//   };

//   const handleEmailChange = (v: string) => {
//     setEmail(v);
//     setFormErrors((prev) => ({ ...prev, email: validateEmail(v) }));
//   };

//   // UDISE is filled from localStorage and disabled; still validate
//   const handleUdiseChange = (v: string) => {
//     const digits = v.replace(/\D/g, '').slice(0, 11);
//     setUdiseCode(digits);
//     setFormErrors((prev) => ({ ...prev, udiseCode: validateUdise(digits) }));
//   };

//   const validateFields = () => {
//     const nameErr = validateName(teacherName);
//     const phoneErr = validatePhone(phoneNumber);
//     const emailErr = validateEmail(email);
//     const udiseErr = validateUdise(udiseCode);

//     setFormErrors({
//       teacherName: nameErr,
//       phoneNumber: phoneErr,
//       email: emailErr,
//       udiseCode: udiseErr,
//     });

//     if (nameErr || phoneErr || emailErr || udiseErr) {
//       // show first error as toast for quick feedback (optional)
//       const first = nameErr || phoneErr || emailErr || udiseErr;
//       toast.error(first);
//       return false;
//     }
//     return true;
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateFields()) return;

//     try {
//       const response = await axios.post(`${VITE_BASE_URL}/school/register-guide-teacher`, {
//         teacherName: teacherName.trim(),
//         phoneNumber,
//         email: email.trim(),
//         UDISE_Code: udiseCode, // send localStorage udiseCode
//       });

//       toast.success(response.data.message || 'Teacher registered successfully');
//       // clear inputs after success
//       setTeacherName('');
//       setPhoneNumber('');
//       setEmail('');
//       // keep udiseCode as it's from localStorage

//       // clear errors
//       setFormErrors({ teacherName: '', phoneNumber: '', email: '', udiseCode: '' });
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <>
//       <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold rounded-md shadow-sm animate-pulse">
//         📢  Additional Guide Teachers and Lab In-Charges can also register individually
//       </div>
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-center text-red-800 mb-6">Register Guide Teacher</h2>
//           <form onSubmit={handleRegister}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Teacher Name <span className="text-red-500">*</span></label>
//                 <input
//                   type="text"
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.teacherName ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'}`}
//                   value={teacherName}
//                   onChange={(e) => handleNameChange(e.target.value)}
//                   placeholder="Enter teacher name"
//                 />
//                 {formErrors.teacherName && <p className="text-red-600 text-sm mt-1">{formErrors.teacherName}</p>}
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
//                 <input
//                   type="tel"
//                   maxLength={10}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.phoneNumber ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'}`}
//                   value={phoneNumber}
//                   onChange={(e) => handlePhoneChange(e.target.value)}
//                   placeholder="Enter 10-digit phone number"
//                 />
//                 {formErrors.phoneNumber && <p className="text-red-600 text-sm mt-1">{formErrors.phoneNumber}</p>}
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
//                 <input
//                   type="email"
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'}`}
//                   value={email}
//                   onChange={(e) => handleEmailChange(e.target.value)}
//                   placeholder="Enter email"
//                 />
//                 {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">UDISE Code <span className="text-red-500">*</span></label>
//                 <input
//                   type="text"
//                   maxLength={11}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.udiseCode ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'}`}
//                   value={udiseCode}
//                   onChange={(e) => handleUdiseChange(e.target.value)}
//                   disabled
//                 />
//                 {formErrors.udiseCode && <p className="text-red-600 text-sm mt-1">{formErrors.udiseCode}</p>}
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full py-2 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                   Register Teacher
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         <ToastContainer
//           position="bottom-right"
//           autoClose={3000}
//           newestOnTop={true}
//           closeOnClick
//           pauseOnHover
//           draggable
//           toastClassName="relative z-[9999]" // higher z-index for toast
//           bodyClassName="relative z-[9999]"
//         />
//       </div>
//     </>
//   );
// };

// export default RegisterGuideTeacher;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VITE_BASE_URL from '../config/api';

const RegisterGuideTeacher: React.FC = () => {
  const [teacherName, setTeacherName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [udiseCode, setUdiseCode] = useState('');

  const [errors, setErrors] = useState({
    teacherName: '',
    phoneNumber: '',
    email: '',
    udiseCode: '',
  });

  // touched controls whether to show inline error for each field
  const [touched, setTouched] = useState({
    teacherName: false,
    phoneNumber: false,
    email: false,
    udiseCode: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // load udiseCode from localStorage on mount
  useEffect(() => {
    const details = localStorage.getItem('schoolDetails');
    if (details) {
      const school = JSON.parse(details);
      setUdiseCode(school.udiseCode || '');
    } else {
      setUdiseCode(''); // will be validated but not shown until touched
    }
  }, []);

  // validators
  const validateName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return 'Teacher name is required';
    if (trimmed.length < 3) return 'Name must be at least 3 characters';
    if (trimmed.length > 50) return 'Name cannot exceed 50 characters';
    if (!/^[A-Za-z\s]+$/.test(trimmed)) return 'Name should contain only letters and spaces';
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) return 'Phone number is required';
    if (!/^\d{10}$/.test(phone)) return 'Phone must be exactly 10 digits';
    if (!/^[6-9]\d{9}$/.test(phone)) return 'Phone must start with 6-9';
    return '';
  };

  const validateEmail = (em: string) => {
    if (!em) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return 'Invalid email format';
    return '';
  };

  const validateUdise = (u: string) => {
    if (!u) return 'UDISE code is required';
    if (!/^\d{11}$/.test(u)) return 'UDISE code must be exactly 11 digits';
    return '';
  };

  // central validate function (returns errors object)
  const getErrors = (name: string, phone: string, mail: string, udise: string) => {
    return {
      teacherName: validateName(name),
      phoneNumber: validatePhone(phone),
      email: validateEmail(mail),
      udiseCode: validateUdise(udise),
    };
  };

  // validate on every change, but DO NOT show messages until touched[field] is true
  useEffect(() => {
    const next = getErrors(teacherName, phoneNumber, email, udiseCode);
    setErrors(next);
    setIsFormValid(!next.teacherName && !next.phoneNumber && !next.email && !next.udiseCode);
  }, [teacherName, phoneNumber, email, udiseCode]);

  // Controlled input handlers (enforce allowed chars while typing)
  const handleNameChange = (val: string) => {
    // allow letters and spaces only, and limit to 50 chars
    if (/^[A-Za-z\s]*$/.test(val) && val.length <= 50) {
      setTeacherName(val);
      if (!touched.teacherName) setTouched((t) => ({ ...t, teacherName: true }));
    }
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(digits);
    if (!touched.phoneNumber) setTouched((t) => ({ ...t, phoneNumber: true }));
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (!touched.email) setTouched((t) => ({ ...t, email: true }));
  };

  // if you ever want user to be able to edit udise (usually disabled), you can set touched there too.
  // we won't mark udise touched automatically (user didn't type it), but if you want to show its error only after an attempt to submit, we handle that in handleRegister.

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // mark all fields touched so errors show if user tried to submit with invalid
    setTouched({ teacherName: true, phoneNumber: true, email: true, udiseCode: true });

    // final guard using latest validations
    const finalErrors = getErrors(teacherName, phoneNumber, email, udiseCode);
    setErrors(finalErrors);
    const ok = !finalErrors.teacherName && !finalErrors.phoneNumber && !finalErrors.email && !finalErrors.udiseCode;
    if (!ok) {
      toast.error('Please fix form errors before submitting.');
      return;
    }

    try {
      const res = await axios.post(`${VITE_BASE_URL}/school/register-guide-teacher`, {
        teacherName: teacherName.trim(),
        phoneNumber,
        email: email.trim(),
        UDISE_Code: udiseCode,
      });
      toast.success(res.data.message || 'Teacher registered successfully');
      // reset inputs (keep udise)
      setTeacherName('');
      setPhoneNumber('');
      setEmail('');
      // reset touched so errors hide again after successful submit
      setTouched({ teacherName: false, phoneNumber: false, email: false, udiseCode: false });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold rounded-md shadow-sm animate-pulse">
        📢 Additional Guide Teachers and Lab In-Charges can also register individually
      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-red-800 mb-6">Register Guide Teacher</h2>

          <form onSubmit={handleRegister} noValidate>
            <div className="space-y-4">
              {/* Teacher Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Teacher Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    touched.teacherName && errors.teacherName ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'
                  }`}
                  value={teacherName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter teacher name (3-50 letters)"
                />
                {touched.teacherName && errors.teacherName && (
                  <p className="text-red-600 text-sm mt-1">{errors.teacherName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    touched.phoneNumber && errors.phoneNumber ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'
                  }`}
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Enter 10-digit phone number (starts with 6-9)"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    touched.email && errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'
                  }`}
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Enter email"
                />
                {touched.email && errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* UDISE Code */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  UDISE Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={11}
                  disabled
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-gray-100 ${
                    touched.udiseCode && errors.udiseCode ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-red-500'
                  }`}
                  value={udiseCode}
                />
                {touched.udiseCode && errors.udiseCode && (
                  <p className="text-red-600 text-sm mt-1">{errors.udiseCode}</p>
                )}
              </div>

              {/* Register Button */}
              <div>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    isFormValid ? 'bg-red-800 text-white hover:bg-red-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  Register Teacher
                </button>
              </div>
            </div>
          </form>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="relative z-[9999]"
          bodyClassName="relative z-[9999]"
        />
      </div>
    </>
  );
};

export default RegisterGuideTeacher;

