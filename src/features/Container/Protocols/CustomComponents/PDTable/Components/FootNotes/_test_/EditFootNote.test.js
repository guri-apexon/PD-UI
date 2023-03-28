import { render, fireEvent, screen } from '@testing-library/react';
import { QC_CHANGE_TYPE } from '../../../../../../../../AppConstant/AppConstant';
import EditFootNote from '../EditFootNote';

const sampleFootNoteData = [
  {
    Text: 'Sample 1',
    AttachmentId: '123',
    qc_change_type_footnote: QC_CHANGE_TYPE.UPDATED,
  },
  {
    Text: 'Sample 2',
    AttachmentId: '456',
    qc_change_type_footnote: QC_CHANGE_TYPE.UPDATED,
  },
  {
    Text: 'Sample 1',
    AttachmentId: null,
    qc_change_type_footnote: QC_CHANGE_TYPE.ADDED,
  },
];

const SendFootnoteData = jest.fn();
const content = 'Hello, Text!';

describe('EditFootNote', () => {
  it('Add new footnote and setFootnoteData on blur', async () => {
    const newContent = 'Hi, there!';
    const { getByText, queryByText } = render(
      <EditFootNote
        item={{ AttachmentId: '123' }}
        index={3}
        content={content}
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={SendFootnoteData}
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

    const result = [...sampleFootNoteData];
    expect(SendFootnoteData).toHaveBeenCalledWith(result);
  });

  it('deletes the item and updates setFootnoteData if text is empty on blur', () => {
    const newContent = 'Hi, there!';
    const { getByText } = render(
      <EditFootNote
        item={{ AttachmentId: '123' }}
        index={0}
        content={content}
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={SendFootnoteData}
        unitTesting
      />,
    );
    const contentNode = getByText(content);
    fireEvent.click(contentNode);
    const contentEditable = contentNode.closest('[contenteditable]');
    fireEvent.input(contentEditable, {
      target: { innerHTML: newContent },
    });
    fireEvent.blur(contentEditable);

    const result = [...sampleFootNoteData];
    result[0] = {
      Text: '',
      AttachmentId: '123',
      qc_change_type_footnote: QC_CHANGE_TYPE.DELETED,
    };
    expect(SendFootnoteData).toHaveBeenCalledWith(result);
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
        setFootnoteData={SendFootnoteData}
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
