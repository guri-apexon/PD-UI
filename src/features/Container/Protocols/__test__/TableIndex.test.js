import { render, fireEvent } from '@testing-library/react';
import { ProtocolContext } from '../ProtocolContext';
import PDTable from '../CustomComponents/PDTable/index';

describe('PDTable component', () => {
  const data = {
    TableProperties:
      '[{"col_1": {"roi_id": {"row_roi_id": "row_1", "table_roi_id": "table_1", "column_roi_id": "col_1","content":"test11"}}}]',
  };
  const segment = {};
  const activeLineID = 'line_1';
  const lineID = 'line_1';

  it('renders the component', () => {
    const wrapper = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
        />
      </ProtocolContext.Provider>,
    );
    expect(wrapper).toBeTruthy();
  });

  it('handles the  save action', () => {
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
    const saveBtn = getByText('Save Table');
    fireEvent.click(saveBtn);
  });

  it('handles the delete action', () => {
    const { getByText, getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
        />
      </ProtocolContext.Provider>,
    );
    const dltBtn = getByText('Delete');
    fireEvent.click(dltBtn);
    const confirmPopup = getByTestId('confirmPopup');
    expect(confirmPopup).toBeInTheDocument();
  });
});
