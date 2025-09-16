// // import React from 'react';

// // const Certificate = () => {
// //   return (
// //     <div className="w-full min-h-screen bg-[#fefcf9] text-[#3b3b3b] font-serif p-10 flex items-center justify-center">
// //       <div className="border-4 border-[#c59a3f] p-8 max-w-4xl w-full bg-white shadow-xl relative">
// //         <div className="text-center mb-4">
// //           <h1 className="text-lg font-bold">Entrepreneurship Development and Innovation Institute</h1>
// //           <h2 className="text-md">Government of Tamil Nadu</h2>
// //           <h3 className="mt-2 text-2xl font-bold text-[#c59a3f] tracking-widest">CERTIFICATE OF APPRECIATION</h3>
// //         </div>

// //         <div className="mt-6 text-lg leading-7 text-justify">
// //           This is to certify that <span className="font-bold">RMK ENGINEERING COLLEGE, Kavaraipettai</span> has demonstrated exceptional dedication
// //           and commitment in providing exemplary Hall and Food arrangements for <span className="font-bold">SIDP 2.0 (2023 - 2024) Tiruvallur District</span>
// //           Bootcamp held on <span className="font-bold">07.02.2024 & 08.02.2024</span>. Their meticulous attention to detail, proactive approach,
// //           and unwavering support significantly contributed to the success and smooth execution of the event.
// //         </div>

// //         <div className="flex justify-between items-center mt-12">
// //           <div className="text-center">
// //             <p className="font-bold">Ms. DHUWARAKHA SRIRAM</p>
// //             <p className="text-sm">Chief of Genu India<br />Youth Development and Partnership<br />[UNICEF]</p>
// //           </div>
// //           <div className="text-center">
// //             <p className="font-bold">THIRU C. UMASHANKAR, I.A.S.</p>
// //             <p className="text-sm">Additional Chief Secretary/Director<br />Entrepreneurship Development and Innovation Institute<br />[EDII-TN]</p>
// //           </div>
// //         </div>

// //         <div className="absolute top-4 left-4">
// //           <img src="/logo1.png" alt="Logo 1" className="h-16" />
// //         </div>
// //         <div className="absolute top-4 right-4">
// //           <img src="/logo2.png" alt="Logo 2" className="h-16" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Certificate;


// import React from 'react';

// const Certificate = () => {
//   return (
//     <div className="w-full min-h-screen bg-[#fdf9f1] text-[#2e2e2e] font-serif py-12 px-6 flex items-center justify-center">
//       <div className="relative max-w-5xl w-full border-[12px] border-[#c59a3f] bg-white p-12 shadow-xl rounded-xl">
//         <div className="absolute top-6 left-6">
//           <img src="/edii.png" alt="Logo 1" className="h-20" />
//         </div>
//         <div className="absolute top-6 right-6">
//           <img src="/vosa.png" alt="Logo 2" className="h-20" />
//         </div>

//         <div className="text-center mt-4">
//           <h1 className="text-xl font-bold uppercase">Entrepreneurship Development and Innovation Institute</h1>
//           <h2 className="text-lg mt-1">VOSA TECH in collaboration with Government of Tamil Nadu</h2>
//           <h3 className="mt-4 text-3xl font-extrabold text-[#c59a3f] tracking-wider uppercase">Certificate of Appreciation</h3>
//         </div>

//         <div className="mt-10 text-lg leading-relaxed text-justify">
//           This is to certify that <span className="font-bold">RMK ENGINEERING COLLEGE, Kavaraipettai</span> has actively participated and contributed to the
//           successful execution of the <span className="font-bold">SINDHANAI SIRPI HACKATHON</span> organized by <span className="font-bold">EDII and VOSA TECH</span>
//            during the academic year 2025–2026. Their exceptional coordination, innovative mindset, and unwavering support
//           significantly contributed to the success of this prestigious event.
//         </div>

//         <div className="flex justify-between items-center mt-16">
//           <div className="text-center">
//             <p className="font-bold">Mrs.S. VALLI M.sc.,B.Ed.,M.Phil.</p>
//             <p className="text-sm leading-tight">Managing Director<br />[VOSA TECH]</p>
//           </div>
//           <div className="text-center">
//             <p className="font-bold">THIRU AMBALAVANAN, I.A.S.</p>
//             <p className="text-sm leading-tight">Entrepreneurship Development and Innovation Institute<br />[EDII-TN]</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;



// import React,{useEffect} from 'react';

// interface CertificateProps {
//   studentName: string;
//   standard: string;
//   schoolName: string;
//   participationType: 'Winner' | 'Runner' | 'Participant';
// }

// const Certificate: React.FC<CertificateProps> = ({studentName,standard,schoolName}) => {
//     useEffect(() => {
//   console.log('Certificate props:', { studentName, standard, schoolName });
// }, []);

//   return (
//     <div style={{ width: '1123px', height: '794px', padding: '20px', backgroundColor: '#fff' }}>
  

