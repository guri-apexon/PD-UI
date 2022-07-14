export const generateHeaderID = (page) => {
  return `digi-page-header-${page}`;
};

export const getColumnFromJSON = (data) => {
  // console.log(data);
  let columns = [];
  if (data.length > 0) {
    Object.keys(data[0]).map((elm, i) => {
      if (i === 0) {
        let column = {
          flex: 1,
          field: i + "a",
          editable: true,
          resizable: true,
          rowHeight: "auto",
          cellEditor: "agLargeTextCellEditor",
          autoHeight: true,
          cellClass: "cell-wrap-text",
          // rowDrag: true,
          // cellStyle: { "line-height": "2px" },
          cellRenderer: (params) => {
            // put the value in bold
            if (params.value !== undefined) {
              return (
                <div
                  className="value-inside"
                  dangerouslySetInnerHTML={{ __html: params.value }}
                />
              );
            } else {
              return "";
            }
          },
        };
        columns.push(column);
      } else {
        let column = {
          flex: 1,
          field: i + "a",
          editable: true,
          resizable: true,
          rowHeight: "auto",
          cellEditor: "agLargeTextCellEditor",
          autoHeight: true,
          cellClass: "cell-wrap-text",
          // cellStyle: { "line-height": "2px" },
          cellRenderer: (params) => {
            // put the value in bold
            if (params.value !== undefined) {
              return (
                <div
                  className="value-inside"
                  dangerouslySetInnerHTML={{ __html: params.value }}
                />
              );
            } else {
              return "";
            }
          },
        };
        columns.push(column);
      }
    });
  }
  // console.log(columns);
  return columns;
};
export const getColumnFromJSONNonEdit = (data) => {
  // console.log(data);
  let columns = [];
  if (data.length > 0) {
    Object.keys(data[0]).map((elm, i) => {
      if (i === 0) {
        let column = {
          flex: 1,
          field: i + "a",
          editable: false,
          resizable: true,
          rowHeight: "auto",
          cellEditor: "agLargeTextCellEditor",
          autoHeight: true,
          cellClass: "cell-wrap-text",
          // rowDrag: true,
          // cellStyle: { "line-height": "2px" },
          cellRenderer: (params) => {
            // put the value in bold
            if (params.value !== undefined) {
              return (
                <div
                  className="value-inside"
                  dangerouslySetInnerHTML={{ __html: params.value }}
                />
              );
            } else {
              return "";
            }
          },
        };
        columns.push(column);
      } else {
        let column = {
          flex: 1,
          field: i + "a",
          editable: false,
          resizable: true,
          rowHeight: "auto",
          cellEditor: "agLargeTextCellEditor",
          autoHeight: true,
          cellClass: "cell-wrap-text",
          // cellStyle: { "line-height": "2px" },
          cellRenderer: (params) => {
            // put the value in bold
            if (params.value !== undefined) {
              return (
                <div
                  className="value-inside"
                  dangerouslySetInnerHTML={{ __html: params.value }}
                />
              );
            } else {
              return "";
            }
          },
        };
        columns.push(column);
      }
    });
  }
  // console.log(columns);
  return columns;
};
export const getDataSourceFromJSON = (data) => {
  let dataSource = [];
  for (let i = 0; i < data.length; i++) {
    let row = {};
    Object.keys(data[i]).map((key, index) => {
      // console.log(data[i][key]);
      row[index + "a"] = data[i][key].content;
    });
    dataSource.push(row);
  }
  return dataSource;
  // console.log("Final Data Source", dataSource);
};

export const createFinalTableJSON = (data, format) => {
  let arrFormat = [...format];
  for (let i = 0; i < data.length; i++) {
    Object.keys(arrFormat[i]).map((key, index) => {
      if (data[i][index + "a"] !== undefined) {
        arrFormat[i][key].content = data[i][index + "a"];
      }
    });
  }
  return arrFormat;
};

export const getColumnBySize = (columnSize) => {
  let columns = [];
  if (columnSize > 0) {
    for (let i = 0; i < columnSize; i++) {
      let column = {
        field: i + "a",
        editable: true,
        resizable: true,
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            return (
              <div
                className="value-inside"
                dangerouslySetInnerHTML={{ __html: params.value }}
              />
            );
          } else {
            return "";
          }
        },
      };
      columns.push(column);
    }
  }
  return columns;
};

export const getEmptyRowByColumnSize = (columnSize) => {
  let row = {};
  for (let i = 0; i < columnSize; i++) {
    row[i + "a"] = "";
  }
  return row;
};
export const getEmptyRowTableJSON = (columnSize) => {
  let row = {};
  for (let i = 1; i <= columnSize; i++) {
    row[i + ".0"] = "";
  }
  return row;
};
