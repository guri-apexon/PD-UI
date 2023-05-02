import {
  render,
  fireEvent,
  screen,
} from '../../../../../test-utils/test-utils';
import ContentEdit from '../ContentEdit';
import * as ProtocolContext from '../../ProtocolContext'; // note we're importing with a * to import all the exports

describe('ContentEdit', () => {
  const mockDeleteSection = jest.fn();

  const handleBlur = jest.fn();
  const handleChange = jest.fn();
  beforeEach(() => {
    mockDeleteSection.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
        deleteSection={mockDeleteSection}
        handleBlur={handleBlur}
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
        deleteSection={mockDeleteSection}
        handleBlur={handleBlur}
        edit="true"
      />,
    );

    const element = screen.getByTestId('contentEdit');
    expect(element.textContent).toBe('test content');
  });

  test('delete event on content editable', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      setSaveEnabled: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <ContentEdit
        type="text"
        lineID="6c0cf0d6-7d72-4199-ad8f-bc66b92cab12"
        content={null}
        deleteSection={mockDeleteSection}
        handleBlur={handleBlur}
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
        deleteSection={mockDeleteSection}
        handleBlur={handleBlur}
        edit="true"
      />,
    );

    const element = screen.getByTestId('contentEdit');
    element.focus();
    element.blur();
  });

  test('deletes section on delete/backspace key press if contentEditable is empty', () => {
    const content = '';
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <ContentEdit
        type="header"
        lineID={1}
        content={content}
        deleteSection={mockDeleteSection}
        handleBlur={handleBlur}
        edit="true"
      />,
    );
    const contentEditable = screen.getByTestId('contentEdit');
    fireEvent.keyDown(contentEditable, { keyCode: 46 });
    expect(mockDeleteSection).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(contentEditable, { keyCode: 8 });
    expect(contentEditable).toBeInTheDocument();
  });

  test('does not delete section on delete/backspace key press if contentEditable is not empty', () => {
    const content = 'Hello, world!';
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);

    render(
      <ContentEdit
        type="header"
        lineID={1}
        content={content}
        deleteSection={mockDeleteSection}
        handleBlur={handleBlur}
        edit="true"
      />,
    );
    const contentEditable = screen.getByTestId('contentEdit');
    fireEvent.keyDown(contentEditable, { keyCode: 46 });
    expect(mockDeleteSection).not.toHaveBeenCalled();
    fireEvent.keyDown(contentEditable, { keyCode: 8 });
    expect(mockDeleteSection).not.toHaveBeenCalled();
  });

  it('updates the state when content is changed', async () => {
    const newContent = 'Hi, there!';

    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      setSaveEnabled: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const { getByTestId } = render(
      <ContentEdit
        type="header"
        lineID={1}
        content="Hello World"
        deleteSection={mockDeleteSection}
        edit="false"
        onChange={handleChange}
      />,
    );
    const contentNode = getByTestId('contentEdit');
    fireEvent.click(contentNode);
    const contentEditable = contentNode.closest('[contenteditable]');
    await fireEvent.input(contentEditable, {
      target: { innerHTML: newContent },
    });
    fireEvent.blur(contentEditable);
    expect(contentEditable).toHaveTextContent('Hi, there!');
  });
});
