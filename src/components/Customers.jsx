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
  const [showModal, setShowModal] = useState(false); // Use showModal instead of showDialog
  const [modalMessage, setModalMessage] = useState(''); // Message for the modal
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
        setModalMessage('Customer created successfully!'); // Set modal message
        setShowModal(true); // Show the modal
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
    logout(); // Assuming logout is defined in your useAuth hook
    navigate('/'); // Redirect to Welcome page
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

      <CustomerForm 
        newCustomer={newCustomer} 
        setNewCustomer={setNewCustomer} 
        handleAddCustomer={handleAddCustomer} 
        showForm={showForm} 
        setShowForm={setShowForm} 
      />

      <CustomerList 
        filteredCustomers={filteredCustomers} 
        handleTiffinClick={handleTiffinClick} 
      />

      {showModal && <Modal message={modalMessage} onClose={closeModal} />} {/* Show the modal */}
    </div>
  );
};

export default Customers;
