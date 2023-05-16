import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import { screen } from '../../../../../test-utils/test-utils';
import AddClinicalTerm from '../AddClinicalTerm';

const selectionHeaderList = {
  protocol: 'NCT02614287',
  word: {
    type: 'header',
    font_info: {
      roi_id: {
        para: '31fbea8a-1204-4105-ad33-f414d1816045',
      },
      content: 'ABC',
    },
  },
  data: [
    {
      linkId: '95b10aff-b771-11ed-845f-005056ab6469',
      data: [
        {
          section_level: '',
          CPT_section: 'Unmapped',
          type: 'header',
          content:
            '<h1>Protocol I5Q-MC-CGAJ A Phase 3, Long-Term, Open-Label Safety Study of LY2951742 in Patients with Migraine</h1>',
          font_info: {
            IsBold: false,
            font_size: -1,
            font_style: 'Heading1',
            entity: [],
            roi_id: {
              para: '31fbea8a-1204-4105-ad33-f414d1816045',
              childbox: '',
              subtext: '',
            },
            Bold: false,
            Caps: false,
            ColorRGB: 0,
            doc_id: '6fc33a5a-501a-4f59-952f-7ef55a111107',
            DStrike: false,
            Emboss: false,
            group_type: 'fontInfo',
            hierarchy: 'paragraph',
            Highlight: '',
            id: '3180bdfc-ea68-40d3-a624-31d875ab8352',
            Imprint: false,
            iqv_standard_term: '',
            Italics: false,
            link_id: '95b10aff-b771-11ed-845f-005056ab6469',
            link_id_level2: '',
            link_id_level3: '',
            link_id_level4: '',
            link_id_level5: '',
            link_id_level6: '',
            link_id_subsection1: '',
            link_id_subsection2: '',
            link_id_subsection3: '',
            Outline: false,
            parent_id: '3a42ca72-8f0d-498f-be93-a5b9d6e10470',
            rFonts: '',
            rStyle: '',
            Shadow: false,
            Size: -1,
            SmallCaps: false,
            Strike: false,
            Underline: '',
            Vanish: false,
            VertAlign: '',
          },
          level_1_CPT_section: 'Unmapped',
          file_section:
            'Protocol I5Q-MC-CGAJ A Phase 3, Long-Term, Open-Label Safety Study of LY2951742 in Patients with Migraine',
          file_section_num: '',
          file_section_level: '1',
          seq_num: 14,
          qc_change_type: '',
          line_id: '3a42ca72-8f0d-498f-be93-a5b9d6e10470',
          aidocid: '6fc33a5a-501a-4f59-952f-7ef55a111107',
          synonyms_extracted_terms: '',
          semantic_extraction: '',
          section_locked: false,
          clinical_terms: {
            enrollment: {
              preferred_term: '',
              ontology: 'test2',
              synonyms: '',
              medical_term: '',
              classification: '',
            },
            'Approval ': {
              preferred_term: '',
              ontology: '',
              synonyms: '',
              medical_term: '',
              classification: '',
            },
            NCT02614287: {
              preferred_term: 'test2,test44',
              ontology: 'test,test22,test33',
              synonyms: '',
              medical_term: '',
              classification: '',
            },
          },
          preferred_terms: {
            'Protocol I5Q-MC-CGAJA Phase 3, Long-Term, Open-Label Safety Study of LY2951742 in Patients with Migraine':
              {
                id: '95b10aff-b771-11ed-845f-005056ab6469',
                preferred_term: '',
              },
          },
        },
      ],
    },
  ],
  sectionResponse: null,
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe('rendering the Add Clinical Term Component', () => {
  beforeEach(() => {
    window.getSelection = () => {
      return 'enrollment';
    };
  });
  test('select text and click on AddTag, popup will come with disabled Add tag button', () => {
    const state = {
      modal: true,
    };
    useSelector.mockImplementation(() => state);
    render(<AddClinicalTerm docId={1} linkId={2} />);
    expect(screen.getByRole('button', { name: 'Add tag' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
    expect(
      screen.getByText(
        /At least one of these options are required to be filled to add tag/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add tag' })).toBeDisabled();
  });

  test('enter the clinicalTerms, Ontology and Preferred-Terms TextFields and click on AddTag button', () => {
    const state = {
      modal: true,
      word: {
        type: 'header',
        font_info: {
          roi_id: {
            para: '31fbea8a-1204-4105-ad33-f414d1816045',
          },
          content: 'ABC',
        },
      },
    };
    useSelector.mockImplementation(() => state);
    useSelector.mockImplementation(() => selectionHeaderList);
    render(<AddClinicalTerm docId={1} linkId={2} />, {
      wordSelector: state,
    });
    userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
    const field1 = screen
      .getByTestId('clinicalTerms-text')
      .querySelector('input');
    expect(field1).toBeInTheDocument();
    fireEvent.change(field1, { target: { value: 'some text' } });
    expect(field1.value).toBe('some text');
    const field2 = screen.getByTestId('ontology-text').querySelector('input');
    expect(field2).toBeInTheDocument();
    fireEvent.change(field2, { target: { value: 'some text' } });
    expect(field2.value).toBe('some text');
    const field3 = screen
      .getByTestId('Preferred-term-text')
      .querySelector('input');
    expect(field3).toBeInTheDocument();
    fireEvent.change(field3, { target: { value: 'some text' } });
    expect(field3.value).toBe('some text');
    expect(screen.getByRole('button', { name: 'Add tag' })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
  });
});
