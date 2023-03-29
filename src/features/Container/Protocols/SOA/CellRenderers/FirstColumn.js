import { useState, useEffect, useRef, useContext } from 'react';
import Card from 'apollo-react/components/Card';
import Popper from 'apollo-react/components/Popper';
import PropTypes from 'prop-types';
import Arrow2Down from 'apollo-react-icons/Arrow2Down';
import Arrow2Up from 'apollo-react-icons/Arrow2Up';
import Trash from 'apollo-react-icons/Trash';
import Modal from 'apollo-react/components/Modal';
import Drag from 'apollo-react-icons/Drag';
import GridContext from '../Context/GridContext';
import { TableConst, TableEvents } from '../Constants';
import '../SOA.scss';

const style = {
  columnValue: {
    alignItems: 'center',
  },
  arrowContainer: {
    padding: 15,
  },
};
function FirstColumn({ data, colDef }) {
  let { field } = colDef;
  const { propDispatch, apiDispatch, tableId, docId } = useContext(GridContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [warning, setWarning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      setAnchorEl(false);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
  const cellAction = (type) => {
    setWarning(false);
    if (!data[field]) {
      const { field1 } = Object.keys(data)[0];
      field = field1;
    }
    if (!field) {
      const field2 = Object.keys(data)[0];
      field = field2;
    }
    let rowIndex = data[field][TableConst.ROW_IDX];
    if (type === TableEvents.DELETE_TABLE_ROW) {
      const data = {
        operation: 'delete',
        sub_type: 'delete_row',
        table_props: {
          table_roi_id: String(tableId),

          table_row_index: String(rowIndex),
        },
      };
      apiDispatch({ type: 'SOA_UPDATE_DETAILS', data, method: 'post' });
      propDispatch({
        type: TableEvents.DELETE_TABLE_ROW,
        payload: rowIndex,
      });

      return;
    }
    if (type === TableConst.ADD_ROW_ABOVE) {
      rowIndex++;
    }

    const rowObject = {
      operation: 'add',
      sub_type: 'add_row',
      table_props: {
        doc_id: docId,
        table_roi_id: tableId,
        table_row_index: String(rowIndex),
        study_procedure: {
          table_column_index: '0',
          value: '',
        },
        row_props: [],
      },
    };
    apiDispatch({
      type: 'SOA_UPDATE_DETAILS',
      data: rowObject,
      method: 'post',
    });

    propDispatch({
      type: TableEvents.ADD_TABLE_ROW,
      payload: {
        newRow: {
          [TableConst.ROW_IDX]: rowIndex,
          [TableConst.COLUMN_IDX]: 0,
          data: '',
          value: '',
        },
        rowIndex,
      },
    });
  };
  const fieldValue =
    data && data[field] && data[field][TableConst.DATA_VALUE]
      ? data[field][TableConst.DATA_VALUE]
      : '';

  return (
    <>
      <div className="firstColumn">
        <Drag
          data-testid="drag-button"
          onClick={(e) => setAnchorEl(!anchorEl ? e.currentTarget : null)}
        />
        <span style={style.columnValue}>{fieldValue}</span>
      </div>
      <Popper
        ref={ref}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Card interactive style={style.arrowContainer}>
          <Arrow2Up
            data-testid="arrow2Up-button"
            className="hand-cursor"
            onClick={() => cellAction(TableConst.ADD_ROW_BELOW)}
          />
          <Trash
            data-testid="trash-button"
            className="hand-cursor"
            onClick={() => setWarning(true)}
          />
          <Arrow2Down
            data-testid="arrow2Down-button"
            className="hand-cursor"
            onClick={() => cellAction(TableConst.ADD_ROW_ABOVE)}
          />
        </Card>
      </Popper>
      <Modal
        open={warning}
        variant="warning"
        onClose={() => setWarning(false)}
        title="warning"
        message="Do you really want to delete record"
        buttonProps={[
          {
            label: 'Yes',
            'data-testid': 'delete-yes-button',
            onClick: () => cellAction(TableEvents.DELETE_TABLE_ROW),
          },
          { label: 'No', 'data-testid': 'delete-no-button' },
        ]}
        id="warning"
      />
    </>
  );
}

FirstColumn.propTypes = {
  data: PropTypes.isRequired,
  colDef: PropTypes.isRequired,
};
export default FirstColumn;
