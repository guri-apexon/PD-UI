/* eslint-disable react/no-danger */
import { render } from '@testing-library/react';

import {
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  updateFootNotePayload,
  swapRowElements,
  swapColumnElements,
  filterTableProperties,
  getPreferredTerms,
  updateTable,
  getHierarchyName,
  filterFootNotes,
  updateRowIndex,
  getMaxColumns,
  getHtmlString,
  renderTableData,
  formattableData,
  checkSpanValue,
  getNextColIndex,
  cellOperationData,
  getNextRowIndex,
  rowMergeOperation,
  adjustRowSpan,
  checkRowLength,
  colSplit,
  checkNewIndex,
  checkNewRow,
  checkEmptyColumn,
  checkColLength,
  rowSplit,
  deleteRowData,
  deleteColData,
  adjustColSpan,
  addNewRow,
  addNewColumn,
} from '../utils';
import {
  addColunNew,
  addNewColumnData,
  addNewColumnExp,
  addRowData,
  adjustColspan,
  adjustColspanExp,
  adjustRowData,
  adjustRowDataExp,
  cellData,
  checkRightSpan,
  checkSpan,
  colEmpty,
  colspansnon,
  colspansnonExp,
  colspansRen,
  colspansRenExp,
  dataIndices,
  deletecnt,
  deleteCol,
  deleteColDataExp,
  deleteCount,
  delRowData,
  delRowDatacol,
  delRowDatacolExp,
  delRowDataExp,
  diffSpan,
  emptyArr,
  equalSpan,
  expectedOpsData,
  filterData,
  filterDataExp,
  filterTablePro,
  filterTabProOps,
  footNotedata,
  footNotedataExp,
  forData,
  forDataExp,
  formatData,
  formatDataExp,
  leftMerge,
  MergeA,
  mergeBel,
  mergeBelow,
  newAddcolumnData,
  newDelAddcolumnData,
  newRowData,
  newRowDataExp,
  newRowFirst,
  newRowFirstExp,
  nextMerge,
  opsData,
  opsDatarow,
  opsDatarowExp,
  renderData,
  renderDataExp,
  rightEqualSpan,
  rightMer,
  rightMerge,
  rowEmpty,
  rowHide,
  rowHideExp,
  rowMerge,
  rowMergeData,
  rowMergeDataExp,
  rowMergeExp,
  rowSort,
  simpleData,
  simpleRow,
  simpleRowExp,
  spanfalse,
  spantrue,
  spantrueExp,
  splitcol,
  splitColData,
  splitColDataExp,
  splitcolExp,
  swapDataCell,
  swaptwocol,
  tabPropData,
} from './tableData';

describe('addRow function', () => {
  it('adds a new row to the table data correctly', () => {
    const rows = addRowData;
    const index = 1;
    const updatedData = addRow(rows, index);
    expect(updatedData.length).toBe(2);
    expect(updatedData[index].columns.length).toBe(rows[0].columns.length);
  });
});

describe('deleteRow function', () => {
  it('deletes a row from the table data correctly', () => {
    const rows = [
      {
        roi_id: '',
        row_indx: '0',
        op_type: '',
        columns: [{ col_indx: '0', op_type: '', cell_id: '', value: '' }],
      },
    ];
    const index = 0;
    const updatedData = deleteRow(rows, index);
    expect(updatedData[index].op_type).toBe('delete');
  });
});

describe('addColumn function', () => {
  it('adds a new column to the table data correctly', () => {
    const tabledata = newAddcolumnData;
    const index = 1;
    const updatedData = addColumn(tabledata, index);
    expect(updatedData[0].columns.length).toBe(tabledata[0].columns.length + 1);
    expect(updatedData[0].columns[index].value).toBe('');
  });
});

describe('deleteColumn function', () => {
  it('deletes a column from the table data correctly', () => {
    const tabledata = newDelAddcolumnData;
    const index = 0;
    const updatedData = deleteColumn(tabledata, index);
    expect(updatedData[0].columns[index].value).toContain('');
    expect(updatedData[0].columns[index].op_type).toBe('');
  });

  it('splices the column from row if the op type is "add"', () => {
    const tabledata = addColunNew;
    const index = 0;
    const updatedData = deleteColumn(tabledata, index);
    expect(updatedData[0].columns.length).toEqual(1);
  });
});

