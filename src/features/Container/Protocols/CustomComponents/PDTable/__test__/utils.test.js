import {
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  swapElements,
  updateFootNotePayload,
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
      const updatedArr = swapElements(arr, 1, 2);
      expect(updatedArr[1]).toBe(3);
      expect(updatedArr[2]).toBe(2);
    });
  });

  describe('updateFootNotePayload', () => {
    it('should update the footnotes in the payload', () => {
      const footnotes = [
        { footnote_indicator: '', footnote_text: 'note1' },
        { footnote_indicator: '', footnote_text: 'note2' },
        { footnote_indicator: '', footnote_text: 'note3' },
      ];
      const updatedFootnotes = updateFootNotePayload(footnotes);
      expect(updatedFootnotes).toEqual([
        {
          previous_sequnce_index: null,
          footnote_indicator: 'a',
          footnote_text: 'a. note1',
        },
        {
          previous_sequnce_index: 0,
          footnote_indicator: 'b',
          footnote_text: 'b. note2',
        },
        {
          previous_sequnce_index: 1,
          footnote_indicator: 'c',
          footnote_text: 'c. note3',
        },
      ]);
    });

    it('should return an empty array if the input array is empty', () => {
      const emptyArr = [];
      const updatedFootnotes = updateFootNotePayload(emptyArr);
      expect(updatedFootnotes).toEqual([]);
    });
  });
});
