import React, { useEffect, useMemo, useState } from 'react';
import Table from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';
import Checkbox from 'apollo-react/components/Checkbox';
import Plus from 'apollo-react-icons/Plus';
import moment from 'moment';
import { ValueField, InputKeyField } from './CustomForm';

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  const [val, setVal] = useState(row[key]);
  const [dateValue, setDateValue] = useState(moment(row[key]));
  const [type, setType] = useState(row.type || 'String');
  const handleDataChange = (e) => {
    if (e?.target?.name === 'type') {
      setType(e.target.value);
    } else if (type === 'Date') {
      setVal(dateValue);
    } else {
      setVal(e.target.value);
    }
  };

  const deleteMetaData = () => {
    row.handleDelete(row.id);
  };

  const handleBlur = (e) => {
    row.handleChange(
      row.id,
      e.target.name === 'type' ? type : val,
      type === 'Date' ? 'attr_value' : e.target.name,
    );
  };

  // console.log('dateValue--->', dateValue);

  const renderKeyField = () => {
    return row.isCustom ? (
      <InputKeyField
        key={key}
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
    return key === 'attr_value' || row.isCustom ? (
      <ValueField
        item={row}
        key={key}
        type={type}
        dateValue={dateValue}
        setDateValue={setDateValue}
        inputValue={val}
        setType={setType}
        handleChange={(e) => handleDataChange(e)}
        handleBlur={(e) => handleBlur(e)}
        deleteMetaData={deleteMetaData}
      />
    ) : (
      row[key]
    );
  };

  return key === 'attr_name' || key === 'note'
    ? renderKeyField()
    : renderValueField();
}

function MetaDataEditTable({ rows, setRows, data }) {
  const { _meta_data, name } = data;
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
  const reArrangeColumn = (data) => {
    let index;
    for (let i = 0; i < data.length; i++) {
      if (Object.values(data[i])[1] === 'isCustom') {
        index = i;
      }
    }
    const obj = data[index];
    data.splice(index, 1);
    data.push(obj);
    setColumn(data);
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
      // reArrangeColumn();
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
      // reArrangeColumn();
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
          type: '',
        },
      ],
    }));
  };

  const handleChange = (id, value, keyName) => {
    // console.log(keyName);
    setRows((prevState) => ({
      ...prevState,
      [name]: prevState[name].map((list) =>
        list?.id === id
          ? {
              ...list,
              [keyName]:
                list?.type === 'Date' && keyName === 'attr_value'
                  ? moment(value).format('DD-MMM-YYYY')
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
    setRows((prevState) => ({
      ...prevState,
      [name]: rows[name].filter((list) => list?.id !== selectedId),
    }));
  };

  const RenderTable = useMemo(() => {
    return (
      <Table
        data-testid="metadata-table"
        className="table-panel"
        columns={column}
        rows={rows[name]?.map((row) => ({
          ...row,
          handleChange,
          handleDelete,
        }))}
        rowId="id"
        hidePagination
        hasScroll
        rowProps={{ hover: false }}
        stripedRows
      />
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
        <div className="iconContainer">
          <Plus data-testid="metadata-add" onClick={() => addNewRow()} />
        </div>
      </div>
      <div className="modal">
        <Modal
          className="modal"
          open={isModal}
          onClose={() => setIsModal(false)}
          // title="Header"
          title="Do you really want to delete?"
          buttonProps={[
            {
              label: 'Yes',
              onClick: (e) => {
                removeData();
                setIsModal(false);
              },
            },
            { label: 'No' },
          ]}
          id="neutral"
        />
      </div>
    </div>
  );
}

MetaDataEditTable.propTypes = {
  rows: PropTypes.isRequired,
  setRows: PropTypes.isRequired,
  data: PropTypes.isRequired,
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
