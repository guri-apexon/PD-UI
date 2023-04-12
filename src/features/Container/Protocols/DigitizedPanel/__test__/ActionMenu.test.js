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
    const btn = screen.getByText('Preferred Terms');
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
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
    const editButton = screen.getByText('Edit Content');
    fireEvent.click(editButton);
    expect(editButton).toBeInTheDocument();
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
    expect(clinicalTerms).toBeInTheDocument();
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
    expect(btn).toBeInTheDocument();
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
    expect(btn).toBeInTheDocument();
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

    fireEvent.click(getByTestId('pencilIcon'));
    // eslint-disable-next-line spaced-comment
    //Expectation
    expect(onEditClick).toHaveBeenCalledTimes(1);
    expect(setShowEdit).toHaveBeenCalledTimes(0);
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

    const saveButton = getByTestId('saveIcon');
    fireEvent.click(saveButton);
    // eslint-disable-next-line spaced-comment
    //Expectation
    expect(onSaveClick).toHaveBeenCalledTimes(0);
    expect(setShowEdit).toHaveBeenCalledTimes(0);
  });

  it('should call setShowLink when links button is clicked', () => {
    const props = {
      auditInfo: {},
      showedit: false,
      onEditClick: jest.fn(),
      setShowEnrichedContent: jest.fn(),
      setShowPrefferedTerm: jest.fn(),
      showPrefferedTerm: false,
      showEnrichedContent: false,
      showLink: false,
      setShowLink: jest.fn(),
      handleSaveContent: jest.fn(),
      setShowDiscardConfirm: jest.fn(),
      disabledSaveIcon: false,
      disabledUndoIcon: false,
      disabledPencilIcon: false,
    };
    const { getByTestId } = render(<ActionMenu {...props} />);
    const linksButton = getByTestId('links-button');
    fireEvent.click(linksButton);
    // eslint-disable-next-line spaced-comment
    //Expectation
    expect(props.setShowLink).toHaveBeenCalled();
  });

  it('expands/collapses when clicking the open/close button', () => {
    const mockAuditInfo = {
      last_reviewed_date: '2022-02-14',
      last_reviewed_by: 'Jane Doe',
      total_no_review: 3,
    };

    const mockProps = {
      auditInfo: mockAuditInfo,
      showedit: false,
      onEditClick: jest.fn(),
      setShowEnrichedContent: jest.fn(),
      setShowPrefferedTerm: jest.fn(),
      showPrefferedTerm: false,
      showEnrichedContent: false,
      showLink: false,
      setShowLink: jest.fn(),
      handleSaveContent: jest.fn(),
      setShowDiscardConfirm: jest.fn(),
      disabledSaveIcon: false,
      disabledUndoIcon: false,
      disabledPencilIcon: false,
    };
    const { getByTestId } = render(<ActionMenu {...mockProps} />);
    const openClosePanel = getByTestId('openClosePanel');
    fireEvent.click(openClosePanel);
    expect(
      openClosePanel.querySelector('svg').getAttribute('data-icon'),
    ).not.toBe('arrow-left');
    fireEvent.click(openClosePanel);
    expect(
      openClosePanel.querySelector('svg').getAttribute('data-icon'),
    ).not.toBe('arrow-right');
  });

  it('should show Audit Information when audit-information is clicked', () => {
    const mockAuditInfo = {
      last_reviewed_date: '2022-02-14',
      last_reviewed_by: 'Jane Doe',
      total_no_review: 3,
    };

    const mockProps = {
      auditInfo: mockAuditInfo,
      showedit: false,
      onEditClick: jest.fn(),
      setShowEnrichedContent: jest.fn(),
      setShowPrefferedTerm: jest.fn(),
      showPrefferedTerm: false,
      showEnrichedContent: false,
      showLink: false,
      setShowLink: jest.fn(),
      handleSaveContent: jest.fn(),
      setShowDiscardConfirm: jest.fn(),
      disabledSaveIcon: false,
      disabledUndoIcon: false,
      disabledPencilIcon: false,
    };

    const { getByTestId } = render(<ActionMenu {...mockProps} />);
    const auditInformation = getByTestId('audit-information');
    fireEvent.click(auditInformation);
    expect(auditInformation).toBeInTheDocument();
  });
});
