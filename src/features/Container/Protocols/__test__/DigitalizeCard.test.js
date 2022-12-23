import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import DigitalizeCard from '../DigitalizeCard';

const items = [
  {
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
  },
];

const sectionRef = [
  {
    current: 'Current',
  },
];

describe('DigitizeCard', () => {
  test('Header Close', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    const screen = render(
      <Provider store={store}>
        <DigitalizeCard
          sectionNumber={1}
          sectionRef={sectionRef}
          data={{ id: 123 }}
        />
      </Provider>,
    );
    const HeaderClose = screen.getByTestId('protocol-column-wrapper');
    expect(HeaderClose).toBeInTheDocument();
    fireEvent.click(HeaderClose);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
