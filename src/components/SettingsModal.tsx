import React from 'react';
import { motion } from 'framer-motion';
import { X, Sliders } from 'lucide-react';
import { ChatSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean; // Determines if the modal is displayed
  onClose: () => void; // Callback to close the modal
  settings: ChatSettings; // Current chat settings
  onSettingsChange: (settings: ChatSettings) => void; // Callback to update settings
  isDark: boolean; // Indicates if the dark theme is enabled
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  isDark,
}) => {
  // Return null if the modal is not open
  if (!isOpen) return null;

  // Variants for modal animation
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 }, // Hidden state
    visible: { opacity: 1, y: 0, scale: 1 }, // Visible state
    exit: { opacity: 0, scale: 0.95 }, // Exit animation
  };

  // Variants for overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 }, // Hidden state
    visible: { opacity: 0.5 }, // Visible state
    exit: { opacity: 0 }, // Exit animation
  };

  // Helper function to update specific settings
  const updateSettings = <K extends keyof ChatSettings>(
    key: K,
    value: ChatSettings[K]
  ) => {
    onSettingsChange({
      ...settings, // Keep existing settings
      [key]: value, // Update the specified setting
    });
  };


  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black z-40"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-4 z-50 flex items-center justify-center"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div
          className={`w-full max-w-lg rounded-xl shadow-lg ${
            isDark ? 'bg-sysco-card text-white' : 'bg-white text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Chat Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sysco-input/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Language</label>
              <select
                value={settings.language}
                onChange={(e) =>
                  updateSettings('language', e.target.value as ChatSettings['language'])
                }
                className={`w-full p-2 rounded-lg ${
                  isDark
                    ? 'bg-sysco-input text-white border-gray-800'
                    : 'bg-gray-100 text-gray-900 border-gray-200'
                } border focus:ring-1 focus:ring-sysco-blue`}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Politeness Level</label>
              <select
                value={settings.politenessLevel}
                onChange={(e) =>
                  updateSettings('politenessLevel', e.target.value as ChatSettings['politenessLevel'])
                }
                className={`w-full p-2 rounded-lg ${
                  isDark
                    ? 'bg-sysco-input text-white border-gray-800'
                    : 'bg-gray-100 text-gray-900 border-gray-200'
                } border focus:ring-1 focus:ring-sysco-blue`}
              >
                <option value="Friendly">Friendly</option>
                <option value="Neutral">Neutral</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Formality</label>
              <select
                value={settings.formality}
                onChange={(e) =>
                  updateSettings('formality', e.target.value as ChatSettings['formality'])
                }
                className={`w-full p-2 rounded-lg ${
                  isDark
                    ? 'bg-sysco-input text-white border-gray-800'
                    : 'bg-gray-100 text-gray-900 border-gray-200'
                } border focus:ring-1 focus:ring-sysco-blue`}
              >
                <option value="Formal">Formal</option>
                <option value="Semi-formal">Semi-formal</option>
                <option value="Informal">Informal</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Creativity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.creativity}
                onChange={(e) => updateSettings('creativity', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Conservative</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Response Length</label>
              <select
                value={settings.responseLength}
                onChange={(e) =>
                  updateSettings('responseLength', e.target.value as ChatSettings['responseLength'])
                }
                className={`w-full p-2 rounded-lg ${
                  isDark
                    ? 'bg-sysco-input text-white border-gray-800'
                    : 'bg-gray-100 text-gray-900 border-gray-200'
                } border focus:ring-1 focus:ring-sysco-blue`}
              >
                <option value="Brief">Brief</option>
                <option value="Medium">Medium</option>
                <option value="Detailed">Detailed</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};