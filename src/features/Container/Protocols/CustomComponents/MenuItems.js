import Table from 'apollo-react-icons/Table';
import TextStyle from 'apollo-react-icons/TextStyle';
import Paragraph from 'apollo-react-icons/Paragraph';
import Image from 'apollo-react-icons/Image';

export function TextHeader2() {
  return (
    <div className="add-element" data-testId="header">
      <Paragraph fontSize="extraSmall" />
      <span>Header</span>
    </div>
  );
}

export function TextElement() {
  return (
    <div className="add-element" data-testId="text">
      <TextStyle fontSize="extraSmall" />
      <span>Text</span>
    </div>
  );
}
export function ImageElement() {
  return (
    <div className="add-element" data-testId="image">
      <Image fontSize="extraSmall" />
      <span>Image</span>
    </div>
  );
}

export function TableElement() {
  return (
    <div className="add-element" data-testId="table">
      <Table fontSize="extraSmall" />
      <span>Table</span>
    </div>
  );
}
