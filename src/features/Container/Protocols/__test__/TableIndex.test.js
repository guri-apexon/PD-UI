import { render, fireEvent } from '@testing-library/react';
import { ProtocolContext } from '../ProtocolContext';
import PDTable from '../CustomComponents/PDTable/index';

describe('PDTable component', () => {
  const data = {
    TableProperties:
      '[{"col_1": {"roi_id": {"row_roi_id": "row_1", "table_roi_id": "table_1", "column_roi_id": "col_1"}}}]',
  };
  const segment = {};
  const activeLineID = 'line_1';
  const lineID = 'line_1';

  it('renders the component', () => {
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
        />
      </ProtocolContext.Provider>,
    );
    expect(getByText('No Formating')).toBeInTheDocument();
  });

  it('handles change in content', () => {
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
        />
      </ProtocolContext.Provider>,
    );
    const input = getByTestId('input-cell');
    fireEvent.change(input, { target: { value: 'Test Content' } });
    expect(input.value).toBe('Test Content');
  });
});
