import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Customers.css'; // Import the CSS file for styling
import '../App.css'; 

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', mobile_no: '', address: '' });
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on the search term
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3001/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:3001/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });
      if (response.ok) {
        fetchCustomers(); // Refresh customer list
        setNewCustomer({ name: '', mobile_no: '', address: '' });
        setShowDialog(true); // Show the success dialog
        setShowForm(false); // Hide the form
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
      <h1>Customer Management</h1>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      
      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Toggle Form Button */}
      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Customer'}
      </button>
      
      {/* Customer Form */}
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
                  Tiffin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for success message */}
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
