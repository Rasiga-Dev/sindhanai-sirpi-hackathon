
// import React, { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface Student {
//   name: string;
//   fatherName: string;
//   dateOfBirth: string;
//   gender: 'male' | 'female' | 'other';
//   community: 'BC' | 'MBC' | 'ST' | 'SC' | 'General';
//   district: string;
//   standard: string;
//   email: string;
//   contactNumber: string;
// }

// interface StudentDetailsFormProps {
//   teamMemberCount: number;
//   onNext: (data: Student[]) => void;
//   onBack: () => void;
//   initialData?: Student[];
// }

// const StudentDetailsForm: React.FC<StudentDetailsFormProps> = ({ teamMemberCount, onNext, onBack, initialData }) => {
//   const [students, setStudents] = useState<Student[]>(initialData || Array.from({ length: teamMemberCount }, () => ({
//     name: '',
//     fatherName: '',
//     dateOfBirth: '',
//     gender: 'male',
//     community: 'General',
//     district: '',
//     standard: '',
//     email: '',
//     contactNumber: ''
//   })));

//   // This will reset the form values when `initialData` changes
//   useEffect(() => {
//     if (initialData) {
//       setStudents(initialData);
//     }
//   }, [initialData]);

//   const handleInputChange = (index: number, field: keyof Student, value: string) => {
//     const updatedStudents = [...students];

//     // Validate name, fatherName, district: only letters and space
//     if (['name', 'fatherName', 'district'].includes(field)) {
//       const regex = /^[a-zA-Z\s]*$/;
//       if (!regex.test(value)) {
//         // toast.error('Only letters and spaces are allowed.');
//         return;
//       }
//     }

//     // Validate contact number: only digits and max 10 digits
//     if (field === 'contactNumber') {
//       const regex = /^[0-9]*$/;
//       if (!regex.test(value)) {
//         toast.error('Only numbers are allowed.');
//         return;
//       }
//       if (value.length > 10) {
//         toast.error('Contact number must be exactly 10 digits.');
//         return;
//       }
//     }

//     updatedStudents[index] = { ...updatedStudents[index], [field]: value };
//     setStudents(updatedStudents);
//   };

//   const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     for (const student of students) {
//       if (
//         !student.name ||
//         !student.fatherName ||
//         !student.dateOfBirth ||
//         !student.district ||
//         !student.standard ||
//         !student.email ||
//         !student.contactNumber
//       ) {
//         toast.error('Please fill all required fields.');
//         return;
//       }

//       if (!validateEmail(student.email)) {
//         toast.error('Please enter a valid email address.');
//         return;
//       }

//       if (student.contactNumber.length !== 10) {
//         toast.error('Contact number must be exactly 10 digits.');
//         return;
//       }
//     }

//     toast.success('All details are valid!');
//     onNext(students);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {students.map((student, index) => (
//         <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
//           <h3 className="text-xl font-semibold text-red-800 mb-6">Student {index + 1}</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Name */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Name <span className="text-red-500"> * </span></label>
//               <input
//                 type="text"
//                 value={student.name}
//                 onChange={(e) => handleInputChange(index, 'name', e.target.value)}
//                  maxLength={50}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               />
//             </div>

//             {/* Father’s Name */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Father's Name <span className="text-red-500"> * </span></label>
//               <input
//                 type="text"
//                 value={student.fatherName}
//                 onChange={(e) => handleInputChange(index, 'fatherName', e.target.value)}
//                  maxLength={50}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               />
//             </div>

//             {/* Date of Birth */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Date of Birth <span className="text-red-500"> * </span></label>
//               <input
//                 type="date"
//                 value={student.dateOfBirth}
//                 onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               />
//             </div>

//             {/* Gender */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Gender <span className="text-red-500"> * </span></label>
//               <select
//                 value={student.gender}
//                 onChange={(e) => handleInputChange(index, 'gender', e.target.value as 'male' | 'female' | 'other')}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             {/* Community */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Community <span className="text-red-500"> * </span></label>
//               <select
//                 value={student.community}
//                 onChange={(e) => handleInputChange(index, 'community', e.target.value as 'BC' | 'MBC' | 'ST' | 'SC' | 'General')}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               >
//                 <option value="BC">BC</option>
//                 <option value="MBC">MBC</option>
//                 <option value="ST">ST</option>
//                 <option value="SC">SC</option>
//                 <option value="OC">OC</option>

