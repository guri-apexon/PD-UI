import { fireEvent, render } from '../../../../test-utils/test-utils';
import BladeRight from '../BladeRight/BladeRight';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(
      <BladeRight
        data={sample}
        dataSummary={{ userPrimaryRoleFlag: true }}
        setGlobalPreferredTerm={jest.fn()}
      />,
    );
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
  });
  test('should render to click menu item', () => {
    const component = render(<BladeRight data={sample} />);
    const svg =
      component.getByTestId('rightblade').children[0].children[0].children[0]
        .children[0];
    fireEvent.click(svg);
    fireEvent.click(component.getAllByTestId('rightbladeclick')[0]);
    expect(component.getByTestId('rightblade')).toBeVisible(false);
  });
  test('should render to hide right blade', () => {
    const component = render(<BladeRight data={sample} />);
    const backDrop = document.getElementsByClassName('MuiBackdrop-root')[0];
    fireEvent.click(backDrop);
    expect(component.getByTestId('rightblade')).toBeVisible(false);
  });
});
