import { Provider } from 'react-redux';
import { render, screen } from '../../../../test-utils/test-utils';
import store from '../../../../store/store';
import ProtocolView from '../ProtocolView';
import { summary } from './data';

// eslint-disable-next-line
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
  let props;

  beforeEach(() => {
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
});
