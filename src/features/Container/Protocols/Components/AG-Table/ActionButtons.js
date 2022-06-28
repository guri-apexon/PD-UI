import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from "react-floating-button-menu";
// import Close from "apollo-react-icons/Close";
// import Plus from "apollo-react-icons/Plus";
import EllipsisVertical from "apollo-react-icons/EllipsisVertical";
import { useState } from "react";
import rowDeleteIcon from "../../../../../assets/images/row-delete-white.png";
import deleteICON from "../../../../../assets/images/bin-white.png";
import saveICON from "../../../../../assets/images/save-white.png";
// import documentICON from "../../../../../../assets/images/document.png";
// import IconButton from "apollo-react/components/IconButton";
import Tooltip from "apollo-react/components/Tooltip";

const ActionButton = ({ onChildClick, showAttributes, edit }) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <FloatingMenu
      slideSpeed={500}
      direction={Directions.Left}
      spacing={8}
      isOpen={isOpen}
    >
      <MainButton
        iconResting={
          <EllipsisVertical style={{ fontSize: 20 }} nativeColor="white" />
        }
        iconActive={
          <EllipsisVertical style={{ fontSize: 20 }} nativeColor="white" />
        }
        backgroundColor="black"
        onClick={() => setOpen(!isOpen)}
        size={50}
        direction="left"
      />
      <ChildButton
        className="li-1"
        icon={
          <Tooltip
            variant="dark"
            title={"Save Changes"}
            placement="top"
            style={{ marginRight: 48 }}
          >
            <img src={saveICON} alt="EDIT" style={{ height: 15 }} />
          </Tooltip>
        }
        size={30}
        onClick={() => onChildClick("save")}
      />
      <ChildButton
        className="li-2"
        icon={
          <Tooltip
            variant="dark"
            title={"Delete Selected Row"}
            placement="top"
            style={{ marginRight: 48 }}
          >
            {/* <img src={attributesICON} alt="Attributes" style={{ height: 20 }} /> */}
            <img src={rowDeleteIcon} alt="EDIT" style={{ height: 15 }} />
          </Tooltip>
        }
        size={30}
        onClick={() => onChildClick("delete-row")}
      />
      <ChildButton
        icon={
          <Tooltip
            variant="dark"
            title={"Delete Table"}
            placement="top"
            style={{ marginRight: 48 }}
          >
            <img src={deleteICON} alt="EDIT" style={{ height: 15 }} />
          </Tooltip>
        }
        className="li-3"
        size={30}
        onClick={() => onChildClick("delete-table")}
      />
    </FloatingMenu>
  );
};

export default ActionButton;
