/* eslint-disable */
import React from 'react';

const ColumnSettings = ({ data, handleColumnSelection }) => {
  return (
    <div>
      {data.map((ele) => (
        <div className="checkbox-items">
          <input
            data-testId="settings-checkbox"
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
