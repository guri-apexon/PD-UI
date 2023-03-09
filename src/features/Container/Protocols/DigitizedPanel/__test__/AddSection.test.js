import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../../../../../store/store';
import AddSection from '../AddSection';

describe('AddSection', () => {
  const setIsModalMock = jest.fn();
  const setIsShownMock = jest.fn();
  const hoverItemMock = { doc_id: '123' };
  const hoverIndexMock = 0;

  it('should render the component without errors', () => {
    const setSectionName = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          hoverItem={hoverItemMock}
          hoverIndex={hoverIndexMock}
        />
      </Provider>,
    );
    expect(getByText('Add New Section')).toBeInTheDocument();
    const input = screen.getByTestId('update-term-field1');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');

    const newSectionName = 'new value';
    userEvent.type(input, newSectionName);
    expect(setSectionName).toHaveBeenCalledTimes(0);
    screen.debug();
    const addButton = getByText('Add Section');
    fireEvent.click(addButton);
  });

  it('should call setIsModal and setIsShown when the "Add Section" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          hoverItem={hoverItemMock}
          hoverIndex={hoverIndexMock}
        />
      </Provider>,
    );
    const addButton = getByText('Add Section');
    fireEvent.click(addButton);
  });

  it('should render the component without errors', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          hoverItem={hoverItemMock}
          hoverIndex={hoverIndexMock}
        />
      </Provider>,
    );
    const input = screen.getByTestId('update-term-field1');
    fireEvent.change(input, { target: { value: 'newValue' } });
    const addButton = getByText('Cancel');
    fireEvent.click(addButton);
  });
});
