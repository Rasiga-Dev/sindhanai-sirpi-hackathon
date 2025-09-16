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
