/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import Tooltip from "apollo-react/components/Tooltip";
import EyeHidden from "apollo-react-icons/EyeHidden";
import EyeShow from "apollo-react-icons/EyeShow";
import TextField from "apollo-react/components/TextField";
import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";
import Modal from "apollo-react/components/Modal";
import ArrowLeft from "apollo-react-icons/ArrowLeft";
import ArrowRight from "apollo-react-icons/ArrowRight";

import PDFView from "./PDFView";

import "./protocol-view.scss";
import ViewData from "./toc_back.json";

class ProtocolViewClass extends React.Component {
  constructor() {
    super();
    this.state = {
      popupVisible: false,
      subSectionData: [],
      section: null,
      activeSection: null,
      activeSubSection: null,
      custom: false,
      item: null,
      leftArrow: true,
      rightArrow: false,
      pdfSectionWidth: "50%",
      pdfScale: 1.0,
      contentSectionWidth: "50%",
      pdfDisplay: true,
      contentDisplay: true,
    };
  }

  handleOpen = (item) => {
    this.setState({ ...this.state, custom: true, item });
    // console.log(item);
  };
  onChange = (event) => {
    // console.log(event.target.value);
    const update = [...this.state.item];
    update[3] = event.target.value;
    this.setState({ ...this.state, item: update });
    // console.log(update);
  };

  handleClose = () => {
    this.setState({ ...this.state, custom: false });
  };

  handleSave = () => {
    // console.log("Your progress has been saved.");
    this.props.dispatch({
      type: "SET_VIEW_DATA",
      payload: {
        section: this.state.item[6],
        id: this.state.item[9],
        content: this.state.item[3],
      },
    });
    this.handleClose("error");
  };

