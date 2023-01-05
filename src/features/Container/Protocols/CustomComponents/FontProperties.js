import boldIcon from '../../../../assets/images/bold.png';
import italicIcon from '../../../../assets/images/italic.png';
import strikeIcon from '../../../../assets/images/strikethrough-text-interface-sign.png';
import underlineIcon from '../../../../assets/images/underline.png';
import superScriptIcon from '../../../../assets/images/superscript.png';
import subScriptIcon from '../../../../assets/images/subscript.png';
import listIcon from '../../../../assets/images/list.png';
// import headerIcon from "../../../../../../assets/images/heading.png";
// import H2Icon from "../../../../../../assets/images/header-H2.png";
// import H3Icon from "../../../../../../assets/images/heading-H3.png";
// import H4Icon from "../../../../../../assets/images/heading-H4.png";
import Dropdown from './Dropdown';
// import { symbolList } from '../../../../../../AppConstant/symbols';

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
        <img src={listIcon} alt="list" />
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
