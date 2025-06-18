
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLoginType: (type: 'school' | 'evaluator') => void;
}

export function LoginDropdown({ isOpen, onClose, onSelectLoginType }: LoginDropdownProps) {
  const navigate = useNavigate(); // Get the navigate function to use in the onClick handlers

  const handleSelectLoginType = (type: 'school' | 'evaluator') => {
    onSelectLoginType(type);
    if (type === 'evaluator') {
      // Navigate to Evaluator Login page
      navigate('/evaluator-login');
    }
    onClose(); // Close the dropdown when an option is selected
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50"
        >
          <button
            onClick={() => handleSelectLoginType('school')}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 rounded-t-lg"
          >
            <School className="w-5 h-5 mr-3 text-red-800" />
            School Login
          </button>
          
          <button
            onClick={() => handleSelectLoginType('evaluator')}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 rounded-b-lg"
          >
            <Scale className="w-5 h-5 mr-3 text-red-800" />
            Evaluator Login
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
