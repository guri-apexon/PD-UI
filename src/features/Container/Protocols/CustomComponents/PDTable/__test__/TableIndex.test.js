import { render, fireEvent } from '@testing-library/react';
import { ProtocolContext } from '../../../ProtocolContext';
import PDTable from '../index';

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
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    const saveBtn = getByText('Save Table');
    fireEvent.click(saveBtn);
  });

  it('handles the delete cancel action', () => {
    const { getByText, getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    const dltBtn = getByText('Delete');
    fireEvent.click(dltBtn);
    const confirmPopup = getByTestId('confirmPopup');
    expect(confirmPopup).toBeInTheDocument();

    const cancelBtn = getByText('Cancel');
    fireEvent.click(cancelBtn);
  });

  it('handles the delete success action', () => {
    const { getByText, getByTestId, getAllByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    const dltBtn = getByText('Delete');
    fireEvent.click(dltBtn);
    const confirmPopup = getByTestId('confirmPopup');
    expect(confirmPopup).toBeInTheDocument();

    const dltOk = getAllByText('Delete')[0];
    fireEvent.click(dltOk);
  });

  test('Delete table data', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    const moreIcon = screen.getAllByTestId('more-icon');
    fireEvent.click(moreIcon[0]);
    const deleteColumn = screen.getByText('Delete Column');
    fireEvent.click(deleteColumn);
    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);
    const moreIconRow = screen.getAllByTestId('more-icon-row');
    fireEvent.click(moreIconRow[0]);
    const deleteRow = screen.getByText('Delete row');
    fireEvent.click(deleteRow);
    const yesButtonRow = screen.getByText('Yes');
    fireEvent.click(yesButtonRow);
  });

  test('handleColumnOperation', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    let moreIcon = screen.getAllByTestId('more-icon');
    fireEvent.click(moreIcon[0]);

    const addColumnRight = screen.getByText('Add Column to Right');
    fireEvent.click(addColumnRight);
    moreIcon = screen.getAllByTestId('more-icon');
    fireEvent.click(moreIcon[0]);
    const addColumnLeft = screen.getByText('Add Column to left');
    fireEvent.click(addColumnLeft);
  });

  test('handleRowOperation', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    let moreIcon = screen.getAllByTestId('more-icon-row');
    fireEvent.click(moreIcon[0]);
    const addRowBelow = screen.getByText('Add row below');
    fireEvent.click(addRowBelow);
    moreIcon = screen.getAllByTestId('more-icon-row');
    fireEvent.click(moreIcon[1]);
    const addRowAbove = screen.getByText('Add row above');
    fireEvent.click(addRowAbove);
  });
});
