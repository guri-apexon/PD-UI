import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "apollo-react/components/Loader";
import FilterIcon from "apollo-react-icons/Filter";
import PlusIcon from "apollo-react-icons/Plus";
import Button from "apollo-react/components/Button";
import Table from "apollo-react/components/Table";
import NewUser from "./NewUser";

import { loader, setModalToggle } from "./adminSlice";

import columns from "./columns.data";

const CustomButtonHeader = ({ toggleFilters, setIsOpen }) => (
  <div data-testid="user-action-buttons">
    <Button
      size="small"
      variant="primary"
      icon={PlusIcon}
      onClick={() => setIsOpen(true)}
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
  const dispatch = useDispatch();

  const isLoading = useSelector(loader);
  const [editedRow, setEditedRow] = useState({});
  const onRowEdit = (userId) => {
    setEditedRow(initialRows.find((row) => row.username === userId));
  };
  const setIsOpen = (value) => {
    dispatch(setModalToggle(value));
  };
  const onRowSave = () => {
    let confirmBox = window.confirm(
      "Do you want to save the modified details?"
    );
    if (confirmBox) {
      dispatch({ type: "UPDATE_USER_SAGA", payload: editedRow });
      setEditedRow({});
    } else {
      setEditedRow({});
    }
  };

  const onCancel = () => {
    setEditedRow({});
  };

  const editRow = (key, value) => {
    setEditedRow({ ...editedRow, [key]: value });
  };

  const onDelete = (userId) => {
    let confirmBox = window.confirm("Do you want to delete the Selected User?");
    if (confirmBox) {
      dispatch({ type: "DELETE_USER_SAGA", payload: userId });
    }
  };

  return (
    <div style={{ paddingTop: 20 }}>
      {isLoading && <Loader />}
      <Table
        columns={columns}
        rows={initialRows.map((row) => ({
          ...row,
          onRowEdit,
          onRowSave,
          onCancel,
          onDelete,
          editRow,
          editMode: editedRow.username === row.username,
          editedRow,
          key: row.username,
        }))}
        // onChange={(rowsPerPage, sortedColumn, sortOrder, filters, page) => {
        //   console.log(rowsPerPage, sortedColumn, sortOrder, filters, page);
        //   return initialRows;
        // }}
        initialSortedColumn="date_of_registration"
        initialSortOrder="desc"
        rowsPerPageOptions={[5, 10, 15]}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `${count === 1 ? "User" : "Users"} ${from}-${to} of ${count}`,
          truncate: true,
        }}
        // showFilterIcon
        CustomHeader={(props) => (
          <CustomButtonHeader setIsOpen={setIsOpen} {...props} />
        )}
        hasScroll
        maxHeight={345}
      />
      <NewUser setIsOpen={setIsOpen} />
    </div>
  );
};

export default UsersTable;
