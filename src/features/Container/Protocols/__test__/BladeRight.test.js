import { fireEvent, render } from '../../../../test-utils/test-utils';
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
    const svg =
      component.getByTestId('rightblade').children[0].children[0].children[0]
        .children[0];
    expect(svg).toBeInTheDocument();
    fireEvent.click(svg);

    const preferredTermSwitch = component.getByTestId('preferred-term-switch');
    const input = preferredTermSwitch.children[0].children[0].children[0];
    fireEvent.click(input);

    const home = component.getByText('Home');
    fireEvent.click(home);
  });
});
