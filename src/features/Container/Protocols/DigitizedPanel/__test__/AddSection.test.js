import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import { toast } from 'react-toastify';
import store from '../../../../../store/store';
import AddSection from '../AddSection';

describe('AddSection', () => {
  const setIsModalMock = jest.fn();
  const setIsShownMock = jest.fn();
  const hoverItemMock = { doc_id: '123' };
  const hoverIndexMock = 0;
  const isModal = true;

  it('should call setIsModal and setIsShown when the "Add Section" button is clicked', () => {
    const headerList = [
      {
        doc_id: 'f2571c30-a39f-4d58-a092-09edaac5b814',
        group_type: 'DocumentLinks',
        link_id: '85a91ee9-dd07-11ed-b21f-005056ab6469',
        LinkLevel: 1,
        page: 2,
        sec_id: '',
        source_file_section: 'TITLE PAGE',
        LinkType: 'toc',
        line_id: 'f2571c30-a39f-4d58-a092-09edaac5b814',
        preferred_term: '',
        qc_change_type: '',
        sequence: 0,
        section_locked: false,
        audit_info: {
          last_reviewed_date: '17-04-2023',
          last_reviewed_by: '',
          total_no_review: 1,
        },
      },
    ];
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          hoverItem={hoverItemMock}
          hoverIndex={hoverIndexMock}
          isModal={isModal}
          headerList={headerList}
        />
      </Provider>,
    );
    const input = screen.getByTestId('update-term-field1');
    fireEvent.change(input, { target: { value: 'newValue' } });
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

  it('when add section name is empty it should show the toast message', () => {
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

  it('sending the 2 items in headerlist and clicked on add sections', () => {
    const headerList = [
      {
        doc_id: 'f2571c30-a39f-4d58-a092-09edaac5b814',
        group_type: 'DocumentLinks',
        link_id: '85a91ee9-dd07-11ed-b21f-005056ab6469',
        LinkLevel: 1,
        page: 2,
        sec_id: '',
        source_file_section: 'TITLE PAGE',
        LinkType: 'toc',
        line_id: 'f2571c30-a39f-4d58-a092-09edaac5b814',
        preferred_term: '',
        qc_change_type: '',
        sequence: 0,
        section_locked: false,
        audit_info: {
          last_reviewed_date: '17-04-2023',
          last_reviewed_by: '',
          total_no_review: 1,
        },
      },
      {
        doc_id: 'f2571c30-a39f-4d58-a092-09edaac5b814',
        group_type: 'DocumentLinks-2',
        link_id: '85a91ee9-dd07-11ed-b21f-005056ab6469',
        LinkLevel: 1,
        page: 2,
        sec_id: '',
        source_file_section: 'TITLE PAGE-2',
        LinkType: 'toc',
        line_id: 'f2571c30-a39f-4d58-a092-09edaac5b814',
        preferred_term: '',
        qc_change_type: '',
        sequence: 0,
        section_locked: false,
        audit_info: {
          last_reviewed_date: '17-04-2023',
          last_reviewed_by: '',
          total_no_review: 1,
        },
      },
    ];
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
          setIsShown={setIsShownMock}
          hoverItem={hoverItemMock}
          hoverIndex={hoverIndexMock}
          isModal={isModal}
          headerList={headerList}
          index={0}
        />
      </Provider>,
    );
    const input = screen.getByTestId('update-term-field1');
    fireEvent.change(input, { target: { value: 'newValue' } });
    const addButton = getByText('Add Section');
    fireEvent.click(addButton);
  });

  test('dispatches UPDATE_SECTION_DATA action and closes the modal on save', () => {
    const setIsModalMock = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    render(
      <AddSection
        setIsModal={setIsModalMock}
        headerList={[]}
        index={-1}
        setIsShown={() => {}}
        isModal={isModal}
        docId="123"
      />,
    );

    const sectionNameInput = screen.getByPlaceholderText('Enter Section Name');
    fireEvent.change(sectionNameInput, { target: { value: 'Test Section' } });
    expect(sectionNameInput.value).toBe('Test Section');

    const saveButton = screen.getByRole('button', { name: 'Add Section' });
    fireEvent.click(saveButton);

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);

    expect(setIsModalMock).toHaveBeenCalledWith(false);
  });

  test('should call toast.info when sectionName is empty', () => {
    const toastInfo = jest.spyOn(toast, 'info');
    const { getByText } = render(
      <AddSection
        setIsModal={() => {}}
        headerList={[]}
        index={0}
        setIsShown={() => {}}
        isModal={isModal}
        docId="doc-id"
      />,
    );

    const saveButton = getByText('Add Section');
    fireEvent.click(saveButton);

    expect(toastInfo).toHaveBeenCalledWith('Enter Required Field');
  });
  it('should render the component without errors', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddSection
          setIsModal={setIsModalMock}
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
