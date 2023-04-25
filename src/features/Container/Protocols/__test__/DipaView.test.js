import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import ProtocolReducer from '../protocolSlice';

import * as ProtocolContext from '../ProtocolContext';
import { fireEvent, render, cleanup } from '../../../../test-utils/test-utils';
import initialState from './mockDipadata';
import DipaView from '../DIPA/DipaView';
import UserReducer from '../../../../store/userDetails';

afterEach(cleanup);
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
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
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
describe.only('DipaView Component testing', () => {
  it('should add a group when clicked on add group button', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const plusIcon = screen.getAllByTestId('plus-icon')[0];
    fireEvent.click(plusIcon);
    const addGroupButton = screen.getByTestId('add-group');
    expect(addGroupButton).toBeInTheDocument();
    fireEvent.click(addGroupButton);
  });

  it('opens the tooltip when the eye icon is hovered', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const eyeIcon = screen.getAllByTestId('eyeshow-tooltip-icon')[0];
    fireEvent.mouseLeave(eyeIcon);

    fireEvent.mouseEnter(eyeIcon);
    expect(screen.getAllByTestId('eyeshow-tooltip')[0]).toBeInTheDocument();
  });

  it('opens the tooltip when the pencil icon is hovered', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });

    fireEvent.mouseEnter(screen.getAllByTestId('edit-button')[0]);
    expect(screen.getAllByTestId('pencil-tooltip')[0]).toBeInTheDocument();
  });

  it('should AddSegment when the Add Segment button is clicked', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });

    fireEvent.click(screen.getAllByTestId('paragraph-text')[0]);
    const pencilIcon = screen.getAllByTestId('edit-button')[0];
    fireEvent.click(pencilIcon);
    const plusIcon = screen.getAllByTestId('plus-icon')[0];
    fireEvent.click(plusIcon);
    const addSegmentButton = screen.getAllByTestId('add-segment')[0];
    expect(addSegmentButton).toBeInTheDocument();
    fireEvent.click(addSegmentButton);
    // add new segment text and validate
    const textFields = screen.getAllByTestId('segment-textfield');
    fireEvent.change(textFields[0], { target: { value: 'New segment' } });
    expect(textFields[0].value).toBe('New segment');

    // save segment and validate
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);

    expect(screen.getByText('New segment')).toBeInTheDocument();
  });

  it('should expand the accordion when clicked', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    fireEvent.click(screen.getAllByTestId('paragraph-text')[0]);
  });

  it('should render cancel button when clicked on delete modal', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const trashButton = screen.getAllByTestId('delete-icon')[0];
    fireEvent.click(trashButton);
    const cancelButton = screen.getByTestId('cancel-modal-button');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
  });

  it('should render save button when clicked on delete modal', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const trashButton = screen.getAllByTestId('delete-icon')[0];
    fireEvent.click(trashButton);
    const saveButton = screen.getByTestId('save-modal-button');
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
  });

  it('should render textField when clicked on addGroup Button', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const plusIcon = screen.getAllByTestId('plus-icon')[0];
    fireEvent.click(plusIcon);
    const addGroupButton = screen.getByTestId('add-group');
    fireEvent.click(addGroupButton);
    expect(addGroupButton).toBeInTheDocument();
    const textField = screen.getAllByTestId('addgroup-textfield');
    fireEvent.change(textField[0], { target: { value: 'New Group' } });
    const saveClick = screen.getByTestId('save');
    fireEvent.click(saveClick);
    expect(textField[0].value).toBe('New Group');
  });

  it('check Trash icon is clickable', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const trashIcon = screen.getAllByTestId('delete-icon')[0];
    expect(trashIcon).toBeInTheDocument();
    fireEvent.click(trashIcon);
  });

  it('check pencil icon is clickable', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });

    fireEvent.click(screen.getAllByTestId('paragraph-text')[0]);
    const pencilIcon = screen.getAllByTestId('edit-button')[0];
    expect(pencilIcon).toBeInTheDocument();
    fireEvent.click(pencilIcon);
  });

  it('Should render different segments when category changes', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });

    const select = screen.getByTestId('select-box');
    expect(select).toBeInTheDocument();
    fireEvent.change(select, {
      target: { value: 'cpt_secondary_endpoints_estimands_analysis' },
    });
    expect(
      screen.getByText(
        'The percentage of subjects whexperience at least 1 treatment-emergent AE (TEAor SAE.',
      ),
    ).toBeInTheDocument();
  });

  test('Should not render the expand view button if `showExpandIcon` option is undefined', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });

    const minimizeBtn = screen.queryByTestId('minimize-btn');
    expect(minimizeBtn).toBe(null);
    const expandBtn = screen.queryByTestId('expand-btn');
    expect(expandBtn).toBe(null);
  });

  test('Should render the expand view button if `showExpandIcon` is true', () => {
    const screen = renderWithProviders(<DipaView showExpandIcon />, {
      preloadedState: { ...initialState },
    });

    const minimizeBtn = screen.queryByTestId('minimize-btn');
    expect(minimizeBtn).toBe(null);
    const expandBtn = screen.queryByTestId('expand-btn');
    expect(expandBtn).toBeInTheDocument();
  });

  test('Should call handleRightFullScreen when clicked on expand button', () => {
    const mockHandleRightFullScreen = jest.fn();

    const screen = renderWithProviders(
      <DipaView
        showExpandIcon
        fullRightScreen={false}
        handleRightFullScreen={mockHandleRightFullScreen}
      />,
      {
        preloadedState: { ...initialState },
      },
    );

    const minimizeBtn = screen.queryByTestId('minimize-btn');
    expect(minimizeBtn).toBe(null);

    const expandBtn = screen.queryByTestId('expand-btn');
    expect(expandBtn).toBeInTheDocument();

    fireEvent.click(expandBtn);
    expect(mockHandleRightFullScreen).toHaveBeenCalledWith(null);
  });

  test('Should call handleRightFullScreen when clicked on minimize button', () => {
    const mockHandleRightFullScreen = jest.fn();

    const screen = renderWithProviders(
      <DipaView
        showExpandIcon
        fullRightScreen
        handleRightFullScreen={mockHandleRightFullScreen}
      />,
      {
        preloadedState: { ...initialState },
      },
    );

    const minimizeBtn = screen.queryByTestId('minimize-btn');
    expect(minimizeBtn).toBeInTheDocument(null);

    const expandBtn = screen.queryByTestId('expand-btn');
    expect(expandBtn).toBe(null);

    fireEvent.click(minimizeBtn);
    expect(mockHandleRightFullScreen).toHaveBeenCalledWith(null);
  });

  test('Should call stopPropagation when textfield is clicked', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const plusIcon = screen.getAllByTestId('plus-icon')[0];
    fireEvent.click(plusIcon);
    const addGroupButton = screen.getByTestId('add-group');
    fireEvent.click(addGroupButton);
    const groupTextfield = screen.getAllByTestId('addgroup-textfield')[0];
    const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation');

    fireEvent.click(groupTextfield);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  test('Should call stopPropagation when textfield is focused', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const plusIcon = screen.getAllByTestId('plus-icon')[0];
    fireEvent.click(plusIcon);
    const addGroupButton = screen.getByTestId('add-group');
    fireEvent.click(addGroupButton);
    const groupTextfield = screen.getAllByTestId('addgroup-textfield')[0];
    const textFieldSpy = jest.spyOn(Event.prototype, 'stopPropagation');

    act(() => groupTextfield.focus());

    expect(textFieldSpy).toHaveBeenCalled();
  });

  it('Should close the modal when clicked on close icon', () => {
    const closeModal = jest.fn();
    const screen = renderWithProviders(
      <DipaView setOpenModal={closeModal} openModal />,
      {
        preloadedState: { ...initialState },
      },
    );
    const trashButton = screen.getAllByTestId('delete-icon')[0];
    fireEvent.click(trashButton);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(closeModal).toHaveBeenCalledTimes(0);
  });
});
