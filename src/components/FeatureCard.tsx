import React from 'react';
import { motion } from 'framer-motion';

// FeatureCardProps defines the structure of the props passed to the FeatureCard component.
// It includes the title, a list of items, an icon, and a flag to indicate the theme.
interface FeatureCardProps {
  title: string; // Title displayed on the feature card
  items: string[]; // Array of items or features to be listed on the card
  icon: string; // Icon representing the feature (could be an icon name or image URL)
  isDark: boolean; // Indicates whether dark mode is active, used to adjust styles
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, items, icon, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`rounded-2xl p-6 transition-colors ${
        isDark 
          ? 'bg-sysco-card border border-gray-800' 
          : 'bg-white border border-gray-200 shadow-xl'
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h2>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`cursor-pointer transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};