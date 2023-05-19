import { useState, createRef, useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  viewResult,
  protocolTocData,
  updateSectionData,
} from './protocolSlice';
import ProtocolViewWrapper from './ProtocolViewWrapper';
import { ProtocolContext } from './ProtocolContext';
import { prepareContent } from '../../../utils/utilFunction';

function ProtocolView({ refs, data }) {
  const viewData = useSelector(viewResult);
  const summary = useSelector(protocolTocData);
  const dispatch = useDispatch();

  const [selectedSection, setSelectedSection] = useState({});
  const [sectionContent, setSectionContent] = useState([]);
  const [globalPreferredTerm, setGlobalPreferredTerm] = useState(false);
  const [activeLineID, setActiveLineID] = useState('');
  const [undoStack, setUndoStack] = useState([]);

  const [saveEnabled, setSaveEnabled] = useState(false);

  const [saveSection, setSaveSection] = useState(null);
  const workflowSubmitData = useSelector(
    (state) => state.dashboard.workflowSubmit,
  );

  useEffect(() => {
    if (workflowSubmitData.success) {
      toast.success(
        'Workflows execution were submitted successfully for the protocol',
      );
      dispatch({ type: 'RESET_SUBMIT_WORKFLOW_DATA' });
    }
    // eslint-disable-next-line
  }, [workflowSubmitData]);

  const handleSectionSelect = (payload) => {
    if (!payload.sectionContent && sectionContent) {
      dispatch(
        updateSectionData({
          data: sectionContent,
          actionType: 'REPLACE_CONTENT',
          linkId: selectedSection.link_id,
        }),
      );
    }
    setSelectedSection(payload.selectedSection);
    setSectionContent(payload.sectionContent || null);
  };

  useEffect(() => {
    console.log(sectionContent, 'sectionContent');

    console.log('SHUBHAM1', undoStack); // eslint-disable-next-line
  }, [sectionContent]);

  const handleContentUpdate = (payload) => {
    // const undoObjIndex = sectionContent?.findIndex(
    //   (x) => x.line_id === payload.currentLineId,
    // );
    // console.log('undo1', undoObjIndex);

    // const undoObj = {
    //   ...sectionContent[undoObjIndex],
    //   next_line_id: sectionContent[undoObjIndex + 1].line_id,
    //   prev_line_id: sectionContent[undoObjIndex - 1].line_id,
    //   prev_index: undoObjIndex - 1,
    // };
    // undoStack.push(undoObj);
    // setUndoStack(undoStack);
    const undoObj = {
      lineId: payload.currentLineId,
      type: 'Modify',
      content: payload?.content,
      contentType: '',
    };
    undoStack.push(undoObj);
    setUndoStack(undoStack);
    setSectionContent((prevState) => {
      return prepareContent({
        ...payload,
        type: 'MODIFY',
        sectionContent: prevState,
      });
    });

    if (payload.isSaved && !saveEnabled) setSaveEnabled(true);
  };

  const handleContentDelete = (payload) => {
    const index = sectionContent.findIndex((x) => x.line_id === activeLineID);
    let newActiveLineId = sectionContent[0].line_id;
    if (index > 0) {
      newActiveLineId = sectionContent[index - 1].line_id;
    }
    const undoObj = {
      lineId: payload.currentLineId,
      type: 'Delete',
      content: '',
      contentType: '',
    };
    undoStack.push(undoObj);
    setUndoStack(undoStack);
    setActiveLineID(newActiveLineId);
    const content = prepareContent({
      ...payload,
      type: 'DELETE',
      sectionContent,
    });

    if (!saveEnabled) setSaveEnabled(true);
    setSectionContent(content);
    dispatch(
      updateSectionData({
        data: content,
        actionType: 'REPLACE_CONTENT',
        linkId: selectedSection.link_id,
      }),
    );
  };

  const handleContentAdd = (payload) => {
    const { type, lineId, section } = payload;
    if (!saveEnabled) setSaveEnabled(true);
    const content = prepareContent({
      ...payload,
      type: 'ADDED',
      contentType: type,
      sectionContent,
      currentLineId: lineId,
    });

    const newIndex = content.findIndex((x) => x.line_id === lineId);
    // const newObj =
    const undoObj = {
      lineId: content[newIndex + 1].line_id,
      type: 'Add',
      content: content[newIndex + 1].content,
      contentType: type,
    };
    undoStack.push(undoObj);
    setUndoStack(undoStack);
    setSectionContent(content);

    let linkID;
    if (section) {
      linkID = section.link_id;
    } else {
      linkID = selectedSection.link_id;
    }
    dispatch(
      updateSectionData({
        data: content,
        actionType: 'REPLACE_CONTENT',
        linkId: linkID,
      }),
    );
  };

  const handleLinkLevelUpdate = (payload) => {
    const content = prepareContent({
      ...payload,
      type: 'LINK_LEVEL_UPDATE',
      sectionContent,
    });
    const undoarr = undoStack;
    undoarr.push(content);
    setUndoStack(undoarr);
    setSectionContent(content);
  };

  const handleContentUndo = () => {
    if (undoStack.length > 0) {
      console.log('SHUBHAM123456', undoStack);
      const lastobj = undoStack.pop();
      // // if (lastobj.qc_change_type) {
      // console.log('SHUBHAM789', lastobj); //
      // // const undoObj = sectionContent.map((x) => {
      // //   if (x.line_id === lastobj?.currentLineId) return lastobj;
      // //   return x;
      // // });
      // // console.log('SHUBHAM78', undoObj);
      dispatch(
        updateSectionData({
          data: lastobj,
          actionType: 'UNDO',
          linkId: selectedSection.link_id,
          undo: true,
        }),
      );
      // }
    }
  };

  // eslint-disable-next-line
  const dispatchSectionEvent = useCallback(
    (actionType, payload) => {
      switch (actionType) {
        case 'ON_SECTION_SELECT':
          handleSectionSelect(payload);
          break;
        case 'CONTENT_UPDATE':
          handleContentUpdate(payload);
          break;
        case 'CONTENT_DELETED':
          handleContentDelete(payload);
          break;
        case 'CONTENT_ADDED':
          handleContentAdd(payload);
          break;
        case 'LINK_LEVEL_UPDATE':
          handleLinkLevelUpdate(payload);
          break;
        case 'CONTENT_UNDO':
          handleContentUndo();
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line
    [sectionContent],
  );

  const ProtocolProviderValue = useMemo(
    () => ({
      selectedSection,
      sectionContent,
      saveSection,
      activeLineID,
      saveEnabled,
      dispatchSectionEvent,
      setSectionContent,
      setSaveSection,
      setActiveLineID,
      setSaveEnabled,
    }),
    [
      selectedSection,
      sectionContent,
      saveSection,
      activeLineID,
      saveEnabled,
      dispatchSectionEvent,
      setSectionContent,
      setSaveSection,
      setActiveLineID,
      setSaveEnabled,
    ],
  );

  const panels = () => {
    const result = {};
    for (let index = 0; index < 250; index++) {
      result[index] = createRef();
    }
    return result;
  };
  const [sectionRef] = useState(panels);
  const listData = [];

  const subSections = {
    TOC: viewData.tocSections,
    SOA: viewData.soaSections,
  };
  /* istanbul ignore else */
  if (subSections.TOC && subSections.TOC.length) {
    listData.push({
      section: 'Table of Contents',
      id: 'TOC',
      subSections: true,
    });
  }
  /* istanbul ignore else */
  if (subSections.SOA && subSections.SOA.length) {
    listData.push({
      section: 'Schedule of Assessments',
      id: 'SOA',
      subSections: true,
    });
  }
  /* istanbul ignore else */
  if (viewData.iqvdataSummary) {
    listData.push({ section: 'Summary', id: 'SUM', subSections: false });
  }

  return (
    <ProtocolContext.Provider value={ProtocolProviderValue}>
      <div className="protocol_data_container" data-testid="protocol-container">
        {viewData && (
          <ProtocolViewWrapper
            view={viewData}
            data1={subSections}
            listData={listData}
            refx={refs}
            sectionRef={sectionRef}
            data={data}
            summaryData={summary}
            globalPreferredTerm={globalPreferredTerm}
            setGlobalPreferredTerm={setGlobalPreferredTerm}
          />
        )}
      </div>
    </ProtocolContext.Provider>
  );
}

export default ProtocolView;
ProtocolView.propTypes = {
  refs: PropTypes.isRequired,
  data: PropTypes.isRequired,
};
