// import EllipsisVertical from "apollo-react-icons/EllipsisVertical";
import IconMenuButton from "apollo-react/components/IconMenuButton";
import Tooltip from "apollo-react/components/Tooltip";
import Plus from "apollo-react-icons/Plus";
import Minus from "apollo-react-icons/Minus";

export const AddMenu = ({ onClick }) => {
  const handleClick = (label) => () => {
    onClick(label);
  };

  const menuItems = [
    {
      text: "Add Row",
      onClick: handleClick("add-row"),
    },
    {
      text: "Add Column",
      onClick: handleClick("add-column"),
    },
  ];

  return (
    <Tooltip title="Actions" disableFocusListener>
      <IconMenuButton id="actions" menuItems={menuItems} className="add-button">
        <Plus />
      </IconMenuButton>
    </Tooltip>
  );
};

export const RemoveMenu = ({ onClick }) => {
  const handleClick = (label) => () => {
    onClick(label);
  };

  const menuItems = [
    {
      text: "Delete Selected Row",
      onClick: handleClick("delete-row"),
    },
    {
      text: "Delete Table",
      onClick: handleClick("delete-table"),
    },
  ];

  return (
    <Tooltip title="Actions" disableFocusListener>
      <IconMenuButton
        id="actions"
        menuItems={menuItems}
        className="remove-button"
      >
        <Minus />
      </IconMenuButton>
    </Tooltip>
  );
};
