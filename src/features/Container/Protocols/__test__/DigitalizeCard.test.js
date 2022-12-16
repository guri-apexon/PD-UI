import { render, fireEvent } from '../../../../test-utils/test-utils';
import DigitalizeCard from '../DigitalizeCard';

// test block

//

test('Header Close', () => {
  const screen = render(<DigitalizeCard />);
  const HeaderClose = screen.getByTestId('Panels');
  expect(HeaderClose).toBeInTheDocument();
  fireEvent.click(HeaderClose);
});
