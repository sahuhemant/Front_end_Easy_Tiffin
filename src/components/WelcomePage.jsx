import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './Login'; // Import the Login component
import Register from './Register'; // Import the Register component
import Modal from './Modal'; // Import your Modal component
import './WelcomePage.css';

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(false); // State to manage login visibility
  const [showRegister, setShowRegister] = useState(false); // State to manage register visibility
  const location = useLocation(); // Hook to access location
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Use useEffect to check for message in location state
  useEffect(() => {
    const message = location.state?.message; // Get the message from location state
    if (message) {
      setSuccessMessage(message); // Set the success message
      setShowModal(true); // Show the modal when there is a success message
    }
  }, [location.state]); // Dependency on location.state

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setSuccessMessage(''); // Clear the success message
  };

  return (
    <div className="welcome-container">
      <nav className="navbar">
        <div className="navbar-left">
          <a className="navbar-brand" href="#">
            Tiffin Data Entry
          </a>
          <div className="navbar-buttons">
            <button className="btn btn-outline-light" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button className="btn btn-outline-light" onClick={() => setShowRegister(true)}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Conditionally render the Login and Register components */}
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {showRegister && <Register setShowRegister={setShowRegister} />}
      
      {/* Display modal if there's a success message */}
      {showModal && <Modal message={successMessage} onClose={closeModal} />}
    </div>
  );
};

export default WelcomePage;
