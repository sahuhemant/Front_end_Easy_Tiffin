import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../AuthContext'; 
import './Login.css';

const Login = ({ setShowLogin }) => { // Accept setShowLogin as a prop
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 
  const { setUsername } = useAuth(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        setUsername(data.user_name); 
        setSuccess(data.message);
        setShowLogin(false); // Close the login form on success
        navigate('/customers'); 
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {success && <p className="login-success">{success}</p>}
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        <button type="button" className="login-close-button" onClick={() => setShowLogin(false)}>Close</button> {/* Close button */}
      </form>
    </div>
  );
};

export default Login;
