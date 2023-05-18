import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import UserReducer from '../../../../store/userDetails';
import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import DigitalizeCard from '../DigitizedPanel/DigitalizeCard';
import * as ProtocolContext from '../ProtocolContext';
import ProtocolReducer from '../protocolSlice';
import {
  preloadedDataForSchedule,
  dataValues,
  preloadedData,
  preloadedDataForLab,
  preloadedDataForDipaView,
} from './data';
import preloadedStateData from './tableData';
// eslint-disable-next-line
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { protocol: ProtocolReducer, user: UserReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

describe('Digitalize Card Component', () => {
  const preloadedState = preloadedStateData;
  const sectionRefValue = [
    {
      current: {
        scrollIntoView: jest.fn(),
      },
    },
    {
      current: {
        scrollIntoView: jest.fn(),
      },
    },
  ];
  const dataValue = dataValues;
  const dataValueTest = {
    amendment: 'Y',
    id: 'f2571c30-a39f-4d58-a092-09edaac5b814',
  };
  test('when rightBlade value is home and click on submit button', () => {
    const { rerender } = render(
      <DigitalizeCard
        sectionNumber={0}
        sectionRef={sectionRefValue}
        data={dataValueTest}
        paginationPage={0}
        handlePageRight={jest.fn()}
        globalPreferredTerm={false}
        handleRightFullScreen={jest.fn()}
        dataExist
      />,
      preloadedState,
    );
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeEnabled();
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByText(/Do you want to submit ?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Close' }));

    rerender(
      <DigitalizeCard
        sectionNumber={0}
        sectionRef={sectionRefValue}
        data={dataValueTest}
        paginationPage={1}
        handlePageRight={jest.fn()}
        globalPreferredTerm={false}
        handleRightFullScreen={jest.fn()}
        dataExist
      />,
    );
  });

  test('when righBlade Value as Protocol Attributes', () => {
    const preloadedStateForProtocolAttributes = preloadedData;
    render(
      <DigitalizeCard
        sectionNumber={0}
        sectionRef={sectionRefValue}
        data={dataValue}
        paginationPage={0}
        handlePageRight={jest.fn()}
        globalPreferredTerm={false}
        handleRightFullScreen={jest.fn()}
        dataExist
      />,
      preloadedStateForProtocolAttributes,
    );
  });

  test('when right Blade value as lab Data', () => {
    const preloadedStateForLabData = preloadedDataForLab;
    render(
      <DigitalizeCard
        sectionNumber={0}
        sectionRef={sectionRefValue}
        data={dataValue}
        paginationPage={0}
        handlePageRight={jest.fn()}
        globalPreferredTerm={false}
        handleRightFullScreen={jest.fn()}
        dataExist
      />,
      preloadedStateForLabData,
    );
  });

  test('when right Blade value as Schedule of ACTIVITIES ', () => {
    const preloadedStateForSchedule = preloadedDataForSchedule;
    render(
      <DigitalizeCard
        sectionNumber={0}
        sectionRef={sectionRefValue}
        data={dataValue}
        paginationPage={0}
        handlePageRight={jest.fn()}
        globalPreferredTerm={false}
        handleRightFullScreen={jest.fn()}
        dataExist
      />,
      preloadedStateForSchedule,
    );
  });

  test('when right Blade value as DIPA_VIEW ', () => {
    const preloadedStateDipaView = preloadedDataForDipaView;
    render(
      <DigitalizeCard
        sectionNumber={0}
        sectionRef={sectionRefValue}
        data={dataValue}
        paginationPage={0}
        handlePageRight={jest.fn()}
        globalPreferredTerm={false}
        handleRightFullScreen={jest.fn()}
        dataExist
      />,
      preloadedStateDipaView,
    );
  });
});
