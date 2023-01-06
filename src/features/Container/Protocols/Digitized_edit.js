import { useState } from 'react';
import PropTypes from 'prop-types';

import HoverComponent from './CustomComponents/HoverComponent';
import RenderContent from './CustomComponents/RenderContent';
import './Digitized_edit.scss';

import { updateContent, addContent } from '../../../utils/utilFunction';

function MultilineEdit({ data }) {
  const [activeLineID, setActiveLineID] = useState('');

  const sectionName = null;

  const [sectionData, setSectionData] = useState([...data]);

  const handleAddSegment = (obj, lineId) => () => {
    const arr = addContent(sectionData, obj, lineId);
    setSectionData(arr);
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

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {sectionData?.map((data) => (
        <div key={data.line_id}>
          <div className="content_container">
            <div
              onClick={() => setActiveLineID(data.line_id)}
              style={{ position: 'relative' }}
            >
              <RenderContent
                data={data}
                sectionName={sectionName}
                handleContentEdit={handleContentEdit}
                activeLineID={activeLineID}
              />
              <HoverComponent
                lineId={data.line_id}
                activeLineID={activeLineID}
                handleAddSegment={handleAddSegment}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
