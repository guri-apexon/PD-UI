import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import store from '../../../../store/store';

import { render, fireEvent } from '../../../../test-utils/test-utils';
import DigitizeAccordion from '../DigitizedPanel/DigitizeAccordion';
import ProtocolReducer from '../protocolSlice';
import * as ProtocolContext from '../ProtocolContext';

import initialState from './ProtocolReducer.json';

const item = {
  doc_id: '558a1964-bfed-4974-a52b-79848e1df372',
  group_type: 'DocumentLinks',
  link_id: '8ccb22b1-0aa0-487a-a47b-26a0b71bd4b7',
  LinkLevel: 1,
  page: 1,
  sec_id: '',
  source_file_section: 'blank_header',
  LinkType: 'toc',
  qc_change_type: '',
  sequence: 0,
  section_locked: false,
  audit_info: {
    last_reviewed_date: '',
    last_reviewed_by: '',
    total_no_review: '',
  },
};

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

describe('DigitizeAccordion', () => {
  const bool = true;

  test('render accordion', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard={1}
          setCurrentActiveCard={jest.fn()}
          setCurrentEditCard={jest.fn()}
        />
      </Provider>,
    );
    const header = component.getByText('blank_header');
    expect(header).toBeInTheDocument();
  });

  test('Accordion loaded with store values and Accordion is open when the currentActiveCard is of the same item id', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard={1}
          setCurrentActiveCard={jest.fn()}
          setCurrentEditCard={jest.fn()}
        />
      </Provider>,
    );
    expect(component).toBeTruthy();
  });

  test('Accordion is close when the currentActiveCard is of the same item id', () => {
    const bool = true;
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard="8ccb22b1-0aa0-487a-a47b"
          setCurrentActiveCard={jest.fn()}
          setCurrentEditCard={jest.fn()}
          handlePageRight={jest.fn()}
          rightBladeValue={jest.fn()}
        />
      </Provider>,
    );
  });

  test('accordian is onClick for primary user', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard={1}
          setCurrentActiveCard={jest.fn()}
          setCurrentEditCard={jest.fn()}
        />
      </Provider>,
    );
    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    fireEvent.click(accordian);
  });

  test('Save button is visible for primary user', () => {
    const item1 = {
      doc_id: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
      group_type: 'DocumentLinks',
      link_id: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      LinkLevel: 1,
      page: 2,
      sec_id: '',
      source_file_section: 'Signatures',
      LinkType: 'toc',
      qc_change_type: '',
      sequence: 0,
      section_locked: false,
      audit_info: {
        last_reviewed_date: '',
        last_reviewed_by: '',
        total_no_review: '',
      },
    };
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = renderWithProviders(
      <DigitizeAccordion
        item={item1}
        primaryRole={bool}
        protocol="1234"
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={() => jest.fn()}
        handlePageRight={() => jest.fn()}
      />,
      {
        preloadedState: initialState,
      },
    );
    const enrText = component.getByText('Signatures');
    fireEvent.click(enrText);
    const openPanel = component.getByTestId('openClosePanel').children[0];
    expect(openPanel).toBeInTheDocument();
    fireEvent.click(openPanel);

    const editButton = component.getByText('Edit');
    fireEvent.click(editButton);

    const saveButton = component.getByText('Save');
    fireEvent.click(saveButton);
  });

  test('Autosizer', () => {
    jest.mock('react-virtualized', () => {
      const ReactVirtualized = jest.requireActual('react-virtualized');
      return {
        ...ReactVirtualized,
        AutoSizer: ({ children }) => children({ height: 1000, width: 1000 }),
      };
    });
  });

  test('Digitized accordion normal view', () => {
    const item = {
      doc_id: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
      group_type: 'DocumentLinks',
      link_id: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      LinkLevel: 1,
      page: 1,
      sec_id: '',
      source_file_section: 'Signatures',
      LinkType: 'toc',
      qc_change_type: '',
      sequence: 0,
      section_locked: false,
      audit_info: {
        last_reviewed_date: '',
        last_reviewed_by: '',
        total_no_review: '',
      },
    };
    const screen = renderWithProviders(
      <DigitizeAccordion
        item={item}
        primaryRole={bool}
        protocol="1234"
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={() => jest.fn()}
      />,
      {
        preloadedState: initialState,
      },
    );
    const enrText = screen.getByText('CONFIDENTIAL');
    fireEvent.click(enrText);
  });

  test('Digitized accordion clinical term view', () => {
    const item = {
      doc_id: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
      group_type: 'DocumentLinks',
      link_id: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      LinkLevel: 1,
      page: 1,
      sec_id: '',
      source_file_section: 'Signatures',
      LinkType: 'toc',
      qc_change_type: '',
      sequence: 0,
      section_locked: false,
      audit_info: {
        last_reviewed_date: '',
        last_reviewed_by: '',
        total_no_review: '',
      },
    };
    const screen = renderWithProviders(
      <DigitizeAccordion
        item={item}
        primaryRole={bool}
        protocol="1234"
        currentActiveCard="8ccb22b1-0aa0-487a-a47b"
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={() => jest.fn()}
        rightBladeValue="Clinical Terms"
      />,
      {
        preloadedState: initialState,
      },
    );
    const enrText = screen.getByText('CONFIDENTIAL');
    fireEvent.click(enrText);
  });
});
