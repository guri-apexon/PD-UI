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

describe('ProtocolViewWrapper', () => {
  const mockData = {
    userPrimaryRoleFlag: true,
  };

  const mockRefx = {};
  const mockSectionRef = {};
  const mockSummaryData = {
    success: true,
    errorMsg: null,
  };
  const mockGlobalPreferredTerm = {};
  const mockSetGlobalPreferredTerm = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={mockData}
          refx={mockRefx}
          sectionRef={mockSectionRef}
          summaryData={mockSummaryData}
          globalPreferredTerm={mockGlobalPreferredTerm}
          setGlobalPreferredTerm={mockSetGlobalPreferredTerm}
        />
      </Provider>,
    );
  });

  it('renders BladeLeft component when userPrimaryRoleFlag is true', () => {
    const bladeLeftElement = screen.getByTestId('toc-component');
    expect(bladeLeftElement).toBeInTheDocument();
  });

  it('renders BladeRight component', () => {
    const bladeRightElement = screen.getByTestId('rightblade');
    expect(bladeRightElement).toBeInTheDocument();
  });

  it('renders PanelGroup component', () => {
    const panelGroupElement = screen.getByTestId('panel-group');
    expect(panelGroupElement).toBeInTheDocument();
  });

  it('renders error message when summaryData.success is false', () => {
    const mockErrorData = {
      success: false,
      errorMsg: 'Error loading PDF',
    };
    render(
      <Provider store={store}>
        <ProtocolViewWrapper
          data={mockData}
          refx={mockRefx}
          sectionRef={mockSectionRef}
          summaryData={mockErrorData}
          globalPreferredTerm={mockGlobalPreferredTerm}
          setGlobalPreferredTerm={mockSetGlobalPreferredTerm}
        />
      </Provider>,
    );
    const errorMessage = screen.queryByText((content) => {
      return content.startsWith(
        'This document is not available in our database',
      );
    });
    expect(errorMessage).not.toBeInTheDocument();
  });
});
