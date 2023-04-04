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
      row_indx: '0',
      roi_id: '1738b2db-d8cf-41e3-82be-006978f0373b',
      op_type: null,
      columns: [
        {
          col_indx: '0',
          op_type: null,
          cell_id: '0d63bbc2-8d6d-46b3-aadb-fcf6acbf7fbf',
          value: 'Procedure Assessment',
        },
        {
          col_indx: '1',
          op_type: null,
          cell_id: '01292603-df0e-4df0-99a6-7337d86ab6e4',
          value: 'Within 15 min Pre-PEX',
        },
        {
          col_indx: '2',
          op_type: null,
          cell_id: '9b14edf6-13e1-4b2a-8a16-91b70a8bce0b',
          value: 'Within 15 min Post- PEX',
        },
        {
          col_indx: '3',
          op_type: null,
          cell_id: '8a670a32-9c16-42c2-82d0-e4666f6800e1',
          value: 'Within 15 min post end of IP infusion #1 <sup>c<\\/sup>',
        },
        {
          col_indx: '4',
          op_type: null,
          cell_id: 'de02b4aa-fc27-4333-9be8-984d71da66cb',
          value: '0.5-3 h post end of IP infusion #1 <sup>c<\\/sup>',
        },
        {
          col_indx: '5',
          op_type: null,
          cell_id: 'f35f472a-7700-42f0-8407-30a0dd4510c5',
          value: '4-6 h post  end of IP  infusion #1 <sup>c<\\/sup>',
        },
        {
          col_indx: '6',
          op_type: null,
          cell_id: '2cce9576-12a4-4924-8318-2dd343e07b58',
          value: 'Within 30 min pre-IP infusion #2',
        },
        {
          col_indx: '7',
          op_type: null,
          cell_id: '9660b458-4da7-4fcf-82e5-a0c5426d9212',
          value: 'Within 15 ',
        },
        {
          col_indx: '8',
          op_type: null,
          cell_id: 'bb2d14f8-8c07-47f9-99f8-ce52f6ed4849',
          value: '0.5-3 h post end of IP infusion #2',
        },
      ],
    },
    {
      row_indx: '1',
      roi_id: '97d19d88-aba3-4130-84da-f48c65271c6c',
      op_type: 'delete',
      columns: [
        {
          col_indx: '0',
          op_type: null,
          cell_id: 'c40d95bf-b047-44f5-9109-45866d81806d',
          value: 'ADAMTS-13 activity',
        },
        {
          col_indx: '1',
          op_type: null,
          cell_id: '91a74b62-37ad-4e00-9287-f2a267ea1854',
          value: 'X',
        },
        {
          col_indx: '2',
          op_type: null,
          cell_id: '3a28309c-7a17-4379-b2ff-5777c9fb47eb',
          value: 'X',
        },
        {
          col_indx: '3',
          op_type: null,
          cell_id: 'e155d076-c464-4aa4-8114-52d6cbabe65f',
          value: 'X<sup> a<\\/sup>',
        },
        {
          col_indx: '4',
          op_type: null,
          cell_id: '68b110c7-9d33-42a8-984d-0b86ea867aef',
          value: 'X<sup> a<\\/sup>',
        },
        {
          col_indx: '5',
          op_type: null,
          cell_id: 'e7330cf7-4d3d-4fbb-95d3-b8a80c263dda',
          value: 'X',
        },
        {
          col_indx: '6',
          op_type: null,
          cell_id: '6b6ba063-70f1-4d2b-ad56-7ae756874f15',
          value: 'X<sup> b<\\/sup>',
        },
        {
          col_indx: '7',
          op_type: null,
          cell_id: 'bc13580d-2311-4b91-aa4b-d7dd9827d12b',
          value: 'X<sup> b<\\/sup>',
        },
        {
          col_indx: '8',
          op_type: null,
          cell_id: '682027d1-c482-4946-80d5-96e9c9d57feb',
          value: 'X<sup> b<\\/sup>',
        },
      ],
    },
    {
      row_indx: '2',
      roi_id: '3f4a15a1-3ab7-402e-9aef-efe10f00c74d',
      op_type: null,
      columns: [
        {
          col_indx: '0',
          op_type: null,
          cell_id: '33ef35cc-fe00-4ce3-aa79-364702882cb0',
          value: 'ADAMTS-13 antigen',
        },
        {
          col_indx: '1',
          op_type: null,
          cell_id: 'd6abf954-3977-44a5-b883-4a09bdc1f505',
          value: 'X',
        },
        {
          col_indx: '2',
          op_type: null,
          cell_id: 'ff33c429-4cfd-4c3f-89c3-03084814861f',
          value: 'X',
        },
        {
          col_indx: '3',
          op_type: null,
          cell_id: 'd8195ba3-af51-4610-a470-11a1311adb73',
          value: 'X<sup> a<\\/sup>',
        },
        {
          col_indx: '4',
          op_type: null,
          cell_id: 'f20d6a74-02bb-4599-834d-6674503f32e8',
          value: 'X<sup> a<\\/sup>',
        },
        {
          col_indx: '5',
          op_type: null,
          cell_id: '2dd25a22-7a3c-4a84-bbe5-1d16d24fe547',
          value: 'X',
        },
        {
          col_indx: '6',
          op_type: null,
          cell_id: '33a26172-ddc1-460b-89a3-b7fd199df195',
          value: 'X<sup> b<\\/sup>',
        },
        {
          col_indx: '7',
          op_type: null,
          cell_id: 'e479c316-421d-4f32-aa56-18a4f1969d93',
          value: 'X<sup> b<\\/sup>',
        },
        {
          col_indx: '8',
          op_type: null,
          cell_id: '166f9b84-ba3b-46d6-998a-f0a5b2c30c6c',
          value: 'X<sup> b<\\/sup>',
        },
      ],
    },
    {
      row_indx: '3',
      roi_id: '',
      op_type: null,
      columns: [
        {
          col_indx: '0',
          op_type: null,
          cell_id: '6c548ce7-09d2-4a61-a141-c520aa83350a',
          value: 'Anti- rADAMTS- 13 binding Ig',
        },
        {
          col_indx: '1',
          op_type: null,
          cell_id: '406453c3-9413-43b4-8f53-7c8a95ed6f7c',
          value: 'X',
        },
        {
          col_indx: '2',
          op_type: null,
          cell_id: '65d6d168-9471-4936-ac45-da970c6d4be4',
          value: 'X',
        },
        {
          col_indx: '3',
          op_type: null,
          cell_id: '',
          value: '',
        },
        {
          col_indx: '4',
          op_type: null,
          cell_id: '',
          value: '',
        },
        {
          col_indx: '5',
          op_type: null,
          cell_id: '16029436-c358-4c63-bfab-9e1db25f3c77',
          value: 'X',
        },
        {
          col_indx: '6',
          op_type: null,
          cell_id: '7e051752-ae94-465a-ba76-6e0fc11f1516',
          value: 'X<sup> b<\\/sup>',
        },
        {
          col_indx: '7',
          op_type: null,
          cell_id: '',
          value: '',
        },
        {
          col_indx: '8',
          op_type: null,
          cell_id: '',
          value: '',
        },
      ],
    },
    {
      row_indx: '4',
      roi_id: '',
      op_type: null,
      columns: [
        {
          col_indx: '0',
          op_type: null,
          cell_id: '353592f1-2be9-4540-9ccd-30e39cb4ea48',
          value: 'Anti- ADAMTS-13 inhibitory antibodies',
        },
        {
          col_indx: '1',
          op_type: null,
          cell_id: '86992922-5438-4ddd-8743-6d8a5be1b3c8',
          value: 'X',
        },
        {
          col_indx: '2',
          op_type: null,
          cell_id: 'b24ae70d-8dbf-4158-a9c1-2c501f9e5e9e',
          value: 'X',
        },
        {
          col_indx: '3',
          op_type: null,
          cell_id: '',
          value: '',
        },
        {
          col_indx: '4',
          op_type: null,
          cell_id: '',
          value: '',
        },
        {
          col_indx: '5',
          op_type: null,
          cell_id: '992ef076-aee8-4e55-8ade-dbe1c193dd76',
          value: 'X',
        },
        {
          col_indx: '6',
          op_type: null,
          cell_id: '1c170450-7b62-445f-9069-64d2b430385a',
          value: 'X<sup> b<\\/sup>',
        },
        {
          col_indx: '7',
          op_type: null,
          cell_id: '',
          value: '',
        },
        {
          col_indx: '8',
          op_type: null,
          cell_id: '',
          value: '',
        },
      ],
    },
  ];

  test('addRow function', () => {
    const result = addRow(data, 1);
    expect(result.length).toEqual(6);
  });

  test('deleterow function', () => {
    const result = deleteRow(data, 0);
    expect(result.length).toEqual(5);
    expect(result[0].op_type).toEqual('delete');
  });

  test('addcolumn function', () => {
    const result = addColumn(data, 0);
    expect(result.length).toEqual(5);
  });

  test('deleteColumn function', () => {
    const result = deleteColumn(data, 0);
    expect(result.length).toEqual(5);
    expect(result[1].op_type).toEqual('delete');
  });
});
