import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Customers.css';
import '../App.css';
import { useAuth } from '../AuthContext';

const Customers = () => {
  const { username } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', mobile_no: '', address: '' });
  const [showDialog, setShowDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to retrieve the token and extract the user ID
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    return payload.user_id; // Return user_id from token payload
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const fetchCustomers = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/customers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in the request
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Ensure data is an array
        setCustomers(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch customers:', await response.json());
        setCustomers([]); 
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  const handleAddCustomer = async () => {
    const userId = getUserIdFromToken();
    try {
      const response = await fetch(`http://localhost:3001/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in the request
        },
        body: JSON.stringify({ customer: newCustomer }),
      });

      if (response.ok) {
        fetchCustomers(userId); // Refresh customer list
        setNewCustomer({ name: '', mobile_no: '', address: '' });
        setShowDialog(true);
        setShowForm(false);
      } else {
        console.error('Failed to add customer:', await response.json());
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleTiffinClick = (customerId) => {
    navigate(`/customers/${customerId}/tiffins`);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="customer-container">
          <div>
      <h1>Welcome, {username}!</h1> {/* Display the username */}
      {/* Other component code... */}
      <button className="navigate-to-form-button" onClick={() => navigate('/payment')}>
        Please Donate Some Amount for me
      </button>
    </div>
      <h1>Customer Management</h1>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>


      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Customer'}
      </button>

      {showForm && (
        <div className="customer-form">
          <h2>Add New Customer</h2>
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            className="form-input"
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={newCustomer.mobile_no}
            className="form-input"
            onChange={(e) => setNewCustomer({ ...newCustomer, mobile_no: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={newCustomer.address}
            className="form-input"
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
          />
          <button className="add-button" onClick={handleAddCustomer}>Add Customer</button>
        </div>
      )}

      <h2>Customer List</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.mobile_no}</td>
              <td>{customer.address}</td>
              <td>
                <button 
                  className="tiffin-button"
                  onClick={() => handleTiffinClick(customer.id)}
                >
                  Go for Tiffin Entry
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <p>Customer created successfully!</p>
            <button className="dialog-close-button" onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
