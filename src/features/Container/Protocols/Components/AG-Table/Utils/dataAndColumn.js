const QC_CHANGE_TYPE = {
  ADDED: "add",
  UPDATED: "modify",
  DELETED: "delete",
};
export const getSourceDataFromProperties = (tableProperties) => {
  let reqFormat = [];
  for (let i = 0; i < tableProperties.length; i++) {
    const obj = {};
    Object.keys(tableProperties[i]).map((key, index) => {
      // debugger;
      if (tableProperties[i][key]) {
        obj.rowID = tableProperties[i][key].roi_id.row_roi_id;
      }
      if (tableProperties[i][key].content) {
        if (tableProperties[i][key].qc_change_type === QC_CHANGE_TYPE.DELETED) {
          obj[
            "col" + (index + 1)
          ] = `<mark><s>${tableProperties[i][key].content}</s></mark>`;
        } else {
          obj["col" + (index + 1)] = tableProperties[i][key].content;
        }
      } else {
        obj["col" + (index + 1)] = "";
      }
    });
    reqFormat.push(obj);
  }
  return reqFormat;
};

export const getColumnInfoFromSourceData = (data) => {
  let cloneObj = { ...data };
  delete cloneObj["rowID"];
  let columns = [];
  const objformat = {
    flex: 1,
    // field: i + "a",
    editable: true,
    resizable: true,
    rowHeight: "auto",
    cellEditor: "agTextCellEditor",
    autoHeight: true,
    cellClass: "cell-wrap-text",
    rowDrag: false,
    hide: false,
    minWidth: 100,
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
  Object.keys(cloneObj).map((key, i) => {
    let obj = {};
    if (i === 0) {
      obj = {
        ...objformat,
        field: key,
        rowDrag: true,
      };
    } else {
      obj = {
        ...objformat,
        field: key,
        rowDrag: false,
      };
    }
    columns.push(obj);
  });
  return columns;
};
export const getColumnInfoFromSourceDataNonEditable = (data) => {
  let cloneObj = { ...data };
  delete cloneObj["rowID"];
  let columns = [];
  const objformat = {
    flex: 1,
    // field: i + "a",
    editable: false,
    resizable: true,
    rowHeight: "auto",
    cellEditor: "agTextCellEditor",
    autoHeight: true,
    cellClass: "cell-wrap-text",
    rowDrag: true,
    hide: false,
    minWidth: 100,
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
  Object.keys(cloneObj).map((key, i) => {
    let obj = {};
    obj = {
      ...objformat,
      field: key,
      rowDrag: false,
    };
    columns.push(obj);
  });
  return columns;
};
