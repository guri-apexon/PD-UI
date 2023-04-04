import { render, fireEvent, screen } from '@testing-library/react';
import { QC_CHANGE_TYPE } from '../../../../../../../../AppConstant/AppConstant';
import EditFootNote from '../EditFootNote';

const sampleFootNoteData = [
  {
    footnote_line_id: '123',
    footnote_indicator: '',
    footnote_text: 'Sample 1',
    previous_sequnce_index: null,
    qc_change_type_footnote: QC_CHANGE_TYPE.UPDATED,
  },
  {
    footnote_line_id: '456',
    footnote_indicator: '',
    footnote_text: 'Sample 2',
    previous_sequnce_index: null,
    qc_change_type_footnote: QC_CHANGE_TYPE.UPDATED,
  },
  {
    footnote_line_id: 'null',
    footnote_indicator: '',
    footnote_text: 'Sample 1',
    previous_sequnce_index: null,
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
        item={{ footnote_line_id: '123' }}
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
    screen.debug();
    expect(queryByText(content)).not.toBeInTheDocument();
    expect(getByText(newContent)).toBeInTheDocument();

    // const result = [...sampleFootNoteData];
    expect(setFootnoteData).toHaveBeenCalled();
  });

  it('deletes the item and updates setFootnoteData if text is empty on blur', () => {
    const newContent = 'Hi, there!';
    const { getByText, getByTestId } = render(
      <EditFootNote
        item={{ footnote_line_id: '123' }}
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
      footnote_indicator: '',
      footnote_text: '',
      previous_sequnce_index: null,
      qc_change_type_footnote: QC_CHANGE_TYPE.DELETED,
      footnote_line_id: '123',
    };
    expect(setFootnoteData).toHaveBeenCalled();
  });

  it('updates state and setFootnoteData on blur', async () => {
    const newContent = 'Hi, there!';
    const { getByText, queryByText } = render(
      <EditFootNote
        item={{ footnote_line_id: null }}
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
