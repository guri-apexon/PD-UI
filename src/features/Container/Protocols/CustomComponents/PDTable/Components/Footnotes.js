// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import ContentEdit from "../../../Tabs/NewProtocolView/Components/ContentEdit";

// const FootNotes = ({ data, edit, onChange }) => {
//   const [activeLineID, setActiveLineID] = useState("");

//   const handleContentEdit = (editedText, key, index) => {
//     onChange(editedText, index);
//   };
//   //   const getFootnoteArray = (content) => {
//   //     const arr = [];
//   //     for (const [key, value] of Object.entries(content)) {
//   //       const reg = /FootnoteText/i;
//   //       let result = reg.test(key);
//   //       if (result) {
//   //         arr.push({
//   //           key,
//   //           value,
//   //         });
//   //       }
//   //     }
//   //     return arr;
//   //   };
//   const setActiveFootnoteId = (id) => {
//     setActiveLineID(id);
//   };
//   return (
//     <div>
//       {edit && data.length > 0 && <h4>FootNotes: </h4>}
//       {data.map((item, index) => {
//         return (
//           <ContentEdit
//             key={uuidv4()}
//             content={item.Text}
//             edit={edit}
//             lineID={item.AttachmentId}
//             setActiveLineID={setActiveFootnoteId}
//             activeLineID={activeLineID}
//             handleContentEdit={(editedText, key) =>
//               handleContentEdit(editedText, key, index)
//             }
//             className="line-content edit-text-con"
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default FootNotes;
