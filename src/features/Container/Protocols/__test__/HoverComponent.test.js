import { fireEvent, render } from '@testing-library/react';
import HoverComponent from '../CustomComponents/HoverComponent';
import * as ProtocolContext from '../ProtocolContext';

describe('HoverComponent', () => {
  test('HoverComponent renders correctly with props', () => {
    const lineId = '123';
    const activeLineID = '456';
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <HoverComponent lineId={lineId} activeLineID={activeLineID} />,
    );
    expect(
      getByTestId('hover-component').classList.contains('contentmenu'),
    ).toBe(true);
    expect(getByTestId('addIcon')).toBeInTheDocument();
  });

  test('handleAddSegment function', () => {
    const lineId = '123';
    const activeLineID = '123';
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <HoverComponent lineId={lineId} activeLineID={activeLineID} />,
    );
    const addIcon = getByTestId('addIcon');
    fireEvent.click(addIcon);
    const header = getByTestId('header');
    fireEvent.click(header);
  });

  test('handleAddSegment function on text', () => {
    const lineId = '123';
    const activeLineID = '123';
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <HoverComponent lineId={lineId} activeLineID={activeLineID} />,
    );
    const addIcon = getByTestId('addIcon');
    fireEvent.click(addIcon);
    const text = getByTestId('text');
    fireEvent.click(text);
  });

  test('handleAddSegment function on table', () => {
    const lineId = '123';
    const activeLineID = '123';
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <HoverComponent lineId={lineId} activeLineID={activeLineID} />,
    );
    const addIcon = getByTestId('addIcon');
    fireEvent.click(addIcon);
    const text = getByTestId('table');
    fireEvent.click(text);
  });

  test('handleAddSegment function on image', () => {
    const lineId = '123';
    const activeLineID = '123';
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <HoverComponent lineId={lineId} activeLineID={activeLineID} />,
    );
    const addIcon = getByTestId('addIcon');
    fireEvent.click(addIcon);
    const text = getByTestId('image');
    fireEvent.click(text);
  });

  it('should not show the contentmenu', () => {
    const defaultProps = {
      lineId: '123',
      activeLineID: '123',
      disabled: false,
    };

    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <HoverComponent {...defaultProps} activeLineID="456" />,
    );

    expect(getByTestId('hover-component')).toHaveClass('hide');
  });

  it('should show the contentmenu', () => {
    const defaultProps = {
      lineId: '123',
      activeLineID: '123',
      disabled: false,
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <HoverComponent {...defaultProps} activeLineID="123" />,
    );

    expect(getByTestId('hover-component')).toHaveClass('show');
  });
});
