import { render, fireEvent } from '@testing-library/react';
import { QC_CHANGE_TYPE } from '../../../../../../../../AppConstant/AppConstant';
import FootNotes from '../Footnotes';

const footNoteData = [
  {
    AttachmentId: '1',
    Text: 'Footnote 1',
    qc_change_type_footnote: '',
  },
  {
    AttachmentId: '2',
    Text: 'Footnote 2',
    qc_change_type_footnote: QC_CHANGE_TYPE.DELETED,
  },
  {
    AttachmentId: '3',
    Text: 'Footnote 3',
    qc_change_type_footnote: '',
  },
];

const setFootnoteData = jest.fn();

describe('FootNotes', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FootNotes
        footNoteData={footNoteData}
        setFootnoteData={setFootnoteData}
        edit
      />,
    );

    expect(getByTestId('footnote')).toBeTruthy();
  });

  it('should set active line ID on click', () => {
    const { getAllByTestId } = render(
      <FootNotes
        footNoteData={footNoteData}
        setFootnoteData={setFootnoteData}
        edit
      />,
    );

    const lineDivs = getAllByTestId('footnote-edit');
    fireEvent.click(lineDivs[0]);
  });
});
