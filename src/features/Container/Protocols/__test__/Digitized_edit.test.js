import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultilineEdit from '../Digitized_edit';

const apples = 'apples';
const oranges = 'oranges';

function TestComponent() {
  const [value, setValue] = useState(apples);
  return <MultilineEdit value={value} setValue={setValue} />;
}

describe('Inline Edit component', () => {
  test('should save input and lose focus when user presses enter', () => {
    render(<TestComponent />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, `{selectall}${oranges}{enter}`);
    // RTL doesn't properly trigger component's onBlur()
    fireEvent.blur(input);

    expect(input).not.toHaveFocus();
    expect(input).toHaveValue();
  });
  test('should focus when tabbed to', () => {
    render(<TestComponent />);
    const input = screen.getByRole('textbox');

    expect(document.body).toHaveFocus();
    userEvent.tab();

    expect(input).toHaveFocus();
  });
  test('should reset to last-saved value if input is empty', () => {
    render(<TestComponent />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, '{selectall}{space}{enter}');
    fireEvent.blur(input);

    expect(input).toHaveValue();
  });
});
