import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Grid from "apollo-react/components/Grid";
import Card from "apollo-react/components/Card";
import ChevronRight from "apollo-react-icons/ChevronRight";
import { viewResult } from "./protocolSlice.js";
import dummyTable from "./dummyTable.json";
import Loader from "../../Components/Loader/Loader";

function getStyle(style) {
  const IsBold = style.IsBold;
  // const font_size = style.font_size;
  if (IsBold) {
    return "thick";
  }
  return "";
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

    this.state = {
      popupVisible: false,
      subSectionData: [],
      section: null,
      activeSection: null,
      activeSubSection: null,
    };
  }

  componentDidMount() {
    this.props.getProtocolIqvdata();
  }

  getTable(item, unq, noHeader = false) {
    // for (const property in object) {
    //   console.log(`${property}: ${object[property]}`);
    // }
    return (
      <div
        id={`${unq}-${item.TableIndex}`}
        key={`${unq}-${item.TableIndex}`}
        style={{ overflowX: "auto", marginTop: "10px" }}
        ref={this.refs[`${unq}-${item.TableIndex}`]}
      >
        {!noHeader ? (
          <h2
            style={{ paddingTop: 10, fontSize: "16px", marginBottom: "10px" }}
          >
            {item.TableName}
          </h2>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: item.Table }} />
      </div>
    );
  }

  getTocElement = (data) => {
    let section_level = data[0];
    let CPT_section = data[1];
    let type = data[2];
    let content = data[3];
    let font_info = data[4];
    if (!content) {
      return null;
    }
    const isBold = getStyle(font_info);
    if (type === "table") {
      if (CPT_section === "Unmapped") {
        return this.getTable(content, "TOC-TABLE", true);
      }
      return this.getTable(content, "TOC-TABLE");
    }

    switch (font_info.font_style) {
      case "Heading1":
        return (
          <div
            className="bar"
            id={`TOC-${data[5]}`}
            key={`TOC-${data[5]}`}
            ref={this.refs[`TOC-${data[5]}`]}
          >
            <h1 className={`heading1 ${isBold}`} style={{ fontSize: "16px" }}>
              {content}
            </h1>
          </div>
        );
      case "Heading2":
        return (
          <div
            className="bar2"
            id={`TOC-${data[5]}`}
            key={`TOC-${data[5]}`}
            ref={this.refs[`TOC-${data[5]}`]}
          >
            <h2
              id={`CPT_section-${data[5]}`}
              key={`CPT_section-${data[5]}`}
              className={`heading2 ${isBold}`}
              style={{ fontSize: "14px" }}
            >
              {content}
            </h2>
          </div>
        );
      case "Heading3":
        return (
          <div
            className="bar2"
            id={`TOC-${data[5]}`}
            key={`TOC-${data[5]}`}
            ref={this.refs[`TOC-${data[5]}`]}
          >
            <h3
              id={`CPT_section-${data[5]}`}
              key={`CPT_section-${data[5]}`}
              className={`heading3 ${isBold}`}
              style={{ fontSize: "14px" }}
            >
              {content}
            </h3>
          </div>
        );
      default:
        if (CPT_section === "Unmapped") {
          return (
            <p
              id={`CPT_section-${data[5]}`}
              key={`CPT_section-${data[5]}`}
              className={font_info.IsBold ? "thick" : ""}
              style={{ fontSize: "12px" }}
            >
              {content}
            </p>
          );
        }
        return (
          <>
            {isBold ? (
              <div>
                <br />
              </div>
            ) : null}
            <span
              id={`CPT_section-${data[5]}`}
              key={`CPT_section-${data[5]}`}
              className={`indent ${isBold}`}
              style={{ fontSize: "12px" }}
            >
              {content}
            </span>
          </>
        );
    }
  };

  handleClick(id) {
    this.setState({ section: id });
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
      // case "TableOfAppendix":
      //   subData = this.data.TableOfAppendix;
      //   break;
      case "TableOfTable":
        subData = this.data.TableOfTable;
        break;
      // case "TableOfFigure":
      //   subData = this.data.TableOfFigure;
      //   break;
      case "SOA":
        subData = this.data.SOA;
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

  hideEle = () => {
    document.removeEventListener("click", this.handleOutsideClick, false);
    this.setState({ popupVisible: false, subSectionData: [] });
  };

  render() {
    const { view } = this.props;
    const listData = [
      { section: "Table of Contents", id: "Toc" },
      { section: "Schedule of Assessments", id: "SOA" },
    ];

    const subSections = {
      TOC: view.tocSections,
      SOA: view.soaSections,
    };
    const refs = this.state.subSectionData.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
    this.refs = refs;
    this.data = subSections;
    const scrollHide = (id) => {
      refs[id].current &&
        refs[id].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // this.setState({ activeSection: id });
      this.setState({ activeSubSection: id, activeSection: this.state.section });
      this.hideEle();
    };

    if (view.loader) {
      return (
        <div
          style={{
            display: "inline-block",
            margin: "auto",
          }}
        >
          <Loader />
        </div>
      );
    }
    console.log("refs", refs);
    console.log("view", view);
    return (
      <div className="view-wrapper">
        <Card className="index-column">
          <div
            ref={(node) => {
              this.node = node;
            }}
          >
            <div
              className="dropdown-wrapper"
              data-testid="dropdown-wrapper-test"
              id="dropdown-wrapper-id"
            >
              {listData.map((item) => (
                <button
                  className={`btn btn1 ${
                    this.state.activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => this.handleClick(item.id)}
                  key={`section-${item.id}`}
                >
                  <span style={{ marginLeft: "16px" }}>{item.section} </span>
                  <span style={{ float: "right", fontSize: "1em" }}>
                    <ChevronRight className="view-more-icon" variant="small" style={{ float: "right", fontSize: "1em" }} />
                  </span>
                </button>
              ))}
            </div>
            {this.state.popupVisible && (
              <div
                className={`dropdown-menu sample`}
                data-testid="dropdown-menu-test"
                id="dropdown-menu-id"
              >
                {this.state.subSectionData.map((data, i) => (
                  <span>
                    <a
                      className={`btn btn1 ${
                        this.state.activeSubSection === data.id ? "active" : ""
                      }`}
                      key={`sub-section-${data.id}`}
                      onClick={() => scrollHide(data.id)}
                    >
                      <span
                        style={{ marginLeft: "16px" }}
                      >{`${data.section}`}</span>
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
        <Card className="protocol-column">
          <div
            style={{
              scrollPadding: "50px 0px 0px 50px",
              padding: "10px 16px",
              overflowY: "scroll",
              height: "400px",
            }}
          >
            {view.iqvdataToc.data.length &&
              view.iqvdataToc.data.map((item) => {
                return this.getTocElement(item);
              })}
            {view.iqvdataSoa.map((item) => this.getTable(item, "SOA"))}
          </div>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProtocolIqvdata: () =>
      dispatch({
        type: "GET_PROTOCOL_TOC_SAGA",
        payload: "e5c6a06d-166f-478f-b5de-73543a46261e",
      }),
  };
};

const mapStateToProps = (state) => {
  const { protocol } = state;
  return {
    view: protocol.view,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolViewClass);
