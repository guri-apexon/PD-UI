import { updateTable } from '../utils';

describe('utils', () => {
  test('updateTable function', () => {
    const data = [{ data: { content: '' } }];
    const result = updateTable(data, 'test', 0, 'data');
    expect(result).toEqual([{ data: { content: 'test' } }]);
  });

  test('addRow function', () => {
    const data = [
      {
        '1.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '4dcc94f4-5102-4fe1-a557-7f377e15ea51',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: '93fef9e4-65cb-474f-83df-8a3f6f0a68be',
          qc_change_type: '',
        },
        '2.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '4dcc94f4-5102-4fe1-a557-7f377e15ea51',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: 'e8d7a4d8-aec3-4275-ad99-10bdbcac8bbf',
          qc_change_type: '',
        },
      },
    ];
    const result = addRow(data, 1);
    expect(result.length).toEqual(2);
  });

  test('deleterow function', () => {
    const data = [
      {
        '1.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '4dcc94f4-5102-4fe1-a557-7f377e15ea51',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: '93fef9e4-65cb-474f-83df-8a3f6f0a68be',
          qc_change_type: '',
        },
        '2.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '4dcc94f4-5102-4fe1-a557-7f377e15ea51',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: 'e8d7a4d8-aec3-4275-ad99-10bdbcac8bbf',
          qc_change_type: '',
        },
      },
    ];
    const result = deleteRow(data, 0);
    expect(result.length).toEqual(1);
    expect(result[0]['1.0'].qc_change_type).toEqual('delete');
  });

  test('addcolumn function', () => {
    const data = [
      {
        '1.0': {
          entities: [],
          content: '122',
          roi_id: {
            table_roi_id: '',
            row_roi_id: 'aed3ea44-682c-45c2-abec-b8bcaf980a94',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: '616204e3-a35b-457f-9d18-116b79b3bdb9',
          qc_change_type: '',
        },
        '2.0': {
          entities: [],
          content: '12',
          roi_id: {
            table_roi_id: '',
            row_roi_id: 'aed3ea44-682c-45c2-abec-b8bcaf980a94',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: 'bb8133c9-d851-4ea9-b1e0-e39c4a1b9204',
          qc_change_type: '',
        },
      },
      {
        '1.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '323c2fe0-7d01-4635-9ffd-0da1ed6f8580',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: '4d7b9fd6-74f0-4bfc-9bc4-323866ecf7e6',
          qc_change_type: '',
        },
        '2.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '323c2fe0-7d01-4635-9ffd-0da1ed6f8580',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: '377e1596-6c90-4ff3-a4cd-33a3ed4a82dd',
          qc_change_type: '',
        },
      },
    ];

    const result = addColumn(data, 0);
    expect(result.length).toEqual(2);
  });

  test('deleteColumn function', () => {
    const data = [
      {
        '1.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '4dcc94f4-5102-4fe1-a557-7f377e15ea51',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: '93fef9e4-65cb-474f-83df-8a3f6f0a68be',
          qc_change_type: '',
        },
        '2.0': {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: '',
            row_roi_id: '4dcc94f4-5102-4fe1-a557-7f377e15ea51',
            column_roi_id: '',
            datacell_roi_id: '',
          },
          table_index: 'e8d7a4d8-aec3-4275-ad99-10bdbcac8bbf',
          qc_change_type: '',
        },
      },
    ];
    const result = deleteColumn(data, 0);
    expect(result.length).toEqual(1);
    expect(result[0]['1.0'].qc_change_type).toEqual('delete');
  });
});
