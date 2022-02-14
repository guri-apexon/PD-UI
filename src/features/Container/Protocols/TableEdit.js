import Table from "./POC-Table/table";
import Modal from "apollo-react/components/Modal";
import { useState } from "react";
import NewTable from "./POC-Table/New-Table";
import Button from "apollo-react/components/Button";

const TableEdit = () => {
  const [modalState, setModalState] = useState(false);
  const [columns, setColumns] = useState(0);
  const [tableColumn, setTableColumn] = useState(0);

  return (
    <div style={{ width: "100%" }}>
      <h3>Add a New Table</h3>
      {tableColumn === 0 && (
        <Button
          variant="primary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10 }}
          onClick={() => setModalState(true)}
        >
          Add Column
        </Button>
      )}
      {/* <button >Add table</button> */}
      <NewTable noOfColumns={tableColumn} />

      <h3 style={{ marginTop: 50 }}>Edit Existing Table</h3>
      <Table />
      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        buttonProps={[{ label: "OKay" }]}
        id="neutral"
      >
        <div style={{ padding: "20px" }}>
          No of Columns:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            onBlur={() => setTableColumn(columns)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TableEdit;
