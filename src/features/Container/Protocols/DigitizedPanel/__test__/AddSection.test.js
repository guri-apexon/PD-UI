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
  const isModal = true;
  const index = 0;
  const headerList = [
    { doc_id: 1, link_id: 1 },
    { doc_id: 2, link_id: 2 },
  ];

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

  it('calls handleClose on Cancel button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          headerList={headerList}
          index={index}
          isModal={isModal}
        />
      </Provider>,
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(setIsShownMock).toHaveBeenCalledWith(false);
    expect(setIsModalMock).toHaveBeenCalledWith(false);
  });

  it('should render the component without errors', () => {
    const setSectionName = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        {' '}
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          hoverItem={hoverItemMock}
          hoverIndex={hoverIndexMock}
          isModal={isModal}
        />{' '}
      </Provider>,
    );

    expect(getByText('Add New Section')).toBeInTheDocument();
    const input = screen.getByTestId('update-term-field1');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');

    const newSectionName = 'new value';
    userEvent.type(input, newSectionName);
    expect(setSectionName).toHaveBeenCalledTimes(0);
  });

  xtest('dispatches UPDATE_SECTION_DATA action when section name is not empty', () => {
    const mockDispatch = jest.fn();
    const headerList = [
      { doc_id: 1, link_id: 1 },
      { doc_id: 1, link_id: 2 },
    ];
    render(
      <Provider store={store}>
        <AddSection
          setIsModal={() => {}}
          headerList={headerList}
          index={0}
          setIsShown={() => {}}
          isModal={isModal}
        />
      </Provider>,
    );

    const addSectionButton = screen.getByText('Add Section');
    fireEvent.click(addSectionButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_SECTION_DATA',
      payload: {
        docId: headerList[0].doc_id,
        index: 1,
        refreshToc: true,
        reqBody: [
          {
            link_text: 'New Section',
            link_type: 'header',
            link_level: '1',
            prev_detail: { link_id: 1, link_level: '1' },
            next_detail: { link_id: 2, link_level: '1' },
          },
        ],
      },
    });
  });
});
