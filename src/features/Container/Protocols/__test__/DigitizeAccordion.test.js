import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';

import store from '../../../../store/store';

import { render } from '../../../../test-utils/test-utils';
import DigitizeAccordion from '../DigitizeAccordion';

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
  test('render accordion', () => {
    const component = render(
      <Provider store={store}>
        <DigitizeAccordion item={item} />
      </Provider>,
    );
    const header = component.getByText('blank_header');
    expect(header).toBeInTheDocument();
  });

  // test('does not show pencil icon for primary role', () => {
  //   const bool = true;
  //   const component = render(
  //     <DigitizeAccordion item={item} primaryRole={bool} />,
  //   );
  //   expect(component.find('.loader')).not.toBeInTheDocument();
  // });

  // test('accordion on closed state', () => {
  //   const bool = true;
  //   const component = render(
  //     <DigitizeAccordion
  //       item={item}
  //       primaryRole={bool}
  //       protocol="1234"
  //       currentActiveCard={1}
  //       setCurrentActiveCard={jest.fn()}
  //     />,
  //   );
  //   expect(component.find('.loader')).not.toBeInTheDocument();
  // });

  test('Accordion loaded with store values', () => {
    const bool = true;
    render(
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard={1}
          setCurrentActiveCard={jest.fn()}
        />
      </Provider>,
    );
  });

  test('Accordion is open when the currentActiveCard is of the same item id', () => {
    const bool = true;
    render(
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard="8ccb22b1-0aa0-487a-a47b-26a0b71bd4b7"
          setCurrentActiveCard={jest.fn()}
        />
      </Provider>,
    );
  });

  test('Pencil icon is visible for primary user', () => {
    const bool = false;
    const component = render(
      <Provider store={store}>
        <DigitizeAccordion
          item={item}
          primaryRole={bool}
          protocol="1234"
          currentActiveCard="8ccb22b1-0aa0-487a-a47b-26a0b71bd4b7"
          setCurrentActiveCard={jest.fn()}
        />
      </Provider>,
    );
    const pencil = component.getByTestId('pencilIcon');
    expect(pencil).toBeInTheDocument();
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
