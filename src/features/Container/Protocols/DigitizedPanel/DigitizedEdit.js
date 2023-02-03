import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import RenderContent from '../CustomComponents/RenderContent';
import './DigitizedEdit.scss';
import {
  updateContent,
  markContentForDelete,
} from '../../../../utils/utilFunction';

import { setSectionDetails } from '../protocolSlice';
import FontProperties from '../CustomComponents/FontProperties/FontProperties';

function MultilineEdit({ sectionDataArr, edit }) {
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
  const handleClickChild = (item, type) => {
    console.log('handleClickChild::', item, type);
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
          onHeaderSelect={handleClickChild}
        />
      )}
      <section className="section-edited-list">
        {sections
          ?.filter((section) => section.qc_change_type !== 'delete')
          .map((section) => (
            <div key={section.line_id}>
              <div className="content_container">
                {/* eslint-disable */}
                <div onClick={() => edit && setActiveLineID(section.line_id)}>
                  {/* eslint-enable */}
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
};
