import React from "react";
import FilterIcon from "apollo-react-icons/Filter";
import PlusIcon from "apollo-react-icons/Plus";
import Button from "apollo-react/components/Button";
import Table from "apollo-react/components/Table";
import columns from "./columns.data";

const CustomButtonHeader = ({ toggleFilters, clear }) => (
  <div>
    <Button
      size="small"
      variant="primary"
      icon={PlusIcon}
      onClick={() => console.log("Add New User")}
      style={{ marginRight: 8 }}
    >
      New User
    </Button>
    <Button
      size="small"
      variant="secondary"
      icon={FilterIcon}
      onClick={toggleFilters}
    >
      {"Filter"}
    </Button>
  </div>
);

const UsersTable = ({ initialRows }) => {
  return (
    <div style={{ paddingTop: 20 }}>
      <Table
        columns={columns}
        rows={initialRows.map((row) => ({
          ...row,
          key: row.userId,
        }))}
        // onChange={(rowsPerPage, sortedColumn, sortOrder, filters, page) => {
        //   console.log(rowsPerPage, sortedColumn, sortOrder, filters, page);
        //   return initialRows;
        // }}
        initialSortedColumn="createdDate"
        initialSortOrder="desc"
        rowsPerPageOptions={[5, 10, 15]}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `${count === 1 ? "User" : "Users"} ${from}-${to} of ${count}`,
          truncate: true,
        }}
        // showFilterIcon
        CustomHeader={(props) => <CustomButtonHeader {...props} />}
        hasScroll
        maxHeight={345}
      />
    </div>
  );
};

export default UsersTable;
