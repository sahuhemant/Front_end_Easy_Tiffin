import React from 'react';
import './Modal.css'; // Import the CSS file for styling

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Success</h2>
        <p>{message}</p>
        <button onClick={onClose} className="modal-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;
