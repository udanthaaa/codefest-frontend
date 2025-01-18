import React from 'react';
import { motion } from 'framer-motion';

interface LoadingMessageProps {
  isDark: boolean;
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({ isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start max-w-4xl mx-auto"
    >
      <div className={`max-w-[80%] rounded-2xl px-6 py-3 ${
        isDark 
          ? 'bg-sysco-card shadow-sysco-glow' 
          : 'bg-white border border-gray-200 shadow-sysco-glow'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-sysco-blue"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Thinking...
          </span>
        </div>
      </div>
    </motion.div>
  );
};