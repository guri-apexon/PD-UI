import { useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { viewResult, protocolSummary } from './protocolSlice';
import ProtocolViewClass from './ProtocolViewClass';
import BladeLeft from './BladeLeft';
import Records from './records.json';

const panels = () => {
  const ex = [];
  const arraylength = Records.length;
  for (let i = 0; i < arraylength; i++) {
    ex[i] = i;
  }

  const refsection = ex.reduce((refsection, value) => {
    refsection[value] = createRef();
    console.log('----', value);
    return refsection;
  }, {});
  console.log('refsection:-', refsection);
  return refsection;
};

function ProtocolView({ protId, refs }) {
  const summary = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const viewData = useSelector(viewResult);
  const [pageNo, setPageNo] = useState();
  const [sectionNumber, setSectionNumber] = useState();
  const [sectionRef, setSectionRef] = useState(panels);

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
  console.log('protocolView', refs);
  const handlePageNo = (event, page, sectionNo) => {
    setPageNo(page);
    setSectionNumber(sectionNo);
  };

  return (
    <div>
      <div>
        <BladeLeft handlePageNo={handlePageNo} />
      </div>
      {viewData && (
        <ProtocolViewClass
          view={viewData}
          data={subSections}
          listData={listData}
          page={pageNo}
          refx={refs}
          sectionNumber={sectionNumber}
          sectionRef={sectionRef}
        />
      )}
    </div>
  );
}

export default ProtocolView;
ProtocolView.propTypes = {
  protId: PropTypes.isRequired,
  refs: PropTypes.isRequired,
};
