import Table from "apollo-react-icons/Table";
import TextStyle from "apollo-react-icons/TextStyle";
import TextBold from "apollo-react-icons/TextBold";
import Image from "apollo-react-icons/Image";

export const TableElement = () => {
  return (
    <div className="add-element">
      <Table fontSize="extraSmall" />
      <span>Table</span>
    </div>
  );
};
export const TextHeader2 = () => {
  return (
    <div className="add-element">
      <TextBold fontSize="extraSmall" />
      <span>Header</span>
    </div>
  );
};
// const TextHeader3 = () => {
//   return (
//     <div className="add-element">
//       <TextBold fontSize="extraSmall" />
//       <span>Header 3</span>
//     </div>
//   );
// };
export const TextElement = () => {
  return (
    <div className="add-element">
      <TextStyle fontSize="extraSmall" />
      <span>Text</span>
    </div>
  );
};
export const ImageElement = () => {
  return (
    <div className="add-element">
      <Image fontSize="extraSmall" />
      <span>Image</span>
    </div>
  );
};
