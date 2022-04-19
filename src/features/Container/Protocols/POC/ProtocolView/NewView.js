import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../store/slice";
import { ActionTypes } from "../../store/ActionTypes";

import Loader from "../../../../Components/Loader/Loader";
// import cloneDeep from "lodash/cloneDeep";

import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";
import Tooltip from "apollo-react/components/Tooltip";
import EyeHidden from "apollo-react-icons/EyeHidden";
import EyeShow from "apollo-react-icons/EyeShow";

import Plus from "apollo-react-icons/Plus";
import IconMenuButton from "apollo-react/components/IconMenuButton";

import Table from "apollo-react-icons/Table";
import TextStyle from "apollo-react-icons/TextStyle";
import TextBold from "apollo-react-icons/TextBold";
import Image from "apollo-react-icons/Image";
// import FileAccountPlan from "apollo-react-icons/FileAccountPlan";

import { getColumnFromJSON, getDataSourceFromJSON } from "./utils";

import AGTable from "./Table";
import { isEmpty } from "lodash";
import { QC_CHANGE_TYPE } from "../../store/sagas/utils";

const TableElement = () => {
  return (
    <div className="add-element">
      <Table fontSize="extraSmall" />
      <span>Table</span>
    </div>
  );
};
const TextHeader2 = () => {
  return (
    <div className="add-element">
      <TextBold fontSize="extraSmall" />
      <span>Header</span>
    </div>
  );
};
// const TextHeader3 = () => {
//   return (
//     <div className="add-element">
//       <TextBold fontSize="extraSmall" />
//       <span>Header 3</span>
//     </div>
//   );
// };
const TextElement = () => {
  return (
    <div className="add-element">
      <TextStyle fontSize="extraSmall" />
      <span>Text</span>
    </div>
  );
};
const ImageElement = () => {
  return (
    <div className="add-element">
      <Image fontSize="extraSmall" />
      <span>Image</span>
    </div>
  );
};

