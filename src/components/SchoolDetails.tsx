import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchoolDetails = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:11129/api/schools')
      .then((response) => {
        setSchools(response.data); // Set the schools data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching school data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>School List</h1>
      {schools.length === 0 ? (
        <p>No schools found</p>
      ) : (
        <ul>
          {schools.map((school) => (
            <li key={school._id}>
              <h3>{school.School_Name}</h3>
              <p><strong>District:</strong> {school.District}</p>
              <p><strong>Block:</strong> {school.Block}</p>
              <p><strong>UDISE Code:</strong> {school.UDISE_Code}</p>
              <p><strong>Management:</strong> {school.Management}</p>
              <p><strong>Category:</strong> {school.Category}</p>
              <p><strong>Address:</strong> {school.Address}</p>
              <p><strong>Email:</strong> <a href={`mailto:${school.Email_ID}`}>{school.Email_ID}</a></p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchoolDetails;
