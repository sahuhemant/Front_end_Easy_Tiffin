import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './PaymentDone.css'; // Add your styles for the PaymentDone component
import { useAuth } from '../AuthContext';

const PaymentPending = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [paymentData, setPaymentData] = useState([]); // State to hold payment data
  const [loading, setLoading] = useState(true); // Loading state
  const [editIndex, setEditIndex] = useState(null); // Track which payment is being edited
  const [editedPayment, setEditedPayment] = useState({}); // State to hold edited payment details

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/customer_payment_detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ payment_status: "no" }) // Sending payment status as "no"
      });
      
      if (response.ok) {
        const data = await response.json();
        setPaymentData(data); // Assume data is an array of payment records
      } else {
        console.error('Failed to fetch payment data:', await response.json());
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedPayment({
      amount_paid: paymentData[index].amount_paid,
      amount_due: paymentData[index].amount_due,
      payment_status: paymentData[index].payment_status
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ customer: editedPayment }) // Send edited payment data
      });
      
      if (response.ok) {
        fetchPaymentData(); // Refresh payment data after update
        setEditIndex(null); // Reset edit index
      } else {
        console.error('Failed to update payment data:', await response.json());
      }
    } catch (error) {
      console.error('Error updating payment data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to Welcome page
  };

  if (loading) {
    return <div>Loading...</div>; // Loading message while fetching data
  }

  return (
    <div className="payment-done-container">
      <nav className="navbar">
        <button className="navigate-to-form-button" onClick={() => navigate('/payment')}>
          Contribute to My Efforts
        </button>
        <button className="payment-done-button" onClick={() => navigate('/payment-done')}>
          Payment Done
        </button>
        <button className="payment-pending-button" onClick={() => navigate('/payment-pending')}>
          Payment Pending
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>        
      </nav>

      <div className="payment-content">
        <h1>Pending Payment Details</h1>
        {paymentData.length > 0 ? (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount Paid</th>
                <th>Amount Due</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.name}</td>
                  <td>
                    {editIndex === index ? (
                      <input 
                        type="number" 
                        name="amount_paid" 
                        value={editedPayment.amount_paid} 
                        onChange={handleInputChange} 
                      />
                    ) : (
                      payment.amount_paid
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input 
                        type="number" 
                        name="amount_due" 
                        value={editedPayment.amount_due} 
                        onChange={handleInputChange} 
                      />
                    ) : (
                      payment.amount_due
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <select 
                        name="payment_status" 
                        value={editedPayment.payment_status} 
                        onChange={handleInputChange}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : (
                      payment.payment_status
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <button onClick={() => handleUpdate(payment.id)}>Update</button>
                    ) : (
                      <button onClick={() => handleEditClick(index)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <h1>No Pending Payment Data Available</h1>
            <p>It seems like there is no pending payment data to show at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPending;
