import { render } from '../../../../test-utils/test-utils';
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
