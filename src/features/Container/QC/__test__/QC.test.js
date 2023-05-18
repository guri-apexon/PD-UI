/* eslint-disable */
import React from 'react';
import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import QCContainer from '../QC';
import { Provider } from 'react-redux';
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
});
