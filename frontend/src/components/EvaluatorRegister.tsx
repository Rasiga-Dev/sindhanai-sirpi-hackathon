// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Mail, Phone, BookOpen, Loader, AlertCircle } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import VITE_BASE_URL from '../config/api';

// export default function EvaluatorRegister() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     district: '',
//     expertise: ['']
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleExpertiseChange = (index: number, value: string) => {
//     const newExpertise = [...formData.expertise];
//     newExpertise[index] = value;
//     setFormData({ ...formData, expertise: newExpertise });
//   };

//   const addExpertiseField = () => {
//     setFormData({ ...formData, expertise: [...formData.expertise, ''] });
//   };

//   const removeExpertiseField = (index: number) => {
//     const newExpertise = formData.expertise.filter((_, i) => i !== index);
//     setFormData({ ...formData, expertise: newExpertise });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const response = await axios.post(`${VITE_BASE_URL}/evaluator/register`, {
//         username: formData.username,
//         email: formData.email,
//         phone: formData.phone,
//         district: formData.district,
//         expertise: formData.expertise.filter(exp => exp.trim() !== '')
//       });

//       navigate('/evaluator-login', {
//         state: { message: response.data.message }
//       });
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* Left Column - Image */}
//       <div className="hidden lg:block bg-cover bg-center" style={{ backgroundImage: "url('/eval-register.png')" }}>
//       </div>

//       {/* Right Column - Form */}
//       <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
//         <div className="w-full max-w-xl bg-white p-10 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Evaluator Registration</h2>

//           {error && (
//             <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
//               <AlertCircle className="w-5 h-5 mr-2" />
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Username */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Username</label>
//               <div className="relative mt-1">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <User className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   required
//                   className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.username}
//                   onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                   placeholder='Enter your username'
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <div className="relative mt-1">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <Mail className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   required
//                   className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder='Enter your email'
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//               <div className="relative mt-1">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <Phone className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   required
//                   pattern="[0-9]{10}"
//                   maxLength={10}
//                   inputMode="numeric"
//                   placeholder="10-digit number"
//                   className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.phone}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (/^\d{0,10}$/.test(value)) {
//                       setFormData({ ...formData, phone: value });
//                     }
//                   }}
//                 />

//               </div>
//             </div>

//             {/* District Dropdown */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">District</label>
//               <div className="relative mt-1">
//                 <select
//                   required
//                   value={formData.district}
//                   onChange={(e) => setFormData({ ...formData, district: e.target.value })}
//                   className="py-2 px-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                 >
//                   <option value="" disabled>Select your district</option>
//                   <option value="Tenkasi">Tenkasi</option>
//                   <option value="Tirunelveli">Tirunelveli</option>
//                   <option value="Thoothukkudi">Thoothukkudi</option>
//                   <option value="Madurai">Madurai</option>
//                   <option value="Kanniyakumari">Kanniyakumari</option>
//                   <option value="Virudhunagar">Virudhunagar</option>
//                   <option value="Dindigul">Dindigul</option>
//                 </select>
//               </div>
//             </div>


//             {/* Expertise */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Areas of Expertise</label>
//               {formData.expertise.map((exp, index) => (
//                 <div key={index} className="flex gap-2 mt-2">
//                   <div className="relative flex-1">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                       <BookOpen className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       required
//                       placeholder="e.g., AI, ML, Web Dev"
//                       className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                       value={exp}
//                       onChange={(e) => handleExpertiseChange(index, e.target.value)}
//                     />
//                   </div>
//                   {index > 0 && (
//                     <button
//                       type="button"
//                       onClick={() => removeExpertiseField(index)}
//                       className="text-sm text-red-600 hover:text-red-800"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addExpertiseField}
//                 className="mt-2 text-sm text-red-600 hover:text-red-700"
//               >
//                 + Add another expertise
//               </button>
//             </div>

//             {/* Submit */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-2 px-4 text-white bg-red-600 hover:bg-red-700 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex justify-center items-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader className="animate-spin w-5 h-5 mr-2" />
//                     Registering...
//                   </>
//                 ) : (
//                   'Register'
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             Already have an account?{' '}
//             <button
//               onClick={() => navigate('/evaluator-login')}
//               className="text-red-800 hover:text-red-800 font-medium"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />

//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, BookOpen, Loader, AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import VITE_BASE_URL from '../config/api';

