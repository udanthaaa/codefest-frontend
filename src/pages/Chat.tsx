import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, ChatResponse, ChatSettings, DEFAULT_CHAT_SETTINGS } from '../types';
import { Header } from '../components/Header';
import { ChatMessage } from '../components/ChatMessage';
import { FeatureCard } from '../components/FeatureCard';
import { ChatInput } from '../components/ChatInput';
import { LoadingMessage } from '../components/LoadingMessage';

interface ChatProps {
  onLogout: () => void;
}

export const Chat: React.FC<ChatProps> = ({ onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_CHAT_SETTINGS);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const requestControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await fetch('https://codefest-backend.azurewebsites.net/chatbot/start_session', {
          method: 'POST'
        });
        const data = await response.json();
        setSessionId(data.session_id);
      } catch (error) {
        console.error('Failed to start session:', error);
      }
    };
    startSession();
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim() || !sessionId || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const timestamp = userMessage.timestamp.toISOString();
    const [date, timeWithZ] = timestamp.split('T');
    const timeWithoutMs = timeWithZ.split('.')[0];

    requestControllerRef.current = new AbortController();
    const signal = requestControllerRef.current.signal;

    try {
      const response = await fetch('https://codefest-backend.azurewebsites.net/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
        body: JSON.stringify({
          session_id: sessionId,
          question: content.trim(),
          settings: {
            language: settings.language,
            politeness_level: settings.politenessLevel,
            formality: settings.formality,
            creativity: settings.creativity,
            response_length: settings.responseLength,
          },
          date: `${date}T00:00:00Z`,
          time: timeWithoutMs,
        }),
      });

      const data: ChatResponse = await response.json();

      const isVisualizationError = data.result.chart_analysis === "Unable to provide analytical insights due to visualization error.";
      const isTableAccepted = data.result.table_accept_status === "yes";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.result.text_explanation,
        sender: 'bot',
        timestamp: new Date(),
        chartHtml: isVisualizationError ? undefined : data.result.chart_file_url,
        explanation: isVisualizationError ? undefined : data.result.chart_analysis,
        tableData: isTableAccepted && data.result.html_table_data ? data.result.html_table_data : undefined,
      };

      if (isTableAccepted && botMessage.tableData === undefined && data.result.table_accept_status) {
        botMessage.content += `\n\nTable Acceptance Status: ${data.result.table_accept_status}`;
      }

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      if (error === 'AbortError') {
        console.log('Request was canceled');
      } else {
        console.error('Failed to send message:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
    }

    setMessages([]);
    setInput('');
  };

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          isDark={isDark} 
          onThemeToggle={() => setIsDark(!isDark)} 
          onReset={handleReset}
          onLogout={onLogout}
          onSettingsChange={setSettings}
        />
      </div>
      
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto px-4 py-12 pt-32 pb-32"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-center mb-4"
            >
              SyscoPulse Assistant
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12 text-gray-400"
            >
              Your AI-powered sales companion
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <FeatureCard 
                title="Examples"
                items={[
                  "Show me the sales trend for last month",
                  "Give me the sales distribution trend",
                  "List down the Follow-up meetings scheduled for each consultant",
                  "Summarize top-performing consultants",
                  "Show sales figures for the current quarter"
                ]}
                icon="💡"
                isDark={isDark}
              />
              <FeatureCard 
                title="Capabilities"
                items={[
                  "Analyze sales data and trends",
                  "Generate visual reports",
                  "Export data to CSV",
                  "Compare performance metrics",
                  "Identify sales outliers effectively",
                  "Integrate with CRM for live data"
                ]}
                icon="⚡"
                isDark={isDark}
              />
              <FeatureCard 
                title="Limitations"
                items={[
                  "Data limitations",
                  "May take more time for complex queries",
                  "Cannot modify or input new data",
                  "Limited to predefined metrics",
                  "No unstructured data handling",
                  "Input data quality-dependent"
                ]}
                icon="⚠️"
                isDark={isDark}
              />
            </div>
          </motion.div>
        ) : (
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-2 sm:px-4 py-6 pt-20 space-y-4 sm:space-y-6 mb-24 custom-scrollbar"
            style={{ height: 'calc(100vh - 60px)' }}
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} isDark={isDark} />
            ))}
            {isLoading && <LoadingMessage isDark={isDark} />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </AnimatePresence>

      <ChatInput 
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        isDark={isDark}
        isListening={isListening}
        onToggleListening={() => setIsListening(!isListening)}
      />
    </div>
  );
};