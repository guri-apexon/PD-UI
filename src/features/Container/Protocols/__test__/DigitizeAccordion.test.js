import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { cloneDeep } from 'lodash';
import store from '../../../../store/store';
import { render, screen } from '../../../../test-utils/test-utils';
import DigitizeAccordion from '../DigitizedPanel/DigitizeAccordion';
import ProtocolReducer from '../protocolSlice';
import UserReducer from '../../../../store/userDetails';
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
// jest.setTimeout(1500000);
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
          handleLinkId={jest.fn()}
          handleOpenAccordion={jest.fn()}
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
          handleLinkId={jest.fn()}
          handleOpenAccordion={jest.fn()}
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
          handleLinkId={jest.fn()}
          handleOpenAccordion={jest.fn()}
        />
      </Provider>,
    );
  });

  test('Pencil icon is onClick for primary user', async () => {
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

    const obj = cloneDeep(initialState);
    delete obj.protocol.sectionDetails.data;
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <DigitizeAccordion
        item={item1}
        primaryRole={bool}
        protocol="15-07"
        index={1}
        currentActiveCard={null}
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={jest.fn()}
        handlePageRight={jest.fn()}
        handleLinkId={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      {
        initialState,
      },
    );

    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    expect(component.getByTestId('accordion_summary')).toBeInTheDocument();
    expect(component.getByTestId('accordion-header')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('accordion-header'));
    screen.debug(component.getByTestId('pencilIcon'));
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
    fireEvent.click(pencil);
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
          handleLinkId={jest.fn()}
          handleOpenAccordion={jest.fn()}
        />
      </Provider>,
    );
    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    fireEvent.click(accordian);
    expect(component.getByTestId('accordion-details')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('accordion-details'));
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
    const item1 = {
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
        item={item1}
        primaryRole={bool}
        protocol="1234"
        currentActiveCard="8ccb22b1-0aa0-487a-a47b"
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={() => jest.fn()}
        handlePageRight={() => jest.fn()}
        handleLinkId={jest.fn()}
        handleOpenAccordion={jest.fn()}
      />,
      {
        preloadedState: initialState,
      },
    );
    const enrText = screen.getByText('Signatures');
    fireEvent.click(enrText);
  });

  test('Digitized accordion Plus Icon view', () => {
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
        headerList={[1, 2]}
        handleLinkId={jest.fn()}
        handleOpenAccordion={jest.fn()}
      />,
      {
        preloadedState: initialState,
      },
    );
    fireEvent.mouseOver(screen.getByTestId('mouse-over'));
    fireEvent.mouseLeave(screen.getByTestId('mouse-over'));
    fireEvent.mouseOver(screen.getByTestId('mouse-over'));
    const plusicon = screen.getByTestId('plus-add');
    fireEvent.click(plusicon);
    expect(plusicon).toBeInTheDocument();
  });

  test('click on accordion_summary', () => {
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
          handlePageRight={jest.fn()}
          handleLinkId={jest.fn()}
          handleOpenAccordion={jest.fn()}
        />
      </Provider>,
    );
    expect(component.getByTestId('accordion_summary')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('accordion_summary'));
  });

  test('Save button is visible for primary user', async () => {
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

    const obj = cloneDeep(initialState);
    delete obj.protocol.sectionDetails.data;
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <DigitizeAccordion
        item={item1}
        primaryRole={bool}
        protocol="15-07"
        index={1}
        currentActiveCard={null}
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={jest.fn()}
        handlePageRight={jest.fn()}
        dataExist
        handleLinkId={jest.fn()}
        handleOpenAccordion={jest.fn()}
      />,
      {
        initialState,
      },
    );

    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    expect(component.getByTestId('accordion_summary')).toBeInTheDocument();
    expect(component.getByTestId('accordion-header')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('accordion-header'));
    screen.debug(component.getByTestId('pencilIcon'));
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
    fireEvent.click(pencil);
    // jest.useFakeTimers();
    // // container.instance().setTimeoutFn();
    // jest.advanceTimersByTime(1000);
    // jest.runAllTimers();
    // screen.debug(undefined, Infinity);

    // const trash = await component.findByTestId('trashIcon');
    // fireEvent.click(trash);
    // const deleteText = component.getByTestId('update-term-field');
    // fireEvent.click(deleteText);
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

    const obj = cloneDeep(initialState);
    delete obj.protocol.sectionDetails.data;
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <DigitizeAccordion
        item={item1}
        primaryRole={bool}
        protocol="15-07"
        index={1}
        currentActiveCard={null}
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={jest.fn()}
        handlePageRight={jest.fn()}
        handleLinkId={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      {
        initialState,
      },
    );

    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    expect(component.getByTestId('accordion_summary')).toBeInTheDocument();
    expect(component.getByTestId('accordion-header')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('accordion-header'));
    screen.debug(component.getByTestId('pencilIcon'));
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
    fireEvent.click(pencil);
    // const trash = component.getByTestId('trashIcon');
    // fireEvent.click(trash);
    // const deleteText = component.getByTestId('update-term-field-cancel');
    // component.debug();
    // fireEvent.click(deleteText);
  });

  xtest('Should render the undo button and its modal', () => {
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

    const obj = cloneDeep(initialState);
    delete obj.protocol.sectionDetails.data;
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <DigitizeAccordion
        item={item1}
        primaryRole={bool}
        protocol="15-07"
        index={1}
        currentActiveCard={null}
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={jest.fn()}
        handlePageRight={jest.fn()}
        handleLinkId={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      {
        initialState,
      },
    );

    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    expect(component.getByTestId('accordion_summary')).toBeInTheDocument();
    expect(component.getByTestId('accordion-header')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('accordion-header'));
    screen.debug(component.getByTestId('pencilIcon'));
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
    fireEvent.click(pencil);
    const undo = component.getByTestId('discard-icon');
    expect(undo).toBeInTheDocument();
    fireEvent.click(undo);
    screen.debug();
    // const undoText = fireEvent.click(
    //   component.getAllByRole('button', /Undo/i)[0],
    // );
    // expect(undoText).toBeTruthy();
    expect(component.getByTestId('discard-modal')).toBeInTheDocument();
    expect(
      component.getByText(/Are you sure you want to discard the changes?/i),
    ).toBeInTheDocument();
    // const discardModal = component.getByTestId('discard-modal');

    expect(component.getByText('Cancel')).toBeInTheDocument();
    const button = component.getByText('Cancel');
    fireEvent.click(button);
  });

  xtest('Should render save the all the tables before saving the section', () => {
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

    const obj = cloneDeep(initialState);
    delete obj.protocol.sectionDetails.data;
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const component = render(
      <DigitizeAccordion
        item={item1}
        primaryRole={bool}
        protocol="15-07"
        index={1}
        currentActiveCard={null}
        setCurrentActiveCard={jest.fn()}
        setCurrentEditCard={jest.fn()}
        handlePageRight={jest.fn()}
        handleLinkId={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      {
        initialState,
      },
    );
    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    expect(component.getByTestId('accordion_summary')).toBeInTheDocument();
    expect(component.getByTestId('accordion-header')).toBeInTheDocument();
    fireEvent.click(component.getByTestId('accordion-header'));
    screen.debug(component.getByTestId('pencilIcon'));
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
    fireEvent.click(pencil);
    const richTextEditor = component.getByTestId('richTextEditor');
    expect(richTextEditor).toBeInTheDocument();
    fireEvent.click(richTextEditor);
    const container = component.getByTestId('container');
    expect(container).toBeInTheDocument();
    fireEvent.click(container);
    const hoverComponent = component.getByTestId('hover-component');
    expect(hoverComponent).toBeInTheDocument();
    const addIcon = component.getByTestId('addIcon');
    expect(addIcon).toBeInTheDocument();
    fireEvent.click(addIcon);
    expect(component.getByText('Table')).toBeInTheDocument();
    const saveIcon = component.getByTestId('saveIcon');
    expect(saveIcon).toBeInTheDocument();
    fireEvent.click(saveIcon);
    const confirmPopup = component.getByTestId('confirmPopup');
    expect(confirmPopup).toBeInTheDocument();
  });
});
