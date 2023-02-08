import React, { useMemo, useState } from 'react';
import Table from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';
import Checkbox from 'apollo-react/components/Checkbox';
import Plus from 'apollo-react-icons/Plus';
import moment from 'moment';
import { ValueField, InputKeyField } from './CustomForm';
import { handleDataChangeFun } from './utilFunction';

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  const rowCnst = row.attr_type === 'boolean' ? row[key]?.toString() : row[key];
  const [val, setVal] = useState(rowCnst);
  const [type, setType] = useState(row.attr_type || 'string');
  const dateCnst =
    row.attr_type === 'date' && row.attr_value ? moment(row.attr_value) : null;

  const [dateValue, setDateValue] = useState(dateCnst);
  const handleDataChange = (e) => {
    handleDataChangeFun(e, setType, type, setVal);
  };

  const handleDateChange = (value) => {
    setDateValue(value);
    row.handleChange(row.id, value, 'attr_value');
  };

  const deleteMetaData = () => {
    row.handleDelete(row.id);
  };

  const handleBlur = (e) => {
    row.handleChange(
      row.id,
      e.target.name === 'attr_type' ? type : val,
      e.target.name === 'attr_type' ? 'attr_type' : key,
    );
  };

  const renderKeyField = () => {
    return row.isCustom ? (
      <InputKeyField
        keyName={key}
        inputProps={{ 'data-testid': 'customeform-textField-text' }}
        item={row}
        inputValue={val}
        handleChange={(e) => handleDataChange(e)}
        handleBlur={(e) => handleBlur(e)}
      />
    ) : (
      row[key]
    );
  };

  const renderValueField = () => {
    return key === 'attr_value' ||
      (key === 'note' && row.fieldName !== 'summary') ||
      row.isCustom ? (
      <ValueField
        item={row}
        keyName={key}
        type={type}
        dateValue={dateValue}
        setDateValue={setDateValue}
        inputValue={val}
        setType={setType}
        handleDateChange={handleDateChange}
        handleChange={(e) => handleDataChange(e)}
        handleBlur={(e) => handleBlur(e)}
        deleteMetaData={deleteMetaData}
      />
    ) : (
      row[key] || ''
    );
  };

  return key === 'attr_name' ? renderKeyField() : renderValueField();
}

function MetaDataEditTable({
  data,
  rows,
  setRows,
  deletedAttributes,
  setDeletedAttributes,
}) {
  const { name } = data;
  const [selectedId, setSelectedId] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const columns = [
    {
      header: 'Key',
      accessor: 'attr_name',
      customCell: EditableCell,
    },
    {
      header: 'Value',
      accessor: 'attr_value',
      customCell: EditableCell,
    },
  ];
  const [column, setColumn] = useState(columns);

  const [confidence, setConfidence] = React.useState(false);
  const [note, setNote] = React.useState(false);

  const removeIndex = (key) => {
    setColumn(column.filter((col) => col.accessor !== key));
  };

  const handleConfidence = (e, checked) => {
    setConfidence(checked);
    if (checked) {
      setColumn([
        ...column,
        {
          header: 'Confidence Score',
          accessor: 'confidence',
        },
      ]);
    } else {
      removeIndex('confidence');
    }
  };

  const handleNotes = (e, checked) => {
    setNote(checked);
    if (checked) {
      setColumn([
        ...column,
        {
          header: 'Notes',
          accessor: 'note',
          customCell: EditableCell,
        },
      ]);
    } else {
      removeIndex('note');
    }
  };

  const addNewRow = () => {
    setRows((prevState) => ({
      ...prevState,
      [name]: [
        ...prevState[name],
        {
          id: prevState[name].length + 1,
          isCustom: true,
          attr_name: '',
          attr_value: '',
          attr_type: '',
        },
      ],
    }));
  };

  const handleChange = (id, value, keyName) => {
    setRows((prevState) => ({
      ...prevState,
      [name]: prevState[name].map((list) =>
        list?.id === id
          ? {
              ...list,
              [keyName]:
                list?.attr_type === 'date' && keyName === 'attr_value'
                  ? // eslint-disable-next-line
                    moment(value?._d).format('DD-MMM-YYYY')
                  : value,
            }
          : list,
      ),
    }));
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsModal(true);
  };

  const removeData = () => {
    const filterRows = rows[name].filter((list) => list.id === selectedId);
    setDeletedAttributes([...deletedAttributes, filterRows[0].attr_name]);
    setRows((prevState) => ({
      ...prevState,
      [name]: rows[name].filter((list) => list?.id !== selectedId),
    }));
  };

  const RenderTable = useMemo(() => {
    return (
      <span data-testid="metadata-table">
        <Table
          className="table-panel"
          columns={column}
          rows={rows[name]?.map((row) => ({
            ...row,
            handleChange,
            handleDelete,
            fieldName: name,
          }))}
          rowId="id"
          hidePagination
          hasScroll
          rowProps={{ hover: false }}
          stripedRows
        />
      </span>
    );
    // eslint-disable-next-line
  }, [column, rows[name]?.length]);

  return (
    <div className="digitize-panel-content" data-testid="metadata-table-view">
      <div className="checkbox-right">
        <Checkbox
          label="Notes"
          size="small"
          checked={note}
          onChange={handleNotes}
          className="checkbox-pad metadata-checkbox"
          data-testid="metadata-notes"
        />
        <Checkbox
          label="Confidence Score"
          checked={confidence}
          onChange={handleConfidence}
          size="small"
          className="metadata-checkbox checkbox-pad "
          data-testid="metadata-confidence"
        />
      </div>
      <div>{RenderTable}</div>
      <div className="iconDiv">
        <div
          className="iconContainer"
          data-testid="metadata-add"
          onClick={() => addNewRow()}
          onKeyDown
          role="presentation"
        >
          <Plus />
        </div>
      </div>
      <div className="modal">
        <Modal
          className="modal"
          open={isModal}
          onClose={() => setIsModal(false)}
          title="Please confirm if you want to continue with deletion?"
          buttonProps={[
            { label: 'Cancel' },
            {
              label: 'Delete',
              onClick: () => {
                removeData();
                setIsModal(false);
              },
            },
          ]}
          id="neutral"
        />
      </div>
    </div>
  );
}

MetaDataEditTable.propTypes = {
  data: PropTypes.isRequired,
  rows: PropTypes.isRequired,
  deletedAttributes: PropTypes.isRequired,
  setDeletedAttributes: PropTypes.isRequired,
  setRows: PropTypes.isRequired,
};

Cell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
export default MetaDataEditTable;
