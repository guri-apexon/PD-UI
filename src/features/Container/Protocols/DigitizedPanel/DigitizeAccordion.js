import makeStyles from '@material-ui/core/styles/makeStyles';
import Lock from 'apollo-react-icons/Lock';
import Plus from 'apollo-react-icons/Plus';
import moment from 'moment';
import Trash from 'apollo-react-icons/Trash';
import Undo from 'apollo-react-icons/Undo';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import IconButton from 'apollo-react/components/IconButton';
import Typography from 'apollo-react/components/Typography';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  createEnrichedText,
  createFullMarkup,
  createPreferredText,
  getSaveSectionPayload,
} from '../../../../utils/utilFunction';
import Loader from '../../../Components/Loader/Loader';
import SanitizeHTML from '../../../Components/SanitizeHtml';
import { PROTOCOL_RIGHT_MENU } from '../Constant/Constants';
import ImageUploader from '../CustomComponents/ImageUploader';
import DisplayTable from '../CustomComponents/PDTable/Components/Table';
import HeaderConstant from '../CustomComponents/constants';
import MedicalTerm from '../EnrichedContent/MedicalTerm';
import { useProtContext } from '../ProtocolContext';
import {
  SectionIndex,
  TOCActive,
  discardDetails,
  isSaveEnabled,
  resetUpdateStatus,
  sectionDetails,
  sectionLockDetails,
  setSaveEnabled,
  updateSectionData,
  setActiveTOC,
  activeTOC,
} from '../protocolSlice';
import AddSection from './AddSection';
import DeleteModal from './Modals/DeleteModal';
import DiscardModal from './Modals/DiscardModal';
import SaveSectionModal from './Modals/SaveSectionModal';
import MultilineEdit from './MultilineEdit';
import SectionLockTimer from './SectionLockTimer';

