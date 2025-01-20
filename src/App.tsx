import { useState } from 'react';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login action
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout action
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Conditionally render either the Chat component or the Login component
  return isAuthenticated ? (
    <Chat onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
