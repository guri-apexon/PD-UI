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

describe('DigitizeCard', () => {
  test('Header Close', () => {
    const screen = render(
      <DigitalizeCard
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123 }}
        paginationPage={2}
      />,
      {
        initialState,
      },
    );
    const HeaderClose = screen.getByTestId('protocol-column-wrapper');
    expect(HeaderClose).toBeInTheDocument();
    fireEvent.click(HeaderClose);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  // test('check pagination page useeffect', () => {
  //   const screen = render(
  //     <Provider store={store}>
  //       <DigitalizeCard
  //         sectionNumber={1}
  //         sectionRef={sectionRef}
  //         data={{ id: 123 }}
  //         paginationPage={1}
  //       />
  //     </Provider>,
  //   );
  // });
});
