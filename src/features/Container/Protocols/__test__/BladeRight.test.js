import { render, fireEvent } from '../../../../test-utils/test-utils';
import BladeRight from '../BladeRight/BladeRight';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<BladeRight data={sample} />);

    const metadataAccordian = component.getByTestId('rightblade');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('MetaData AccordianView', () => {
  test('MetaData edit', () => {
    const screen = render(<BladeRight />);
    const rightBlade = screen.getByTestId('rightblade');
    expect(rightBlade).toBeInTheDocument();
    fireEvent.click(rightBlade);
    screen.debug();
    const metaDataEdit = screen.getByTestId('rightbladeclick');
    expect(metaDataEdit).toBeInTheDocument();
    fireEvent.click(metaDataEdit);
  });
});
