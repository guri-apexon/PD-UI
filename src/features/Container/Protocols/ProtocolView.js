import { useState, createRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  viewResult,
  associateDocs,
  headerResult,
  updateSectionData,
} from './protocolSlice';
import ProtocolViewWrapper from './ProtocolViewWrapper';
import ProtocolContext from './ProtocolContext';
import { prepareContent } from '../../../utils/utilFunction';

function ProtocolView({ refs, data }) {
  const viewData = useSelector(viewResult);
  const summary = useSelector(headerResult);
  const dispatch = useDispatch();
  const [protData, setprotData] = useState(data);
  const protassociateDocs = useSelector(associateDocs);
  const [selectedSection, setSelectedSection] = useState(null);
  const [sectionContent, setSectionContent] = useState(null);

  // eslint-disable-next-line
  const dispatchSectionEvent = (actionType, payload) => {
    console.log(
      'dispatchSectionEvent::::',
      actionType,
      payload,
      selectedSection,
    );
    switch (actionType) {
      case 'ON_SECTION_SELECT': {
        if (!payload.sectionContent && sectionContent) {
          dispatch(
            updateSectionData({
              data: sectionContent,
              type: 'REPLACE_CONTENT',
              linkId: selectedSection.link_id,
            }),
          );
        }
        setSelectedSection(payload.selectedSection);
        setSectionContent(payload.sectionContent);
        break;
      }
      case 'CONTENT_UPDATE': {
        setSectionContent(prepareContent(sectionContent, payload));
        break;
      }
      case 'CONTENT_ADDED': {
        const { type, lineId } = payload;
        const content = prepareContent(sectionContent, type, lineId);
        setSectionContent(content);
        dispatch(
          updateSectionData({
            data: content,
            type: 'REPLACE_CONTENT',
            linkId: selectedSection.link_id,
          }),
        );
        break;
      }
      default:
        break;
    }
  };
  const ProtocolProviderValue = useMemo(
    () => ({ selectedSection, sectionContent, dispatchSectionEvent }),
    [selectedSection, sectionContent, dispatchSectionEvent],
  );

  const panels = () => {
    const ex = [];
    for (let index = 0; index < 250; index++) {
      ex.push(index);
    }
    const refsection = ex.reduce((refsection, value) => {
      refsection[value] = createRef();
      return refsection;
    }, {});
    return refsection;
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
    if (
      protassociateDocs?.length &&
      protassociateDocs[0]?.userRole === 'primary'
    ) {
      setprotData({ ...data, userPrimaryRoleFlag: true });
    }
    // eslint-disable-next-line
  }, [protassociateDocs]);

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
