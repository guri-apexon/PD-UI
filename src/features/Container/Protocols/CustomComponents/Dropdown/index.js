import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const headerList = [
  { id: 2, name: 'H2' },
  { id: 3, name: 'H3' },
  { id: 4, name: 'H4' },
  { id: 5, name: 'H5' },
  { id: 6, name: 'H6' },
];
const classNames = {
  active: 'dropdown-content active-show-list',
  notActive: 'dropdown-content',
};
function Dropdown({
  buttonName,
  contentStyle,
  headerStyle,
  onHeaderSelect,
  type,
  disabled,
}) {
  const [showList, setShowList] = useState(false);
  const showMenu = () => {
    setShowList(!showList);
  };
  const formatHeading = (e, name) => {
    e.preventDefault();
    setShowList(false);
    document.execCommand('formatBlock', false, name);
  };
  return (
    <div className="dropdown">
      <button
        disabled={disabled}
        type="button"
        className="dropbtn"
        onClick={showMenu}
        style={headerStyle}
        data-testId="btn"
      >
        {buttonName}
      </button>
      <div
        className={showList ? classNames.active : classNames.notActive}
        style={contentStyle}
        data-testId="options"
      >
        <ul>
          {headerList.map((item) => {
            if (type === 'header') {
              return (
                // eslint-disable-next-line
                <li
                  key={React.key}
                  onMouseDown={(e) => formatHeading(e, item.name)}
                >
                  {item.name}
                </li>
              );
            }
            return (
              // eslint-disable-next-line
              <li
                data-testId="list"
                key={React.key}
                onClick={() => onHeaderSelect(item, type)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Dropdown;

Dropdown.propTypes = {
  buttonName: PropTypes.isRequired,
  contentStyle: PropTypes.isRequired,
  headerStyle: PropTypes.isRequired,
  onHeaderSelect: PropTypes.isRequired,
  type: PropTypes.isRequired,
  disabled: PropTypes.isRequired,
};
