import {
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  updateFootNotePayload,
  swapRowElements,
  swapColumnElements,
  filterTableProperties,
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
  describe('swapElements', () => {
    it('should swap the elements in the array', () => {
      const arr = [1, 2, 3, 4];
      const updatedArr = swapRowElements(arr, 1, 2);
      expect(updatedArr[1]).toBe(3);
      expect(updatedArr[2]).toBe(2);
    });
  });

  describe('updateFootNotePayload', () => {
    it('should update the footnotes in the payload', () => {
      const footnotes = [
        { Text: 'note1' },
        { Text: 'note2' },
        { Text: 'note3' },
      ];
      const updatedFootnotes = updateFootNotePayload(footnotes);
      expect(updatedFootnotes).toEqual([
        {
          Text: 'a. note1',
        },
        {
          Text: 'b. note2',
        },
        {
          Text: 'c. note3',
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
              op_type: 'add',
              cell_id: '',
              value: 'A',
            },
            {
              col_indx: '1',
              op_type: 'add',
              cell_id: '',
              value: 'B',
            },
            {
              col_indx: '2',
              op_type: 'add',
              cell_id: '',
              value: 'C',
            },
          ],
        },
        {
          columns: [
            {
              col_indx: '0',
              op_type: 'add',
              cell_id: '',
              value: 'D',
            },
            {
              col_indx: '1',
              op_type: 'add',
              cell_id: '',
              value: 'E',
            },
            {
              col_indx: '2',
              op_type: 'add',
              cell_id: '',
              value: 'F',
            },
          ],
        },
      ];

      const expectedData = [
        {
          columns: [
            {
              col_indx: '1',
              op_type: 'add',
              cell_id: '',
              value: 'B',
            },
            {
              col_indx: '0',
              op_type: 'add',
              cell_id: '',
              value: 'A',
            },
            {
              col_indx: '2',
              op_type: 'add',
              cell_id: '',
              value: 'C',
            },
          ],
        },
        {
          columns: [
            {
              col_indx: '1',
              op_type: 'add',
              cell_id: '',
              value: 'E',
            },
            {
              col_indx: '0',
              op_type: 'add',
              cell_id: '',
              value: 'D',
            },
            {
              col_indx: '2',
              op_type: 'add',
              cell_id: '',
              value: 'F',
            },
          ],
        },
      ];

      const actualData = swapColumnElements(data, 0, 1);

      expect(actualData).toEqual(expectedData);
    });
  });
});

describe('filterTableProperties', () => {
  const data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 },
  ];

  it('should not filter data if searchValue is not found', () => {
    const filteredData = filterTableProperties(data, '50');
    expect(filteredData).toEqual([]);
  });
});
