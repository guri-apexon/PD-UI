import { useState, createRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { viewResult, headerResult, updateSectionData } from './protocolSlice';
import ProtocolViewWrapper from './ProtocolViewWrapper';
import { ProtocolContext } from './ProtocolContext';
import { isPrimaryUser, prepareContent } from '../../../utils/utilFunction';

function ProtocolView({ refs, data }) {
  const viewData = useSelector(viewResult);
  const summary = useSelector(headerResult);
  const dispatch = useDispatch();
  const protData = {
    ...data,
    userPrimaryRoleFlag: isPrimaryUser(data),
  };
  const [selectedSection, setSelectedSection] = useState(null);
  const [sectionContent, setSectionContent] = useState(null);

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
    const content = prepareContent({
      ...payload,
      type: 'MODIFY',
      sectionContent,
    });
    setSectionContent(content);
  };

  const handleContentDelete = (payload) => {
    const content = prepareContent({
      ...payload,
      type: 'DELETE',
      sectionContent,
    });
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
    const { type, lineId } = payload;
    const content = prepareContent({
      ...payload,
      type: 'ADDED',
      contentType: type,
      sectionContent,
      currentLineId: lineId,
    });
    setSectionContent(content);
    dispatch(
      updateSectionData({
        data: content,
        actionType: 'REPLACE_CONTENT',
        linkId: selectedSection.link_id,
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

  /* istanbul ignore next */
  // eslint-disable-next-line
  const dispatchSectionEvent = (actionType, payload) => {
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
  };

  const ProtocolProviderValue = useMemo(
    () => ({
      selectedSection,
      sectionContent,
      dispatchSectionEvent,
    }),
    [selectedSection, sectionContent, dispatchSectionEvent],
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

  useEffect(() => {
    dispatch({
      type: 'GET_PROTOCOL_TOC_DATA',
      payload: {
        docId: data.id,
        tocFlag: 1,
      },
    });
    // eslint-disable-next-line
  }, []);

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
            data={protData}
            summaryData={summary}
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
