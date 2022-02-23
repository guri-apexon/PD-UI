import Table from "./POC-Table/table";
// import Modal from "apollo-react/components/Modal";
import { useState } from "react";
import NewTable from "./POC-Table/New-Table";
import Button from "apollo-react/components/Button";

const TableEdit = () => {
  // const [modalState, setModalState] = useState(false);
  const [columns, setColumns] = useState(0);
  const [tableColumn, setTableColumn] = useState(0);
  const [showInput, setShowInput] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <h3>Add a New Table</h3>
      {tableColumn === 0 && (
        <Button
          variant="primary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10 }}
          onClick={() => setShowInput(true)}
        >
          Add Table
        </Button>
      )}
      {/* <button >Add table</button> */}
      {tableColumn > 0 && <NewTable noOfColumns={tableColumn} />}
      {showInput && (
        <div style={{ padding: "20px" }}>
          Number of Columns you want to add:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            // onBlur={() => setTableColumn(columns)}
            style={{ marginLeft: 10, padding: 10 }}
          />
          <Button
            variant="primary"
            size="small"
            style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}
            onClick={() => {
              setShowInput(false);
              setTableColumn(columns);
            }}
          >
            Submit
          </Button>
        </div>
      )}
      <h3 style={{ marginTop: 50 }}>Edit Existing Table</h3>
      <Table />
      {/* <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        buttonProps={[{ label: "OKay" }]}
        id="neutral"
      >
        
      </Modal> */}
    </div>
  );
};

export default TableEdit;
