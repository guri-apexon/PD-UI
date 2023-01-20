/* eslint-disable react/button-has-type */
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import HoverComponent from '../CustomComponents/HoverComponent';
import RenderContent from '../CustomComponents/RenderContent';
import './DigitizedEdit.scss';

import {
  updateContent,
  addContent,
  markContentForDelete,
} from '../../../../utils/utilFunction';

import { setSectionDetails, updateSectionData } from '../protocolSlice';
import SAMPLE_DOC from './data.json';
import FontProperties from '../CustomComponents/FontProperties/FontProperties';

function MultilineEdit({ sectionDataArr, edit, linkId }) {
  // const [value, setValue] = useState(null);
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (sectionDataArr?.length > 0) {
      // const arr = sectionDataArr.map((val, index) => ({
      //   key: index,
      //   text: val.content,
      //   type: 'LeftAlignedBlock',
      //   depth: 0,
      //   inlineStyleRanges: [],
      //   entityRanges: [],
      //   data: {},
      // }));
      // setValue({ blocks: arr, entityMap: {} });
      setSections(sectionDataArr);
    }
  }, [sectionDataArr]);

  const dispatch = useDispatch();
  const [activeLineID, setActiveLineID] = useState('');

  const sectionName = null;

  const handleContentEdit = (value, lineId) => {
    const obj = {
      type: 'modify',
      lineId,
      sectionName,
      content: value,
    };
    const arr = updateContent(sectionDataArr, obj);
    dispatch(setSectionDetails(arr));
  };

  const deleteSection = (lineId) => {
    const arr = markContentForDelete(sectionDataArr, lineId);
    dispatch(setSectionDetails(arr));
  };
  const handleAddSegment = (obj, lineId) => () => {
    const arr = addContent(sectionDataArr, obj, lineId);
    dispatch(updateSectionData({ data: arr, type: 'insert', linkId }));
  };
  const handleClickChild = (item, type) => {
    // if (type === 'symbol') {
    //   if (currentEditData.current) {
    //     const newText = `${currentEditData.current} ${item.name}`;
    //     currentEditData.current = newText;
    //   } else {
    //     const newText = `${text} ${item.name}`;
    //     setText(newText);
    //   }
    // }
  };
  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {edit && (
        <FontProperties
          activeLineID={activeLineID}
          onClick={handleClickChild}
          handleAddSegment={handleAddSegment}
        />
      )}
      <section className="section-edited-list">
        {sections?.map((section) => (
          <div key={section.line_id}>
            <div className="content_container">
              {/* eslint-disable */}
              <div
                /* eslint-enable */
                onClick={() => edit && setActiveLineID(section.line_id)}
                style={{ position: 'relative' }}
              >
                <RenderContent
                  sectionData={section}
                  sectionName={sectionName}
                  handleContentEdit={handleContentEdit}
                  activeLineID={activeLineID}
                  deleteSection={deleteSection}
                  edit={edit}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  sectionDataArr: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  linkId: PropTypes.isRequired,
};
