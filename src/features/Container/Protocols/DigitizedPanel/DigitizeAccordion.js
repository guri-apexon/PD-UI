import React, { useState, useEffect } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Popover from 'apollo-react/components/Popover';
import IconButton from 'apollo-react/components/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import Lock from 'apollo-react-icons/Lock';
import Undo from 'apollo-react-icons/Undo';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import EyeShow from 'apollo-react-icons/EyeShow';
import Modal from 'apollo-react/components/Modal';
import Save from 'apollo-react-icons/Save';
import Plus from 'apollo-react-icons/Plus';
import Trash from 'apollo-react-icons/Trash';
import { isEmpty } from 'lodash';

import MultilineEdit from './MultilineEdit';
import Loader from '../../../Components/Loader/Loader';
import {
  createFullMarkup,
  createEnrichedText,
  getSaveSectionPayload,
  createPreferredText,
} from '../../../../utils/utilFunction';
import {
  SectionIndex,
  isSaveEnabled,
  sectionDetails,
  setSaveEnabled,
  TOCActive,
  updateSectionData,
  resetUpdateStatus,
} from '../protocolSlice';
import MedicalTerm from '../EnrichedContent/MedicalTerm';
import SanitizeHTML from '../../../Components/SanitizeHtml';
import { PROTOCOL_RIGHT_MENU, AUDIT_LIST } from '../Constant/Constants';
import { useProtContext } from '../ProtocolContext';
import DisplayTable from '../CustomComponents/PDTable/Components/Table';
import ImageUploader from '../CustomComponents/ImageUploader';
import AddSection from './AddSection';
import HeaderConstant from '../CustomComponents/constants';

import {
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
} from '../../../../AppConstant/AppConstant';
import DeleteModal from './DeleteModal';

const styles = {
  modal: {
    maxWidth: 500,
  },
};

const useStyles = makeStyles(styles);

