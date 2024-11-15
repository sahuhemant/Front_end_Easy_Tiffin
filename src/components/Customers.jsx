import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Customers.css";
import "../App.css";
import { useAuth } from "../AuthContext";
import CustomerForm from "./CustomerForm"; // Import the CustomerForm component
import CustomerList from "./CustomerList"; // Import the CustomerList component
import Modal from "./Modal"; // Import the Modal component
import ChatMessage from "./ChatMessage";

const Customers = () => {
  const { logout } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    mobile_no: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCustomers(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch customers:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ customer: newCustomer }),
      });

      if (response.ok) {
        fetchCustomers();
        setNewCustomer({ name: "", mobile_no: "", address: "" });
        setModalMessage("Customer created successfully!");
        setShowModal(true);
        setShowForm(false);
      } else {
        console.error("Failed to add customer:", await response.json());
      }
    } catch (error) {
      console.error("Error adding customer:", error);
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
    navigate("/"); // Redirect to Welcome page
  };

  const handleDropdownToggle = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handlePaymentDone = () => {
    navigate("/payment-done");
  };

  const handlePaymentPending = () => {
    navigate("/payment-pending");
  };

  return (
    <div className="customers-container">
      <nav className="navbar">
        <button className="logout-button" onClick={handleLogout}>
          Back
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Customers
        </button>        

        <div className="dropdown">
          <button className="dropdown-toggle" onClick={handleDropdownToggle}>
            Payment
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handlePaymentDone}>Payment Done</button>
              <button onClick={handlePaymentPending}>Payment Pending</button>
            </div>
          )}
        </div>  
        <button className="add-customer-button" onClick={() => setShowForm(!showForm)}>
          Add Customer
        </button>   

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="top-section">
        {/* search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Customer by Name....."
            value={searchTerm}
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* form to add customer */}
        {showForm && (
          <div className="form-container">
            <CustomerForm
              newCustomer={newCustomer}
              setNewCustomer={setNewCustomer}
              handleAddCustomer={handleAddCustomer}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          </div>
        )}
      </div>

      {/* List of customers */}
      <CustomerList
        filteredCustomers={filteredCustomers}
        handleTiffinClick={handleTiffinClick}
      />

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
      <ChatMessage />
    </div>
  );
};

export default Customers;
