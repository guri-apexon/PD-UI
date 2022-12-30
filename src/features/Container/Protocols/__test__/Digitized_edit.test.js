import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultilineEdit from '../Digitized_edit';

const apples = 'apples';
const oranges = 'oranges';

const sample = [
  {
    content: 'This is an Example',
  },
];

describe('Digitize Edit', () => {
  test('should render the component', () => {
    const component = render(<MultilineEdit data={sample} />);
    const richTextEditor = component.getByTestId('richTextEditor');

    expect(component).toBeTruthy();

    expect(richTextEditor).toBeInTheDocument();
  });
});
