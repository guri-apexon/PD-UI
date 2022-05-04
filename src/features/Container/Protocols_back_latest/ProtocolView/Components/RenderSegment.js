import ContentEditable from "react-contenteditable";
import RenderTable from "./RenderTable";

const segmentType = {
  table: "table",
  text: "text",
  header: "header",
  image: "image",
};

const RenderSegment = ({ data, edit, handleContentEdit }) => {
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
          tagName="article" // Use a custom HTML tag (uses a div by default)
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
        <ContentEditable
          className="edit-text-con"
          // innerRef={this.contentEditable}
          html={content} // innerHTML of the editable div
          disabled={edit ? false : true} // use true to disable editing
          onChange={(event) => handleContentEdit(event.target.value, lineID)} // handle innerHTML change
          tagName="article" // Use a custom HTML tag (uses a div by default)
        />
      );
    }
  } else {
    return null;
  }
};

export default RenderSegment;
