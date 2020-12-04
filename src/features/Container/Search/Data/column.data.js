import CheckBox from "apollo-react/components/Checkbox";
import React from "react";

const CheckBoxCell = ({ row }) => {
  return (
    <div>
      <CheckBox />
    </div>
  );
};

const columns = [
  {
    accessor: "action",
    customCell: CheckBoxCell,
    width: 30,
  },
  {
    header: "Older Version",
    accessor: "olderVersion",
  },
  {
    header: "Source Document",
    accessor: "sourceDocument",
  },
  {
    header: "Upload Date",
    accessor: "uploadDate",
  },
  {
    header: "Version #",
    accessor: "version",
  },
  {
    header: "Document Status",
    accessor: "documentStatus",
  },
];

export default columns;
