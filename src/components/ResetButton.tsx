import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
  isDark: boolean;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset, isDark }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onReset}
      className={`p-2 rounded-lg transition-colors ${
        isDark 
          ? 'hover:bg-sysco-input text-red-600' 
          : 'hover:bg-gray-100 text-red-600'
      }`}
      aria-label="Reset chat"
    >
      <RefreshCw size={20} />
    </motion.button>
  );
};