describe('swapElements', () => {
  it('should swap the elements in the array', () => {
    const arr = swapDataCell;
    const updatedArr = swapRowElements(arr, 0, 1);
    expect(updatedArr[1].columns[0].value).toBe('1');
    expect(updatedArr[0].columns[0].value).toBe('3');
  });

  it('should return an empty array when an error occurs', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const array = emptyArr;
    const index1 = 0;
    const index2 = 2;
    const result = swapRowElements(array, index1, index2);
    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('updateFootNotePayload', () => {
  it('should update the footnotes in the payload', () => {
    const footnotes = footNotedata;
    const updatedFootnotes = updateFootNotePayload(footnotes);
    expect(updatedFootnotes).toEqual(footNotedataExp);
  });

  it('should return an empty array if the input array is empty', () => {
    const emptyArr = [];
    const updatedFootnotes = updateFootNotePayload(emptyArr);
    expect(updatedFootnotes).toEqual([]);
  });
});

describe('swapColumnElements function', () => {
  it('should swap two columns in an array of objects', () => {
    const data = swaptwocol;
    const actualData = swapColumnElements(data, 0, 1);
    expect(actualData[0].columns[0].value).toEqual('B');
  });
});

describe('getPreferredTerms function', () => {
  const preferredTerms = {
    apple: 'fruit',
    potato: 'vegetable',
  };

  test('should return plain HTML if isPreferredTerm is false', () => {
    const result = getPreferredTerms('test', false, preferredTerms);
    const { container } = render(<span dangerouslySetInnerHTML={result} />);
    expect(container.querySelector('b')).not.toBeInTheDocument();
  });

  test('should return bold HTML if isPreferredTerm is true and the value is a preferred term', () => {
    const result = getPreferredTerms('apple', true, preferredTerms);
    const { container } = render(<span dangerouslySetInnerHTML={result} />);
    expect(container.querySelector('b')).toBeInTheDocument();
  });

  test('should return plain HTML if isPreferredTerm is true but the value is not a preferred term', () => {
    const result = getPreferredTerms('banana', true, preferredTerms);
    const { container } = render(<span dangerouslySetInnerHTML={result} />);
    expect(container.querySelector('b')).not.toBeInTheDocument();
  });
});

describe('updateTable', () => {
  const data = [
    [{ content: 'A' }, { content: 'B' }],
    [{ content: 'C' }, { content: 'D' }],
  ];

  it('should update a cell content in the table data', () => {
    const rowIndex = 1;
    const columnIndex = 0;
    const content = 'E';

    const updatedData = updateTable(data, content, rowIndex, columnIndex);

    expect(updatedData[rowIndex][columnIndex].content).toEqual(content);
  });

  it('should return a new copy of the table data', () => {
    const rowIndex = 0;
    const columnIndex = 1;
    const content = 'F';

    const updatedData = updateTable(data, content, rowIndex, columnIndex);

    expect(updatedData).not.toBe(data);
  });

  it('should not mutate the original table data', () => {
    const rowIndex = 0;
    const columnIndex = 0;
    const content = 'G';

    updateTable(data, content, rowIndex, columnIndex);

    expect(data[rowIndex][columnIndex].content).not.toEqual(content);
  });
});

describe('getHierarchyName', () => {
  test('should return "paragraph" when type is "text"', () => {
    const type = 'text';
    const result = getHierarchyName(type);
    expect(result).toBe('paragraph');
  });

  test('should return "header" when type is "header"', () => {
    const type = 'header';
    const result = getHierarchyName(type);
    expect(result).toBe('header');
  });

  test('should return "table" when type is "table"', () => {
    const type = 'table';
    const result = getHierarchyName(type);
    expect(result).toBe('table');
  });

  test('should return an empty string when type is not recognized', () => {
    const type = 'unknown';
    const result = getHierarchyName(type);
    expect(result).toBe('');
  });
});

describe('getPreferredTerms', () => {
  const preferredTerms = {
    term1: 'replacement1',
    term2: 'replacement2',
  };

  const clinicalTerms = {
    term3: 'replacement3',
    term4: 'replacement4',
  };

  test('should return input value wrapped in <b> tag if it exists in preferredTerms and isPreferredTerm is true', () => {
    const inputValue = 'term1';
    const isPreferredTerm = true;
    const isClinicalTerms = false;
    const expectedHtmlString = '<b class="Preferred-txt">term1</b>';

    const result = getPreferredTerms(
      inputValue,
      isPreferredTerm,
      preferredTerms,
      clinicalTerms,
      isClinicalTerms,
    );
    // eslint-disable-next-line
    expect(result.__html).toBe(expectedHtmlString);
  });

  it('should return the input string as null when the input string is falsy', () => {
    const val = '';
    const result = getPreferredTerms(val, false, null, clinicalTerms, true);
    expect(result).toBe('');
  });

  test('should return input value without <b> tag if it does not exist in preferredTerms and isPreferredTerm is true', () => {
    const inputValue = 'term5';
    const isPreferredTerm = true;
    const isClinicalTerms = false;

    const result = getPreferredTerms(
      inputValue,
      isPreferredTerm,
      preferredTerms,
      clinicalTerms,
      isClinicalTerms,
    );

    // eslint-disable-next-line
    expect(result.__html).toBe(inputValue);
  });

  test('should return input value without <b> tag if isPreferredTerm is false', () => {
    const inputValue = 'term1';
    const isPreferredTerm = false;
    const isClinicalTerms = false;

    const result = getPreferredTerms(
      inputValue,
      isPreferredTerm,
      preferredTerms,
      clinicalTerms,
      isClinicalTerms,
    );

    // eslint-disable-next-line
    expect(result.__html).toBe(inputValue);
  });

  test('should return input value with clinical terms highlighted if isClinicalTerms is true', () => {
    const inputValue = 'term3 example term4';
    const isPreferredTerm = false;
    const isClinicalTerms = true;
    const expectedHtmlString =
      '<b class="enriched-txt">term3</b> example <b class="enriched-txt">term4</b>';

    const result = getPreferredTerms(
      inputValue,
      isPreferredTerm,
      preferredTerms,
      clinicalTerms,
      isClinicalTerms,
    );

    // eslint-disable-next-line
    expect(result.__html).toBe(expectedHtmlString);
  });

  test('should return input value without clinical terms highlighted if isClinicalTerms is false', () => {
    const inputValue = 'term3 example term4';
    const isPreferredTerm = false;
    const isClinicalTerms = false;

    const result = getPreferredTerms(
      inputValue,
      isPreferredTerm,
      preferredTerms,
      clinicalTerms,
      isClinicalTerms,
    );

    // eslint-disable-next-line
    expect(result.__html).toBe(inputValue);
  });

  test('should return balnk value if the value is blank and have clinical terms', () => {
    const result = getPreferredTerms('', false, false, { a: 1, c: 2 }, true);
    // eslint-disable-next-line
    expect(result.__html).toBeUndefined();
  });
});

describe('filterFootNotes', () => {
  it('should filter footnotes based on qc_change_type_footnote property', () => {
    const data = filterData;
    const expectedFilteredData = filterDataExp;
    const filteredData = filterFootNotes(data);
    expect(filteredData).toEqual(expectedFilteredData);
  });

  it('should return an empty array if input data is empty', () => {
    const data = [];
    const filteredData = filterFootNotes(data);
    expect(filteredData).toEqual([]);
  });
});

describe('updateRowIndex', () => {
  test('should update row indices and column indices correctly', () => {
    const data = dataIndices;
    const updatedRows = updateRowIndex(data);
    expect(updatedRows[0].columns.length).toEqual(2);
    expect(updatedRows[1].columns.length).toEqual(2);
    expect(updatedRows[2].columns.length).toEqual(0);
  });

  test('should update row indices and column indices correctly for an empty data array', () => {
    const data = [];
    const updatedRows = updateRowIndex(data);
    expect(updatedRows).toEqual([]);
  });
});

describe('filterTableProperties', () => {
  it('should not filter data if searchValue is not found', () => {
    const data = filterTablePro;
    const filteredData = filterTableProperties(data);
    expect(filteredData.length).toEqual(2);
  });

  test('should filter data with op_type property', () => {
    const data = filterTabProOps;
    const filteredData = filterTableProperties(data);
    expect(filteredData).toHaveLength(3);
    expect(filteredData[0].op_type).toBe('add');
    expect(filteredData[0].columns).toHaveLength(1);
    expect(filteredData[0].columns[0].op_type).toBe('modify');
    expect(filteredData[1].op_type).toBe('delete');
    expect(filteredData[1].columns).toHaveLength(0);
    expect(filteredData[2].columns[0].op_type).toBe('modify');
    expect(filteredData[2].columns[1].op_type).toBe('delete');
  });

  test('should parse the table if the  data is stringified', () => {
    const data = tabPropData;
    const filteredData = filterTableProperties(JSON.stringify(data));
    expect(filteredData).toHaveLength(3);
    expect(filteredData[0].op_type).toBe('add');
    expect(filteredData[0].columns).toHaveLength(1);
    expect(filteredData[0].columns[0].op_type).toBe('modify');
    expect(filteredData[1].op_type).toBe('delete');
    expect(filteredData[1].columns).toHaveLength(0);
    expect(filteredData[2].columns[0].op_type).toBe('modify');
    expect(filteredData[2].columns[1].op_type).toBe('delete');
  });

  test('should return an empty array if data is an empty array', () => {
    const data = [];
    const filteredData = filterTableProperties(data);
    expect(filteredData).toHaveLength(0);
  });
});

describe('deleteRow', () => {
  const QC_CHANGE_TYPE = {
    ADDED: 'add',
    UPDATED: 'modify',
    DELETED: 'delete',
  };
  it('should delete the row if the op_type is ADDED', () => {
    const rows = [
      { op_type: QC_CHANGE_TYPE.ADDED, data: 'Row 1' },
      { op_type: QC_CHANGE_TYPE.UPDATED, data: 'Row 2' },
    ];
    const indexToDelete = 0;

    const result = deleteRow(rows, indexToDelete);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      op_type: QC_CHANGE_TYPE.UPDATED,
      data: 'Row 2',
    });
  });

  it('should mark the op_type as DELETED if the op_type is not ADDED', () => {
    const rows = [
      { op_type: QC_CHANGE_TYPE.UPDATED, data: 'Row 1' },
      { op_type: QC_CHANGE_TYPE.REMOVED, data: 'Row 2' },
    ];
    const indexToDelete = 1;

    const result = deleteRow(rows, indexToDelete);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      op_type: QC_CHANGE_TYPE.UPDATED,
      data: 'Row 1',
    });
    expect(result[1]).toEqual({
      op_type: QC_CHANGE_TYPE.DELETED,
      data: 'Row 2',
    });
  });

  it('should return a new array and not modify the original rows array', () => {
    const rows = [
      { op_type: QC_CHANGE_TYPE.ADDED, data: 'Row 1' },
      { op_type: QC_CHANGE_TYPE.UPDATED, data: 'Row 2' },
    ];
    const indexToDelete = 0;
    const result = deleteRow(rows, indexToDelete);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ op_type: QC_CHANGE_TYPE.ADDED, data: 'Row 1' });
    expect(rows[1]).toEqual({ op_type: QC_CHANGE_TYPE.UPDATED, data: 'Row 2' });
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      op_type: QC_CHANGE_TYPE.UPDATED,
      data: 'Row 2',
    });
  });
});

