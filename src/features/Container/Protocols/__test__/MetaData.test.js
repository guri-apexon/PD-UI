import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaData from '../MetaData/MetaData';

const sample = [
  {
    content: 'This is an Example',
  },
];

const initialState = {
  accordianArray: [
    {
      name: 'Summary Fields',
      isEdit: false,
      isActive: false,
      tableData: [
        {
          id: 1,
          header: 'Protocol Number',
          name: 'NCT04904757.pdf.47866775-7c21-4e07-9e09-b8b4896cfd25',
        },
      ],
    },
    {
      name: 'Patient Burden Variables',
      isEdit: false,
      isActive: false,
      tableData: [
        {
          id: 1,
          header: 'Protocol Number',
          name: 'NCT04904757.pdf.47866775-7c21-4e07-9e09-b8b4896cfd25',
        },
      ],
    },
  ],
};

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MetaData data={sample} />);

    const metadataAccordian = component.getByTestId('metadata-accordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('MetaData AccordianView', () => {
  test('MetaData edit', () => {
    const screen = render(<MetaData />, { initialState });
    const metaDataEdit = screen.getByTestId('metadata-Accord');
    expect(metaDataEdit).toBeInTheDocument();
  });
});
