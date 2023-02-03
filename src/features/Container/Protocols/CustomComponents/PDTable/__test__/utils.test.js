import { updateTable } from '../utils';

describe('utils', () => {
  test('updateTable function', () => {
    const data = [{ data: { content: '' } }];
    const result = updateTable(data, 'test', 0, 'data');
    expect(result).toEqual([{ data: { content: 'test' } }]);
  });
});
