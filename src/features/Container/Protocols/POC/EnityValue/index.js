import { useState } from "react";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { getColumnFromJSON, getDataSourceFromJSON } from "./utils";
import Button from "apollo-react/components/Button/Button";
import "./style.scss";
import Loader from "../../../../Components/Loader/Loader";

import AGTable from "./Table";

const options = [
  {
    name: "--",
    value: "--",
  },
  {
    name: "Molecule",
    value: "Molecule",
  },
  {
    name: "ANY: Organization",
    value: "ANY: Organization",
  },
];

const EntitySearch = ({ id, name, dfsPath }) => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [entityName, setEntityName] = useState("Molecule");
  const [entityValue, setEntityValue] = useState("");
  const fetchData = async () => {
    setLoader(true);
    let url = "";
    if (entityValue) {
      url = `${BASE_URL_8000}/api/segments/get_matching_entity?aidocid=${id}&entity_name=${entityName}}&entity_value=${entityValue}&with_data=true`;
    } else {
      url = `${BASE_URL_8000}/api/segments/get_matching_entity?aidocid=${id}&entity_name=${entityName}&with_data=true`;
    }
    const config = {
      url: url,
      method: "GET",
    };
    const { data, success } = await httpCall(config);
    if (success) {
      setData(data);
      setLoader(false);
    }
  };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
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
            showOptions={false}
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
    let bold = data.font_info.IsBold;

    if (!content) {
      return null;
    }
    if (type === "table") {
      return getTable(content, data, "TOC-TABLE");
    }
    switch (type) {
      case "header":
        return (
          <div
            className="level-3-header"
            id={`TOC-${seq_num}`}
            key={`TOC-${seq_num}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
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
        return bold ? (
          <p
            id={`CPT_section-${seq_num}`}
            key={`CPT_section-${seq_num}`}
            className={`text-para`}
            style={{ fontSize: "12px", fontWeight: "bold" }}
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        ) : (
          <p
            id={`CPT_section-${seq_num}`}
            key={`CPT_section-${seq_num}`}
            className={`text-para`}
            style={{ fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        );
    }
  };
  const renderSubHeader = (data) => {
    const pre = data.source_heading_number;
    const header = data.source_file_section;
    const text = pre + " " + header;
    return (
      <div
        className="level-3-header"
        id={`TOC-${text}`}
        key={`TOC-${text}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  };
  const renderAccordionDetail = (data) => {
    console.log("Data", data);
    if (data.genre === "2_section_metadata") {
      return (
        <div className="option-content-container">
          <div>{renderSubHeader(data)}</div>
        </div>
      );
    } else {
      return (
        <div className="option-content-container">
          <div>{getTocElement(data, data.line_id)}</div>
        </div>
      );
    }
  };
  console.log(data, loader);
  return (
    <div>
      <div className="view-data-container" style={{ marginBottom: 50 }}>
        <div>
          <label>Entity Name: </label>
          <select
            className="entity-name-select"
            onChange={(e) => setEntityName(e.target.value)}
            value={entityName}
          >
            {options.map((item) => {
              return <option>{item.name}</option>;
            })}
          </select>
          <div>
            <label>Entity Value: </label>
            <input
              type="text"
              className="entity-value"
              onChange={(e) => setEntityValue(e.target.value)}
              value={entityValue}
            />
          </div>
          <Button
            variant="primary"
            size="small"
            style={{ margin: 10 }}
            onClick={(e) => fetchData()}
          >
            Search
          </Button>
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
        {!loader && (
          <div className="protocol-column">
            <div
              className="accordion-start-container"
              data-testid="protocol-column-wrapper"
              style={{ marginBottom: 50 }}
            >
              {data &&
                data.map((elem) => {
                  return renderAccordionDetail(elem);
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default EntitySearch;
