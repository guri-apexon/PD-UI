import { useEffect, useState } from "react";
import DatePicker from "apollo-react/components/DatePickerV2";
import moment from "moment";
import { cloneDeep, isEmpty } from "lodash";
import Button from "apollo-react/components/Button/Button";
import { httpCall, BASE_URL_8000 } from "../../../../../../utils/api";
import { toast } from "react-toastify";

const Attributes = ({ data, id, fetchData }) => {
  const [cellKey, setCellKey] = useState("");
  const [cellValue, setCellValue] = useState("");
  const [cellKeyHeader, setCellKeyHeader] = useState("");
  const [cellValueHeader, setCellValueHeader] = useState("");
  const [attributeData, setAttributeData] = useState({});
  const [modified, setModified] = useState({});
  // const [newRowTitle, setNewRowTitle] = useState("");
  // const [newRowValue, setNewRowValue] = useState("");
  const [indexRow, setIndexRow] = useState(100);

  useEffect(() => {
    setAttributeData(data);
  }, [data]);

  const updateData = (key, value) => {
    if (attributeData[key].value !== value) {
      let cloneData = cloneDeep(attributeData);
      cloneData[key].value = value;
      setAttributeData(cloneData);

      let cloneModified = cloneDeep(modified);

      cloneModified[key] = {
        display_name: cloneData[key].display_name,
        value: value,
        data_type: cloneData[key].data_type,
        qc_change:
          "qc_change" in cloneData[key] ? cloneData[key].qc_change : "",
      };

      setModified(cloneModified);
    }
  };
  const updateDataHeader = (key, value) => {
    // const newKey = value.split(" ").join("_").toLowerCase();
    if (attributeData[key].display_name !== value) {
      let cloneData = cloneDeep(attributeData);
      cloneData[key].display_name = value;
      setAttributeData(cloneData);

      let cloneModified = cloneDeep(modified);

      cloneModified[key] = {
        display_name: value,
        value: cloneData[key].value,
        data_type: cloneData[key].data_type,
        qc_change: cloneData[key].qc_change,
      };

      setModified(cloneModified);
    }
  };
  const handleTableEditHeader = (key, value) => {
    setCellKeyHeader(key);
    setCellValueHeader(value);
  };
  const handleTableEdit = (key, value) => {
    setCellKey(key);
    setCellValue(value);
  };
  const setToDefaultHeader = (key, value) => {
    updateDataHeader(key, value);
    setCellKeyHeader("");
    setCellValueHeader("");
  };
  const setToDefault = (key, value) => {
    updateData(key, value);
    setCellKey("");
    setCellValue("");
  };
  const handleDateChange = (key, value) => {
    updateData(key, moment.utc(value).format("YYYY-MM-DDTHH:mm:ss"));
    setCellKey("");
    setCellValue("");
  };
  const formatdate = (date) => {
    return moment(date).format("DD-MMM-YYYY");
  };
  const getModifiedObj = (modified) => {
    let newModified = {};
    for (let key of Object.keys(modified)) {
      if (modified[key].qc_change === "add") {
        const newKey = modified[key].display_name
          .split(" ")
          .join("_")
          .toLowerCase();
        newModified[newKey] = { ...modified[key] };
      } else {
        newModified[key] = { ...modified[key] };
      }
    }
    return newModified;
  };
  const saveData = async () => {
    const modifiedObj = getModifiedObj(modified);
    console.log("Modified Obj", modifiedObj);
    try {
      const config = {
        url: `${BASE_URL_8000}/api/segments/put_document_attributes`,
        method: "put",
        data: {
          attributes: modifiedObj,
          user_id: "u1072234",
          aidocid: id,
        },
      };
      const { data } = await httpCall(config);
      console.log(data);
      fetchData();
      setModified({});
      toast.success("Successfully Saved the Changes.");
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddAttributes = () => {
    const cloneData = { ...attributeData };
    const obj = {
      data_type: "string",
      display_name: "Attribute Name",
      value: "Attribute Value",
      qc_change: "add",
    };
    cloneData[indexRow] = obj;
    // const finalObj = { ...data, obj };
    setAttributeData(cloneData);
    console.log(cloneData);
    setIndexRow(indexRow - 1);
  };
  console.log("Modified", modified);
  return (
    <div>
      <div className="attribute-button">
        {!isEmpty(modified) && (
          <Button onClick={() => saveData()}>Save Changes</Button>
        )}
        <Button onClick={() => handleAddAttributes()}>Add Attributes</Button>
      </div>

      {/* <div className="meta-parent-header">Attributes</div> */}
      <div className="attributes-term">
        <div className="ag-theme-alpine-at">
          <table>
            {Object.keys(attributeData).map((key) => (
              <tr key={key}>
                {"qc_change" in attributeData[key] &&
                attributeData[key].qc_change === "add" ? (
                  <th
                    onDoubleClick={() =>
                      handleTableEditHeader(
                        key,
                        attributeData[key].display_name
                      )
                    }
                  >
                    {cellKeyHeader === key ? (
                      <textarea
                        value={cellValueHeader}
                        onChange={(e) => setCellValueHeader(e.target.value)}
                        onBlur={() => setToDefaultHeader(key, cellValueHeader)}
                        style={{ padding: 10, width: "90%", fontSize: 14 }}
                        rows={3}
                        autoFocus
                      />
                    ) : (
                      <span>{attributeData[key].display_name}</span>
                    )}
                  </th>
                ) : (
                  <th>{attributeData[key].display_name}</th>
                )}
                <td
                  onDoubleClick={() =>
                    handleTableEdit(key, attributeData[key].value)
                  }
                >
                  {cellKey === key ? (
                    attributeData[key].data_type === "date" ? (
                      <DatePicker
                        defaultValue={moment()}
                        dateFormat={"DD-MMM-YYYY"}
                        placeholder="DD-MMM-YYYY"
                        value={moment(cellValue)}
                        onInputChange={(value) => handleDateChange(key, value)}
                        // label="Signup Date"
                        // helperText="Please select date of signing up"
                      />
                    ) : (
                      <textarea
                        value={cellValue}
                        onChange={(e) => setCellValue(e.target.value)}
                        onBlur={() => setToDefault(key, cellValue)}
                        style={{ padding: 10, width: "90%", fontSize: 14 }}
                        rows={3}
                        autoFocus
                      />
                    )
                  ) : (
                    <span>
                      {attributeData[key].data_type === "date"
                        ? formatdate(attributeData[key].value)
                        : attributeData[key].value}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {/* <tr>
              <th>
                <textarea
                  value={newRowTitle}
                  onChange={(e) => setNewRowTitle(e.target.value)}
                  style={{ padding: 10, width: "90%", fontSize: 14 }}
                  rows={3}
                  autoFocus
                />
              </th>
              <td>
                <textarea
                  value={newRowValue}
                  onChange={(e) => setNewRowValue(e.target.value)}
                  style={{ padding: 10, width: "90%", fontSize: 14 }}
                  rows={3}
                  autoFocus
                />
              </td>
            </tr> */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
