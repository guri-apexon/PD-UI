import "./renderSegment.scss";
import React from "react";
import PDTable from "../../../Components/pd-table";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../store/ActionTypes";
import ContentEdit from "./ContentEdit";

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
  const dispatch = useDispatch();
  let type = data.type;
  let content = data.content;
  let lineID = data.line_id;

  const handleImageDelete = () => {
    dispatch({
      type: ActionTypes.DELETE_IMAGE,
      payload: { sectionName, lineID },
    });
  };
  // const handleTableDelete = () => {
  //   dispatch({
  //     type: ActionTypes.DELETE_TABLE,
  //     payload: { sectionName, lineID },
  //   });
  // };
  // const handleTableSave = (content, lineID) => {
  //   handleContentEdit(content, lineID);
  //   dispatch({
  //     type: ActionTypes.DISABLE_TABLE,
  //     payload: { sectionName },
  //   });
  // };
  // const handleModifySegment = (...data) => {
  //   console.log("table Change", data);
  // };
  // const enableTableForEdit = () => {
  //   dispatch({
  //     type: ActionTypes.ENABLE_TABLE,
  //     payload: { lineID, sectionName },
  //   });
  // };

  if (content) {
    if (type === segmentType.table) {
      // return <RenderTable data={data} edit={edit} />;
      return (
        <div onClick={() => edit && setActiveLineID(data.line_id)}>
          <PDTable
            data={content}
            edit={edit}
            onChange={handleContentEdit}
            index={"index"}
            segment={data}
            activeLineID={activeLineID}
            lineID={data.line_id}
          />
        </div>
        // <PDTable
        //   data={data}
        //   edit={edit}
        //   handleSave={handleTableSave}
        //   key={lineID}
        //   enableTableForEdit={enableTableForEdit}
        //   handleTableDelete={handleTableDelete}
        // />
      );
    } else if (type === segmentType.header) {
      return (
        <ContentEdit
          content={content}
          edit={edit}
          lineID={lineID}
          setActiveLineID={setActiveLineID}
          activeLineID={activeLineID}
          handleContentEdit={handleContentEdit}
          className="line-content edit-header-co"
        />
        // <div className="format-container">
        //   <ContentEditable
        //     className="line-content edit-header-co"
        //     html={
        //       currentLineID.current === lineID
        //         ? currentEditData.current
        //         : content
        //     }
        //     disabled={edit ? false : true}
        //     onChange={(event) => handleChange(event.target.value, lineID)}
        //     onBlur={handleBlur}
        //     tagName="div"
        //     onClick={() => setActiveLineID(lineID)}
        //     data-placeholder
        //   />
        //   {edit && lineID === activeLineID && <FontProperties />}
        // </div>
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
        <ContentEdit
          content={content}
          edit={edit}
          lineID={lineID}
          setActiveLineID={setActiveLineID}
          activeLineID={activeLineID}
          handleContentEdit={handleContentEdit}
          className="line-content edit-text-con"
        />
        // <div className="format-container">
        //   <ContentEditable
        //     className="line-content edit-text-con"
        //     html={
        //       currentLineID.current === lineID
        //         ? currentEditData.current
        //         : content
        //     }
        //     disabled={edit ? false : true}
        //     onChange={(event) => handleChange(event.target.value, lineID)}
        //     onBlur={handleBlur}
        //     tagName="div"
        //     onClick={() => setActiveLineID(lineID)}
        //     data-placeholder
        //   />
        //   {edit && lineID === activeLineID && <FontProperties />}
        // </div>
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
