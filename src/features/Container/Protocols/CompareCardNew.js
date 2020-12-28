import React from "react";
import Card from "apollo-react/components/Card";

const CompareCard = (props) => {
  return (
    <div className="compare-card">
      <Card
        style={{
          width: "98%",
          float: props.float,
        }}
      >
        <div>
          <div className="header-section">
            {props.cardID === "first-card"
              ? props.compare.protocolNumber +
                " ( " +
                props.compare.versionNumber +
                " )"
              : props.compare.protocolNumber2 +
                " ( " +
                props.compare.versionNumber2 +
                " )"}
          </div>
          <div className="TOC-title"></div>
          <div style={{ marginTop: 25 }}>
            {props.compare &&
              props.compare.iqvdata.data.map((item) => (
                <div className="content-detail">
                  {props.cardID === "first-card" ? (
                    <p style={{ height: 30 }}>{item[3]}</p>
                  ) : (
                    <p style={{ height: 30 }}>{item[4]}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompareCard;
