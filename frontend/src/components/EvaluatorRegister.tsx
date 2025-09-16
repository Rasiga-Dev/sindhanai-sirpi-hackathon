// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { User, Mail, Lock, Building2, BookOpen, Loader, AlertCircle } from 'lucide-react';
// import axios from 'axios';

// export default function EvaluatorRegister() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
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
//       const response = await axios.post('http://localhost:11129/api/evaluator/register', {
//         username: formData.username,
//         email: formData.email,
//         expertise: formData.expertise.filter(exp => exp.trim() !== '')
//       });


//       console.log(response.data, "data")

//       navigate('/evaluator-login', {
//         state: { message: response.data.message }
//       });
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Register as an Evaluator
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Join our team of expert evaluators
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-red-500" />
//                 <p className="ml-3 text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   required
//                   className="pl-10 block w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.username}
//                   onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   required
//                   className="pl-10 block w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>





//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Areas of Expertise
//               </label>
//               {formData.expertise.map((exp, index) => (
//                 <div key={index} className="mt-1 flex gap-2">
//                   <div className="relative flex-1 rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                       <BookOpen className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       required
//                       className="pl-10 block w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                       value={exp}
//                       onChange={(e) => handleExpertiseChange(index, e.target.value)}
//                       placeholder="e.g., Machine Learning, Web Development"
//                     />
//                   </div>
//                   {index > 0 && (
//                     <button
//                       type="button"
//                       onClick={() => removeExpertiseField(index)}
//                       className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addExpertiseField}
//                 className="mt-2 text-sm text-red-600 hover:text-red-500"
//               >
//                 + Add another expertise
//               </button>
//             </div>


//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader className="animate-spin h-5 w-5 mr-3" />
//                     Registering...
//                   </>
//                 ) : (
//                   'Register'
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Already registered?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <button
//                 onClick={() => navigate('/evaluator-login')}
//                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, BookOpen, Loader, AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:11129/api/evaluator/register', {
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
        {/* Optional: Add overlay or text on image */}
        {/* <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold px-10 text-center">Welcome Evaluator</h1>
        </div> */}
      </div>

      {/* Right Column - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-xl bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Evaluator Registration</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder='Enter your username'
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder='Enter your email'
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="10-digit number"
                  className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      setFormData({ ...formData, phone: value });
                    }
                  }}
                />

              </div>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <div className="relative mt-1">
                <select
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="py-2 px-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option value="" disabled>Select your district</option>
                  <option value="Tenkasi">Tenkasi</option>
                  <option value="Tirunelveli">Tirunelveli</option>
                  <option value="Thoothukudi">Thoothukudi</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Kanyakumari">Kanyakumari</option>
                  <option value="Viruthunagar">Viruthunagar</option>
                  <option value="Dhindigul">Dhindigul</option>
                </select>
              </div>
            </div>


            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Areas of Expertise</label>
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
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 text-white bg-red-600 hover:bg-red-700 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex justify-center items-center"
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
            </div>
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
