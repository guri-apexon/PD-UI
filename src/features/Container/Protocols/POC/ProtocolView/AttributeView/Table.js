import { useEffect, useState } from "react";
import "./attribute.scss";
import DatePicker from "apollo-react/components/DatePickerV2";
import moment from "moment";
import { cloneDeep, isEmpty } from "lodash";
import Button from "apollo-react/components/Button/Button";
import { httpCall, BASE_URL_8000 } from "../../../../../../utils/api";

const Attributes = ({ data, id }) => {
  const [cellKey, setCellKey] = useState("");
  const [cellValue, setCellValue] = useState("");
  const [attributeData, setAttributeData] = useState({});
  const [modified, setModified] = useState({});

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
      };

      setModified(cloneModified);
    }
  };
  const handleTableEdit = (key, value) => {
    setCellKey(key);
    setCellValue(value);
  };
  const setToDefault = (key, value) => {
    updateData(key, value);
    setCellKey("");
    setCellValue("");
  };
  const handleDateChange = (key, value) => {
    // console.log("date", moment.utc(value).format("YYYY-MM-DDTHH:mm:ss"));
    updateData(key, moment.utc(value).format("YYYY-MM-DDTHH:mm:ss"));
    setCellKey("");
    setCellValue("");
  };
  const formatdate = (date) => {
    return moment(date).format("DD-MMM-YYYY");
  };
  const saveData = async () => {
    try {
      const config = {
        url: `${BASE_URL_8000}/api/segments/put_document_attributes`,
        method: "put",
        data: {
          attributes: modified,
          user_id: "u1072234",
          aidocid: id,
        },
      };
      const { data } = await httpCall(config);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("EDIT Changes", attributeData);
  console.log("Modified", modified);
  return (
    <div>
      {!isEmpty(modified) && (
        <Button onClick={() => saveData()}>Save Changes</Button>
      )}
      {/* <div className="meta-parent-header">Attributes</div> */}
      <div className="attributes-term">
        <div className="ag-theme-alpine-at">
          <table>
            {Object.keys(attributeData).map((key) => (
              <tr key={key}>
                <th>{attributeData[key].display_name}</th>
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
                        type="text"
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
