import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { viewResult } from '../../Protocols/protocolSlice';
import ProtocolViewClass from '../../Protocols/ProtocolViewClass';
function QCProtocolView({ protId }) {
  const dispatch = useDispatch();
  const viewData = useSelector(viewResult);
  useEffect(() => {
    dispatch({ type: 'GET_PROTOCOL_TOC_SAGA', payload: protId });
  }, []);
  const listData = [];

  const subSections = {
    TOC: viewData.tocSections,
    SOA: viewData.soaSections,
  };
  console.log('view', viewData);
  if (subSections.TOC && subSections.TOC.length) {
    listData.push({ section: 'Table of Contents', id: 'Toc' });
  }
  if (subSections.SOA && subSections.SOA.length) {
    listData.push({ section: 'Schedule of Assessments', id: 'SOA' });
  }
  return (
    viewData && (
      <div id="protocol-view" className="protocols">
        <ProtocolViewClass
          view={viewData}
          data={subSections}
          listData={listData}
        />
      </div>
    )
  );
}

export default QCProtocolView;
