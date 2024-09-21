import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css"; // Ensure the path matches your CSS file

const Payment = () => {
  const [formData, setFormData] = useState({
    amount: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/payment/stripe/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          card_number: formData.cardNumber,
          exp_month: formData.expMonth,
          exp_year: formData.expYear,
          cvc: formData.cvc,
          amount: formData.amount
        })
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const result = await response.json();
      console.log('Payment successful:', result);

      // Set success message and show modal
      setSuccessMessage(`Thanks ${result.customer_name} for giving me $${result.amount}!`);
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error('Error:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  // Close the modal and optionally navigate to another page
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/"); // Optional navigation after closing
  };

  return (
    <div className="form-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expMonth">Exp Month</label>
          <input
            type="text"
            id="expMonth"
            name="expMonth"
            placeholder="MM"
            value={formData.expMonth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expYear">Exp Year</label>
          <input
            type="text"
            id="expYear"
            name="expYear"
            placeholder="YYYY"
            value={formData.expYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            placeholder="CVC"
            value={formData.cvc}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show-modal"> {/* Add class to show the modal */}
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
