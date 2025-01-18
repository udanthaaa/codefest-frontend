import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, MoreVertical, RefreshCw, Sun, Moon, X, Settings } from 'lucide-react';
import { ChatSettings, DEFAULT_CHAT_SETTINGS } from '../types';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onReset: () => void;
  onLogout: () => void;
  onSettingsChange: (settings: ChatSettings) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onThemeToggle,
  onReset,
  onLogout,
  onSettingsChange
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_CHAT_SETTINGS);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const handleSettingsChange = (newSettings: ChatSettings) => {
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const MobileMenuItem = ({ icon: Icon, label, onClick, className = '' }: { 
    icon: typeof LogOut;
    label: string;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={() => {
        onClick();
        setShowMobileMenu(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-sysco-input/50 transition-colors ${className}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`backdrop-blur-xl ${
          isDark
            ? 'bg-black/90 border-b border-gray-800'
            : 'bg-white/90 border-b border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.img
              src="https://companieslogo.com/img/orig/SYY-ba9b2954.png?t=1720244494"
              alt="Logo"
              className="w-8 h-8"
            />
            <div>
              <h1 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                SyscoPulse
              </h1>
              <p className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>
                {getGreeting()}, welcome back!
              </p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-4">

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-sysco-input text-sysco-blue'
                  : 'hover:bg-gray-100 text-sysco-blue'
              }`}
              aria-label="Settings"
            >
              <Settings size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-sysco-input text-sysco-blue'
                  : 'hover:bg-gray-100 text-sysco-blue'
              }`}
            ><motion.div
            initial={false}
            animate={{ rotate: isDark ? 0 : 360 }}
            transition={{ duration: 0.8 }}
          >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}</motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogoutConfirm(true)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-sysco-input text-red-600'
                  : 'hover:bg-gray-100 text-red-600'
              }`}
            >
              <LogOut size={20} />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMobileMenu(true)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-sysco-input text-gray-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <MoreVertical size={20} />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className={`fixed right-0 top-0 bottom-0 w-64 z-50 md:hidden ${
                isDark ? 'bg-sysco-card text-white' : 'bg-white text-gray-900'
              }`}
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-sysco-input/50 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <MobileMenuItem
                  icon={RefreshCw}
                  label="Reset Chat"
                  onClick={onReset}
                  className="text-red-500"
                />
                <MobileMenuItem
                  icon={Settings}
                  label="Settings"
                  onClick={() => setShowSettings(true)}
                  className="text-sysco-blue"
                />
                <MobileMenuItem
                  icon={isDark ? Sun : Moon}
                  label={isDark ? 'Light Mode' : 'Dark Mode'}
                  onClick={onThemeToggle}
                  className="text-sysco-blue"
                />
                <MobileMenuItem
                  icon={LogOut}
                  label="Logout"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="text-red-500"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            settings={settings}
            onSettingsChange={handleSettingsChange}
            isDark={isDark}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 rounded-lg shadow-lg w-[90%] max-w-sm mx-4 ${
                isDark ? 'bg-sysco-card text-white' : 'bg-white text-gray-900'
              }`}
            >
              <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
              <p className="mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-sysco-input hover:bg-sysco-input/80'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};