describe('addColumn', () => {
  test('adds an empty cell at the specified index for each record', () => {
    const tabledata = [
      {
        row_indx: '0',
        op_type: 'add',
        columns: [
          { col_indx: '0', op_type: 'add' },
          { col_indx: '1', op_type: 'modify' },
        ],
      },
      {
        row_indx: '1',
        op_type: 'modify',
        columns: [
          { col_indx: '0', op_type: 'add' },
          { col_indx: '1', op_type: 'modify' },
        ],
      },
      {
        row_indx: '2',
        op_type: 'delete',
        columns: [
          { col_indx: '0', op_type: 'add' },
          { col_indx: '1', op_type: 'modify' },
        ],
      },
    ];
    const result = addColumn(tabledata, 1);
    expect(result[0].columns.length).toEqual(3);
  });

  test('updates op_type to UPDATED if not DELETED', () => {
    const tabledata = [
      { op_type: 'UPDATED', columns: [{}, {}] },
      { op_type: 'ADDED', columns: [{}, {}] },
      { op_type: 'DELETED', columns: [{}, {}] },
    ];
    const index = 0;
    const expectedData = [
      {
        op_type: 'UPDATED',
        columns: [
          {
            cell_id: '',
            col_indx: '0',
            op_type: 'add',
            value: '',
            col_render: false,
            colspan: 1,
            rowspan: 1,
          },
          {},
          {},
        ],
      },
      {
        op_type: 'ADDED',
        columns: [
          {
            cell_id: '',
            col_indx: '0',
            op_type: 'add',
            value: '',
            col_render: false,
            colspan: 1,
            rowspan: 1,
          },
          {},
          {},
        ],
      },
      {
        op_type: 'DELETED',
        columns: [
          {
            cell_id: '',
            col_indx: '0',
            op_type: 'add',
            value: '',
            col_render: false,
            colspan: 1,
            rowspan: 1,
          },
          {},
          {},
        ],
      },
    ];

    const result = addColumn(tabledata, index);

    expect(result).toEqual(expectedData);
  });

  test('updates col_indx for added records', () => {
    const tabledata = [
      { op_type: 'UPDATED', columns: [{}, {}] },
      { op_type: 'ADDED', columns: [{}, {}] },
      { op_type: 'DELETED', columns: [{}, {}] },
    ];
    const index = 1;
    const expectedData = [
      {
        op_type: 'UPDATED',
        columns: [
          {},
          {
            cell_id: '',
            col_indx: '1',
            op_type: 'add',
            value: '',
            col_render: false,
            colspan: 1,
            rowspan: 1,
          },
          {},
        ],
      },
      {
        op_type: 'ADDED',
        columns: [
          {},
          {
            cell_id: '',
            col_indx: '1',
            op_type: 'add',
            value: '',
            col_render: false,
            colspan: 1,
            rowspan: 1,
          },
          {},
        ],
      },
      {
        op_type: 'DELETED',
        columns: [
          {},
          {
            cell_id: '',
            col_indx: '1',
            op_type: 'add',
            value: '',
            col_render: false,
            colspan: 1,
            rowspan: 1,
          },

          {},
        ],
      },
    ];

    const result = addColumn(tabledata, index);

    expect(result).toEqual(expectedData);
  });
});

