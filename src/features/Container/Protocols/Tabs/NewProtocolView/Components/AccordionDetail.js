import RenderError from "./RenderError";
import RenderLoader from "./RenderLoader";
import RenderSegment from "./RenderSegment";
import ContentEditable from "react-contenteditable";
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

const AccordionBody = ({ section, edit, scrollToPage }) => {
  const dispatch = useDispatch();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverSection, setHoverSection] = useState("");
  const sectionHeader = section.header;
  const sectionName = sectionHeader.source_file_section;
  const handleClick = (type) => () => {
    const obj = {
      derivedSectionType: type,
      lineId: hoverIndex,
      sectionName: hoverSection,
    };
    dispatch({
      type: ActionTypes.UPDATE_PROTOCOL_VIEW,
      payload: obj,
    });
  };
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
      onClick: handleClick("table"),
    },
    {
      text: <TextElement />,
      onClick: handleClick("text"),
    },
    {
      text: <TextHeader2 />,
      onClick: handleClick("header"),
    },
    {
      text: <ImageElement />,
      onClick: handleClick("image"),
    },
  ];
  const renderSubHeader = (data) => {
    const pre = data.source_heading_number;
    const header = data.source_file_section;
    const text = pre + " " + header;
    return (
      <ContentEditable
        className="level-3-header"
        // innerRef={this.contentEditable}
        html={text} // innerHTML of the editable div
        disabled={edit ? false : true} // use true to disable editing
        onChange={handleContentEdit} // handle innerHTML change
        tagName="article" // Use a custom HTML tag (uses a div by default)
        onClick={() => scrollToPage(data.page)}
      />
    );
  };
  const handleMouseHover = (line_id, section) => {
    if (edit) {
      setHoverIndex(line_id);
      setHoverSection(section);
    }
  };
  const renderAccordionDetail = (data) => {
    // console.log("Data", data);
    if (data.genre === "2_section_metadata") {
      return (
        <div className="option-content-container">
          <div>{renderSubHeader(data)}</div>
          {edit && (
            <HoverComponent
              line_id={data.line_id}
              hoverIndex={hoverIndex}
              menuItems={menuItems}
            />
          )}
        </div>
      );
    } else if (data.content) {
      return (
        <div className="option-content-container">
          <div onMouseEnter={() => handleMouseHover(data.line_id, sectionName)}>
            <RenderSegment
              data={data}
              edit={edit}
              handleContentEdit={handleContentEdit}
            />
            {edit && (
              <HoverComponent
                line_id={data.line_id}
                hoverIndex={hoverIndex}
                menuItems={menuItems}
              />
            )}
          </div>
        </div>
      );
    }
  };
  console.log("Hover Detail", hoverIndex, hoverSection);
  return (
    <div
      id={sectionName}
      className="accordion-parent-detail"
      style={{ width: "100%" }}
    >
      {section.loading && <RenderLoader />}
      {!section.loading &&
        section.success &&
        section.detail.map((elem, i) => {
          return <div key={"line-id" + i}>{renderAccordionDetail(elem)}</div>;
        })}
      {!section.loading && !section.success && <RenderError />}
    </div>
  );
};

export default AccordionBody;
