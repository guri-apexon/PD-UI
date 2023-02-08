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
import EyeShow from 'apollo-react-icons/EyeShow';
import Modal from 'apollo-react/components/Modal';
import Save from 'apollo-react-icons/Save';
import MultilineEdit from './DigitizedEdit';
import Loader from '../../../Components/Loader/Loader';
import {
  createFullMarkup,
  createEnrichedText,
} from '../../../../utils/utilFunction';
import { TOCActive } from '../protocolSlice';
import MedicalTerm from '../EnrichedContent/MedicalTerm';
import SanitizeHTML from '../../../Components/SanitizeHtml';
import { PROTOCOL_RIGHT_MENU } from '../Constant/Constants';
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
  const [selectedEnrichedText, setSelectedEnrichedText] = useState(null);
  const [clinicalTerms, setClinicalTerms] = useState(null);
  const [linkId, setLinkId] = useState();
  const [docId, setDocId] = useState();

  const [tocActive, setTocActive] = useState([]);

  const [sectionData, setSectiondata] = useState(item.SectionData || []);

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
  };

  useEffect(() => {
    if (expanded) {
      const arr = sectionData?.filter((obj) => obj.linkId === item.link_id);
      if (arr.length === 0 && !item?.SectionData) {
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
    setEditedMode(true);
    dispatchSectionData();
  };

  const onEditClick = (e) => {
    e.stopPropagation();
    if (currentEditCard) {
      setShowConfirm(true);
    } else {
      onShowEdit();
    }
  };

  const refreshContent = () => {
    setEditedMode(false);
    dispatchSectionData(true);
  };

  const handleSupeScript = () => {
    if (sectionData.length > 0) {
      setShowLoader(false);
      let updatedSectionsData = [];
      let matchedIndex = null;
      const sectionsData = sectionData;

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
  };
  useEffect(() => {
    if (item?.SectionData) {
      setSectiondata(item?.SectionData);
    }
    // eslint-disable-next-line
  }, [item]);
  useEffect(() => {
    handleSupeScript();
    // eslint-disable-next-line
  }, [sectionData]);
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
              <span data-testId="lockIcon">
                <Lock style={{ paddingRight: '10px' }} />
              </span>
            )}
            {primaryRole && (
              <>
                <span data-testId="eyeIcon">
                  <EyeShow style={{ paddingRight: '10px' }} />
                </span>
                {!showedit ? (
                  // eslint-disable-next-line
                  <span data-testId="pencilIcon" onClick={onEditClick}>
                    <Pencil />
                  </span>
                ) : (
                  // eslint-disable-next-line
                  <span data-testId="saveIcon" onClick={onSaveClick}>
                    <Save onClick={() => refreshContent()} />
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails
        onScroll={(e) => handleEnrichedClick(e)}
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
            />
          ) : (
            <div className="readable-content">
              {sectionDataArr.map((section) => {
                if (section.type === CONTENT_TYPE.TABLE) {
                  return (
                    <DisplayTable
                      key={React.key}
                      data={JSON.parse(section.content.TableProperties)}
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
      <Modal
        disableBackdropClick
        open={showConfirm}
        variant="warning"
        onClose={() => setShowConfirm(false)}
        title="Confirm Actiom"
        buttonProps={[
          {
            label: 'Cancel',
            onClick: () => {
              setShowEdit(false);
              setShowConfirm(false);
            },
          },
          {
            label: 'Ok',
            onClick: () => {
              setCurrentEditCard(item.link_id);
              onShowEdit();
              setShowConfirm(false);
            },
          },
        ]}
        className={classes.modal}
        id="custom"
      >
        There is already another section in edit mode. Do you want to continue
        with editing the current section
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
};
