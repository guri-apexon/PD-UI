import { render, fireEvent } from '../../../../test-utils/test-utils';
import DigitalizeCard from '../DigitizedPanel/DigitalizeCard';
import { headersList, summary } from './data';

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
const rightValue = 'Home';

describe('DigitizeCard', () => {
  test('Header Close', () => {
    const screen = render(
      <DigitalizeCard
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123 }}
        paginationPage={2}
        rightValue="Home"
      />,
      {
        initialState,
        rightValue,
      },
    );
    const HeaderClose = screen.getByTestId('protocol-column-wrapper');
    expect(HeaderClose).toBeInTheDocument();
    fireEvent.click(HeaderClose);
  });
});
