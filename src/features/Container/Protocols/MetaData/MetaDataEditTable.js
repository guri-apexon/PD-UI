import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import Modal from 'apollo-react/components/Modal';
import Checkbox from 'apollo-react/components/Checkbox';
import IconButton from 'apollo-react/components/IconButton';
import Plus from 'apollo-react-icons/Plus';
import Close from 'apollo-react-icons/Close';
import moment from 'moment';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import { ValueField, InputKeyField } from './CustomForm';
import METADATA_CONSTANTS from './constants';
import { loggedUser } from '../../../../store/userDetails';
import { USERTYPE } from '../../../../AppConstant/AppConstant';

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  const [val, setVal] = useState(
    row.attr_type === 'boolean' ? row[key]?.toString() : row[key],
  );
  const [type, setType] = useState(row.attr_type || 'string');
  const [dateValue, setDateValue] = useState(
    row.attr_type === 'date' && row.attr_value ? moment(row.attr_value) : null,
  );

  const handleDataChange = (e) => {
    if (e?.target?.name === 'attr_type') {
      setType(e.target.value ? e.target.value : 'string');
      setVal('');
      setDateValue('');
    } else {
      setVal(e?.target?.value);
    }
  };

  const handleDateChange = (value) => {
    setDateValue(value);
    row.handleChange(row.id, value, 'attr_value');
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
    return ['attr_value'].includes(key) ||
      METADATA_CONSTANTS.COLUMN_KEYS.includes(key) ? (
      <ValueField
        keyName={key}
        type={type}
        dateValue={dateValue}
        inputValue={val}
        attrStatus={row?.attr_status}
        setDateValue={setDateValue}
        setType={setType}
        handleDateChange={handleDateChange}
        handleChange={(e) => handleDataChange(e)}
        handleBlur={(e) => handleBlur(e)}
      />
    ) : (
      row[key] || ''
    );
  };

  return key === 'display_name' ? renderKeyField() : renderValueField();
}

function DeleteCell({ row }) {
  const deleteMetaData = () => {
    row.handleDelete(row.id);
  };
  return (
    !row?.is_default && (
      <Grid className="delContainer">
        <IconButton onClick={deleteMetaData} data-testid="metadata-row-delete">
          <Close fontSize="small" className="crossButton" />
        </IconButton>
      </Grid>
    )
  );
}

