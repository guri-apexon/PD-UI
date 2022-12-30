import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultilineEdit from '../Digitized_edit';

const apples = 'apples';
const oranges = 'oranges';

const sample = {
  blocks: [
    {
      key: '50d3j',
      text: 'This is an Example',
      type: 'RightAlignedBlock',
      depth: 0,
      inlineStyleRanges: [
        { offset: 0, length: 18, style: 'fontFamily-Arial Black' },
      ],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

describe('Digitize Edit', () => {
  test('should render the component', () => {
    const component = render(<MultilineEdit data={sample} />);
    const richTextEditor = component.getByTestId('richTextEditor');

    expect(component).toBeTruthy();

    expect(richTextEditor).toBeInTheDocument();
  });
});
