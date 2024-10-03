import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Customers.css';
import '../App.css';
import { useAuth } from '../AuthContext';
import CustomerForm from './CustomerForm'; // Import the CustomerForm component
import CustomerList from './CustomerList'; // Import the CustomerList component
import Modal from './Modal'; // Import the Modal component

const Customers = () => {
  const { logout } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', mobile_no: '', address: '' });
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState('');
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
        setModalMessage('Customer created successfully!');
        setShowModal(true);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to Welcome page
  };

  return (
    <div className="customers-container">
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

      <CustomerForm 
        newCustomer={newCustomer} 
        setNewCustomer={setNewCustomer} 
        handleAddCustomer={handleAddCustomer} 
        showForm={showForm} 
        setShowForm={setShowForm} 
      />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CustomerList 
        filteredCustomers={filteredCustomers} 
        handleTiffinClick={handleTiffinClick} 
      />

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default Customers;
