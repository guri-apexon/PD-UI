import Table from "apollo-react/components/Table";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import { BASE_URL_8000, UI_URL } from "../../../utils/api";

import Checkbox from "apollo-react/components/Checkbox";
// const Cell = ({ row, column }) => (
//   <a href={row.documentFilePath} target="_blank">
//     {row.fileName}
//   </a>
// );

const ActionCell = ({ row }) => {
  // console.log("....RoW........", row);
  return (
    <div>
      <div className="table-selection">
        <Checkbox
          label=""
          checked={
            row.protocolSelected.length > 0 &&
            row.protocolSelected.includes(row.id)
          }
          onChange={() => row.setProtocolToDownload(row.id)}
        />
      </div>
    </div>
  );
};

const DownloadLink = ({ row, column: { accessor: key } }) => {
  let url;
  const handleDownload = async (row) => {
    // console.log("Rows", row);
    // const resp = await axios.get(
    //   `http://ca2spdml01q:8000/api/download_file/?filePath=${row.documentFilePath}`
    // );

    // url = `http://ca2spdml06d:3000/${resp.data}`;

    const resp = await axios.get(
      `${BASE_URL_8000}/api/download_file/?filePath=${row.documentFilePath}`
    );

    url = `${UI_URL}/${resp.data}`;
    let encodeUrl = encodeURI(url);
    let myWindow = window.open("about:blank", "_blank");
    myWindow.document.write(
      `<embed src=${encodeUrl} frameborder="0" width="100%" height="100%">`
    );
    // window.open(
    //   url,
    //   "_blank" // <- This is what makes it open in a new window.
    // );
    // console.log(url);
  };
  return (
    <p className="hyperlink" onClick={() => handleDownload(row)}>
      {row[key]}
    </p>
  ); // eslint-disable-line
};
// const VersionCell = ({ row, column }) => (
//   <a href="/" target="_blank">
//     {row.VersionNumber}
//   </a>
// );

const VersionCell = ({ row, column }) => {
  let history = useHistory();
  const onHandleChange = (row) => {
    row.handleChangeTab("", 0);
    history.push(`/protocols?protocolId=${row["id"]}`);
  };
  return (
    <>
      {row.versionNumber ? (
        <p className="hyperlink" onClick={() => onHandleChange(row)}>
          {" "}
          {row.versionNumber}
        </p>
      ) : (
        "-"
      )}
    </>
  );
};
const Cell = ({ row, column: { accessor: key } }) => {
  return <>{row[key] ? row[key] : "-"}</>;
};

const StatusCell = ({ row, column: { accessor: key } }) => {
  return <span className="text-capitalize">{row[key] ? row[key] : "-"}</span>;
};

const DateCell = ({ row, column }) => {
  const date = new Date(row[column.accessor]);
  if (row[column.accessor]) {
    return date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  } else {
    return "-";
  }
};
const columns = [
  {
    accessor: "action",
    customCell: ActionCell,
    width: "3%",
  },
  {
    accessor: "versionNumber",
    header: "Associated Versions",
    customCell: VersionCell,
  },
  {
    accessor: "draftVersion",
    header: "Draft#",
    customCell: Cell,
  },
  {
    accessor: "fileName",
    header: "Source Document",
    customCell: DownloadLink,
  },
  {
    header: "Uploaded Date",
    accessor: "uploadDate",
    customCell: DateCell,
  },
  {
    header: "Approval Date",
    accessor: "approvalDate",
    customCell: DateCell,
  },
  {
    header: "Document Status",
    accessor: "documentStatus",
    customCell: StatusCell,
  },
];
const noActionColumns = [
  {
    accessor: "versionNumber",
    header: "Associated Versions",
    customCell: VersionCell,
  },
  {
    accessor: "draftVersion",
    header: "Draft#",
    customCell: Cell,
  },
  {
    accessor: "fileName",
    header: "Source Document",
    customCell: DownloadLink,
  },
  {
    header: "Uploaded Date",
    accessor: "uploadDate",
    customCell: DateCell,
  },
  {
    header: "Approval Date",
    accessor: "approvalDate",
    customCell: DateCell,
  },
  {
    header: "Document Status",
    accessor: "documentStatus",
    customCell: StatusCell,
  },
];

const AssociateDocumentsTable = ({
  initialsRow,
  handleChangeTab,
  protocolSelected,
  setProtocolToDownload,
  showCheckbox,
}) => {
  // console.log("initialsRow :", initialsRow);

  // return (
  //   <Table
  //   title="Associated Documents"
  //   rows={initialsRow}
  //   columns={columns}
  //   initialSortOrder="asc"
  //   initialSortedColumn="fileName"
  //   />
  // );
  return (
    <div
      className="associate11-document-tab"
      data-testid="associate-document-tab"
    >
      <Table
        title="Associated Documents"
        rows={initialsRow.map((row) => {
          let temp = cloneDeep(row);
          let details = {
            key: row.id,
            handleChangeTab,
            protocolSelected,
            setProtocolToDownload,
          };
          return merge(temp, details);
        })}
        columns={showCheckbox ? columns : noActionColumns}
        rowsPerPageOptions={[5, 10, "All"]}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `${
              count === 1 ? "Document" : "Documents"
            } ${from}-${to} of ${count}`,
          truncate: true,
        }}
        defaultRowsPerPage={5}
        hasScroll
        maxHeight={350}
      />
    </div>
  );
};

export default AssociateDocumentsTable;
