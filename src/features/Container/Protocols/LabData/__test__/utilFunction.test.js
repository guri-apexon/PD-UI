import { render } from '../../../../../test-utils/test-utils';
import TextFieldFilter from '../utilFunction';

describe('TextFieldFilter', () => {
  const accessor = 'someAccessor';
  const filters = {
    [accessor]: 'initialValue',
  };
  const updateFilterValue = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a text field with the correct value and name', () => {
    const { getByTestId } = render(
      <TextFieldFilter
        accessor={accessor}
        filters={filters}
        updateFilterValue={updateFilterValue}
      />,
    );
    const textField = getByTestId('update-lab-data');

    expect(textField).toHaveAttribute('name', accessor);
    expect(textField).toHaveValue(filters[accessor]);
  });
});
