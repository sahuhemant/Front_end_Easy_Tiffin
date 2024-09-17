import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Customers from './components/Customers';
import Tiffins from './components/Tiffins'; // Import the Tiffins component

function App() {
  const [message, setMessage] = useState('');

  // Callback function to handle successful registration
  const handleRegistrationSuccess = (successMessage) => {
    setMessage(successMessage);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home message={message} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register onSuccess={handleRegistrationSuccess} />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:customerId/tiffins" element={<Tiffins />} /> {/* Add this route */}
      </Routes>
    </div>
  );
}

const Home = ({ message }) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Welcome!</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default App;
