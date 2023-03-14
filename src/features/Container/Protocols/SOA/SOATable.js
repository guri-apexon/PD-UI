/* eslint-disable prettier/prettier */
import { useContext, useEffect, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import TabelContext, { headRows } from './Context';
import { TableConst, TableEvents } from './Constants';
import GridContext from './Context/GridContext';

function SOATable() {
  const gridRef = useRef();
  const { state, dispatch } = useContext(TabelContext);
  const { tableData, columnDefs, showGroupRows, hideGroupsColumns } = state;

  useEffect(() => {
    dispatch({ type: TableEvents.SET_GRID_REF, payload: gridRef.current });
    // eslint-disable-next-line
  }, [gridRef]);
  useEffect(() => {
    gridRef?.current?.api?.resetRowHeights();
  }, [showGroupRows.length, hideGroupsColumns.length]);
  const getRowHeight = useCallback(
    (params) => {
      if (params.data.headerRow && params.data.groupId === headRows[0])
        return 0;
      if (params.data.headerRow) return 40;
      const flag1 = showGroupRows.includes(params.data.groupId);
      const flag2 = hideGroupsColumns.includes(
        params.data[TableConst.STUDYVISIT],
      );
      return flag1 || flag2 ? 0 : 40;
    },
    // eslint-disable-next-line
    [showGroupRows.length, hideGroupsColumns.length],
  );

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      flex: 1,

      onCellValueChanged: (params) => {
        const obj = {
          [TableConst.COLUMN_IDX]: Number(params.colDef.field),
          [TableConst.ROW_IDX]: params.node.rowIndex + 1,
          [TableConst.DATA_NEW_VALUE]: params.newValue,
        };

        dispatch({ type: TableEvents.UPDATE_CELL_VALUES, payload: obj });
      },
    };
    // eslint-disable-next-line
  }, []);

  const onSwap = useCallback(() => {
    const rows = [];
    gridRef.current.api.forEachNodeAfterFilterAndSort((node) =>
      rows.push(node.data),
    );
  }, []);
  const propDispatch = useMemo(
    () => ({
      propDispatch: dispatch,
    }),
    [dispatch],
  );
  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <GridContext.Provider value={propDispatch}>
        <AgGridReact
          onRowDragEnd={onSwap}
          onDragStopped={onSwap}
          ref={gridRef}
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows="true"
          getRowHeight={getRowHeight}
          rowDragManaged="true"
          suppressDragLeaveHidesColumns="true"
          stopEditingWhenGridLosesFocus="true"
        />
      </GridContext.Provider>
    </div>
  );
}

export default SOATable;
