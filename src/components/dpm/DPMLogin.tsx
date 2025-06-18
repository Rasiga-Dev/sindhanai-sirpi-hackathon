// // DPMLogin.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast,ToastContainer } from 'react-toastify';


// const DPMLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//  const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault(); // 🚨 This is very important

//   try {
//     const res = await axios.post('http://localhost:11129/api/dpm/login', {
//       username,
//       password,
//     });

//     localStorage.setItem("dpmDistrict", res.data.district);
//     localStorage.setItem("dpmUsername", res.data.username);
//     navigate('/dpm-dashboard'); // 🚀 Navigate to panel
//   } catch (err) {
//     toast.error(err.response?.data?.message || 'Login failed');
//   }
// };



//   return (
//     <form onSubmit={handleLogin}>
//       <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//       <ToastContainer />

//     </form>
//   );
// };

// export default DPMLogin;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DPMLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:11129/api/dpm/login', {
        username,
        password,
      });

      localStorage.setItem("dpmDistrict", res.data.district);
      localStorage.setItem("dpmUsername", res.data.username);
      navigate('/dpm-dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">DPM Login</h2>

        <div>
          <label className="block text-gray-600 mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Login
        </button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default DPMLogin;
