import { render, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import Setting from '../Setting/Setting';
import initialState from './navbarReducer.json';
import NavbarSlice from '../navbarSlice';
import UserDetail from '../../../../store/userDetails';

export default function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { navbar: NavbarSlice, userDetail: UserDetail },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

describe('Setting', () => {
  it('should close the modal when the submit button is clicked', () => {
    const handleModal = jest.fn();
    const { getByText, getAllByLabelText } = renderWithProviders(
      <Setting handleModal={handleModal} />,
      {
        preloadedState: initialState,
      },
    );

    const digitizationCompleteCheckbox = getAllByLabelText(
      'New Document/Version',
    );
    fireEvent.click(digitizationCompleteCheckbox[0]);
    const editedCheckbox = getAllByLabelText('Edited');
    fireEvent.click(editedCheckbox[0]);
    const qcCompleteCheckbox = getAllByLabelText('QC Complete');
    fireEvent.click(qcCompleteCheckbox[0]);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    expect(handleModal).toHaveBeenCalledWith(false);
  });

  it('should close the modal when the Cancel button is clicked', () => {
    const handleModal = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Setting handleModal={handleModal} />
      </Provider>,
      {
        initialState,
      },
    );
    const submitButton = getByText('Cancel');
    fireEvent.click(submitButton);
    expect(handleModal).toHaveBeenCalledWith(false);
  });

  it('should toggle the Draft checkbox when clicked', () => {
    const { getAllByLabelText } = renderWithProviders(<Setting />, {
      preloadedState: initialState,
    });
    const digitizationCompleteCheckbox = getAllByLabelText(
      'New Document/Version',
    );
    fireEvent.click(digitizationCompleteCheckbox[0]);
    const editedCheckbox = getAllByLabelText('Edited');
    fireEvent.click(editedCheckbox[0]);
    const qcCompleteCheckbox = getAllByLabelText('QC Complete');
    fireEvent.click(qcCompleteCheckbox[0]);
    fireEvent.click(qcCompleteCheckbox[0]);
  });
  it('should toggle the Draft checkbox when clicked', () => {
    const { getAllByLabelText } = renderWithProviders(<Setting />, {
      preloadedState: initialState,
    });
    const digitizationCompleteCheckbox = getAllByLabelText(
      'New Document/Version',
    );
    fireEvent.click(digitizationCompleteCheckbox[0]);
    const editedCheckbox = getAllByLabelText('Edited');
    fireEvent.click(editedCheckbox[0]);
  });
});
