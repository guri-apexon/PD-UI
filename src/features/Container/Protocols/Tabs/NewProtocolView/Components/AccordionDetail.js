import RenderError from "./RenderError";
import RenderLoader from "./RenderLoader";
import RenderSegment from "./RenderSegment";
import RenderAddedSegment from "./RenderAddedSegment";
// import ContentEditable from "react-contenteditable";
import HoverComponent from "./HoverComponent";
import { useState } from "react";

import {
  TableElement,
  TextElement,
  TextHeader2,
  ImageElement,
} from "./HoverElements";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../store/ActionTypes";
import "./accordionDetail.scss";
import { QC_CHANGE_TYPE } from "../../../store/sagas/utils-new";
// import ContentEditHeader from "./ContentEditHeader";
// import { generateHeaderID } from "../utils";

const AccordionBody = ({ section, edit, scrollToPage }) => {
  const dispatch = useDispatch();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverSection, setHoverSection] = useState("");
  const [activeLineID, setActiveLineID] = useState("");
  const [activeContentID, setActiveContentID] = useState("");
  const [isSectionHeader, setIsSectionHeader] = useState("");
  const [activeSectionID, setActiveSectionID] = useState("");
  const sectionHeader = section.header;
  const sectionName = sectionHeader.source_file_section;

  const handleContentAddSegment = (type, id) => {
    const obj = {
      type,
      lineId: isSectionHeader ? activeSectionID : activeLineID,
      sectionName: hoverSection,
      isSectionHeader: isSectionHeader,
      contentID: id,
    };
    dispatch({
      type: ActionTypes.UPDATE_PROTOCOL_VIEW,
      payload: obj,
    });
  };
  const handleAddSegment = (type) => () => {
    const obj = {
      type,
      lineId: isSectionHeader ? activeSectionID : activeLineID,
      sectionName: hoverSection,
      isSectionHeader: isSectionHeader,
      contentID: activeContentID,
    };
    dispatch({
      type: ActionTypes.UPDATE_PROTOCOL_VIEW,
      payload: obj,
    });
  };
  // const handleSectionHeaderEdit = (value, line_id) => [
  //   console.log(value, line_id),
  // ];
  const handleContentEdit = (value, line_id) => {
    const obj = {
      lineId: line_id,
      sectionName: sectionName,
      content: value,
    };
    dispatch({
      type: ActionTypes.UPDATE_PROTOCOL_VIEW_CHANGES,
      payload: obj,
    });
  };
  // const handleContentEdit = (value, line_id) => {
  //   console.log("Content Coming", value, line_id, sectionName);
  // };
  const menuItems = [
    {
      label: <TableElement />,
      onClick: handleAddSegment("table"),
    },
    {
      text: <TextElement />,
      onClick: handleAddSegment("text"),
    },
    {
      text: <TextHeader2 />,
      onClick: handleAddSegment("header"),
    },
    {
      text: <ImageElement />,
      onClick: handleAddSegment("image"),
    },
  ];
  const handleActiveIDs = (id, type) => {
    if (type === "section-header") {
      setActiveSectionID(id);
      setActiveLineID("");
    } else {
      setActiveSectionID("");
      setActiveLineID(id);
    }
  };
  // const renderSubHeader = (data) => {
  //   const pre = data.source_heading_number;
  //   const header = data.source_file_section;
  //   const text = pre + " " + header;
  //   const sectionId = data.sec_id;
  //   const headerTag = parseInt(data.derived_heading_level) === 2 ? "H2" : "H3";
  //   return (
  //     <ContentEditHeader
  //       content={text}
  //       edit={edit}
  //       lineID={sectionId}
  //       setActiveLineID={(id) => handleActiveIDs(id, "section-header")}
  //       activeLineID={activeSectionID}
  //       handleContentEdit={handleSectionHeaderEdit}
  //       className="line-content level-3-header"
  //       menuItems={menuItems}
  //       headerTag={headerTag}
  //     />
  //     // <ContentEditable
  //     //   className="line-content level-3-header"
  //     //   // innerRef={this.contentEditable}
  //     //   html={text} // innerHTML of the editable div
  //     //   disabled={edit ? false : true} // use true to disable editing
  //     //   onChange={handleContentEdit} // handle innerHTML change
  //     //   tagName="div" // Use a custom HTML tag (uses a div by default)
  //     //   onClick={() => scrollToPage(data.page)}
  //     // />
  //   );
  // };
  const handleMouseHover = (line_id, section, isSectionHeaderSelected) => {
    if (edit) {
      setHoverIndex(line_id);
      setHoverSection(section);
      setIsSectionHeader(isSectionHeaderSelected);
    }
  };
  const renderAccordionDetail = (data) => {
    // console.log("Data", data);
    if (data.content && "line_id" in data) {
      if (data.qc_change_type === QC_CHANGE_TYPE.ADDED) {
        return (
          <div
            className="option-content-container"
            style={{ marginBottom: edit ? 20 : 0 }}
          >
            <div
              onClick={() => handleMouseHover(data.line_id, sectionName, false)}
              style={{ position: "relative" }}
            >
              <RenderAddedSegment
                data={data}
                edit={edit}
                sectionName={sectionName}
                handleContentEdit={handleContentEdit}
                activeLineID={activeLineID}
                setActiveLineID={(id) => handleActiveIDs(id, "segment")}
                menuItems={menuItems}
                handleAddSegment={handleContentAddSegment}
                setActiveContentID={setActiveContentID}
              />
            </div>
          </div>
        );
      }
      return (
        <div
          className="option-content-container"
          style={{ marginBottom: edit ? 20 : 0 }}
        >
          <div
            onClick={() => handleMouseHover(data.line_id, sectionName, false)}
            style={{ position: "relative" }}
          >
            <RenderSegment
              data={data}
              edit={edit}
              sectionName={sectionName}
              handleContentEdit={handleContentEdit}
              activeLineID={activeLineID}
              setActiveLineID={(id) => handleActiveIDs(id, "segment")}
              menuItems={menuItems}
            />
            <>
              {edit && (
                <HoverComponent
                  line_id={data.line_id}
                  hoverIndex={hoverIndex}
                  menuItems={menuItems}
                />
              )}
            </>
          </div>
        </div>
      );
    }
  };
  return (
    <div
      id={sectionName}
      className="accordion-parent-detail"
      style={{ width: "100%", marginBottom: 20 }}
    >
      {section.error && <RenderError />}
      {section.loading && <RenderLoader />}
      {!section.loading &&
        section.success &&
        section.detail &&
        section.detail.length > 0 &&
        section.detail.map((elem, i) => {
          return <div key={"line-id" + i}>{renderAccordionDetail(elem)}</div>;
        })}
      {!section.loading && !section.success && <RenderError />}
    </div>
  );
};

export default AccordionBody;
