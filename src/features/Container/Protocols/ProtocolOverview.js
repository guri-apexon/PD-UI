import React from "react";
import Card from "apollo-react/components/Card";
// import DonutChart from "apollo-react/components/DonutChart";

const QCStatus = (status) => {
  switch (status) {
    case "QC_NOT_STARTED":
      return "QC Not Started";
    case "QC1":
    case "QC2":
      return "QC In Progress";
    case "QC_COMPLETED":
      return "QC Completed";
    default:
      return "QC Not Started";
  }
};

const ProtocolOverview = ({ data }) => {
  return (
    <>
      <div className="tab-card">
        <Card style={{ padding: "10px 16px" }}>
          <p className="card-header" data-testid="overview-test">
            Overview Details
          </p>
          <div className="data-container">
            <div className="column-6-12">
              <div className="row-item">
                <label>Project ID/CRM#</label>
                <span data-testid="project-value">{data.projectId}</span>
              </div>
              <div className="row-item">
                <label>Sponsor </label>
                <span data-testid="sponser-value">{data.sponsor}</span>
              </div>
              <div className="row-item">
                <label>Indication</label>
                <span data-testid="indication-value">{data.indication}</span>
              </div>
              <div className="row-item">
                <label>Molecule / Device</label>
                <span data-testid="molecule-value">{data.moleculeDevice}</span>
              </div>
            </div>
            <div className="column-6-12">
              <div className="row-item">
                <label>Amendment</label>
                <span data-testid="amendment-value">{data.amendment}</span>
              </div>
              <div className="row-item">
                <label>Version</label>
                <span data-testid="version-value">{data.versionNumber}</span>
              </div>
              <div className="row-item">
                <label>Document Status</label>
                <span data-testid="status-value" className="text-capitalize">
                  {data.documentStatus}
                </span>
              </div>
              <div className="row-item">
                <label>PD Activity</label>
                <span data-testid="activity-value">{data.status}</span>
              </div>
              <div className="row-item">
                <label>QC Activity</label>
                <span data-testid="qc-activity-value">
                  {QCStatus(data.qcStatus)}
                </span>
              </div>
            </div>
          </div>
          <div className="protocol-title">
            <div style={{ fontWeight: "bold" }}>Protocol Title</div>
            <div data-testid="title-value">{data.protocolTitle}</div>
          </div>
        </Card>
      </div>
      {/* {false && (
        <Card style={{ padding: "10px 16px" }} className="chart-column">
          <div className="">
            <p className="chart-title">Digitized Confidence Interval</p>
            {!isNaN(parseInt(data.digitizedConfidenceInterval, 10)) ? (
              <div></div>
            ) : (
              // <DonutChart
              //   dropshadow
              //   percent={parseInt(data.digitizedConfidenceInterval, 10)}
              //   subtitle="Label"
              //   stroke="#0768fd"
              //   tooltipTitle=""
              //   tooltipSubtitle=""
              //   style={{ height: "200px", width: "200px" }}
              // />
              <div style={{ display: "flex", height: 100 }}>
                <p
                  style={{ margin: "auto", fontSize: 12 }}
                  data-testid="no-data-confidense"
                >
                  Information Not Available
                </p>
              </div>
            )}
            <p className="chart-title">Completeness of Digitization</p>
            {!isNaN(parseInt(data.completenessOfDigitization, 10)) ? (
              <div></div>
            ) : (
              // <DonutChart
              //   dropshadow
              //   percent={parseInt(data.completenessOfDigitization, 10)}
              //   subtitle="Label"
              //   // stroke="#0768fd"
              //   tooltipTitle=""
              //   tooltipSubtitle=""
              //   style={{ height: "200px", width: "200px" }}
              // />
              <div style={{ display: "flex", height: 100 }}>
                <p
                  style={{ margin: "auto", fontSize: 12 }}
                  data-testid="no-data-digitization"
                >
                  Information Not Available
                </p>
              </div>
            )}
          </div>
        </Card>
      )} */}
    </>
  );
};

export default ProtocolOverview;
