import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import Modal from 'apollo-react/components/Modal';
import Checkbox from 'apollo-react/components/Checkbox';
import IconButton from 'apollo-react/components/IconButton';
import Plus from 'apollo-react-icons/Plus';
import Trash from 'apollo-react-icons/Trash';
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

  const [type, setType] = useState(
    row.attr_type && key === 'attr_value' ? row.attr_type : 'string',
  );
  const [dateValue, setDateValue] = useState(
    row.attr_type === 'date' && row.attr_value ? moment(row.attr_value) : null,
  );

  const handleDataChange = (e) => {
    if (e?.target?.name === 'attr_type') {
      setType(e.target.value ? e.target.value : 'string');
      setVal('');
      setDateValue('');
    } else if (type === 'integer') {
      if (/^[^.]*\d+$/.test(e?.target?.value)) {
        setVal(e?.target?.value);
      }
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
        attrDisabled={row?.is_attr_disabled}
        setDateValue={setDateValue}
        setType={setType}
        handleDateChange={handleDateChange}
        handleChange={(e) => handleDataChange(e)}
        handleBlur={(e) => handleBlur(e)}
        possibleValues={row?.possible_values?.values}
      />
    ) : (
      row[key] || ''
    );
  };

  return key === 'display_name' ? renderKeyField() : renderValueField();
}

function DeleteCell({ row }) {
  const deleteHardMetadata = () => {
    row.handleHardDelete(row.id);
  };
  const userDetails = useSelector(loggedUser);

  return (
    <Grid className="delContainer">
      {userDetails.user_type === USERTYPE.ADMIN && (
        <IconButton
          data-testid="metadata-row-delete-admin"
          className="trashButtonsvg"
          onClick={deleteHardMetadata}
        >
          <Trash fontSize="small" className="trashButton" />
        </IconButton>
      )}
    </Grid>
  );
}

function MetaDataEditTable({
  data,
  rows,
  setRows,
  setDeletedAttributes,
  deletedAttributes,
}) {
  const userDetails = useSelector(loggedUser);
  const { formattedName } = data;
  const [selectedHardId, setSelectedHardId] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
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
  ];
  const [column, setColumn] = useState(columns);

  const [confidence, setConfidence] = React.useState(false);
  const [note, setNote] = React.useState(false);

  const removeIndex = (key) => {
    setColumn(column.filter((col) => col.accessor !== key));
  };

  useEffect(() => {
    if (userDetails)
      if (userDetails.user_type === USERTYPE.ADMIN) {
        const copyColumn = [...column];
        setColumn([
          ...copyColumn,
          {
            header: '',
            accessor: 'delete',
            customCell: DeleteCell,
          },
        ]);
      }
    // eslint-disable-next-line
  }, [userDetails]);

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
          is_attr_disabled: true,
        },
      ],
    }));
  };
  useEffect(() => {
    if (!userFilterList.length) {
      setUserFilterList(
        rows[formattedName].filter(
          (x) => x.attr_value === '' || x.attr_value === null || !x.is_active,
        ),
      );
    }
    // eslint-disable-next-line
  }, []);

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
    // eslint-disable-next-line
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
              is_attr_disabled: list?.is_attr_disabled,
            }
          : list,
      ),
    }));
  };

  const handleHardDelete = (id) => {
    setSelectedHardId(id);
    setIsDeleteModal(true);
  };

  const onSelectChange = (e) => {
    const newArray = rows[formattedName].map((element) => {
      if (element.display_name === e.target.value) {
        return {
          ...element,
          attr_status: 'add',
          is_attr_disabled: true,
        };
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

  const hardDeleteMetaField = () => {
    const findRow = rows[formattedName].find(
      (list) => list.id === selectedHardId,
    );
    setDeletedAttributes([...deletedAttributes, findRow.attr_name]);
    if (findRow.isCustom) {
      rows[formattedName] = rows[formattedName].filter(
        (list) => list?.id !== selectedHardId,
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
      const newArray = rows[formattedName].filter(
        (element) => element.id !== selectedHardId,
      );

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
                  x.attr_status !== 'delete' &&
                  x.attr_value !== null &&
                  x.attr_value !== 'undefined' &&
                  x.is_active) ||
                x?.attr_status === 'add',
            )
            .map((row) => ({
              ...row,
              handleChange,
              handleHardDelete,
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
            <MenuItem key={e?.attr_name} value={e?.display_name}>
              {e?.display_name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
    // eslint-disable-next-line
  }, [userFilterList, rows]);

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
        </div>
      </div>

      <div className="modal">
        <Modal
          className="modal"
          open={isDeleteModal}
          onClose={() => setIsDeleteModal(false)}
          title="Please confirm if you want to continue with hard deletion?"
          buttonProps={[
            { label: 'Cancel' },
            {
              label: 'Delete',
              onClick: () => {
                hardDeleteMetaField();
                setIsDeleteModal(false);
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
  setDeletedAttributes: PropTypes.isRequired,
  deletedAttributes: PropTypes.isRequired,
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
