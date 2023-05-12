import {
  getTableColumns,
  getValueFormRecord,
  addColumnDefs,
  stringReadable,
} from '../utils';
import CellRenderer from '../CellRenderers/CellRenderer';
import { TableConst } from '../Constants';
import TextEditor from '../CellRenderers/TextEditor';
import FirstColumn from '../CellRenderers/FirstColumn';
import HeaderComponent from '../CellRenderers/HeaderComponent';

describe('getValueFormRecord', () => {
  test('should return the value of VALUE_TEXT1 property', () => {
    const item = { COLUMN_IDX: 0, VALUE_TEXT1: 'value' };
    const result = getValueFormRecord(item);
    expect(result).toBeUndefined();
  });

  it('should return value of a record', () => {
    const record1 = { columnIdx: 0, rowIdx: 0, valueText1: 'value1' };
    const record2 = { columnIdx: 1, rowIdx: 0, valueText1: 'value2' };
    expect(getValueFormRecord(record1)).toBeUndefined();
    expect(getValueFormRecord(record2)).toBeUndefined();
  });
});

describe('addColumnDefs', () => {
  it('should add column definitions to the item', () => {
    const item = { isFirstColumn: true };
    addColumnDefs(item);
    expect(item).toEqual({
      isFirstColumn: true,
      cellRenderer: FirstColumn,
      cellClass: 'column1',
      headerClass: 'grid-header',
      suppressSizeToFit: true,
      headerComponent: HeaderComponent,
      headerGroupComponent: HeaderComponent,
      editable: true,
      minWidth: 200,
      suppressMovable: true,
      cellEditor: TextEditor,
      cellEditorSelector: expect.any(Function),
      valueSetter: expect.any(Function),
    });
  });
});

describe('stringReadable', () => {
  it('should convert underscore-separated string to readable format', () => {
    const str = 'string_readable';
    const result = stringReadable(str);
    expect(result).toEqual('String Readable');
  });
});

describe('getTableColumns', () => {
  test('should add isFirstColumn property to the first item', () => {
    const data = [{ id: 1 }, { id: 2 }];
    const result = getTableColumns(data);
    expect(result[0].isFirstColumn).toBe(true);
  });

  test('should set cellRenderer to CellRenderer for non-first columns', () => {
    const data = [{ id: 1 }, { id: 2 }];
    const result = getTableColumns(data);
    expect(result[1].cellRenderer).toBe(CellRenderer);
  });
});

describe('addColumnDefs', () => {
  test('should set headerClass to TableConst.headerClass', () => {
    const item = { headerClass: undefined };
    addColumnDefs(item);
    expect(item.headerClass).toBe(TableConst.headerClass);
  });

  test('should set cellEditor to TextEditor', () => {
    const item = { cellEditor: undefined };
    addColumnDefs(item);
    expect(item.cellEditor).toBe(TextEditor);
  });

  test('sets the correct cellEditorSelector', () => {
    const item = {};
    const params = {
      data: {
        a: {
          [TableConst.DATA_VALUE]: 'initial value',
        },
      },
      colDef: {
        field: 'a',
      },
    };
    addColumnDefs(item);
    const cellEditorSelector = item.cellEditorSelector(params);
    expect(cellEditorSelector.component).toBe(TextEditor);
    expect(cellEditorSelector.params.value).toBe('initial value');
  });

  test('sets the correct valueSetter', () => {
    const item = {};
    const params = {
      oldValue: {
        [TableConst.COLUMN_IDX]: '1',
        [TableConst.ROW_IDX]: '2',
      },
      newValue: 'new value',
      data: {
        a: {
          [TableConst.ROW_IDX]: '2',
        },
      },
      colDef: {
        field: '1',
      },
    };
    addColumnDefs(item);
    const result = item.valueSetter(params);
    expect(result).toBe(true);
    expect(params.data.b).toEqual({
      [TableConst.COLUMN_IDX]: 1,
      [TableConst.ROW_IDX]: 2,
      [TableConst.VALUE_TEXT1]: 'new value',
      isNewRecord: false,
    });
  });
});