describe('getMaxColumns', () => {
  test('should return 0 when the array is empty', () => {
    const arr = [];
    const result = getMaxColumns(arr);
    expect(result).toBe(0);
  });

  test('should return the maximum number of columns in the array', () => {
    const arr = [
      { columns: [] },
      { columns: [1, 2, 3] },
      { columns: [4, 5, 6, 7] },
      { columns: [8, 9] },
    ];
    const result = getMaxColumns(arr);
    expect(result).toBe(4);
  });

  test('should ignore columns with op_type "DELETED"', () => {
    const arr = [
      { columns: [] },
      { columns: [1, 2, 3] },
      { columns: [4, 5, 6, 7, { op_type: 'delete' }] },
      { columns: [8, 9] },
    ];
    const result = getMaxColumns(arr);
    expect(result).toBe(4);
  });
});

describe('getHtmlString', () => {
  test('should return the original string when it is empty', () => {
    const str = '';
    const result = getHtmlString(str, true);
    expect(result).toEqual('');
  });

  test('should return the string wrapped in <b> tags when isPreTerm is true', () => {
    const str = 'example_string';
    const result = getHtmlString(str, true);
    const expected = { __html: '<b class="Preferred-txt">example string</b>' };
    expect(result).toEqual(expected);
  });

  test('should return the original string when isPreTerm is false', () => {
    const str = 'example_string';
    const result = getHtmlString(str, false);
    const expected = { __html: 'example_string' };
    expect(result).toEqual(expected);
  });

  test('should replace "_" with " " and remove "cpt" when isPreTerm is true', () => {
    const str = 'example_string_cpt';
    const result = getHtmlString(str, true);
    const expected = { __html: '<b class="Preferred-txt">example string</b>' };
    expect(result).toEqual(expected);
  });

  test('should not replace "_" with " " and remove "cpt" when isPreTerm is false', () => {
    const str = 'example_string_cpt';
    const result = getHtmlString(str, false);
    const expected = { __html: 'example_string_cpt' };
    expect(result).toEqual(expected);
  });
});

