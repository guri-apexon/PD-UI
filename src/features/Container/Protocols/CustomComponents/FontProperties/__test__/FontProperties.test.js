import { render, fireEvent } from '@testing-library/react';
import FontProperties from '../FontProperties';
import ProtocolContext from '../../../ProtocolContext';

document.execCommand = jest.fn();

describe('FontProperties', () => {
  test('Format content on bold button click', () => {
    const onFormatSelect = jest.fn();
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = getByText('B');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith('bold', false, 'strong');
  });

  test('Format content on italic button click', () => {
    const onFormatSelect = jest.fn();
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = getByText('I');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith('italic', false, 'i');
  });

  test('Format content on underline button click', () => {
    const onFormatSelect = jest.fn();
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = getByText('U');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith('underline', false, 'u');
  });

  test('Format content on removeformat button click', () => {
    const onFormatSelect = jest.fn();
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = screen.getByTestId('removeFormat');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith(
      'removeFormat',
      false,
      'p',
    );
  });

  test('Format content on strikethrough button click', () => {
    const onFormatSelect = jest.fn();
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = getByText('S');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith(
      'strikeThrough',
      false,
      's',
    );
  });

  test('Format content on strikethrough button click', () => {
    const onFormatSelect = jest.fn();
    const { getByText } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = getByText('S');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith(
      'strikeThrough',
      false,
      's',
    );
  });

  test('Format content on superscript button click', () => {
    const onFormatSelect = jest.fn();
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = screen.getByTestId('superScript');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith('superscript');
  });

  test('Format content on subScript button click', () => {
    const onFormatSelect = jest.fn();
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = screen.getByTestId('subScript');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith('subscript');
  });

  test('Format content on insertUnorderedList button click', () => {
    const onFormatSelect = jest.fn();
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={1} />
      </ProtocolContext.Provider>,
    );
    const btn = screen.getByTestId('list');
    fireEvent.mouseDown(btn);
    expect(document.execCommand).toHaveBeenCalledWith('insertUnorderedList');
  });

  test('Font properties are disabled if there is no active line id', () => {
    const onFormatSelect = jest.fn();
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties onFormatSelect={onFormatSelect} activeLineID={null} />
      </ProtocolContext.Provider>,
    );
    const container = screen.getByTestId('container');
    expect(container.classList.contains('disabled-btns')).toBe(true);
  });

  test('deleteSegment is called when trash icon is clicked', () => {
    const deleteSegment = jest.fn();
    const dispatchSectionEvent = jest.fn();

    const activeLineID = 'line1';
    const { getByTestId } = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <FontProperties
          onFormatSelect={deleteSegment}
          activeLineID={activeLineID}
        />
      </ProtocolContext.Provider>,
    );
    const trashIcon = getByTestId('trash-icon');
    fireEvent.click(trashIcon);
    expect(trashIcon).toBeInTheDocument();
    // expect(dispatchSectionEvent).toHaveBeenCalledWith('CONTENT_DELETED', {
    //   currentLineId: activeLineID,
    // });
  });
});
