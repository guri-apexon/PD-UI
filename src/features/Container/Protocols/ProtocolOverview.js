import React from "react";
import Card from "apollo-react/components/Card";
import DonutChart from "apollo-react/components/DonutChart";

const ProtocolOverview = ({data}) => {
  return (
    <>
      <div className="tab-card">
        <Card style={{ padding: "10px 16px" }}>
          <p className="card-header">Overview Details</p>
          <div className="data-container">
            <div className="column-6-12">
              <div className="row-item">
                <label>Project ID or CRM #</label>
                <span>{data.projectId}</span>
              </div>
              <div className="row-item">
                <label>Sponser</label>
                <span>{data.sponsor}</span>
              </div>
              <div className="row-item">
                <label>Indication</label>
                <span>{data.indication}</span>
              </div>
              <div className="row-item">
                <label>Molecule / Device</label>
                <span>{data.molecule}</span>
              </div>
            </div>
            <div className="column-6-12">
              <div className="row-item">
                <label>Amendment</label>
                <span>{data.amendment}</span>
              </div>
              <div className="row-item">
                <label>Version</label>
                <span>{data.version}</span>
              </div>
              <div className="row-item">
                <label>Document Status</label>
                <span>{data.documentStatus}</span>
              </div>
              <div className="row-item">
                <label>Activity</label>
                <span>{data.activity}</span>
              </div>
            </div>
          </div>
          <div className="protocol-title">
            <div>Protocol Title</div>
            <div>{data.protocolDescription}</div>
          </div>
        </Card>
      </div>
      <Card style={{ padding: "10px 16px" }} className="chart-column">
        <div className="">
          <p className="chart-title">Digitized Confidence Interval</p>
          <DonutChart
            dropshadow
            percent={parseInt(data.confidenceInterval, 10)}
            subtitle="Label"
            stroke="#0768fd"
            tooltipTitle="$82,000"
            tooltipSubtitle="Total sales in 2018"
            style={{ height: "200px", width: "200px" }}
          />
          <p className="chart-title">Completeness of Digitization</p>
          <DonutChart
            dropshadow
            percent={parseInt(data.completenessDigitization, 10)}
            subtitle="Label"
            // stroke="#0768fd"
            tooltipTitle="$82,000"
            tooltipSubtitle="Total sales in 2018"
            style={{ height: "200px", width: "200px" }}
          />
        </div>
      </Card>
    </>
  );
};

export default ProtocolOverview;
