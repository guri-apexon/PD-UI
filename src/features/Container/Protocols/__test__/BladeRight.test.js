import { useSelector } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import BladeRight from '../BladeRight/BladeRight';

const sample = [
  {
    content: 'This is an Example',
  },
];
const discardDetails = {
  isEdited: false,
  isDiscarded: false,
  protocolTab: -1,
  bladeRight: '',
  labEdited: false,
  errorMsg: false,
  BladeRightValue: 'Home',
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    useSelector.mockImplementation(() => discardDetails);
    const component = render(
      <BladeRight
        data={sample}
        dataSummary={{ userPrimaryRoleFlag: true }}
        setGlobalPreferredTerm={jest.fn()}
      />,
      { discardDetails },
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
    useSelector.mockImplementation(() => discardDetails);
    const component = render(
      <BladeRight
        data={sample}
        dataSummary={{ userPrimaryRoleFlag: true }}
        setGlobalPreferredTerm={jest.fn()}
      />,
      { discardDetails },
    );
    const svg =
      component.getByTestId('rightblade').children[0].children[0].children[0]
        .children[0];
    fireEvent.click(svg);
    fireEvent.click(component.getAllByTestId('rightbladeclick')[0]);
    expect(component.getByTestId('rightblade')).toBeVisible(false);
    const svg1 =
      component.getByTestId('rightblade').children[0].children[0].children[0]
        .children[0];
  });
  test('should render to hide right blade', () => {
    useSelector.mockImplementation(() => discardDetails);
    const component = render(
      <BladeRight
        data={sample}
        dataSummary={{ userPrimaryRoleFlag: false }}
        setGlobalPreferredTerm={jest.fn()}
      />,
      { discardDetails },
    );
    const backDrop = document.getElementsByClassName('MuiBackdrop-root')[0];
    fireEvent.click(backDrop);
    expect(component.getByTestId('rightblade')).toBeVisible(false);
  });
  test('should render to click menu item', () => {
    const discardDetails = {
      isEdited: true,
      isDiscarded: false,
      protocolTab: -1,
      bladeRight: '',
      labEdited: true,
      errorMsg: false,
    };
    useSelector.mockImplementation(() => discardDetails);
    const component = render(
      <BladeRight
        data={sample}
        dataSummary={{ userPrimaryRoleFlag: true }}
        setGlobalPreferredTerm={jest.fn()}
      />,
      { discardDetails },
    );
    const svg =
      component.getByTestId('rightblade').children[0].children[0].children[0]
        .children[0];
    fireEvent.click(svg);
    fireEvent.click(component.getAllByTestId('rightbladeclick')[0]);
    expect(component.getByTestId('rightblade')).toBeVisible(false);
  });
});