//     <div className="w-full min-h-screen bg-[#fdf9f1] text-[#2e2e2e] font-serif py-12 px-6 flex items-center justify-center">
//       <div className="relative max-w-5xl w-full border-[12px] border-[#c59a3f] bg-white p-12 shadow-xl rounded-xl">
//         {/* Logos */}
//         <div className="absolute top-6 left-6">
//           <img src="/edii.png" alt="EDII Logo" className="h-20" />
//         </div>
//         <div className="absolute top-6 right-6">
//           <img src="/vosa.png" alt="VOSA Logo" className="h-20" />
//         </div>

//         {/* Header */}
//         <div className="text-center mt-4">
//           <h1 className="text-xl font-bold uppercase">Entrepreneurship Development and Innovation Institute</h1>
//           <h2 className="text-lg mt-1">VOSA TECH in collaboration with Government of Tamil Nadu</h2>
//           <h3 className="mt-4 text-3xl font-extrabold text-[#c59a3f] tracking-wider uppercase">Certificate of Appreciation</h3>
//         </div>

//         {/* Body */}
//         <div className="mt-10 text-lg leading-relaxed text-justify">
//           This is to certify that <span className="font-bold">{studentName}</span>, studying in <span className="font-bold">{standard}</span> at <span className="font-bold">{schoolName}</span>, has
//           {/* <span className="font-bold"> {participationType.toLowerCase()}ed</span> in the */}
//           <span className="font-bold"> participated</span> in the

//           <span className="font-bold"> Sindhanai Sirpi Hackathon</span> conducted by <span className="font-bold">EDII and VOSA TECH</span> during the academic year 2025–2026.
//           <br /><br />
//           The student has exhibited remarkable <span className="italic">innovation, creativity, and enthusiasm</span> throughout the event. We appreciate their active involvement and contribution to making this initiative a grand success.
//         </div>

//         {/* Signatures */}
//         <div className="flex justify-between items-center mt-16">
//           <div className="text-center">
//             <p className="font-bold">Mrs. S. Valli M.Sc., B.Ed., M.Phil.</p>
//             <p className="text-sm leading-tight">Managing Director<br />[VOSA TECH]</p>
//           </div>
//           <div className="text-center">
//             <p className="font-bold">Thiru Ambalavanan, I.A.S.</p>
//             <p className="text-sm leading-tight">Entrepreneurship Development and Innovation Institute<br />[EDII - TN]</p>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Certificate;


import React, { useEffect } from 'react';

interface CertificateProps {
  studentName: string;
  standard: string;
  schoolName: string;
//   participationType: 'Winner' | 'Runner' | 'Participant';
}

const Certificate: React.FC<CertificateProps> = ({ studentName, standard, schoolName }) => {
  useEffect(() => {
    console.log('Certificate props:', { studentName, standard, schoolName });
  }, []);

  return (
    <div style={{ width: '1123px', height: '794px', padding: '40px', backgroundColor: '#fff', fontFamily: 'serif', color: '#2e2e2e', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', border: '12px solid #c59a3f', padding: '40px', boxSizing: 'border-box' }}>
        {/* Logos */}
        <img src="/edii.png" alt="EDII Logo" style={{ position: 'absolute', top: '20px', left: '20px', height: '80px' }} />
        <img src="/vosa.png" alt="VOSA Logo" style={{ position: 'absolute', top: '20px', right: '20px', height: '80px' }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Entrepreneurship Development and Innovation Institute</h1>
          <h2 style={{ fontSize: '16px', marginTop: '8px' }}>Sindhanai Sirpi Hackathon in collaboration with</h2>
          <h3 style={{ marginTop: '20px', fontSize: '28px', fontWeight: 'bold', color: '#c59a3f', textTransform: 'uppercase' }}>Certificate of Participation</h3>
        </div>

        {/* Body */}
        <div style={{ marginTop: '40px', fontSize: '18px', lineHeight: '1.7', textAlign: 'justify' }}>
          This is to certify that <span style={{ fontWeight: 'bold' }}>{studentName}</span>, studying in <span style={{ fontWeight: 'bold' }}>{standard}</span> at <span style={{ fontWeight: 'bold' }}>{schoolName}</span>, has
          <span style={{ fontWeight: 'bold' }}> participated</span> in the <span style={{ fontWeight: 'bold' }}>Sindhanai Sirpi Hackathon</span> organised by <span style={{ fontWeight: 'bold' }}>EDII-TN and VOSA TECH</span> during the academic year 2025–2026.
          <br /><br />
          The student has exhibited remarkable <span style={{ fontStyle: 'italic' }}>innovation, creativity, and enthusiasm</span> throughout the event. We appreciate their active involvement and contribution to this event.
        </div>

        {/* Signatures */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold' }}>Mrs. S. Valli M.Sc., B.Ed., M.Phil.</p>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>Managing Director<br />[VOSA TECH]</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold' }}>Thiru Ambalavanan, I.A.S.</p>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>Entrepreneurship Development and Innovation Institute<br />[EDII - TN]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
