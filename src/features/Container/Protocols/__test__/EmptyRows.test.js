import { render, fireEvent } from '@testing-library/react';
import EmptyRowCells from '../CustomComponents/PDTable/Components/EmptyRows';

describe('EmptyRowCells component', () => {
  it('renders correctly and calls handleOperation on icon click', () => {
    const handleOperation = jest.fn();
    const { getByTestId } = render(
      <EmptyRowCells
        rowIndex={1}
        handleOperation={handleOperation}
        index={0}
      />,
    );
    const icon = getByTestId('more-icon');
    fireEvent.click(icon);
    const tableOperation = getByTestId('Table Operation');
    fireEvent.click(tableOperation);
    const metaicon =
      getByTestId('Table Operation').getElementsByClassName('pd-more-icon')[0];
    fireEvent.click(metaicon);
  });
});
