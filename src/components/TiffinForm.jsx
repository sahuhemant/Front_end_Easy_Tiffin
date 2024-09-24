import React from 'react';
import './TiffinForm.css'; // TiffinForm CSS

const TiffinForm = ({ newTiffin, setNewTiffin, handleCreateTiffin }) => {
  return (
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
  );
};

export default TiffinForm;
