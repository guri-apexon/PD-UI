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
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (sectionDataArr?.length > 0) {
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
  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {edit && <FontProperties activeLineID={activeLineID} />}
      <section className="section-edited-list">
        {sections?.map((section) => (
          // eslint-disable-next-line
          <div
            className="content_container"
            key={section.line_id}
            onClick={() => edit && setActiveLineID(section.line_id)}
          >
            <RenderContent
              sectionData={section}
              sectionName={sectionName}
              handleContentEdit={handleContentEdit}
              activeLineID={activeLineID}
              deleteSection={deleteSection}
              setActiveLineID={setActiveLineID}
              edit={edit}
            />
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