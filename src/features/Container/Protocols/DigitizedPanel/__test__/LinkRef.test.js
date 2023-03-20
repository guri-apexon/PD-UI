import React from 'react';
import { render } from '../../../../../test-utils/test-utils';
import LinkRef from '../LinkRef';

describe('LinkRef', () => {
  test('renders link with correct href', () => {
    const content = 'https://www.example.com';
    const { getByText } = render(<LinkRef content={content} />);
    const link = getByText(content);
    expect(link.getAttribute('href')).toBe(content);
  });

  test('renders link text', () => {
    const content = 'https://www.example.com';
    const { getByText } = render(<LinkRef content={content} />);
    const link = getByText(content);
    expect(link).toBeInTheDocument();
  });
});