function DigitizeAccordion({
  item,
  protocol,
  primaryRole,
  currentActiveCard,
  handlePageRight,
  rightBladeValue,
  index,
  headerList,
  setCurrentEditCard,
  currentEditCard,
  value,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { headerLevel1 } = HeaderConstant;

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);
  const [sectionDataArr, setSectionDataArr] = useState([]);
  const [enrichedTarget, setEnrichedTarget] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const sectionHeaderDetails = useSelector(sectionDetails);
  const saveEnabled = useSelector(isSaveEnabled);
  const [selectedEnrichedText, setSelectedEnrichedText] = useState(null);
  const [clinicalTerms, setClinicalTerms] = useState(null);
  const [linkId, setLinkId] = useState();
  const [docId, setDocId] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const NewSectionIndex = useSelector(SectionIndex);

  const [openAudit, setOpenAudit] = useState(null);
  const [sectionDataBak, setSectionDataBak] = useState([]);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSection, setDeleteSection] = useState({});

  const { data: sectionData, updated } = sectionHeaderDetails;

  const [tocActive, setTocActive] = useState([]);
  const tocActiveSelector = useSelector(TOCActive);
  useEffect(() => {
    if (tocActiveSelector) setTocActive(tocActiveSelector);
  }, [tocActiveSelector]);

  const {
    dispatchSectionEvent,
    sectionContent,
    selectedSection,
    setSaveSection,
    saveSection,
  } = useProtContext();

  const handleChange = (e) => {
    e.stopPropagation();
    if (showedit && saveEnabled) {
      setShowDiscardConfirm(true);
      return;
    }
    if (handlePageRight) handlePageRight(item.page);
    setExpanded(!expanded);
    const tempTOCActive = [...tocActive];
    tempTOCActive[index] = !tempTOCActive[index];
    setTocActive(tempTOCActive);
    dispatch({
      type: 'SET_TOC_Active',
      payload: {
        data: tempTOCActive,
      },
    });
  };

  const fetchContent = () => {
    dispatch({
      type: 'GET_SECTION_LIST',
      payload: {
        linkId: item.link_id,
        docId: item.doc_id,
        protocol,
      },
    });
  };
  useEffect(() => {
    if (expanded) {
      const arr = sectionData?.filter((obj) => obj.linkId === item.link_id);
      if (!arr?.length) {
        setShowLoader(true);
        setLinkId(item.link_id);
        setDocId(item.doc_id);
        fetchContent();
      }
    } else {
      setEnrichedTarget(null);
      setShowAlert(false);
      setShowEdit(false);
      setCurrentEditCard(null);
    }
    // eslint-disable-next-line
  }, [expanded]);

  useEffect(() => {
    if (currentActiveCard === item.link_id && !expanded && tocActive[index]) {
      setExpanded(true);
    } else if (currentActiveCard === item.link_id && expanded) {
      setExpanded(false);
    }
    if (currentActiveCard === item.link_id && expanded && tocActive[index]) {
      setExpanded(true);
    }
    // eslint-disable-next-line
  }, [currentActiveCard]);

  const dispatchSectionData = (resetValues) => {
    if (resetValues) {
      dispatchSectionEvent('ON_SECTION_SELECT', {
        selectedSection: null,
        sectionContent: null,
      });
    } else if (item && sectionDataArr) {
      dispatchSectionEvent('ON_SECTION_SELECT', {
        selectedSection: item,
        sectionContent: sectionDataArr,
      });
    }
  };

  const onShowEdit = () => {
    setExpanded(true);
    setShowEdit(true);
    dispatch(setSaveEnabled(false));
    setCurrentEditCard(item.link_id);
    setSectionDataBak([...sectionDataArr]);
    dispatchSectionData();
  };

  const onEditClick = () => {
    if (currentEditCard && currentEditCard !== item.link_id) {
      setShowConfirm(true);
    } else {
      onShowEdit();
    }
  };

  useEffect(() => {
    if (currentActiveCard === item.link_id && expanded && !tocActive[index]) {
      setExpanded(false);
    }
    if (currentActiveCard === item.link_id && !expanded && tocActive[index]) {
      setExpanded(true);
    }
    if (
      currentActiveCard === item.link_id &&
      !expanded &&
      tocActive[index] &&
      NewSectionIndex >= 0
    ) {
      onEditClick();
      dispatch({
        type: 'ADD_SECTION_INDEX',
        payload: {
          index: -1,
        },
      });
      setExpanded(true);
    }
    if (!tocActive[index]) {
      setExpanded(false);
    }
    // eslint-disable-next-line
  }, [tocActive]);

  const handleEnrichedClick = (e, obj) => {
    if (e.target.className === 'enriched-txt') {
      setEnrichedTarget(e.target);
      setSelectedEnrichedText(e.target.innerText);
      setClinicalTerms(obj);
      const modalOpened = document.createElement('div');
      modalOpened.classList.add('modal-opened');
      document.body.appendChild(modalOpened);
      modalOpened.addEventListener('click', () => {
        setEnrichedTarget(null);
        document.body.removeChild(modalOpened);
      });
    } else {
      setEnrichedTarget(null);
      setSelectedEnrichedText(null);
      setClinicalTerms(null);
    }
  };

  const checkUnsavedTable = () => {
    if (sectionContent && Array.isArray(sectionContent)) {
      const arr = sectionContent.filter(
        (obj) => obj.type === CONTENT_TYPE.TABLE && !obj.isSaved,
      );
      return arr.length > 0;
    }
    return true;
  };

  const handleSaveContent = () => {
    if (checkUnsavedTable()) {
      setShowAlert(true);
      return;
    }
    const reqBody = getSaveSectionPayload(sectionContent, item.link_id);
    if (!reqBody.length) {
      toast.error('Please do some changes to update');
    } else {
      dispatch(setSaveEnabled(false));
      setShowLoader(true);
      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: { reqBody },
      });
    }
  };

  useEffect(() => {
    if (expanded) {
      const { sectionResponse, data } = sectionHeaderDetails;

      if (sectionResponse) {
        if (sectionResponse?.success && showedit) {
          setShowEdit(false);
          fetchContent();
        }
      }

      const sectionObj = data?.find((obj) => obj.linkId === item.link_id);
      if (sectionObj?.data?.length) {
        setShowLoader(false);
        let updatedSectionsData = [];
        let matchedIndex = null;
        const sectionsData = sectionObj.data;

        if (Array.isArray(sectionsData)) {
          updatedSectionsData = sectionsData
            ?.map((sec, index) => {
              if (sec?.font_info?.VertAlign === 'superscript') {
                matchedIndex = index;
                return {
                  ...sec,
                  content: `${sec?.content}_${
                    sectionsData[index + 1]?.content
                  }`,
                };
              }
              return sec;
            })
            .filter((x) => x.qc_change_type !== QC_CHANGE_TYPE.DELETED);

          if (matchedIndex) {
            updatedSectionsData.splice(matchedIndex + 1, 1);
          }
        }

        if (showedit && !sectionDataArr?.length) dispatchSectionData(true);

        setSectionDataArr(updatedSectionsData);
      }

      if (!sectionContent) dispatchSectionData();
    }
    // eslint-disable-next-line
  }, [sectionHeaderDetails]);

  useEffect(() => {
    if (updated && item.link_id === selectedSection.link_id) {
      setShowLoader(true);
      dispatchSectionEvent('ON_SECTION_SELECT', {
        selectedSection: item,
        sectionContent: sectionDataArr,
      });
      dispatch(resetUpdateStatus());
      setCurrentEditCard(null);
      setSaveSection(null);
    }
    // eslint-disable-next-line
  }, [updated]);

  const getEnrichedText = (content, clinicalTerms, preferredTerms) => {
    let newContent = content;
    if (value) {
      if (!isEmpty(preferredTerms)) {
        newContent = createFullMarkup(
          createPreferredText(content, preferredTerms),
        );
      }
    }
    if (
      !isEmpty(clinicalTerms) &&
      rightBladeValue === PROTOCOL_RIGHT_MENU.CLINICAL_TERM
    ) {
      newContent = createFullMarkup(createEnrichedText(content, clinicalTerms));
    }
    return newContent;
  };

  useEffect(() => {
    setEnrichedTarget(null);
    setSelectedEnrichedText(null);
    setClinicalTerms(null);
  }, [rightBladeValue]);

  const [isShown, setIsShown] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [hoverItem, setHoverItem] = useState();
  const [hoverIndex, setHoverIndex] = useState();

  const handleAddSection = (e, item, index) => {
    e.stopPropagation();
    setIsModal(true);
    setHoverItem(headerList[index + 1]);
    setHoverIndex(index);
  };

  const onDiscardClick = () => {
    setSectionDataArr([...sectionDataBak]);
    setShowDiscardConfirm(false);
    setShowEdit(false);
    setSectionDataBak([]);
    setCurrentEditCard(null);
    dispatch(setSaveEnabled(false));
    dispatch(
      updateSectionData({
        data: sectionDataBak,
        actionType: 'REPLACE_CONTENT',
        linkId: item.link_id,
      }),
    );
  };

  const clickAuditLog = (e) => {
    e.stopPropagation();
    setOpenAudit(e.currentTarget);
  };

  useEffect(() => {
    if (saveSection === item.link_id) {
      handleSaveContent();
    }
    // eslint-disable-next-line
  }, [saveSection]);

  const handleDeleteSection = () => {
    setShowDeleteConfirm(false);
    const obj = [
      {
        ...headerLevel1,
        link_id: deleteSection?.link_id,
        qc_change_type: 'delete',
      },
    ];
    dispatch({
      type: 'UPDATE_SECTION_DATA',
      payload: {
        docId: deleteSection.doc_id,
        index: -1,
        refreshToc: true,
        reqBody: obj,
      },
    });
  };

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={primaryRole && 'accordian-plusIcon-line'}
      data-testid="mouse-over"
    >
      <Accordion
        expanded={expanded}
        data-testid="accordion"
        onScroll={(e) => handleEnrichedClick(e)}
      >
        <AccordionSummary
          data-testid="accordion_summary"
          onClick={handleChange}
        >
          <div className="accordion_summary_container">
            <Typography
              className="section-title"
              data-testid="accordion-header"
            >
              {value && !isEmpty(item.preferred_term) ? (
                <b className="preferred-text">{item.preferred_term}</b>
              ) : (
                item.source_file_section
              )}
            </Typography>
            {/* eslint-disable-next-line */}
            <div
              className="section-actions"
              onClick={(e) => e.stopPropagation()}
            >
              {showedit && (
                <>
                  <IconButton disabled={showLoader} data-testId="lockIcon">
                    <Lock />
                  </IconButton>
                  <span
                    onClick={() => {
                      setShowDeleteConfirm(true);
                      setDeleteSection(item);
                    }}
                    data-testId="trashIcon"
                    role="presentation"
                    className="trash-icon"
                  >
                    <IconButton disabled={showLoader}>
                      <Trash />
                    </IconButton>
                  </span>
                </>
              )}
              {primaryRole && (
                <>
                  <IconButton data-testId="eyeIcon" onClick={clickAuditLog}>
                    <EyeShow />
                  </IconButton>
                  {!showedit ? (
                    <IconButton
                      disabled={showLoader}
                      data-testId="pencilIcon"
                      onClick={onEditClick}
                    >
                      <Pencil />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        onClick={handleSaveContent}
                        data-testId="saveIcon"
                        disabled={!saveEnabled || showAlert || showLoader}
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        data-testId="discardIcon"
                        title="Discard changes"
                        className="discard-icon"
                        disabled={!saveEnabled}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDiscardConfirm(true);
                        }}
                      >
                        <Undo />
                      </IconButton>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails
          onScroll={(e) => handleEnrichedClick(e)}
          className="section-single-content"
          onKeyDown={() => {
            if (!saveEnabled) {
              dispatch(setSaveEnabled(true));
            }
          }}
          data-testid="accordion-details"
        >
          {showLoader ? (
            <div className="loader accordion_details_loader">
              <Loader />
            </div>
          ) : (
            sectionDataArr?.length > 0 &&
            (showedit ? (
              <MultilineEdit
                linkId={item.link_id}
                sectionDataArr={sectionDataArr}
                edit={showedit}
              />
            ) : (
              <div className="readable-content">
                {sectionDataArr?.map((section) => {
                  if (section.type === CONTENT_TYPE.TABLE) {
                    return (
                      <DisplayTable
                        key={React.key}
                        data={
                          section?.content
                            ? JSON.parse(section?.content?.TableProperties)
                            : []
                        }
                        footNoteData={
                          section?.content?.AttachmentListProperties
                        }
                        colWidth={100}
                      />
                    );
                  }
                  if (section.type === CONTENT_TYPE.IMAGE) {
                    return (
                      <ImageUploader
                        key={React.key}
                        lineID={section.line_id}
                        content={section.content}
                        edit={false}
                      />
                    );
                  }
                  return section?.font_info?.VertAlign === 'superscript' &&
                    section?.content?.length > 0 ? (
                    // eslint-disable-next-line
                    <div
                      key={React.key}
                      className="supContent"
                      onClick={(e) =>
                        handleEnrichedClick(e, section.clinical_terms)
                      }
                    >
                      <sup>
                        <SanitizeHTML
                          html={getEnrichedText(
                            section.content.split('_')[0],
                            section?.clinical_terms,
                            section?.preferred_terms,
                          )}
                        />
                      </sup>
                      <p
                        style={{
                          fontWeight: `${
                            section?.font_info?.isBold ||
                            section.type === 'header'
                              ? 'bold'
                              : ''
                          }`,
                          fontStyle: `${
                            section?.font_info?.Italics ? 'italics' : ''
                          }`,
                        }}
                      >
                        <SanitizeHTML
                          html={getEnrichedText(
                            section.content.split('_')[1],
                            section?.clinical_terms,
                            section?.preferred_terms,
                          )}
                        />
                      </p>
                    </div>
                  ) : (
                    section.content.length > 0 && (
                      // eslint-disable-next-line
                      <p
                        key={React.key}
                        style={{
                          fontWeight: `${
                            section?.font_info?.isBold ||
                            section.type === 'header'
                              ? 'bold'
                              : ''
                          }`,
                          fontStyle: `${
                            section?.font_info?.Italics ? 'italics' : ''
                          }`,
                        }}
                        onClick={(e) =>
                          handleEnrichedClick(e, section.clinical_terms)
                        }
                      >
                        <SanitizeHTML
                          html={getEnrichedText(
                            section.content,
                            section.clinical_terms,
                            section?.preferred_terms,
                          )}
                        />
                      </p>
                    )
                  );
                })}
              </div>
            ))
          )}
        </AccordionDetails>
        <MedicalTerm
          enrichedTarget={enrichedTarget}
          expanded={expanded}
          enrichedText={selectedEnrichedText}
          clinicalTerms={clinicalTerms}
          linkId={linkId}
          docId={docId}
        />
        <Popover
          open={!!openAudit}
          anchorEl={openAudit}
          onClose={() => setOpenAudit(null)}
        >
          <div className="auditPopover">
            <div className="textContainer">
              {AUDIT_LIST.map((names) => {
                return (
                  <Typography variant="body1" key={names?.title}>
                    {names?.title}&nbsp;:&nbsp;
                    {item?.audit_info[names.keyName] || '-----'}
                  </Typography>
                );
              })}
            </div>
            <div className="textContainer">
              {Object.keys(item?.audit_info).map((names) => {
                return (
                  names !== 'total_no_review' && (
                    <Typography variant="body1" key={names}>
                      {item?.audit_info.names}
                    </Typography>
                  )
                );
              })}
            </div>
          </div>
        </Popover>
        <Modal
          data-testid="confirm-modal"
          disableBackdropClick
          open={showConfirm}
          variant="warning"
          onClose={() => setShowConfirm(false)}
          title="Confirm Action"
          buttonProps={[
            {
              label: 'Cancel',
              onClick: () => {
                setShowEdit(false);
                setShowConfirm(false);
              },
            },
            {
              label: 'Save',
              onClick: () => {
                setSaveSection(currentEditCard);
                setShowEdit(false);
                setShowConfirm(false);
              },
            },
            {
              label: 'Continue Editing',
              onClick: () => {
                setShowConfirm(false);
              },
            },
          ]}
          className={classes.modal}
          id="custom"
        >
          There is already another section in edit mode. Please save the section
          before continuing.
        </Modal>
        <Modal
          disableBackdropClick
          open={showDiscardConfirm}
          variant="warning"
          onClose={() => setShowDiscardConfirm(false)}
          title="Confirm Action"
          buttonProps={[
            {
              label: 'Cancel',
              onClick: () => setShowDiscardConfirm(false),
            },
            {
              label: 'Discard',
              onClick: () => onDiscardClick(),
            },
          ]}
          className={classes.modal}
          id="custom"
        >
          Are you sure you want to discard the changes?
        </Modal>
        {showAlert && (
          <div className="confirmation-popup" data-testId="confirmPopup">
            <p>Please save the all the tables before saving the section</p>
            <ButtonGroup
              buttonProps={[
                {
                  label: 'Ok',
                  onClick: () => setShowAlert(false),
                },
              ]}
            />
          </div>
        )}

        <AddSection
          setIsModal={setIsModal}
          hoverItem={hoverItem}
          hoverIndex={hoverIndex}
          setIsShown={setIsShown}
          isModal={isModal}
        />
      </Accordion>
      <div className="plus-icon">
        {isShown && primaryRole && (
          <IconButton
            data-testId="plus-add"
            color="primary"
            onClick={(e) => {
              handleAddSection(e, item, index);
            }}
            size="small"
            destructiveAction
          >
            <Plus />
          </IconButton>
        )}
      </div>
      <DeleteModal
        handleDeleteSection={handleDeleteSection}
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />
    </div>
  );
}

export default DigitizeAccordion;

DigitizeAccordion.propTypes = {
  item: PropTypes.isRequired,
  protocol: PropTypes.isRequired,
  primaryRole: PropTypes.isRequired,
  currentActiveCard: PropTypes.isRequired,
  handlePageRight: PropTypes.isRequired,
  rightBladeValue: PropTypes.isRequired,
  index: PropTypes.isRequired,
  headerList: PropTypes.isRequired,
  setCurrentEditCard: PropTypes.isRequired,
  currentEditCard: PropTypes.isRequired,
  value: PropTypes.isRequired,
};
