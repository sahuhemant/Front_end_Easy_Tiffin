import React, { useState, useEffect } from 'react';
import './PaymentCard.css'; // Ensure you have this import

const PaymentCard = ({ customerId }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount_paid: 0,
    amount_due: 0,
    payment_status: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/customers/${customerId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPaymentDetails({
            amount_paid: data.amount_paid,
            amount_due: data.amount_due,
            // Map integer to string status
            payment_status: data.payment_status === 0 ? 'completed' : 'pending' 
          });
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentDetails();
  }, [customerId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedPaymentDetails = {
        ...paymentDetails,
        payment_status: paymentDetails.payment_status === "completed" ? 0 : 1 // Map to enum value
      };
  
      const response = await fetch(`http://localhost:3001/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ customer: updatedPaymentDetails })
      });
  
      if (response.ok) {
        const updatedDetails = await response.json();
        setPaymentDetails({
          amount_paid: updatedDetails.amount_paid,
          amount_due: updatedDetails.amount_due,
          // Convert back to string for display
          payment_status: updatedDetails.payment_status === 0 ? 'completed' : 'pending' 
        });
        setIsEditing(false); // Exit edit mode after successful update
      } else {
        console.error('Error updating payment details:', await response.text());
      }
    } catch (error) {
      console.error('Error updating payment details:', error);
    }
  };

  return (
    <div className="payment-card">
      {isEditing ? (
        <div>
          <label>
            Amount Paid:
            <input
              type="number"
              name="amount_paid"
              value={paymentDetails.amount_paid}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Amount Due:
            <input
              type="number"
              name="amount_due"
              value={paymentDetails.amount_due}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Payment Status:
            <select
              name="payment_status"
              value={paymentDetails.payment_status}
              onChange={handleInputChange}
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </label>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Amount Paid: {paymentDetails.amount_paid}</p>
          <p>Amount Due: {paymentDetails.amount_due}</p>
          <p>Payment Status: {paymentDetails.payment_status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
