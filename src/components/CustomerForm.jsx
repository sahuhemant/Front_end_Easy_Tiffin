import React from 'react';

const CustomerForm = ({ newCustomer, setNewCustomer, handleAddCustomer, showForm, setShowForm }) => {
  return (
    <>
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
      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Customer'}
      </button>
    </>
  );
};

export default CustomerForm;
