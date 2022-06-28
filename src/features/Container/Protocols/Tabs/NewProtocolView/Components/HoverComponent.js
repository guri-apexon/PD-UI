import Tooltip from "apollo-react/components/Tooltip";
import IconMenuButton from "apollo-react/components/IconMenuButton";
import Plus from "apollo-react-icons/Plus";
import { v4 as uuidv4 } from "uuid";

function HoverComponent({ line_id, hoverIndex, menuItems }) {
  return (
    <div
      // className="no-option"
      className={line_id === hoverIndex ? "show-option" : "no-option"}
    >
      <Tooltip
        className="tooltip-add-element"
        title="Actions"
        disableFocusListener
      >
        <IconMenuButton
          className="icon-buttons"
          id={"actions-elements" + uuidv4()}
          menuItems={menuItems}
        >
          <Plus className="plus-icon" size="small" />
        </IconMenuButton>
      </Tooltip>
    </div>
  );
}

export default HoverComponent;
