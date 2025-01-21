// Represents a message object in the chat
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  chartHtml?: string | null;
  explanation?: string | null;
  tableData?: string;
} 

// Represents the structure of the response from the chat service
export interface ChatResponse {
  session_id: string;
  result: {
    text_explanation: string;
    chart_file_url: string | null;
    chart_analysis: string | null;
    html_table_data: string | null;
    table_accept_status?: string | null;
  };
}

// Represents the theme settings (light or dark mode)
export interface Theme {
  mode: 'light' | 'dark';
}

// Represents the settings that can be customized in the chat
export interface ChatSettings {
  language: 'English' | 'Spanish' | 'French';
  politenessLevel: 'Friendly' | 'Neutral' | 'Professional';
  formality: 'Formal' | 'Semi-formal' | 'Informal';
  creativity: number;
  responseLength: 'Brief' | 'Medium' | 'Detailed';
}

// Default chat settings applied initially
export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  language: 'English',
  politenessLevel: 'Professional',
  formality: 'Formal',
  creativity: 0.7,
  responseLength: 'Medium'
};

// A list of frequently asked questions (FAQ)
export const FAQ_QUESTIONS = [
  "Show the monthly distribution of meetings?",
  "Do a Customer Loyalty and Value Analysis. Who are our top 10 customers by order value, and how many meetings have we had with them?",
  "Find customers who have placed orders with a total value exceeding $10,000",
  "Provide the daily sales trend",
  "Identify the top 5 products by sales volume",
  "Identify customers who have ordered the most diverse range of products",
  "Which meetings involve Customer Calls and are delivered Online?",
  "Provide the Monthly sales trend",
];