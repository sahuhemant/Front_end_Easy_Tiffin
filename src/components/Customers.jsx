import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Customers.css';
import '../App.css';
import { useAuth } from '../AuthContext';

const Customers = () => {
  const { logout } = useAuth(); 
  const { username } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', mobile_no: '', address: '' });
  const [showDialog, setShowDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCustomers(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch customers:', await response.json());
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ customer: newCustomer }),
      });

      if (response.ok) {
        fetchCustomers();
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
  const handleLogout = () => {
    logout(); // Assuming logout is defined in your useAuth hook
    navigate('/login'); // Adjust according to your login route
  };

  return (
    <div className="customer-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      
      <div className="button-container">
        <button className="navigate-to-form-button" onClick={() => navigate('/payment')}>
          Please Donate Some Amount for me
        </button>
        <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Add Customer'}
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
