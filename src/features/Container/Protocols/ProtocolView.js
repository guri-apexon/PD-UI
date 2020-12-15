import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "apollo-react/components/Grid";
import Card from "apollo-react/components/Card";
import { tocData } from "./protocolSlice.js";
import dummyTable from "./dummyTable.json";

function getStyle(style) {
  const IsBold = style.IsBold;
  // const font_size = style.font_size;
  if (IsBold) {
    return "thick";
  }
  return "";
}

function getTable(data) {
  const keys = Object.keys(data);
  const object = data[keys[0]];
  console.log(Object.keys(object));

  // for (const property in object) {
  //   console.log(`${property}: ${object[property]}`);
  // }
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {Object.keys(object).map((key) => {
          return <p>{object[key]}</p>;
        })}
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
}

function getElement(data) {
  let content = data[0];
  const type = data[1];
  // if (type === "table") {
  //   content = JSON.parse(content);
  //   console.log("inside table", content);
  //   return getTable(content);
  // }
  const subsectionOf = data[2];
  const style = data[3];
  const isBold = getStyle(style);
  if (isBold && subsectionOf.length) {
    return (
      <p id={subsectionOf} className={isBold}>
        {content}
      </p>
    );
  }
  switch (style.font_style) {
    case "Heading1":
      return (
        <h1 id={subsectionOf} className={`heading1 ${isBold}`}>
          {content}
        </h1>
      );
    case "Heading2":
      return (
        <h2 id={subsectionOf} className={`heading2 ${isBold}`}>
          {content}
        </h2>
      );
    case "Heading3":
      return (
        <h3 id={subsectionOf} className={`heading3 ${isBold}`}>
          {content}
        </h3>
      );
    default:
      return (
        <span id={subsectionOf} className={`indent ${isBold}`}>
          {content}
        </span>
      );
  }
}
const ProtocolView = () => {
  const dispatch = useDispatch();
  const [showNav, setShowNav] = useState(false);
  const sumData = useSelector(tocData);
  console.log("toc", sumData);
  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TOC_SAGA" });
  }, []);

  const listData = [
    "Table of Contents",
    "Study Design",
    "Schedule of Assessments",
  ];

  //   const ele = sumData.map(item => {
  //       return getElement(item);
  //   })
  //   let ele = <span></span>;
  //   if (sumData.length) {
  //   const content = sumData[0];
  //     const type = sumData[1];
  //     const subsectionOf = sumData[2];
  //     // const style = sumData[3];
  //      ele = <div>{getElement(sumData[3], content)}</div>
  // }
  // console.log(ele);
  return (
    <div className='view-wrapper'>
      <Card className="index-column">
        <div className="dropdown-wrapper">
          {listData.map((item) => (
            <button
              className="btn btn1"
              onClick={() => {
                setShowNav(!showNav);
              }}
              // onMouseEnter={() => {
              //   setShowNav(true);
              // }}
              // onMouseLeave={() => {
              //   setShowNav(false);
              // }}
            >
              <span style={{ marginLeft: "16px" }}>{item}</span>
            </button>
          ))}
        </div>
        <div className={`dropdown-menu sample ${showNav ? "show-nav" : ""}`}>
          <a
            href="#dad"
            className="dropdown-item"
            onClick={() => {
              setShowNav(!showNav);
            }}
          >
            Action 1
          </a>
          <a href="#2001" className="dropdown-item">
            Action 2
          </a>
          <a href="#" className="dropdown-item">
            Action 3
          </a>
          <a href="#" className="dropdown-item">
            Action 4
          </a>
        </div>
      </Card>
      <Card  className="protocol-column">
        <div className='bar'></div>
        <div style={{ padding: "10px 16px" }}>
          {sumData.length &&
            sumData.map((item) => {
              return getElement(item);
            })}
          {dummyTable.map((item) => {
            return (
              <div key={item.Header[0]}>
                <h2>{item.TableName}</h2>
                <div
                  id={item.Header[0]}
                  dangerouslySetInnerHTML={{ __html: item.Table }}
                />
              </div>
            );
          })}
        </div>
      </Card>
      {/* <div dangerouslySetInnerHTML={{ __html: toc }} /> */}
      {/* {toc.map((item, index) => {
        return <div key={index}>
          <h2>{item.Section}</h2>
          <p>{item.Text}</p>
        </div>;
      })} */}
    </div>
  );
};

export default ProtocolView;
