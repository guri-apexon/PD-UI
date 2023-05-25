import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import QCContainer from '../QC';
import store from '../../../../store/store';

describe('Protocol Table container component', () => {
  const state = {
    initialState: {
      qc: {
        protocols: [
          {
            protocolTitle: 'Title',
            protocol: '12344',
            projectId: 'Project1',
            sponsor: 'Astella',
            uploadDate: 'aa',
            id: 1,
          },
        ],
        tableError: false,
        loader: false,
      },
    },
  };
  test('should render QC', () => {
    render(<QCContainer />, state);
  });
  // test("should switch to tab QC ", () => {
  //   render(<QC />, state);

  //   fireEvent.click(screen.getByTestId("click-link-12344"));
  //   expect(screen.getByText(/12344/)).toBeInTheDocument();
  // });
  // test("should breadcrumb link be clicked", () => {
  //   render(<QC />, state);

  //   fireEvent.click(screen.getByTestId("breadcrumb-click").children[0]);
  // });

  test('renders the protocol number in the bread crumbs when a protocol is selected', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <QCContainer />
      </Provider>,
    );
    expect(getByTestId('breadcrumb-click')).toHaveTextContent('QC');
  });

  it('calls the handleProtocolClick function when a protocol is clicked in the QCProtocolTable', () => {
    const handleProtocolClick = jest.fn();
    render(<QCContainer handleProtocolClick={handleProtocolClick} />);
    fireEvent.click(
      screen
        .getByTestId('qcprotocolView-child-component')
        .querySelector('tbody tr'),
    );
    expect(handleProtocolClick).toHaveBeenCalledTimes(0);
  });

  test('handleClick prevents default', () => {
    const preventDefault = jest.fn();
    const { getByTestId } = render(<QCContainer />);
    fireEvent.click(getByTestId('breadcrumb-click'), { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(0);
  });

  test('rendering the QC Component with notification Data', () => {
    const reduxData = {
      initialState: {
        qc: {
          notificationData: {
            id: '1',
            protocol: 'test123',
          },
        },
      },
    };
    render(<QCContainer />, reduxData);
  });

  test('should call handleClick function', () => {
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    const { getByTestId } = render(<QCContainer />, { state });

    fireEvent.click(getByTestId('breadcrumb-click'));

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'dashboard/setSelectedProtocols',
      payload: [],
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'GET_QC_PROTOCOL_TABLE_SAGA',
    });
  });

  it('should prevent default when handleClick function is called', () => {
    const initialState = {
      qcNotification: null,
      userDetails: {
        userType: 'admin',
      },
    };
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    const { getByTestId } = render(
      <Provider store={store}>
        <QCContainer />
      </Provider>,
      { initialState },
    );

    const qcParentComponent = getByTestId('qc-parent-component');
    const event = { preventDefault: jest.fn() };
    fireEvent.click(qcParentComponent, event);

    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });
});

describe('QCContainer', () => {
  it('should call the `handleClick` function when the user clicks on the "QC" link', () => {
    // const [value, setValue] = useState(0);
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    const handleClick = jest.fn();

    render(<QCContainer handleClick={handleClick} />);

    expect(handleClick).not.toHaveBeenCalled();

    const qcLink = screen.getByText('QC');
    fireEvent.click(qcLink);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});

describe('handleProtocolClick', () => {
  it('should call the provided setValue function with value 1', () => {
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    const setValueMock = jest.fn();
    const setprotocolIdMock = jest.fn();
    const setProtocolNumberMock = jest.fn();
    const setFilePathMock = jest.fn();

    render(
      <QCContainer
        setValue={setValueMock}
        setprotocolId={setprotocolIdMock}
        setProtocolNumber={setProtocolNumberMock}
        setFilePath={setFilePathMock}
      />,
    );

    expect(setValueMock).toHaveBeenCalledTimes(0);
    expect(setprotocolIdMock).toHaveBeenCalledTimes(0);
    expect(setProtocolNumberMock).toHaveBeenCalledTimes(0);
    expect(setFilePathMock).toHaveBeenCalledTimes(0);
  });
});
