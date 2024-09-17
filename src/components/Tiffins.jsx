import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Tiffins.css';

const Tiffins = () => {
  const { customerId } = useParams();
  const [tiffins, setTiffins] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTiffin, setNewTiffin] = useState({
    start_date: '',
    day_status: 'yes',
    night_status: 'right'
  });
  const [tiffinCount, setTiffinCount] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTiffins();
  }, [customerId]);

  const fetchTiffins = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId}/tiffins`);
      if (response.ok) {
        const data = await response.json();
        setTiffins(data.tiffins);
        setTiffinCount(data.total_count); // Update with the total count from API
      } else {
        setMessage('No tiffins available.');
      }
    } catch (error) {
      console.error('Error fetching tiffins:', error);
    }
  };

  const handleCreateTiffin = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId}/tiffins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTiffin),
      });
      if (response.ok) {
        fetchTiffins(); // Refresh tiffin list
        setShowCreateForm(false); // Hide the form
        setNewTiffin({ start_date: '', day_status: 'yes', night_status: 'right' });
      } else {
        console.error('Error creating tiffin:', await response.text());
      }
    } catch (error) {
      console.error('Error creating tiffin:', error);
    }
  };

  return (
    <div className="tiffin-container">
      <h1>Tiffins for Customer {customerId}</h1>
      <h2>Total Tiffins: {tiffinCount}</h2>
      {message && <p>{message}</p>}
      
      {showCreateForm ? (
        <div className="create-tiffin-form">
          <h2>Create New Tiffin</h2>
          <input
            type="date"
            placeholder="Start Date"
            value={newTiffin.start_date}
            onChange={(e) => setNewTiffin({ ...newTiffin, start_date: e.target.value })}
          />
          <select
            value={newTiffin.day_status}
            onChange={(e) => setNewTiffin({ ...newTiffin, day_status: e.target.value })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <select
            value={newTiffin.night_status}
            onChange={(e) => setNewTiffin({ ...newTiffin, night_status: e.target.value })}
          >
            <option value="right">Right</option>
            <option value="wrong">Wrong</option>
          </select>
          <button onClick={handleCreateTiffin}>Create Tiffin</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowCreateForm(true)}>Create Tiffin</button>
      )}

      <div className="tiffin-list">
        <h2>Tiffin List</h2>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Day Status</th>
              <th>Night Status</th>
              <th>Status Count</th>
            </tr>
          </thead>
          <tbody>
            {tiffins.map(tiffin => (
              <tr key={tiffin.id}>
                <td>{tiffin.start_date}</td>
                <td>{tiffin.day_status}</td>
                <td>{tiffin.night_status}</td>
                <td>{tiffin.status_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tiffins;
