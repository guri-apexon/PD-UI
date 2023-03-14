import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../../test-utils/test-utils';
import { rowRecords, headerGroups, cols, expectedCols } from './mockdata';
import SOA from '../SOA';
import { checkAndPush, getTableColumns } from '../utils';
import { toggleItemFromArray } from '../Context/TableContext';

describe('SOA Testing', () => {
  it('test', () => {
    const screen = render(<SOA />);
    const testId = screen.getByTestId('soaTable');
    expect(testId).toBeInTheDocument();
  });
  it('test checkAndPush', () => {
    let initialLength = rowRecords.length;
    let record = { table_column_index: 0, table_row_index: 3 };
    checkAndPush(rowRecords, record);
    expect(rowRecords.length).toEqual(initialLength + 1);
    record = { table_column_index: 0, table_row_index: 0 };
    initialLength = rowRecords.length;
    checkAndPush(rowRecords, record);
    expect(rowRecords.length).toEqual(initialLength);
  });
  it('test getTableColumns', () => {
    const resultColumns = getTableColumns(cols, headerGroups);
    expect(JSON.stringify(resultColumns)).toEqual(JSON.stringify(expectedCols));
  });

  it('test toggleItemFromArray', () => {
    const arr = [1, 2];
    const len = arr.length;
    toggleItemFromArray(arr, 3);
    expect(arr.length).toEqual(len + 1);
    toggleItemFromArray(arr, 3);
    expect(arr.length).toEqual(len + 1);
  });
});
