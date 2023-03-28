import {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  updateTable,
} from '../utils';

describe('utils', () => {
  test('updateTable function', () => {
    const data1 = [{ data: { content: '' } }];
    const result = updateTable(data1, 'test', 0, 'data');
    expect(result).toEqual([{ data: { content: 'test' } }]);
  });

  const data = [
    {
      row_roi_id: '',
      row_idx: '0',
      row_props: {
        0: {
          content: '10',
          roi_id: {
            row_roi_id: '',
            datacell_roi_id: '',
          },
        },
        1: {
          content: '11',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '',
            column_roi_id: '',
            datacell_roi_id: '',
          },
        },
      },
    },
    {
      row_roi_id: '',
      row_idx: '1',
      row_props: {
        0: {
          content: '12',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '',
            column_roi_id: '',
            datacell_roi_id: '',
          },
        },
        1: {
          content: '13',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '',
            column_roi_id: '',
            datacell_roi_id: '',
          },
        },
      },
    },
  ];

  test('addRow function', () => {
    const result = addRow(data, 1);
    expect(result.length).toEqual(3);
  });

  test('deleterow function', () => {
    const result = deleteRow(data, 0);
    expect(result.length).toEqual(2);
    expect(result[0].row_props['0'].qc_change_type).toEqual('delete');
  });

  test('addcolumn function', () => {
    const result = addColumn(data, 0);
    expect(result.length).toEqual(2);
  });

  test('deleteColumn function', () => {
    const result = deleteColumn(data, 0);
    expect(result.length).toEqual(2);
    expect(result[0].row_props['0'].qc_change_type).toEqual('delete');
  });
});
