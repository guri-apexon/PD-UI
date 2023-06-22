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
} from '../utils';

describe('addRow function', () => {
  it('adds a new row to the table data correctly', () => {
    const rows = [
      {
        roi_id: '',
        row_indx: '0',
        op_type: '',
        columns: [{ col_indx: '0', op_type: '', cell_id: '', value: '' }],
      },
    ];
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
    const tabledata = [
      {
        roi_id: '',
        row_indx: '0',
        op_type: '',
        columns: [{ col_indx: '0', op_type: '', cell_id: '', value: '' }],
      },
    ];
    const index = 1;
    const updatedData = addColumn(tabledata, index);
    expect(updatedData[0].columns.length).toBe(tabledata[0].columns.length + 1);
    expect(updatedData[0].columns[index].value).toBe('');
  });
});

describe('deleteColumn function', () => {
  it('deletes a column from the table data correctly', () => {
    const tabledata = [
      {
        roi_id: '',
        row_indx: '0',
        op_type: '',
        columns: [
          { col_indx: '0', op_type: '', cell_id: '', value: '' },
          { col_indx: '1', op_type: '', cell_id: '', value: '' },
        ],
      },
    ];
    const index = 0;
    const updatedData = deleteColumn(tabledata, index);
    expect(updatedData[0].columns[index].value).toContain('<s>');
    expect(updatedData[0].columns[index].op_type).toBe('delete');
  });

  it('splices the column from row if the op type is "add"', () => {
    const tabledata = [
      {
        roi_id: '',
        row_indx: '0',
        op_type: '',
        columns: [
          { col_indx: '0', op_type: 'add', cell_id: '', value: '' },
          { col_indx: '1', op_type: '', cell_id: '', value: '' },
        ],
      },
      {
        roi_id: '',
        row_indx: '1',
        op_type: 'delete',
        columns: [
          { col_indx: '0', op_type: 'add', cell_id: '', value: '' },
          { col_indx: '1', op_type: '', cell_id: '', value: '' },
        ],
      },
    ];
    const index = 0;
    const updatedData = deleteColumn(tabledata, index);
    expect(updatedData[0].columns.length).toEqual(1);
  });
});

describe('swapElements', () => {
  it('should swap the elements in the array', () => {
    const arr = [
      {
        row_indx: '0',
        roi_id: '10620c73-747c-4243-8456-a3dc818ddceb',
        op_type: '',
        columns: [
          {
            col_indx: '0',
            op_type: '',
            cell_id: '858cc436-614b-476d-bb9c-6fb245a9c0b5',
            value: '1',
          },
          {
            col_indx: '1',
            op_type: '',
            cell_id: 'd45f9b3e-2253-40e8-b5d7-c16821bcc3a2',
            value: '2',
          },
        ],
      },
      {
        row_indx: '1',
        roi_id: '6258ee39-bf82-4cd3-9830-06714b819447',
        op_type: '',
        columns: [
          {
            col_indx: '0',
            op_type: '',
            cell_id: '61dc26b1-0802-4348-9ee0-70d2a18137ab',
            value: '3',
          },
          {
            col_indx: '1',
            op_type: '',
            cell_id: '9bf6ff0b-ac32-4b80-b005-d2bc166433a2',
            value: '4',
          },
        ],
      },
    ];
    const updatedArr = swapRowElements(arr, 0, 1);
    expect(updatedArr[1].columns[0].value).toBe('1');
    expect(updatedArr[0].columns[0].value).toBe('3');
  });

  it('should return an empty array when an error occurs', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const array = [
      {
        columns: [{ value: 'A' }, { value: 'B' }],
      },
      {
        columns: [{ value: 'X' }, { value: 'Y' }],
      },
    ];

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
    const footnotes = [
      { Text: 'note1' },
      { Text: 'note2' },
      { Text: 'note3' },
      {},
    ];
    const updatedFootnotes = updateFootNotePayload(footnotes);
    expect(updatedFootnotes).toEqual([
      {
        PrevousAttachmentIndex: null,
        Text: 'note1',
      },
      {
        PrevousAttachmentIndex: 0,
        Text: 'note2',
      },
      {
        PrevousAttachmentIndex: 1,
        Text: 'note3',
      },
      {
        PrevousAttachmentIndex: 2,
        qc_change_type_footnote: 'delete',
      },
    ]);
  });

  it('should return an empty array if the input array is empty', () => {
    const emptyArr = [];
    const updatedFootnotes = updateFootNotePayload(emptyArr);
    expect(updatedFootnotes).toEqual([]);
  });
});