test('renders an empty data array', () => {
  const data = [];
  const result = renderTableData(data);
  expect(result).toEqual({ isDraggable: true, tableData: [] });
});

test('renders a single row and single column', () => {
  const data = [
    {
      columns: [{ col_render: true }],
    },
  ];
  const result = renderTableData(data);
  expect(result).toEqual({ isDraggable: true, tableData: data });
});

test('renders multiple rows and columns without rowspan or colspan', () => {
  const data = [
    {
      columns: [{ col_render: true }, { col_render: true }],
    },
    {
      columns: [{ col_render: true }, { col_render: true }],
    },
  ];
  const result = renderTableData(data);
  expect(result).toEqual({ isDraggable: true, tableData: data });
});

test('renders rowspan and colspan correctly', () => {
  const data = renderData;
  const expectedOutput = renderDataExp;
  const result = renderTableData(data);
  expect(result).toEqual({
    isDraggable: false,
    tableData: expectedOutput,
  });
});

test('formats an empty data array', () => {
  const data = [];
  const result = formattableData(data);
  expect(result).toEqual([]);
});

test('formats a single record and single column', () => {
  const data = [
    {
      row_indx: 1,
      columns: [{ col_indx: 1 }],
    },
  ];
  const result = formattableData(data);
  const expectedOutput = [
    {
      row_indx: '1',
      columns: [{ col_indx: '1', col_render: true }],
    },
  ];
  expect(result).toEqual(expectedOutput);
});

test('formats multiple records and columns', () => {
  const data = forData;
  const result = formattableData(data);
  const expectedOutput = forDataExp;
  expect(result).toEqual(expectedOutput);
});

test('formats data with missing properties', () => {
  const data = formatData;
  const result = formattableData(data);
  const expectedOutput = formatDataExp;
  expect(result).toEqual(expectedOutput);
});

test('checks span value for mergeRight operation with equal row spans', () => {
  const operationData = rightEqualSpan;
  const rowIndex = 0;
  const colIndex = 0;
  const nextIndex = 0;
  const ops = 'mergeRight';
  const result = checkSpanValue(
    operationData,
    rowIndex,
    colIndex,
    nextIndex,
    ops,
  );
  expect(result).toBe(true);
});

