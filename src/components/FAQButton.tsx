import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQBox } from './FAQBox';
import { FAQ_QUESTIONS } from '../types';

interface FAQButtonProps {
  onSelectQuestion: (question: string) => void;
  isDark: boolean;
}

export const FAQButton: React.FC<FAQButtonProps> = ({ onSelectQuestion, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full transition-colors ${
          isDark ? 'hover:bg-sysco-input/90' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <Menu size={20} className={isDark ? 'text-white' : 'text-gray-700'} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <FAQBox
            isDark={isDark}
            questions={FAQ_QUESTIONS}
            onClose={() => setIsOpen(false)}
            onSelectQuestion={onSelectQuestion}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
