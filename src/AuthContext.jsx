import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('userName') || ''); // Set initial state from localStorage
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('userName'); // Clear username from localStorage
    setUsername(''); // Reset the username in context
    navigate('/'); // Redirect to Welcome page
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
