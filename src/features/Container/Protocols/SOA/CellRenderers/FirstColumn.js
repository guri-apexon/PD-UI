import { useState, useEffect, useRef, useContext, useMemo } from 'react';
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

function FirstColumn({ data, colDef }) {
  let { field } = colDef;
  const { propDispatch } = useContext(GridContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [warning, setWarning] = useState(false);
  const ref = useRef(null);

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
  const cellAction = (type) => {
    setWarning(false);
    if (!data[field]) {
      const { field1 } = Object.keys(data)[0];
      field = field1;
    }
    let rowIndex = data[field][TableConst.ROW_IDX];
    if (type === TableEvents.DELETE_TABLE_ROW) {
      propDispatch({
        type: TableEvents.DELETE_TABLE_ROW,
        payload: rowIndex,
      });
      return;
    }
    if (type === TableConst.ADD_ROW_ABOVE) {
      rowIndex++;
    }

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
  const fieldValue = useMemo(() => {
    if (data[field] && data[field] && data[field][TableConst.DATA_VALUE]) {
      return data[field][TableConst.DATA_VALUE];
    }
    return '';
  }, [data, field]);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Drag
          onClick={(e) => setAnchorEl(!anchorEl ? e.currentTarget : null)}
        />
        <span style={{ alignItems: 'center' }}>{fieldValue}</span>
      </div>
      <Popper
        ref={ref}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Card interactive style={{ padding: 5 }}>
          <Arrow2Up
            className="hand-cursor"
            onClick={() => cellAction(TableConst.ADD_ROW_BELOW)}
          />
          <Trash className="hand-cursor" onClick={() => setWarning(true)} />
          <Arrow2Down
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
            onClick: () => cellAction(TableEvents.DELETE_TABLE_ROW),
          },
          { label: 'No' },
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
