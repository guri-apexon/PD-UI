import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProtocolReducer from '../protocolSlice';
import * as ProtocolContext from '../ProtocolContext';
import { fireEvent, render, cleanup } from '../../../../test-utils/test-utils';
import initialState from './mockDipadata';
import DipaView from '../DIPA/DipaView';

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
      reducer: { protocol: ProtocolReducer },
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

    fireEvent.mouseEnter(screen.getAllByTestId('show-icon')[0]);
    expect(screen.getAllByTestId('tooltip-icon')[0]).toBeInTheDocument();
  });

  it('opens the tooltip when the pencil icon is hovered', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });

    fireEvent.mouseEnter(screen.getAllByTestId('edit-button')[0]);
    expect(screen.getAllByTestId('pencil-tooltip')[0]).toBeInTheDocument();
  });

  it('should open popover when Plus icon is clicked', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const plusIcon = screen.getAllByTestId('plus-icon')[0];
    fireEvent.click(plusIcon);
    const popover = screen.getByTestId('popover-card');
    expect(popover).toBeInTheDocument();
  });

  it('should AddSegment when the Add Segment button is clicked', () => {
    const screen = renderWithProviders(<DipaView />, {
      preloadedState: { ...initialState },
    });
    const plusIcon = screen.getAllByTestId('plus-icon')[0];
    fireEvent.click(plusIcon);
    const addSegmentButton = screen.getAllByTestId('add-segment')[0];
    expect(addSegmentButton).toBeInTheDocument();
    fireEvent.click(addSegmentButton);
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
    const addSegmentButton = screen.getByTestId('add-group');
    fireEvent.click(addSegmentButton);
    const textField =
      screen.getByTestId('addgroup-textfield').children[1].children[0];
    expect(textField).toBeInTheDocument();
    fireEvent.change(textField, { target: { value: 'Test' } });
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
});
