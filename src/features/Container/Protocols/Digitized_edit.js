import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import HoverComponent from './CustomComponents/HoverComponent';
import RenderContent from './CustomComponents/RenderContent';
import './Digitized_edit.scss';

import {
  updateContent,
  addContent,
  markContentForDelete,
} from '../../../utils/utilFunction';

import { setSectionDetails } from './protocolSlice';

function MultilineEdit({ data, edit, setSections }) {
  const dispatch = useDispatch();
  const [activeLineID, setActiveLineID] = useState('');

  const sectionName = null;

  const [sectionData, setSectionData] = useState([...data]);

  const handleAddSegment = (obj, lineId) => () => {
    const arr = addContent(data, obj, lineId);
    // setSections(arr);
    dispatch(setSectionDetails(arr));
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
    const arr = updateContent(data, obj);
    // setSections(arr);
    dispatch(setSectionDetails(arr));
  };

  const deleteSection = (lineId) => {
    const arr = markContentForDelete(data, lineId);
    // setSections(arr);
    dispatch(setSectionDetails(arr));
  };

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {data
        ?.filter((obj) => obj.qc_change_type !== 'delete')
        .map((data) => (
          <div key={data.line_id}>
            <div className="content_container">
              <div
                onClick={() => edit && setActiveLineID(data.line_id)}
                style={{ position: 'relative' }}
              >
                <RenderContent
                  data={data}
                  sectionName={sectionName}
                  handleContentEdit={handleContentEdit}
                  activeLineID={activeLineID}
                  deleteSection={deleteSection}
                  edit={edit}
                />
                {edit && activeLineID === data.line_id && (
                  <HoverComponent
                    lineId={data.line_id}
                    activeLineID={activeLineID}
                    handleAddSegment={handleAddSegment}
                  />
                )}
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
  edit: PropTypes.isRequired,
  setSections: PropTypes.isRequired,
};
