// import React, { useState } from 'react';

// interface Props {
//   initialData: any;
//   onNext: (data: any) => void;
//   onBack: () => void;
// }


// const ProjectDetailsForm: React.FC<Props> = ({ initialData, onNext, onBack }) => {
//   const [data, setData] = useState({
//     teamSize: initialData?.teamSize || 2,
//     ideaTitle: initialData?.ideaTitle || '',
//     ideaDescription: initialData?.ideaDescription || '',
//     problemStatement: initialData?.problemStatement || '',
//     solution: initialData?.solution || '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext(data);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Idea Title <span className="text-red-500"> * </span></label>
//       <input
//         type="text"
//         placeholder="Idea Title"
//         value={data.ideaTitle}
//         onChange={(e) => setData({ ...data, ideaTitle: e.target.value })}
//         required
//         className="border p-2 mb-2 w-full"
//       />

//       <label>Idea Description <span className="text-red-500"> * </span> <span className="text-gray-500 text-xs">(Max 100 characters only allowed)</span></label>
//       <textarea
//         placeholder="Idea Description"
//         value={data.ideaDescription}
//         onChange={(e) => setData({ ...data, ideaDescription: e.target.value })}
//         maxLength={100}
//         required
//         className="border p-2 mb-2 w-full"
//       />

//       <label>Problem Statement <span className="text-red-500"> * </span> <span className="text-gray-500 text-xs">(Max 100 characters only allowed)</span></label>
//       <textarea
//         placeholder="What problem are you solving?"
//         value={data.problemStatement}
//         onChange={(e) => setData({ ...data, problemStatement: e.target.value })}
//         maxLength={100}
//         required
//         className="border p-2 mb-2 w-full"
//       />

//       <label>Proposed Solution <span className="text-red-500"> * </span> <span className="text-gray-500 text-xs">(Max 100 characters only allowed)</span></label>
//       <textarea
//         placeholder="Describe your solution"
//         value={data.solution}
//         onChange={(e) => setData({ ...data, solution: e.target.value })}
//         maxLength={100}
//         required
//         className="border p-2 mb-2 w-full"
//       />

//       <label>Team Members <span className="text-red-500"> * </span></label>
//       <input
//         type="number"
//         placeholder="Team Size"
//         value={data.teamSize}
//         min={2}
//         max={5}
//         onChange={(e) => {
//           const value = parseInt(e.target.value);
//           if (value >= 2 && value <= 5) {
//             setData({ ...data, teamSize: value });
//           }
//         }}
//         required
//         className="border p-2 mb-2 w-full"
//       />


//       {/* Buttons */}
//       <div className="flex justify-between mt-4">
//         <button
//           type="button"
//           onClick={onBack}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//         >
//           Back
//         </button>

//         <button
//           type="submit"
//           className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900"
//         >
//           Next
//         </button>
//       </div>

//     </form>
//   );
// };

// export default ProjectDetailsForm;


import React, { useState, useEffect } from 'react';

interface Props {
  initialData?: {
    teamSize?: number;
    ideaTitle?: string;
    ideaDescription?: string;
    problemStatement?: string;
    solution?: string;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const ProjectDetailsForm: React.FC<Props> = ({ initialData = {}, onNext, onBack }) => {
  const [data, setData] = useState({
    teamSize: initialData.teamSize ?? 2,
    ideaTitle: initialData.ideaTitle ?? '',
    ideaDescription: initialData.ideaDescription ?? '',
    problemStatement: initialData.problemStatement ?? '',
    solution: initialData.solution ?? '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // compute validity whenever fields change
  useEffect(() => {
    const titleValid = data.ideaTitle.trim().length > 0;
    const descValid = data.ideaDescription.trim().length > 0;
    const problemValid = data.problemStatement.trim().length > 0;
    const solutionValid = data.solution.trim().length > 0;
    const teamValid = Number.isInteger(data.teamSize) && data.teamSize >= 2 && data.teamSize <= 5;

    setIsFormValid(titleValid && descValid && problemValid && solutionValid && teamValid);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // final guard
    if (!isFormValid) {
      // optionally show a user-visible message here (toast/snackbar)
      return;
    }
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block font-medium mb-1">Idea Title <span className="text-red-500"> * </span></label>
      <input
        type="text"
        placeholder="Idea Title"
        value={data.ideaTitle}
        onChange={(e) => setData({ ...data, ideaTitle: e.target.value })}
        required
        className="border p-2 mb-2 w-full"
      />

      <label className="block font-medium mb-1">
        Idea Description <span className="text-red-500"> * </span>
        <span className="text-gray-500 text-xs ml-2">(Max 100 characters)</span>
      </label>
      <textarea
        placeholder="Idea Description"
        value={data.ideaDescription}
        onChange={(e) => setData({ ...data, ideaDescription: e.target.value.slice(0, 100) })}
        maxLength={100}
        required
        className="border p-2 mb-2 w-full"
      />

      <label className="block font-medium mb-1">
        Problem Statement <span className="text-red-500"> * </span>
        <span className="text-gray-500 text-xs ml-2">(Max 100 characters)</span>
      </label>
      <textarea
        placeholder="What problem are you solving?"
        value={data.problemStatement}
        onChange={(e) => setData({ ...data, problemStatement: e.target.value.slice(0, 100) })}
        maxLength={100}
        required
        className="border p-2 mb-2 w-full"
      />

      <label className="block font-medium mb-1">
        Proposed Solution <span className="text-red-500"> * </span>
        <span className="text-gray-500 text-xs ml-2">(Max 100 characters)</span>
      </label>
      <textarea
        placeholder="Describe your solution"
        value={data.solution}
        onChange={(e) => setData({ ...data, solution: e.target.value.slice(0, 100) })}
        maxLength={100}
        required
        className="border p-2 mb-2 w-full"
      />

      <label className="block font-medium mb-1">Team Members <span className="text-red-500"> * </span></label>
      <input
        type="number"
        placeholder="Team Size"
        value={data.teamSize}
        min={2}
        max={5}
        onChange={(e) => {
          const v = Number(e.target.value);
          // allow user to type but only accept integers in range
          if (Number.isNaN(v)) {
            setData({ ...data, teamSize: 0 }); // invalid until corrected
            return;
          }
          setData({ ...data, teamSize: Math.trunc(v) });
        }}
        required
        className="border p-2 mb-2 w-full"
      />

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
          disabled={!isFormValid}
          className={`px-4 py-2 rounded-md ${isFormValid ? 'bg-red-800 text-white hover:bg-red-900' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default ProjectDetailsForm;
