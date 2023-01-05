import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import HoverComponent from './CustomComponents/HoverComponent';
import RenderContent from './CustomComponents/RenderContent';
import './Digitized_edit.scss';

import { updateContent } from '../../../utils/utilFunction';

function MultilineEdit({ data }) {
  const dispatch = useDispatch();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverSection, setHoverSection] = useState('');
  const [activeLineID, setActiveLineID] = useState('');
  const [activeContentID, setActiveContentID] = useState('');
  const [isSectionHeader, setIsSectionHeader] = useState('');
  const [activeSectionID, setActiveSectionID] = useState('');
  const sectionName = null;

  const [sectionData, setSectionData] = useState([...data]);

  const handleContentAddSegment = (type, id) => {
    const obj = {
      type,
      lineId: isSectionHeader ? activeSectionID : activeLineID,
      sectionName: hoverSection,
      isSectionHeader,
      contentID: id,
    };
    // dispatch({
    //   type: ActionTypes.UPDATE_PROTOCOL_VIEW,
    //   payload: obj,
    // });
  };

  const handleAddSegment = (type) => () => {
    const obj = {
      type,
      lineId: isSectionHeader ? activeSectionID : activeLineID,
      sectionName: hoverSection,
      isSectionHeader,
      contentID: activeContentID,
    };
    // dispatch({
    //   type: ActionTypes.UPDATE_PROTOCOL_VIEW,
    //   payload: obj,
    // });
  };

  // const handleSectionHeaderEdit = (value, line_id) => [
  //   console.log(value, line_id),
  // ];
  const handleContentEdit = (value, lineId) => {
    console.log({ value });
    const obj = {
      type: 'modify',
      lineId,
      sectionName,
      content: value,
    };
    const arr = updateContent(sectionData, obj);
    setSectionData(arr);
  };

  // const handleContentEdit = (value, line_id) => {
  //   console.log("Content Coming", value, line_id, sectionName);
  // };

  const handleActiveIDs = (id, type) => {
    if (type === 'section-header') {
      setActiveSectionID(id);
      setActiveLineID('');
    } else {
      setActiveSectionID('');
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
    setHoverIndex(line_id);
    setHoverSection(section);
    setIsSectionHeader(isSectionHeaderSelected);
  };

  // eslint-disable-next-line
  const renderAccordionDetail = (data) => {
    // console.log("Data", data);
    if (data.content && 'line_id' in data) {
      if (data.qc_change_type === 'add') {
        return (
          <div className="option-content-container">
            {/* <div
              onClick={() => handleMouseHover(data.line_id, sectionName, false)}
              style={{ position: 'relative' }}
            >
              <RenderAddedSegment
                data={data}
                edit={edit}
                sectionName={sectionName}
                handleContentEdit={handleContentEdit}
                activeLineID={activeLineID}
                setActiveLineID={(id) => handleActiveIDs(id, 'segment')}
                menuItems={menuItems}
                handleAddSegment={handleContentAddSegment}
                setActiveContentID={setActiveContentID}
              />
            </div> */}
          </div>
        );
      }
      return (
        <div
          className="option-content-container"
          // style={{ marginBottom: edit ? 20 : 0 }}
        >
          <div
            onClick={() => handleMouseHover(data.line_id, sectionName, false)}
            style={{ position: 'relative' }}
          >
            <RenderContent
              data={data}
              sectionName={sectionName}
              handleContentEdit={handleContentEdit}
              activeLineID={activeLineID}
              setActiveLineID={(id) => handleActiveIDs(id, 'segment')}
              // menuItems={menuItems}
            />
            <HoverComponent
              line_id={data.line_id}
              hoverIndex={hoverIndex}
              handleAddSegment={handleAddSegment}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {sectionData?.map((elem) => (
        <div key={elem.line_id}>{renderAccordionDetail(elem)}</div>
      ))}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
