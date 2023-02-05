import { render, fireEvent } from '../../../../test-utils/test-utils';
import Accordian from '../MetaData/Accordian';

describe('Accordian component', () => {
  let wrapper;
  const standardList = [];
  const accData = {
    isActive: true,
    name: 'accordion',
    isEdit: false,
    level: 1,
  };
  const metaDataList = [];
  const suggestedSubList = [{ label: 'sub1' }, { label: 'sub2' }];
  const isOpenSubText = false;
  const setSuggestedSubList = jest.fn();
  const setIsOpenSubText = jest.fn();
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
        isOpenSubText={isOpenSubText}
        setSuggestedSubList={setSuggestedSubList}
        setIsOpenSubText={setIsOpenSubText}
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
    expect(wrapper.getByTestId('metadataAccordian')).toBeInTheDocument();
  });
  it('should call handleAccordian when accordion is clicked', () => {
    fireEvent.click(wrapper.getByTestId('metadataAccordian'));
    expect(handleAccordian).toHaveBeenCalled();
  });
  it('should call setIsOpenSubText when plus icon is clicked', () => {
    const metadataAccordian = wrapper.getByTestId('metadataAccordian');

    expect(wrapper).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
    const metadataplus = wrapper.getByTestId('metadatapencil');
    fireEvent.click(metadataplus);
  });
});

describe('Accordian component', () => {
  it('should display the accordian component', () => {
    const standardList = [];
    const accData = {
      isActive: true,
      name: 'testName',
      level: 4,
      isEdit: false,
    };
    const rows = [];
    const suggestedSubList = [];
    const isOpenSubText = false;
    const deletedAttributes = [];
    const setSuggestedSubList = jest.fn();
    const setIsOpenSubText = jest.fn();
    const setRows = jest.fn();
    const handleAccordian = jest.fn();
    const handleSave = jest.fn();
    const handleDelete = jest.fn();
    const handleEdit = jest.fn();
    const addSubAccordion = jest.fn();
    const subAccComponent = null;
    const setDeletedAttributes = jest.fn();

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        isOpenSubText={isOpenSubText}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setIsOpenSubText={setIsOpenSubText}
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

    expect(getByTestId('metadataAccordian')).toBeInTheDocument();
  });
});

describe('Accordian', () => {
  const standardList = ['Section 1'];
  const accData = {
    name: 'Section 1',
    level: 5,
    isActive: false,
    isEdit: false,
  };
  const rows = [{ id: 1, name: 'Attribute 1', type: 'string' }];
  const suggestedSubList = [{ label: 'Subsection 1' }];
  const deletedAttributes = [];
  const setSuggestedSubList = jest.fn();
  const setIsOpenSubText = jest.fn();
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
        isOpenSubText={false}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setIsOpenSubText={setIsOpenSubText}
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

  it('opens the subtext input when the plus icon is clicked', () => {
    const accData = {
      name: 'Section 1',
      level: 5,
      isActive: true,
      isEdit: true,
    };

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        isOpenSubText={false}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setIsOpenSubText={setIsOpenSubText}
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
    expect(setIsOpenSubText).toHaveBeenCalledWith(true);
  });

  it('opens the subtext input when the plus icon is clicked edit', () => {
    const accData = {
      name: 'Section 1',
      level: 5,
      isActive: true,
      isEdit: true,
    };

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        isOpenSubText={false}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setIsOpenSubText={setIsOpenSubText}
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
    expect(setIsOpenSubText).toHaveBeenCalledWith(true);
    fireEvent.click(getByTestId('metadatasave'));
  });

  it('opens the subtext input when the plus icon is clicked edit', () => {
    const accData = {
      name: 'Section 1',
      level: 5,
      isActive: false,
      isEdit: true,
    };

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        isOpenSubText={false}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setIsOpenSubText={setIsOpenSubText}
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
      isActive: false,
      isEdit: true,
    };

    const { getByTestId } = render(
      <Accordian
        standardList={standardList}
        accData={accData}
        rows={rows}
        suggestedSubList={suggestedSubList}
        isOpenSubText={false}
        deletedAttributes={deletedAttributes}
        setSuggestedSubList={setSuggestedSubList}
        setIsOpenSubText={setIsOpenSubText}
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
    expect(setIsOpenSubText).toHaveBeenCalledWith(true);
  });
});
