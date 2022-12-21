import { useState, createRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { viewResult } from './protocolSlice';
import ProtocolViewClass from './ProtocolViewClass';
import Records from './Dummy.json';

function ProtocolView({ refs, data }) {
  const viewData = useSelector(viewResult);

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
  refs: PropTypes.isRequired,
  data: PropTypes.isRequired,
};
