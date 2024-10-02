import React from 'react';
import './CustomerList.css';

const CustomerList = ({ filteredCustomers, handleTiffinClick }) => {
  return (
    <div className="customer-list-container"> {/* New container for scrolling */}
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
    </div>
  );
};

export default CustomerList;
