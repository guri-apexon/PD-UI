import { render, fireEvent } from '@testing-library/react';
import HoverComponent from '../CustomComponents/HoverComponent';
import ProtocolContext from '../ProtocolContext';

describe('HoverComponent', () => {
  test('HoverComponent renders correctly with props', () => {
    const lineId = '123';
    const activeLineID = '456';
    const { getByTestId } = render(
      <HoverComponent lineId={lineId} activeLineID={activeLineID} />,
    );
    expect(
      getByTestId('hover-component').classList.contains('contentmenu'),
    ).toBe(true);
  });
  test('handleAddSegment dispatches the correct action', () => {
    const lineId = '123';
    const activeLineID = '456';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <HoverComponent lineId={lineId} activeLineID={activeLineID} />{' '}
      </ProtocolContext.Provider>,
    );
    const spy = jest.spyOn('dispatchSectionEvent');
    fireEvent.click(getByTestId('text-element'));
    expect(spy).toHaveBeenCalledWith('CONTENT_ADDED', { type: 'text', lineId });
  });

  test('Plus icon is rendered within HoverComponent', () => {
    const lineId = '123';
    const activeLineID = '456';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <HoverComponent lineId={lineId} activeLineID={activeLineID} />
      </ProtocolContext.Provider>,
    );
    expect(getByTestId('plus-icon')).toBeInTheDocument();
  });

  test('menuItems are rendered correctly', () => {
    const lineId = '123';
    const activeLineID = '456';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <HoverComponent lineId={lineId} activeLineID={activeLineID} />
      </ProtocolContext.Provider>,
    );
    expect(getByTestId('text-element')).toBeInTheDocument();
    expect(getByTestId('text-header-2')).toBeInTheDocument();
  });

  test('classname of component changes when lineId is equal to activeLineID', () => {
    const lineId = '123';
    const activeLineID = '123';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <HoverComponent lineId={lineId} activeLineID={activeLineID} />
      </ProtocolContext.Provider>,
    );
    expect(getByTestId('hover-component').classList.contains('show')).toBe(
      true,
    );
  });
});