const View = () => {
  const dispatch = useDispatch();
  const { data, success, loader } = useSelector(wrapper);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [hoverSection, setHoverSection] = useState("");

  useEffect(() => {
    let staticID = "09e5f949-e170-4bd3-baac-77e377ed4821";
    dispatch({
      type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
      payload: { id: staticID, body: false },
    });
  }, []);
  const handleOpen = (index, content) => {
    setEditIndex(index);
    setEditValue(content);
  };
  const saveData = () => {
    const obj = {
      lineId: hoverIndex,
      sectionName: hoverSection,
      content: editValue,
    };
    dispatch({
      type: ActionTypes.UPDATE_PROTOCOL_VIEW_CHANGES,
      payload: obj,
    });
    setEditIndex(null);
    setEditValue("");
  };
  const handleClick = (type) => () => {
    console.log(`You picked ${type}.`);
    console.log(`At Line ID ${hoverIndex}`);
    console.log("Section Name");
    // const obj = {
    //   derivedSectionType: type,
    //   lineId: hoverIndex,
    //   sectionName: hoverSection,
    // };
    // dispatch({
    //   type: ActionTypes.UPDATE_PROTOCOL_VIEW,
    //   payload: obj,
    // });
  };
  const menuItems = [
    {
      label: <TableElement />,
      onClick: handleClick("table"),
    },
    {
      text: <TextElement />,
      onClick: handleClick("text"),
    },
    {
      text: <TextHeader2 />,
      onClick: handleClick("header"),
    },
    {
      text: <ImageElement />,
      onClick: handleClick("image"),
    },
  ];
  const getTable = (item, data, unq, noHeader = false) => {
    console.log("Table Data", item);
    const tableProperties = JSON.parse(item.TableProperties);
    const dataColumn = getColumnFromJSON(tableProperties);
    const dataSource = getDataSourceFromJSON(tableProperties);
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
        >
          {/* <div dangerouslySetInnerHTML={{ __html: item.Table }} /> */}
          <AGTable
            table={tableProperties}
            dataSource={dataSource}
            columns={dataColumn}
            item={data}
            showOptions={true}
          />
        </div>
        <div>
          {footNote.map((notes, i) => {
            return (
              notes && (
                <p key={notes + i} style={{ fontSize: "12px" }}>
                  {notes}
                </p>
              )
            );
          })}
        </div>
      </>
    );
  };
  const renderStyleText = (data, index) => {
    let content = data.content;
    let seq_num = index;
    if (data.qc_change_type === QC_CHANGE_TYPE.ADDED) {
      return (
        <p
          id={`CPT_section-${seq_num}`}
          key={`CPT_section-${seq_num}`}
          className={`text-para qc-added`}
          onDoubleClick={() => handleOpen(index, content)}
          style={{ fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={() => scrollToPage(data.page)}
        ></p>
      );
    } else if (data.qc_change_type === QC_CHANGE_TYPE.UPDATED) {
      return (
        <p
          id={`CPT_section-${seq_num}`}
          key={`CPT_section-${seq_num}`}
          className={`text-para qc-updated`}
          onDoubleClick={() => handleOpen(index, content)}
          style={{ fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={() => scrollToPage(data.page)}
        ></p>
      );
    } else if (data.qc_change_type === QC_CHANGE_TYPE.DELETED) {
      return (
        <p
          id={`CPT_section-${seq_num}`}
          key={`CPT_section-${seq_num}`}
          className={`text-para qc-deleted`}
          onDoubleClick={() => handleOpen(index, content)}
          style={{ fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={() => scrollToPage(data.page)}
        ></p>
      );
    } else {
      return (
        <p
          id={`CPT_section-${seq_num}`}
          key={`CPT_section-${seq_num}`}
          className={`text-para`}
          onDoubleClick={() => handleOpen(index, content)}
          style={{ fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={() => scrollToPage(data.page)}
        ></p>
      );
    }
  };
  const getTocElement = (data, index) => {
    let type = data.derived_section_type;
    let content = data.content;
    let seq_num = index;

    if (!content) {
      return null;
    }
    if (type === "table") {
      return getTable(content, data, "TOC-TABLE");
    }
    switch (type) {
      case "header":
        return editIndex !== index ? (
          <div
            className="level-3-header"
            id={`TOC-${seq_num}`}
            key={`TOC-${seq_num}`}
            // ref={this.refs[`TOC-${seq_num}`]}
            dangerouslySetInnerHTML={{ __html: content }}
            onDoubleClick={() => handleOpen(index, content)}
          />
        ) : (
          <textarea
            onBlur={() => saveData()}
            onChange={(e) => setEditValue(e.target.value)}
            value={editIndex === index ? editValue : content}
            className="pd-view-text-area"
            autoFocus
          ></textarea>
        );
      case "image":
        return (
          <div className="image-extract">
            <img
              src={"data:image/*;base64," + content}
              alt=""
              style={{ height: "auto", width: "100%" }}
            />
          </div>
        );
      default:
        return (
          <>
            {editIndex !== index ? (
              renderStyleText(data, index)
            ) : (
              <textarea
                value={editIndex === index ? editValue : content}
                className="pd-view-text-area"
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveData()}
                autoFocus
              ></textarea>
            )}
          </>
        );
    }
  };
  const renderContent = (data) => {
    return data.map((item, i) => (
      <div key={item.type + i}>{this.getTocElement(item)}</div>
    ));
  };
  const renderAccordionDetail = (data, section) => {
    if (data.content) {
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
                {renderContent(data.data)}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      } else {
        return (
          <div className="option-content-container">
            <div
              onMouseEnter={() => {
                setHoverIndex(data.line_id);
                setHoverSection(section);
              }}
              // onMouseLeave={() => this.handleLeave(index)}
            >
              {getTocElement(data, data.line_id)}
            </div>
            <div
              // className="no-option"
              className={
                data.line_id === hoverIndex ? "show-option" : "no-option"
              }
            >
              <Tooltip
                className="tooltip-add-element"
                title="Actions"
                disableFocusListener
              >
                <IconMenuButton
                  className="icon-buttons"
                  id="actions-elements"
                  menuItems={menuItems}
                >
                  <Plus className="plus-icon" size="small" />
                </IconMenuButton>
              </Tooltip>
            </div>
          </div>
        );
      }
    }
  };
  const scrollToPage = (page) => {
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
    let staticID = "09e5f949-e170-4bd3-baac-77e377ed4821";
    const sectionHeader = section.header;
    const page = sectionHeader.page;
    const sectionName = sectionHeader.source_file_section;
    const sectionDetail = section.detail;

    if (!sectionDetail) {
      const childArr = sectionHeader.child_secid_seq.map((elm) => elm[0]);
      const childString = childArr.toString();
      dispatch({
        type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
        payload: {
          id: staticID,
          body: true,
          childString,
          sectionName,
        },
      });
    } else {
      dispatch({
        type: ActionTypes.HANDLE_EXPAND_BPO,
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
  const renderHeader = (data) => {
    console.log("-----", data);
    if (!isEmpty(data)) {
      return Object.keys(data).map((key, index) => {
        const section = data[key];
        const sectionHeader = section.header;
        const sectionName = sectionHeader.source_file_section;
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
              >
                {sectionName.toLowerCase()}{" "}
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
                  {!section.loading &&
                    section.success &&
                    section.detail.map((elem) => {
                      return (
                        <div key={elem.line_id}>
                          {renderAccordionDetail(elem, key)}
                        </div>
                      );
                    })}
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
    </div>
  );
};
export default View;
