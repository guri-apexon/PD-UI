/* eslint-disable */
import React from 'react';

const textTypes = {
  header: 'header',
  text: 'text',
  table: 'table',
};
const compareColorCode = {
  noChange: 0,
  deleted: 1,
  added: 3,
  edited: 2,
};

function CompareTable(props) {
  const iqvdata = props.compare;
  const { data } = iqvdata.iqvdata;
  const handleHighlight = (item) => {
    const str = item[5];
    const arr = item[6];
    const vv = [].concat(...arr);
    let i = 0;
    const str1 = vv.map((item) => {
      const res = str.slice(i, item);
      i = item;
      return res;
    });
    str1[str1.length] = str.slice(i);
    return str1;
  };

  return (
    <div>
      <div className="compare-container">
        <div className="compare-header">
          <div className="left left-header">
            {`${iqvdata.protocolNumber} (${iqvdata.versionNumber})`}
          </div>
          <div className="right right-header">
            {`${iqvdata.protocolNumber2} (${iqvdata.versionNumber2})`}
          </div>
        </div>
        {data.map((item, i) => {
          const type = item[2];
          const diff = item[3];
          const text1 = item[4];
          const text2 = item[5];
          // const difChar = item[6];
          if (type === textTypes.header) {
            if (diff === compareColorCode.noChange) {
              return (
                <div className="section-header" id="Synopsis" key={`aaa${i}`}>
                  <div className="left left-section">{text1}</div>
                  <div className="right right-section">{text2}</div>
                </div>
              );
            }
            if (diff === compareColorCode.deleted) {
              return (
                <div className="section-header" id="Synopsis" key={`aaa${i}`}>
                  <div className="left left-section text-red">{text1}</div>
                  <div className="right right-section">{text2}</div>
                </div>
              );
            }
            if (diff === compareColorCode.edited) {
              return (
                <div className="section-header" id="Synopsis" key={`aaa${i}`}>
                  <div className="left left-section">{text1}</div>
                  <div className="right right-section text-blue">{text2}</div>
                </div>
              );
            }
            if (diff === compareColorCode.added) {
              return (
                <div className="section-header" id="Synopsis" key={`aaa${i}`}>
                  <div className="left left-section">{text1}</div>
                  <div className="right right-section text-blue">{text2}</div>
                </div>
              );
            }
          } else if (type === textTypes.text) {
            if (diff === compareColorCode.noChange) {
              return (
                <div className="compare-row" key={`aaa${i}`}>
                  <div className="left left-text">{text1}</div>
                  <div className="right right-text">{text2}</div>
                </div>
              );
            }
            if (diff === compareColorCode.deleted) {
              return (
                <div className="compare-row" key={`aaa${i}`}>
                  <div className="left left-text text-red">{text1}</div>
                  <div className="right right-text">{text2}</div>
                </div>
              );
            }
            if (diff === compareColorCode.edited) {
              const arrStr = handleHighlight(item);
              return (
                <div className="compare-row" key={`aaa${i}`}>
                  <div className="left left-text">{text1}</div>
                  <div className="right right-text">
                    {arrStr.map((value, i) => {
                      if (i === 0 || i % 2 === 0) {
                        return <span key={i}>{value}</span>;
                      }
                      if (i % 2 !== 0) {
                        return (
                          <span key={i} className="text-blue">
                            {value}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            }
            if (diff === compareColorCode.added) {
              return (
                <div className="compare-row" key={`aaa${i}`}>
                  <div className="left left-text">{text1}</div>
                  <div className="right right-text text-blue">{text2}</div>
                </div>
              );
            }
            // return (
            //   <div className="compare-row" key={"aaa" + i}>
            //     <div className="left left-text">{text1}</div>
            //     <div className="right right-text">{text2}</div>
            //   </div>
            // );
          } else if (type === textTypes.table) {
            return (
              <div className="compare-row" key={`aaa${i}`}>
                <div
                  className="left left-text"
                  dangerouslySetInnerHTML={{ __html: text1.Table }}
                />
                <div
                  className="right right-text"
                  dangerouslySetInnerHTML={{ __html: text2.Table }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      {/* <div class="compare-container">
        <div className="section-header" id="Synopsis">
          <div className="left left-section">Synopsis</div>
          <div className="right right-section">Synopsis</div>
        </div>
        <div className="compare-row">
          <div className="left left-text">
            Lorem Ipsum is typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div className="right right-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div className="compare-row">
          <div className="left left-text">
            Lorem Ipsum is typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div className="right right-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div className="section-header" id="Statistics">
          <div className="left left-section">Statistics</div>
          <div className="right right-section">Statistics</div>
        </div>
        <div className="compare-row">
          <div className="left left-text">
            Lorem Ipsum is typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div className="right right-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div className="compare-row">
          <div className="left left-text">
            Lorem Ipsum is typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div className="right right-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div className="compare-row">
          <div className="left left-text">
            Lorem Ipsum is typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div className="right right-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div> */}
    </div>
    // </Card>
  );
}

export default CompareTable;
