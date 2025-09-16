

// // import React from 'react';
// // import html2canvas from 'html2canvas';
// // import jsPDF from 'jspdf';
// // import {
// //   FaUsers, FaGift, FaGlobe, FaHandshake,
// //   FaMoneyBillWave, FaCogs, FaLaptop, FaHandsHelping, FaBalanceScale
// // } from 'react-icons/fa';

// // const dummyBMC = {
// //   customerSegments: 'Students, Teachers, Parents',
// //   valueProposition: 'Simplified project tracking and reporting for schools.',
// //   channel: 'School Portal, Email, WhatsApp',
// //   customerRelationships: 'Helpdesk, Guides, Feedback Forms',
// //   revenueStreams: 'Government Grants, Private Sponsors',
// //   keyResources: 'School Staff, Digital Tools, Data',
// //   keyActivities: 'Project Guidance, Data Entry, Review',
// //   keyPartners: 'Education Department, NGOs, Mentors',
// //   costStructure: 'Maintenance, Staff Salaries, Tech Infrastructure'
// // };

// // const BMCLayout = () => {
// //   const downloadPDF = async () => {
// //     const element = document.getElementById('bmc-layout');
// //     if (!element) return;
// //     const canvas = await html2canvas(element);
// //     const imgData = canvas.toDataURL('image/png');
// //     const pdf = new jsPDF('landscape', 'pt', 'a4');
// //     const width = pdf.internal.pageSize.getWidth();
// //     const height = pdf.internal.pageSize.getHeight();
// //     pdf.addImage(imgData, 'PNG', 0, 0, width, height);
// //     pdf.save('bmc_layout.pdf');
// //   };

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl font-bold mb-4">BMC Layout</h2>
// //       <button
// //         onClick={downloadPDF}
// //         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //       >
// //         Download PDF
// //       </button>

// //       <div
// //         id="bmc-layout"
// //         className="grid grid-cols-4 grid-rows-4 gap-1 border border-black w-full bg-white p-4 text-center"
// //       >
// //         <div className="col-start-4 row-start-1 row-span-2 border p-2">
// //           <FaUsers className="text-4xl mx-auto mb-2" />
// //           <strong>1. Customer Segments</strong>
// //           <p>{dummyBMC.customerSegments}</p>
// //         </div>
// //         <div className="col-start-2 row-start-1 row-span-2 border p-2">
// //           <FaGift className="text-4xl mx-auto mb-2" />
// //           <strong>2. Value Proposition</strong>
// //           <p>{dummyBMC.valueProposition}</p>
// //         </div>
// //         <div className="col-start-3 row-start-2 row-span-1 border p-2">
// //           <FaGlobe className="text-4xl mx-auto mb-2" />
// //           <strong>3. Channel</strong>
// //           <p>{dummyBMC.channel}</p>
// //         </div>
// //         <div className="col-start-3 row-start-1 row-span-1 border p-2">
// //           <FaHandshake className="text-4xl mx-auto mb-2" />
// //           <strong>4. Customer Relationships</strong>
// //           <p>{dummyBMC.customerRelationships}</p>
// //         </div>
// //         <div className="col-start-2 row-start-4 col-span-2 border p-2">
// //           <FaMoneyBillWave className="text-4xl mx-auto mb-2" />
// //           <strong>5. Revenue Streams</strong>
// //           <p>{dummyBMC.revenueStreams}</p>
// //         </div>
// //         <div className="col-start-2 row-start-3 row-span-1 border p-2">
// //           <FaCogs className="text-4xl mx-auto mb-2" />
// //           <strong>6. Key Resources</strong>
// //           <p>{dummyBMC.keyResources}</p>
// //         </div>
// //         <div className="col-start-2 row-start-2 row-span-1 border p-2">
// //           <FaLaptop className="text-4xl mx-auto mb-2" />
// //           <strong>7. Key Activities</strong>
// //           <p>{dummyBMC.keyActivities}</p>
// //         </div>
// //         <div className="col-start-1 row-start-1 row-span-3 border p-2">
// //           <FaHandsHelping className="text-4xl mx-auto mb-2" />
// //           <strong>8. Key Partners</strong>
// //           <p>{dummyBMC.keyPartners}</p>
// //         </div>
// //         <div className="col-start-1 row-start-4 col-span-1 border p-2">
// //           <FaBalanceScale className="text-4xl mx-auto mb-2" />
// //           <strong>9. Cost Structure</strong>
// //           <p>{dummyBMC.costStructure}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BMCLayout;


