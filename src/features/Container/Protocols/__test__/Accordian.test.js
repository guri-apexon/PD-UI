import { render, fireEvent } from '../../../../test-utils/test-utils';
import Accordian from '../MetaData/Accordian';

const data = [
  {
    name: 'Summary Fields',
    isEdit: true,
    isActive: true,
    metaData: [
      {
        header: 'Protocol Name ',
        name: 'Covid Study',
      },
    ],
  },
];

describe('Metadata Accordian View', () => {
  const boolean = true;
  test('should render the component', () => {
    const component = render(
      <Accordian
        isMain={boolean}
        accData={data}
        metaDataList={data}
        isOpenSubText={jest.fn()}
        sectionName="abc"
        setSectionName={jest.fn()}
        setIsOpenSubText={jest.fn()}
        setMetaDataList={jest.fn()}
        handleAccordian={jest.fn()}
        handleSave={jest.fn()}
        handleEdit={jest.fn()}
        updateRows={jest.fn()}
        addSubAccordion={jest.fn()}
        subAccComponent={jest.fn()}
      />,
    );

    const metadataAccordian = component.getByTestId('metadataAccordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('Metadata Accordian plus', () => {
  const boolean = true;
  test('should render the component', () => {
    const component = render(
      <Accordian
        isMain={boolean}
        accData={data}
        metaDataList={data}
        isOpenSubText={boolean}
        sectionName="abc"
        setSectionName={jest.fn()}
        setIsOpenSubText={jest.fn()}
        setMetaDataList={jest.fn()}
        handleAccordian={jest.fn()}
        handleSave={jest.fn()}
        handleEdit={jest.fn()}
        updateRows={jest.fn()}
        addSubAccordion={jest.fn()}
        subAccComponent={jest.fn()}
      />,
    );

    const metadataAccordian = component.getByTestId('metadataAccordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
    const metadataplus = component.getByTestId('metadatapencil');
    fireEvent.click(metadataplus);
  });
});

describe('Metadata Accordian plus', () => {
  const boolean = true;
  test('should render the component', () => {
    const component = render(
      <Accordian
        isMain={boolean}
        accData={data}
        metaDataList={data}
        isOpenSubText={boolean}
        sectionName="abc"
        setSectionName={jest.fn()}
        setIsOpenSubText={jest.fn()}
        setMetaDataList={jest.fn()}
        handleAccordian={jest.fn()}
        handleSave={jest.fn()}
        handleEdit={jest.fn()}
        updateRows={jest.fn()}
        addSubAccordion={jest.fn()}
        subAccComponent={jest.fn()}
      />,
    );

    const metadataAccordian = component.getByTestId('metadataAccordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
    const metadataplus = component.getByTestId('plusTextfield');
    expect(metadataplus).toBeInTheDocument();
    fireEvent.change(metadataplus, { target: { value: 'abc' } });
    expect(metadataplus.value).toBe('abc');
  });
});
