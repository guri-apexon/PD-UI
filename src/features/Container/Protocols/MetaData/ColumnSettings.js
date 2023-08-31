/* eslint-disable */
import React from 'react';

const ColumnSettings = ({ data, handleColumnSelection }) => {
  return (
    <div>
      {data.map((ele) => (
        <div>
          <input
            type="checkbox"
            checked={ele.checked}
            value={ele.id}
            onChange={(e) => handleColumnSelection(e.target.value)}
          />
          <label>{ele.name}</label>
        </div>
      ))}
    </div>
  );
};

export default ColumnSettings;
