// WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Easy Tiffin Entry App!</h1>
      <div className="button-container">
        <button className="welcome-button" onClick={() => navigate('/register')}>
          Register
        </button>
        <button className="welcome-button" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
