import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import { useProtContext } from '../ProtocolContext';

import RenderContent from '../CustomComponents/RenderContent';
import './MultilineEdit.scss';
import {
  updateContent,
  markContentForDelete,
} from '../../../../utils/utilFunction';

import { setSectionDetails } from '../protocolSlice';
import FontProperties from '../CustomComponents/FontProperties/FontProperties';

function MultilineEdit({ edit, setShowDiscardConfirm, setRequestedRoute }) {
  const [sections, setSections] = useState([]);
  const {
    dispatchSectionEvent,
    activeLineID,
    setActiveLineID,
    sectionContent: sectionDataArr,
  } = useProtContext();
  const [showconfirm, setShowConfirm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentContent, setCurrentContent] = useState();
  const [currentValue, setCurrentValue] = useState();

  useEffect(() => {
    const blockRedireting = history.block((requestUrl) => {
      setRequestedRoute(requestUrl.pathname);
      setShowDiscardConfirm(true);
      return false;
    });
    return () => {
      blockRedireting();
    };
    // eslint-disable-next-line
  }, [history]);

  console.log('SHUBHAM1', sectionDataArr);

  console.log('SHUBHAM12', activeLineID);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.code === 'KeyZ') {
      // if (
      //   (currentContent && currentContent?.type !== 'text') ||
      //   // !currentContent ||
      //   currentContent?.content === currentValue
      // ) {
      event.preventDefault();
      dispatchSectionEvent('CONTENT_UNDO');
      // }
    }
  };

  console.log('SHU123', currentContent);
  useEffect(() => {
    console.log('SHUBHAM', currentContent);
    console.log('SHUBHAM1', activeLineID);

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeLineID !== '') {
      const currentContent1 = sectionDataArr.find(
        (x) => x.line_id === activeLineID,
      );
      setCurrentContent(currentContent1);
    }
    // eslint-disable-next-line
  }, [activeLineID]);

  useEffect(() => {
    if (sectionDataArr?.length > 0) {
      setSections(sectionDataArr);
    }
  }, [sectionDataArr]);

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

  const handleCurrentContent = (content) => {
    console.log('1233', content?.current.innerHTML);
    setCurrentValue(content?.current.innerHTML);
  };

  const deleteSegment = () => {
    if (sections?.length === 1) {
      toast.error('Section should have atleast 1 paragraph');
      setShowConfirm(false);
      return;
    }
    dispatchSectionEvent('CONTENT_DELETED', { currentLineId: activeLineID });
    setShowConfirm(false);
  };

  const onContentClick = (id) => {
    if (edit) setActiveLineID(id);
  };

  return (
    <>
      <div className="Richtextcontainer" data-testId="richTextEditor">
        {edit && (
          <FontProperties
            activeLineID={activeLineID}
            onDeleteClick={() => setShowConfirm(true)}
          />
        )}
        <div className="section-menu-container">
          <section className="section-edited-list">
            {sections
              ?.filter(
                (obj) =>
                  !(obj.type === 'table' && !obj.content) &&
                  obj.qc_change_type !== 'delete',
              )
              .map((section) => (
                // eslint-disable-next-line
                <div
                  className="content_container"
                  data-testId="content_container"
                  key={section.line_id}
                  onClick={() => onContentClick(section.line_id)}
                >
                  <RenderContent
                    sectionData={section}
                    sectionName={sectionName}
                    handleContentEdit={handleContentEdit}
                    activeLineID={activeLineID}
                    deleteSection={deleteSection}
                    setActiveLineID={setActiveLineID}
                    edit={edit}
                    handleCurrentContent={handleCurrentContent}
                  />
                </div>
              ))}
          </section>
        </div>
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
  // sectionDataArr: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  setShowDiscardConfirm: PropTypes.isRequired,
  setRequestedRoute: PropTypes.isRequired,
};
