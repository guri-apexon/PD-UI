import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import Accordian from '../MetaData/Accordian';

describe('Accordian component', () => {
  let wrapper;
  const standardList = [];
  const accData = {
    isActive: true,
    name: 'accordion',
    isEdit: false,
    level: 1,
    audit_info: {
      user_id: null,
      last_updated: '2023-03-29 08:52:41.726047',
      num_updates: 1,
    },
  };
  const metaDataList = [];
  const suggestedSubList = [{ label: 'sub1' }, { label: 'sub2' }];
  const currentActiveLevels = [];
  const setSuggestedSubList = jest.fn();
  const setCurrentActiveLevels = jest.fn();
  const setMetaDataList = jest.fn();
  const handleAccordian = jest.fn();
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();
  const updateRows = jest.fn();
  const deleteRows = jest.fn();
  const addSubAccordion = jest.fn();
  const subAccComponent = jest.fn();
  beforeEach(() => {
    wrapper = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        metaDataList={metaDataList}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setMetaDataList={setMetaDataList}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        updateRows={updateRows}
        deleteRows={deleteRows}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
      />,
    );
  });
  it('should render the Accordion component', () => {
    expect(wrapper.getByTestId('meta-item-accordion')).toBeInTheDocument();
  });
  it('should call handleAccordian when accordion is clicked', () => {
    fireEvent.click(wrapper.getByTestId('meta-item-accordion'));
    expect(handleAccordian).toHaveBeenCalled();
  });
  it('should open popover when eye icon is clicked', () => {
    const eyeIcon = wrapper.getByTestId('eyeIcon');
    fireEvent.click(eyeIcon);
    const popover = wrapper.getByTestId('metadata-popover');
    expect(popover).toBeInTheDocument();
  });
  it('should call setCurrentActiveLevels when plus icon is clicked', () => {
    const metadataAccordian = wrapper.getByTestId('meta-item-accordion');

    expect(wrapper).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
    const metadataplus = wrapper.getByTestId('metadatapencil');
    fireEvent.click(metadataplus);
  });

  it('should display the accordian component', () => {
    const standardList = [];
    const accData = {
      isActive: true,
      name: 'testName',
      level: 1,
      isEdit: true,
      audit_info: {
        user_id: null,
        last_updated: '2023-03-29 08:52:41.726047',
        num_updates: 1,
      },
    };
    const rows = [];
    const suggestedSubList = [];
    const currentActiveLevels = [];
    const deletedAttributes = [];
    const setSuggestedSubList = jest.fn();
    const setCurrentActiveLevels = jest.fn();
    const setRows = jest.fn();
    const handleAccordian = jest.fn();
    const handleSave = jest.fn();
    const handleDelete = jest.fn();
    const handleEdit = jest.fn();
    const addSubAccordion = jest.fn();
    const subAccComponent = null;
    const setDeletedAttributes = jest.fn();

    const { getAllByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    const elem = getAllByTestId('meta-item-accordion');
    expect(elem.length).toBeGreaterThan(1);
  });
});

describe('Accordian', () => {
  const standardList = ['Sectionsub 1'];
  const accData = {
    name: 'Section 1',
    level: 1,
    isActive: false,
    isEdit: true,
    audit_info: {
      user_id: null,
      last_updated: '2023-03-29 08:52:41.726047',
      num_updates: 1,
    },
  };
  const rows = [{ id: 1, name: 'Attribute 1', type: 'string' }];
  const suggestedSubList = [{ label: 'Subsection 1' }];
  const deletedAttributes = [];
  const currentActiveLevels = [];
  const setSuggestedSubList = jest.fn();
  const setCurrentActiveLevels = jest.fn();
  const setRows = jest.fn();
  const handleAccordian = jest.fn();
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();
  const addSubAccordion = jest.fn();
  const subAccComponent = [];
  const setDeletedAttributes = jest.fn();

  it('renders the accordion with the given name', () => {
    const { getByText, getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );
    fireEvent.click(getByTestId('metadata-trash'));
    expect(getByTestId('modal')).toBeInTheDocument();
    expect(getByText('Section 1')).toBeInTheDocument();
    expect(getByTestId('save-term-field')).toBeInTheDocument();
    fireEvent.click(getByTestId('save-term-field'));
  });

  it('opens the subtext input when the plus icon is clicked', () => {
    const accData = {
      name: 'Section 1',
      level: 1,
      isActive: true,
      isEdit: true,
      audit_info: {
        user_id: null,
        last_updated: '2023-03-29 08:52:41.726047',
        num_updates: 1,
      },
    };

    const screen = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        currentActiveLevels={[]}
        setCurrentActiveLevels={() => jest.fn()}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    fireEvent.click(screen.getByTestId('metadataplus'));
    expect(screen.getByTestId('metadataEditTable')).toBeInTheDocument();
  });

  it('opens the subtext input when the plus icon is clicked edit', () => {
    const accData = {
      name: 'Section 1',
      level: 1,
      isActive: true,
      isEdit: true,
      audit_info: {
        user_id: null,
        last_updated: '2023-03-29 08:52:41.726047',
        num_updates: 1,
      },
    };

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    fireEvent.click(getByTestId('metadataplus'));
    expect(getByTestId('metadataEditTable')).toBeInTheDocument();
    fireEvent.click(getByTestId('metadatasave'));
    expect(getByTestId('save-term-field')).toBeInTheDocument();
    fireEvent.click(getByTestId('save-term-field'));
  });

  it('opens the subtext input when the plus icon is clicked edit', () => {
    const accData = {
      name: 'Section 1',
      level: 5,
      isActive: false,
      isEdit: true,
      audit_info: {
        user_id: null,
        last_updated: '2023-03-29 08:52:41.726047',
        num_updates: 1,
      },
    };

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );
    expect(getByTestId('metadataEditTable')).toBeInTheDocument();
  });

  it('opens the subtext input when the plus icon is clicked edit', () => {
    const accData = {
      name: 'Section 1',
      level: 1,
      isActive: true,
      isEdit: true,
      audit_info: {
        user_id: null,
        last_updated: '2023-03-29 08:52:41.726047',
        num_updates: 1,
      },
    };

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );
    fireEvent.click(getByTestId('metadataplus'));
    // expect(getByTestId('suggestion-field')).toBeInTheDocument();
  });
});

