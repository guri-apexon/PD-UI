/* eslint-disable */
import React from 'react';
import Card from 'apollo-react/components/Card';

function CompareCard(props) {
  const iqvdata = JSON.parse(props.compare.iqvdata);
  const swap = props.compare.swap || false;
  // const swap = false;
  return (
    <div className="compare-card">
      <Card
        style={{
          width: '98%',
          float: props.float,
        }}
      >
        <div>
          {!swap ? (
            <div className="header-section">
              {props.cardID === 'first-card'
                ? `${props.compare.protocolNumber} ( ${props.compare.versionNumber} )`
                : `${props.compare.protocolNumber2} ( ${props.compare.versionNumber2} )`}
            </div>
          ) : (
            <div className="header-section">
              {props.cardID === 'first-card'
                ? `${props.compare.protocolNumber2} ( ${props.compare.versionNumber2} )`
                : `${props.compare.protocolNumber} ( ${props.compare.versionNumber} )`}
            </div>
          )}
          <div className="TOC-title" />
          {!swap ? (
            <div style={{ marginTop: 25 }}>
              {props.compare &&
                iqvdata.data.map((item) => (
                  <div className="content-detail">
                    {props.cardID === 'first-card' ? (
                      <div style={{ minHeight: 30 }}>
                        {item[2] === 0 && <p>{item[3]}</p>}
                        {item[2] === 1 && <p className="h-red">{item[3]}</p>}
                        {item[2] === 2 && <p>{item[3]}</p>}
                        {item[2] === 3 && <p>{item[3]}</p>}
                      </div>
                    ) : (
                      <div style={{ minHeight: 30 }}>
                        {item[2] === 0 && <p>{item[4]}</p>}
                        {item[2] === 1 && <p>{item[4]}</p>}
                        {item[2] === 2 && <p className="h-yellow">{item[4]}</p>}
                        {item[2] === 3 && <p className="h-yellow">{item[4]}</p>}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div style={{ marginTop: 25 }}>
              {props.compare &&
                iqvdata.data.map((item) => (
                  <div className="content-detail">
                    {props.cardID === 'first-card' ? (
                      <div style={{ minHeight: 30 }}>
                        {item[2] === 0 && <p>{item[4]}</p>}
                        {item[2] === 1 && <p>{item[4]}</p>}
                        {item[2] === 2 && <p className="h-yellow">{item[4]}</p>}
                        {item[2] === 3 && <p className="h-yellow">{item[4]}</p>}
                      </div>
                    ) : (
                      <div style={{ minHeight: 30 }}>
                        {item[2] === 0 && <p>{item[3]}</p>}
                        {item[2] === 1 && <p className="h-red">{item[3]}</p>}
                        {item[2] === 2 && <p>{item[3]}</p>}
                        {item[2] === 3 && <p>{item[3]}</p>}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default CompareCard;
