/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { LoadingScreen } from '../components/LoadingScreen';
import { ForgotPassword } from './ForgotPassword';
import { CreateAccount } from './CreateAccount';

interface LoginProps {
  onLogin: () => void;
}

type AuthView = 'login' | 'forgot-password' | 'create-account';

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [view, setView] = useState<AuthView>('login');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSigningIn(true);

    try {
      const response = await fetch('https://codefest-backend.azurewebsites.net/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.detail === 'true') {
        setShowLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        onLogin();
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,102,204,0.20) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(60px)"
            }}
          />
          
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/2 w-[150%] h-[150%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,102,204,0.1) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(60px)"
            }}
          />

          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,102,204,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,102,204,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
            }}
          />

          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-sysco-blue/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {view === 'login' ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md relative z-10"
            >
              <div className="text-center mb-8">
                <motion.img
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  src="https://companieslogo.com/img/orig/SYY-ba9b2954.png?t=1720244494"
                  alt="Sysco Logo"
                  className="w-24 h-24 mx-auto mb-6"
                />
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  Welcome Back
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400"
                >
                  Sign in to Sysco Pulse
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-sysco-card/80 backdrop-blur-xl rounded-xl p-8 border border-gray-800/50"
              >
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-500">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        className={`w-full pl-12 pr-4 py-3 bg-sysco-input/50 backdrop-blur-xl text-white rounded-lg border transition-colors ${
                          error ? 'border-red-500/50 focus:border-red-500' : 'border-gray-800 focus:border-sysco-blue'
                        } focus:ring-1 focus:ring-sysco-blue`}
                        placeholder="Email"
                        required
                        disabled={isSigningIn}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        className={`w-full pl-12 pr-4 py-3 bg-sysco-input/50 backdrop-blur-xl text-white rounded-lg border transition-colors ${
                          error ? 'border-red-500/50 focus:border-red-500' : 'border-gray-800 focus:border-sysco-blue'
                        } focus:ring-1 focus:ring-sysco-blue`}
                        placeholder="Password"
                        required
                        disabled={isSigningIn}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setView('forgot-password')}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                      disabled={isSigningIn}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: isSigningIn ? 1 : 1.01 }}
                    whileTap={{ scale: isSigningIn ? 1 : 0.99 }}
                    type="submit"
                    disabled={isSigningIn}
                    className={`w-full py-3 px-4 bg-sysco-blue text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      isSigningIn ? 'opacity-80 cursor-not-allowed' : 'hover:bg-sysco-blue/90'
                    }`}
                  >
                    {isSigningIn ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>

                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => setView('create-account')}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                      disabled={isSigningIn}
                    >
                      Don't have an account? <span className="text-sysco-blue">Create one</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          ) : view === 'forgot-password' ? (
            <ForgotPassword onBack={() => setView('login')} />
          ) : (
            <CreateAccount onBack={() => setView('login')} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};