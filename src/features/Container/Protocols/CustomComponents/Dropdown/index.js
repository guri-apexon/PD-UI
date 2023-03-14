import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const classNames = {
  active: 'dropdown-content active-show-list',
  notActive: 'dropdown-content',
};
function Dropdown({
  buttonName,
  contentStyle,
  headerStyle,
  type,
  disabled,
  list,
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

  const onSymbolSelect = (e, symbol) => {
    e.preventDefault();
    document.execCommand('insertText', false, symbol);
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
          {list?.map((item) => {
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
                onMouseDown={(e) => onSymbolSelect(e, item.name)}
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
  type: PropTypes.isRequired,
  disabled: PropTypes.isRequired,
  list: PropTypes.isRequired,
};
