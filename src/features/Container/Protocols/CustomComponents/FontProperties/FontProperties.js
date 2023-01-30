import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListBullet from 'apollo-react-icons/ListBullet';
import IconButton from 'apollo-react/components/IconButton';
import TrashIcon from 'apollo-react-icons/Trash';
import Dropdown from '../Dropdown';
import './FontProperties.scss';
import HoverComponent from '../HoverComponent';
import { ProtocolContext, useProtContext } from '../../ProtocolContext';

function FontProperties({ onHeaderSelect, activeLineID }) {
  const [enable, setEnable] = useState(activeLineID);
  const { dispatchSectionEvent } = useProtContext();

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
        document.execCommand('removeFormat', false, 'p');
        break;
      default:
        break;
    }
  };
  const deleteSegment = () => {
    dispatchSectionEvent('CONTENT_DELETED', { currentLineId: activeLineID });
  };
  useEffect(() => {
    setEnable(activeLineID);
  }, [activeLineID]);
  return (
    <div
      className={`${
        enable ? '' : 'disabled-btns'
      } button-container font-properties`}
    >
      <Dropdown
        disabled={!enable}
        buttonName="H"
        contentStyle={{ left: 0 }}
        headerStyle={{ fontWeight: 'bold' }}
        onHeaderSelect={onHeaderSelect}
        type="header"
      />

      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
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
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'superscript')}
      >
        X<sup>2</sup>
      </button>
      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'subscript')}
      >
        X<sub>2</sub>
      </button>
      <button
        disabled={!enable}
        type="button"
        className="button-exec-icon"
        onMouseDown={(e) => onFormatSelect(e, 'UL')}
      >
        <ListBullet />
      </button>
      {/* <Dropdown
        list={symbolList}
        onClick={onClick}
        buttonName={'M'}
        contentStyle={{ right: 0 }}
        type="symbol"
      /> */}
      <div className="right-menu">
        <HoverComponent lineId={activeLineID} activeLineID={activeLineID} />
        <IconButton size="small">
          <TrashIcon onClick={() => deleteSegment()} />
        </IconButton>
      </div>
    </div>
  );
}

export default FontProperties;

FontProperties.propTypes = {
  onHeaderSelect: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
};
