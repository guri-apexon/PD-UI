import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaDataTable from '../MetaData/MetaDataTable';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Metadata Table View', () => {
  test('should render the component', () => {
    const component = render(<MetaDataTable data={sample} />);

    const metadataTableView = component.getByTestId('metadata-table-view');

    expect(component).toBeTruthy();

    expect(metadataTableView).toBeInTheDocument();
  });
});

describe('MetaData CheckBox', () => {
  test('MetaData note', () => {
    const screen = render(<MetaDataTable />);
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
    fireEvent.click(metaDataNotes);
    expect(metaDataNotes).toBeInTheDocument();
  });
  test('MetaData note remove', () => {
    const screen = render(<MetaDataTable />);
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
  });
  test('MetaData confidence', () => {
    const screen = render(<MetaDataTable />);
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
  });
  test('MetaData confidence remove', () => {
    const screen = render(<MetaDataTable />);
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
    fireEvent.click(metaDataConfidence);
    expect(metaDataConfidence).toBeInTheDocument();
  });
});
