import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListBullet from 'apollo-react-icons/ListBullet';
import IconButton from 'apollo-react/components/IconButton';
import TrashIcon from 'apollo-react-icons/Trash';
import Dropdown from '../Dropdown';
import './FontProperties.scss';
import HoverComponent from '../HoverComponent';
import { headerList, mathSymbols } from './constants';

function FontProperties({ activeLineID, onDeleteClick }) {
  const [enable, setEnable] = useState(activeLineID);

  const onFormatSelect = (e, button) => {
    e.preventDefault();
    switch (button) {
      case 'B':
        document.execCommand('bold', false, 'strong');
        break;
      case 'I':
        document.execCommand('italic', false, 'i');
        break;
      case 'U':
        document.execCommand('underline', false, 'u');
        break;
      case 'S':
        document.execCommand('strikeThrough', false, 's');
        break;
      case 'superscript':
        document.execCommand('superscript');
        break;
      case 'subscript':
        document.execCommand('subscript');
        break;
      case 'UL':
        document.execCommand('insertUnorderedList');
        break;
      case 'removeFormat':
        document.execCommand('formatBlock', false, 'p'); // To revert from H tag
        document.execCommand('removeFormat', false, 'p');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setEnable(activeLineID);
  }, [activeLineID]);

  return (
    <div
      className={`${
        enable ? '' : 'disabled-btns'
      } button-container font-properties`}
      data-testId="container"
    >
      <Dropdown
        disabled={!enable}
        buttonName="H"
        contentStyle={{ left: 0 }}
        headerStyle={{ fontWeight: 'bold' }}
        list={headerList}
        type="header"
        activeLineID={activeLineID}
      />

      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
        data-testId="removeFormat"
        onMouseDown={(e) => onFormatSelect(e, 'removeFormat')}
      >
        T
      </button>
      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'B')}
      >
        <b>B</b>
      </button>
      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'I')}
      >
        <i>I</i>
      </button>
      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'U')}
      >
        <span style={{ textDecoration: 'underline' }}>U</span>
      </button>
      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'S')}
      >
        <span style={{ textDecoration: 'line-through' }}>S</span>
      </button>
      <button
        disabled={!enable}
        data-testId="superScript"
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'superscript')}
      >
        X<sup>2</sup>
      </button>
      <button
        disabled={!enable}
        data-testId="subScript"
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'subscript')}
      >
        X<sub>2</sub>
      </button>
      <button
        disabled={!enable}
        type="button"
        data-testId="bulletlist"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'UL')}
      >
        <ListBullet />
      </button>
      <Dropdown
        disabled={!enable}
        buttonName="M"
        contentStyle={{ left: 0 }}
        headerStyle={{ fontWeight: 'bold' }}
        type="symbols"
        list={mathSymbols}
      />

      <div className="right-menu">
        <HoverComponent
          disabled={!enable}
          lineId={activeLineID}
          activeLineID={activeLineID}
        />
        <IconButton
          disabled={!enable}
          size="small"
          data-testId="trash-icon"
          onClick={onDeleteClick}
        >
          <TrashIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default FontProperties;

FontProperties.propTypes = {
  activeLineID: PropTypes.isRequired,
  onDeleteClick: PropTypes.isRequired,
};
