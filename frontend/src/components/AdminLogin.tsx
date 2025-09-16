// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Lock, Loader, AlertCircle } from 'lucide-react';
// import axios from 'axios';

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
  
//     try {
//       const response = await axios.post('http://localhost:11129/api/admin/login', credentials);
//       const token = response.data.token;
      
//       localStorage.setItem('adminToken', token);
//       navigate('/admin-dashboard');
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Admin Login
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Sign in to access the admin dashboard
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
//                   value={credentials.username}
//                   onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   required
//                   className="pl-10 block w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={credentials.password}
//                   onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader className="animate-spin h-5 w-5 mr-3" />
//                   Signing in...
//                 </>
//               ) : (
//                 'Sign in'
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:11129/api/admin/login', credentials);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin-dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">Admin Login</h2>
        <p className="mt-2 text-center text-gray-500">Sign in to access your dashboard</p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="ml-2 text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="mt-6 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                required
                placeholder="Enter your username"
                autoComplete="off"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
                           transition duration-150 text-gray-900 placeholder-gray-400"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
                           transition duration-150 text-gray-900 placeholder-gray-400"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl 
                       text-white font-medium bg-red-600 hover:bg-red-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                       disabled:opacity-50 transition duration-200"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
