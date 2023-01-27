import { render } from '@testing-library/react';
import { TextHeader2, TextElement } from '../CustomComponents/MenuItems';

describe('TextHeader2', () => {
  test('renders the correct text', () => {
    const { getByText } = render(<TextHeader2 />);
    expect(getByText('Header')).toBeInTheDocument();
  });

  test('has the correct class', () => {
    const { container } = render(<TextHeader2 />);
    expect(container.firstChild).toHaveClass('add-element');
  });
});

describe('TextElement', () => {
  test('renders the correct text', () => {
    const { getByText } = render(<TextElement />);
    expect(getByText('Text')).toBeInTheDocument();
  });

  test('has the correct class', () => {
    const { container } = render(<TextElement />);
    expect(container.firstChild).toHaveClass('add-element');
  });
});
