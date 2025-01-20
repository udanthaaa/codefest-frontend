import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean; // Indicates whether the current theme is dark
  onToggle: () => void; // Callback function to toggle the theme
}


export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`p-2 rounded-lg transition-colors ${
        isDark 
          ? 'hover:bg-sysco-input text-sysco-blue' 
          : 'hover:bg-gray-100 text-sysco-blue'
      }`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </motion.button>
  );
};