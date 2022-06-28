/* istanbul ignore file */
import React from "react";
import Card from "apollo-react/components/Card";
import "./style.scss";

const CompareCard = ({ float, cardID, compareJSON }) => {
  const iqvdata = compareJSON.iqvdata;
  const swap = compareJSON.swap || false;
  // const swap = false;

  return (
    <div className="compare-card">
      <Card
        style={{
          width: "98%",
          float: float,
        }}
      >
        <div>
          {!swap ? (
            <div className="header-section">
              {cardID === "first-card"
                ? compareJSON.protocolNumber +
                  " ( " +
                  compareJSON.versionNumber +
                  " )"
                : compareJSON.protocolNumber2 +
                  " ( " +
                  compareJSON.versionNumber2 +
                  " )"}
            </div>
          ) : (
            <div className="header-section">
              {cardID === "first-card"
                ? compareJSON.protocolNumber2 +
                  " ( " +
                  compareJSON.versionNumber2 +
                  " )"
                : compareJSON.protocolNumber +
                  " ( " +
                  compareJSON.versionNumber +
                  " )"}
            </div>
          )}
          <div>
            {!swap ? (
              <div style={{ marginTop: 25 }}>
                {iqvdata.data.map((item) => (
                  <div className="content-detail">
                    {cardID === "first-card" ? (
                      <div style={{ minHeight: 30 }}>
                        {item[3] === 0 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                        {item[3] === 1 && (
                          <p
                            className="h-red"
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                        {item[3] === 2 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                        {item[3] === 3 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                      </div>
                    ) : (
                      <div style={{ minHeight: 30 }}>
                        {item[3] === 0 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                        {item[3] === 1 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                        {item[3] === 2 && (
                          <p
                            className="h-yellow"
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                        {item[3] === 3 && (
                          <p
                            className="h-yellow"
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: 25 }}>
                {iqvdata.data.map((item) => (
                  <div className="content-detail">
                    {cardID === "first-card" ? (
                      <div style={{ minHeight: 30 }}>
                        {item[3] === 0 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                        {item[3] === 1 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                        {item[3] === 2 && (
                          <p
                            className="h-yellow"
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                        {item[3] === 3 && (
                          <p
                            className="h-yellow"
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[5].Table : item[5],
                            }}
                          ></p>
                        )}
                      </div>
                    ) : (
                      <div style={{ minHeight: 30 }}>
                        {item[3] === 0 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                        {item[3] === 1 && (
                          <p
                            className="h-red"
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                        {item[3] === 2 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                        {item[3] === 3 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item[2] === "table" ? item[4].Table : item[4],
                            }}
                          ></p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompareCard;
