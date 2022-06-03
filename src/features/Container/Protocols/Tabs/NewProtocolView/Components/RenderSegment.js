import ContentEditable from "react-contenteditable";
// import RenderTable from "./RenderTable";

import boldIcon from "../../../../../../assets/images/bold.png";
import italicIcon from "../../../../../../assets/images/italic.png";
import strikeIcon from "../../../../../../assets/images/strikethrough-text-interface-sign.png";
import underlineIcon from "../../../../../../assets/images/underline.png";
import superScriptIcon from "../../../../../../assets/images/superscript.png";
import subScriptIcon from "../../../../../../assets/images/subscript.png";
import listIcon from "../../../../../../assets/images/list.png";
import "./renderSegment.scss";
import React, { useRef } from "react";
import PDTable from "../../../Components/AG-Table";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../store/ActionTypes";

const segmentType = {
  table: "table",
  text: "text",
  header: "header",
  image: "image",
};

const RenderSegment = ({
  data,
  edit,
  handleContentEdit,
  activeLineID,
  setActiveLineID,
  sectionName,
}) => {
  // const [currentEditData, setCurrentEditData] = useState("");
  // const [currentLineID, setCurrentLineID] = useState("");
  const dispatch = useDispatch();
  const currentEditData = useRef("");
  const currentLineID = useRef("");
  let type = data.derived_section_type;
  let content = data.content;
  let lineID = data.line_id;

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
  const handleImageDelete = () => {
    dispatch({
      type: ActionTypes.DELETE_IMAGE,
      payload: { sectionName, lineID },
    });
  };
  const handleTableDelete = () => {
    dispatch({
      type: ActionTypes.DELETE_TABLE,
      payload: { sectionName, lineID },
    });
  };
  const handleTableSave = (content, lineID) => {
    // handleContentEdit(content, lineID);
    dispatch({
      type: ActionTypes.DISABLE_TABLE,
      payload: { sectionName },
    });
  };
  const enableTableForEdit = () => {
    dispatch({
      type: ActionTypes.ENABLE_TABLE,
      payload: { lineID, sectionName },
    });
  };

  if (content) {
    if (type === segmentType.table) {
      // return <RenderTable data={data} edit={edit} />;
      return (
        <PDTable
          data={data}
          edit={edit}
          handleSave={handleTableSave}
          key={lineID}
          enableTableForEdit={enableTableForEdit}
          handleTableDelete={handleTableDelete}
        />
      );
    } else if (type === segmentType.header) {
      return (
        <ContentEditable
          className="edit-header-co"
          // innerRef={this.contentEditable}
          html={content} // innerHTML of the editable div
          disabled={edit ? false : true} // use true to disable editing
          onChange={(event) => handleContentEdit(event.target.value, lineID)} // handle innerHTML change
          tagName="div" // Use a custom HTML tag (uses a div by default)
        />
      );
    } else if (type === segmentType.image) {
      if ("imageButton" in data && data.imageButton === true) {
        return <FileUpload deleteImage={handleImageDelete} />;
      }
      return (
        <div className="image-container">
          {edit && (
            <div className="image-buttons">
              <button className="button delete" onClick={handleImageDelete}>
                Delete Image
              </button>
            </div>
          )}
          <img
            src={"data:image/*;base64," + content}
            alt=""
            style={{
              height: "auto",
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="format-container">
          <ContentEditable
            className="edit-text-con"
            // innerRef={this.contentEditable}
            html={
              currentLineID.current === lineID
                ? currentEditData.current
                : content
            } // innerHTML of the editable div
            disabled={edit ? false : true} // use true to disable editing
            onChange={(event) => handleChange(event.target.value, lineID)} // handle innerHTML change
            onBlur={handleBlur}
            tagName="div" // Use a custom HTML tag (uses a div by default)
            onClick={() => setActiveLineID(lineID)}
          />
          {edit && lineID === activeLineID && (
            <div className="button-container">
              <button
                className="button-exec-icon"
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("bold", false, "strong"); // Send the command to the browser
                }}
              >
                <img src={boldIcon} alt="BOLD" />
              </button>
              <button
                className="button-exec-icon"
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("italic", false, "i"); // Send the command to the browser
                }}
              >
                <img src={italicIcon} alt="ITALIC" />
              </button>
              <button
                className="button-exec-icon"
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("underline", false, "u"); // Send the command to the browser
                }}
              >
                <img src={underlineIcon} alt="underline" />
              </button>
              <button
                className="button-exec-icon"
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("strikeThrough", false, "s"); // Send the command to the browser
                }}
              >
                <img src={strikeIcon} alt="strikeThrough" />
              </button>
              <button
                className="button-exec-icon"
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("superscript"); // Send the command to the browser
                }}
              >
                <img src={superScriptIcon} alt="superScriptIcon" />
              </button>
              <button
                className="button-exec-icon"
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("subscript"); // Send the command to the browser
                }}
              >
                <img src={subScriptIcon} alt="subScriptIcon" />
              </button>
              <button
                className="button-exec-icon"
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("insertUnorderedList"); // Send the command to the browser
                }}
              >
                <img src={listIcon} alt="list" />
              </button>
            </div>
          )}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default React.memo(RenderSegment);
// , (prevProps, nextProps) => {
//   if (prevProps.data === nextProps.data || prevProps.edit === nextProps.edit) {
//     return true;
//   }
//   return false; // props are not equal -> update the component
// }
