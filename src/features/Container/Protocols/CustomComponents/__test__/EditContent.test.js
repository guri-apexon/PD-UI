import { render, fireEvent } from '../../../../../test-utils/test-utils';
import EditContent from '../EditContent';
import ProtocolContext from '../../ProtocolContext';

describe('DigitizedEdit', () => {
  test('render component without error', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <EditContent
          type="text"
          lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
          content="test content"
          deleteSection={() => null}
          edit="true"
        />
      </ProtocolContext.Provider>,
    );

    expect(screen).toBeTruthy();
  });

  test('keypress events on content editable', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <EditContent
          type="text"
          lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
          content="test content"
          deleteSection={() => null}
          edit="true"
        />
      </ProtocolContext.Provider>,
    );

    const element = screen.getByTestId('contentEdit');
    expect(element.textContent).toBe('test content');
  });

  test('delete event on content editable', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <EditContent
          type="text"
          lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
          content={null}
          deleteSection={() => null}
          edit="true"
        />
      </ProtocolContext.Provider>,
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
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <EditContent
          type="text"
          lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
          content=""
          deleteSection={() => null}
          edit="true"
        />
      </ProtocolContext.Provider>,
    );

    const element = screen.getByTestId('contentEdit');
    element.focus();
    element.blur();
  });
});