//                 <option value="General">General</option>
//               </select>
//             </div>

//             {/* District */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">District <span className="text-red-500"> * </span></label>
//               <input
//                 type="text"
//                 value={student.district}
//                 onChange={(e) => handleInputChange(index, 'district', e.target.value)}
//                  maxLength={50}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               />
//             </div>

//             {/* Standard */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Standard <span className="text-red-500"> * </span></label>
//               <select
//                 value={student.standard}
//                 onChange={(e) => handleInputChange(index, 'standard', e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               >
//                 <option value="">Select Standard</option>
//                 <option value="6th">6th</option>
//                 <option value="7th">7th</option>
//                 <option value="8th">8th</option>
//                 <option value="9th">9th</option>
//                 <option value="10th">10th</option>
//                 <option value="11th">11th</option>
//                 <option value="12th">12th</option>
//               </select>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500"> * </span></label>
//               <input
//                 type="email"
//                 value={student.email}
//                 onChange={(e) => handleInputChange(index, 'email', e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               />
//             </div>

//             {/* Contact Number */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Contact Number <span className="text-red-500"> * </span></label>
//               <input
//                 type="tel"
//                 value={student.contactNumber}
//                 maxLength={10}
//                 onChange={(e) => handleInputChange(index, 'contactNumber', e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       ))}

     
//         <div className="flex justify-between mt-4">
//           <button
//             type="button"
//             onClick={onBack}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//           >
//             Back
//           </button>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900"
//           >
//             Next
//           </button>
//         </div>

//       {/* </div> */}

//       <ToastContainer position="top-center" autoClose={3000} />
//     </form>
//   );
// };

// export default StudentDetailsForm;



