import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import Table from 'apollo-react-icons/Table';
import { columnHoverData } from './dropdownData';
import HoverList from './HoverList';

function EmptyColumns({ columnLength, handleOperation }) {
  const columnHoverRef = useRef(null);
  const [activeIconIndex, setActiveIconIndex] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        columnHoverRef.current &&
        !columnHoverRef.current.contains(event.target)
      ) {
        setActiveIconIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [columnHoverRef]);
  const handleIconClick = (iconIndex) => {
    setActiveIconIndex(iconIndex);
  };
  const handleTableOperation = (operation, index) => {
    handleOperation(operation, index);
    setActiveIconIndex(null);
  };
  return (
    <Grid
      container
      className="pd-empty-cells"
      ref={columnHoverRef}
      data-testId="empty-cell-column"
    >
      {[...Array(columnLength)].map((val, index) => (
        <Grid item xs key={uuidv4()} data-testId="hover-list">
          {/* eslint-disable-next-line */}
          <span
            className="pd-more-icon columnMoreIcon"
            onClick={() => handleIconClick(index)}
            data-testId="more-icon"
          >
            <Table />
          </span>
          {activeIconIndex === index && (
            <HoverList
              data={columnHoverData}
              handleOperation={handleTableOperation}
              index={index}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default EmptyColumns;
EmptyColumns.propTypes = {
  columnLength: PropTypes.isRequired,
  handleOperation: PropTypes.isRequired,
};
