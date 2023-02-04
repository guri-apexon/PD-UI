import { Provider } from 'react-redux';

import store from '../../../../store/store';

import { render, fireEvent } from '../../../../test-utils/test-utils';
import DigitizeAccordion from '../DigitizedPanel/DigitizeAccordion';
import ProtocolContext from '../ProtocolContext';

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

describe('DigitizeAccordion', () => {
  const bool = true;
  const DigitizeAccordionComp = (
    <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard={1}
          setCurrentActiveCard={jest.fn()}
          setCurrentEditCard={jest.fn()}
        />
      </Provider>
    </ProtocolContext.Provider>
  );
  test('render accordion', () => {
    const component = render(DigitizeAccordionComp);
    const header = component.getByText('blank_header');
    expect(header).toBeInTheDocument();
  });

  test('Accordion loaded with store values and Accordion is open when the currentActiveCard is of the same item id', () => {
    const component = render(DigitizeAccordionComp);
    expect(component).toBeTruthy();
  });

  test('Accordion is close when the currentActiveCard is of the same item id', () => {
    const bool = true;
    render(
      <Provider store={store}>
        <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
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
        </ProtocolContext.Provider>
      </Provider>,
    );
  });

  test('Pencil icon is visible for primary user', () => {
    const component = render(DigitizeAccordionComp);
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
  });

  test('Pencil icon is onClick for primary user', () => {
    const component = render(DigitizeAccordionComp);
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
    pencil.click(pencil);
  });

  test('accordian is onClick for primary user', () => {
    const component = render(DigitizeAccordionComp);
    const accordian = component.getByTestId('accordion');
    expect(accordian).toBeInTheDocument();
    fireEvent.click(accordian);
  });

  test('Save button is visible for primary user', () => {
    const component = render(DigitizeAccordionComp);
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
    fireEvent.click(pencil);
    const saveIcon = component.getByTestId('saveIcon');
    expect(saveIcon).toBeInTheDocument();
    fireEvent.click(saveIcon);
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
});
