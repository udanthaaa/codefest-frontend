# codefest-frontend

This is a chat application that allows users to interact with a bot using both text and voice input. The chat application includes features like message formatting, displaying charts and tables, and supporting different languages and themes (light/dark mode). It also supports FAQs and user settings customization.

## Features

- **Message Formatting**: Messages are formatted with support for numbered lists and bold text.
- **Speech Recognition**: Converts speech input into text for a hands-free chat experience.
- **Chart and Table Display**: The bot can generate and display charts, graphs, and tables based on user queries.
- **Customizable Settings**: Users can adjust settings like language, politeness level, and formality.
- **FAQs**: Provides a list of frequently asked questions to help users with common queries.
- **Light/Dark Mode**: Supports theme switching for both light and dark modes.
- **User Notifications**: Provides feedback notifications like download success for files.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/udanthaaa/codefest-frontend.git
cd codefest-frontend
```

### 2. Install Dependencies

For frontend and backend dependencies, use npm or yarn:

```bash
npm install
# or
yarn install
```

3. Start the Development Server
Run the development server:

```bash
npm run dev
# or
yarn run dev
```

This will start the application on http://localhost:3000.

### Usage

- Chat with the Bot: Type your message in the input box or use voice input (by clicking the microphone icon).
- Download Data: If the bot provides data in CSV format, you can download it by clicking the download button.
- Switch Themes: You can toggle between light and dark themes using the theme toggle button.
- Change Settings: Adjust chat settings (language, politeness level, formality, creativity, response length) through the settings modal.

### File Structure

```bash
/src
  /components
    /ChatInput.tsx
    /ChatMessage.tsx
    /FAQButton.tsx
    /FAQBox.tsx
    /ChatMessage.tsx 
    /Header.tsx
    /FeatureCard.tsx
    /LoadingMessage.tsx
    /LoadingScreen.tsx
    /ResetButton.tsx
    /SettingsModal.tsx
    /ThemeToggle.tsx
  /pages
    /Chat.tsx
    /CreateAccount.tsx
    /ForgotPassword.tsx
    /Login.tsx
  /types
    /index.ts
  /utils
    /messageFormatter.ts
    /explanationFormatter.ts
App.tsx
index.css
main.tsx
```

### Technologies Used
- **React**: Frontend library for building the user interface.
- **Framer Motion**: Used for animations and transitions.
- **Lucide Icons**: A collection of icons used in the UI.
- **TypeScript**: Typed JavaScript for better maintainability and development experience.
- **Speech Recognition API**: Used for converting speech to text input.
- **Tailwind CSS**: Utility-first CSS framework for styling.
