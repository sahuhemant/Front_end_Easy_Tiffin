import React from 'react';
import './CustomerForm.css';

const CustomerForm = ({ newCustomer, setNewCustomer, handleAddCustomer, showForm, setShowForm }) => {
  return (
    <>
      {showForm && (
        <>
          {/* Overlay for blurring background */}
          <div className="overlay" onClick={() => setShowForm(false)}></div>
          <div className="customer-form-modal">
            {/* Close button */}
            <button className="close-button" onClick={() => setShowForm(false)}>×</button>
            
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
              <button className="add-button" onClick={handleAddCustomer}>Submit</button>
            </div>
          </div>
        </>
      )}
      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Customer'}
      </button>
    </>
  );
};

export default CustomerForm;
