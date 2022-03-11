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
// import ViewData from "./Protocol-view/data.json";
// import axios from "axios";
import { withRouter } from "react-router-dom";
// import axios from "axios";
import { BASE_URL_8000, httpCall } from "../../../utils/api";
import { cloneDeep } from "lodash";

// import ViewData from "./ag-grid/data/section.json";

// import Table from "./ag-grid";
const queryString = require("query-string");

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
      editIndex: null,
      editValue: "",
      ViewData: [],
      pdfFileURL: "",
      expandedSections: [],
    };
  }

  fetchData = async (id) => {
    const config = {
      url: `${BASE_URL_8000}/api/sections_api/lvl1_metadata?aidocid=02cb4d51-273c-4d85-b2d4-495454133b36`,
      method: "GET",
    };
    try {
      const { data } = await httpCall(config);

      this.setState({ ViewData: data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchPDF = async () => {
    const { summary, userID } = this.props;
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        summary.data.documentFilePath
      )}&userId=${userID.substring(1)}&protocol=${summary.data.protocol}`,
      method: "GET",
      responseType: "blob",
    };
    try {
      const resp = await httpCall(config);
      const file = new Blob([resp.data], { type: "application/pdf" });
      console.log("file URL file", file);
      // const fileURL = URL.createObjectURL(file);
      // console.log("file URL", fileURL);
      this.setState({
        pdfFileURL: file,
      });
    } catch (e) {
      console.log(e);
    }

    // window.open(fileURL);
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.summary !== this.props.summary) {
  //     this.fetchPDF(this.props.summary);
  //   }
  // }
  componentDidMount() {
    const { location } = this.props.history;
    const parsed = queryString.parse(location.search);
    console.log(parsed);
    this.fetchData(parsed.protocolId);
    this.fetchPDF(this.props.summary);
  }
  handleOpen = (index, content) => {
    // this.setState({ ...this.state, custom: true, item });
    // console.log(item);
    this.setState({
      editIndex: index,
      editValue: content,
    });
  };
  saveData = () => {
    console.log("calling...");
    this.setState({
      editIndex: null,
      editValue: "",
    });
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
    // const tableProperties = JSON.parse(item.TableProperties);
    // console.log(tableProperties);
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
            <div className="level-3-header">{item.TableName}</div>
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
          {/* <Table type="edit" tableJSONData={tableProperties} /> */}
        </div>
        <div>
          {footNote.map((notes) => {
            return notes && <p style={{ fontSize: "12px" }}>{notes}</p>;
          })}
        </div>
      </>
    );
  }

  getTocElement = (data, index) => {
    let type = data.derived_section_type;
    let content = data.content;
    let seq_num = data.font_info.roi_id.para;
    if (!content) {
      return null;
    }
    if (type === "table") {
      return this.getTable(content, "TOC-TABLE");
    }
    const { editIndex, editValue } = this.state;
    switch (type) {
      case "header":
        return editIndex !== index ? (
          <div
            className="level-3-header"
            id={`TOC-${seq_num}`}
            key={`TOC-${seq_num}`}
            ref={this.refs[`TOC-${seq_num}`]}
            dangerouslySetInnerHTML={{ __html: content }}
            onDoubleClick={() => this.handleOpen(index, content)}
          />
        ) : (
          <textarea
            onBlur={() => this.saveData()}
            onChange={(e) => this.setState({ editValue: e.target.value })}
            value={editIndex === index ? editValue : content}
            className="pd-view-text-area"
            autoFocus
          ></textarea>
        );
      default:
        return (
          <>
            {editIndex !== index ? (
              <p
                id={`CPT_section-${seq_num}`}
                key={`CPT_section-${seq_num}`}
                className={`text-para`}
                onDoubleClick={() => this.handleOpen(index, content)}
                style={{ fontSize: "12px" }}
                dangerouslySetInnerHTML={{ __html: content }}
              ></p>
            ) : (
              <textarea
                value={editIndex === index ? editValue : content}
                className="pd-view-text-area"
                onChange={(e) => this.setState({ editValue: e.target.value })}
                onBlur={() => this.saveData()}
                autoFocus
              ></textarea>
            )}
          </>
        );
    }
  };

  scrollToPage(page) {
    console.log("csalcnlsakcn", page);
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
  renderAccordionDetail = (data, index) => {
    // console.log("Indexes", index);
    if (data.derived_section_type === "header2") {
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
      return this.getTocElement(data, index);
    }
  };
  renderAccordion = (fullData) => {
    const data = fullData.protocol_data_sections;
    let finalData = [];
    const keysArr = Object.keys(data);
    for (let i = 0; i < keysArr.length; i++) {
      // console.log(data[keysArr[i]]);
      // console.log(data[keysArr[i]].section_metadata);
      const headingLevel = parseInt(
        data[keysArr[i]].section_metadata.derived_heading_level
      );

      if (headingLevel === 1) {
        finalData.push(data[keysArr[i]]);
        // } else {
        //   const elementsInsideParent =
        //     finalData[finalData.length - 1].source_document_content;
        //   const elementsInsideChild = data[keysArr[i]].source_document_content;

        //   const finalObject = Object.assign(
        //     elementsInsideParent,
        //     elementsInsideChild
        //   );
        //   finalData[finalData.length - 1].source_document_content = finalObject;
      }
    }

    // ------------------------------- Old Approach ----------------------------------
    // const data = fullData.protocol_data_sections;
    // let finalData = [];
    // const keysArr = Object.keys(data);
    // for (let i = 0; i < keysArr.length; i++) {
    //   console.log(data[keysArr[i]]);
    //   console.log(data[keysArr[i]].section_metadata);
    //   const headingLevel = parseInt(
    //     data[keysArr[i]].section_metadata.derived_heading_level
    //   );

    //   if (headingLevel === 1) {
    //     finalData.push(data[keysArr[i]]);
    //   } else if (headingLevel === 2) {
    //     const parentSourceHeadingNumber =
    //       data[keysArr[i]].section_metadata.parent_heading_num_tree[0];

    //     for (let j = 0; j < finalData.length; j++) {
    //       const sourceHeadingNumber =
    //         finalData[j].section_metadata.source_heading_number;
    //       if (parentSourceHeadingNumber === sourceHeadingNumber) {
    //         const elementsInsideParent = finalData[j].source_document_content;
    //         const elementsInsideChild =
    //           data[keysArr[i]].source_document_content;
    //         const finalObject = Object.assign(
    //           elementsInsideParent,
    //           elementsInsideChild
    //         );
    //         finalData[j].source_document_content = finalObject;
    //       }
    //     }
    //   } else {
    //     const parentSourceHeadingNumber =
    //       data[keysArr[i]].section_metadata.parent_heading_num_tree[0];

    //     for (let j = 0; j < finalData.length; j++) {
    //       const sourceHeadingNumber =
    //         finalData[j].section_metadata.source_heading_number;
    //       if (parentSourceHeadingNumber === sourceHeadingNumber) {
    //         const elementsInsideParent = finalData[j].source_document_content;
    //         const elementsInsideChild =
    //           data[keysArr[i]].source_document_content;
    //         const finalObject = Object.assign(
    //           elementsInsideParent,
    //           elementsInsideChild
    //         );
    //         finalData[j].source_document_content = finalObject;
    //       }
    //     }
    //   }
    // }
    // console.log("merge data", finalData);

    return (
      finalData.length > 0 &&
      finalData.map((elem, index) => {
        return (
          <Accordion
            key={elem.section_metadata.source_file_section}
            className="accordion-parent"
            onChange={() => this.scrollToPage(elem.section_metadata.page)}
          >
            <AccordionSummary>
              <div className="accordion-parent-header">
                {elem.section_metadata.source_file_section.toLowerCase()}{" "}
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
                {/* {Object.keys(elem.source_document_content).map((key2) =>
                  this.renderAccordionDetail(
                    elem.source_document_content[key2],
                    key2
                  )
                )} */}
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
  handleSectionClicked = async (section, key) => {
    const { expandedSections, ViewData } = this.state;
    const page = section.section_metadata.page;
    const arr = cloneDeep(expandedSections);
    const index = arr.indexOf(key);
    // const { summary } = this.props;
    // const id = summary.data.id
    if (index > -1) {
      arr.splice(index, 1);
      this.setState({
        expandedSections: arr,
      });
    } else {
      arr.push(key);
      this.setState({
        expandedSections: arr,
      });
      const cloneViewData = cloneDeep(ViewData);
      console.log("with key", cloneViewData.protocol_data_sections[key]);
      if (
        "source_document_content" in cloneViewData.protocol_data_sections[key]
      ) {
        console.log("Data Present");
      } else {
        const childArr = section.section_metadata.child_secid_seq.map(
          (elm) => elm[0]
        );
        const childString = childArr.toString();
        const config = {
          url: `${BASE_URL_8000}/api/sections_api/particular_sections?aidocid=02cb4d51-273c-4d85-b2d4-495454133b36&sec_id=${childString}`,
          method: "GET",
        };
        try {
          const { data } = await httpCall(config);
          const finalDocContent = [];

          const documentContent = data.protocol_data_sections;
          Object.keys(documentContent).map((key) => {
            finalDocContent.push(documentContent[key].source_document_content);
          });
          cloneViewData.protocol_data_sections[key].source_document_content =
            Object.assign({}, ...finalDocContent);
          this.setState({
            ViewData: cloneViewData,
          });
          console.log(cloneViewData);
        } catch (e) {
          console.log(e);
        }
      }
    }
    this.scrollToPage(page);
  };
  renderSectionContent = () => {};
  renderHeader = (fullData) => {
    const { expandedSections } = this.state;
    const data = fullData.protocol_data_sections;
    console.log("Hello", expandedSections);
    return (
      Object.keys(data).length > 0 &&
      Object.keys(data).map((key, index) => {
        console.log(data[key]);
        return (
          <Accordion
            key={data[key].section_metadata.source_file_section}
            className="accordion-parent"
            expanded={expandedSections.includes(key)}
          >
            <AccordionSummary>
              <div
                className="accordion-parent-header"
                onClick={() => this.handleSectionClicked(data[key], key)}
              >
                {data[key].section_metadata.source_file_section.toLowerCase()}{" "}
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
                {"source_document_content" in data[key] &&
                  Object.keys(data[key].source_document_content).map((key2) =>
                    this.renderAccordionDetail(
                      data[key].source_document_content[key2],
                      key2
                    )
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
    // for (let i = 0; i < keysArr.length; i++) {
    //   const headingLevel = parseInt(
    //     data[keysArr[i]].section_metadata.derived_heading_level
    //   );

    //   if (headingLevel === 1) {
    //     finalData.push(data[keysArr[i]]);
    //   }
    // }
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
    const { ViewData } = this.state;
    const toc = ViewData;
    const {
      leftArrow,
      rightArrow,
      pdfSectionWidth,
      pdfScale,
      contentSectionWidth,
      pdfDisplay,
      contentDisplay,
      editIndex,
      editValue,
      pdfFileURL,
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
          <PDFView
            path={this.props.path}
            scale={pdfScale}
            fileURL={pdfFileURL}
          />
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
              {"aidocid" in toc ? (
                this.renderHeader(toc, editIndex, editValue)
              ) : (
                <div>No Data Found</div>
              )}
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

const mapStateToProps = (state) => {
  return {
    userID: state.user.userDetail.userId,
    summary: state.protocol.summary,
  };
};
const Wrapper = withRouter(ProtocolViewClass);
export default connect(mapStateToProps, {})(Wrapper);
