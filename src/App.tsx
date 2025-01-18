import { useState } from 'react';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return isAuthenticated ? <Chat onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}

export default App;