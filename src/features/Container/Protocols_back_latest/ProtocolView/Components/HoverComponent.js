import Tooltip from "apollo-react/components/Tooltip";
import IconMenuButton from "apollo-react/components/IconMenuButton";
import Plus from "apollo-react-icons/Plus";

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
          id={"actions-elements" + line_id}
          menuItems={menuItems}
        >
          <Plus className="plus-icon" size="small" />
        </IconMenuButton>
      </Tooltip>
    </div>
  );
}

export default HoverComponent;
