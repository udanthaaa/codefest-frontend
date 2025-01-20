import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

// FAQBoxProps defines the structure of the props for the FAQBox component.
// It includes a list of questions, callbacks for closing the box and selecting a question, and a boolean for dark mode styling.
interface FAQBoxProps {
  isDark: boolean; // Flag indicating whether dark mode is active, used for styling
  questions: string[]; // Array of questions to display in the FAQ box
  onClose: () => void; // Callback to handle closing the FAQ box
  onSelectQuestion: (question: string) => void; // Callback for selecting a question from the FAQ list
}

export const FAQBox: React.FC<FAQBoxProps> = ({
  isDark,
  questions,
  onClose,
  onSelectQuestion,
}) => {
  // Component logic and JSX will go here
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed bottom-24 w-[90%] max-w-lg "
    >
      <div
        className={`relative p-6 rounded-2xl backdrop-blur-xl shadow-2xl ${
          isDark
            ? 'bg-sysco-card/95 border border-gray-800'
            : 'bg-white/95 border border-gray-200'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDark
              ? 'hover:bg-sysco-input text-gray-300 hover:text-white'
              : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
        >
          <X size={20} />
        </button>

        <h3
          className={`font-semibold mb-4 text-lg ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
           Frequently Asked Questions
        </h3>

        <div className="grid gap-2">
          {questions.map((question, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                onSelectQuestion(question);
                onClose();
              }}
              className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                isDark
                  ? 'hover:bg-sysco-input text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
