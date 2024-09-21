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
      // Set success message
      setSuccessMessage("Payment successfully processed! Thanks for your donation. We will make the application more simple and perfect.");
      // Optionally navigate to a different page or clear the form
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div className="form-container">
      <h2>Payment Details</h2>
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
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
    </div>
  );
};

export default Payment;
