
// import React, { useState, useRef, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { Navbar } from './components/Navbar';
// import { LoginDropdown } from './components/LoginDropdown';
// import { SchoolLogin } from './components/SchoolLogin';
// import { Footer } from './components/Footer';
// import { Home } from './pages/Home';
// import { About } from './pages/About';
// import { Schedule } from './pages/Schedule';
// import { Guidelines } from './pages/Guidelines';
// import { Contact } from './pages/Contact';
// import { Gallery } from './pages/Gallery';
// import { Speakers } from './pages/Speakers';
// import { RoadMap } from './pages/RoadMap';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import TermsOfService from './pages/TermsOfService';
// import CodeOfConduct from './pages/CodeOfConduct';
// import CookiePolicy from './pages/CookiePolicy';
// import FAQ from './pages/FAQ';
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';

// import { ForgotPassword } from './components/ForgotPassword';
// import { VerifyOTP } from './components/VerifyOTP';
// import { ResetPassword } from './components/ResetPassword';
// import SchoolDashboard from './components/SchoolDashboard';
// import SignupForm from './components/SignupForm';
// import RegisterGuideTeacher from './components/RegisterGuideTeacher';
// import HackathonPage from './components/HackathonPage';
// import IdeaSubmissionForm from './components/IdeaSubmissionForm ';
// import EvaluatorLogin from './components/EvaluatorLogin';
// import EvaluatorRegister from './components/EvaluatorRegister';
// import AdminLogin from './components/AdminLogin';
// import AdminDashboard from './components/AdminDashboard';
// import EvaluatorDashboard from './components/EvaluatorDashboard';
// import SchoolAdminDashboard from './components/SchoolAdminDashboard';
// import EvaluatorStage2Dashboard from './components/EvaluatorStage2Dashboard';
// import EvaluatorStage3Dashboard from './components/EvaluatorStage3Dashboard';
// // // src/main.tsx or src/index.tsx
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.bundle.min'; // includes Popper

// // // If you're using DataTables:
// // import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// function AppWrapper() {
//   const [activeSection, setActiveSection] = useState('Home');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [showEvaluatorLogin, setShowEvaluatorLogin] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//   };

//   const handleLoginClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLoginTypeSelect = (type) => {
//     setIsDropdownOpen(false);
//     if (type === 'school') {
//       navigate('/school-login');
//     } else {
//       setShowEvaluatorLogin(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center space-x-4 flex-shrink-0">
//               <img src="/vosa.png" alt="Logo 1" className="h-16 w-auto" />
//               <img src="/tn.png" alt="Logo 2" className="h-14 w-auto" />
//               <img src="/edii.png" alt="Logo 3" className="h-12 w-auto" />
//             </div>

//             <div className="hidden md:block flex-grow">
//               <Navbar 
//                 activeSection={activeSection}
//                 onSectionChange={handleSectionChange}
//               />
//             </div>

//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={handleLoginClick}
//                 className="flex-shrink-0 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
//               >
//                 Login
//               </button>
//               {isDropdownOpen && (
//                 <LoginDropdown
//                   isOpen={isDropdownOpen}
//                   onClose={() => setIsDropdownOpen(false)}
//                   onSelectLoginType={handleLoginTypeSelect}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="md:hidden">
//         <Navbar 
//           activeSection={activeSection}
//           onSectionChange={handleSectionChange}
//         />
//       </div>

//       <main className="mx-auto px-4 space-y-24">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/schedule" element={<Schedule />} />
//           <Route path="/roadmap" element={<RoadMap />} />
//           <Route path="/guidelines" element={<Guidelines />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/speakers" element={<Speakers />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-of-service" element={<TermsOfService />} />
//           <Route path="/code-of-conduct" element={<CodeOfConduct />} />
//           <Route path="/cookie-policy" element={<CookiePolicy />} />
//           <Route path="/faq" element={<FAQ />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/blog/:slug" element={<BlogPost />} />
//           <Route path="/signup" element={<SignupForm />} />
//           <Route path="/school-login" element={<SchoolLogin />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/dashboard" element={<SchoolDashboard />} />
//           <Route path="/register-guide-teacher" element={<RegisterGuideTeacher />} />
//           <Route path="/guide-teacher" element={<IdeaSubmissionForm />} />
//           <Route path="/hackathon-template" element={<HackathonPage />} />
//           <Route path="/evaluator-login" element={<EvaluatorLogin />} />
//           <Route path="/evaluator-dashboard" element={<EvaluatorDashboard />} />
//           <Route path="/evaluator-register" element={<EvaluatorRegister />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/school/:id" element={<SchoolAdminDashboard />} />
//           <Route path="/evaluator-stage2-dashboard" element={<EvaluatorStage2Dashboard/>} />


