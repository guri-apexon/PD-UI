import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaDataAccordian from '../MetaData/MetaDataAccordian';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MetaDataAccordian data={sample} />);

    const metadataAccordian = component.getByTestId('metadata-accordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('MetaData AccordianView', () => {
  test('MetaData edit', () => {
    const screen = render(<MetaDataAccordian />);
    const metaDataEdit = screen.getAllByTestId('metapencilIcon');
    expect(metaDataEdit[0]).toBeInTheDocument();
    fireEvent.click(metaDataEdit[0]);
  });
  test('MetaData Click', () => {
    const screen = render(<MetaDataAccordian />);
    const metadataAccordian = screen.getAllByTestId('metadataAccordian');
    expect(metadataAccordian[0]).toBeInTheDocument();
    fireEvent.click(metadataAccordian[0]);
  });
  test('MetaData save', () => {
    const screen = render(<MetaDataAccordian />);
    const metaDataEdit = screen.getAllByTestId('metapencilIcon');
    expect(metaDataEdit[0]).toBeInTheDocument();
    fireEvent.click(metaDataEdit[0]);
    const metaDataSave = screen.getAllByTestId('metasaveIcon');
    expect(metaDataSave[0]).toBeInTheDocument();
    fireEvent.click(metaDataSave[0]);
  });
});
