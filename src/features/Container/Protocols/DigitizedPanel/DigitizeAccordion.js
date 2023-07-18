import makeStyles from '@material-ui/core/styles/makeStyles';
import Lock from 'apollo-react-icons/Lock';
import Plus from 'apollo-react-icons/Plus';
import Trash from 'apollo-react-icons/Trash';
import Undo from 'apollo-react-icons/Undo';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import IconButton from 'apollo-react/components/IconButton';
import Typography from 'apollo-react/components/Typography';
import { isEmpty } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  createEnrichedText,
  createFullMarkup,
  createPreferredText,
  getSaveSectionPayload,
  removeDomElement,
  createLinkAndReferences,
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
  activeTOC,
  discardDetails,
  resetUpdateStatus,
  sectionDetails,
  sectionLockDetails,
  updateSectionData,
  setActiveTOC,
  enrichedData,
  preferredData,
  linkReference,
  setLinkreference,
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
import { scrollToLinkandReference, tablePopup } from './utils';

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
  docId,
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
  const [selectedEnrichedText, setSelectedEnrichedText] = useState(null);
  const [clinicalTerms, setClinicalTerms] = useState(null);
  const [linkId, setLinkId] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const NewSectionIndex = useSelector(SectionIndex);
  const discardSelector = useSelector(discardDetails);
  const [discardData, setDiscardData] = useState({});
  const userIdSelector = useSelector(userId);
  const activeTree = useSelector(activeTOC);
  const enrichedContent = useSelector(enrichedData);
  const preferredContent = useSelector(preferredData);

  const [sectionDataBak, setSectionDataBak] = useState([]);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSection, setDeleteSection] = useState({});
  const [tocClose, setTocClose] = useState();
  const [tocReady, setTocReady] = useState(false);

  const [showEnrichedContent, setShowEnrichedContent] = useState(false);
  const [showPrefferedTerm, setShowPrefferedTerm] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const { data: sectionData, updated } = sectionHeaderDetails;
  const [tocActive, setTocActive] = useState([]);
  const tocActiveSelector = useSelector(TOCActive);
  const lockDetails = useSelector(sectionLockDetails);
  const [requestedRoute, setRequestedRoute] = useState('');
  const [addSectionIndex, setAddSectionIndex] = useState(-1);
  const [preferredTarget, setPreferredTarget] = useState();
  const [selectedPreferredTerm, setSelectedPreferredTerm] = useState();
  const [preferredTerms, setPreferredTerms] = useState();
  const [isShown, setIsShown] = useState(false);
  const { setActiveLineID } = useProtContext();

  const linkReferenceSelector = useSelector(linkReference);

  useEffect(() => {
    if (!globalPreferredTerm) {
      setPreferredTarget(null);
    }
    setEnrichedTarget(null);
  }, [globalPreferredTerm]);

  useEffect(() => {
    if (tocActiveSelector) {
      setTocActive(tocActiveSelector);
      if (!tocReady)
        setTimeout(() => {
          setTocReady(true);
        });
    }
    // eslint-disable-next-line
  }, [tocActiveSelector]);

  useEffect(() => {
    if (discardSelector) {
      setDiscardData(discardSelector);
    }
  }, [discardSelector]);

  const {
    dispatchSectionEvent,
    sectionContent,
    selectedSection,
    setSaveSection,
    saveSection,
    saveEnabled,
    setSaveEnabled,
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

  const beforeUnLoad = (e) => {
    e.preventDefault();
    updateSectionLock(true);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnLoad);

    return () => {
      window.removeEventListener('beforeunload', beforeUnLoad);
    };
    // eslint-disable-next-line
  }, []);

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

  const handleCloseAccordion = () => {
    setExpanded(false);
    setEnrichedTarget(null);
    setShowAlert(false);
    setShowEdit(false);
    if (item?.link_id === currentEditCard) {
      setCurrentEditCard(null);
    }
    const arr = activeTree.filter((x) => x !== item.link_id);
    dispatch(setActiveTOC(arr));
  };

  const handleChange = (e) => {
    e.stopPropagation();
    if (showedit && saveEnabled) {
      setShowDiscardConfirm(true);
      return;
    }
    if (showedit && lockDetails?.section_lock) {
      dispatchSectionEvent('RESET_UNDO_STACK');
      updateSectionLock(true);
    }
    if (handlePageRight && !expanded) handlePageRight(item.page);
    if (expanded) {
      handleCloseAccordion();
    } else {
      setExpanded(true);
    }
    handleTocsection(true);
    handleLinkId(item.link_id);
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
        fetchContent();
      }
      dispatch(setActiveTOC([...activeTree, item.link_id]));
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
    setSaveEnabled(false);
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
    dispatchSectionEvent('RESET_UNDO_STACK');
  };

  const handleDiscardToc = () => {
    if (showedit && saveEnabled) {
      dispatch(setActiveTOC([...activeTree, item.link_id]));
      setTocClose(true);
      setShowDiscardConfirm(true);
      handleTocsection();
    } else if (showedit && lockDetails?.section_lock) {
      updateSectionLock(true);
    } else if (showedit) {
      updateSectionLock(true);
      handleCloseAccordion();
    } else {
      handleCloseAccordion();
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
    setSaveEnabled(false);
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
    if (tocReady || tocActive.some((x) => x)) {
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
        setExpanded(true);
      }
      if (!tocActive[index]) {
        handleDiscardToc();
      }
    }
    // eslint-disable-next-line
  }, [tocActive]);

  const handleEnrichedClick = (e, obj, type, content) => {
    if (
      e.target.className.includes('enriched-txt') ||
      e.target.className.includes('Preferred-txt')
    ) {
      if (e.target.className.includes('enriched-txt')) {
        setPreferredTarget(null);
        setSelectedPreferredTerm(null);
        setPreferredTerms(null);
        if (type === CONTENT_TYPE.TABLE) {
          tablePopup(e, (event) => {
            setEnrichedTarget(event.target);
          });
        } else {
          setEnrichedTarget(e.target);
        }
        setSelectedEnrichedText(e.target.innerText);
        setClinicalTerms(obj);
      } else if (e.target.className.includes('Preferred-txt')) {
        setEnrichedTarget(null);
        setSelectedEnrichedText(null);
        setClinicalTerms(null);
        setPreferredTarget(e.target);
        setSelectedPreferredTerm(content?.replace(/(<([^>]+)>)/gi, ''));
        setPreferredTerms(preferredContent?.data);
      }
      const modalOpened = document.createElement('span');
      modalOpened.classList.add('modal-opened');
      document.body.appendChild(modalOpened);
      modalOpened.addEventListener('click', () => {
        setEnrichedTarget(null);
        setPreferredTarget(null);
        document.body.removeChild(modalOpened);
        removeDomElement('.table-enriched-place-holder');
      });
    } else {
      setEnrichedTarget(null);
      setSelectedEnrichedText(null);
      setClinicalTerms(null);
      setPreferredTarget(null);
      setSelectedPreferredTerm(null);
      setPreferredTerms(null);
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
    return false;
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
    return false;
  };

  const handleSaveContent = () => {
    if (checkUnsavedTable()) {
      setShowAlert(true);
      setSaveSection(null);
      setAlertMsg('Please save the table before saving the section');
      return;
    }

    if (checkUnsavedImages()) {
      setShowAlert(true);
      setSaveSection(null);
      setAlertMsg('Please save all the images before saving the section');
      return;
    }

    const reqBody = getSaveSectionPayload(sectionContent, item.link_id);
    if (!reqBody.length) {
      setSaveSection(null);
      toast.error('Please do some changes to update');
    } else {
      const checkIfMainHeader = reqBody.filter(
        (req) =>
          req?.type === CONTENT_TYPE.HEADER &&
          req?.qc_change_type === QC_CHANGE_TYPE.UPDATED &&
          req?.link_level === '1',
      );
      updateSectionLock(true);
      setSaveEnabled(false);
      setShowLoader(true);
      setActiveLineID('');
      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: {
          reqBody,
          docId: item?.doc_id,
          headerEdited: checkIfMainHeader.length,
        },
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
      dispatchSectionEvent('RESET_UNDO_STACK');
      setRequestedRoute('');
    }
  };

  const handleLinkReferenceClick = (e, links) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.className.includes('ref-link')) {
      const text = e.target.innerText.trim();
      const linkArr = Object.entries(links);
      if (linkArr.length > 0) {
        const refs = linkArr.map((x) => x[1]);
        refs.forEach((ref) => {
          if (ref.source_text === text) {
            if (item.link_id === ref.dest_main_link_id) {
              scrollToTop(index);
              scrollToLinkandReference(index, ref.destination_link_text);
            } else {
              handleOpenAccordion(ref);
              dispatch(setLinkreference(ref));
            }
          }
        });
      }
      setEnrichedTarget(null);
      setSelectedEnrichedText(null);
      setClinicalTerms(null);
      setPreferredTarget(null);
      setSelectedPreferredTerm(null);
      setPreferredTerms(null);
    }
  };

  const getPreferredTerms = (header) => {
    if (
      (globalPreferredTerm && preferredContent?.data) ||
      (expanded && showPrefferedTerm && preferredContent?.data)
    ) {
      return createPreferredText(
        header?.source_file_section,
        preferredContent?.data,
        false,
      );
    }
    return header.source_file_section;
  };

  useEffect(() => {
    if (expanded || dataExist) {
      setIsShown(false);
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
        setSectionDataArr(updatedSectionsData);
        if (NewSectionIndex >= 0) {
          onEditClick();
          dispatch({
            type: 'ADD_SECTION_INDEX',
            payload: {
              index: -1,
            },
          });
        }
      }
      if (!sectionContent) {
        dispatchSectionData();
      }
    }
    // eslint-disable-next-line
  }, [sectionHeaderDetails, expanded]);

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

  const getEnrichedText = (content, contentType, links) => {
    let newContent = content;

    if (globalPreferredTerm || showPrefferedTerm) {
      if (
        !isEmpty(preferredContent?.data) &&
        contentType === CONTENT_TYPE?.HEADER
      ) {
        newContent = createPreferredText(content, preferredContent?.data);
      }
    }
    if (
      !isEmpty(enrichedContent?.data) &&
      (rightBladeValue === PROTOCOL_RIGHT_MENU.CLINICAL_TERM ||
        showEnrichedContent)
    ) {
      if (
        contentType === CONTENT_TYPE?.HEADER &&
        !(globalPreferredTerm || showPrefferedTerm)
      ) {
        newContent = createPreferredText(content, enrichedContent?.data, true);
      }
      newContent = createEnrichedText(newContent, enrichedContent?.data);
    }
    if (!isEmpty(links) && showLink) {
      const linkArr = Object.entries(links);
      if (linkArr.length > 0) {
        const refs = linkArr.map((x) => x[1]);
        newContent = createLinkAndReferences(
          newContent,
          refs,
          handleLinkReferenceClick,
        );
      }
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

  const [isAddSecModal, setAddSecModal] = useState(false);

  const handleAddSection = (e, flag, index) => {
    e.stopPropagation();

    if (currentEditCard) {
      setShowConfirm(true);
    } else {
      const sectionIndex = flag ? index : index + 1;
      setAddSectionIndex(sectionIndex);
      setAddSecModal(true);
    }
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
    setCurrentEditCard(null);
    const obj = [
      {
        ...headerLevel1,
        is_section_header: true,
        delete_section_header: true,
        link_id: deleteSection?.link_id,
        qc_change_type: 'delete',
      },
    ];
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

  const addNewSection = (flag) => {
    return (
      <IconButton
        data-testId="plus-add"
        color="primary"
        onClick={(e) => {
          handleAddSection(e, flag, index);
        }}
        size="small"
        destructiveAction
      >
        <Plus />
      </IconButton>
    );
  };

  const getMultilineEdit = useMemo(
    () => (
      <MultilineEdit
        linkId={item.link_id}
        edit={showedit}
        setShowDiscardConfirm={setShowDiscardConfirm}
        child={getActionMenu()}
        setRequestedRoute={setRequestedRoute}
        setShowAlert={setShowAlert}
        setAlertMsg={setAlertMsg}
      />
    ),
    // eslint-disable-next-line
    [showedit, sectionDataArr],
  );

  const getAccordionContent = () => {
    if (!expanded && !sectionDataArr.length) return null;
    return showLoader ? (
      <div className="loader accordion_details_loader">
        <Loader />
      </div>
    ) : (
      <>
        {sectionDataArr?.length &&
          (showedit ? (
            getMultilineEdit
          ) : (
            <div className="readable-content-wrapper">
              <div className="readable-content">
                {sectionDataArr?.map((section) => {
                  let content = '';
                  if (section.type === CONTENT_TYPE.TABLE) {
                    content = (
                      <DisplayTable
                        key={React.key}
                        handleEnrichedClick={handleEnrichedClick}
                        data={
                          section?.content
                            ? JSON.parse(section?.content?.TableProperties)
                            : []
                        }
                        footNoteData={
                          section?.content?.AttachmentListProperties
                        }
                        colWidth={100}
                        preferredTerms={section?.preferred_terms}
                        isPreferredTerm={
                          globalPreferredTerm || showPrefferedTerm
                        }
                        clinicalTerms={section?.clinical_terms}
                        isClinicalTerms={
                          showEnrichedContent ||
                          rightBladeValue === PROTOCOL_RIGHT_MENU.CLINICAL_TERM
                        }
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
                          onClick={(e) => {
                            handleEnrichedClick(e, enrichedContent?.data);
                          }}
                        >
                          <sup>
                            <SanitizeHTML
                              html={getEnrichedText(
                                section.content.split('_')[0],
                                section?.type,
                              )}
                            />
                          </sup>
                          <p
                            className="single-segment"
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
                                section?.type,
                              )}
                            />
                          </p>
                        </div>
                      ) : (
                        section.content.length > 0 && (
                          <div key={React.key} className="link-data">
                            <p
                              className="single-segment"
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
                                  section?.font_info?.Italics ? 'italics' : ''
                                }`,
                              }}
                              onClick={(e) => {
                                handleEnrichedClick(
                                  e,
                                  enrichedContent?.data,
                                  null,
                                  section.content,
                                );
                                handleLinkReferenceClick(
                                  e,
                                  section?.link_and_reference,
                                );
                              }}
                            >
                              <span className="sanitize-content-wrapper">
                                <SanitizeHTML
                                  html={getEnrichedText(
                                    section?.content,
                                    section?.type,
                                    section?.link_and_reference,
                                  )}
                                />
                              </span>
                            </p>
                          </div>
                        )
                      );
                  }
                  return (
                    // eslint-disable-next-line
                    <div
                      key={React.key}
                      onMouseUp={(e) => handleSegmentMouseUp(e, section)}
                      className={`content-linkref ${
                        section.inline_element ? 'inline-segment' : ''
                      }`}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        {primaryRole && <div className="menu-wrapper">{getActionMenu()}</div>}
      </>
    );
  };

  useEffect(() => {
    if (
      linkReferenceSelector &&
      expanded &&
      sectionDataArr?.length > 0 &&
      item.link_id === linkReferenceSelector.dest_main_link_id
    ) {
      scrollToTop(index);
      scrollToLinkandReference(
        index,
        linkReferenceSelector.destination_link_text,
      );
      dispatch(setLinkreference(null));
    }

    // eslint-disable-next-line
  }, [linkReferenceSelector, expanded, sectionDataArr]);

  return (
    // eslint-disable-next-line
    <div
      onMouseEnter={() => !expanded && setIsShown(true)}
      onMouseLeave={() => !expanded && setIsShown(false)}
      className={
        primaryRole &&
        // eslint-disable-next-line
        (index === 0 ? 'accordian-plusIcon-line-top ' : '') +
          'accordian-plusIcon-line'
      }
      data-testid="mouse-over"
    >
      {expanded && showedit && (
        <SectionLockTimer
          item={item}
          updateSectionLock={updateSectionLock}
          onDiscardClick={onDiscardClick}
        />
      )}

      <div className="plus-icon">
        {primaryRole && index === 0 && isShown && addNewSection(true)}
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
              <SanitizeHTML html={getPreferredTerms(item)} />
            </Typography>
            {/* eslint-disable-next-line */}
            <div
              className="section-actions"
              onClick={(e) => e.stopPropagation()}
            >
              {showedit && !showLoader && (
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
          className={`section-single-content ${!primaryRole && 'no-padding'}`}
          data-testid="accordion-details"
        >
          {getAccordionContent()}
        </AccordionDetails>

        <MedicalTerm
          enrichedTarget={preferredTarget || enrichedTarget}
          expanded={expanded}
          enrichedText={selectedPreferredTerm || selectedEnrichedText}
          clinicalTerms={preferredTerms || clinicalTerms}
          linkId={linkId}
          docId={docId}
          preferredTerms={preferredContent?.data}
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

        {primaryRole && isAddSecModal && (
          <AddSection
            setIsModal={setAddSecModal}
            headerList={headerList}
            index={addSectionIndex}
            setIsShown={setIsShown}
            isModal={isAddSecModal}
            docId={docId}
          />
        )}
      </Accordion>
      <div className="plus-icon">
        {primaryRole && isShown && addNewSection(false)}
      </div>
      {showDeleteConfirm && (
        <DeleteModal
          handleDeleteSection={handleDeleteSection}
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      )}
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
  docId: PropTypes.isRequired,
};
