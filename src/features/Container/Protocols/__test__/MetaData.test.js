import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaData from '../MetaData/MetaData';

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

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MetaData />, { initialState });

    const metadataAccordian = component.getByTestId('metadata-accordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('MetaData AccordianView', () => {
  test('MetaData edit', () => {
    const screen = render(<MetaData />, { initialState });
    const metadataAccordian = screen.getByTestId('metadata-accordian');
    expect(screen).toBeTruthy();
    expect(metadataAccordian).toBeInTheDocument();

    const metaDataEdit = screen.getAllByTestId('metadataaccordian');
    expect(metaDataEdit[0]).toBeInTheDocument();
  });
  test('MetaData Click', () => {
    const screen = render(<MetaData />, { initialState });
    const metadataAccordian = screen.getAllByTestId('metadataAccordian');
    expect(metadataAccordian[0]).toBeInTheDocument();
    fireEvent.click(metadataAccordian[0]);
  });
});
