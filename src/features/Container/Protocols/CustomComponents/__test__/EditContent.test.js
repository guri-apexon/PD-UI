import { render, fireEvent } from '../../../../../test-utils/test-utils';
import ContentEdit from '../ContentEdit';

import * as ProtocolContext from '../../ProtocolContext'; // note we're importing with a * to import all the exports

describe('DigitizedEdit', () => {
  test('render component without error', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <ContentEdit
        type="text"
        lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
        content="test content"
        deleteSection={() => null}
        edit="true"
      />,
    );

    expect(screen).toBeTruthy();
  });

  test('keypress events on content editable', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <ContentEdit
        type="text"
        lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
        content="test content"
        deleteSection={() => null}
        edit="true"
      />,
    );

    const element = screen.getByTestId('contentEdit');
    expect(element.textContent).toBe('test content');
  });

  test('delete event on content editable', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <ContentEdit
        type="text"
        lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
        content={null}
        deleteSection={() => null}
        edit="true"
      />,
    );

    const element = screen.getByTestId('contentEdit');
    element.focus();
    fireEvent.keyDown(element, {
      key: 'Backspace',
      code: 'Backspace',
      charCode: 48,
    });
  });

  test('blur event on content editable', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <ContentEdit
        type="text"
        lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
        content=""
        deleteSection={() => null}
        edit="true"
      />,
    );

    const element = screen.getByTestId('contentEdit');
    element.focus();
    element.blur();
  });
});