  getTable(item, unq, noHeader = false) {
    // console.log("Table Start----------------------------");
    // console.log("Table", item.TableProperties);
    // console.log("Table End------------------------------");
    let footNote = [];
    for (const [key, value] of Object.entries(item)) {
      const note = key.split("_")[0];
      if (note === "FootnoteText") {
        footNote.push(value);
      }
    }

    return (
      <>
        <div style={{}}>
          {!noHeader ? (
            <h2
              style={{
                // paddingTop: "20px",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              {item.TableName}
            </h2>
          ) : null}
        </div>
        <div
          className="table-container"
          id={`${unq}-${item.TableIndex}`}
          key={`${unq}-${item.TableIndex}`}
          style={{ overflowX: "auto", marginTop: "10px", marginBottom: "20px" }}
          ref={this.refs[`${unq}-${item.TableIndex}`]}
        >
          <div dangerouslySetInnerHTML={{ __html: item.Table }} />
        </div>
        <div>
          {footNote.map((notes) => {
            return notes && <p style={{ fontSize: "12px" }}>{notes}</p>;
          })}
        </div>
      </>
    );
  }

  getTocElement = (data) => {
    let CPT_section = data[1];
    let type = data[2];
    let content = data[3];
    let seq_num = data[9];
    if (!content) {
      return null;
    }
    if (type === "table") {
      if (CPT_section === "Unmapped") {
        return this.getTable(content, "TOC-TABLE", true);
      }
      return this.getTable(content, "TOC-TABLE");
    }

    switch (type) {
      case "header":
        return (
          <div
            className="level-3-header"
            id={`TOC-${seq_num}`}
            key={`TOC-${seq_num}`}
            ref={this.refs[`TOC-${seq_num}`]}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      default:
        return (
          <>
            <p
              id={`CPT_section-${seq_num}`}
              key={`CPT_section-${seq_num}`}
              // className={`indent ${isBold}`}
              onClick={() => this.handleOpen(data)}
              style={{ fontSize: "12px" }}
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
          </>
        );
    }
  };

  scrollToPage(page) {
    // console.log(page);
    const pageNum = parseInt(page);
    if (pageNum || pageNum === 0) {
      const ele = document.getElementById(`page-${pageNum + 1}`);
      ele.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  renderContent(data) {
    return <div>{data.map((item) => this.getTocElement(item))}</div>;
  }
  renderAccordionDetail = (data) => {
    if (data.header) {
      return (
        <Accordion key={data.id} className="accordion-child">
          <AccordionSummary>
            <div className="accordion-child-header">
              {data.header.toLowerCase()}{" "}
            </div>
          </AccordionSummary>
          <AccordionDetails className="accordion-child-detail-container">
            <div className="accordion-child-detail">
              {this.renderContent(data.data)}
            </div>
          </AccordionDetails>
        </Accordion>
      );
    } else {
      return this.renderContent(data.data);
    }
  };
  renderAccordion = (data) => {
    return (
      data.length > 0 &&
      data.map((section, index) => {
        return (
          <Accordion
            key={section.id}
            className="accordion-parent"
            onChange={() => this.scrollToPage(section.page)}
          >
            <AccordionSummary>
              <div className="accordion-parent-header">
                {section.header.toLowerCase()}{" "}
                {index % 2 ? (
                  <EyeHidden style={{ color: "#9f9fa1", float: "right" }} />
                ) : (
                  <Tooltip
                    variant="dark"
                    extraLabels={[
                      {
                        title: "Last Reviewed",
                        subtitle: "12-Oct-2021",
                      },
                      { title: "Reviewd By", subtitle: "1072231" },
                      { title: "No. of reviews", subtitle: "3" },
                    ]}
                    placement="top"
                    style={{ marginRight: 192 }}
                  >
                    <EyeShow style={{ color: "#0469a4", float: "right" }} />
                  </Tooltip>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails className="accordion-parent-detail-container">
              <div className="accordion-parent-detail">
                {section.data.map((subSection) =>
                  this.renderAccordionDetail(subSection)
                )}
                {/* {toc[key].data.map((item) => {
                return this.getTocElement(item);
              })} */}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })
    );
  };
  handleArrowChange = (section) => {
    if (section === "PDF") {
      this.setState({
        leftArrow: false,
        rightArrow: true,
      });
    } else {
      this.setState({
        leftArrow: true,
        rightArrow: false,
      });
    }
  };
  handleExpand = () => {
    const { rightArrow, leftArrow, contentDisplay, pdfDisplay } = this.state;
    if (rightArrow) {
      if (contentDisplay && !pdfDisplay) {
        this.setState({
          pdfScale: 1.0,
          pdfSectionWidth: "50%",
          contentSectionWidth: "50%",
          rightArrow: false,
          leftArrow: true,
          contentDisplay: true,
          pdfDisplay: true,
        });
      } else {
        this.setState({
          pdfScale: 1.5,
          pdfSectionWidth: "80%",
          contentSectionWidth: "20%",
          rightArrow: false,
          leftArrow: true,
          contentDisplay: false,
          pdfDisplay: true,
        });
      }
    } else if (leftArrow) {
      if (!contentDisplay && pdfDisplay) {
        this.setState({
          pdfScale: 1.0,
          pdfSectionWidth: "50%",
          contentSectionWidth: "50%",
          rightArrow: false,
          leftArrow: true,
          contentDisplay: true,
          pdfDisplay: true,
        });
      } else {
        this.setState({
          pdfScale: 0.4,
          pdfSectionWidth: "20%",
          contentSectionWidth: "80%",
          leftArrow: false,
          rightArrow: true,
          pdfDisplay: false,
          contentDisplay: true,
        });
      }
    }
  };
  render() {
    const toc = ViewData;
    const {
      leftArrow,
      rightArrow,
      pdfSectionWidth,
      pdfScale,
      contentSectionWidth,
      pdfDisplay,
      contentDisplay,
    } = this.state;
    return (
      <div className="protocol-view-component">
        <div
          className="pdf-render-section"
          onMouseEnter={() => {
            pdfDisplay && contentDisplay && this.handleArrowChange("PDF");
          }}
          style={{ width: pdfSectionWidth }}
        >
          <PDFView path={this.props.path} scale={pdfScale} />
        </div>
        {(leftArrow || rightArrow) && (
          <div className="arrow-container" onClick={this.handleExpand}>
            {leftArrow && <ArrowLeft />}
            {rightArrow && <ArrowRight />}
          </div>
        )}
        <div
          className="digitized-content-render-section"
          onMouseEnter={() => {
            contentDisplay && pdfDisplay && this.handleArrowChange("CONTENT");
          }}
          style={{ width: contentSectionWidth }}
        >
          <div className="protocol-column">
            <div
              className="accordion-start-container"
              data-testid="protocol-column-wrapper"
            >
              {this.renderAccordion(toc)}
            </div>
          </div>
        </div>

        <>
          <Modal
            open={this.state.custom}
            variant="default"
            onClose={() => this.handleClose("custom")}
            title="Header"
            buttonProps={[{}, { label: "Save", onClick: this.handleSave }]}
            id="custom"
          >
            <TextField
              label="Label"
              placeholder="Placeholder"
              helperText="This is a note about the field"
              sizeAdjustable
              minWidth={300}
              minHeight={180}
              value={this.state.item && this.state.item[3]}
              onChange={this.onChange}
            />
          </Modal>
        </>
      </div>
    );
  }
}

export default connect()(ProtocolViewClass);
