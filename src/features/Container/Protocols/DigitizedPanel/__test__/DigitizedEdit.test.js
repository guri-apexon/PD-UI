import { render } from '../../../../../test-utils/test-utils';
import * as ProtocolContext from '../../ProtocolContext';
import MultilineEdit from '../MultilineEdit';

const sectionData = [
  {
    section_level: '',
    CPT_section: 'Unmapped',
    type: 'header',
    content: '1 STUDY CONTACTS',

    level_1_CPT_section: 'Unmapped',
    file_section: 'STUDY CONTACTS',
    file_section_num: '1',
    file_section_level: '1',
    seq_num: 1,
    qc_change_type: '',
    line_id: '6c0cf0d6-7d72-4199-ad8f-bc66b92cab12',
    aidocid: '54e4ad00-cc29-42e6-a208-09c7ef663f31',
    synonyms_extracted_terms: '',
    semantic_extraction: '',
    section_locked: false,
  },
  {
    section_level: '',
    CPT_section: 'Unmapped',
    type: 'text',
    content: 'CHIEF INVESTIGATOR:',

    level_1_CPT_section: 'Unmapped',
    file_section: 'STUDY CONTACTS',
    file_section_num: '1',
    file_section_level: '1',
    seq_num: 2,
    qc_change_type: '',
    line_id:
      '5608887c-774d-4d10-ba9f-ed4604f134bf42c52766-d0c2-4524-befa-401c9311c9b71ced360a-6478-4853-9428-9776ddb0a0a9',
    aidocid: '54e4ad00-cc29-42e6-a208-09c7ef663f31',
    synonyms_extracted_terms: '',
    semantic_extraction: '',
    section_locked: false,
  },
];

describe('DigitizedEdit', () => {
  test('render component without error', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <MultilineEdit sectionDataArr={sectionData} edit={false} pageRight={2} />,
    );
    expect(screen).toBeTruthy();
  });
});
