import { Provider } from 'react-redux';
import store from '../../../../store/store';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import DigitalizeCard from '../DigitalizeCard';

const sectionRef = [
  {
    current: 'Current',
  },
];

describe('DigitizeCard', () => {
  test('Header Close', () => {
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
