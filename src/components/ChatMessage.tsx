import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types';
import { formatMessageContent } from '../utils/messageFormatter';
import { formatExplanationContent } from '../utils/explanationFormatter';
import { Download, ExternalLink, X } from 'lucide-react';

// ChatMessageProps defines the props for the ChatMessage component.
// It includes the message object containing message details and a boolean for dark mode styling.
interface ChatMessageProps {
  message: Message; // The message object to be rendered
  isDark: boolean;  // Flag indicating whether dark mode is active, used for styling
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDark }) => {
  const isBot = message.sender === 'bot'; // Determines if the message is from the bot
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Variants for the modal's animation: defining visibility and movement on the Y-axis
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  // Variants for the overlay's animation: defining opacity transition
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

  // Function to handle CSV file download from the message's table data
  const downloadCSV = () => {
    try {
      const table = document.createElement('table');
      table.innerHTML = message.tableData || '';
      const rows = Array.from(table.querySelectorAll('tr'));
      const csvContent = rows
        .map(row =>
          Array.from(row.querySelectorAll('th,td'))
            .map(cell => `"${(cell.textContent || '').replace(/"/g, '""')}"`)
            .join(',')
        )
        .join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `data-${new Date().toISOString()}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Notification for successful download
      const notification = document.createElement('div');
      notification.className = `fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg 
        shadow-lg transform transition-transform duration-300 animate-slide-up`;
      notification.textContent = 'Downloaded Successfully!';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2000);
    } catch (err) {
      console.error('Failed to download CSV: ', err);
    }
  };

  // Opens the modal when called
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Closes the modal when called
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} max-w-4xl mx-auto`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-6 py-3 space-y-4 ${
          isBot
            ? isDark
              ? 'bg-sysco-card shadow-sysco-glow'
              : 'bg-white border border-gray-200 shadow-sysco-glow'
            : 'bg-sysco-blue text-white shadow-sysco-glow-strong'
        }`}
      >
        <div
          className="leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: formatMessageContent(message.content),
          }}
        />

        {message.chartHtml && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-purple-400">Visualization</h3>
              {message.chartHtml && (
                <button
                  onClick={openModal}
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Visualization</span>
                </button>
              )}
            </div>
            <iframe
              src={message.chartHtml}
              className="w-full h-96 rounded-2xl"
            ></iframe>
          </div>
        )}

        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            ></motion.div>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-7xl relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
                {message.chartHtml && (
                  <iframe
                    src={message.chartHtml}
                    className="w-full h-[80vh] rounded-2xl"
                  ></iframe>
                )}
              </div>
            </motion.div>
          </>
        )}

        {message.explanation && (
          <div
          className="leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: formatExplanationContent(message.explanation),
          }}
        />
        )}

        {message.tableData && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-green-400">Results</h3>

              <button
                onClick={() => downloadCSV()}
                className="p-1 hover:bg-green-500/10 rounded-lg transition-colors"
                title="Download CSV"
              >
                <Download className="w-4 h-4 text-green-400" />
              </button>
            </div>
            <div
              className="overflow-x-auto overflow-y-auto bg-black/10 rounded-lg p-4 custom-scrollbar2"
              style={{ maxHeight: '320px' }}
              dangerouslySetInnerHTML={{ __html: message.tableData }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
