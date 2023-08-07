import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import './CellHoverList.scss';
import { cellMerge } from './dropdownData';

function CellHoverList({
  handleDropdownOptionClick,
  dropdownPosition,
  setIsCellOperation,
}) {
  const rowHoverRef = useRef(null);
  const positionObj = { top: dropdownPosition.y, left: dropdownPosition.x };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        rowHoverRef.current &&
        !rowHoverRef.current.contains(event.target) &&
        event.button !== 2
      ) {
        setIsCellOperation(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [rowHoverRef]);
  console.log('SHUBHAM12345');

  useEffect(() => {
    function handleClickRight(event) {
      event.preventDefault();
    }
    document.addEventListener('contextmenu', handleClickRight);

    return () => {
      document.removeEventListener('contextmenu', handleClickRight);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function handleClickOutside() {
      setIsCellOperation(false);
    }
    const tableElement = document.querySelector('.pd-table-wrapper');
    const contentElement = document.querySelector('.Richtextcontainer');
    const outerElement = document.querySelector('.digitize-panel-content');

    if (tableElement) {
      tableElement.addEventListener('scroll', handleClickOutside);
    }
    if (contentElement)
      contentElement.addEventListener('scroll', handleClickOutside);
    if (outerElement) {
      outerElement.addEventListener('scroll', handleClickOutside);
    }
    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleClickOutside);
      }
      if (outerElement)
        outerElement.removeEventListener('scroll', handleClickOutside);
      if (contentElement)
        contentElement.removeEventListener('scroll', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={rowHoverRef} className="cell-hoverList" data-testId="cell-list">
      <ul style={positionObj} className="dropdown">
        {cellMerge.map((item) => {
          return (
            <li
              key={React.key}
              onClick={() => handleDropdownOptionClick(item.id)}
              role="presentation"
            >
              <div className="pd-arrow-icon">{item?.image}</div>
              <div className="sd-text">{item.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CellHoverList;

CellHoverList.propTypes = {
  handleDropdownOptionClick: PropTypes.isRequired,
  dropdownPosition: PropTypes.isRequired,
  setIsCellOperation: PropTypes.isRequired,
};