import {
  CONFIG_API_VARIABLES,
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
} from '../../../../AppConstant/AppConstant';
import { userId } from '../../../../store/userDetails';
import ActionMenu from './ActionMenu';
import { scrollToLinkandReference } from './utils';

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
  handleLinkId,
  globalPreferredTerm,
  scrollToTop,
  handleOpenAccordion,
  dataExist,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { headerLevel1 } = HeaderConstant;
  const history = useHistory();

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
  const discardSelector = useSelector(discardDetails);
  const [discardData, setDiscardData] = useState({});
  const userIdSelector = useSelector(userId);
  const activeTree = useSelector(activeTOC);

  const [sectionDataBak, setSectionDataBak] = useState([]);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSection, setDeleteSection] = useState({});
  const [tocClose, setTocClose] = useState();

  const [showEnrichedContent, setShowEnrichedContent] = useState(false);
  const [showPrefferedTerm, setShowPrefferedTerm] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const { data: sectionData, updated } = sectionHeaderDetails;
  const [tocActive, setTocActive] = useState([]);
  const tocActiveSelector = useSelector(TOCActive);
  const lockDetails = useSelector(sectionLockDetails);
  const [requestedRoute, setRequestedRoute] = useState('');
  const [beforeAddSectionFlag, setBeforeAddSectionFlag] = useState(false);
  useEffect(() => {
    if (tocActiveSelector) setTocActive(tocActiveSelector);
  }, [tocActiveSelector]);

  useEffect(() => {
    if (discardSelector) {
      setDiscardData(discardSelector);
    }
  }, [discardSelector]);

  useEffect(() => {
    if (item.linkandReference) {
      setExpanded(true);
      scrollToTop(index);
      if (sectionDataArr?.length) {
        scrollToLinkandReference(index, item.linkandReference);
        handleOpenAccordion();
      }
    }
    // eslint-disable-next-line
  }, [item.linkandReference]);

  const {
    dispatchSectionEvent,
    sectionContent,
    selectedSection,
    setSaveSection,
    saveSection,
  } = useProtContext();

  const updateSectionLock = (status) => {
    dispatch({
      type: 'SET_SECTION_LOCK',
      payload: {
        docId: item?.doc_id,
        linkId: item?.link_id,
        sectionLock: status,
        userId: '',
      },
    });
  };

  const handleTocsection = (flag) => {
    const tempTOCActive = [...tocActive];
    tempTOCActive[index] = !flag ? true : !tempTOCActive[index];
    setTocActive(tempTOCActive);
    dispatch({
      type: 'SET_TOC_Active',
      payload: {
        data: tempTOCActive,
      },
    });
  };

  const handleChange = (e) => {
    e.stopPropagation();
    if (showedit && saveEnabled) {
      setShowDiscardConfirm(true);
      return;
    }
    if (showedit && lockDetails?.section_lock) {
      updateSectionLock(true);
    }
    if (handlePageRight) handlePageRight(item.page);
    setExpanded(!expanded);
    handleTocsection(true);
    handleLinkId(item.link_id);
  };

  const fetchContent = () => {
    dispatch({
      type: 'GET_SECTION_LIST',
      payload: {
        linkId: item.link_id,
        docId: item.doc_id,
        protocol,
        configVariable: CONFIG_API_VARIABLES,
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
      dispatch(setActiveTOC([...activeTree, item.link_id]));
    } else {
      setEnrichedTarget(null);
      setShowAlert(false);
      setShowEdit(false);
      setCurrentEditCard(null);
      const arr = activeTree.filter((x) => x !== item.link_id);
      dispatch(setActiveTOC(arr));
    }
    // eslint-disable-next-line
  }, [expanded]);

  const onDiscardClick = () => {
    setSectionDataArr([...sectionDataBak]);
    setShowDiscardConfirm(false);
    setShowEdit(false);
    setSectionDataBak([]);
    setCurrentEditCard(null);
    updateSectionLock(true);
    dispatch(setSaveEnabled(false));
    setAlertMsg(null);
    dispatch(
      updateSectionData({
        data: sectionDataBak,
        actionType: 'REPLACE_CONTENT',
        linkId: item.link_id,
      }),
    );

    if (discardData?.bladeRight?.name) {
      dispatch({
        type: 'GET_RIGHT_BLADE',
        payload: {
          name: discardData?.bladeRight?.name,
        },
      });
    }
    dispatch({
      type: 'DISCARD_DETAILS',
      payload: {
        isEdited: false,
        isDiscarded: false,
        protocolTab: discardSelector?.protocolTab,
        bladeRight: {},
        labEdited: false,
      },
    });

    if (tocClose) {
      handleTocsection(true);
      setTocClose(false);
    }
  };

  const handleDiscardToc = () => {
    if (showedit && saveEnabled) {
      setTocClose(true);
      setShowDiscardConfirm(true);
      handleTocsection();
    } else if (showedit && lockDetails?.section_lock) {
      updateSectionLock(true);
    } else if (showedit) {
      updateSectionLock(true);
      setExpanded(false);
    } else {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (currentActiveCard === item.link_id && !expanded && tocActive[index]) {
      setExpanded(true);
    } else if (currentActiveCard === item.link_id && expanded) {
      handleDiscardToc();
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

  useEffect(() => {
    if (
      (discardData?.isDiscarded &&
        tocActiveSelector[index] &&
        currentEditCard === item.link_id) ||
      (discardData?.bladeRight?.name &&
        discardData?.isEdited &&
        tocActiveSelector[index] &&
        currentEditCard === item.link_id)
    ) {
      setShowDiscardConfirm(true);
    }
    // eslint-disable-next-line
  }, [discardData]);

  const onShowEdit = () => {
    setExpanded(true);
    setShowEdit(true);
    dispatch(setSaveEnabled(false));
    setCurrentEditCard(item.link_id);
    setSectionDataBak([...sectionDataArr]);
    updateSectionLock(false);
    dispatchSectionData();
  };

  const onEditClick = () => {
    if (currentEditCard && currentEditCard !== item.link_id) {
      setShowConfirm(true);
    } else {
      handleTocsection();
      setCurrentEditCard(item.link_id);
      dispatch({
        type: 'GET_SECTION_LOCK',
        payload: {
          doc_id: item?.doc_id,
          link_id: item?.link_id,
        },
      });
      dispatch({
        type: 'DISCARD_DETAILS',
        payload: {
          isEdited: true,
          isDiscarded: false,
          protocolTab: -1,
          bladeRight: {},
          labEdited: false,
        },
      });
    }
  };

  useEffect(() => {
    if (
      Object.keys(lockDetails || {}).length > 0 &&
      tocActiveSelector[index] &&
      currentEditCard === item.link_id
    ) {
      const updatedTime = lockDetails?.last_updated?.split('.')[0];
      if (
        lockDetails?.section_lock ||
        lockDetails?.userId === userIdSelector?.toString() ||
        moment.utc(updatedTime).local()?.diff(moment(), 'hours') > 23
      ) {
        onShowEdit();
      } else {
        setCurrentEditCard(null);
        toast.error(`Section is in use by user ${lockDetails?.user_name}`);
      }
    }
    if (Object.keys(lockDetails || {}).length === 0 && requestedRoute) {
      dispatch({
        type: 'DISCARD_DETAILS',
        payload: {
          isEdited: false,
          isDiscarded: false,
          protocolTab: -1,
          bladeRight: {},
          labEdited: false,
        },
      });
      history.push(requestedRoute);
      setRequestedRoute('');
    }
    // eslint-disable-next-line
  }, [lockDetails, currentEditCard]);

  useEffect(() => {
    if (currentActiveCard === item.link_id && expanded && !tocActive[index]) {
      handleDiscardToc();
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
      handleDiscardToc();
    }
    // eslint-disable-next-line
  }, [tocActive]);

  const handleEnrichedClick = (e, obj) => {
    if (e.target.className === 'enriched-txt') {
      setEnrichedTarget(e.target);
      setSelectedEnrichedText(e.target.innerText);
      setClinicalTerms(obj);
      const modalOpened = document.createElement('span');
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
        (obj) =>
          obj.type === CONTENT_TYPE.TABLE &&
          ((obj.isSaved === false && obj.qc_change_type === '') ||
            ((typeof obj.isSaved === 'undefined' || obj.isSaved === false) &&
              [QC_CHANGE_TYPE.ADDED, QC_CHANGE_TYPE.UPDATED].includes(
                obj.qc_change_type,
              ))),
      );
      return arr.length > 0;
    }
    return true;
  };

  const checkUnsavedImages = () => {
    if (sectionContent && Array.isArray(sectionContent)) {
      const arr = sectionContent.filter(
        (obj) =>
          obj.type === CONTENT_TYPE.IMAGE &&
          ((obj.isSaved === false && obj.qc_change_type === '') ||
            ((typeof obj.isSaved === 'undefined' || obj.isSaved === false) &&
              [QC_CHANGE_TYPE.ADDED, QC_CHANGE_TYPE.UPDATED].includes(
                obj.qc_change_type,
              ))),
      );
      return arr.length > 0;
    }
    return true;
  };

  const handleSaveContent = () => {
    if (checkUnsavedTable()) {
      setShowAlert(true);
      setAlertMsg('Please save the all the tables before saving the section');
      return;
    }

    if (checkUnsavedImages()) {
      setShowAlert(true);
      setAlertMsg('Please save all the images before saving the section');
      return;
    }

    const reqBody = getSaveSectionPayload(sectionContent, item.link_id);
    if (!reqBody.length) {
      setSaveSection(null);
      toast.error('Please do some changes to update');
    } else {
      updateSectionLock(true);
      dispatch(setSaveEnabled(false));
      setShowLoader(true);
      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: { reqBody, docId: item?.doc_id },
      });
      dispatch({
        type: 'DISCARD_DETAILS',
        payload: {
          isEdited: false,
          isDiscarded: false,
          protocolTab: -1,
          bladeRight: {},
          labEdited: false,
        },
      });
      setRequestedRoute('');
    }
  };

  const handleLinkReferenceClick = (e, obj) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.link_id === obj.link_id) {
      scrollToTop(index);
      scrollToLinkandReference(index, obj.destination_link_text);
    } else {
      handleOpenAccordion(obj);
    }
  };

  const getLinkReference = (section) => {
    if (section?.link_and_reference) {
      const linkArr = Object.entries(section?.link_and_reference);

      if (linkArr.length > 0) {
        return (
          <div>
            {linkArr.map((term) => {
              return showLink ? (
                // eslint-disable-next-line
                <a
                  key={React.key}
                  href="#"
                  onClick={(e) => handleLinkReferenceClick(e, term[1])}
                >
                  <b> [{term[1]?.source_text?.toString()}]</b>
                </a>
              ) : (
                <span> [{term[1]?.source_text?.toString()}]</span>
              );
            })}
          </div>
        );
      }
    }
    return '';
  };

  useEffect(() => {
    if (expanded || dataExist) {
      const { sectionResponse, data } = sectionHeaderDetails;

      if (sectionResponse) {
        if (sectionResponse?.success && showedit) {
          setShowEdit(false);
          fetchContent();
          dispatch({
            type: 'GET_PROTOCOL_TOC_DATA',
            payload: {
              docId,
              tocFlag: 1,
            },
          });
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

        setSectionDataArr(updatedSectionsData);
        if (item.linkandReference && updatedSectionsData.length) {
          scrollToLinkandReference(index, item.linkandReference);
          handleOpenAccordion();
        }
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
    if (globalPreferredTerm || showPrefferedTerm) {
      if (!isEmpty(preferredTerms)) {
        newContent = createPreferredText(content, preferredTerms);
      }
    }
    if (
      !isEmpty(clinicalTerms) &&
      (rightBladeValue === PROTOCOL_RIGHT_MENU.CLINICAL_TERM ||
        showEnrichedContent)
    ) {
      newContent = createEnrichedText(content, clinicalTerms);
    }
    newContent = createFullMarkup(newContent);
    return newContent;
  };

  useEffect(() => {
    setEnrichedTarget(null);
    setSelectedEnrichedText(null);
    setClinicalTerms(null);
  }, [rightBladeValue]);

  const getActionMenu = () => {
    return (
      <ActionMenu
        showedit={showedit}
        onEditClick={onEditClick}
        setShowEnrichedContent={setShowEnrichedContent}
        setShowPrefferedTerm={setShowPrefferedTerm}
        showPrefferedTerm={showPrefferedTerm}
        showEnrichedContent={showEnrichedContent}
        showLink={showLink}
        setShowLink={setShowLink}
        handleSaveContent={handleSaveContent}
        disabledSaveIcon={!saveEnabled || showAlert || showLoader}
        disabledPencilIcon={showLoader}
        item={item}
      />
    );
  };

  const [isShown, setIsShown] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleAddSection = (e, flag) => {
    e.stopPropagation();
    setBeforeAddSectionFlag(flag);
    setIsModal(true);
  };
  const handleSegmentMouseUp = (e, section) => {
    dispatch({
      type: 'SET_ENRICHED_WORD',
      payload: { word: section, modal: true },
    });
  };

  useEffect(() => {
    if (saveSection === item.link_id) {
      handleSaveContent();
    }
    // eslint-disable-next-line
  }, [saveSection]);

  const handleDeleteSection = () => {
    setShowDeleteConfirm(false);
    updateSectionLock(true);
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

  const renderAddSection = (flag) => {
    return (
      <IconButton
        data-testId="plus-add"
        color="primary"
        onClick={(e) => {
          handleAddSection(e, flag);
        }}
        size="small"
        destructiveAction
      >
        <Plus />
      </IconButton>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={
        // eslint-disable-next-line
        primaryRole && index === 0
          ? 'accordian-plusIcon-line-top accordian-plusIcon-line'
          : primaryRole
          ? 'accordian-plusIcon-line'
          : ''
      }
      data-testid="mouse-over"
    >
      {showedit && (
        <SectionLockTimer
          item={item}
          updateSectionLock={updateSectionLock}
          onDiscardClick={onDiscardClick}
        />
      )}

      <div className="plus-icon">
        {isShown && primaryRole && index === 0 && renderAddSection(true)}
      </div>

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
              {globalPreferredTerm && !isEmpty(item.preferred_term) ? (
                <b className="preferred-text">
                  {item.preferred_term
                    .replace(/[_]/g, ' ')
                    .replace('cpt', '')
                    .trim()}
                </b>
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
                    role="presentation"
                    className="trash-icon"
                  >
                    <IconButton disabled={showLoader} data-testId="trashIcon">
                      <Trash />
                    </IconButton>
                  </span>
                  <IconButton
                    data-testId="discardIcon"
                    title="Discard changes"
                    className="discard-icon"
                    disabled={!saveEnabled || !primaryRole}
                    onClick={() => {
                      setShowDiscardConfirm(true);
                    }}
                  >
                    <Undo />
                  </IconButton>
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
            <>
              {sectionDataArr?.length > 0 &&
                (showedit ? (
                  <MultilineEdit
                    linkId={item.link_id}
                    sectionDataArr={sectionDataArr}
                    edit={showedit}
                    setShowDiscardConfirm={setShowDiscardConfirm}
                    child={getActionMenu()}
                    setRequestedRoute={setRequestedRoute}
                  />
                ) : (
                  <div className="readable-content-wrapper">
                    <div className="readable-content">
                      {sectionDataArr?.map((section) => {
                        let content = '';
                        if (section.type === CONTENT_TYPE.TABLE) {
                          content = (
                            <DisplayTable
                              key={React.key}
                              data={
                                section?.content
                                  ? JSON.parse(
                                      section?.content?.TableProperties,
                                    )
                                  : []
                              }
                              footNoteData={
                                section?.content?.AttachmentListProperties
                              }
                              colWidth={100}
                            />
                          );
                        } else if (section.type === CONTENT_TYPE.IMAGE) {
                          content = (
                            <ImageUploader
                              key={React.key}
                              lineID={section.line_id}
                              content={section.content}
                              edit={false}
                            />
                          );
                        } else {
                          content =
                            section?.font_info?.VertAlign === 'superscript' &&
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
                                      section?.font_info?.Italics
                                        ? 'italics'
                                        : ''
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
                                {getLinkReference(section)}
                              </div>
                            ) : (
                              section.content.length > 0 && (
                                <div key={React.key} className="link-data">
                                  <p
                                    role="presentation"
                                    key={React.key}
                                    style={{
                                      fontWeight: `${
                                        section?.font_info?.isBold ||
                                        section.type === 'header'
                                          ? 'bold'
                                          : ''
                                      }`,
                                      fontStyle: `${
                                        section?.font_info?.Italics
                                          ? 'italics'
                                          : ''
                                      }`,
                                    }}
                                    onClick={(e) =>
                                      handleEnrichedClick(
                                        e,
                                        section.clinical_terms,
                                      )
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
                                  {getLinkReference(section)}
                                </div>
                              )
                            );
                        }
                        return (
                          // eslint-disable-next-line
                          <div
                            key={React.key}
                            onMouseUp={(e) => handleSegmentMouseUp(e, section)}
                          >
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              <div className="menu-wrapper">
                {primaryRole && getActionMenu()}
              </div>
            </>
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

        <SaveSectionModal
          classes={classes}
          currentEditCard={currentEditCard}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          setShowEdit={setShowEdit}
          setSaveSection={setSaveSection}
        />

        <DiscardModal
          classes={classes}
          showDiscardConfirm={showDiscardConfirm}
          setShowDiscardConfirm={setShowDiscardConfirm}
          onDiscardClick={onDiscardClick}
          setRequestedRoute={setRequestedRoute}
        />

        {showAlert && (
          <div className="confirmation-popup" data-testId="confirmPopup">
            <p>{alertMsg}</p>
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
          headerList={headerList}
          index={index}
          setIsShown={setIsShown}
          isModal={isModal}
          beforeAddSectionFlag={beforeAddSectionFlag}
        />
      </Accordion>
      <div className="plus-icon">
        {isShown && primaryRole && renderAddSection(false)}
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
  handleLinkId: PropTypes.isRequired,
  globalPreferredTerm: PropTypes.isRequired,
  handleOpenAccordion: PropTypes.isRequired,
  scrollToTop: PropTypes.isRequired,
  dataExist: PropTypes.isRequired,
};
