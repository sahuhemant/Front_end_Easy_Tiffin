import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Tiffins.css';
import TiffinForm from './TiffinForm';
import TiffinList from './TiffinList';

const Tiffins = () => {
  const { customerId } = useParams();
  const [tiffins, setTiffins] = useState([]);
  const [newTiffin, setNewTiffin] = useState({
    start_date: new Date().toISOString().split('T')[0],
    day_status: 'yes',
    night_status: 'right'
  });
  const [editTiffin, setEditTiffin] = useState(null);
  const [tiffinCount, setTiffinCount] = useState(0);
  const [customerName, setCustomerName] = useState(""); // New state for customer name
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTiffins();
  }, [customerId]);

  const fetchTiffins = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId}/tiffins`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const tiffinsData = data.tiffins;
        if (tiffinsData.length === 0) {
          setMessage('No tiffins available.');
        } else {
          setTiffins(tiffinsData);
          setTiffinCount(data.total_count);
          setCustomerName(data.customer.name); // Set customer name from API
        }
      } else {
        setMessage('Failed to fetch tiffins.');
      }
    } catch (error) {
      console.error('Error fetching tiffins:', error);
      setMessage('Error fetching tiffins.');
    }
  };

  const handleCreateTiffin = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId}/tiffins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newTiffin),
      });

      if (response.ok) {
        fetchTiffins();
        setNewTiffin({ start_date: '', day_status: 'yes', night_status: 'right' });
      } else {
        console.error('Error creating tiffin:', await response.text());
      }
    } catch (error) {
      console.error('Error creating tiffin:', error);
    }
  };

  const handleEditClick = (tiffin) => {
    setEditTiffin(tiffin);
  };

  const handleEditChange = (e) => {
    setEditTiffin({ ...editTiffin, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId}/tiffins/${editTiffin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          tiffin: {
            start_date: editTiffin.start_date,
            day_status: editTiffin.day_status,
            night_status: editTiffin.night_status
          }
        }),
      });

      if (response.ok) {
        fetchTiffins();
        setEditTiffin(null);
      } else {
        console.error('Error updating tiffin:', await response.text());
      }
    } catch (error) {
      console.error('Error updating tiffin:', error);
    }
  };

  const handleBackToCustomers = () => {
    navigate('/customers');
  };

  return (
    <div className="tiffin-container">
      <div className="top-section">
        {/* Back button */}
        <button onClick={handleBackToCustomers} className="back-button">
          Back
        </button>

        {/* Total Tiffins and Customer Name */}
        <h2 className="total-tiffin-count">&nbsp; &nbsp;
          Customer Name: <span>{customerName}</span> &nbsp; | &nbsp;
          Total Tiffins: <span>{tiffinCount}</span>
        </h2>
      </div>

      {message && <p>{message}</p>} {/* Show message if exists */}
      
      <div className="tiffin-list">
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Day Status</th>
              <th>Night Status</th>
              <th>Status Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <TiffinForm 
              newTiffin={newTiffin} 
              setNewTiffin={setNewTiffin} 
              handleCreateTiffin={handleCreateTiffin} 
            />
            <TiffinList 
              tiffins={tiffins} 
              editTiffin={editTiffin}
              handleEditClick={handleEditClick} 
              handleEditChange={handleEditChange} 
              handleSaveEdit={handleSaveEdit} 
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tiffins;
