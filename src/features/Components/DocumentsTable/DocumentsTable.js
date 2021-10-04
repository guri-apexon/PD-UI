import Table from "apollo-react/components/Table";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import FileDownload from "js-file-download";
import Loader from "apollo-react/components/Loader";
import { toast } from "react-toastify";
import { userId } from "../../../store/userDetails";

const DownloadLink = ({ row, column: { accessor: key } }) => {
  const [loader, setLoader] = useState(false);
  const userId1 = useSelector(userId);
  console.log("UserID Required", userId1);
  const handleDownload = async (row) => {
    setLoader(true);
    let splitArr = row.documentFilePath.split("\\");
    const fileName = splitArr[splitArr.length - 1];
    console.log(fileName);
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${
        row.documentFilePath
      }&userId=${userId1.substring(1)}&protocol=${row.protocol}`,
      method: "GET",
      responseType: "blob",
    };
    const resp = await httpCall(config);
    if (resp.success) {
      FileDownload(resp.data, fileName);
    } else {
      if (resp.message === "No Access") {
        toast.info("Access Provisioned to Primary Users only");
      } else {
        toast.error("Download Failed");
      }
    }
    setLoader(false);
  };
  return (
    <>
      {loader && <Loader />}
      <p
        className="hyperlink"
        data-testid="documentTable-sourcefile"
        onClick={() => handleDownload(row)}
      >
        {row[key]}
      </p>
    </>
  ); // eslint-disable-line
};
const DateCell = ({ row, column }) => {
  const date = new Date(row[column.accessor]);
  return date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};

const columns = [
  {
    accessor: "fileName",
    header: "Document Name",
    customCell: DownloadLink,
  },
  {
    header: "Uploaded Date",
    accessor: "uploadDate",
    customCell: DateCell,
  },
  {
    header: "Uploaded By",
    accessor: "userName",
  },
];

const DocumentsTable = ({ initialsRow, primaryUser }) => {
  return (
    <Table
      title="Source Document"
      rows={initialsRow}
      columns={columns}
      hidePagination
      maxHeight={160}
    />
  );
};

export default DocumentsTable;
