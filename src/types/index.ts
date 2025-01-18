export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  chartHtml?: string | null;
  explanation?: string | null;
  tableData?: string;
} 

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

export interface Theme {
  mode: 'light' | 'dark';
}

export interface ChatSettings {
  language: 'English' | 'Spanish' | 'French';
  politenessLevel: 'Friendly' | 'Neutral' | 'Professional';
  formality: 'Formal' | 'Semi-formal' | 'Informal';
  creativity: number;
  responseLength: 'Brief' | 'Medium' | 'Detailed';
}

export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  language: 'English',
  politenessLevel: 'Professional',
  formality: 'Formal',
  creativity: 0.7,
  responseLength: 'Medium'
};

export const FAQ_QUESTIONS = [
  "Show the monthly distribution of meetings?",
  "Which regions should we target for up selling based on canceled or incomplete orders?",
  "Find customers who have placed orders with a total value exceeding $10,000",
  "Provide the daily sales trend",
  "Identify the top 5 products by sales volume",
  "Identify customers who have ordered the most diverse range of products",
  "Which meetings involve Customer Calls and are delivered Online?",
  "Provide the Monthly sales trend",
];