// // BMCLayout.jsx or BMCLayout.tsx
// import React from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import {
//   FaUsers, FaGift, FaGlobe, FaHandshake,
//   FaMoneyBillWave, FaCogs, FaLaptop, FaHandsHelping, FaBalanceScale
// } from 'react-icons/fa';

// // BMCLayout.jsx or .tsx
// const BMCLayout = ({ bmcDetails,schoolId,projectTitle,projectId,projectDescription,projectProblemStatement,projectSolution }) => {
  

//   const downloadPDF = async () => {
//     const element = document.getElementById('bmc-layout');
//     if (!element) return;

//     // Ensure fonts are loaded before capturing
//     await document.fonts.ready;

//     const canvas = await html2canvas(element, {
//       useCORS: true, // handles external fonts like FontAwesome
//       scale: 2, // increases resolution of PDF
//     });
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('landscape', 'pt', 'a4');
//     const width = pdf.internal.pageSize.getWidth();
//     const height = pdf.internal.pageSize.getHeight();
//     pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//     pdf.save('bmc_layout.pdf');
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={downloadPDF}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Download PDF
//       </button>

//        <div
//     id="bmc-layout"
//     className="grid grid-cols-4 grid-rows-4 gap-1 border border-black w-full bg-white p-4 text-center"
//   >
//     {/* Project and school details */}
//     <div className="col-span-4 border-b mb-4 p-2 text-left">
//       <h4>School ID: {schoolId}</h4>
//       <h4>Project ID: {projectId}</h4>
//       <h4>Project Title: {projectTitle}</h4>
//       <h4>Project Description: {projectDescription}</h4>
//       <h4>Project Problem Statement: {projectProblemStatement}</h4>
//       <h4>Project Solution: {projectSolution}</h4>
//     </div>
//         <div className="col-start-4 row-start-1 row-span-2 border p-2">
//          <i className="fas fa-users text-4xl mb-2"></i>
//           <strong>1. Customer Segments</strong>
//           <p>{bmcDetails.customerSegments || 'N/A'}</p>
//         </div>
//         <div className="col-start-2 row-start-1 row-span-2 border p-2">
//           <i className="fas fa-gift text-4xl mx-auto mb-2"></i>
//           <strong>2. Value Proposition</strong>
//           <p>{bmcDetails.valuePropositions || 'N/A'}</p>
//         </div>
//         <div className="col-start-3 row-start-2 row-span-1 border p-2">
//          <i className="fas fa-globe text-4xl mx-auto mb-2"></i>
//           <strong>3. Channel</strong>
//           <p>{bmcDetails.channels || 'N/A'}</p>
//         </div>
//         <div className="col-start-3 row-start-1 row-span-1 border p-2">
//          <i className="fas fa-handshake text-4xl mx-auto mb-2"></i>
//           <strong>4. Customer Relationships</strong>
//           <p>{bmcDetails.customerRelationships || 'N/A'}</p>
//         </div>
//         <div className="col-start-2 row-start-4 col-span-2 border p-2">
//           <i className="fas fa-money-bill-wave text-4xl mx-auto mb-2"></i>
//           <strong>5. Revenue Streams</strong>
//           <p>{bmcDetails.revenueStreams || 'N/A'}</p>
//         </div>
//         <div className="col-start-2 row-start-3 row-span-1 border p-2">
//          <i className="fas fa-cogs text-4xl mx-auto mb-2"></i>
//           <strong>6. Key Resources</strong>
//           <p>{bmcDetails.keyResources || 'N/A'}</p>
//         </div>
//         <div className="col-start-2 row-start-2 row-span-1 border p-2">
//           <i className="fas fa-laptop text-4xl mx-auto mb-2"></i>
//           <strong>7. Key Activities</strong>
//           <p>{bmcDetails.keyActivities || 'N/A'}</p>
//         </div>
//         <div className="col-start-1 row-start-1 row-span-3 border p-2">
//          <i className="fas fa-hands-helping text-4xl mx-auto mb-2"></i>
//           <strong>8. Key Partners</strong>
//           <p>{bmcDetails.keyPartners || 'N/A'}</p>
//         </div>
//         <div className="col-start-1 row-start-4 col-span-1 border p-2">
//           <i className="fas fa-balance-scale text-4xl mx-auto mb-2"></i>
//           <strong>9. Cost Structure</strong>
//           <p>{bmcDetails.costStructure || 'N/A'}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BMCLayout;



