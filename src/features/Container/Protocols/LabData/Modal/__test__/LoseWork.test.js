import { fireEvent } from '@testing-library/react';
import { render } from '../../../../../../test-utils/test-utils';
import LoseWork from '../LoseWork';

describe('Delete Row Modal', () => {
  test('should render to delete row', () => {
    const screen = render(<LoseWork unSaved setUnSaved={jest.fn()} />);

    expect(screen.getByTestId('losework-row-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Keep editing'));
    fireEvent.click(screen.getByText('Leave without saving'));
  });
});
