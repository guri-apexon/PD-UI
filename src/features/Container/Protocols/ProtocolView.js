import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { viewResult, protocolSummary } from './protocolSlice';
import ProtocolViewClass from './ProtocolViewClass';

function ProtocolView({ protId }) {
  const summary = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const viewData = useSelector(viewResult);
  useEffect(() => {
    dispatch({
      type: 'GET_PROTOCOL_TOC_SAGA',
      payload: {
        endPoint: 'protocol_data/',
        id: protId,
        user: 'normal',
        protocol: summary.data.protocol,
      },
    });
    /* eslint-disable */
  }, []);
  /* eslint-enable */
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
    viewData && (
      <ProtocolViewClass
        view={viewData}
        data={subSections}
        listData={listData}
      />
    )
  );
}

export default ProtocolView;
ProtocolView.propTypes = {
  protId: PropTypes.isRequired,
};
