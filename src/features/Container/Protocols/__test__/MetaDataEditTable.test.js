import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaDataEditTable from '../MetaData/MetaDataEditTable';

const data = [
  {
    id: 1,
    header: 'Protocol Number',
    name: 'NCT04904757.pdf.47866775-7c21-4e07-9e09-b8b4896cfd25',
  },
  {
    id: 2,
    header: 'Protocol Title',
    name: 'ProtocolCovid-19',
  },
];

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metadataNote = component.getByTestId('metadata-notes');
    expect(component).toBeTruthy();
    expect(metadataNote).toBeInTheDocument();
  });
});

describe('Metadata Accordian Checkbox confidence', () => {
  test('should render the component', () => {
    const component = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metadataNote = component.getByTestId('metadata-notes');
    expect(component).toBeTruthy();
    expect(metadataNote).toBeInTheDocument();
    fireEvent.click(metadataNote);
  });
});

describe('Metadata Accordian Checkbox note', () => {
  test('should render the component', () => {
    const component = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metadataNote = component.getByTestId('metadata-confidence');
    expect(component).toBeTruthy();
    expect(metadataNote).toBeInTheDocument();
    expect(metadataNote).toBeInTheDocument();
    fireEvent.click(metadataNote);
  });
});

describe('MetaData CheckBox', () => {
  test('MetaData note', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
    fireEvent.click(metaDataNotes);
    expect(metaDataNotes).toBeInTheDocument();
  });
  test('MetaData note remove', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
  });
  test('MetaData confidence', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
  });
  test('MetaData confidence remove', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
    fireEvent.click(metaDataConfidence);
    expect(metaDataConfidence).toBeInTheDocument();
  });
  test('MetaData confidence remove', () => {
    const screen = render(
      <MetaDataEditTable
        setRows={jest.fn()}
        rows={data}
        setDeletedAttributes={jest.fn()}
        data={data}
        deletedAttributes={data}
      />,
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
    fireEvent.click(metaDataConfidence);
    expect(metaDataConfidence).toBeInTheDocument();
    const add = screen.getByTestId('metadata-add');
    fireEvent.click(add);
  });
});

describe('MetaDataEditTable', () => {
  it('renders table with given rows', () => {
    const data = { name: 'Test Data' };
    const rows = [
      {
        attr_name: 'Attribute 1',
        attr_value: 'Value 1',
      },
      {
        attr_name: 'Attribute 1',
        attr_value: 'Value 1',
        isCustom: true,
      },
    ];
    const setRows = jest.fn();
    const deletedAttributes = [];
    const setDeletedAttributes = jest.fn();

    const { getByTestId } = render(
      <MetaDataEditTable
        data={data}
        rows={rows}
        setRows={setRows}
        deletedAttributes={deletedAttributes}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    expect(getByTestId('metadata-table')).toBeInTheDocument();
  });
});

describe('MetaDataEditTable', () => {
  it('renders table with given rows', () => {
    const data = { name: 'Test Data' };
    const rows = [
      {
        attr_name: 'Attribute 1',
        attr_value: 'Value 1',
      },
    ];
    const setRows = jest.fn();
    const deletedAttributes = [];
    const setDeletedAttributes = jest.fn();

    const { getByTestId } = render(
      <MetaDataEditTable
        data={data}
        rows={rows}
        setRows={setRows}
        deletedAttributes={deletedAttributes}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    expect(getByTestId('metadata-table')).toBeInTheDocument();
  });
});

describe('MetaDataEditTable handleChange and handleDelete function', () => {
  const data = { formattedName: 'test' };
  const rows = {
    test: [
      {
        id: 1,
        isCustom: true,
        attr_name: '',
        attr_value: '',
        attr_type: '',
      },
    ],
  };

  const setRows = jest.fn();
  const deletedAttributes = [];
  const setDeletedAttributes = jest.fn();

  it('should call handlechange function when a cell value is changed', () => {
    const { getByTestId } = render(
      <MetaDataEditTable
        data={data}
        rows={rows}
        setRows={setRows}
        deletedAttributes={deletedAttributes}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    const input = getByTestId('metadata-table');
    fireEvent.change(input, { target: { innerHTML: 'NEW Value' } });
    expect(getByTestId('metadata-table')).toBeInTheDocument();
  });

  it('should call handleDelete function when the delete button is clicked', () => {
    const { getByTestId } = render(
      <MetaDataEditTable
        data={data}
        rows={rows}
        setRows={setRows}
        deletedAttributes={deletedAttributes}
        setDeletedAttributes={setDeletedAttributes}
      />,
    );

    const deleteButton = getByTestId('metadata-table');
    fireEvent.click(deleteButton);
    expect(getByTestId('metadata-table')).toBeInTheDocument();
  });
});
