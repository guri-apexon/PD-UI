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
  const { propDispatch, apiDispatch, tableId, docId, table } =
    useContext(GridContext);
  const { displayName: colUID } = props;

  const {
    uid = '',
    timePoint = '',
    table_roi_id: tableRoiId = '',
    indicator_text: displayName = '',
  } = table[tableId][colUID] || {};
  let { table_column_index: columnIndex = '' } = table[tableId][colUID] || {};
  const [isEditing, setEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [warning, setWarning] = useState(false);
  const [value, setValue] = useState(displayName);
  useEffect(() => {
    setValue(displayName);
  }, [displayName]);
  const ref = useRef(null);
  const inpRef = useRef(null);
  const cellAction = ({ type, newValue }) => {
    if (type === TableEvents.UPDATE_TABLE_COLUMN_CELL) {
      const subType =
        Number(columnIndex) === 0
          ? 'update_study_procedure'
          : 'update_study_visit';
      const colObj = {
        operation: 'update',
        sub_type: subType,
        table_props: {
          doc_id: docId,
          table_roi_id: tableId,
          table_row_index: '0',
          table_column_index: String(columnIndex),
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
          table_roi_id: tableRoiId,
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
          table_column_index: String(columnIndex),
        },
      };
      apiDispatch({ type: 'SOA_UPDATE_DETAILS', data: colObj, method: 'post' });
      propDispatch({
        type: TableEvents.DELETE_TABLE_COLUMN,
        payload: {
          [TableConst.COLUMN_IDX]: Number(columnIndex),
          uid,
          timePoint,
          table_roi_id: tableId,
        },
      });

      return;
    }

    if (type === TableConst.ADD_ROW_ABOVE) {
      columnIndex = Number(columnIndex) + 1;
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
            value: 'New Column',
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
        table_roi_id: tableId,
        data: '',
        value: 'New Column',
        [TableConst.VALUE_TEXT1]: 'New Column',
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
  }, [inpRef, timePoint]);
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
        {Number(columnIndex) > 0 ? (
          <Drag
            data-testid="header-drag-button"
            onClick={(e) => setAnchorEl(!anchorEl ? e.currentTarget : null)}
          />
        ) : (
          '                  '
        )}

        <div>
          <span
            data-testid="header-cell"
            onDoubleClick={() => {
              setEditing(!isEditing);
            }}
            style={style.columnValue}
          >
            {displayName.trim() === '' ? (
              <div className="header-empty-cell">&nbsp;</div>
            ) : (
              displayName
            )}
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
};
export default HeaderComponent;
