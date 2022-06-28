import Table from "apollo-react-icons/Table";
import TextStyle from "apollo-react-icons/TextStyle";
import HeaderImg from "../../../../../../assets/images/heading.png";
import Image from "apollo-react-icons/Image";

export const TableElement = () => {
  return (
    <div className="add-element">
      <div className="icon-container">
        <Table fontSize="extraSmall" />
      </div>
      <span>Table</span>
    </div>
  );
};
export const TextHeader2 = () => {
  return (
    <div className="add-element">
      <div className="icon-container">
        <img src={HeaderImg} alt="Header" style={{ height: 15 }} />
      </div>
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
      <div className="icon-container">
        <TextStyle fontSize="extraSmall" />
      </div>
      <span>Text</span>
    </div>
  );
};
export const ImageElement = () => {
  return (
    <div className="add-element">
      <div className="icon-container">
        <Image fontSize="extraSmall" />
      </div>
      <span>Image</span>
    </div>
  );
};
