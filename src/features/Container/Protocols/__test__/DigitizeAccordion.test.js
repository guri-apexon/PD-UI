import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import UserReducer from '../../../../store/userDetails';
import { render, screen } from '../../../../test-utils/test-utils';
import DigitizeAccordion from '../DigitizedPanel/DigitizeAccordion';
import * as ProtocolContext from '../ProtocolContext';
import ProtocolReducer from '../protocolSlice';
import {
  headerListData,
  headerListDataForDiffLinkId,
  headerListWithoutLinkAndReference,
  mockDataForDiscard,
  mockDataForLockDetails,
  mockStateDataForEmptyLockDetails,
} from './data';

const item = {
  doc_id: '558a1964-bfed-4974-a52b-79848e1df372',
  group_type: 'DocumentLinks',
  link_id: 'bc4dc374-8a78-11ed-af64-005056ab6469',
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
  linkandReference: 'testing',
  preferred_term: 'test',
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

const mockState = {
  initialState: {
    protocol: {
      discardValue: {
        bladeRight: {
          name: 'clinical Terms',
        },
        isDiscarded: true,
        isEdited: true,
      },
      // discardValue: true,
      isSaveEnabled: true,
      sectionIndex: 0,
      sectionLockDetails: {
        section_lock: true,
      },
      TOCActiveAccordion: [true, false],
      activeTOC: ['bc4dc374-8a78-11ed-af64-005056ab646'],
      sectionDetails: {
        protocol: '15-07',
        sectionResponse: {
          success: true,
        },
        data: [
          {
            linkId: 'bc4dc374-8a78-11ed-af64-005056ab6469',
            data: [
              {
                section_level: '',
                CPT_section: 'Unmapped',
                type: 'text',
                content: 'CONFIDENTIAL',
                link_and_reference: { 0: 'source_text' },
                font_info: {
                  IsBold: false,
                  font_size: -1,
                  font_style: '',
                  entity: [],
                  roi_id: {
                    para: 'bc5080ba-8a78-11ed-8986-005056ab6469',
                    childbox: '',
                    subtext: '',
                  },
                },
                level_1_CPT_section: 'Unmapped',
                file_section: 'Unmapped',
                file_section_num: '',
                file_section_level: 1,
                seq_num: 2,
                qc_change_type: '',
                line_id: 'bc5080ba-8a78-11ed-8986-005056ab6469',
                aidocid: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
                synonyms_extracted_terms: '',
                semantic_extraction: '',
                section_locked: false,
                clinical_terms: {
                  CONFIDENTIAL: {
                    synonyms: 'value1, value2',
                  },
                },
              },
              {
                section_level: '',
                CPT_section: 'Unmapped',
                type: 'text',
                content: 'PLASMA',
                link_and_reference: { 0: 'source_text' },
                font_info: {
                  italics: true,
                  IsBold: true,
                  font_size: -1,
                  font_style: '',
                  entity: [],
                  roi_id: {
                    para: 'bc5080ba-8a78-11ed-8986-005056ab6469',
                    childbox: '',
                    subtext: '',
                  },
                },
                level_1_CPT_section: 'Unmapped',
                file_section: 'Unmapped',
                file_section_num: '',
                file_section_level: 1,
                seq_num: 2,
                qc_change_type: '',
                line_id: 'bc5080ba-8a78-11ed-8986-005056ab6469',
                aidocid: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
                synonyms_extracted_terms: '',
                semantic_extraction: '',
                section_locked: false,
                clinical_terms: {
                  CONFIDENTIAL: {
                    synonyms: 'value1, value2',
                  },
                },
              },
            ],
          },
        ],
        sections: [
          {
            section_level: '',
            CPT_section: 'Unmapped',
            type: 'text',
            content: 'CONFIDENTIAL',
            font_info: {
              IsBold: false,
              font_size: -1,
              font_style: '',
              entity: [],
              roi_id: {
                para: 'bc4dc375-8a78-11ed-946e-005056ab6469',
                childbox: '',
                subtext: '',
              },
            },
            level_1_CPT_section: 'Unmapped',
            file_section: 'Unmapped',
            file_section_num: '',
            file_section_level: 1,
            seq_num: 2,
            qc_change_type: '',
            line_id: 'bc5C80ba-8a78-11ed-8986-005056ab6469',
            aidocid: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
            synonyms_extracted_terms: '',
            semantic_extraction: '',
            section_locked: false,
            clinical_terms: {
              CONFIDENTIAL: {
                synonyms: 'value1, value2',
              },
            },
          },
          {
            section_level: '',
            CPT_section: 'Unmapped',
            type: 'text',
            content: 'PLASMA',
            font_info: {
              italics: true,
              IsBold: true,
              font_size: -1,
              font_style: '',
              entity: [],
              roi_id: {
                para: 'bc4dc375-8a78-11ed-946e-005056ab6469',
                childbox: '',
                subtext: '',
              },
            },
            level_1_CPT_section: 'Unmapped',
            file_section: 'Unmapped',
            file_section_num: '',
            file_section_level: 1,
            seq_num: 2,
            qc_change_type: '',
            line_id: 'bc5CA0ba-8a78-11ed-8986-005056ab6469',
            aidocid: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
            synonyms_extracted_terms: '',
            semantic_extraction: '',
            section_locked: false,
            clinical_terms: {
              CONFIDENTIAL: {
                synonyms: 'value1, value2',
              },
            },
          },
        ],
      },
    },
  },
};

describe('rendering the Digitize Accordion file', () => {
  test('when showEdit and saveEnabled is true', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'modify',
          content: 'test',
          isSaved: false,
          type: 'text',
          link_level: '1',
        },
      ],
      setSaveEnabled: jest.fn(),
      setSaveSection: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListWithoutLinkAndReference}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockState,
    );
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByTestId('mouse-over'));
    fireEvent.scroll(screen.getByTestId('accordion'), {
      target: { className: 'enriched-txt' },
    });
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.scroll(screen.getByTestId('accordion-details'));
    fireEvent.keyDown(screen.getByTestId('accordion-details'));
    fireEvent.click(screen.getByTestId('accordion_summary'));
    expect(screen.getByText(/Confirm Action/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Discard' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
    fireEvent.mouseLeave(screen.getByTestId('mouse-over'));
  });

  test('when showEdit and saveEnabled is true and when type is header', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'modify',
          content: 'test',
          isSaved: false,
          type: 'header',
          link_level: '1',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListData}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockState,
    );
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByTestId('mouse-over'));
    fireEvent.scroll(screen.getByTestId('accordion'), {
      target: { className: 'enriched-txt' },
    });
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.scroll(screen.getByTestId('accordion-details'));
    fireEvent.keyDown(screen.getByTestId('accordion-details'));
    fireEvent.click(screen.getByTestId('accordion_summary'));
    // expect(screen.getByTestId('trashIcon')).toBeInTheDocument();
    // fireEvent.click(screen.getByTestId('discardIcon'));
    expect(screen.getByText(/Confirm Action/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Discard' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
  });

  test('when showEdit and saveEnabled is true, and has type as image in section content', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'add',
          content: 'test',
          isSaved: false,
          type: 'image',
        },
      ],
      setSaveEnabled: jest.fn(),
      setSaveSection: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListData}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockState,
    );
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByTestId('mouse-over'));
    fireEvent.scroll(screen.getByTestId('accordion'), {
      target: { className: 'enriched-txt' },
    });
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.scroll(screen.getByTestId('accordion-details'));
    fireEvent.keyDown(screen.getByTestId('accordion-details'));
    fireEvent.click(screen.getByTestId('accordion_summary'));
    // expect(screen.getByTestId('trashIcon')).toBeInTheDocument();
    // fireEvent.click(screen.getByTestId('discardIcon'));
    expect(screen.getByText(/Confirm Action/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Discard' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Discard' }));
  });

  test('when showEdit is false', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'test',
          content: 'test',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListData}
        setCurrentEditCard={jest.fn()}
        currentEditCard={null}
        handleLinkId={jest.fn()}
        globalPreferredTerm={false}
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockState,
    );
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByTestId('mouse-over'));
    fireEvent.scroll(screen.getByTestId('accordion'));
    fireEvent.scroll(screen.getByTestId('accordion-details'));
    fireEvent.keyDown(screen.getByTestId('accordion-details'));
    fireEvent.click(screen.getByTestId('accordion_summary'));
  });

  test('calling handleChange function and covering when there is no if condition satisfy', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'test',
          content: 'test',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListDataForDiffLinkId}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm={false}
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockState,
    );
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByTestId('mouse-over'));
    // fireEvent.click(screen.getByTestId('plus-add'));
    // fireEvent.mouseLeave(screen.getByTestId('mouse-over'));
    fireEvent.scroll(screen.getByTestId('accordion'));
    fireEvent.scroll(screen.getByTestId('accordion-details'));
    fireEvent.keyDown(screen.getByTestId('accordion-details'));
    fireEvent.click(screen.getByTestId('accordion_summary'));
  });

  test('when sectionData obj link_id and item link_id different', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'test',
          content: 'test',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListDataForDiffLinkId}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab64"
        handleLinkId={jest.fn()}
        globalPreferredTerm={false}
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockState,
    );
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByTestId('mouse-over'));
    fireEvent.scroll(screen.getByTestId('accordion'));
    fireEvent.scroll(screen.getByTestId('accordion-details'));
    fireEvent.keyDown(screen.getByTestId('accordion-details'));
  });

  test('when discardData has true values', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'test',
          content: 'test',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const mockStateForDiscardData = mockDataForDiscard;
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListData}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm={false}
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockStateForDiscardData,
    );
  });

  test('when showEdit and saveEnabled is false and lockDetails are true', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'test',
          content: 'test',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const mockStateTest = mockDataForLockDetails;

    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListData}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockStateTest,
    );
    fireEvent.click(screen.getByTestId('accordion_summary'));
  });

  test('when expanded true and object linkid and item link id not matching', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'test',
          content: 'test',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const mockStateForEmptyLockDetails = mockStateDataForEmptyLockDetails;

    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListData}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockStateForEmptyLockDetails,
    );
    fireEvent.click(screen.getByTestId('accordion_summary'));
  });

  test('checking and click on accordion summary', () => {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      saveSection: 'bc4dc374-8a78-11ed-af64-005056ab6469',
      sectionContent: [
        {
          qc_change_type: 'test',
          content: 'test',
        },
      ],
      setSaveEnabled: jest.fn(),
      setActiveLineID: jest.fn(),
    };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    render(
      <DigitizeAccordion
        item={item}
        protocol="Test"
        primaryRole
        currentActiveCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handlePageRight={jest.fn()}
        rightBladeValue="Home"
        index={0}
        headerList={headerListData}
        setCurrentEditCard={jest.fn()}
        currentEditCard="bc4dc374-8a78-11ed-af64-005056ab6469"
        handleLinkId={jest.fn()}
        globalPreferredTerm
        scrollToTop={jest.fn()}
        handleOpenAccordion={jest.fn()}
        dataExist
      />,
      mockState,
    );
    fireEvent.mouseEnter(screen.getByTestId('mouse-over'));
    fireEvent.scroll(screen.getByTestId('accordion'), {
      target: { className: 'enriched-txt' },
    });
    fireEvent.scroll(screen.getByTestId('accordion-details'));
    fireEvent.keyDown(screen.getByTestId('accordion-details'));
    fireEvent.click(screen.getByTestId('accordion_summary'));
  });
});
