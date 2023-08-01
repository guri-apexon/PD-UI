import { useContext, useRef, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import flattenDeep from 'lodash/flattenDeep';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import TabelContext from './Context';
import { TableConst, TableEvents } from './Constants';
import GridContext from './Context/GridContext';
import HTMLCellRenderer from './CellRenderers/HTMLCellRenderer';
import './SOA.scss';

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

  /**
   * using memo so that on pdf page change
   * it shouldnt reload the footnotes if not changed.
   */
  const memoizedFootNotes = useMemo(
    () =>
      flattenDeep(tables[selectedTab]?.foot_notes).map((elem) => ({
        note: elem,
      })),
    [tables, selectedTab],
  );

  const footerGridRef = useRef();

  const footerColumnDefs = useMemo(() => {
    return [
      {
        field: 'note',
        headerName: 'Footnotes',
        resizable: true,
        suppressMovable: true,
        cellStyle: {
          'line-height': '24px',
          wordBreak: 'normal',
        },
        cellRenderer: HTMLCellRenderer,
      },
    ];
  }, []);
  const defaultFooterColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      wrapText: true,
      autoHeight: true,
    };
  }, []);

  return (
    <div className="ag-theme-alpine soa-maingrid-container">
      <GridContext.Provider value={propDispatch}>
        <AgGridReact
          suppressColumnVirtualisation
          suppressScrollOnNewData
          ref={gridRef}
          rowData={[...tableData]}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows="true"
          rowDragManaged="true"
          suppressDragLeaveHidesColumns="true"
          stopEditingWhenGridLosesFocus="true"
        />
        <div>
          <div className="soa-footergrid-container">
            <AgGridReact
              suppressScrollOnNewData
              ref={footerGridRef}
              rowData={memoizedFootNotes}
              columnDefs={footerColumnDefs}
              defaultColDef={defaultFooterColDef}
            />
          </div>
        </div>
      </GridContext.Provider>
    </div>
  );
}

export default SOATable;
