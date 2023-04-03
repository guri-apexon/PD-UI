import { fireEvent } from '@testing-library/react';
import { render } from '../../../../../../test-utils/test-utils';
import DeleteRow from '../DeleteRow';

describe('Delete Row Modal', () => {
  test('should render to delete row', () => {
    const screen = render(
      <DeleteRow isOpen={true} setIsOpen={jest.fn()} onDeleteRow={jest.fn()} />,
    );

    expect(screen.getByTestId('delete-row-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    fireEvent.click(screen.getByText('Yes'));
  });
});