export default function EvaluatorRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    district: '',
    expertise: ['']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState("");
  //	validate all fields before enabling Register
  const isUsernameValid = /^[A-Za-z\s]{3,50}$/.test(formData.username.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPhoneValid = /^[6-9]\d{9}$/.test(formData.phone.trim());
  const isDistrictValid = formData.district && formData.district.trim() !== "";
  const isExpertiseValid = Array.isArray(formData.expertise) && formData.expertise.some(e => e.trim() !== "");

  const isFormValid = isUsernameValid && isEmailValid && isPhoneValid && isDistrictValid && isExpertiseValid;


  const handleExpertiseChange = (index: number, value: string) => {
    const newExpertise = [...formData.expertise];
    newExpertise[index] = value;
    setFormData({ ...formData, expertise: newExpertise });
  };

  const addExpertiseField = () => {
    setFormData({ ...formData, expertise: [...formData.expertise, ''] });
  };

  const removeExpertiseField = (index: number) => {
    const newExpertise = formData.expertise.filter((_, i) => i !== index);
    setFormData({ ...formData, expertise: newExpertise });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${VITE_BASE_URL}/evaluator/register`, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        district: formData.district,
        expertise: formData.expertise.filter(exp => exp.trim() !== '')
      });

      navigate('/evaluator-login', {
        state: { message: response.data.message }
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Column - Image */}
      <div className="hidden lg:block bg-cover bg-center" style={{ backgroundImage: "url('/eval-register.png')" }}>
      </div>

      {/* Right Column - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-xl bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Evaluator Registration</h2>

          {/* {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username <span className="text-red-500"> * </span></label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  maxLength={50}
                  className={`pl-10 py-2 w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm ${formData.username && !/^[A-Za-z\s]{3,50}$/.test(formData.username)
                    ? 'border-red-500'
                    : 'border-gray-300'
                    }`}
                  value={formData.username}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only letters and spaces
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setFormData({ ...formData, username: value });
                    }
                  }}
                  placeholder="Enter your username"
                />
              </div>

              {/* Error Message */}
              {formData.username && formData.username.length < 3 && (
                <p className="text-red-600 text-sm mt-1">Username must be at least 3 characters.</p>
              )}
              {formData.username && formData.username.length > 50 && (
                <p className="text-red-600 text-sm mt-1">Username cannot exceed 50 characters.</p>
              )}
              {formData.username &&
                !/^[A-Za-z\s]+$/.test(formData.username) && (
                  <p className="text-red-600 text-sm mt-1">Only alphabets and spaces are allowed.</p>
                )}
            </div>


            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500"> * </span></label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, email: value });
                    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value && !regex.test(value)) {
                      setError("Please enter a valid email address");
                    } else {
                      setError("");
                    }
                  }}
                  placeholder="Enter your email"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500"> * </span></label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="10-digit number"
                  className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // allow only digits up to 10
                    if (/^\d{0,10}$/.test(value)) {
                      setFormData({ ...formData, phone: value });
                      // validate phone number format
                      if (value && !/^[6-9]\d{9}$/.test(value)) {
                        setPhoneError("Enter a valid 10-digit number starting with 6–9");
                      } else {
                        setPhoneError("");
                      }
                    }
                  }}
                />
              </div>
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>



            {/* District Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">District <span className="text-red-500"> * </span></label>
              <div className="relative mt-1">
                <select
                  required
                  value={formData.district}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, district: value });

                    if (value === "") {
                      setError("Please select your district");
                    } else {
                      setError("");
                    }
                  }}
                  className="py-2 px-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option value="" disabled>Select your district</option>
                  <option value="Tenkasi">Tenkasi</option>
                  <option value="Tirunelveli">Tirunelveli</option>
                  <option value="Thoothukkudi">Thoothukkudi</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Kanniyakumari">Kanniyakumari</option>
                  <option value="Virudhunagar">Virudhunagar</option>
                  <option value="Dindigul">Dindigul</option>
                </select>
              </div>


            </div>



            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Areas of Expertise <span className="text-red-500"> * </span></label>
              {formData.expertise.map((exp, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g., AI, ML, Web Dev"
                      className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      value={exp}
                      onChange={(e) => handleExpertiseChange(index, e.target.value)}
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeExpertiseField(index)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addExpertiseField}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                + Add another expertise
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full py-2 px-4 text-white bg-red-600 hover:bg-red-700 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex justify-center items-center ${(!isFormValid || isLoading) ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin w-5 h-5 mr-2" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>

          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/evaluator-login')}
              className="text-red-800 hover:text-red-800 font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}
