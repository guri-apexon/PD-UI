import { render, cleanup } from '@testing-library/react';
import {
  TextHeader2,
  TextElement,
  ImageElement,
} from '../CustomComponents/MenuItems';

afterEach(cleanup);

describe('TextHeader2 component', () => {
  test('renders header text', () => {
    const { getByText } = render(<TextHeader2 />);
    const header = getByText(/Header/i);
    expect(header).toBeInTheDocument();
  });

  test('has data-testId attribute', () => {
    const { getByTestId } = render(<TextHeader2 />);
    const header = getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});

describe('TextElement component', () => {
  test('renders text element text', () => {
    const { getByText } = render(<TextElement />);
    const text = getByText(/Text/i);
    expect(text).toBeInTheDocument();
  });

  test('has data-testId attribute', () => {
    const { getByTestId } = render(<TextElement />);
    const text = getByTestId('text');
    expect(text).toBeInTheDocument();
  });
});

describe('ImageElement component', () => {
  test('renders image element text', () => {
    const { getByText } = render(<ImageElement />);
    const image = getByText(/Image/i);
    expect(image).toBeInTheDocument();
  });
});
