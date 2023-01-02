import { render } from '@testing-library/react';
import MultilineEdit from '../Digitized_edit';

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
