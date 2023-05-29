import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaDataTable from '../MetaData/MetaDataTable';

const sample = [
  {
    attr_id: 'fd2b7c5b4dd90b059b479b1efd1f2afd497b62a83ab6950022f05e39af369963',
    attr_name: 'serious_adverse_events',
    display_name: 'Serious Adverse Events',
    attr_type: 'string',
    attr_value: 'Adverse Event YES Disability',
    confidence: '0.75',
    note: null,
    audit_info: {
      user_id: null,
      last_updated: '2023-04-18 14:49:32.495370',
      num_updates: 1,
    },
    id: 1,
    isCustom: false,
  },
  {
    attr_id: 'd8ed58bd13469177b00d34aa8f2cae6d195b9c0448fd784fce608d7f3408535a',
    attr_name: 'ddd',
    display_name: 'ddd',
    attr_type: 'string',
    attr_value: 'hhhgg',
    confidence: '',
    note: '',
    audit_info: {
      user_id: 'u1138076',
      last_updated: '2023-05-09 16:35:10.139741',
      num_updates: 2,
    },
    id: 2,
    isCustom: false,
  },
  {
    attr_id: 'd8ed58bd13469177b00d34aa8f2cae6d195b9c0448fd784fce608d7f3408535a',
    attr_name: 'ddd',
    display_name: 'ddd',
    attr_type: 'string',
    attr_value: 'hhhgg',
    confidence: '',
    note: '',
    audit_info: {
      user_id: 'u1138076',
      last_updated: '2023-05-09 16:35:10.139741',
      num_updates: 2,
    },
    id: 2,
    isCustom: false,
  },
];

describe('Metadata Table View', () => {
  test('should render the component', () => {
    const component = render(<MetaDataTable metaData={sample} />);

    const metadataTableView = component.getByTestId('metadata-table-view');

    expect(component).toBeTruthy();

    expect(metadataTableView).toBeInTheDocument();
  });
});

describe('MetaData CheckBox', () => {
  test('MetaData note', () => {
    const screen = render(<MetaDataTable metaData={sample} />);
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
    fireEvent.click(metaDataNotes);
    expect(metaDataNotes).toBeInTheDocument();
  });
  test('MetaData note remove', () => {
    const screen = render(<MetaDataTable metaData={sample} />);
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
  });
  test('MetaData confidence', () => {
    const screen = render(<MetaDataTable metaData={sample} />);
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
  });
  test('MetaData confidence remove', () => {
    const screen = render(<MetaDataTable metaData={sample} />);
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
    fireEvent.click(metaDataConfidence);
    expect(metaDataConfidence).toBeInTheDocument();
  });
});
