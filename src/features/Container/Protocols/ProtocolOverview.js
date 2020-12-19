import React from "react";
import Card from "apollo-react/components/Card";
import DonutChart from "apollo-react/components/DonutChart";
import _ from "lodash";

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
                <label>Project ID or CRM #</label>
                <span data-testid="project-value">{data.ProjectId}</span>
              </div>
              <div className="row-item">
                <label>Sponser</label>
                <span data-testid="sponser-value">{data.Sponser}</span>
              </div>
              <div className="row-item">
                <label>Indication</label>
                <span data-testid="indication-value">{data.Indication}</span>
              </div>
              <div className="row-item">
                <label>Molecule / Device</label>
                <span data-testid="molecule-value">{data.Molecule}</span>
              </div>
            </div>
            <div className="column-6-12">
              <div className="row-item">
                <label>Amendment</label>
                <span data-testid="amendment-value">{data.Amendment}</span>
              </div>
              <div className="row-item">
                <label>Version</label>
                <span data-testid="version-value">{data.VersionNumber}</span>
              </div>
              <div className="row-item">
                <label>Document Status</label>
                <span data-testid="status-value">{data.DocumentStatus}</span>
              </div>
              <div className="row-item">
                <label>Activity</label>
                <span data-testid="activity-value">{data.Status}</span>
              </div>
            </div>
          </div>
          <div className="protocol-title">
            <div>Protocol Title</div>
            <div data-testid="title-value">{data.ProtocolName}</div>
          </div>
        </Card>
      </div>
      <Card style={{ padding: "10px 16px" }} className="chart-column">
        <div className="">
          <p className="chart-title">Digitized Confidence Interval</p>
          {!isNaN(parseInt(data.DigitizedConfidenceInterval, 10)) ? (
            <DonutChart
              dropshadow
              percent={parseInt(data.DigitizedConfidenceInterval, 10)}
              subtitle="Label"
              stroke="#0768fd"
              tooltipTitle=""
              tooltipSubtitle=""
              style={{ height: "200px", width: "200px" }}
            />
          ) : (
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
          {!isNaN(parseInt(data.CompletenessOfDigitization, 10)) ? (
            <DonutChart
              dropshadow
              percent={parseInt(data.CompletenessOfDigitization, 10)}
              subtitle="Label"
              // stroke="#0768fd"
              tooltipTitle=""
              tooltipSubtitle=""
              style={{ height: "200px", width: "200px" }}
            />
          ) : (
            <div style={{ display: "flex", height: 100 }}>
              <p style={{ margin: "auto", fontSize: 12 }} data-testid="no-data-digitization">
                Information Not Available
              </p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default ProtocolOverview;
