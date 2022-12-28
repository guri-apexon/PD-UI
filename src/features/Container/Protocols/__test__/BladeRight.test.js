import { useState } from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import BladeRight from '../BladeRight/BladeRight';

function Testing() {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  return <BladeRight value={(open, expand)} setValue={(setOpen, setExpand)} />;
}

describe.only('RightBlade should Opne when Click', () => {
  test('Open RightBlade', () => {
    const { container } = render(<Testing />);
    screen.debug(undefined, Infinity);

    fireEvent.click(
      container.getElementsByClassName('Blade-expandPanelButton-309'),
    );
    screen.debug(undefined, Infinity);
  });
});

test('Should have Preferred Term', async () => {
  const { getByTestId } = render(<BladeRight />);
  const cardHeader = getByTestId('Term-value');
  expect(cardHeader).toHaveTextContent('Digitization Error');
});
test('Should have Home', async () => {
  const { getByTestId } = render(<BladeRight />);
  const cardHeader = getByTestId('Home-value');
  expect(cardHeader).toHaveTextContent('Digitization Error');
});
test('Should have Home', async () => {
  const { getByTestId } = render(<BladeRight />);
  const cardHeader = getByTestId('Medical Terms-value');
  expect(cardHeader).toHaveTextContent('Digitization Error');
});
test('Should have Home', async () => {
  const { getByTestId } = render(<BladeRight />);
  const cardHeader = getByTestId('Dipa View-value');
  expect(cardHeader).toHaveTextContent('Digitization Error');
});
test('Should have Home', async () => {
  const { getByTestId } = render(<BladeRight />);
  const cardHeader = getByTestId('Normalized Soa-value');
  expect(cardHeader).toHaveTextContent('Digitization Error');
});
test('Should have Home', async () => {
  const { getByTestId } = render(<BladeRight />);
  const cardHeader = getByTestId('Meta Data-value');
  expect(cardHeader).toHaveTextContent('Digitization Error');
});
