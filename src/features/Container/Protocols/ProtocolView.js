import { useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { viewResult, protocolSummary } from './protocolSlice';
import ProtocolViewClass from './ProtocolViewClass';
import Records from './Dummy.json';

function ProtocolView({ protId, refs, data }) {
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

  // Write Down section api things.
  useEffect(() => {
    dispatch({
      type: 'POST_PROTOCOL_TOC_DATA',
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

  const panels = () => {
    const ex = [];
    const arraylength = Records.length;
    for (let i = 0; i <= arraylength; i++) {
      ex[i] = i;
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

  return (
    <div className="protocol_data_container">
      {viewData && (
        <ProtocolViewClass
          view={viewData}
          data1={subSections}
          listData={listData}
          refx={refs}
          sectionRef={sectionRef}
          data={data}
        />
      )}
    </div>
  );
}

export default ProtocolView;
ProtocolView.propTypes = {
  protId: PropTypes.isRequired,
  refs: PropTypes.isRequired,
  data: PropTypes.isRequired,
};
