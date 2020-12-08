import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "apollo-react/components/Grid";
import { tocData } from "./protocolSlice.js";

function getStyle(style) {
  const IsBold = style.IsBold;
  // const font_size = style.font_size;
  if (IsBold) {
    return "thick";
  }
  return "";
}

function getTable(data) {
  console.log(Object.keys(data));
  const keys = Object.keys(data);

  return (
    <Grid container spacing={2}>
       <Grid item xs={6}>
        
       </Grid>
       <Grid item xs={6}>

       </Grid>
    </Grid>
  )
}

function getElement(data) {
  let content = data[0];
  const type = data[1];
  if (type === 'table') {
    content = JSON.parse(content);
    console.log('inside table', content)
    return getTable(content);
  }
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
  const sumData = useSelector(tocData);
  console.log("toc", sumData);
  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TOC_SAGA" });
  }, []);

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
    <div style={{ overflow: "hidden" }}>
      {sumData.length &&
        sumData.map((item) => {
          return getElement(item);
        })}
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
