import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
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
        <div className="bar">
          <h2 id={subsectionOf} className={`heading2 ${isBold}`}>
            {content}
          </h2>
        </div>
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
class ProtocolViewClass extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.hideEle = this.hideEle.bind(this);

    this.state = {
      popupVisible: false,
      subSectionData: [],
    };
  }

  componentDidMount() {
    this.props.getProtocolIqvdata();
  }

  handleClick(id) {
    // if (!this.state.popupVisible) {
    //   // attach/remove event handler
    //   document.addEventListener("click", this.handleOutsideClick, false);
    // } else {
    //   document.removeEventListener("click", this.handleOutsideClick, false);
    document.addEventListener("click", this.handleOutsideClick, false);
    // }

    let subData = [];
    switch (id) {
      case "Toc":
        subData = this.data.TOC;
        break;
      case "TableOfAppendix":
        subData = this.data.TableOfAppendix;
        break;
      case "TableOfTable":
        subData = this.data.TableOfTable;
        break;
      case "TableOfFigure":
        subData = this.data.TableOfFigure;
        break;
    }

    // this.setState((prevState) => ({
    //   popupVisible: !prevState.popupVisible,
    // }));
    this.setState({ popupVisible: true, subSectionData: subData });
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (e.target && this.node && this.node.contains(e.target)) {
      return;
    }
    if (this.state.popupVisible) {
      this.hideEle();
    } else {
      this.handleClick();
    }
  }

  hideEle() {
    document.removeEventListener("click", this.handleOutsideClick, false);
    this.setState({ popupVisible: false, subSectionData: [] });
  }

  render() {
    const listData = [
      { section: "Table of Contents", id: "Toc" },
      { section: "Table of Tables", id: "TableOfTable" },
    ];

    const subSections = {
      TOC: [
        { section: "1. Synonpsis", id: "1" },
        { section: "2. Sponser Investigators, and Trial Administrative Structure", id: "2" },
        { section: "3. Background Information", id: "3" },
        { section: "4. Trial Objectives", id: "4" },
        { section: "5. Investigation Plan", id: "5" },
        { section: "6. Investigation Medicinal Product and other Drugs Used in the Trial", id: "6" },
        { section: "7. Trial Procedures and Assesments", id: "7" },
        { section: "8. Statistics", id: "8" },
        { section: "9. Ethical and Regulatory Aspects", id: "9" },
        { section: "10. Trial Management", id: "10" },
        { section: "11. References", id: "11" },
      ],
      TableOfTable: [
        { section: "Table 1. Hematology Assessments", id: "t1" },
        { section: "Table 2. Biochemistry Assessments", id: "t2" },
        { section: "Table 3. Background Information", id: "t3" },
      ],
    };

    this.data = subSections;

    console.log("state", this.state);
    return (
      <div className="view-wrapper">
        <Card className="index-column">
          <div
            ref={(node) => {
              this.node = node;
            }}
          >
            <div className="dropdown-wrapper">
              {listData.map((item) => (
                <button
                  className="btn btn1"
                  onClick={() => this.handleClick(item.id)}
                  key={item.id}
                >
                  <span style={{ marginLeft: "16px" }}>{item.section}</span>
                </button>
              ))}
            </div>
            {this.state.popupVisible && (
              <div className={`dropdown-menu sample`}>
                {this.state.subSectionData.map((data) => (
                  <span>
                    <a
                      className="btn btn1"
                      key={data.id}
                      onClick={this.hideEle}
                    >
                      <span style={{ marginLeft: "16px" }}>{data.section}</span>
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
        <Card className="protocol-column">
          <div style={{ padding: "10px 16px" }}>
            {/* {sumData.map((item) => {
                  return (
                    <p>{item.section}</p>
                  )
              })} */}

            {this.props.sumData.length &&
              this.props.sumData.map((item) => {
                return getElement(item);
              })}
            {dummyTable.map((item) => {
              return (
                <div key={item.Header[0]} style={{ overflowX: "scroll" }}>
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProtocolIqvdata: () => dispatch({ type: "GET_PROTOCOL_TOC_SAGA" }),
  };
};

const mapStateToProps = (state) => {
  const { protocol } = state;
  return {
    sumData: protocol.toc,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolViewClass);
