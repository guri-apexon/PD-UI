import { useContext, useRef, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import TabelContext from './Context';
import { TableConst, TableEvents } from './Constants';
import GridContext from './Context/GridContext';
import './SOA.scss';

const style = {
  mainContainer: { height: '100%', width: '100%' },
  tableContainer: { height: '800px', width: '100%' },
  footerContainer: { height: '300px !important', width: '100%' },
};
function SOATable() {
  const gridRef = useRef();
  const { state, dispatch, apiDispatch } = useContext(TabelContext);

  const {
    tableData,
    columnDefs,
    tableId,
    docId,
    tables,
    selectedTab,
    refreshValue,
    footNotes,
  } = state;

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      flex: 1,

      onCellValueChanged: (params) => {
        const {
          data: {
            b: {
              isNewRecord,
              indicator_text: indicatorText,
              table_column_index: tableColumnIndex,
              table_row_index: tableRowIndex,
            },
          },
        } = params;
        const obj = {
          [TableConst.COLUMN_IDX]: Number(tableColumnIndex),
          [TableConst.ROW_IDX]: Number(tableRowIndex),
          [TableConst.VALUE_TEXT1]: indicatorText,
          tableId,
        };
        if (isNewRecord) {
          const data = {
            operation: 'update',
            sub_type: 'add_cell',
            table_props: {
              doc_id: String(docId),
              table_roi_id: String(tableId),
              table_row_index: String(tableRowIndex),
              table_column_index: String(tableColumnIndex),
              value: String(indicatorText),
              timepoint:
                tableColumnIndex === 0 ? TableConst.STUDYPROCEDURE : '',
            },
          };
          dispatch({ type: TableEvents.ADD_TABLE_CELL, payload: obj });
          apiDispatch({ type: 'SOA_UPDATE_DETAILS', data, method: 'post' });
        } else {
          const subType =
            tableColumnIndex === 0 ? 'update_study_procedure' : 'update_cell';

          const data = {
            operation: 'update',
            sub_type: subType,
            table_props: {
              doc_id: docId,
              table_roi_id: tableId,
              table_row_index: String(tableRowIndex),
              table_column_index: String(tableColumnIndex),
              value: String(indicatorText),
              timepoint: '',
            },
            //  }
          };

          apiDispatch({ type: 'SOA_UPDATE_DETAILS', data, method: 'post' });
          dispatch({ type: TableEvents.UPDATE_CELL_VALUES, payload: obj });
        }
      },
    };
  }, [tableId, docId, dispatch, apiDispatch]);
  useEffect(() => {
    gridRef.current?.api?.setHeaderHeight(0);
    gridRef.current?.api?.setGroupHeaderHeight(50);
  });

  const propDispatch = useMemo(
    () => ({
      propDispatch: dispatch,
      apiDispatch,
      tableId,
      docId,
      table: tables[selectedTab],
      refreshValue,
    }),
    [dispatch, tableId, docId, apiDispatch, tables, selectedTab, refreshValue],
  );
  return (
    <div id="tableMaincontainer" style={style.mainContainer}>
      <GridContext.Provider value={propDispatch}>
        <div className="ag-theme-alpine" style={style.tableContainer}>
          <AgGridReact
            ref={gridRef}
            rowData={[...tableData]}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows="true"
            rowDragManaged="true"
            suppressDragLeaveHidesColumns="true"
            stopEditingWhenGridLosesFocus="true"
          />
        </div>
        <div
          className="ag-theme-alpine footer-ontainer"
          style={style.footerContainer}
        >
          <AgGridReact
            rowData={footNotes[selectedTab]}
            columnDefs={[
              {
                field: 'key',
                headerName: 'Footer Name',
                resizable: true,
                suppressMovable: true,
                width: 150,
              },
              {
                field: 'value',
                headerName: 'Footer Value',
                resizable: true,
                suppressMovable: true,
                width: 4048,
              },
            ]}
          />
        </div>
      </GridContext.Provider>
    </div>
  );
}

export default SOATable;
