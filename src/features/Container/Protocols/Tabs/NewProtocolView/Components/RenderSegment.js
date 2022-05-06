import ContentEditable from "react-contenteditable";
import RenderTable from "./RenderTable";

//----------------------- For Text Format/ Dont Delete ---------------------------
// import boldIcon from "../../../../../../assets/images/bold.png";
// import italicIcon from "../../../../../../assets/images/italic.png";
// import strikeIcon from "../../../../../../assets/images/strikethrough-text-interface-sign.png";
// import underlineIcon from "../../../../../../assets/images/underline.png";
// import superScriptIcon from "../../../../../../assets/images/superscript.png";
// import subScriptIcon from "../../../../../../assets/images/subscript.png";
// ---------------------------------------------------------------------------------
import "./renderSegment.scss";

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
}) => {
  let type = data.derived_section_type;
  let content = data.content;
  let lineID = data.line_id;
  //   let bold = data.font_info.IsBold;
  if (content) {
    if (type === segmentType.table) {
      return <RenderTable data={data} edit={edit} />;
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
      return (
        <div className="image-extract">
          <img
            src={"data:image/*;base64," + content}
            alt=""
            style={{ height: "auto", width: "100%" }}
          />
        </div>
      );
    } else {
      return (
        <div className="format-container">
          <ContentEditable
            className="edit-text-con"
            // innerRef={this.contentEditable}
            html={content} // innerHTML of the editable div
            disabled={edit ? false : true} // use true to disable editing
            onChange={(event) => handleContentEdit(event.target.value, lineID)} // handle innerHTML change
            tagName="div" // Use a custom HTML tag (uses a div by default)
            onClick={() => setActiveLineID(lineID)}
          />

          {/* ----------------------- For Text Format/ Dont Delete ---------------------------

           {edit && lineID === activeLineID && (
            <div className="button-container">
              <button
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("bold", false, "strong"); // Send the command to the browser
                }}
              >
                <img src={boldIcon} alt="BOLD" />
              </button>
              <button
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("italic", false, "i"); // Send the command to the browser
                }}
              >
                <img src={italicIcon} alt="ITALIC" />
              </button>
              <button
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("underline", false, "u"); // Send the command to the browser
                }}
              >
                <img src={underlineIcon} alt="underline" />
              </button>
              <button
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("strikeThrough", false, "s"); // Send the command to the browser
                }}
              >
                <img src={strikeIcon} alt="strikeThrough" />
              </button>
              <button
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("superscript"); // Send the command to the browser
                }}
              >
                <img src={superScriptIcon} alt="superScriptIcon" />
              </button>
              <button
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand("subscript"); // Send the command to the browser
                }}
              >
                <img src={subScriptIcon} alt="subScriptIcon" />
              </button>
            </div>
          )} 
          -----------------------------------------------------------------------------------------------------
          */}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default RenderSegment;
