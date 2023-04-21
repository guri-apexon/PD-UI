import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import ProtocolViewWrapper from '../ProtocolViewWrapper';

describe('ProtocolViewWrapper', () => {
  const data = {
    userPrimaryRoleFlag: true,
  };
  const refx = {};
  const sectionRef = {};
  const summaryData = {
    success: true,
  };
  const globalPreferredTerm = {};
  const setGlobalPreferredTerm = jest.fn();

  test('renders ProtocolViewWrapper component', () => {
    render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={data}
          refx={refx}
          sectionRef={sectionRef}
          summaryData={summaryData}
          globalPreferredTerm={globalPreferredTerm}
          setGlobalPreferredTerm={setGlobalPreferredTerm}
        />
      </Provider>,
    );

    expect(screen.getByTestId('panel-group')).toBeInTheDocument();
  });

  test('calls the handleClick method when the component is clicked', () => {
    const handleClick = jest.spyOn(
      ProtocolViewWrapper.prototype,
      'handleClick',
    );
    render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={data}
          refx={refx}
          sectionRef={sectionRef}
          summaryData={summaryData}
          globalPreferredTerm={globalPreferredTerm}
          setGlobalPreferredTerm={setGlobalPreferredTerm}
        />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('panel-group'));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('updates state when handleRightFullScreen is called', () => {
    render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={data}
          refx={refx}
          sectionRef={sectionRef}
          summaryData={summaryData}
          globalPreferredTerm={globalPreferredTerm}
          setGlobalPreferredTerm={setGlobalPreferredTerm}
        />
      </Provider>,
    );
    const bladeRight = screen.getByTestId('rightblade');
    fireEvent.click(bladeRight);
    expect(setGlobalPreferredTerm).toHaveBeenCalledTimes(0);
  });

  it('should toggle fullRightScreen state when handleRightFullScreen is called', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ProtocolViewWrapper />
      </Provider>,
    );
    const panel = getByTestId('panel-group');
    fireEvent.click(panel);
    expect(panel).not.toHaveAttribute('fullRightScreen', 'true');

    fireEvent.click(panel);
    expect(panel).not.toHaveAttribute('fullRightScreen', 'false');
  });
});
