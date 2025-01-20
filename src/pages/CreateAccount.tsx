import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Building2, UserSquare2, Loader2 } from 'lucide-react';

// Props for CreateAccount component
interface CreateAccountProps {
  onBack: () => void; // Callback to navigate back to the previous view
}

export const CreateAccount: React.FC<CreateAccountProps> = ({ onBack }) => {
  const [employeeId, setEmployeeId] = useState(''); // State to store employee ID input
  const [position, setPosition] = useState(''); // State to store position input
  const [email, setEmail] = useState(''); // State to store email input
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if the account creation was successful
  const [isLoading, setIsLoading] = useState(false); // Tracks the loading state of the form submission
  const [error, setError] = useState<string | null>(null); // Stores error messages

  // Handles form submission for account creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    setIsSubmitted(false); // Reset submission state
    setError(null); // Clear previous errors

    const payload = {
      email,
      employee_id: employeeId,
      company_position: position,
    };

    try {
      // API call to create a new account
      const response = await fetch('https://codefest-backend.azurewebsites.net/user/admin/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true); // Mark as successfully submitted
      } else {
        console.error(data.detail || 'An error occurred'); // Log server-side error
        const extractedError = data.detail.split(':').pop()?.trim(); // Extract specific error message
        setError(extractedError || 'Failed to create account.'); // Display error to the user
      }
    } catch (error) {
      console.error('Error:', error); // Log client-side error
      setError('A network error occurred. Please try again later.'); // Notify user of network issue
    } finally {
      setIsLoading(false); // Stop loading indicator
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
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Enter your details to request an account</p>
          </div>

          {error && (
            <div className="bg-red-600/20 text-red-400 border border-red-600 p-4 rounded-lg mb-6">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <motion.div
            className="bg-sysco-card/80 backdrop-blur-xl rounded-xl p-8 border border-gray-800/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserSquare2 className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sysco-input/50 backdrop-blur-xl text-white rounded-lg border border-gray-800 focus:ring-1 focus:ring-sysco-blue focus:border-sysco-blue transition-colors"
                  placeholder="Employee ID"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sysco-input/50 backdrop-blur-xl text-white rounded-lg border border-gray-800 focus:ring-1 focus:ring-sysco-blue focus:border-sysco-blue transition-colors"
                  placeholder="Company Position"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sysco-input/50 backdrop-blur-xl text-white rounded-lg border border-gray-800 focus:ring-1 focus:ring-sysco-blue focus:border-sysco-blue transition-colors"
                  placeholder="Company Email"
                  required
                  disabled={isLoading}
                />
              </div>

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
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
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
          <h2 className="text-2xl font-bold text-white mb-4">Request Submitted</h2>
          <p className="text-gray-400 mb-6">
            The Sysco admin team will review your details and send your login credentials via email if approved.
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