describe('swapColumnElements function', () => {
  it('should swap two columns in an array of objects', () => {
    const data = [
      {
        columns: [
          {
            col_indx: '0',
            op_type: '',
            cell_id: '',
            value: 'A',
          },
          {
            col_indx: '1',
            op_type: '',
            cell_id: '',
            value: 'B',
          },
        ],
      },
      {
        columns: [
          {
            col_indx: '0',
            op_type: '',
            cell_id: '',
            value: 'D',
          },
          {
            col_indx: '1',
            op_type: '',
            cell_id: '',
            value: 'E',
          },
        ],
      },
    ];

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
    const data = [
      { Text: 'First footnote', qc_change_type_footnote: '' },
      { Text: 'Second footnote', qc_change_type_footnote: 'add' },
      { Text: 'Third footnote', qc_change_type_footnote: 'add' },
    ];
    const expectedFilteredData = [
      {
        PrevousAttachmentIndex: 0,
        Text: 'Second footnote',
        qc_change_type_footnote: 'add',
      },
      {
        PrevousAttachmentIndex: 1,
        Text: 'Third footnote',
        qc_change_type_footnote: 'add',
      },
    ];

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
    const data = [
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
    const data = [
      {
        row_indx: '0',
        roi_id: '46bcd107-d095-4db1-931d-2b4d80719c27',
        op_type: 'modify',
        columns: [
          {
            col_indx: '0',
            op_type: 'modify',
            cell_id: 'b648e887-eb70-4fd3-ba55-daa307b66cd0',
            value: '<p><div>11</div></p>',
          },
          {
            col_indx: '1',
            op_type: 'modify',
            cell_id: '78aa2565-979b-464a-aaf7-25697beaeadb',
            value: '12<p><div><p></p><div></div><p></p></div></p>',
          },
          {
            col_indx: '2',
            op_type: 'modify',
            cell_id: '074d1e0a-6ee2-4102-ab1e-15ab5260d4b6',
            value: '<p><div><p></p><div>13</div><p></p></div></p>',
          },
        ],
      },
      {
        row_indx: '1',
        roi_id: '4e398ad4-8991-43a1-8fd9-f8c2a0ef5895',
        op_type: 'modify',
        columns: [
          {
            col_indx: '0',
            op_type: 'modify',
            cell_id: '7bbb0b8d-cb25-4927-90b3-4a909ae99fe8',
            value: '<p><div>21</div></p>',
          },
          {
            col_indx: '1',
            op_type: 'modify',
            cell_id: 'd33340ea-fa2e-4e81-9da2-bddb9935ac75',
            value: '22<p><div></div></p>',
          },
          {
            col_indx: '2',
            op_type: 'modify',
            cell_id: '89381785-2efb-4cb5-b213-33db7f13d8e9',
            value: '<p><div>23</div></p>',
          },
        ],
      },
    ];
    const filteredData = filterTableProperties(data);
    expect(filteredData.length).toEqual(2);
  });

  test('should filter data with op_type property', () => {
    const data = [
      {
        row_indx: '0',
        op_type: 'add',
        columns: [
          { col_indx: '0', op_type: 'modify' },
          { col_indx: '1', op_type: 'delete' },
        ],
      },
      {
        row_indx: '1',
        op_type: 'delete',
        columns: [
          { col_indx: '0', op_type: 'modify' },
          { col_indx: '1', op_type: 'delete' },
        ],
      },
      {
        row_indx: '2',
        op_type: 'modify',
        columns: [
          { col_indx: '0', op_type: 'modify' },
          { col_indx: '1', op_type: 'delete' },
        ],
      },
    ];

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
    const data = [
      {
        row_indx: '0',
        op_type: 'add',
        columns: [
          { col_indx: '0', op_type: 'modify' },
          { col_indx: '1', op_type: 'delete' },
        ],
      },
      {
        row_indx: '1',
        op_type: 'delete',
        columns: [
          { col_indx: '0', op_type: 'modify' },
          { col_indx: '1', op_type: 'delete' },
        ],
      },
      {
        row_indx: '2',
        op_type: 'modify',
        columns: [
          { col_indx: '0', op_type: 'modify' },
          { col_indx: '1', op_type: 'delete' },
        ],
      },
    ];

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

    // Check that the original rows array is not modified
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ op_type: QC_CHANGE_TYPE.ADDED, data: 'Row 1' });
    expect(rows[1]).toEqual({ op_type: QC_CHANGE_TYPE.UPDATED, data: 'Row 2' });

    // Check the modified result array
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
          { cell_id: '', col_indx: '0', op_type: 'add', value: '' },
          {},
          {},
        ],
      },
      {
        op_type: 'ADDED',
        columns: [
          { cell_id: '', col_indx: '0', op_type: 'add', value: '' },
          {},
          {},
        ],
      },
      {
        op_type: 'DELETED',
        columns: [
          { cell_id: '', col_indx: '0', op_type: 'add', value: '' },
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
          { cell_id: '', col_indx: '1', op_type: 'add', value: '' },
          {},
        ],
      },
      {
        op_type: 'ADDED',
        columns: [
          {},
          { cell_id: '', col_indx: '1', op_type: 'add', value: '' },
          {},
        ],
      },
      {
        op_type: 'DELETED',
        columns: [
          {},
          { cell_id: '', col_indx: '1', op_type: 'add', value: '' },

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
