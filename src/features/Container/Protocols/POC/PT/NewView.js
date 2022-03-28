import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ptWrapper } from "../../store/slice";
import { ActionTypes } from "../../store/ActionTypes";

import Loader from "../../../../Components/Loader/Loader";
import cloneDeep from "lodash/cloneDeep";

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
import FileAccountPlan from "apollo-react-icons/FileAccountPlan";

import { getColumnFromJSON, getDataSourceFromJSON } from "./utils";

import AGTable from "./Table";
import Button from "apollo-react/components/Button/Button";

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
      <span>Header 2</span>
    </div>
  );
};
const TextHeader3 = () => {
  return (
    <div className="add-element">
      <TextBold fontSize="extraSmall" />
      <span>Header 3</span>
    </div>
  );
};
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
const SectionElement = () => {
  return (
    <div className="add-element">
      <FileAccountPlan fontSize="extraSmall" />
      <span>Section</span>
    </div>
  );
};

const View = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { data, detail, success, loader, error } = useSelector(ptWrapper);

  const [expandedSections, setExpandedSections] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {}, []);
  const handleOpen = (index, content) => {
    setEditIndex(index);
    setEditValue(content);
  };
  const saveData = () => {
    setEditIndex(null);
    setEditValue("");
  };
  const handleClick = (label) => () => {
    console.log(`You picked ${label}.`);
    console.log(`At Line ID ${hoverIndex}`);
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
      onClick: handleClick("header2"),
    },
    {
      text: <TextHeader3 />,
      onClick: handleClick("header3"),
    },
    {
      text: <ImageElement />,
      onClick: handleClick("image"),
    },
    {
      text: <SectionElement />,
      onClick: handleClick("section"),
    },
  ];
  const getTable = (item, data, unq, noHeader = false) => {
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
      default:
        return (
          <>
            {editIndex !== index ? (
              <p
                id={`CPT_section-${seq_num}`}
                key={`CPT_section-${seq_num}`}
                className={`text-para`}
                onDoubleClick={() => handleOpen(index, content)}
                style={{ fontSize: "12px" }}
                dangerouslySetInnerHTML={{ __html: content }}
                onClick={() => scrollToPage(data.page)}
              ></p>
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
  const renderAccordionDetail = (data) => {
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
              onMouseEnter={() => setHoverIndex(data.line_id)}
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
        const ele = document.getElementById(`page-${pageNum + 1}`);
        ele.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  const handleSectionClicked = async (section) => {
    // eslint-disable-next-line no-debugger
    debugger;
    let staticID = "09e5f949-e170-4bd3-baac-77e377ed4821";
    const page = section.page;
    const sectionName = section.source_file_section;
    const arr = cloneDeep(expandedSections);
    const index = arr.indexOf(sectionName);

    if (index > -1) {
      arr.splice(index, 1);
      setExpandedSections(arr);
    } else {
      arr.push(sectionName);
      setExpandedSections(arr);
      if (detail) {
        const cloneViewData = cloneDeep(detail);
        if (sectionName in cloneViewData) {
          console.log("Data Present");
        } else {
          dispatch({
            type: ActionTypes.GET_PT_DATA,
            payload: {
              id: staticID,
              body: true,
              keyIndex: sectionName,
              input,
            },
          });
        }
      } else {
        dispatch({
          type: ActionTypes.GET_PT_DATA,
          payload: {
            id: staticID,
            body: true,
            keyIndex: sectionName,
            input,
          },
        });
      }
    }
    if (page > 0) {
      scrollToPage(page);
    } else {
      let pageNumber = section.indexes.seg_pages;
      if (pageNumber.length > 0) {
        scrollToPage(pageNumber[0]);
      }
    }
  };
  const renderHeader = (data) => {
    return (
      data &&
      data.length > 0 &&
      data.map((section, index) => {
        const sectionName = section.source_file_section;
        return (
          <Accordion
            key={sectionName + index}
            className="accordion-parent"
            expanded={expandedSections.includes(sectionName)}
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
              {detail && sectionName in detail && (
                <div
                  className="accordion-parent-detail"
                  style={{ width: "100%" }}
                >
                  {detail[sectionName].loading && (
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
                  {!detail[sectionName].loading &&
                    detail[sectionName].success &&
                    detail[sectionName].data.map((elem) => {
                      return (
                        <div key={elem.line_id}>
                          {renderAccordionDetail(elem)}
                        </div>
                      );
                    })}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })
    );
  };
  const handlePTSearch = (e) => {
    e.preventDefault();
    let staticID = "09e5f949-e170-4bd3-baac-77e377ed4821";
    dispatch({
      type: ActionTypes.GET_PT_DATA,
      payload: { id: staticID, body: false, input },
    });
  };
  return (
    <div>
      <div className="pt-search">
        <form onSubmit={handlePTSearch}>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            variant="primary"
            size="small"
            style={{ margin: 10 }}
            onClick={(e) => handlePTSearch(e)}
          >
            PT Search
          </Button>
        </form>
      </div>
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
      {error && (
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
