import { v4 as uuidv4 } from "uuid";

export const getColumns = (column) => {
  const columnLength = parseInt(column);
  let columns = [];
  let dataObj = {};
  for (let i = 0; i < columnLength; i++) {
    let obj = {
      name: i + 1 + ".0",
      header: i + 1 + ".0",
      defaultFlex: 1,
      minWidth: 50,
      render: ({ value }) => {
        console.log("html  =  ", value);
        return (
          <div
            className="value-inside"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        );
      },
    };
    dataObj[obj.name] = "";
    columns.push(obj);
  }
  return columns;
};

export const getColumnFromJSON = (data) => {
  // console.log(data);
  let columns = [];
  let obj = {
    name: "id",
    header: "Id",
    type: "string",
    maxWidth: 0,
    defaultVisible: false,
  };
  columns.push(obj);
  if (data.length > 0) {
    Object.keys(data[0]).map((elm) => {
      let column = {
        name: elm,
        header: elm,
        defaultFlex: 1,
        minWidth: 50,
      };
      columns.push(column);
    });
  }
  // console.log(columns);
  return columns;
};
export const getDataSourceFromJSON = (data) => {
  let dataSource = [];
  for (let i = 0; i < data.length; i++) {
    let row = {};
    row.id = uuidv4();
    Object.keys(data[i]).map((key) => {
      // console.log(data[i][key]);
      row[key] = data[i][key].content;
    });
    dataSource.push(row);
  }
  return dataSource;
  // console.log("Final Data Source", dataSource);
};
