/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQButton } from './FAQButton';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: (content: string) => void;
  isDark: boolean;
  isListening: boolean;
  onToggleListening: () => void;
}

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  
export const ChatInput: React.FC<ChatInputProps> = ({ input, onInputChange, onSend, isDark, isListening, onToggleListening }) => {
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';
      setRecognition(speechRecognition);
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onInputChange(input + ' ' + transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  }, [recognition, input, onInputChange]);

  const handleToggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    onToggleListening();
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl ${
        isDark 
          ? 'bg-black/90 border-t border-gray-800' 
          : 'bg-white/90 border-t border-gray-200'
      }`}
    >
      <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
        <FAQButton onSelectQuestion={onSend} isDark={isDark} />
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && input.trim() && onSend(input)}
          placeholder="Type your message..."
          className={`flex-1 px-6 py-3 min-w-1 rounded-full transition-colors shadow-sysco-glow ${
            isDark 
              ? 'bg-sysco-input text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sysco-blue' 
              : 'bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-sysco-blue'
          }`}
        />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleListening}
          className={`p-3 rounded-full transition-colors ${
            isDark 
              ? 'text-white hover:bg-red-600' 
              : 'text-black hover:bg-red-600 hover:text-white'
          }`}
        >
          <Mic size={20} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => input.trim() && onSend(input)}
          className={`p-3 rounded-full transition-colors ${
            isDark 
              ? 'text-white hover:bg-sysco-blue' 
              : 'text-black hover:bg-sysco-blue hover:text-white'
          }`}
        >
          <Send size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};