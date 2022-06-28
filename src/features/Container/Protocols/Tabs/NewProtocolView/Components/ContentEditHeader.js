import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import FontProperties from "./FontProperties";
import HoverComponent from "./HoverComponent";

const ContentEditHeader = ({
  edit,
  lineID,
  setActiveLineID,
  handleSave,
  activeLineID,
  handleContentEdit,
  content,
  className,
  menuItems,
  headerTag,
}) => {
  const currentEditData = useRef("");
  const currentLineID = useRef("");

  const handleChange = (value, id) => {
    currentEditData.current = value;
    currentLineID.current = id;
    // setCurrentLineID(id);
  };
  const handleBlur = () => {
    handleContentEdit(currentEditData.current, currentLineID.current);
    currentEditData.current = "";
    currentLineID.current = "";
    // setCurrentLineID("");
  };
  return (
    <div className="format-container">
      <ContentEditable
        className={className}
        html={
          currentLineID.current === lineID ? currentEditData.current : content
        }
        disabled={edit ? false : true}
        onChange={(event) => handleChange(event.target.value, lineID)}
        onBlur={handleBlur}
        tagName={headerTag}
        onClick={() => setActiveLineID(lineID)}
        data-placeholder
      />
      {edit && lineID === activeLineID && <FontProperties />}
      {edit && lineID === activeLineID && (
        <HoverComponent menuItems={menuItems} />
      )}
    </div>
  );
};
export default ContentEditHeader;
