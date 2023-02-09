// import { render, fireEvent, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { useState } from 'react';
// import EditFootNote from '../EditFootNote';

// const sampleFootNoteData = [
//   { Text: 'Sample 1', AttachmentId: '123', qc_change_type_footnote: 'add' },
//   { Text: 'Sample 2', AttachmentId: '456', qc_change_type_footnote: 'modify' },
// ];

// const SendFootnoteData = jest.fn();
// const content = 'Hello, Text!';

// describe('EditFootNote', () => {
//   // it('renders correctly', () => {
//   //   const { getByTestId } = render(
//   //     <EditFootNote
//   //       item={{ AttachmentId: '123' }}
//   //       index={0}
//   //       content="Sample 1"
//   //       edit
//   //       footNoteData={sampleFootNoteData}
//   //       setFootnoteData={SendFootnoteData}
//   //     />,
//   //   );

//   //   expect(getByTestId('content-edit')).toHaveTextContent('Sample 1');
//   // });

//   it('updates state and setFootnoteData on blur', async () => {
//     const newContent = 'Hi, there!';
//     const { getByText, getByRole, getByTestId } = render(
//       <EditFootNote
//         item={{ AttachmentId: '123' }}
//         index={0}
//         content={content}
//         edit
//         footNoteData={sampleFootNoteData}
//         setFootnoteData={SendFootnoteData}
//         unitTesting
//       />,
//     );
//     const contentNode = getByText(content);
//     fireEvent.click(contentNode);
//     const contentEditable = contentNode.closest('[contenteditable]');
//     // fireEvent.focus(contentEditable);
//     await fireEvent.input(contentEditable, {
//       target: { innerHTML: newContent },
//     });
//     // fireEvent.blur(contentEditable);

//     // expect(queryByText(text)).not.toBeInTheDocument();
//     // expect(getByText(updatedText)).toBeInTheDocument();

//     // const contentEditable = getByTestId('content-editable');
//     // await userEvent.click(contentEditable);
//     // await fireEvent.change(contentEditable, {
//     //   target: { innerHTML: newContent },
//     // });
//     // await userEvent.type(contentEditable.querySelector('input'), 'new_label');
//     // await screen.debug();
//     // await userEvent.keyboard('abc');
//     // fireEvent.click(contentEditable);
//     // userEvent.type(
//     //   screen.getAllByTestId('suggestion-field')[0].querySelector('input'),
//     //   'new_label',
//     // );

//     // fireEvent.change(contentEditable, { target: { value: 'Updated Text' } });
//     // fireEvent.blur(contentEditable);

//     // expect(SendFootnoteData).toHaveBeenCalledWith([
//     //   {
//     //     Text: 'Updated Text',
//     //     AttachmentId: '123',
//     //     qc_change_type_footnote: 'modify',
//     //   },
//     //   {
//     //     Text: 'Sample 2',
//     //     AttachmentId: '456',
//     //     qc_change_type_footnote: 'modify',
//     //   },
//     // ]);
//   });

//   // it('deletes the item and updates setFootnoteData if text is empty on blur', () => {
//   //   const { getByTestId } = render(
//   //     <EditFootNote
//   //       item={{ AttachmentId: '123' }}
//   //       index={0}
//   //       content="Sample 1"
//   //       edit
//   //       footNoteData={sampleFootNoteData}
//   //       setFootnoteData={SendFootnoteData}
//   //     />,
//   //   );

//   //   const contentEditable = getByTestId('content-edit');

//   //   fireEvent.change(contentEditable, { target: { value: '' } });
//   //   fireEvent.blur(contentEditable);

//   //   expect(SendFootnoteData).toHaveBeenCalledWith([
//   //     {
//   //       Text: 'Sample 2',
//   //       AttachmentId: '456',
//   //       qc_change_type_footnote: 'modify',
//   //     },
//   //   ]);
//   // });
// });
