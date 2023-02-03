import {
  render,
  fireEvent,
  getAllByText,
} from '../../../../../../../test-utils/test-utils';
import Table from '../Table';
import ProtocolContext from '../../../../ProtocolContext';

const tableData = [
  {
    test: { content: 'test' },
    name: { content: 'name1' },
    age: { content: '15' },
  },
  {
    test: { content: 'test' },
    name: { content: 'name2' },
    age: { content: '17' },
  },
  {
    test: { content: 'test' },
    name: { content: 'name1' },
    age: { content: '19' },
  },
];

describe('PD table', () => {
  test('table renders without crashing', () => {
    const wrapper = render(
      <Table
        data={tableData}
        onChange={jest.fn()}
        handleRowOperation={jest.fn()}
        edit={false}
        colWidth={30}
      />,
    );
    expect(wrapper).toBeTruthy();
  });

  test('check number of rows', () => {
    const { getAllByText } = render(
      <Table
        data={tableData}
        onChange={jest.fn()}
        handleRowOperation={jest.fn()}
        edit={false}
        colWidth={30}
      />,
    );
    const testContent = getAllByText('test');
    expect(testContent.length).toEqual(3);
  });
});
