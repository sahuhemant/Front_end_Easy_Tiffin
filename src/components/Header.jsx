import React from 'react';
import { useAuth } from '../AuthContext.jsx';

const Header = () => {
  const { username, logout } = useAuth();

  return (
    <header>
      <h1>Welcome, {username ? username : 'Guest'}</h1>
      {username && (
        <button onClick={logout}>Logout</button>
      )}
    </header>
  );
};

export default Header;
