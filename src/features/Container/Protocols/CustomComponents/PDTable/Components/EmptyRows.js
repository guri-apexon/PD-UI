import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'apollo-react-icons/Table';
import HoverList from './HoverList';
import { rowHoverData } from './dropdownData';

function EmptyRows({ rowIndex, handleOperation, index }) {
  const rowHoverRef = useRef(null);
  const [activeIconIndex, setActiveIconIndex] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rowHoverRef.current && !rowHoverRef.current.contains(event.target)) {
        setActiveIconIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [rowHoverRef]);

  const handleIconClick = (iconIndex) => {
    setActiveIconIndex(iconIndex);
  };

  const handleTableOperation = (operation, index) => {
    handleOperation(operation, index);
    setActiveIconIndex(null);
  };

  return (
    <div
      className="pd-empty-row-cells"
      ref={rowHoverRef}
      data-testId="more-icon"
    >
      <div
        key={uuidv4()}
        className="pd-empty-cell-row"
        data-testId="table-controls"
      >
        {/* eslint-disable-next-line */}
        <span
          className="pd-more-icon rowMoreIcon"
          onClick={() => handleIconClick(rowIndex)}
          data-testId="more-icon-row"
        >
          <Table />
        </span>
        {activeIconIndex === rowIndex && (
          <HoverList
            data={rowHoverData}
            handleOperation={handleTableOperation}
            index={index}
          />
        )}
      </div>
    </div>
  );
}

export default EmptyRows;
EmptyRows.propTypes = {
  rowIndex: PropTypes.isRequired,
  handleOperation: PropTypes.isRequired,
  index: PropTypes.isRequired,
};
