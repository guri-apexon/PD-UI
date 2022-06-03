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
    value: "",
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
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [entityName, setEntityName] = useState("");
  const [entityValue, setEntityValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const fetchData = async (e) => {
    e.preventDefault();
    setLoader(true);
    let url = "";
    if (entityValue) {
      url = `${BASE_URL_8000}/api/segments/get_matching_entity?aidocid=${id}&entity_name=${entityName}&entity_value=${entityValue}&with_data=true`;
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
      setSearchText(entityValue);
    } else {
      setData([]);
      setLoader(false);
      setError(true);
    }
  };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  const getContentWithHighLight = (content) => {
    const regex = new RegExp(searchText, "gi");
    const newText = content.replace(regex, `<mark class="highlight">$&</mark>`);
    return newText;
  };
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
            dangerouslySetInnerHTML={{
              __html: searchText ? getContentWithHighLight(content) : content,
            }}
          ></p>
        ) : (
          <p
            id={`CPT_section-${seq_num}`}
            key={`CPT_section-${seq_num}`}
            className={`text-para`}
            style={{ fontSize: "12px" }}
            dangerouslySetInnerHTML={{
              __html: searchText ? getContentWithHighLight(content) : content,
            }}
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
  const handleSearchCriteria = (value) => {
    for (let i = 0; i < options.length; i++) {
      if (value === options[i].name) {
        setEntityName(options[i].value);
      }
    }
  };
  console.log(data, loader);
  return (
    <div>
      <div className="view-data-container" style={{ marginBottom: 50 }}>
        <form onSubmit={fetchData} className="pt-form">
          <div className="pt-search-select">
            <label>Entity Name: </label>
            <select
              className="pt-select"
              onChange={(e) => handleSearchCriteria(e.target.value)}
              value={entityName}
            >
              {options.map((item) => {
                return <option>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="pt-search-header">
            <label>Entity Value: </label>
            <input
              type="text"
              onChange={(e) => setEntityValue(e.target.value)}
              value={entityValue}
            />
          </div>
          <Button
            variant="primary"
            size="small"
            style={{ margin: 10 }}
            onClick={(e) => fetchData(e)}
          >
            Search
          </Button>
        </form>
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
        {!loader && data.length > 0 && (
          <div className="protocol-column-pt">
            <div
              className="accordion-start-container"
              data-testid="protocol-column-wrapper"
              style={{ marginBottom: 50 }}
            >
              {data.map((elem) => {
                return renderAccordionDetail(elem);
              })}
            </div>
          </div>
        )}
        {error && (
          <div
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <h2>No Data Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default EntitySearch;