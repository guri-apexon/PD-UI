import React from "react";
import Card from "apollo-react/components/Card";
import { redaction } from "../../../AppConstant/AppConstant";
import Tooltip from "apollo-react/components/Tooltip";
import { handleProtocolTitle } from "../../../utils/utilFunction";
// import DonutChart from "apollo-react/components/DonutChart";
import { iconStatus, qcIconStatus } from "../../../utils/utilFunction";

const ProtocolOverview = ({ data }) => {
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
                {redactionCheckRender(data.projectId, "project-value")}
              </div>
              <div className="row-item">
                <label>Sponsor </label>
                {redactionCheckRender(data.sponsor, "sponser-value")}
              </div>
              <div className="row-item">
                <label>Indication</label>
                {redactionCheckRender(data.indication, "indication-value")}
              </div>
              <div className="row-item">
                <label>Molecule / Device</label>
                {redactionCheckRender(data.moleculeDevice, "molecule-value")}
              </div>
            </div>
            <div className="column-6-12">
              <div className="row-item">
                <label>Amendment</label>
                {redactionCheckRender(data.amendment, "amendment-value")}
              </div>
              <div className="row-item">
                <label>Version</label>
                {redactionCheckRender(data.versionNumber, "version-value")}
              </div>
              <div className="row-item">
                <label>Document Status</label>
                {redactionCheckRender(data.documentStatus, "status-value")}
              </div>
              <div className="row-item">
                <label>PD Activity</label>
                {redactionCheckRender(
                  iconStatus(data.status, data.qcStatus),
                  "activity-value"
                )}
              </div>
              <div className="row-item">
                <label>QC Activity</label>
                {redactionCheckRender(
                  qcIconStatus(data.qcStatus, data.status),
                  "qc-activity-value"
                )}
              </div>
            </div>
          </div>
          <div className="protocol-title">
            <div style={{ fontWeight: "bold" }}>Protocol Title</div>
            {handleProtocolTitle(data.protocolTitle, "title-value")}
            {/* <div data-testid="title-value">{data.protocolTitle}</div> */}
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
