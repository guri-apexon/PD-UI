import { render, fireEvent } from '@testing-library/react';
import EditFootNote from '../EditFootNote';

const sampleFootNoteData = [
  { Text: 'Sample 1', AttachmentId: '123', qc_change_type_footnote: 'add' },
  { Text: 'Sample 2', AttachmentId: '456', qc_change_type_footnote: 'modify' },
];

const SendFootnoteData = jest.fn();

describe('EditFootNote', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <EditFootNote
        item={{ AttachmentId: '123' }}
        index={0}
        content="Sample 1"
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={SendFootnoteData}
      />,
    );

    expect(getByTestId('content-edit')).toHaveTextContent('Sample 1');
  });

  it('updates state and setFootnoteData on blur', () => {
    const { getByTestId } = render(
      <EditFootNote
        item={{ AttachmentId: '123' }}
        index={0}
        content="Sample 1"
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={SendFootnoteData}
      />,
    );

    const contentEditable = getByTestId('content-edit');

    fireEvent.change(contentEditable, { target: { value: 'Updated Text' } });
    fireEvent.blur(contentEditable);

    expect(SendFootnoteData).toHaveBeenCalledWith([
      {
        Text: 'Updated Text',
        AttachmentId: '123',
        qc_change_type_footnote: 'modify',
      },
      {
        Text: 'Sample 2',
        AttachmentId: '456',
        qc_change_type_footnote: 'modify',
      },
    ]);
  });

  it('deletes the item and updates setFootnoteData if text is empty on blur', () => {
    const { getByTestId } = render(
      <EditFootNote
        item={{ AttachmentId: '123' }}
        index={0}
        content="Sample 1"
        edit
        footNoteData={sampleFootNoteData}
        setFootnoteData={SendFootnoteData}
      />,
    );

    const contentEditable = getByTestId('content-edit');

    fireEvent.change(contentEditable, { target: { value: '' } });
    fireEvent.blur(contentEditable);

    expect(SendFootnoteData).toHaveBeenCalledWith([
      {
        Text: 'Sample 2',
        AttachmentId: '456',
        qc_change_type_footnote: 'modify',
      },
    ]);
  });
});
