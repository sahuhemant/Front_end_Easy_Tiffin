import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Tiffins.css';

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
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    fetchTiffins();
  }, [customerId]);

  const fetchTiffins = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId}/tiffins`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Passing the token
        },
      });

      if (response.ok) {
        const data = await response.json();
        const tiffinsData = data.tiffins; // Accessing the tiffins array from the response
        if (tiffinsData.length === 0) {
          setMessage('No tiffins available.');
        } else {
          setTiffins(tiffinsData);
          setTiffinCount(data.total_count);
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
      <button onClick={handleBackToCustomers} className="back-button">
        Back to Customers
      </button>
      
      <h1>Tiffins for Customer {customerId}</h1>
      
      <h2 className="total-tiffin-count">
        Total Tiffins: <span>{tiffinCount}</span>
      </h2>
      
      {tiffins.length > 0 && message && <p>{message}</p>}
  
      <div className="tiffin-list">
        <h2>Tiffin List</h2>
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
            <tr>
              <td>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={newTiffin.start_date}
                  onChange={(e) => setNewTiffin({ ...newTiffin, start_date: e.target.value })}
                />
              </td>
              <td>
                <select
                  value={newTiffin.day_status}
                  onChange={(e) => setNewTiffin({ ...newTiffin, day_status: e.target.value })}
                >
                  <option value="yes">✔</option>
                  <option value="no">✖</option>
                </select>
              </td>
              <td>
                <select
                  value={newTiffin.night_status}
                  onChange={(e) => setNewTiffin({ ...newTiffin, night_status: e.target.value })}
                >
                  <option value="right">✔</option>
                  <option value="wrong">✖</option>
                </select>
              </td>
              <td>-</td>
              <td>
                <button onClick={handleCreateTiffin}>Create</button>
              </td>
            </tr>
  
            {tiffins
              ?.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
              .map((tiffin) => (
                <tr key={tiffin.id}>
                  {editTiffin && editTiffin.id === tiffin.id ? (
                    <>
                      <td>
                        <input
                          type="date"
                          name="start_date"
                          value={editTiffin.start_date}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <select
                          name="day_status"
                          value={editTiffin.day_status}
                          onChange={handleEditChange}
                        >
                          <option value="yes">✔</option>
                          <option value="no">✖</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name="night_status"
                          value={editTiffin.night_status}
                          onChange={handleEditChange}
                        >
                          <option value="right">✔</option>
                          <option value="wrong">✖</option>
                        </select>
                      </td>
                      <td>{editTiffin.status_count}</td>
                      <td>
                        <button onClick={handleSaveEdit}>Save</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{tiffin.start_date}</td>
                      <td>
                        {tiffin.day_status === 'yes' ? (
                          <span className="status-icon tick">✔</span>
                        ) : (
                          <span className="status-icon cross">✖</span>
                        )}
                      </td>
                      <td>
                        {tiffin.night_status === 'right' ? (
                          <span className="status-icon tick">✔</span>
                        ) : (
                          <span className="status-icon cross">✖</span>
                        )}
                      </td>
                      <td>{tiffin.status_count}</td>
                      <td>
                        <button onClick={() => handleEditClick(tiffin)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  };
  
  export default Tiffins;
  