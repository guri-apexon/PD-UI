import PropTypes from 'prop-types';
import Card from 'apollo-react/components/Card';
import Tooltip from 'apollo-react/components/Tooltip';
import DonutChart from 'apollo-react/components/DonutChart';
import { redaction } from '../../../AppConstant/AppConstant';
import {
  handleProtocolTitle,
  iconStatus,
  qcIconStatus,
} from '../../../utils/utilFunction';

const styles = {
  container: {
    padding: '10px 16px',
    height: 280,
  },
};

function ProtocolOverview({ data }) {
  const redactionCheckRender = (value, testId) => {
    return (
      <span data-testid={testId}>
        {value && value === redaction.text ? (
          <Tooltip variant="light" title={redaction.hoverText} placement="left">
            <span className="blur">{value}</span>
          </Tooltip>
        ) : (
          <span>{value}</span>
        )}
      </span>
    );
  };
  const renderConfidence = () => {
    if (iconStatus(data.status, data.qcStatus) === 'Digitization Complete') {
      if (data?.digitizedConfidenceInterval) {
        return (
          <DonutChart
            dropshadow
            className="chart"
            percent={parseInt(data.digitizedConfidenceInterval, 10)}
            subtitle="Confidence"
            tooltipTitle="Confidence Metrics"
            tooltipSubtitle="Based on historical performance"
            stroke="#0768fd"
          />
        );
      }
      return (
        <div className="digitization-progress">
          Confidence score is not available for this protocol.
        </div>
      );
    }
    return (
      <div className="digitization-progress">
        Will be available once Protocol digitalization Process is Completed.
      </div>
    );
  };
  return (
    <div className="protocol-overview">
      <div className="tab-card overview overview-card">
        <Card style={styles.container}>
          <p className="card-header" data-testid="overview-test">
            Overview Details
          </p>
          <div className="data-container">
            <div className="column-6-12">
              <div className="row-item">
                <label>Project ID/CRM#</label>
                {redactionCheckRender(data.projectId, 'project-value')}
              </div>
              <div className="row-item">
                <label>Sponsor </label>
                {redactionCheckRender(data.sponsor, 'sponser-value')}
              </div>
              <div className="row-item">
                <label>Indication</label>
                {redactionCheckRender(data.indication, 'indication-value')}
              </div>
              <div className="row-item">
                <label>Molecule / Device</label>
                {redactionCheckRender(data.moleculeDevice, 'molecule-value')}
              </div>
            </div>
            <div className="column-6-12">
              <div className="row-item">
                <label>Amendment</label>
                {redactionCheckRender(data.amendment, 'amendment-value')}
              </div>
              <div className="row-item">
                <label>Version</label>
                {redactionCheckRender(data.versionNumber, 'version-value')}
              </div>
              <div className="row-item text-capitalize">
                <label>Document Status</label>
                {redactionCheckRender(data.documentStatus, 'status-value')}
              </div>
              <div className="row-item">
                <label>PD Activity</label>
                {redactionCheckRender(
                  iconStatus(data.status, data.qcStatus),
                  'activity-value',
                )}
              </div>
              <div className="row-item">
                <label>QC Activity</label>
                {redactionCheckRender(
                  qcIconStatus(data.qcStatus, data.status),
                  'qc-activity-value',
                )}
              </div>
            </div>
          </div>
          <div className="protocol-title">
            <div style={{ fontWeight: 'bold' }}>Protocol Title</div>
            {handleProtocolTitle(data.protocolTitle, 'title-value')}
            {/* <div data-testid="title-value">{data.protocolTitle}</div> */}
          </div>
        </Card>
      </div>
      <div className="confidence-metric">
        <label className="confidence-label">Digitized Confidence Score</label>
        {renderConfidence()}
      </div>
    </div>
  );
}

export default ProtocolOverview;
ProtocolOverview.propTypes = {
  data: PropTypes.isRequired,
};