test('checks span value for mergeRight operation with different row spans', () => {
  const operationData = checkRightSpan;
  const rowIndex = 0;
  const colIndex = 0;
  const nextIndex = 0;
  const ops = 'mergeRight';
  const result = checkSpanValue(
    operationData,
    rowIndex,
    colIndex,
    nextIndex,
    ops,
  );
  expect(result).toBe(true);
});

test('checks span value for mergeLeft operation with equal row spans', () => {
  const operationData = equalSpan;
  const rowIndex = 0;
  const colIndex = 1;
  const nextIndex = 1;
  const ops = 'mergeLeft';
  const result = checkSpanValue(
    operationData,
    rowIndex,
    colIndex,
    nextIndex,
    ops,
  );
  expect(result).toBe(true);
});

test('checks span value for mergeLeft operation with different row spans', () => {
  const operationData = checkSpan;
  const rowIndex = 0;
  const colIndex = 1;
  const nextIndex = 1;
  const ops = 'mergeLeft';
  const result = checkSpanValue(
    operationData,
    rowIndex,
    colIndex,
    nextIndex,
    ops,
  );
  expect(result).toBe(true);
});
test('checks span value for mergeLeft operation with different row spans', () => {
  const operationData = diffSpan;
  const rowIndex = 0;
  const colIndex = 1;
  const nextIndex = 1;
  const ops = 'mergeBelow';
  const result = checkSpanValue(
    operationData,
    rowIndex,
    colIndex,
    nextIndex,
    ops,
  );
  expect(result).toBe(false);
});

test('gets next column index for mergeRight operation', () => {
  const operationData = nextMerge;
  const rowIndex = 0;
  const colIndex = 2;
  const ops = 'mergeRight';
  const result = getNextColIndex(operationData, rowIndex, colIndex, ops);
  expect(result).toBe(3);
});

test('gets next column index for mergeRight operation and reaching the end of the row', () => {
  const operationData = rightMer;
  const rowIndex = 0;
  const colIndex = 2;
  const ops = 'mergeLeft';
  const result = getNextColIndex(operationData, rowIndex, colIndex, ops);
  expect(result).toBe(1);
});

test('gets next column index for mergeLeft operation', () => {
  const operationData = cellData;
  const rowIndex = 0;
  const colIndex = 4;
  const ops = 'mergeLeft';
  const result = getNextColIndex(operationData, rowIndex, colIndex, ops);
  expect(result).toBe(3);
});

test('gets next column index for mergeLeft operation and reaching the beginning of the row', () => {
  const operationData = leftMerge;
  const rowIndex = 0;
  const colIndex = 0;
  const ops = 'mergeLeft';
  const result = getNextColIndex(operationData, rowIndex, colIndex, ops);
  expect(result).toBe(-1);
});

test('gets next column index for mergeRight operation and reaching the end of the row', () => {
  const operationData = rightMerge;
  const rowIndex = 0;
  const colIndex = 2;
  const ops = 'mergeLef';
  getNextColIndex(operationData, rowIndex, colIndex, ops);
});

test('merges cells when isSpanValue is true', () => {
  const operationData = spantrue;
  const rowIndex = 0;
  const colIndex = 0;
  const nextColIndex = 1;
  const ops = 'mergeRight';
  const result = cellOperationData(
    operationData,
    rowIndex,
    colIndex,
    nextColIndex,
    ops,
  );
  const expectedOutput = spantrueExp;
  expect(result).toEqual(expectedOutput);
});

test('returns empty operationData when isSpanValue is false', () => {
  const operationData = spanfalse;
  const rowIndex = 0;
  const colIndex = 0;
  const nextColIndex = 1;
  const ops = 'mergeRight';
  const result = cellOperationData(
    operationData,
    rowIndex,
    colIndex,
    nextColIndex,
    ops,
  );
  expect(result).toEqual([]);
});

test('gets next row index for mergeBelow operation', () => {
  const operationData = mergeBelow;
  const rowIndex = 0;
  const colIndex = 0;
  const ops = 'mergeBelow';
  const result = getNextRowIndex(operationData, rowIndex, colIndex, ops);
  expect(result).toBe(1);
});

test('gets next row index for mergeBelow operation and reaching the end of the table', () => {
  const operationData = mergeBel;
  const rowIndex = 1;
  const colIndex = 0;
  const ops = 'mergeBelo';
  getNextRowIndex(operationData, rowIndex, colIndex, ops);
});

test('gets next row index for mergeAbove operation', () => {
  const operationData = MergeA;
  const rowIndex = 1;
  const colIndex = 0;
  const ops = 'mergeAbove';
  const result = getNextRowIndex(operationData, rowIndex, colIndex, ops);
  expect(result).toBe(0);
});

