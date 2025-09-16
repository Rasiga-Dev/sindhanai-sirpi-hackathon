
import React, { useState } from 'react';

interface Props {
  initialData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}


const ProjectDetailsForm: React.FC<Props> = ({ initialData, onNext, onBack }) => {
  const [data, setData] = useState({
    teamSize: initialData?.teamSize || 3,
    ideaTitle: initialData?.ideaTitle || '',
    ideaDescription: initialData?.ideaDescription || '',
    problemStatement: initialData?.problemStatement || '',
    solution: initialData?.solution || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Idea Title <span className="text-red-500"> * </span></label>
      <input
        type="text"
        placeholder="Idea Title"
        value={data.ideaTitle}
        onChange={(e) => setData({ ...data, ideaTitle: e.target.value })}
        required
        className="border p-2 mb-2 w-full"
      />

      <label>Idea Description <span className="text-red-500"> * </span> <span className="text-gray-500 text-xs">(Max 100 characters only allowed)</span></label>
      <textarea
        placeholder="Idea Description"
        value={data.ideaDescription}
        onChange={(e) => setData({ ...data, ideaDescription: e.target.value })}
        maxLength={100}
        required
        className="border p-2 mb-2 w-full"
      />

      <label>Problem Statement <span className="text-red-500"> * </span> <span className="text-gray-500 text-xs">(Max 100 characters only allowed)</span></label>
      <textarea
        placeholder="What problem are you solving?"
        value={data.problemStatement}
        onChange={(e) => setData({ ...data, problemStatement: e.target.value })}
        maxLength={100}
        required
        className="border p-2 mb-2 w-full"
      />

      <label>Proposed Solution <span className="text-red-500"> * </span> <span className="text-gray-500 text-xs">(Max 100 characters only allowed)</span></label>
      <textarea
        placeholder="Describe your solution"
        value={data.solution}
        onChange={(e) => setData({ ...data, solution: e.target.value })}
        maxLength={100}
        required
        className="border p-2 mb-2 w-full"
      />

      <label>Team Members <span className="text-red-500"> * </span></label>
      <input
        type="number"
        placeholder="Team Size"
        value={data.teamSize}
        min={2}
        max={5}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value >= 2 && value <= 5) {
            setData({ ...data, teamSize: value });
          }
        }}
        required
        className="border p-2 mb-2 w-full"
      />


      {/* Buttons */}
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

    </form>
  );
};

export default ProjectDetailsForm;
