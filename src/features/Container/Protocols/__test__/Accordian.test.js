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
