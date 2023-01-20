/* eslint-disable react/button-has-type */
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import HoverComponent from '../CustomComponents/HoverComponent';
import RenderContent from '../CustomComponents/RenderContent';
import './Digitized_edit.scss';

import {
  updateContent,
  addContent,
  markContentForDelete,
} from '../../../../utils/utilFunction';

import { setSectionDetails, updateSectionData } from '../protocolSlice';
import SAMPLE_DOC from './data.json';
import FontProperties from '../CustomComponents/FontProperties/FontProperties';
import ActionTypes from './ActionTypes';

function MultilineEdit({ data, edit }) {
  const [value, setValue] = useState(null);
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (data?.length > 0) {
      const arr = data.map((val, index) => ({
        key: index,
        text: val.content,
        type: 'LeftAlignedBlock',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      }));
      setValue({ blocks: arr, entityMap: {} });
      console.log('data', data);
      setSections(data);
    }
  }, [data]);

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
    const arr = updateContent(data, obj);
    dispatch(setSectionDetails(arr));
  };

  const deleteSection = (lineId) => {
    const arr = markContentForDelete(data, lineId);
    dispatch(setSectionDetails(arr));
  };
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent({ format: 'text' }));
    }
  };
  const handleAddSegment = (obj, lineId) => () => {
    const arr = addContent(data, obj, lineId);
    dispatch(updateSectionData({ data: arr, type: 'insert' }));
    // dispatch({
    //   type: ActionTypes.UPDATE_PROTOCOL_VIEW,
    //   payload: { data: arr, type: 'insert' },
    // });
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
        {data
          ?.filter((obj) => obj.qc_change_type !== 'delete')
          .map((data) => (
            <div key={data.line_id}>
              <div className="content_container">
                {/* eslint-disable */}
                <div
                  /* eslint-enable */
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
  data: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
