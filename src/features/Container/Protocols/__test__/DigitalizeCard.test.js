import { render } from '../../../../test-utils/test-utils';
import Digitize from '../DigitizedPanel/Digitize';
import { headersList, summary } from './data';
import { PROTOCOL_RIGHT_MENU } from '../Constant/Constants';

const sectionRef = [
  {
    current: {
      scrollIntoView: jest.fn(),
    },
  },
];

const initialState = {
  protocol: {
    header: {
      data: headersList,
      loading: false,
      success: true,
    },
    summary: {
      data: summary,
      loading: false,
      success: true,
    },
    sectionDetails: {
      linkId: headersList[0].link_id,
    },
  },
};
const home = PROTOCOL_RIGHT_MENU.HOME;

describe('DigitizeCard', () => {
  test('Header Close', () => {
    const screen = render(
      <Digitize
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123 }}
        paginationPage={2}
        rightValue={PROTOCOL_RIGHT_MENU.HOME}
      />,
      {
        initialState,
        home,
      },
    );

    const HeaderClose = screen.getByTestId('protocol-column-wrapper');
    expect(HeaderClose).toBeInTheDocument();
  });
});
