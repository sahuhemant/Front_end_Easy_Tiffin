import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './VerifyOtp.css'; // Import the CSS file

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName; // Get the username from the location state
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Show a message indicating that the OTP has been sent
    setSuccessMessage('An OTP has been sent to your email. Please enter it below.');
  }, []);

  const handleVerify = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3001/verify_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: userName,
          otp,
        }),
      });

      if (response.ok) {
        // Instead of navigating to the login page, navigate to the welcome page
        navigate('/', { state: { message: 'Registration successfully! You can login now.' } });
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('An error occurred during OTP verification.');
    }
  };

  return (
    <div className="verify-otp-container">
      <h1 className="verify-otp-title">Verify OTP</h1>
      {error && <p className="verify-otp-error">{error}</p>}
      {successMessage && <p className="verify-otp-success">{successMessage}</p>}
      <form onSubmit={handleVerify} className="verify-otp-form">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="verify-otp-input"
        />
        <button type="submit" className="verify-otp-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
