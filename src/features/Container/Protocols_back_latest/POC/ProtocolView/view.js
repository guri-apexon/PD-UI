import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../store/slice";
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
import CKEditorComp from "./CKEditer";

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
  const { data, success, loader } = useSelector(wrapper);

  const [expandedSections, setExpandedSections] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    let staticID = "02cb4d51-273c-4d85-b2d4-495454133b36";
    dispatch({
      type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
      payload: { id: staticID, body: false },
    });
  }, []);
  const handleClick = (label) => () => {
    console.log(`You picked ${label}.`);
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
  const handleOpen = (index, content) => {
    setEditIndex(index);
    setEditValue(content);
  };
  const saveData = () => {
    setEditIndex(null);
    setEditValue("");
  };
  const getTable = (item, unq, noHeader = false) => {
    // console.log("Table Start----------------------------");
    // console.log("Table", item.TableProperties);
    // console.log("Table End------------------------------");
    // const tableProperties = JSON.parse(item.TableProperties);
    // console.log(tableProperties);
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
          <div dangerouslySetInnerHTML={{ __html: item.Table }} />
          <AGTable
            table={item.TableProperties}
            dataSource={dataSource}
            columns={dataColumn}
          />
        </div>
        <div>
          {footNote.map((notes) => {
            return notes && <p style={{ fontSize: "12px" }}>{notes}</p>;
          })}
        </div>
      </>
    );
  };

  const getTocElement = (data, index) => {
    let type = data.derived_section_type;
    let content = data.content;
    let seq_num = data.font_info.roi_id.para;
    if (!content) {
      return null;
    }
    if (type === "table") {
      return getTable(content, "TOC-TABLE");
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
    return <div>{data.map((item) => this.getTocElement(item))}</div>;
  };
  const renderAccordionDetail = (data, index) => {
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
              onMouseEnter={() => setHoverIndex(index)}
              // onMouseLeave={() => this.handleLeave(index)}
            >
              {getTocElement(data, index)}
            </div>
            <div
              // className="no-option"
              className={index === hoverIndex ? "show-option" : "no-option"}
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
    console.log("csalcnlsakcn", page);
    const pageNum = parseInt(page);
    if (pageNum || pageNum === 0) {
      const ele = document.getElementById(`page-${pageNum + 1}`);
      ele.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleSectionClicked = async (section, key) => {
    const page = section.section_metadata.page;
    const arr = cloneDeep(expandedSections);
    const index = arr.indexOf(key);

    if (index > -1) {
      arr.splice(index, 1);
      setExpandedSections(arr);
    } else {
      arr.push(key);
      setExpandedSections(arr);
      const cloneViewData = cloneDeep(data);
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
        dispatch({
          type: ActionTypes.GET_PROTOCOL_VIEW_NEW,
          payload: { id: "", body: true, childString, keyIndex: key },
        });
      }
    }
    scrollToPage(page);
  };
  const renderHeader = (fullData) => {
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
                onClick={() => handleSectionClicked(data[key], key)}
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
              <div
                className="accordion-parent-detail"
                style={{ width: "100%" }}
              >
                <CKEditorComp data={data[key].source_document_content} />
                {"source_document_content" in data[key] &&
                  Object.keys(data[key].source_document_content).map((key2) =>
                    renderAccordionDetail(
                      data[key].source_document_content[key2],
                      key2
                    )
                  )}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })
    );
  };
  console.log("Wrapper Data", data, loader, success);
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
