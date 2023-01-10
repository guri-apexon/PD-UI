import PropTypes from 'prop-types';
import ListBullet from 'apollo-react-icons/ListBullet';
import Dropdown from './Dropdown';

const headerList = [
  {
    id: 2,
    name: 'H2',
  },
  {
    id: 3,
    name: 'H3',
  },
  { id: 4, name: 'H4' },
];

function FontProperties({ onClick }) {
  return (
    <div className="button-container">
      <Dropdown
        list={headerList}
        buttonName="H"
        contentStyle={{ left: 0 }}
        headerStyle={{ fontWeight: 'bold' }}
        onClick={onClick}
        type="header"
      />

      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('removeFormat', false, 'p');
        }}
      >
        T
      </button>
      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('bold', false, 'strong');
        }}
      >
        <b>B</b>
      </button>
      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('italic', false, 'i');
        }}
      >
        <i>I</i>
      </button>
      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('underline', false, 'u');
        }}
      >
        <span style={{ textDecoration: 'underline' }}>U</span>
      </button>
      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('strikeThrough', false, 's');
        }}
      >
        <span style={{ textDecoration: 'line-through' }}>S</span>
      </button>
      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('superscript');
        }}
      >
        X<sup>2</sup>
      </button>
      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('subscript');
        }}
      >
        X<sub>2</sub>
      </button>
      <button
        type="button"
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand('insertUnorderedList');
        }}
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
    </div>
  );
}

export default FontProperties;

FontProperties.propTypes = {
  onClick: PropTypes.isRequired,
};