import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Student {
  name: string;
  fatherName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  community: 'BC' | 'MBC' | 'ST' | 'SC' | 'General' | 'OC';
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

type StudentErrors = {
  name: string;
  fatherName: string;
  dateOfBirth: string;
  district: string;
  standard: string;
  email: string;
  contactNumber: string;
};

type StudentTouched = {
  name: boolean;
  fatherName: boolean;
  dateOfBirth: boolean;
  district: boolean;
  standard: boolean;
  email: boolean;
  contactNumber: boolean;
};

const emptyStudent = (): Student => ({
  name: '',
  fatherName: '',
  dateOfBirth: '',
  gender: 'male',
  community: 'General',
  district: '',
  standard: '',
  email: '',
  contactNumber: '',
});

const StudentDetailsForm: React.FC<StudentDetailsFormProps> = ({ teamMemberCount, onNext, onBack, initialData }) => {
  const [students, setStudents] = useState<Student[]>(
    initialData || Array.from({ length: teamMemberCount }, () => emptyStudent())
  );

  const [errors, setErrors] = useState<StudentErrors[]>(
    Array.from({ length: students.length }, () => ({
      name: '',
      fatherName: '',
      dateOfBirth: '',
      district: '',
      standard: '',
      email: '',
      contactNumber: '',
    }))
  );

  const [touched, setTouched] = useState<StudentTouched[]>(
    Array.from({ length: students.length }, () => ({
      name: false,
      fatherName: false,
      dateOfBirth: false,
      district: false,
      standard: false,
      email: false,
      contactNumber: false,
    }))
  );

  const [isAllValid, setIsAllValid] = useState(false);

  // sync when initialData or teamMemberCount changes
  useEffect(() => {
    if (initialData) {
      setStudents(initialData);
      const n = initialData.length;
      setErrors(
        Array.from({ length: n }, () => ({
          name: '',
          fatherName: '',
          dateOfBirth: '',
          district: '',
          standard: '',
          email: '',
          contactNumber: '',
        }))
      );
      setTouched(
        Array.from({ length: n }, () => ({
          name: false,
          fatherName: false,
          dateOfBirth: false,
          district: false,
          standard: false,
          email: false,
          contactNumber: false,
        }))
      );
    } else {
      setStudents(Array.from({ length: teamMemberCount }, () => emptyStudent()));
      const n = teamMemberCount;
      setErrors(
        Array.from({ length: n }, () => ({
          name: '',
          fatherName: '',
          dateOfBirth: '',
          district: '',
          standard: '',
          email: '',
          contactNumber: '',
        }))
      );
      setTouched(
        Array.from({ length: n }, () => ({
          name: false,
          fatherName: false,
          dateOfBirth: false,
          district: false,
          standard: false,
          email: false,
          contactNumber: false,
        }))
      );
    }
  }, [initialData, teamMemberCount]);

  // Validators
  const nameValidator = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Name is required';
    if (trimmed.length < 1) return 'Name is required';
    if (trimmed.length > 50) return 'Max 50 characters allowed';
    if (!/^[A-Za-z\s]+$/.test(trimmed)) return 'Only letters and spaces allowed';
    return '';
  };

  const fatherNameValidator = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Father's name is required";
    if (trimmed.length > 50) return 'Max 50 characters allowed';
    if (!/^[A-Za-z\s]+$/.test(trimmed)) return 'Only letters and spaces allowed';
    return '';
  };

  const dobValidator = (val: string) => {
    if (!val) return 'Date of birth is required';
    return '';
  };

  const districtValidator = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'District is required';
    if (trimmed.length > 50) return 'Max 50 characters allowed';
    if (!/^[A-Za-z\s]+$/.test(trimmed)) return 'Only letters and spaces allowed';
    return '';
  };

  const standardValidator = (val: string) => {
    if (!val) return 'Standard is required';
    return '';
  };

  const emailValidator = (val: string) => {
    if (!val) return 'Email is required';
    // basic email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email';
    return '';
  };

  const contactValidator = (val: string) => {
    if (!val) return 'Contact number is required';
    if (!/^\d{10}$/.test(val)) return 'Must be exactly 10 digits';
    if (!/^[6-9]/.test(val)) return 'Must start with 6-9';
    return '';
  };

  // validate one student and return errors object
  const validateStudent = (s: Student): StudentErrors => {
    return {
      name: nameValidator(s.name),
      fatherName: fatherNameValidator(s.fatherName),
      dateOfBirth: dobValidator(s.dateOfBirth),
      district: districtValidator(s.district),
      standard: standardValidator(s.standard),
      email: emailValidator(s.email),
      contactNumber: contactValidator(s.contactNumber),
    };
  };

  // whenever students change, validate them and set overall flag
  useEffect(() => {
    const nextErrors = students.map((s) => validateStudent(s));
    setErrors(nextErrors);
    const allValid = nextErrors.every(
      (err) =>
        !err.name &&
        !err.fatherName &&
        !err.dateOfBirth &&
        !err.district &&
        !err.standard &&
        !err.email &&
        !err.contactNumber
    );
    setIsAllValid(allValid);
  }, [students]);

  // controlled change handler
  const handleInputChange = (index: number, field: keyof Student, rawValue: string) => {
    const updated = [...students];
    let value = rawValue;

    // enforce allowed characters for certain fields while typing
    if (field === 'name' || field === 'fatherName' || field === 'district') {
      // allow letters and spaces only, and max 50 chars
      value = value.replace(/[^A-Za-z\s]/g, '').slice(0, 50);
    }

    if (field === 'contactNumber') {
      // allow only digits up to 10
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    updated[index] = { ...updated[index], [field]: value };
    setStudents(updated);

    // mark touched for that field so inline error shows
    const t = [...touched];
    t[index] = { ...t[index], [field]: true };
    setTouched(t);

    // update errors for that student immediately
    const e = [...errors];
    const validated = validateStudent(updated[index]);
    e[index] = validated;
    setErrors(e);
  };

  // mark field touched on blur (optional, sometimes user may paste etc)
  const handleBlur = (index: number, field: keyof Student) => {
    const t = [...touched];
    t[index] = { ...t[index], [field]: true };
    setTouched(t);

    // ensure errors updated
    const e = [...errors];
    e[index] = validateStudent(students[index]);
    setErrors(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // mark all touched to show all errors if any
    setTouched((prev) =>
      prev.map(() => ({
        name: true,
        fatherName: true,
        dateOfBirth: true,
        district: true,
        standard: true,
        email: true,
        contactNumber: true,
      }))
    );

    // final validation
    const nextErrors = students.map((s) => validateStudent(s));
    setErrors(nextErrors);

    const hasErr = nextErrors.some(
      (err) =>
        err.name ||
        err.fatherName ||
        err.dateOfBirth ||
        err.district ||
        err.standard ||
        err.email ||
        err.contactNumber
    );

    if (hasErr) {
      toast.error('Please fix the highlighted errors before proceeding.');
      return;
    }

    // success
    toast.success('All details valid — proceeding.');
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
              <label className="block text-gray-700 font-medium mb-2">
                Name <span className="text-red-500"> * </span>
              </label>
              <input
                type="text"
                value={student.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                onBlur={() => handleBlur(index, 'name')}
                maxLength={50}
                className={`w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500 ${
                  touched[index]?.name && errors[index]?.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched[index]?.name && errors[index]?.name && (
                <p className="text-red-600 text-sm mt-1">{errors[index].name}</p>
              )}
            </div>

            {/* Father’s Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Father's Name <span className="text-red-500"> * </span>
              </label>
              <input
                type="text"
                value={student.fatherName}
                onChange={(e) => handleInputChange(index, 'fatherName', e.target.value)}
                onBlur={() => handleBlur(index, 'fatherName')}
                maxLength={50}
                className={`w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500 ${
                  touched[index]?.fatherName && errors[index]?.fatherName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched[index]?.fatherName && errors[index]?.fatherName && (
                <p className="text-red-600 text-sm mt-1">{errors[index].fatherName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth <span className="text-red-500"> * </span>
              </label>
              <input
                type="date"
                value={student.dateOfBirth}
                onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                onBlur={() => handleBlur(index, 'dateOfBirth')}
                className={`w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500 ${
                  touched[index]?.dateOfBirth && errors[index]?.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched[index]?.dateOfBirth && errors[index]?.dateOfBirth && (
                <p className="text-red-600 text-sm mt-1">{errors[index].dateOfBirth}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gender <span className="text-red-500"> * </span>
              </label>
              <select
                value={student.gender}
                onChange={(e) => handleInputChange(index, 'gender', e.target.value as any)}
                className="w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Community */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Community <span className="text-red-500"> * </span>
              </label>
              <select
                value={student.community}
                onChange={(e) => handleInputChange(index, 'community', e.target.value as any)}
                className="w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500"
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
              <label className="block text-gray-700 font-medium mb-2">
                District <span className="text-red-500"> * </span>
              </label>
              <input
                type="text"
                value={student.district}
                onChange={(e) => handleInputChange(index, 'district', e.target.value)}
                onBlur={() => handleBlur(index, 'district')}
                maxLength={50}
                className={`w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500 ${
                  touched[index]?.district && errors[index]?.district ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched[index]?.district && errors[index]?.district && (
                <p className="text-red-600 text-sm mt-1">{errors[index].district}</p>
              )}
            </div>

            {/* Standard */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Standard <span className="text-red-500"> * </span>
              </label>
              <select
                value={student.standard}
                onChange={(e) => handleInputChange(index, 'standard', e.target.value)}
                onBlur={() => handleBlur(index, 'standard')}
                className={`w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500 ${
                  touched[index]?.standard && errors[index]?.standard ? 'border-red-500' : 'border-gray-300'
                }`}
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
              {touched[index]?.standard && errors[index]?.standard && (
                <p className="text-red-600 text-sm mt-1">{errors[index].standard}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500"> * </span>
              </label>
              <input
                type="email"
                value={student.email}
                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                onBlur={() => handleBlur(index, 'email')}
                className={`w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500 ${
                  touched[index]?.email && errors[index]?.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched[index]?.email && errors[index]?.email && (
                <p className="text-red-600 text-sm mt-1">{errors[index].email}</p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Contact Number <span className="text-red-500"> * </span>
              </label>
              <input
                type="tel"
                value={student.contactNumber}
                maxLength={10}
                onChange={(e) => handleInputChange(index, 'contactNumber', e.target.value)}
                onBlur={() => handleBlur(index, 'contactNumber')}
                className={`w-full border rounded-md px-4 py-2 focus:ring-red-500 focus:border-red-500 ${
                  touched[index]?.contactNumber && errors[index]?.contactNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {touched[index]?.contactNumber && errors[index]?.contactNumber && (
                <p className="text-red-600 text-sm mt-1">{errors[index].contactNumber}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          Back
        </button>

        <button
          type="submit"
          className={`px-4 py-2 rounded-md ${isAllValid ? 'bg-red-800 text-white hover:bg-red-900' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
          disabled={!isAllValid}
        >
          Next
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </form>
  );
};

export default StudentDetailsForm;
