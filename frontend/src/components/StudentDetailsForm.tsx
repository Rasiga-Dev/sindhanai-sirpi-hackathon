
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Student {
  name: string;
  fatherName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  community: 'BC' | 'MBC' | 'ST' | 'SC' | 'General';
  district: string;
  standard: string;
  email: string;
  contactNumber: string;
}

interface StudentDetailsFormProps {
  teamMemberCount: number;
  onNext: (data: Student[]) => void;
  onBack: () => void;
  initialData?: Student[];
}

const StudentDetailsForm: React.FC<StudentDetailsFormProps> = ({ teamMemberCount, onNext, onBack, initialData }) => {
  const [students, setStudents] = useState<Student[]>(initialData || Array.from({ length: teamMemberCount }, () => ({
    name: '',
    fatherName: '',
    dateOfBirth: '',
    gender: 'male',
    community: 'General',
    district: '',
    standard: '',
    email: '',
    contactNumber: ''
  })));

  // This will reset the form values when `initialData` changes
  useEffect(() => {
    if (initialData) {
      setStudents(initialData);
    }
  }, [initialData]);

  const handleInputChange = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...students];

    // Validate name, fatherName, district: only letters and space
    if (['name', 'fatherName', 'district'].includes(field)) {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        toast.error('Only letters and spaces are allowed.');
        return;
      }
    }

    // Validate contact number: only digits and max 10 digits
    if (field === 'contactNumber') {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) {
        toast.error('Only numbers are allowed.');
        return;
      }
      if (value.length > 10) {
        toast.error('Contact number must be exactly 10 digits.');
        return;
      }
    }

    updatedStudents[index] = { ...updatedStudents[index], [field]: value };
    setStudents(updatedStudents);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const student of students) {
      if (
        !student.name ||
        !student.fatherName ||
        !student.dateOfBirth ||
        !student.district ||
        !student.standard ||
        !student.email ||
        !student.contactNumber
      ) {
        toast.error('Please fill all required fields.');
        return;
      }

      if (!validateEmail(student.email)) {
        toast.error('Please enter a valid email address.');
        return;
      }

      if (student.contactNumber.length !== 10) {
        toast.error('Contact number must be exactly 10 digits.');
        return;
      }
    }

    toast.success('All details are valid!');
    onNext(students);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {students.map((student, index) => (
        <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-red-800 mb-6">Student {index + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name <span className="text-red-500"> * </span></label>
              <input
                type="text"
                value={student.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {/* Father’s Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Father's Name <span className="text-red-500"> * </span></label>
              <input
                type="text"
                value={student.fatherName}
                onChange={(e) => handleInputChange(index, 'fatherName', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date of Birth <span className="text-red-500"> * </span></label>
              <input
                type="date"
                value={student.dateOfBirth}
                onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Gender <span className="text-red-500"> * </span></label>
              <select
                value={student.gender}
                onChange={(e) => handleInputChange(index, 'gender', e.target.value as 'male' | 'female' | 'other')}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Community */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Community <span className="text-red-500"> * </span></label>
              <select
                value={student.community}
                onChange={(e) => handleInputChange(index, 'community', e.target.value as 'BC' | 'MBC' | 'ST' | 'SC' | 'General')}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="BC">BC</option>
                <option value="MBC">MBC</option>
                <option value="ST">ST</option>
                <option value="SC">SC</option>
                <option value="OC">OC</option>

                <option value="General">General</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">District <span className="text-red-500"> * </span></label>
              <input
                type="text"
                value={student.district}
                onChange={(e) => handleInputChange(index, 'district', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {/* Standard */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Standard <span className="text-red-500"> * </span></label>
              <select
                value={student.standard}
                onChange={(e) => handleInputChange(index, 'standard', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Select Standard</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500"> * </span></label>
              <input
                type="email"
                value={student.email}
                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Contact Number <span className="text-red-500"> * </span></label>
              <input
                type="tel"
                value={student.contactNumber}
                maxLength={10}
                onChange={(e) => handleInputChange(index, 'contactNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
        </div>
      ))}

      {/* <div className="pt-6 flex justify-between"> */}


        {/* <button
          type="submit"
          className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300 font-medium"
        >
          Save & Continue
        </button> */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Back
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900"
          >
            Next
          </button>
        </div>

      {/* </div> */}

      <ToastContainer position="top-center" autoClose={3000} />
    </form>
  );
};

export default StudentDetailsForm;

