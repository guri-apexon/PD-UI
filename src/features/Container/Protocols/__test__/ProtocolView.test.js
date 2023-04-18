import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import store from '../../../../store/store';
import ProtocolView from '../ProtocolView';
import { summary } from './data';
import { ProtocolContext } from '../ProtocolContext';

const initialState = {
  protocol: {
    protocolTocData: { tocData: { data: [] } },
    view: {
      iqvdataSoa: [{ Table: '<table> sss</table>' }],
      iqvdataSummary: {
        index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        columns: ['field_name', 'field_value', 'field_header'],
        data: [['protocol_name', '', '<b>Protocol Name</b>']],
      },
      iqvdataToc: {
        data: [],
      },
      loader: true,
      tocSections: [{ section: ' Version History', id: 'TOC-24' }],
      soaSections: [
        {
          section: 'Study of Assessments(Schedule of Assessment)',
          id: 'SOA-4',
        },
      ],
    },
    summary: {
      data: summary,
      loading: false,
      success: true,
    },
  },
};
describe('ProtocolView', () => {
  let initialState;
  let dispatch;
  let selectedSection;
  let sectionContent;
  let setSaveSection;
  let props;

  beforeEach(() => {
    dispatch = jest.fn();
    selectedSection = {};
    sectionContent = [];
    setSaveSection = jest.fn();
    props = {
      refs: {},
      data: {},
    };

    initialState = {
      dashboard: {
        workflowSubmit: { success: false },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ProtocolView Component', () => {
    render(
      <ProtocolView
        data={{ userPrimaryRoleFlag: true }}
        protId="c498c738-a42e-4e5b-8886-b6a39ca15bf5"
      />,
      {
        initialState,
      },
    );
  });

  it('should not show "Summary" section when viewData.iqvdataSummary is not present', () => {
    const viewData = {
      tocSections: [],
      soaSections: [],
    };
    props.data = { viewData };
    render(
      <Provider store={store}>
        <ProtocolView {...props} />
      </Provider>,
    );

    expect(screen.queryByText('Summary')).not.toBeInTheDocument();
  });

  xit('should display the table of contents when TOC is present in the data', () => {
    const refs = {
      sectionRef: {
        0: {
          current: { scrollIntoView: jest.fn() },
        },
      },
    };
    const data = {};
    render(
      <Provider store={store}>
        <ProtocolContext.Provider value={{}}>
          <ProtocolView refs={refs} data={data} />
        </ProtocolContext.Provider>
      </Provider>,
    );
    const tocHeading = screen.getByText('Table of Contents');
    expect(tocHeading).toBeInTheDocument();
  });

  xit('handles section select', () => {
    render(
      <Provider store={store}>
        <ProtocolContext.Provider
          value={{
            selectedSection,
            sectionContent,
            saveSection: null,
            dispatchSectionEvent: jest.fn(),
            setSectionContent: jest.fn(),
            setSaveSection,
          }}
        >
          <ProtocolView refs={{}} data={{}} />
        </ProtocolContext.Provider>
      </Provider>,
    );

    const section = {
      id: 'test-section',
      link_id: 'test-link-id',
      title: 'Test Section',
    };
    const payload = {
      selectedSection: section,
      sectionContent: [{ id: 'test-content', content: 'Test Content' }],
    };

    fireEvent.click(screen.getByText('Test Section'));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_SECTION_DATA',
      payload: {
        data: [{ id: 'test-content', content: 'Test Content' }],
        actionType: 'REPLACE_CONTENT',
        linkId: 'test-link-id',
      },
    });
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
