import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const classNames = {
  active: 'dropdown-content active-show-list',
  notActive: 'dropdown-content',
};
function Dropdown({
  list,
  buttonName,
  contentStyle,
  headerStyle,
  onClick,
  type,
}) {
  const [showList, setShowList] = useState(false);
  const showMenu = () => {
    setShowList(!showList);
  };
  return (
    <div className="dropdown">
      <button
        type="button"
        className="dropbtn"
        onClick={showMenu}
        style={headerStyle}
      >
        {buttonName}
      </button>
      <div
        className={showList ? classNames.active : classNames.notActive}
        style={contentStyle}
      >
        <ul>
          {list.map((item) => {
            if (type === 'header') {
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={React.key}
                  onMouseDown={(evt) => {
                    evt.preventDefault();
                    document.execCommand('formatBlock', false, item.name);
                  }}
                >
                  {item.name}
                </li>
              );
            }
            return (
              // eslint-disable-next-line
              <li key={React.key} onClick={() => onClick(item, type)}>
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
  list: PropTypes.isRequired,
  buttonName: PropTypes.isRequired,
  contentStyle: PropTypes.isRequired,
  headerStyle: PropTypes.isRequired,
  onClick: PropTypes.isRequired,
  type: PropTypes.isRequired,
};
