import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Tiffins.css';

const Tiffins = () => {
  const { customerId } = useParams();
  const [tiffins, setTiffins] = useState([]);
  const [newTiffin, setNewTiffin] = useState({
    start_date: new Date().toISOString().split('T')[0], // Set the current date as the default
    day_status: 'yes',
    night_status: 'right'
  });
  const [editTiffin, setEditTiffin] = useState(null);
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
        if (data.length === 0) {
          setShowCreateForm(true); // Show the form if no tiffins are present
        } else {
          setTiffins(data);
          setTiffinCount(data.length);
          setShowCreateForm(false); // Hide the form if tiffins are present
        }
      } else {
        setMessage('No tiffins available.');
        setShowCreateForm(true); // Show create form if there's an error
      }
    } catch (error) {
      console.error('Error fetching tiffins:', error);
      setShowCreateForm(true); // Show create form if there's a fetch error
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
        headers: { 'Content-Type': 'application/json' },
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

  return (
    <div className="tiffin-container">
      <h1>Tiffins for Customer {customerId}</h1>
      <h2>Total Tiffins: {tiffinCount}</h2>
      {message && <p>{message}</p>}

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
            {/* Add the row for creating a new tiffin */}
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
                  <option value="yes">✔</option> {/* Right tick */}
                  <option value="no">✖</option> {/* Cross tick */}
                </select>
              </td>
              <td>
                <select
                  value={newTiffin.night_status}
                  onChange={(e) => setNewTiffin({ ...newTiffin, night_status: e.target.value })}
                >
                  <option value="right">✔</option> {/* Right tick */}
                  <option value="wrong">✖</option> {/* Cross tick */}
                </select>
              </td>
              <td>-</td> {/* Placeholder for status count */}
              <td>
                <button onClick={handleCreateTiffin}>Create</button>
              </td>
            </tr>

            {/* Render the sorted list of tiffins */}
            {tiffins
              .sort((a, b) => new Date(b.start_date) - new Date(a.start_date)) // Sort by start_date in descending order
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
