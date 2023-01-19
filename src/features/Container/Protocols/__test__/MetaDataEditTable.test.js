import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaDataEditTable from '../MetaData/MetaDataEditTable';

const initialState = {
  protocol: {
    metaDataVariable: {
      data: [
        {
          name: 'Summary Fields',
          isEdit: false,
          isActive: false,
          metaData: [
            {
              header: 'Protocol Name ',
              name: 'Covid Study',
            },
          ],
        },
      ],
    },
  },
};
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
        updateRows={jest.fn()}
        setMetaDataList={jest.fn()}
        data={data}
        metaDataList={data}
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
        updateRows={jest.fn()}
        setMetaDataList={jest.fn()}
        data={data}
        metaDataList={data}
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
        updateRows={jest.fn()}
        setMetaDataList={jest.fn()}
        data={data}
        metaDataList={data}
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
        updateRows={jest.fn()}
        setMetaDataList={jest.fn()}
        data={data}
        metaDataList={data}
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
        updateRows={jest.fn()}
        setMetaDataList={jest.fn()}
        data={data}
        metaDataList={data}
      />,
    );
    const metaDataNotes = screen.getByTestId('metadata-notes');
    expect(metaDataNotes).toBeInTheDocument();
    fireEvent.click(metaDataNotes);
  });
  test('MetaData confidence', () => {
    const screen = render(
      <MetaDataEditTable
        updateRows={jest.fn()}
        setMetaDataList={jest.fn()}
        data={data}
        metaDataList={data}
      />,
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
  });
  test('MetaData confidence remove', () => {
    const screen = render(
      <MetaDataEditTable
        updateRows={jest.fn()}
        setMetaDataList={jest.fn()}
        data={data}
        metaDataList={data}
      />,
    );
    const metaDataConfidence = screen.getByTestId('metadata-confidence');
    expect(metaDataConfidence).toBeInTheDocument();
    fireEvent.click(metaDataConfidence);
    fireEvent.click(metaDataConfidence);
    expect(metaDataConfidence).toBeInTheDocument();
  });
});
