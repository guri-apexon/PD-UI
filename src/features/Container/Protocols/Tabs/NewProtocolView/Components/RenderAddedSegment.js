import "./renderSegment.scss";
import React, { useState } from "react";
import PDTable from "../../../Components/pd-table";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../store/ActionTypes";
import ContentEdit from "./ContentEdit";
import HoverComponent from "./HoverComponent";
import { v4 as uuidv4 } from "uuid";
import {
  TableElement,
  TextElement,
  TextHeader2,
  ImageElement,
} from "./HoverElements";

const segmentType = {
  table: "table",
  text: "text",
  header: "header",
  image: "image",
};

const RenderAddedSegment = ({
  data,
  edit,
  handleContentEdit,
  activeLineID,
  setActiveLineID,
  sectionName,
  handleAddSegment,
  setActiveContentID,
}) => {
  const dispatch = useDispatch();
  const [activeContentId, setActiveContentId] = useState(null);
  // let type = data.type;
  let content = data.content;
  let lineID = data.line_id;

  const handleImageDelete = () => {
    dispatch({
      type: ActionTypes.DELETE_IMAGE,
      payload: { sectionName, lineID },
    });
  };
  const handleAddedContentEdit = (...args) => {
    console.log("ARGS", args);
  };

  const renderSegment = (item) => {
    const type = item.type;
    if (item.content) {
      if (type === segmentType.table) {
        return (
          <div onClick={() => edit && setActiveContentId(item.id)}>
            <PDTable
              data={item.content}
              edit={edit}
              onChange={handleContentEdit}
              index={"index"}
              segment={data}
              activeLineID={activeLineID}
              lineID={data.line_id}
            />
          </div>
        );
      } else if (type === segmentType.header) {
        return (
          <div onClick={() => edit && setActiveContentId(item.id)}>
            <ContentEdit
              content={item.content}
              edit={edit}
              lineID={lineID}
              setActiveLineID={setActiveLineID}
              activeLineID={activeLineID}
              handleContentEdit={handleContentEdit}
              className="line-content edit-header-co"
            />
          </div>
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
              src={content}
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
          <div onClick={() => edit && setActiveContentId(item.id)}>
            <ContentEdit
              content={item.content}
              edit={edit}
              lineID={item.id}
              setActiveLineID={setActiveContentId}
              activeLineID={activeContentId}
              handleContentEdit={handleAddedContentEdit}
              className="line-content edit-text-con"
            />
          </div>
        );
      }
    } else {
      return null;
    }
  };
  //   handleAddSegmentClick(type) {
  //     return function () {
  //         console.log("Active Content ID Inside", activeContentId);
  //         handleAddSegment(type, activeContentId);
  //     };
  // };
  const handleAddSegmentClick = (type) => {
    const id = activeContentId;
    return function () {
      handleAddSegment(type, id);
    };
  };
  const menuItems = [
    {
      label: <TableElement />,
      onClick: handleAddSegmentClick("table"),
    },
    {
      text: <TextElement />,
      onClick: handleAddSegmentClick("text"),
    },
    {
      text: <TextHeader2 />,
      onClick: handleAddSegmentClick("header"),
    },
    {
      text: <ImageElement />,
      onClick: handleAddSegmentClick("image"),
    },
  ];
  return (
    <div onClick={() => edit && setActiveLineID(data.line_id)}>
      {content.map((item) => (
        <div key={uuidv4()} style={{ position: "relative" }}>
          {renderSegment(item)}
          <>
            {edit &&
              activeLineID === data.line_id &&
              activeContentId === item.id && (
                <HoverComponent
                  line_id={item.id}
                  hoverIndex={activeContentId}
                  menuItems={menuItems}
                />
              )}
          </>
        </div>
      ))}
    </div>
  );
};

export default React.memo(RenderAddedSegment);
