import React from "react";
import Card from "apollo-react/components/Card";
import DonutChart from "apollo-react/components/DonutChart";
import _ from "lodash";

const ProtocolOverview = ({ data }) => {
  return (
    <>
      <div>
        <div className="tab-card">
          <Card style={{ padding: "10px 16px" }}>
            <p className="card-header" data-testid="overview-test">
              Overview Details
            </p>
            <div className="data-container">
              <div className="column-6-12">
                <div className="row-item">
                  <label>Project ID or CRM #</label>
                  <span>{data.ProjectId}</span>
                </div>
                <div className="row-item">
                  <label>Sponser</label>
                  <span>{data.Sponser}</span>
                </div>
                <div className="row-item">
                  <label>Indication</label>
                  <span>{data.Indication}</span>
                </div>
                <div className="row-item">
                  <label>Molecule / Device</label>
                  <span>{data.Molecule}</span>
                </div>
              </div>
              <div className="column-6-12">
                <div className="row-item">
                  <label>Amendment</label>
                  <span>{data.Amendment}</span>
                </div>
                <div className="row-item">
                  <label>Version</label>
                  <span>{data.VersionNumber}</span>
                </div>
                <div className="row-item">
                  <label>Document Status</label>
                  <span>{data.DocumentStatus}</span>
                </div>
                <div className="row-item">
                  <label>Activity</label>
                  <span>{data.Status}</span>
                </div>
              </div>
            </div>
            <div className="protocol-title">
              <div>Protocol Title</div>
              <div>{data.ProtocolName}</div>
            </div>
          </Card>
        </div>
        <Card style={{ padding: "10px 16px" }} className="chart-column">
          <div className="">
            <p className="chart-title">Digitized Confidence Interval</p>
            {!isNaN(parseInt(data.confidenceInterval, 10)) ? (
              <DonutChart
                dropshadow
                percent={parseInt(data.confidenceInterval, 10)}
                subtitle="Label"
                stroke="#0768fd"
                tooltipTitle="$82,000"
                tooltipSubtitle="Total sales in 2018"
                style={{ height: "200px", width: "200px" }}
              />
            ) : (
              <div style={{ display: "flex", height: 100 }}>
                <p style={{ margin: "auto", fontSize: 12 }}>
                  Information Not Available
                </p>
              </div>
            )}
            <p className="chart-title">Completeness of Digitization</p>
            {!isNaN(parseInt(data.completenessDigitization, 10)) ? (
              <DonutChart
                dropshadow
                percent={parseInt(data.completenessDigitization, 10)}
                subtitle="Label"
                // stroke="#0768fd"
                tooltipTitle="$82,000"
                tooltipSubtitle="Total sales in 2018"
                style={{ height: "200px", width: "200px" }}
              />
            ) : (
              <div style={{ display: "flex", height: 100 }}>
                <p style={{ margin: "auto", fontSize: 12 }}>
                  Information Not Available
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProtocolOverview;
