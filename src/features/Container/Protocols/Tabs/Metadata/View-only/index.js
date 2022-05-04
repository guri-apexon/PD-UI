import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapperMeta } from "../../../store/slice";
import { ActionTypes } from "../../../store/ActionTypes";

import Loader from "../../../../../Components/Loader/Loader";
import { cloneDeep, isEmpty } from "lodash";

import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";
import Switch from "apollo-react/components/Switch";

// import { getColumnFromJSON, getDataSourceFromJSON } from "../utils";

// import AGTable from "../Table";

import ObjNEnd from "../components/ObjNEnd";
import InExMetadata from "../components/InExMetadata";

import "./viewOnly.scss";

const View = ({ id }) => {
  const dispatch = useDispatch();
  const [toogleIDs, setToggleIDs] = useState([]);
  const { data, success, loader, error } = useSelector(wrapperMeta);

  useEffect(() => {
    let staticID = id;
    dispatch({
      type: ActionTypes.GET_PROTOCOL_VIEW_NEW1,
      payload: { id: staticID, body: false },
    });
  }, []);
  // const getTable = (item, data, unq, noHeader = false) => {
  //   console.log("Table Data", item);
  //   const tableProperties = JSON.parse(item.TableProperties);
  //   const dataColumn = getColumnFromJSON(tableProperties);
  //   const dataSource = getDataSourceFromJSON(tableProperties);
  //   let footNote = [];
  //   for (const [key, value] of Object.entries(item)) {
  //     const note = key.split("_")[0];
  //     if (note === "FootnoteText") {
  //       footNote.push(value);
  //     }
  //   }

  //   return (
  //     <>
  //       <div style={{}}>
  //         {!noHeader ? (
  //           <div className="level-3-header">{item.TableName}</div>
  //         ) : null}
  //       </div>
  //       <div
  //         className="table-container"
  //         id={`${unq}-${item.TableIndex}`}
  //         key={`${unq}-${item.TableIndex}`}
  //         style={{ overflowX: "auto", marginTop: "10px", marginBottom: "20px" }}
  //       >
  //         {/* <div dangerouslySetInnerHTML={{ __html: item.Table }} /> */}
  //         <AGTable
  //           table={tableProperties}
  //           dataSource={dataSource}
  //           columns={dataColumn}
  //           item={data}
  //           showOptions={false}
  //         />
  //       </div>
  //       <div>
  //         {footNote.map((notes, i) => {
  //           return (
  //             notes && (
  //               <p key={notes + i} style={{ fontSize: "12px" }}>
  //                 {notes}
  //               </p>
  //             )
  //           );
  //         })}
  //       </div>
  //     </>
  //   );
  // };

  // const getTocElement = (data, index) => {
  //   let type = data.derived_section_type;
  //   let content = data.content;
  //   let seq_num = index;
  //   let bold = data.font_info.IsBold;

  //   if (!content) {
  //     return null;
  //   }
  //   if (type === "table") {
  //     return getTable(content, data, "TOC-TABLE");
  //   }
  //   switch (type) {
  //     case "header":
  //       return (
  //         <div
  //           className="level-3-header"
  //           id={`TOC-${seq_num}`}
  //           key={`TOC-${seq_num}`}
  //           dangerouslySetInnerHTML={{ __html: content }}
  //         />
  //       );
  //     case "image":
  //       return (
  //         <div className="image-extract">
  //           <img
  //             src={"data:image/*;base64," + content}
  //             alt=""
  //             style={{ height: "auto", width: "100%" }}
  //           />
  //         </div>
  //       );
  //     default:
  //       return bold ? (
  //         <p
  //           id={`CPT_section-${seq_num}`}
  //           key={`CPT_section-${seq_num}`}
  //           className={`text-para`}
  //           style={{ fontSize: "12px", fontWeight: "bold" }}
  //           dangerouslySetInnerHTML={{ __html: content }}
  //           onClick={() => scrollToPage(data.page)}
  //         ></p>
  //       ) : (
  //         <p
  //           id={`CPT_section-${seq_num}`}
  //           key={`CPT_section-${seq_num}`}
  //           className={`text-para`}
  //           style={{ fontSize: "12px" }}
  //           dangerouslySetInnerHTML={{ __html: content }}
  //           onClick={() => scrollToPage(data.page)}
  //         ></p>
  //       );
  //   }
  // };
  // const renderContent = (data) => {
  //   return data.map((item, i) => (
  //     <div key={item.type + i}>{this.getTocElement(item)}</div>
  //   ));
  // };
  // const renderSubHeader = (data) => {
  //   const pre = data.source_heading_number;
  //   const header = data.source_file_section;
  //   const text = pre + " " + header;
  //   return (
  //     <div
  //       className="level-3-header"
  //       id={`TOC-${text}`}
  //       key={`TOC-${text}`}
  //       dangerouslySetInnerHTML={{ __html: text }}
  //       onClick={() => scrollToPage(data.page)}
  //     />
  //   );
  // };
  // const renderAccordionDetail = (data) => {
  //   console.log("Data", data);
  //   if (data.genre === "2_section_metadata") {
  //     return (
  //       <div className="option-content-container">
  //         <div>{renderSubHeader(data)}</div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="option-content-container">
  //         <div>{getTocElement(data, data.line_id)}</div>
  //       </div>
  //     );
  //   }
  //   // if (data.content) {
  //   //   if (data.derived_section_type === "header2") {
  //   //     return (
  //   //       <Accordion key={data.id} className="accordion-child">
  //   //         <AccordionSummary>
  //   //           <div className="accordion-child-header">
  //   //             {data.header.toLowerCase()}{" "}
  //   //           </div>
  //   //         </AccordionSummary>
  //   //         <AccordionDetails className="accordion-child-detail-container">
  //   //           <div className="accordion-child-detail">
  //   //             {renderContent(data.data)}
  //   //           </div>
  //   //         </AccordionDetails>
  //   //       </Accordion>
  //   //     );
  //   //   } else {
  //   //     return (
  //   //       <div className="option-content-container">
  //   //         <div>{getTocElement(data, data.line_id)}</div>
  //   //       </div>
  //   //     );
  //   //   }
  //   // }
  // };
  const scrollToPage = (page) => {
    console.log(page);
    if (page > 0) {
      const pageNum = parseInt(page);
      if (pageNum || pageNum === 0) {
        const ele = document.getElementById(`page-${pageNum}`);
        ele.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  const handleSectionClicked = async (section) => {
    let staticID = id;
    const sectionHeader = section.header;
    const page = sectionHeader.page;
    const sectionName = sectionHeader.source_file_section;
    const sectionDetail = section.detail;

    if (!sectionDetail) {
      const childArr = sectionHeader.child_secid_seq.map((elm) => elm[0]);
      const childString = childArr.toString();
      dispatch({
        type: ActionTypes.GET_PROTOCOL_VIEW_NEW1,
        payload: {
          id: staticID,
          body: true,
          childString,
          sectionName,
        },
      });
    } else {
      dispatch({
        type: ActionTypes.HANDLE_EXPAND_BPO1,
        payload: {
          sectionName,
        },
      });
    }
    if (page > 0) {
      scrollToPage(page);
    } else {
      let pageNumber = sectionHeader.indexes.seg_pages;
      if (pageNumber.length > 0) {
        scrollToPage(pageNumber[0]);
      }
    }
  };
  const handlePTToggle = (id, e) => {
    e.stopPropagation();
    // eslint-disable-next-line no-debugger
    debugger;
    let secIds = cloneDeep(toogleIDs);
    const index = secIds.findIndex((xID) => xID === id);
    // if()
    if (index > -1) {
      secIds.splice(index, 1);
    } else {
      secIds.push(id);
    }
    setToggleIDs(secIds);
  };
  const renderHeader = (data) => {
    console.log("-----", data);
    if (!isEmpty(data)) {
      return Object.keys(data).map((key, index) => {
        const section = data[key];
        const sectionHeader = section.header;
        const sectionName = sectionHeader.source_file_section;
        const secId = sectionHeader.sec_id;
        const pt = sectionHeader.pt_from_ontology[0];
        return (
          <Accordion
            key={sectionName + index}
            className="accordion-parent"
            expanded={section.expanded}
          >
            <AccordionSummary>
              <div
                className="accordion-parent-header"
                onClick={() => handleSectionClicked(section)}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {toogleIDs.includes(secId)
                  ? pt.toLowerCase()
                  : sectionName.toLowerCase()}
                <div
                  onClick={(e) => handlePTToggle(secId, e)}
                  className="toggle-prefer-term"
                >
                  <Switch
                    label="Prefer Term"
                    // style={{ color: "#9f9fa1", float: "right" }}
                    checked={toogleIDs.includes(secId)}
                    size="small"
                    // onChange={}
                  />
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="accordion-parent-detail-container">
              {section && !isEmpty(section) && (
                <div
                  className="accordion-parent-detail"
                  style={{ width: "100%" }}
                >
                  {section.loading && (
                    <div
                      style={{
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Loader />
                    </div>
                  )}
                  {/* {!section.loading &&
                    section.success &&
                    sectionName !== "Objectives and Endpoints" &&
                    sectionName !== "Study Population" &&
                    section.detail.map((elem) => {
                      return (
                        <div key={elem.line_id}>
                          {renderAccordionDetail(elem)}
                        </div>
                      );
                    })} */}
                  {!section.loading &&
                    section.success &&
                    sectionName === "Objectives and Endpoints" && (
                      <div>
                        <ObjNEnd data={section.detail} />
                      </div>
                    )}
                  {!section.loading &&
                    section.success &&
                    sectionName !== "Objectives and Endpoints" && (
                      <div>
                        <InExMetadata
                          data={section.detail}
                          id={id}
                          scrollToPage={scrollToPage}
                        />
                        {/* <Accordion>
                          <AccordionSummary>
                            <div className="accordion-parent-header">
                              Inclusion Criteria
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="study-population-acco">
                              <Attributes />
                              <MedicalTerm />
                            </div>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion>
                          <AccordionSummary>
                            <div className="accordion-parent-header">
                              Exclusion Criteria
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="study-population-acco">
                              <Attributes />
                              <MedicalTerm />
                            </div>
                          </AccordionDetails>
                        </Accordion> */}
                      </div>
                    )}
                  {!section.loading && !section.success && (
                    <div
                      style={{
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <h4>No Data Found</h4>
                    </div>
                  )}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        );
      });
    }
  };
  return (
    <div>
      {loader && (
        <div
          style={{
            height: 400,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Loader />
        </div>
      )}
      {!loader && success && (
        <div className="view-data-container">
          <div className="protocol-column">
            <div
              className="accordion-start-container"
              data-testid="protocol-column-wrapper"
            >
              {renderHeader(data)}
            </div>
          </div>
        </div>
      )}
      {!loader && !success && error && (
        <div
          style={{
            height: 400,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <h2>No Data Found</h2>
        </div>
      )}
    </div>
  );
};
export default View;
