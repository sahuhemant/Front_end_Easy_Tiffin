import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Customers from './components/Customers';
import Tiffins from './components/Tiffins';
import Payment from './components/Payment';
import PaymentDone from './components/PaymentDone';
import PaymentPending from './components/PaymentPending'; 
import Header from './components/Header';
import VerifyOtp from './components/Verifyotp';
import WelcomePage from './components/WelcomePage'; // Import the new component

function App() {
  const [message, setMessage] = useState('');

  const handleRegistrationSuccess = (successMessage) => {
    setMessage(successMessage);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} /> {/* Change Home to WelcomePage */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register onSuccess={handleRegistrationSuccess} />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:customerId/tiffins" element={<Tiffins />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-done" element={<PaymentDone />} /> {/* Add the PaymentDone route */}
        <Route path="/payment-pending" element={<PaymentPending />} />
      </Routes>
    </div>
  );
}

export default App;