test('merges rows when calling rowMergeOperation', () => {
  const operationData = rowMergeData;
  const rowIndex = 0;
  const colIndex = 0;
  const nextRowIndex = 1;
  const result = rowMergeOperation(
    operationData,
    rowIndex,
    colIndex,
    nextRowIndex,
  );
  const expectedOutput = rowMergeDataExp;
  expect(result).toEqual(expectedOutput);
});

test('returns original operationData when no row merging is performed', () => {
  const operationData = rowMerge;
  const rowIndex = 0;
  const colIndex = 1;
  const nextRowIndex = 1;
  const result = rowMergeOperation(
    operationData,
    rowIndex,
    colIndex,
    nextRowIndex,
  );
  const expectedOutput = rowMergeExp;
  expect(result).toEqual(expectedOutput);
});

test('adjusts rowspan when cell is not hidden and no colspan', () => {
  const data = simpleRow;
  const rowIndex = 0;
  const colIndex = 0;
  const result = adjustRowSpan(data, rowIndex, colIndex);
  const expectedOutput = simpleRowExp;
  expect(result).toEqual(expectedOutput);
});

test('adjusts rowspan when cell is hidden and no colspan', () => {
  const data = rowHide;
  const rowIndex = 0;
  const colIndex = 0;
  const result = adjustRowSpan(data, rowIndex, colIndex);
  const expectedOutput = rowHideExp;
  expect(result).toEqual(expectedOutput);
});

test('adjusts rowspan when cell has colspan', () => {
  const data = adjustRowData;
  const rowIndex = 1;
  const colIndex = 1;
  const result = adjustRowSpan(data, rowIndex, colIndex);
  const expectedOutput = adjustRowDataExp;
  expect(result).toEqual(expectedOutput);
});

test('returns 0 when there are no rows', () => {
  const data = [];
  const result = checkRowLength(data);
  expect(result).toBe(0);
});

test('counts rows correctly when there are no rows with "delete" op_type', () => {
  const data = [
    { op_type: 'update' },
    { op_type: 'create' },
    { op_type: 'update' },
  ];
  const result = checkRowLength(data);
  expect(result).toBe(3);
});

test('excludes rows with "delete" op_type from counting', () => {
  const data = [
    { op_type: 'update' },
    { op_type: 'create' },
    { op_type: 'delete' },
    { op_type: 'update' },
    { op_type: 'delete' },
  ];
  const result = checkRowLength(data);
  expect(result).toBe(3);
});

test('returns 0 when all rows have "delete" op_type', () => {
  const data = [
    { op_type: 'delete' },
    { op_type: 'delete' },
    { op_type: 'delete' },
  ];
  const result = checkRowLength(data);
  expect(result).toBe(0);
});

test('splits column with colSpanValue > 1', () => {
  const operationData = splitColData;
  const rowIndex = 0;
  const colIndex = 0;
  const result = colSplit(operationData, rowIndex, colIndex);
  const expectedOutput = splitColDataExp;
  expect(result).toEqual(expectedOutput);
});

test('splits column with colSpanValue === 1', () => {
  const operationData = splitcol;
  const rowIndex = 0;
  const colIndex = 1;
  const result = colSplit(operationData, rowIndex, colIndex);
  const expectedOutput = splitcolExp;
  expect(result).toEqual(expectedOutput);
});

test('returns the original index when arr is empty', () => {
  const index = 3;
  const arr = [];
  const result = checkNewIndex(index, arr);
  expect(result).toBe(index);
});

test('decreases index correctly when arr contains elements smaller than index', () => {
  const index = 5;
  const arr = [1, 3, 4];
  const result = checkNewIndex(index, arr);
  expect(result).toBe(index - 3);
});

test('decreases index correctly when arr contains elements equal to index', () => {
  const index = 4;
  const arr = [1, 3, 4];
  const result = checkNewIndex(index, arr);
  expect(result).toBe(index - 2);
});

test('does not change index when arr contains elements larger than index', () => {
  const index = 1;
  const arr = [3, 4, 5];
  const result = checkNewIndex(index, arr);
  expect(result).toBe(index);
});

test('decreases index correctly when arr contains duplicate elements', () => {
  const index = 5;
  const arr = [1, 3, 3, 4];
  const result = checkNewIndex(index, arr);
  expect(result).toBe(1);
});

test('returns an empty array when data is empty', () => {
  const data = [];
  const result = checkNewRow(data);
  expect(result).toEqual([]);
});

test('returns an empty array when data has no deleted rows and no empty columns', () => {
  const data = simpleData;
  const result = checkNewRow(data);
  expect(result).toEqual([]);
});

