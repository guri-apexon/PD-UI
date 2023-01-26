import React from 'react';
import './table.scss';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import EmptyRowCells from './EmptyRows';

function DisplayTable({ data, onChange, handleRowOperation, edit, colWidth }) {
  const handleChange = (columnIndex, rowIndex, e) => {
    onChange(e.target.innerHTML, columnIndex, rowIndex);
  };
  return (
    <div className="pd-table-inner">
      {data.map((row, rowIndex) => (
        <div key={uuidv4()} className="pd-table-empty-cell-row">
          {edit && (
            <EmptyRowCells
              rowIndex={rowIndex}
              handleOperation={handleRowOperation}
              index={rowIndex}
            />
          )}
          <div className="pd-table-row">
            {Object.keys(row).map((key) => (
              <div
                key={uuidv4()}
                className="pd-table-cell"
                style={{ width: `${colWidth}%` }}
              >
                {/* eslint-disable-next-line */}
                <span
                  dangerouslySetInnerHTML={{ __html: row[key].content }}
                  contentEditable={edit}
                  onBlur={(e) => handleChange(key, rowIndex, e)}
                ></span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default React.memo(DisplayTable);

DisplayTable.propTypes = {
  data: PropTypes.isRequired,
  onChange: PropTypes.isRequired,
  handleRowOperation: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  colWidth: PropTypes.isRequired,
};
