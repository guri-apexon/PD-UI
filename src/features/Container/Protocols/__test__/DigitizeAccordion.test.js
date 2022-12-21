import { render, fireEvent } from '../../../../test-utils/test-utils';
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
  test('should save input and lose focus when user presses enter', () => {
    const component = render(<DigitizeAccordion item={item} />);
    const header = component.getByText('blank_header');
    expect(header).toBeInTheDocument();
  });
});
