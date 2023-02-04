import { render } from '@testing-library/react';
import SanitizeHTML from '../../../Components/SanitizeHtml';

describe('SantizeHtml', () => {
  test('renders with provided html and options', () => {
    const html = '<p>Test html</p>';
    const options = { ALLOWED_TAGS: ['p'] };
    const { getByText } = render(
      <SanitizeHTML html={html} options={options} />,
    );
    expect(getByText('Test html')).toBeInTheDocument();
  });
  test('renders with only allowed attributes', () => {
    const html = "<p style='color: red'>Test html</p>";
    const options = { ALLOWED_ATTR: [] };
    const { getByText } = render(
      <SanitizeHTML html={html} options={options} />,
    );
    expect(getByText('Test html').getAttribute('style')).toBe(null);
  });
  test('throws an error when required props are not provided', () => {
    expect(() => {
      render(<SanitizeHTML />);
    }).toThrowError();
  });
});
