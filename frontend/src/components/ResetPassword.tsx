

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export function ResetPassword() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { email, token } = location.state || {};

//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirm) {
//       setError("Passwords don't match");
//       return;
//     }

//     try {
//       const response =await axios.post('http://localhost:11129/api/auth/reset-password', {
//         email,
//         password,
//         token, // ✅ this comes from verify-otp response
//       });
      

//       setSuccess(response.data.message);
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Reset failed');
//     }
//   };

//   if (!email || !token) {
//     navigate('/forgot-password');
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-sm font-medium text-gray-700">New Password</label>
//             <input
//               type="password"
//               className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-red-800 focus:border-red-800"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-red-800 focus:border-red-800"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-900"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />

//     </div>
//   );
// }


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, token } = location.state || {};

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("❌ Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:11129/api/auth/reset-password', {
        email,
        password,
        token, // ✅ this comes from verify-otp response
      });

      toast.success(response.data.message || '✅ Password reset successful!');
      setTimeout(() => navigate('/school-login'), 3000);

    } catch (err: any) {
      toast.error(err.response?.data?.message || '❌ Reset failed');
    }
  };

  if (!email || !token) {
    navigate('/forgot-password');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-red-800 focus:border-red-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-red-800 focus:border-red-800"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-900"
          >
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
