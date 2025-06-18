// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSignOutAlt, FaUserCircle, FaList } from 'react-icons/fa';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import L1Level from './evaluator/L1Level';

// export default function EvaluatorDashboard() {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const username = localStorage.getItem('evaluatorName') || 'Evaluator';

//   useEffect(() => {
//     const token = localStorage.getItem('evaluatorToken');
//     if (!token) {
//       navigate('/evaluator-login');
//       return;
//     }
//     fetchL1Projects();
//   }, [navigate]);

//   const fetchL1Projects = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('evaluatorToken');
//       const response = await axios.get('http://localhost:11129/api/evaluator/assigned-projects', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log('Fetched L1 projects:', response.data); // ✅ fixed line
//       setProjects(response.data.filter((p) => p.evaluationStatus === 'pending'));
//     } catch (error) {
//       console.error('Error fetching L1 projects:', error);
//       toast.error('Failed to fetch L1 projects');
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const handleLogout = () => {
//     localStorage.removeItem('evaluatorToken');
//     localStorage.removeItem('evaluatorName');
//     localStorage.removeItem('evaluatorId');
//     navigate('/evaluator-login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-red-800 text-white">
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-8">Evaluator Panel</h2>
//           <nav>
//             <button
//               className="flex items-center space-x-2 w-full px-4 py-2 rounded bg-red-900"
//               disabled
//             >
//               <FaList />
//               <span>L1 Level</span>
//             </button>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-md">
//           <div className="flex justify-between items-center px-6 py-4">
//             <h1 className="text-xl font-semibold text-gray-800">L1 Level Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <FaUserCircle className="text-2xl text-gray-600" />
//                 <span className="text-gray-700">{username}</span>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 text-red-600 hover:text-red-800"
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-auto p-6">
//           {isLoading ? (
//             <div className="text-center py-4">Loading...</div>
//           ) : (
//             <L1Level projects={projects} onProjectUpdate={setProjects} />
//           )}
//         </main>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle, FaList } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import L1Level from './evaluator/L1Level';
import L2Level from './evaluator/L2Level';
import L1LevelList from './evaluator/L1LevelList';
import L2LevelList from './evaluator/L2LevelList';

export default function EvaluatorDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [l2Projects, setL2Projects] = useState([]);

  const [l1ProjectsList, setL1ProjectsList] = useState([]);
  const [l2ProjectsList, setL2ProjectsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem('evaluatorName') || 'Evaluator';
  const [activeLevel, setActiveLevel] = useState('L1'); // default L1


  // useEffect(() => {
  //   const token = localStorage.getItem('evaluatorToken');
  //   if (!token) {
  //     navigate('/evaluator-login');
  //     return;
  //   }
  //   fetchL1Projects();
  //   fetchL2Projects();
  //   fetchL1ProjectsList();
  //   fetchL2ProjectsList();
  // }, [navigate]);


  useEffect(() => {
    const token = localStorage.getItem('evaluatorToken');
    if (!token) {
      navigate('/evaluator-login');
      return;
    }

    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [l1, l2, l1List, l2List] = await Promise.all([
          fetchL1Projects(),
          fetchL2Projects(),
          fetchL1ProjectsList(),
          fetchL2ProjectsList()
        ]);
      } catch (err) {
        toast.error("Something went wrong while fetching projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [navigate]);


  const fetchL1Projects = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('evaluatorToken');
      const response = await axios.get('http://localhost:11129/api/evaluator/assigned-projects', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // add a 'status' field to track dropdown selection locally if needed
      const projectsWithStatus = response.data.map(p => ({
        ...p,
        status: p.evaluationStatus || ''
        // initial status empty or could be from API if exists
      }));
      setProjects(projectsWithStatus.filter(p => p.evaluationStatus === 'pending'));
    } catch (error) {
      console.error('Error fetching L1 projects:', error);
      toast.error('Failed to fetch L1 projects');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchL1ProjectsList = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('evaluatorToken');
      const response = await axios.get('http://localhost:11129/api/evaluator/level-1-list', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // add a 'status' field to track dropdown selection locally if needed
      setL1ProjectsList(response.data)
    } catch (error) {
      console.error('Error fetching L1 projects:', error);
      toast.error('Failed to fetch L1 projects');
    } finally {
      setIsLoading(false);
    }
  };

  // Example in React component
  const fetchL2Projects = async () => {
    try {
      const token = localStorage.getItem('evaluatorToken');
      const res = await axios.get("http://localhost:11129/api/evaluator/projects-to-evaluate", {
        headers: { Authorization: `Bearer ${token}` },
        params: { evaluatorName: username }  // <-- IMPORTANT
      });

      setL2Projects(res.data);
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  };


  const fetchL2ProjectsList = async () => {
    try {
      const token = localStorage.getItem('evaluatorToken');
      const res = await axios.get("http://localhost:11129/api/evaluator/level-2-list", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setL2ProjectsList(res.data); // this will load filtered list only

    } catch (err) {
      console.error("Error loading projects:", err);
    }
  };



  const handleStatusChange = (status, projectId) => {
    setProjects(prev =>
      prev.map(project =>
        project.projectId === projectId ? { ...project, status } : project
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('evaluatorToken');
    localStorage.removeItem('evaluatorName');
    localStorage.removeItem('evaluatorId');
    navigate('/evaluator-login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-red-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-8">Evaluator Panel</h2>
          <nav>

            <button
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded ${activeLevel === 'L1' ? 'bg-red-900' : 'hover:bg-red-700'
                }`}
              onClick={() => setActiveLevel('L1')}
            >
              <FaList />
              <span>L1 Level</span>
            </button>

            <button
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded ${activeLevel === 'L2' ? 'bg-red-900' : 'hover:bg-red-700'
                }`}
              onClick={() => setActiveLevel('L2')}
            >
              <FaList />
              <span>L2 Level</span>
            </button>
            <button
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded ${activeLevel === 'L3' ? 'bg-red-900' : 'hover:bg-red-700'
                }`}
              onClick={() => setActiveLevel('L3')}
            >
              <FaList />
              <span>L1 Level List</span>
            </button>
            <button
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded ${activeLevel === 'L4' ? 'bg-red-900' : 'hover:bg-red-700'
                }`}
              onClick={() => setActiveLevel('L4')}
            >
              <FaList />
              <span>L2 Level List</span>
            </button>

          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Evaluator Level Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-semibold">
                  {username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700">{username}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>


        <main className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : activeLevel === 'L1' ? (
            // <L1Level
            //   projects={projects}
            //   onStatusChange={handleStatusChange}
            //   username={username}

            //   refreshProjects={fetchL1Projects}
            // />
            <L1Level
              projects={projects}
              onStatusChange={handleStatusChange}
              username={username}
              refreshProjects={fetchL1Projects}
              refreshLevel1List={fetchL1ProjectsList}
              refreshL2List={fetchL2Projects}
            />

          ) : activeLevel === 'L2' ? (
            // <L2Level
            //   projects={l2Projects}
            //   // onStatusChange={handleStatusChange}
            //   username={username}
            //   refreshProjects={fetchL2Projects} // pass this function down
            // />
            <L2Level
              projects={l2Projects}
              username={username}
              refreshProjects={fetchL2Projects}
              refreshLevel2List={fetchL2ProjectsList}
            />


          ) : activeLevel === 'L3' ? (
            <L1LevelList
              projects={l1ProjectsList}
              // onStatusChange={handleStatusChange}
              username={username}
            // pass this function down
            />
          ) : activeLevel === 'L4' ? (
            <L2LevelList
              projects={l2ProjectsList}
              // onStatusChange={handleStatusChange}
              username={username}
            // pass this function down
            />
          ) : (
            <div className="text-center py-4">Select a level to view projects</div>
          )
          }
        </main>

      </div>

      <ToastContainer />
    </div>
  );
}