function MetaDataEditTable({ data, rows, setRows }) {
  const userDetails = useSelector(loggedUser);
  const { formattedName } = data;
  const [selectedId, setSelectedId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [userFilterList, setUserFilterList] = useState([]);

  const columns = [
    {
      header: 'Key',
      accessor: 'display_name',
      customCell: EditableCell,
    },
    {
      header: 'Value',
      accessor: 'attr_value',
      customCell: EditableCell,
    },
    {
      header: '',
      accessor: 'delete',
      customCell: DeleteCell,
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
      const copyColumn = [...column];
      copyColumn.splice(column.length - 1, 0, {
        header: 'Confidence Score',
        accessor: 'confidence',
        customCell: EditableCell,
      });
      setColumn(copyColumn);
    } else {
      removeIndex('confidence');
    }
  };

  const handleNotes = (e, checked) => {
    setNote(checked);
    if (checked) {
      const copyColumn = [...column];
      copyColumn.splice(column.length - 1, 0, {
        header: 'Notes',
        accessor: 'note',
        customCell: EditableCell,
      });
      setColumn(copyColumn);
    } else {
      removeIndex('note');
    }
  };

  const addNewRow = () => {
    setRows((prevState) => ({
      ...prevState,
      [formattedName]: [
        ...prevState[formattedName],
        {
          id: prevState[formattedName].length + 1,
          isCustom: true,
          attr_name: '',
          attr_value: '',
          attr_type: '',
          attr_status: 'add',
          is_active: true,
          is_default: false,
        },
      ],
    }));
  };

  const getValue = (list, keyName, value) => {
    let attrValue = list?.attr_value;
    if (keyName === 'attr_value') {
      attrValue =
        list?.attr_type === 'date'
          ? // eslint-disable-next-line
            moment(value?._d).format('DD-MMM-YYYY')
          : value;
    }
    return attrValue;
  };
  useEffect(() => {
    if (!userFilterList.length) {
      setUserFilterList(
        rows[formattedName].filter(
          (x) => x.attr_value === '' || x.attr_value === null || !x.is_active,
        ),
      );
    }
  }, [rows[formattedName]]);

  const handleChange = (id, value, keyName) => {
    setRows((prevState) => ({
      ...prevState,
      [formattedName]: prevState[formattedName].map((list) =>
        list?.id === id && value !== '' && value !== null
          ? {
              ...list,
              attr_type: keyName === 'attr_type' ? value : list.attr_type,
              attr_value:
                keyName === 'attr_type' ? '' : getValue(list, keyName, value),
              attr_name: keyName === 'display_name' ? value : list?.attr_name,
              display_name:
                keyName === 'display_name' ? value : list?.display_name,
              note: keyName === 'note' ? value : list?.note,
              confidence: keyName === 'confidence' ? value : list?.confidence,
              attr_status: list?.attr_id ? 'add' : list?.attr_status,
            }
          : list,
      ),
    }));
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsModal(true);
  };

  const onSelectChange = (e) => {
    const newArray = rows[formattedName].map((element) => {
      if (element.display_name === e.target.value) {
        return { ...element, attr_status: 'add' };
      }
      return element;
    });
    const obj = newArray.find((x) => x.display_name === e.target.value);
    const changedArr = [
      ...newArray.filter((x) => x.display_name !== e.target.value),
      obj,
    ];

    setRows((prevState) => ({
      ...prevState,
      [formattedName]: changedArr,
    }));

    setUserFilterList(
      userFilterList.filter((x) => x.display_name !== e.target.value),
    );
  };
  const removeData = () => {
    const findRow = rows[formattedName].find((list) => list.id === selectedId);
    if (findRow.isCustom) {
      rows[formattedName] = rows[formattedName].filter(
        (list) => list?.id !== selectedId,
      );
      setRows((prevState) => ({
        ...prevState,
        [formattedName]: rows[formattedName]?.map((attr, index) => {
          return {
            ...attr,
            id: index + 1,
          };
        }),
      }));
    } else {
      const newArray = rows[formattedName].map((element) => {
        if (element.id === selectedId) {
          return { ...element, attr_status: 'edit', attr_value: '' };
        }
        return element;
      });
      setUserFilterList([
        ...userFilterList,
        newArray.find((x) => x.id === selectedId),
      ]);

      setRows((prevState) => ({
        ...prevState,
        [formattedName]: newArray,
      }));
    }
  };

  const RenderTable = useMemo(() => {
    return (
      <span data-testid="metadata-table">
        <Table
          className="table-panel"
          columns={column}
          rows={rows[formattedName]
            .filter(
              (x) =>
                (x.attr_value !== '' &&
                  x.attr_value !== null &&
                  x.attr_value !== 'undefined' &&
                  x.is_active) ||
                x?.attr_status === 'add',
            )
            .map((row) => ({
              ...row,
              handleChange,
              handleDelete,
              fieldName: formattedName,
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
  }, [column, rows[formattedName]]);

  const RenderEditableRow = useMemo(() => {
    return (
      <div className="keySelect">
        <Select
          placeholder="Select Key"
          label=""
          name="inputFilter"
          data-testid="metadata-select-add"
          fullWidth
          onChange={(e) => onSelectChange(e)}
          inputProps={{
            'data-testid': 'inputFilterList',
          }}
        >
          {userFilterList.map((e) => (
            <MenuItem key={e.attr_name} value={e.display_name}>
              {e.display_name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }, [userFilterList]);

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
      <div className="parent-editable">
        {RenderEditableRow}
        <div className="child-editable">
          <div className="iconDiv">
            {userDetails.user_type === USERTYPE.ADMIN && (
              <div
                className="iconContainer"
                data-testid="metadata-add"
                onClick={() => addNewRow()}
                onKeyDown
                role="presentation"
              >
                <Plus />
              </div>
            )}
          </div>
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
DeleteCell.propTypes = {
  row: PropTypes.isRequired,
};
export default MetaDataEditTable;
