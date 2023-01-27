import Table from 'apollo-react-icons/Table';
import TextStyle from 'apollo-react-icons/TextStyle';
import Paragraph from 'apollo-react-icons/Paragraph';

export function TextHeader2() {
  return (
    <div className="add-element">
      <Paragraph fontSize="extraSmall" />
      <span>Header</span>
    </div>
  );
}

export function TextElement() {
  return (
    <div className="add-element">
      <TextStyle fontSize="extraSmall" />
      <span>Text</span>
    </div>
  );
}
// export function ImageElement() {
//   return (
//     <div className="add-element">
//       <span>Image</span>
//     </div>
//   );
// }

export function TableElement() {
  return (
    <div className="add-element">
      <Table fontSize="extraSmall" />
      <span>Table</span>
    </div>
  );
}
