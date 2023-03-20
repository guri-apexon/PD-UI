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
        showLink={false}
        expanded={false}
        setShowEnrichedContent={jest.fn()}
        setShowEdit={jest.fn()}
        setShowLink={jest.fn()}
        setShowPrefferedTerm={jest.fn()}
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
        showLink={false}
        expanded={false}
        setShowEnrichedContent={jest.fn()}
        setShowEdit={jest.fn()}
        setShowLink={jest.fn()}
        setShowPrefferedTerm={jest.fn()}
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
        showLink={false}
        expanded={false}
        setShowEnrichedContent={jest.fn()}
        setShowEdit={jest.fn()}
        setShowLink={jest.fn()}
        setShowPrefferedTerm={jest.fn()}
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
        showLink={false}
        expanded={false}
        setShowEnrichedContent={jest.fn()}
        setShowEdit={jest.fn()}
        setShowLink={jest.fn()}
        setShowPrefferedTerm={jest.fn()}
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
        showLink={false}
        expanded={false}
        setShowEnrichedContent={jest.fn()}
        setShowEdit={jest.fn()}
        setShowLink={jest.fn()}
        setShowPrefferedTerm={jest.fn()}
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
        showLink={false}
        expanded={false}
        setShowEnrichedContent={jest.fn()}
        setShowEdit={jest.fn()}
        setShowLink={jest.fn()}
        setShowPrefferedTerm={jest.fn()}
      />,
    );
    const openPanel = screen.getByTestId('openClosePanel').children[0];
    expect(openPanel).toBeInTheDocument();
    fireEvent.click(openPanel);

    const btn = screen.getByText('Preferred Terms');
    fireEvent.click(btn);
  });

  it('handles Edit button click', () => {
    const auditInfo = {
      last_reviewed_date: '2022-01-01',
      total_no_review: 1,
      last_reviewed_by: 'John Doe',
    };
    const onSaveClick = jest.fn();
    const onEditClick = jest.fn();
    const setShowEnrichedContent = jest.fn();
    const setShowPrefferedTerm = jest.fn();
    const setShowLink = jest.fn();
    const setShowEdit = jest.fn();

    const { getByTestId } = render(
      <ActionMenu
        auditInfo={auditInfo}
        showedit={false}
        onSaveClick={onSaveClick}
        onEditClick={onEditClick}
        setShowEnrichedContent={setShowEnrichedContent}
        setShowPrefferedTerm={setShowPrefferedTerm}
        showPrefferedTerm={false}
        showEnrichedContent={false}
        disabled={false}
        showLink={false}
        setShowLink={setShowLink}
        setShowEdit={setShowEdit}
      />,
    );

    fireEvent.click(getByTestId('edit-button'));
    expect(onEditClick).toHaveBeenCalledTimes(1);
    expect(setShowEdit).toHaveBeenCalledTimes(1);
    expect(setShowEdit).toHaveBeenCalledWith(true);
  });

  it('should call onSaveClick when save button is clicked', () => {
    const auditInfo = {
      last_reviewed_date: '2022-03-15',
      total_no_review: 5,
      last_reviewed_by: 'John Doe',
    };
    const onSaveClick = jest.fn();
    const onEditClick = jest.fn();
    const setShowEnrichedContent = jest.fn();
    const setShowPrefferedTerm = jest.fn();
    const setShowLink = jest.fn();
    const setShowEdit = jest.fn();

    const { getByTestId } = render(
      <ActionMenu
        auditInfo={auditInfo}
        // eslint-disable-next-line react/jsx-boolean-value
        showedit={true}
        onSaveClick={onSaveClick}
        onEditClick={onEditClick}
        setShowEnrichedContent={setShowEnrichedContent}
        setShowPrefferedTerm={setShowPrefferedTerm}
        showPrefferedTerm={false}
        showEnrichedContent={false}
        disabled={false}
        showLink={false}
        setShowLink={setShowLink}
        setShowEdit={setShowEdit}
      />,
    );

    const saveButton = getByTestId('save-button');
    fireEvent.click(saveButton);
    expect(onSaveClick).toHaveBeenCalledTimes(1);
    expect(setShowEdit).toHaveBeenCalledTimes(0);
  });

  // test('calls the setShowPrefferedTerm function when the preferred terms button is clicked', () => {
  //   const setShowPrefferedTerm = jest.fn();
  //   const { getByTestId } = render(
  //     <ActionMenu
  //       auditInfo={{}}
  //       showedit={false}
  //       onSaveClick={jest.fn()}
  //       onEditClick={jest.fn()}
  //       disabled={false}
  //       showLink={false}
  //       expanded={false}
  //       setShowEnrichedContent={jest.fn()}
  //       setShowEdit={jest.fn()}
  //       setShowLink={jest.fn()}
  //       setShowPrefferedTerm={setShowPrefferedTerm}
  //     />,
  //   );
  //   const saveButton = getByTestId('save-button');
  //   fireEvent.click(saveButton);
  //   expect(onSaveClick).toHaveBeenCalledTimes(1);
  //   expect(setShowEdit).toHaveBeenCalledTimes(0);
  // });
});
// links - button;
