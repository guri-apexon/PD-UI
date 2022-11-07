import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from "react-floating-button-menu";
import Close from "apollo-react-icons/Close";
import Plus from "apollo-react-icons/Plus";
import { useState } from "react";
import editDocumentICON from "../../../../../../assets/images/writing.png";
import attributesICON from "../../../../../../assets/images/clipboard.png";
import saveICON from "../../../../../../assets/images/diskette_black.png";
// import documentICON from "../../../../../../assets/images/document.png";
// import IconButton from "apollo-react/components/IconButton";
import Tooltip from "apollo-react/components/Tooltip";

const FloatingButton = ({ onChildClick, showAttributes, edit }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <FloatingMenu
      slideSpeed={500}
      direction={Directions.Left}
      spacing={8}
      isOpen={isOpen}
    >
      <MainButton
        iconResting={<Plus style={{ fontSize: 20 }} />}
        iconActive={<Close style={{ fontSize: 20 }} />}
        backgroundColor="black"
        onClick={() => setOpen(!isOpen)}
        size={50}
        direction="left"
      />
      <ChildButton
        icon={
          <Tooltip
            variant="dark"
            title={"Edit Content"}
            placement="top"
            style={{ marginRight: 48 }}
          >
            <img src={editDocumentICON} alt="EDIT" style={{ height: 20 }} />
          </Tooltip>
        }
        backgroundColor="white"
        size={40}
        onClick={() => onChildClick("edit")}
      />
      <ChildButton
        icon={
          <Tooltip
            variant="dark"
            title={"Atrribute View"}
            placement="top"
            style={{ marginRight: 48 }}
          >
            {/* <img src={attributesICON} alt="Attributes" style={{ height: 20 }} /> */}
            <img src={attributesICON} alt="EDIT" style={{ height: 20 }} />
          </Tooltip>
        }
        backgroundColor="white"
        size={40}
        onClick={() => onChildClick("attributes")}
      />
      <ChildButton
        icon={
          <Tooltip
            variant="dark"
            title={"Save Content"}
            placement="top"
            style={{ marginRight: 48 }}
          >
            <img src={saveICON} alt="EDIT" style={{ height: 20 }} />
          </Tooltip>
        }
        backgroundColor="white"
        size={40}
        onClick={() => onChildClick("save")}
      />
    </FloatingMenu>
  );
};

export default FloatingButton;
