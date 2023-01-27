import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FontProperties from '../CustomComponents/FontProperties/FontProperties';

describe('FontProperties', () => {
  test('onFormatSelect is called with correct button parameter when format button is clicked', () => {
    const onFormatSelect = jest.fn();
    const { getByText } = render(
      <FontProperties onFormatSelect={onFormatSelect} />,
    );
    const boldButton = getByText('B');
    fireEvent.click(boldButton);
    expect(onFormatSelect).toHaveBeenCalledWith(expect.any(Object), 'B');
  });
  test('deleteSegment is called when trash icon is clicked', () => {
    const deleteSegment = jest.fn();
    const { getByTestId } = render(
      <FontProperties deleteSegment={deleteSegment} />,
    );
    const trashIcon = getByTestId('trash-icon');
    fireEvent.click(trashIcon);
    expect(deleteSegment).toHaveBeenCalled();
  });
  test('dispatchSectionEvent is called with correct arguments when deleteSegment is called', () => {
    const dispatchSectionEvent = jest.fn();
    const activeLineID = 'line1';
    const contextValue = { dispatchSectionEvent };
    jest.spyOn(React, 'useContext').mockImplementation(() => contextValue);
    const { getByTestId } = render(
      <FontProperties activeLineID={activeLineID} />,
    );
    const trashIcon = getByTestId('trash-icon');
    fireEvent.click(trashIcon);
    expect(dispatchSectionEvent).toHaveBeenCalledWith('CONTENT_DELETED', {
      currentLineId: activeLineID,
    });
  });
});