describe('Accordian', () => {
  const standardList = ['Sectionsub 1'];
  const accData = {
    name: 'Section 1',
    level: 1,
    isActive: false,
    isEdit: true,
    audit_info: {
      user_id: null,
      last_updated: '2023-03-29 08:52:41.726047',
      num_updates: 1,
    },
  };
  const rows = [{ id: 1, name: 'Attribute 1', type: 'string' }];
  const suggestedSubList = [{ label: 'Subsection 1' }];
  const deletedAttributes = [];
  const setSuggestedSubList = jest.fn();
  const setCurrentActiveLevels = jest.fn();
  const setRows = jest.fn();
  const handleAccordian = jest.fn();
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();
  const addSubAccordion = jest.fn();
  const subAccComponent = [];
  const setDeletedAttributes = jest.fn();

  it('renders the accordion with the given name', () => {
    const { getByText } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={[]}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );
    expect(getByText('Section 1')).toBeInTheDocument();
  });

  it('should open the modal when the save icon is clicked', () => {
    const currentActiveLevels = [];

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );
    const saveIcon = getByTestId('metadatasave');
    fireEvent.click(saveIcon);
    const modal = getByTestId('meta-modal');
    expect(modal).toBeVisible();
  });

  it('should open the modal when the trash icon is clicked', () => {
    const currentActiveLevels = [];
    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );
    const trashIcon = getByTestId('metadata-trash');
    fireEvent.click(trashIcon);
    const modal = getByTestId('meta-modal');
    expect(modal).toBeVisible();
  });

  it('should call handleUndo function on handleUndo click', () => {
    const mockedProps = {
      standardList: [],
      accData: {
        name: 'Test',
        isActive: true,
        formattedName: 'test',
        isEdit: true,
        level: 0,
      },
      rows: [],
      suggestedSubList: [{ label: 'Test1' }, { label: 'Test2' }],
      deletedAttributes: [],
      currentActiveLevels: [],
      setSuggestedSubList: jest.fn(),
      setRows: jest.fn(),
      handleAccordian: jest.fn(),
      handleSave: jest.fn(),
      handleDelete: jest.fn(),
      handleEdit: jest.fn(),
      handleDiscard: jest.fn(),
      addSubAccordion: jest.fn(),
      subAccComponent: jest.fn(),
      setDeletedAttributes: jest.fn(),
      setCurrentActiveLevels: jest.fn(),
    };
    const { getByTestId } = render(<Accordian {...mockedProps} />);
    fireEvent.click(getByTestId('metadatadiscard'));
    expect(mockedProps.handleDiscard).toHaveBeenCalledTimes(0);
  });

  it('should call onClose function when modal is closed', () => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(<Accordian onClose={mockOnClose} />);
    const modal = getByTestId('modal');
    fireEvent.click(modal);
    expect(mockOnClose).toHaveBeenCalledTimes(0);
  });

  it('should not call onClose function when modal is open', () => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(<Accordian onClose={mockOnClose} />);
    const modal = getByTestId('modal');
    fireEvent.click(modal);
    fireEvent.click(modal);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should close the modal when onClose is called', () => {
    const mockHandleClose = jest.fn();
    const currentActiveLevels = [];
    render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    const saveButton = screen.getByTestId('metadatasave');
    fireEvent.click(saveButton);

    const modalCloseButton = screen.getByLabelText('Close');
    fireEvent.click(modalCloseButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(0);
  });

  it('should close the modal when onClose is called', () => {
    const mockHandleClose = jest.fn();
    const currentActiveLevels = [];
    render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        currentActiveLevels={currentActiveLevels}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setCurrentActiveLevels={setCurrentActiveLevels}
        setRows={setRows}
        handleAccordian={handleAccordian}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        addSubAccordion={addSubAccordion}
        subAccComponent={subAccComponent}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    const saveButton = screen.getByTestId('metadatadiscard');
    fireEvent.click(saveButton);

    const modalCloseButton = screen.getByLabelText('Close');
    fireEvent.click(modalCloseButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(0);
  });
});
