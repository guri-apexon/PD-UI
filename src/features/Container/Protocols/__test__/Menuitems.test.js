import { render, cleanup } from '@testing-library/react';
import {
  TextHeader2,
  TextElement,
  TableElement,
} from '../CustomComponents/MenuItems';

afterEach(cleanup);

describe('TextHeader2 component', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<TextHeader2 />);
    const header = getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});

describe('TextElement component', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<TextElement />);
    const text = getByTestId('text');
    expect(text).toBeInTheDocument();
  });
});

describe('TableElement component', () => {
  it('renders the component', () => {
    const { getByText } = render(<TableElement />);
    const table = getByText('Table');
    expect(table).toBeInTheDocument();
  });
});
