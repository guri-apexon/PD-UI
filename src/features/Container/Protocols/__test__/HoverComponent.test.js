import { render } from '@testing-library/react';
import HoverComponent from '../CustomComponents/HoverComponent';
import ProtocolContext from '../ProtocolContext';

describe('HoverComponent', () => {
  test('HoverComponent renders correctly with props', () => {
    const lineId = '123';
    const activeLineID = '456';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <HoverComponent lineId={lineId} activeLineID={activeLineID} />
      </ProtocolContext.Provider>,
    );
    expect(
      getByTestId('hover-component').classList.contains('contentmenu'),
    ).toBe(true);
    expect(getByTestId('addIcon')).toBeInTheDocument();
  });

  test('handleAddSegment function', () => {
    const lineId = '123';
    const activeLineID = '123';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <HoverComponent lineId={lineId} activeLineID={activeLineID} />
      </ProtocolContext.Provider>,
    );
    const addIcon = getByTestId('addIcon');
    fireEvent.click(addIcon);
    const header = getByTestId('header');
    fireEvent.click(header);
  });

  test('handleAddSegment function on text', () => {
    const lineId = '123';
    const activeLineID = '123';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <HoverComponent lineId={lineId} activeLineID={activeLineID} />
      </ProtocolContext.Provider>,
    );
    const addIcon = getByTestId('addIcon');
    fireEvent.click(addIcon);
    const text = getByTestId('text');
    fireEvent.click(text);
  });
});
