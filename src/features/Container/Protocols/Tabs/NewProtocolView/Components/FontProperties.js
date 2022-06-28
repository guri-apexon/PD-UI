import boldIcon from "../../../../../../assets/images/bold.png";
import italicIcon from "../../../../../../assets/images/italic.png";
import strikeIcon from "../../../../../../assets/images/strikethrough-text-interface-sign.png";
import underlineIcon from "../../../../../../assets/images/underline.png";
import superScriptIcon from "../../../../../../assets/images/superscript.png";
import subScriptIcon from "../../../../../../assets/images/subscript.png";
import listIcon from "../../../../../../assets/images/list.png";
// import headerIcon from "../../../../../../assets/images/heading.png";
// import H2Icon from "../../../../../../assets/images/header-H2.png";
// import H3Icon from "../../../../../../assets/images/heading-H3.png";
// import H4Icon from "../../../../../../assets/images/heading-H4.png";
import Dropdown from "../../../Components/Dropdown";
import { symbolList } from "../../../../../../AppConstant/symbols";

const headerList = [
  {
    id: 2,
    name: "H2",
  },
  {
    id: 3,
    name: "H3",
  },
  { id: 4, name: "H4" },
];

const FontProperties = ({ onClick }) => {
  return (
    <div className="button-container">
      <Dropdown
        list={headerList}
        buttonName={"H"}
        contentStyle={{ left: 0 }}
        headerStyle={{ fontWeight: "bold" }}
        onClick={onClick}
        type="header"
      />
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("removeFormat", false, "p");
        }}
      >
        T
      </button>
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("bold", false, "strong");
        }}
      >
        <img src={boldIcon} alt="BOLD" />
      </button>
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("italic", false, "i");
        }}
      >
        <img src={italicIcon} alt="ITALIC" />
      </button>
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("underline", false, "u");
        }}
      >
        <img src={underlineIcon} alt="underline" />
      </button>
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("strikeThrough", false, "s");
        }}
      >
        <img src={strikeIcon} alt="strikeThrough" />
      </button>
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("superscript");
        }}
      >
        <img src={superScriptIcon} alt="superScriptIcon" />
      </button>
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("subscript");
        }}
      >
        <img src={subScriptIcon} alt="subScriptIcon" />
      </button>
      <button
        className="button-exec-icon"
        onMouseDown={(evt) => {
          evt.preventDefault();
          document.execCommand("insertUnorderedList");
        }}
      >
        <img src={listIcon} alt="list" />
      </button>
      <Dropdown
        list={symbolList}
        onClick={onClick}
        buttonName={"M"}
        contentStyle={{ right: 0 }}
        type="symbol"
      />
    </div>
  );
};

export default FontProperties;
