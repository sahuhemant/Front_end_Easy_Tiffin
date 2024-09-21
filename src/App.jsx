import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Customers from './components/Customers';
import Tiffins from './components/Tiffins'; // Import the Tiffins component
import Payment from './components/Payment'; // Import the Abc component
import Header from './components/Header'; // Import the Header component

function App() {
  const [message, setMessage] = useState(''); // State to manage messages

  // Callback function to handle successful registration
  const handleRegistrationSuccess = (successMessage) => {
    setMessage(successMessage); // Set success message
  };

  return (
    <div className="App">
      <Header /> {/* Add the Header to display the username */}
      <Routes>
        <Route path="/" element={<Home message={message} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register onSuccess={handleRegistrationSuccess} />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:customerId/tiffins" element={<Tiffins />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

const Home = ({ message }) => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div>
      <h1>Welcome!</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Display success message if exists */}
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default App;
