import { useEffect, useState } from "react";

import "./attribute.scss";
import { isEmpty } from "lodash";

import Accordion from "apollo-react/components/Accordion";
import AccordionDetails from "apollo-react/components/AccordionDetails";
import AccordionSummary from "apollo-react/components/AccordionSummary";

const Attributes = ({ data }) => {
  // const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnData] = useState([]);
  const [cellKey, setCellKey] = useState("");
  const [cellValue, setCellValue] = useState("");

  // const onGridReady = useCallback((params) => {
  //   gridRef.current.api.sizeColumnsToFit();
  // }, []);
  // const onCellValueChanged = (event) => {
  //   if (event.oldValue !== event.value) {
  //     console.log(event);
  //   } else {
  //     console.log(`Nothing changed`);
  //   }
  // };
  useEffect(() => {
    const columns = getColumns(data);
    setColumnData(columns);
    setRowData(data);
  }, [data]);
  const getColumns = (data) => {
    let columns = [];
    if (!isEmpty(data)) {
      Object.keys(data).map((key) => {
        let column = {
          flex: 1,
          field: key,
          editable: true,
          rowHeight: "auto",
          autoHeight: true,
          cellClass: "cell-wrap-text",
        };
        columns.push(column);
        // return null;
      });
      return columns;
    }
  };
  const handleTableEdit = (key) => {
    setCellKey(key);
    setCellValue(data[key]);
  };
  const setToDefault = () => {
    setCellKey("");
    setCellValue("");
  };
  console.log(rowData, columnDefs);
  return !isEmpty(rowData) ? (
    <Accordion>
      <AccordionSummary>
        <div className="meta-parent-header">Attributes</div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="attributes-term">
          <div className="ag-theme-alpine-at">
            <table>
              {Object.keys(data).map((key) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td onDoubleClick={() => handleTableEdit(key)}>
                    {cellKey === key ? (
                      <input
                        type="text"
                        value={cellValue}
                        onChange={(e) => setCellValue(e.target.value)}
                        onBlur={() => setToDefault()}
                        style={{ padding: 10 }}
                      />
                    ) : (
                      <span>{data[key]}</span>
                    )}
                  </td>
                </tr>
              ))}
            </table>
            {/* <AgGridReact
              ref={gridRef}
              rowData={[rowData]}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              onCellValueChanged={onCellValueChanged}
              rowSelection={"multiple"}
              domLayout="autoHeight"
              rowDragManaged={true}
              animateRows={true}
            ></AgGridReact> */}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  ) : (
    <div></div>
  );
};

export default Attributes;
