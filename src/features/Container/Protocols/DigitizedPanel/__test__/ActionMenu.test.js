import { fireEvent, render } from '../../../../../test-utils/test-utils';
import ActionMenu from '../ActionMenu';

describe('ActionManu', () => {
  test('Component renders without crashing', () => {
    const screen = render(
      <ActionMenu
        auditInfo={{}}
        showedit={false}
        onSaveClick={jest.fn()}
        onEditClick={jest.fn()}
        disabled={false}
        setShowEnrichedContent={jest.fn()}
      />,
    );
    expect(screen).toBeTruthy();
  });

  test('Expands the panel when click on the open icon', () => {
    const screen = render(
      <ActionMenu
        auditInfo={{}}
        showedit={false}
        onSaveClick={jest.fn()}
        onEditClick={jest.fn()}
        disabled={false}
        setShowEnrichedContent={jest.fn()}
      />,
    );
    const openPanel = screen.getByTestId('openClosePanel').children[0];
    expect(openPanel).toBeInTheDocument();
    fireEvent.click(openPanel);
  });

  test('Test the edit and save button clicks', () => {
    const screen = render(
      <ActionMenu
        auditInfo={{}}
        showedit={false}
        onSaveClick={jest.fn()}
        onEditClick={jest.fn()}
        disabled={false}
        setShowEnrichedContent={jest.fn()}
      />,
    );
    const openPanel = screen.getByTestId('openClosePanel').children[0];
    expect(openPanel).toBeInTheDocument();
    fireEvent.click(openPanel);
    screen.debug();

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
  });

  test('Test the Clinical Terms button clicks', () => {
    const screen = render(
      <ActionMenu
        auditInfo={{}}
        showedit={false}
        onSaveClick={jest.fn()}
        onEditClick={jest.fn()}
        disabled={false}
        setShowEnrichedContent={jest.fn()}
      />,
    );
    const openPanel = screen.getByTestId('openClosePanel').children[0];
    expect(openPanel).toBeInTheDocument();
    fireEvent.click(openPanel);

    const clinicalTerms = screen.getByText('Clinical Terms');
    fireEvent.click(clinicalTerms);
  });

  test('Test the Links & References button clicks', () => {
    const screen = render(
      <ActionMenu
        auditInfo={{}}
        showedit={false}
        onSaveClick={jest.fn()}
        onEditClick={jest.fn()}
        disabled={false}
        setShowEnrichedContent={jest.fn()}
      />,
    );
    const openPanel = screen.getByTestId('openClosePanel').children[0];
    expect(openPanel).toBeInTheDocument();
    fireEvent.click(openPanel);

    const btn = screen.getByText('Links & References');
    fireEvent.click(btn);
  });

  test('Test the Preferred Terms button clicks', () => {
    const screen = render(
      <ActionMenu
        auditInfo={{}}
        showedit={false}
        onSaveClick={jest.fn()}
        onEditClick={jest.fn()}
        disabled={false}
        setShowEnrichedContent={jest.fn()}
      />,
    );
    const openPanel = screen.getByTestId('openClosePanel').children[0];
    expect(openPanel).toBeInTheDocument();
    fireEvent.click(openPanel);

    const btn = screen.getByText('Preferred Terms');
    fireEvent.click(btn);
  });
});
