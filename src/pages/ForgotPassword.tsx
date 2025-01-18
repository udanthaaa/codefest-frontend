/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://codefest-backend.azurewebsites.net/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setIsSubmitted(true);
        } else {
          throw new Error('Unexpected response from server.');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send password reset request.');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-md relative z-10"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        disabled={isLoading}
        className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 disabled:opacity-50"
      >
        <ArrowLeft size={20} />
        Back to Login
      </motion.button>

      {!isSubmitted ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-400">Enter your email to reset your password</p>
          </div>

          <motion.div
            className="bg-sysco-card/80 backdrop-blur-xl rounded-xl p-8 border border-gray-800/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sysco-input/50 backdrop-blur-xl text-white rounded-lg border border-gray-800 focus:ring-1 focus:ring-sysco-blue focus:border-sysco-blue transition-colors"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-sysco-blue text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-sysco-blue/90'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </motion.button>
            </form>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-sysco-card/80 backdrop-blur-xl rounded-xl p-8 border border-gray-800/50 text-center"
        >
          <div className="w-16 h-16 bg-sysco-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-sysco-blue" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
          <p className="text-gray-400 mb-6">
            The Sysco admin team will send you instructions to reset your password via email.
          </p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onBack}
            className="w-full py-3 px-4 bg-sysco-blue text-white rounded-lg font-medium hover:bg-sysco-blue/90 transition-colors"
          >
            Back to Login
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
