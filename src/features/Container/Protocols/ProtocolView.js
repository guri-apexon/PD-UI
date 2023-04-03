import { useState, createRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  viewResult,
  headerResult,
  updateSectionData,
  setSaveEnabled,
} from './protocolSlice';
import ProtocolViewWrapper from './ProtocolViewWrapper';
import { ProtocolContext } from './ProtocolContext';
import { prepareContent } from '../../../utils/utilFunction';

function ProtocolView({ refs, data }) {
  const viewData = useSelector(viewResult);
  const summary = useSelector(headerResult);
  const dispatch = useDispatch();

  const [selectedSection, setSelectedSection] = useState({});
  const [sectionContent, setSectionContent] = useState([]);
  const [unsavedImgs, setUnsavedImgs] = useState([]);
  const [globalPreferredTerm, setGlobalPreferredTerm] = useState(false);

  const [saveSection, setSaveSection] = useState(null);

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

  const handleContentUpdate = (payload) => {
    setSectionContent((prevState) => {
      return prepareContent({
        ...payload,
        type: 'MODIFY',
        sectionContent: prevState,
      });
    });
  };

  const handleContentDelete = (payload) => {
    const content = prepareContent({
      ...payload,
      type: 'DELETE',
      sectionContent,
    });
    dispatch(setSaveEnabled(true));
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
    dispatch(setSaveEnabled(true));
    const content = prepareContent({
      ...payload,
      type: 'ADDED',
      contentType: type,
      sectionContent,
      currentLineId: lineId,
    });
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
    setSectionContent(content);
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
      dispatchSectionEvent,
      setSectionContent,
      setSaveSection,
      // unsavedImgs,
      // setUnsavedImgs,
    }),
    [
      selectedSection,
      sectionContent,
      saveSection,
      dispatchSectionEvent,
      setSectionContent,
      setSaveSection,
      // unsavedImgs,
      // setUnsavedImgs,
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
      <div className="protocol_data_container">
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
