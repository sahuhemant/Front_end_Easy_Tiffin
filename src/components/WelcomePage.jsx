import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Modal from "./Modal";
import "./WelcomePage.css";
import TypingAnimation from "./TypingAnimation";

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      setSuccessMessage(message);
      setShowModal(true);
    }
  }, [location.state]);

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  return (
    <div className="welcome-container">
      <nav className="navbar">
        <a className="navbar-brand" href="#">
          Tiffin Data Entry
        </a>

        {/* Right side container for buttons */}
        <div className="navbar-right">
          <button
            className="btn btn-outline-light"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      </nav>

      {/* <TypingAnimation/> */}

      <div className="image-placeholder">
        <img src="/images/tiffin2.jpg" alt="Background" />
        {/* Typing animation overlay */}
        <div className="typing-overlay">
          <TypingAnimation text="Welcome to Tiffin Data Entry" />
        </div>
      </div>

      {/* Conditionally render the Login and Register components */}

      {showLogin && <Login setShowLogin={setShowLogin} />}
      {showRegister && <Register setShowRegister={setShowRegister} />}
      {/* Display modal on successful registration */}
      {showModal && <Modal message={successMessage} onClose={closeModal} />}
    </div>
  );
};

export default WelcomePage;