import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BMCLayout = ({
  bmcDetails,
  schoolId,
  projectTitle,
  projectId,
  projectDescription,
  projectProblemStatement,
  projectSolution,
}) => {
  const downloadPDF = async () => {
    const element = document.getElementById('bmc-wrapper'); // Capture the whole wrapper
    if (!element) return;

    await document.fonts.ready;

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('bmc_layout.pdf');
  };

  return (
    <div className="p-4">
      {/* <button
        onClick={downloadPDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button> */}

      {/* Wrapper includes both project details and grid */}
      <div id="bmc-wrapper" className="bg-white p-4 border border-black">

        {/* Project and school details above the grid */}
        <div className="mb-4 text-left">
          <h4>School ID: {schoolId}</h4>
          <h4>Project ID: {projectId}</h4>
          <h4>Project Title: {projectTitle}</h4>
          {/* <h4>Project Description: {projectDescription}</h4>
          <h4>Project Problem Statement: {projectProblemStatement}</h4>
          <h4>Project Solution: {projectSolution}</h4> */}
        </div>

        {/* BMC Grid Layout */}
        <div
          id="bmc-layout"
          className="grid grid-cols-4 grid-rows-4 gap-1 text-center"
        >
          <div className="col-start-4 row-start-1 row-span-2 border p-2">
            <i className="fas fa-users text-4xl mb-2"></i>
            <strong>1. Customer Segments</strong>
            <p>{bmcDetails.customerSegments || 'N/A'}</p>
          </div>
          <div className="col-start-2 row-start-1 row-span-2 border p-2">
            <i className="fas fa-gift text-4xl mx-auto mb-2"></i>
            <strong>2. Value Proposition</strong>
            <p>{bmcDetails.valuePropositions || 'N/A'}</p>
          </div>
          <div className="col-start-3 row-start-2 row-span-1 border p-2">
            <i className="fas fa-globe text-4xl mx-auto mb-2"></i>
            <strong>3. Channel</strong>
            <p>{bmcDetails.channels || 'N/A'}</p>
          </div>
          <div className="col-start-3 row-start-1 row-span-1 border p-2">
            <i className="fas fa-handshake text-4xl mx-auto mb-2"></i>
            <strong>4. Customer Relationships</strong>
            <p>{bmcDetails.customerRelationships || 'N/A'}</p>
          </div>
          <div className="col-start-2 row-start-4 col-span-2 border p-2">
            <i className="fas fa-money-bill-wave text-4xl mx-auto mb-2"></i>
            <strong>5. Revenue Streams</strong>
            <p>{bmcDetails.revenueStreams || 'N/A'}</p>
          </div>
          <div className="col-start-2 row-start-3 row-span-1 border p-2">
            <i className="fas fa-cogs text-4xl mx-auto mb-2"></i>
            <strong>6. Key Resources</strong>
            <p>{bmcDetails.keyResources || 'N/A'}</p>
          </div>
          <div className="col-start-2 row-start-2 row-span-1 border p-2">
            <i className="fas fa-laptop text-4xl mx-auto mb-2"></i>
            <strong>7. Key Activities</strong>
            <p>{bmcDetails.keyActivities || 'N/A'}</p>
          </div>
          <div className="col-start-1 row-start-1 row-span-3 border p-2">
            <i className="fas fa-hands-helping text-4xl mx-auto mb-2"></i>
            <strong>8. Key Partners</strong>
            <p>{bmcDetails.keyPartners || 'N/A'}</p>
          </div>
          <div className="col-start-1 row-start-4 col-span-1 border p-2">
            <i className="fas fa-balance-scale text-4xl mx-auto mb-2"></i>
            <strong>9. Cost Structure</strong>
            <p>{bmcDetails.costStructure || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMCLayout;
