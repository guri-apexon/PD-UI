import { render, fireEvent } from '../../../../../../../test-utils/test-utils';
import Table from '../Table';
import ProtocolContext from '../../../../ProtocolContext';

const tableData = [
  {
    name: { content: 'name1' },
    age: { content: '15' },
  },
  {
    name: { content: 'name2' },
    age: { content: '17' },
  },
  {
    name: { content: 'name1' },
    age: { content: '19' },
  },
];

describe('PD table', () => {
  test('table renders without crashing', () => {
    // const wrapper=render (<Table data=, onChange, handleRowOperation, edit, colWidth)
  });
});
