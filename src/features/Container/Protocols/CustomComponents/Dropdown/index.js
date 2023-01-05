import { useState } from "react";
import "./style.scss";

const classNames = {
  active: "dropdown-content active-show-list",
  notActive: "dropdown-content",
};
const Dropdown = ({
  list,
  buttonName,
  contentStyle,
  headerStyle,
  onClick,
  type,
}) => {
  const [showList, setShowList] = useState(false);
  const showMenu = () => {
    setShowList(!showList);
  };
  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={showMenu} style={headerStyle}>
        {buttonName}
      </button>
      <div
        className={showList ? classNames.active : classNames.notActive}
        style={contentStyle}
      >
        <ul>
          {list.map((item, i) => {
            if (type === "header") {
              return (
                <li
                  key={item.id + i}
                  onMouseDown={(evt) => {
                    evt.preventDefault();
                    document.execCommand("formatBlock", false, item.name);
                  }}
                >
                  {item.name}
                </li>
              );
            }
            return (
              <li key={item.id + i} onClick={() => onClick(item, type)}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Dropdown;
