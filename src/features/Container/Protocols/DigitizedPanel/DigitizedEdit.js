import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import { useProtContext } from '../ProtocolContext';

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
  const { dispatchSectionEvent } = useProtContext();
  const [showconfirm, setShowConfirm] = useState(false);
  const [enableNewSection, setEnableNewSection] = useState(false);

  useEffect(() => {
    console.log('sectionDataArr', sectionDataArr);
    if (sectionDataArr?.length > 0) {
      setSections(sectionDataArr);
    }
    setEnableNewSection(true);
  }, [sectionDataArr]);

  console.log('sectionDataArr123', sectionDataArr);
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

  const deleteSegment = () => {
    dispatchSectionEvent('CONTENT_DELETED', { currentLineId: activeLineID });
    setShowConfirm(false);
  };

  return (
    <>
      <div className="Richtextcontainer" data-testId="richTextEditor">
        {edit && (
          <FontProperties
            activeLineID={activeLineID}
            onDeleteClick={() => setShowConfirm(true)}
            enableNewSection={enableNewSection}
          />
        )}
        <section className="section-edited-list">
          {sections?.map((section) => (
            // eslint-disable-next-line
            <div
              className="content_container"
              data-testId="content_container"
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
                enableNewSection={enableNewSection}
              />
            </div>
          ))}
        </section>
      </div>
      {showconfirm && (
        <div className="confirmation-popup" data-testId="confirmPopup">
          <p>Please confirm if you want to continue with deletion</p>
          <ButtonGroup
            buttonProps={[
              {
                label: 'Cancel',
                onClick: () => setShowConfirm(false),
              },
              {
                label: 'Delete',
                onClick: deleteSegment,
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  sectionDataArr: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
