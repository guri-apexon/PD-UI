import React, { useState, useEffect } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import Lock from 'apollo-react-icons/Lock';
import Undo from 'apollo-react-icons/Undo';
import IconButton from 'apollo-react/components/IconButton';
import EyeShow from 'apollo-react-icons/EyeShow';
import Modal from 'apollo-react/components/Modal';
import Popover from 'apollo-react/components/Popover';
import Save from 'apollo-react-icons/Save';
import { toast } from 'react-toastify';
import MultilineEdit from './DigitizedEdit';
import Loader from '../../../Components/Loader/Loader';
import {
  createFullMarkup,
  createEnrichedText,
} from '../../../../utils/utilFunction';
import { sectionDetails, TOCActive } from '../protocolSlice';
import MedicalTerm from '../EnrichedContent/MedicalTerm';
import SanitizeHTML from '../../../Components/SanitizeHtml';
import { AUDIT_LIST, PROTOCOL_RIGHT_MENU } from '../Constant/Constants';
import { useProtContext } from '../ProtocolContext';
import DisplayTable from '../CustomComponents/PDTable/Components/Table';
import ImageUploader from '../CustomComponents/ImageUploader';
import { CONTENT_TYPE } from '../../../../AppConstant/AppConstant';

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
  currentEditCard,
  setCurrentEditCard,
  index,
  scrollToTop,
  currentEditIndex,
  setCurrentEditIndex,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [showedit, setShowEdit] = useState(false);
  const [sectionDataArr, setSectionDataArr] = useState([]);
  const [enrichedTarget, setEnrichedTarget] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [editedMode, setEditedMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openAudit, setOpenAudit] = useState(null);
  const sectionHeaderDetails = useSelector(sectionDetails);
  const [selectedEnrichedText, setSelectedEnrichedText] = useState(null);
  const [clinicalTerms, setClinicalTerms] = useState(null);
  const [linkId, setLinkId] = useState();
  const [docId, setDocId] = useState();
  const [sectionDataBak, setSectionDataBak] = useState([]);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const { data: sectionData } = sectionHeaderDetails;
  const [tocActive, setTocActive] = useState([]);

  const tocActiveSelector = useSelector(TOCActive);
  useEffect(() => {
    if (tocActiveSelector) setTocActive(tocActiveSelector);
  }, [tocActiveSelector]);

  const { dispatchSectionEvent } = useProtContext();

  const handleChange = () => {
    handlePageRight(item.page);
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

  const onSaveClick = (e) => {
    e.stopPropagation();
    setShowEdit(false);
    setCurrentEditCard(null);
    setCurrentEditIndex(null);
    setSaveEnabled(false);
  };

  useEffect(() => {
    if (expanded) {
      const arr = sectionData.filter((obj) => obj.linkId === item.link_id);
      if (arr.length === 0) {
        setShowLoader(true);
        setLinkId(item.link_id);
        setDocId(item.doc_id);
        dispatch({
          type: 'GET_SECTION_LIST',
          payload: {
            linkId: item.link_id,
            docId: item.doc_id,
            protocol,
          },
        });
      }
    } else {
      setEnrichedTarget(null);
    }
    // eslint-disable-next-line
  }, [expanded]);

  useEffect(() => {
    if (currentActiveCard === item.link_id && !expanded && tocActive[index]) {
      setExpanded(true);
    } else if (currentActiveCard === item.link_id && expanded) {
      setExpanded(!expanded);
    }
    // eslint-disable-next-line
  }, [currentActiveCard]);

  useEffect(() => {
    if (currentActiveCard === item.link_id && expanded && !tocActive[index]) {
      setExpanded(false);
    }
    if (currentActiveCard === item.link_id && !expanded && tocActive[index]) {
      setExpanded(true);
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
  useEffect(() => {
    if (currentEditCard !== item.link_id) {
      setShowEdit(false);
    }
    // eslint-disable-next-line
  }, [currentEditCard]);

  const dispatchSectionData = (resetValues) => {
    if (resetValues) {
      dispatchSectionEvent('ON_SECTION_SELECT', {
        selectedSection: null,
        sectionContent: null,
      });
    }
    if (item && sectionDataArr) {
      dispatchSectionEvent('ON_SECTION_SELECT', {
        selectedSection: item,
        sectionContent: sectionDataArr,
      });
    }
  };

  const onShowEdit = () => {
    setExpanded(true);
    setShowEdit(true);
    setCurrentEditCard(item.link_id);
    setCurrentEditIndex(index);
    setEditedMode(true);
    dispatchSectionData();
    setSectionDataBak([...sectionDataArr]);
  };

  const onEditClick = (e) => {
    e.stopPropagation();
    if (currentEditCard && currentEditCard !== item.link_id) {
      setShowConfirm(true);
    } else {
      onShowEdit();
    }
  };

  const refreshContent = () => {
    console.log('refreshContent');
    setEditedMode(false);
    dispatchSectionData(true);
    toast.success('Saved successfully', {
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      toastId: 'toast1',
    });
  };

  useEffect(() => {
    if (sectionData?.length > 0) {
      const arr = sectionData.filter((obj) => obj.linkId === item.link_id);
      if (arr.length > 0) {
        setShowLoader(false);
        let updatedSectionsData = [];
        let matchedIndex = null;
        const sectionsData = arr[0].data;
        if (Array.isArray(sectionsData)) {
          updatedSectionsData = sectionsData?.map((sec, index) => {
            if (sec?.font_info?.VertAlign === 'superscript') {
              matchedIndex = index;
              return {
                ...sec,
                content: `${sec?.content}_${sectionsData[index + 1]?.content}`,
              };
            }
            return sec;
          });
          if (matchedIndex) {
            updatedSectionsData.splice(matchedIndex + 1, 1);
          }
        }
        if (editedMode && !sectionDataArr?.length)
          dispatchSectionData(updatedSectionsData);

        setSectionDataArr(updatedSectionsData);
      }
    }
    // eslint-disable-next-line
  }, [sectionHeaderDetails]);

  const getEnrichedText = (content, clinicalTerms) => {
    if (
      clinicalTerms &&
      rightBladeValue === PROTOCOL_RIGHT_MENU.CLINICAL_TERM
    ) {
      return createFullMarkup(createEnrichedText(content, clinicalTerms));
    }
    return createFullMarkup(content);
  };

  useEffect(() => {
    setEnrichedTarget(null);
    setSelectedEnrichedText(null);
    setClinicalTerms(null);
  }, [rightBladeValue]);

  const onDiscardClick = () => {
    setSectionDataArr([...sectionDataBak]);
    setShowDiscardConfirm(false);
    setShowEdit(false);
    setSaveEnabled(false);
  };

  const clickAuditLog = (e) => {
    e.stopPropagation();
    setOpenAudit(e.currentTarget);
  };

  return (
    <Accordion
      expanded={expanded}
      data-testid="accordion"
      onScroll={(e) => handleEnrichedClick(e)}
    >
      <AccordionSummary onClick={handleChange}>
        <div className="accordion_summary_container">
          <Typography className="section-title" data-testid="accordion-header">
            {item.source_file_section}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {showedit && (
              <IconButton data-testId="lockIcon">
                <Lock style={{ paddingRight: '10px' }} />
              </IconButton>
            )}
            {primaryRole && (
              <>
                {/* eslint-disable-next-line */}
                <IconButton
                  className="eyeIcon"
                  data-testId="eyeIcon"
                  onClick={clickAuditLog}
                >
                  <EyeShow style={{ paddingRight: '10px' }} />
                </IconButton>
                {!showedit ? (
                  // eslint-disable-next-line

                  <IconButton data-testId="pencilIcon" onClick={onEditClick}>
                    <Pencil />
                  </IconButton>
                ) : (
                  <>
                    {/* eslint-disable-next-line */}
                    <IconButton
                      onClick={(e) => {
                        onSaveClick(e);
                        refreshContent(e);
                      }}
                      data-testId="saveIcon"
                      disabled={!saveEnabled}
                    >
                      <Save />
                    </IconButton>

                    {/* eslint-disable-next-line */}

                    <IconButton
                      data-testId="discardIcon"
                      title="Discard changes"
                      className="discard-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (saveEnabled) {
                          setShowDiscardConfirm(true);
                        } else {
                          setShowEdit(false);
                        }
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
        onKeyPress={(e) => {
          if (!saveEnabled) {
            setSaveEnabled(true);
          }
        }}
        className="section-single-content"
      >
        {showLoader && (
          <div className="loader accordion_details_loader">
            <Loader />
          </div>
        )}
        {sectionDataArr?.length > 0 &&
          (showedit ? (
            <MultilineEdit
              linkId={item.link_id}
              sectionDataArr={sectionDataArr}
              edit={showedit}
              setSaveEnabled={setSaveEnabled}
            />
          ) : (
            <div className="readable-content">
              {sectionDataArr.map((section) => {
                if (section.type === CONTENT_TYPE.TABLE) {
                  return (
                    <DisplayTable
                      key={React.key}
                      data={JSON.parse(section.content.TableProperties)}
                      footNoteData={section?.content?.AttachmentListProperties}
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
                      setSaveEnabled={setSaveEnabled}
                    />
                  );
                }
                return section?.font_info?.VertAlign === 'superscript' &&
                  section.content.length > 0 ? (
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
                        )}
                      />
                    </p>
                  )
                );
              })}
            </div>
          ))}
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
                <Typography variant="body1" key={names}>
                  {names}
                </Typography>
              );
            })}
          </div>
          <div className="textContainer">
            {AUDIT_LIST.map((names) => {
              return (
                <Typography variant="body1" key={names}>
                  :
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
        disableBackdropClick
        open={showConfirm}
        variant="warning"
        onClose={() => setShowConfirm(false)}
        title="Confirm Action"
        buttonProps={[
          {
            label: 'Cancel',
            onClick: () => {
              scrollToTop(currentEditIndex);
              setShowConfirm(false);
            },
          },
          {
            label: 'Save',
            onClick: (e) => {
              onSaveClick(e);
              setShowConfirm(false);
            },
          },
          {
            label: 'Continue Editing',
            onClick: () => {
              setShowConfirm(false);
              scrollToTop(currentEditIndex);
            },
          },
        ]}
        className={classes.modal}
        id="custom"
      >
        The section is already in edit mode. Please confirm your action
      </Modal>
      <Modal
        disableBackdropClick
        open={showDiscardConfirm}
        variant="warning"
        onClose={() => setShowDiscardConfirm(false)}
        title="Confirm Actiom"
        buttonProps={[
          {
            label: 'Cancel',
            onClick: () => setShowDiscardConfirm(false),
          },
          {
            label: 'Discard',
            onClick: onDiscardClick,
          },
        ]}
        className={classes.modal}
        id="custom"
      >
        Are you sure you want to discard the changes?
      </Modal>
    </Accordion>
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
  currentEditCard: PropTypes.isRequired,
  setCurrentEditCard: PropTypes.isRequired,
  index: PropTypes.isRequired,
  scrollToTop: PropTypes.isRequired,
  currentEditIndex: PropTypes.isRequired,
  setCurrentEditIndex: PropTypes.isRequired,
};
