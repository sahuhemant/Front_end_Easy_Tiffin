import React from 'react';
import './TiffinList.css'; // TiffinList CSS

const TiffinList = ({ tiffins, editTiffin, handleEditClick, handleEditChange, handleSaveEdit }) => {
  return (
    <>
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
    </>
  );
};

export default TiffinList;
