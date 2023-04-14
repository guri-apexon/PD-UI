import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../../store/store';
import AddSection from '../AddSection';

describe('AddSection', () => {
  const setIsModalMock = jest.fn();
  const setIsShownMock = jest.fn();
  const hoverItemMock = { doc_id: '123' };
  const hoverIndexMock = 0;
  const isModal = true;

  it('should call setIsModal and setIsShown when the "Add Section" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          hoverItem={hoverItemMock}
          hoverIndex={hoverIndexMock}
          isModal={isModal}
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
          isModal={isModal}
        />
      </Provider>,
    );
    const input = screen.getByTestId('update-term-field1');
    fireEvent.change(input, { target: { value: 'newValue' } });
    const addButton = getByText('Cancel');
    fireEvent.click(addButton);
  });
});
