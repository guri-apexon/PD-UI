import { useState, useEffect, useRef, useContext } from 'react';
import Card from 'apollo-react/components/Card';
import Popper from 'apollo-react/components/Popper';
import PropTypes from 'prop-types';
import ArrowLeft from 'apollo-react-icons/ArrowLeft';
import ArrowRight from 'apollo-react-icons/ArrowRight';
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
function HeaderComponent(props) {
  const {
    displayName,
    column: {
      lastLeftPinned,

      // eslint-disable-next-line
      colDef: { baseColumn, table_column_index, uid, timePoint, table_roi_id },
    },
  } = props;
  const { propDispatch, apiDispatch, tableId, docId } = useContext(GridContext);
  const [isEditing, setEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [warning, setWarning] = useState(false);
  const [value, setValue] = useState(displayName);
  const ref = useRef(null);
  const inpRef = useRef(null);
  const cellAction = ({ type, newValue }) => {
    // eslint-disable-next-line
    let columnIndex = table_column_index;
    if (type === TableEvents.UPDATE_TABLE_COLUMN_CELL) {
      // eslint-disable-next-line
      const sub_type =
        Number(table_column_index) === 0
          ? 'update_study_procedure'
          : 'update_study_visit';
      const colObj = {
        operation: 'update',
        sub_type,
        table_props: {
          doc_id: docId,
          table_roi_id: tableId,
          table_row_index: '0',
          table_column_index: String(table_column_index),
          timepoint: timePoint,
          value: newValue,
        },
      };
      apiDispatch({ type: 'SOA_UPDATE_DETAILS', data: colObj, method: 'post' });
      propDispatch({
        type: TableEvents.UPDATE_TABLE_COLUMN_CELL,
        payload: {
          [TableConst.COLUMN_IDX]: Number(columnIndex),
          uid,
          timePoint,
          table_roi_id,
          newValue,
        },
      });
      setEditing(false);
      return;
    }

    setWarning(false);
    setAnchorEl(false);

    if (type === TableEvents.DELETE_TABLE_COLUMN) {
      const colObj = {
        operation: 'delete',
        sub_type: 'delete_column',
        table_props: {
          table_roi_id: tableId,
          table_column_index: String(table_column_index),
        },
      };
      apiDispatch({ type: 'SOA_UPDATE_DETAILS', data: colObj, method: 'post' });
      propDispatch({
        type: TableEvents.DELETE_TABLE_COLUMN,
        payload: {
          [TableConst.COLUMN_IDX]: Number(columnIndex),
          uid,
          timePoint,
          table_roi_id,
        },
      });

      return;
    }

    if (type === TableConst.ADD_ROW_ABOVE) {
      columnIndex = Number(table_column_index) + 1;
    }

    const colObj = {
      operation: 'add',
      sub_type: 'add_column',
      table_props: {
        doc_id: docId,
        table_roi_id: tableId,
        table_column_index: String(columnIndex),
        study_visit: [
          {
            table_row_index: '0',
            timepoint: timePoint,
            value: 'new Column',
          },
        ],
        row_props: [],
      },
    };
    apiDispatch({ type: 'SOA_UPDATE_DETAILS', data: colObj, method: 'post' });

    propDispatch({
      type: TableEvents.ADD_TABLE_COLUMN,
      payload: {
        [TableConst.COLUMN_IDX]: Number(columnIndex),
        uid,
        timePoint,
        table_roi_id,
        data: '',
        value: 'new Column',
      },
    });
  };
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
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
  useEffect(() => {
    const onBlur = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!inpRef.current || inpRef.current.contains(event.target)) {
        return;
      }
      cellAction({
        type: TableEvents.UPDATE_TABLE_COLUMN_CELL,
        newValue: inpRef.current.value,
      });
    };
    document.addEventListener('mousedown', onBlur);
    document.addEventListener('touchstart', onBlur);
    return () => {
      document.removeEventListener('mousedown', onBlur);
      document.removeEventListener('touchstart', onBlur);
    };
    // eslint-disable-next-line
  }, [inpRef]);

  return (
    <>
      {isEditing ? (
        <input
          data-testid="editing-ref"
          type="text"
          ref={inpRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="header-editing-Item"
        />
      ) : (
        ''
      )}
      <div className="firstColumn">
        {!lastLeftPinned ? (
          <Drag
            data-testid="header-drag-button"
            onClick={(e) => setAnchorEl(!anchorEl ? e.currentTarget : null)}
          />
        ) : (
          '                  '
        )}

        <div>
          <span
            data-testid={baseColumn ? 'header-cell' : 'group-cell'}
            onDoubleClick={() => {
              setEditing(!isEditing);
            }}
            style={style.columnValue}
          >
            {displayName}
          </span>
        </div>
      </div>
      <Popper
        ref={ref}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Card interactive style={style.arrowContainer}>
          <ArrowLeft
            data-testid="arrowLeft-button"
            className="hand-cursor"
            onClick={() => cellAction({ type: TableConst.ADD_ROW_BELOW })}
          />
          <Trash
            data-testid="trash-button"
            className="hand-cursor"
            onClick={() => setWarning(true)}
          />
          <ArrowRight
            data-testid="arrowRight-button"
            className="hand-cursor"
            onClick={() => cellAction({ type: TableConst.ADD_ROW_ABOVE })}
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
            onClick: () =>
              cellAction({ type: TableEvents.DELETE_TABLE_COLUMN }),
          },
          { label: 'No', 'data-testid': 'delete-no-button' },
        ]}
        id="warning"
      />
    </>
  );
}

HeaderComponent.propTypes = {
  displayName: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
export default HeaderComponent;
