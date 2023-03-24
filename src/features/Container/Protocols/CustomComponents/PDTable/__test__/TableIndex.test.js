import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { ProtocolContext } from '../../../ProtocolContext';
import PDTable from '../index';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
const handleSwap = jest.fn();

describe('PDTable component', () => {
  const data = {
    TableProperties:
      '[{"row_roi_id":"","row_idx":"0","row_props":{"0":{"content":"10","roi_id":{"row_roi_id":"","datacell_roi_id":""}},"1":{"content":"11","roi_id":{"table_roi_id":"","row_roi_id":"","column_roi_id":"","datacell_roi_id":""}}}},{"row_roi_id":"","row_idx":"1","row_props":{"0":{"content":"12","roi_id":{"table_roi_id":"","row_roi_id":"","column_roi_id":"","datacell_roi_id":""}},"1":{"content":"13","roi_id":{"table_roi_id":"","row_roi_id":"","column_roi_id":"","datacell_roi_id":""}}}},{"row_roi_id":"","row_idx":"2","row_props":{"0":{"content":"14","roi_id":{"table_roi_id":"","row_roi_id":"","column_roi_id":"","datacell_roi_id":""}},"1":{"content":"15","roi_id":{"table_roi_id":"","row_roi_id":"","column_roi_id":"","datacell_roi_id":""}}}},{"row_roi_id":"","row_idx":"3","row_props":{"0":{"content":"16","roi_id":{"table_roi_id":"","row_roi_id":"","column_roi_id":"","datacell_roi_id":""}},"1":{"content":"17","roi_id":{"table_roi_id":"","row_roi_id":"","column_roi_id":"","datacell_roi_id":""}}}}]',
  };
  const segment = {};
  const activeLineID = 'line_1';
  const lineID = 'line_1';

  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    const wrapper = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          handleSwap={handleSwap}
        />
      </ProtocolContext.Provider>,
    );
    expect(wrapper).toBeTruthy();
  });

  it('handles the  Delete action', () => {
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          setIsTableChanged={() => jest.fn()}
          handleSwap={handleSwap}
        />
      </ProtocolContext.Provider>,
    );
    const saveBtn = getByText('Delete');
    fireEvent.click(saveBtn);
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
          handleSwap={handleSwap}
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
          handleSwap={handleSwap}
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
          handleSwap={handleSwap}
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
          handleSwap={handleSwap}
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
    const noButtonRow = screen.getByText('No');
    fireEvent.click(noButtonRow);
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
          handleSwap={handleSwap}
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
          handleSwap={handleSwap}
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

  it('should dispatch a CONTENT_UPDATE event when activeLineID is not equal to lineID and tableSaved is false', () => {
    const mockdispatchSectionEvent = jest.fn();
    render(
      <ProtocolContext.Provider
        value={{ dispatchSectionEvent: mockdispatchSectionEvent }}
      >
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID="line_2"
          setIsTableChanged={() => jest.fn()}
          handleSwap={handleSwap}
        />
      </ProtocolContext.Provider>,
    );
    const sectionContainer = screen.getByTestId('section');
    fireEvent.click(sectionContainer);
    expect(mockdispatchSectionEvent).toHaveBeenCalledWith('CONTENT_UPDATE', {
      content: {},
      currentLineId: 'line_2',
      isSaved: false,
      lineID: 'line_2',
      type: 'table',
    });
  });

  test('onContainerClick', () => {
    const tableSaved = false;
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          tableSaved={tableSaved}
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    const moreIcon = screen.getAllByTestId('more-icon');
    fireEvent.click(moreIcon[0]);
    screen.debug();
    const HeaderClose = screen.getByTestId('section');
    fireEvent.click(HeaderClose);
    expect(dispatch).not.toHaveBeenCalled();
  });

  test('onContainerClick tableSaved', () => {
    const tableSaved = true;
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          tableSaved={tableSaved}
          setIsTableChanged={() => jest.fn()}
        />
      </ProtocolContext.Provider>,
    );
    const HeaderClose = screen.getByTestId('section');
    fireEvent.click(HeaderClose);
    expect(dispatch).not.toHaveBeenCalled();
  });

  test('modal onclose Delete ', () => {
    const onClose = jest.fn();
    const setIsModal = jest.fn();
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          setIsTableChanged={() => jest.fn()}
          setIsModal={setIsModal}
          onClose={onClose}
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

    const closeButton = screen.getByTestId('modal-close-button');
    expect(
      screen.getByText('Please confirm if you want to continue with deletion'),
    ).toBeTruthy();
    fireEvent.click(closeButton);
    const yesButtonRow = screen.getByText('Yes');
    fireEvent.click(yesButtonRow);
    const noButtonRow = screen.getByText('No');
    fireEvent.click(noButtonRow);

    expect(onClose).toHaveBeenCalledTimes(0);
  });

  test('Add Footnote', () => {
    const tableSaved = false;

    render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          tableSaved={tableSaved}
          setIsTableChanged={() => jest.fn()}
          edit
        />
      </ProtocolContext.Provider>,
    );

    const plusIconButton = screen.getByTestId('button-container');
    fireEvent.click(plusIconButton);
  });

  test('section', () => {
    const tableSaved = false;

    render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <PDTable
          data={data}
          segment={segment}
          activeLineID={activeLineID}
          lineID={lineID}
          tableSaved={tableSaved}
          setIsTableChanged={() => jest.fn()}
          edit
        />
      </ProtocolContext.Provider>,
    );

    const plusIconButton = screen.getByTestId('section');
    fireEvent.click(plusIconButton);
  });
});
