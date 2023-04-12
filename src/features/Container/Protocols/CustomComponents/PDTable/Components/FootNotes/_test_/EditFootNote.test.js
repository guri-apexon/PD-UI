import { render, fireEvent } from '@testing-library/react';
import { QC_CHANGE_TYPE } from '../../../../../../../../AppConstant/AppConstant';
import EditFootNote from '../EditFootNote';

const sampleFootNoteData = [
  {
    AttachmentId: '123',
    Text: 'Sample 1',
    qc_change_type_footnote: QC_CHANGE_TYPE.UPDATED,
  },
  {
    AttachmentId: '456',
    Text: 'Sample 2',
    qc_change_type_footnote: QC_CHANGE_TYPE.UPDATED,
  },
  {
    AttachmentId: 'null',
    Text: 'Sample 1',
    qc_change_type_footnote: QC_CHANGE_TYPE.ADDED,
  },
];

const setFootnoteData = jest.fn();
const content = 'Hello, Text!';

describe('EditFootNote', () => {
  it('Add new footnote and setFootnoteData on blur', async () => {
    const newContent = 'Hi, there!';
    const { getByText, queryByText, getByTestId } = render(
      <EditFootNote
        item={{ AttachmentId: '123' }}
        index={3}
        content={content}
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={setFootnoteData}
      />,
    );
    const contentNode = getByText(content);
    fireEvent.click(contentNode);
    const contentEditable = getByTestId('content-editable');
    contentEditable.focus();
    await fireEvent.input(contentEditable, {
      target: { innerHTML: newContent },
    });
    contentEditable.blur();
    expect(queryByText(content)).not.toBeInTheDocument();
    expect(getByText(newContent)).toBeInTheDocument();

    // const result = [...sampleFootNoteData];
    expect(setFootnoteData).toHaveBeenCalled();
  });

  it('deletes the item and updates setFootnoteData if text is empty on blur', () => {
    const newContent = 'Hi, there!';
    const { getByText, getByTestId } = render(
      <EditFootNote
        item={{ AttachmentId: '123' }}
        index={0}
        content={content}
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={setFootnoteData}
      />,
    );
    const contentNode = getByText(content);
    fireEvent.click(contentNode);
    const contentEditable = getByTestId('content-editable');
    contentEditable.focus();
    contentEditable.blur();
    fireEvent.input(contentEditable, {
      target: { innerHTML: newContent },
    });
    contentEditable.blur(contentEditable);

    const result = [...sampleFootNoteData];
    result[0] = {
      Text: '',
      qc_change_type_footnote: QC_CHANGE_TYPE.DELETED,
      AttachmentId: '123',
    };
    expect(setFootnoteData).toHaveBeenCalled();
  });

  it('updates state and setFootnoteData on blur', async () => {
    const newContent = 'Hi, there!';
    const { getByText, queryByText } = render(
      <EditFootNote
        item={{ AttachmentId: null }}
        index={2}
        content={content}
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={setFootnoteData}
        unitTesting
      />,
    );
    const contentNode = getByText(content);
    fireEvent.click(contentNode);
    const contentEditable = contentNode.closest('[contenteditable]');
    await fireEvent.input(contentEditable, {
      target: { innerHTML: newContent },
    });
    fireEvent.blur(contentEditable);

    expect(queryByText(content)).not.toBeInTheDocument();
    expect(getByText(newContent)).toBeInTheDocument();
  });
});