//           <Route path="/evaluator-stage3-dashboard" element={<EvaluatorStage3Dashboard/>} />



//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>

//       <Footer />

//       {showEvaluatorLogin && (
//         <EvaluatorLogin onClose={() => setShowEvaluatorLogin(false)} />
//       )}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }

// export default App;


import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar } from './components/Navbar';
import { LoginDropdown } from './components/LoginDropdown';
import { SchoolLogin } from './components/SchoolLogin';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Schedule } from './pages/Schedule';
import { Guidelines } from './pages/Guidelines';
import { Contact } from './pages/Contact';
import { Gallery } from './pages/Gallery';
import { Speakers } from './pages/Speakers';
import { RoadMap } from './pages/RoadMap';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CodeOfConduct from './pages/CodeOfConduct';
import CookiePolicy from './pages/CookiePolicy';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { ForgotPassword } from './components/ForgotPassword';
import { VerifyOTP } from './components/VerifyOTP';
import { ResetPassword } from './components/ResetPassword';
import SchoolDashboard from './components/SchoolDashboard';
import SignupForm from './components/SignupForm';
import RegisterGuideTeacher from './components/RegisterGuideTeacher';
import HackathonPage from './components/HackathonPage';
import IdeaSubmissionForm from './components/IdeaSubmissionForm ';
import EvaluatorLogin from './components/EvaluatorLogin';
import EvaluatorRegister from './components/EvaluatorRegister';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import EvaluatorDashboard from './components/EvaluatorDashboard';
import SchoolAdminDashboard from './components/SchoolAdminDashboard';
import EvaluatorStage2Dashboard from './components/EvaluatorStage2Dashboard';
import EvaluatorStage3Dashboard from './components/EvaluatorStage3Dashboard';
import SchoolDetails from './components/admin/SchoolDetails';
import SchoolManagement from './components/admin/SchoolManagement';
import EvaluationRequest from './components/admin/EvaluationRequest';
import AverageProjectsList from './components/evaluator/AverageProjectsList';
import DPMLogin from './components/dpm/DPMLogin';
import DPMPannel from './components/dpm/DPMPannel';


function AppWrapper() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEvaluatorLogin, setShowEvaluatorLogin] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLoginClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoginTypeSelect = (type) => {
    setIsDropdownOpen(false);
    if (type === 'school') {
      navigate('/school-login');
    } else {
      setShowEvaluatorLogin(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4 flex-shrink-0">
              <img src="/edii.png" alt="Logo 3" className="h-12 w-auto" />
              <img src="/tn.png" alt="Logo 2" className="h-14 w-auto" />
              <img src="/vosa.png" alt="Logo 1" className="h-16 w-auto" />
            </div>

            <div className="hidden md:block flex-grow">
              <Navbar
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleLoginClick}
                className="flex-shrink-0 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
              >
                Login
              </button>
              {isDropdownOpen && (
                <LoginDropdown
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                  onSelectLoginType={handleLoginTypeSelect}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden fixed left-0 right-0 z-40 bg-white shadow-sm">
        <Navbar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </div>

      <main className="flex-grow mt-[75px] px-4 space-y-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/code-of-conduct" element={<CodeOfConduct />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/school-login" element={<SchoolLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<SchoolDashboard />} />
          <Route path="/register-guide-teacher" element={<RegisterGuideTeacher />} />
          <Route path="/guide-teacher" element={<IdeaSubmissionForm />} />
          <Route path="/hackathon-template" element={<HackathonPage />} />
          <Route path="/evaluator-login" element={<EvaluatorLogin />} />
          {/* <Route path="/evaluator-dashboard" element={<EvaluatorDashboard />} /> */}
          <Route path="/evaluator-register" element={<EvaluatorRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/school/:id" element={<SchoolAdminDashboard />} />
          <Route path="/evaluator-stage2-dashboard" element={<EvaluatorStage2Dashboard />} />
          <Route path="/evaluator-stage3-dashboard" element={<EvaluatorStage3Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/schools" element={<SchoolManagement />} />
          <Route path="/school-details/:id" element={<SchoolDetails />} />
          <Route path="/schools" element={<SchoolManagement />} />
          <Route path="/evaluation-request" element={<EvaluationRequest />} />
          <Route path="/evaluator-dashboard" element={<EvaluatorDashboard />} />
          <Route path="/average-projects" element={<AverageProjectsList />} />
          <Route path="/dpm-login" element={<DPMLogin />} />
          <Route path="/dpm-dashboard" element={<DPMPannel />} />


         
        </Routes>

      </main>

      <footer className="  bottom-0 left-0 right-0 z-50 bg-white">
        <Footer />
      </footer>

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;