test('returns sorted array with indices of deleted rows', () => {
  const data = rowSort;
  const result = checkNewRow(data);
  expect(result).toEqual([0, 2]);
});

test('returns an empty array when data is empty', () => {
  const data = [];
  const result = checkEmptyColumn(data);
  expect(result).toEqual([]);
});

test('returns an array with indices of empty columns when data has no deleted rows and no empty columns', () => {
  const data = colEmpty;
  const result = checkEmptyColumn(data);
  expect(result).toEqual([]);
});

test('returns array with indices of empty columns when data has deleted rows and empty columns', () => {
  const data = rowEmpty;
  const result = checkEmptyColumn(data);
  expect(result).toEqual([1]);
});

test('returns the correct length when data has no deleted columns', () => {
  const data = deletecnt;
  const result = checkColLength(data);
  expect(result).toBe(2);
});

test('excludes deleted columns from counting', () => {
  const data = deleteCount;
  const result = checkColLength(data);
  expect(result).toBe(2);
});

describe('rowSplit', () => {
  test('should correctly split a row when rowspan is greater than 1', () => {
    const operationData = opsDatarow;
    const rowIndex = 0;
    const colIndex = 1;
    const expectedOperationData = opsDatarowExp;
    const result = rowSplit([...operationData], rowIndex, colIndex);
    expect(result).toEqual(expectedOperationData);
  });

  test('should add a new row and adjust rowspan when rowspan is 1', () => {
    const operationData = opsData;
    const rowIndex = 0;
    const colIndex = 1;
    const expectedOperationData = expectedOpsData;
    const result = rowSplit([...operationData], rowIndex, colIndex);
    expect(result).toEqual(expectedOperationData);
  });
});

describe('deleteRowData', () => {
  test('should delete row data and adjust rowspan and col_render correctly', () => {
    const data = delRowDatacol;
    const rowIndex = 0;
    const expectedData = delRowDatacolExp;
    const result = deleteRowData([...data], rowIndex);
    expect(result).toEqual(expectedData);
  });

  test('should delete row data and adjust rowspan and col_render correctly1', () => {
    const data = delRowData;
    const rowIndex = 1;
    const expectedData = delRowDataExp;
    const result = deleteRowData([...data], rowIndex);
    expect(result).toEqual(expectedData);
  });
});

describe('deleteColData', () => {
  test('should delete column data and adjust colspan and col_render correctly', () => {
    const data = deleteCol;
    const colIndex = 1;
    const expectedData = deleteColDataExp;
    const result = deleteColData([...data], colIndex);
    expect(result).toEqual(expectedData);
  });
});

describe('adjustColSpan', () => {
  test('should adjust colspans correctly for rendered columns', () => {
    const data = colspansRen;
    const rowIndex = 0;
    const colIndex = 0;
    const expectedData = colspansRenExp;
    const result = adjustColSpan([...data], rowIndex, colIndex);
    expect(result).toEqual(expectedData);
  });

  test('should adjust colspans correctly for non-rendered columns', () => {
    const data = colspansnon;
    const rowIndex = 0;
    const colIndex = 1;
    const expectedData = colspansnonExp;
    const result = adjustColSpan([...data], rowIndex, colIndex);
    expect(result).toEqual(expectedData);
  });
});

describe('addNewRow', () => {
  test('should add a new row above and adjust colspans for the first row', () => {
    const data = newRowFirst;
    const index = 0;
    const tableOps = 'ADD_ROW_ABOVE';
    const expectedData = newRowFirstExp;
    const result = addNewRow([...data], index, tableOps);
    expect(result).toEqual(expectedData);
  });

  test('should adjust colspans and add new row properly when col_render is true in the previous row', () => {
    const data = newRowData;
    const index = 2;
    const tableOps = 'ADD_ROW_BELOW';
    const expectedData = newRowDataExp;
    const result = addNewRow([...data], index, tableOps);
    expect(result).toEqual(expectedData);
  });
});

describe('addNewColumn', () => {
  test('should add a new column to the left and adjust col_render and colspans for the first column', () => {
    const data = addNewColumnData;
    const index = 0;
    const tableOps = 'ADD_COLUMN_LEFT';
    const expectedData = addNewColumnExp;
    const result = addNewColumn([...data], index, tableOps);
    expect(result).toEqual(expectedData);
  });

  test('should adjust col_render and colspans when col_render is true in the previous column', () => {
    const data = adjustColspan;
    const index = 2;
    const tableOps = 'ADD_COLUMN_LEFT';
    const expectedData = adjustColspanExp;
    const result = addNewColumn([...data], index, tableOps);
    expect(result).toEqual(expectedData);
  });
});
