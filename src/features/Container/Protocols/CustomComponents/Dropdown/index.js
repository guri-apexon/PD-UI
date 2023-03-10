import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CONTENT_TYPE } from '../../../../../AppConstant/AppConstant';
import { useProtContext } from '../../ProtocolContext';

const headerList = [
  { level: 2, name: 'H2' },
  { level: 3, name: 'H3' },
  { level: 4, name: 'H4' },
  { level: 5, name: 'H5' },
  { level: 6, name: 'H6' },
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
  activeLineID,
}) {
  const [showList, setShowList] = useState(false);
  const { dispatchSectionEvent } = useProtContext();
  const showMenu = () => {
    setShowList(!showList);
  };
  const formatHeading = (e, name, level) => {
    e.preventDefault();
    setShowList(false);
    dispatchSectionEvent('LINK_LEVEL_UPDATE', {
      level,
      currentLineId: activeLineID,
      contentType: CONTENT_TYPE.HEADER,
    });
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
                  onMouseDown={(e) => formatHeading(e, item.name, item.level)}
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
  activeLineID: PropTypes.isRequired,
};
