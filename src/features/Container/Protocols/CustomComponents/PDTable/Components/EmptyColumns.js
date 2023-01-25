import { v4 as uuidv4 } from "uuid";
import HoverList from "./HoverList";
import moreIcon from "../../../../../../assets/images/more.png";
import { useState, useRef, useEffect } from "react";
import { columnHoverData } from "./dropdownData";

const EmptyColumnCells = ({ columnLength, handleOperation, colWidth }) => {
  const columnHoverRef = useRef(null);
  const [activeIconIndex, setActiveIconIndex] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        columnHoverRef.current &&
        !columnHoverRef.current.contains(event.target)
      ) {
        setActiveIconIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [columnHoverRef]);
  const handleIconClick = (iconIndex) => {
    setActiveIconIndex(iconIndex);
  };
  const handleTableOperation = (operation, index) => {
    handleOperation(operation, index);
    setActiveIconIndex(null);
  };
  return (
    <div className="pd-empty-cells" ref={columnHoverRef}>
      {[...Array(columnLength)].map((val, index) => (
        <div
          key={uuidv4()}
          className="pd-empty-cell-column"
          style={{ width: `${colWidth}%` }}
        >
          <span className="pd-more-icon" onClick={() => handleIconClick(index)}>
            <img src={moreIcon} alt={"more"} />
          </span>
          {activeIconIndex === index && (
            <HoverList
              data={columnHoverData}
              handleOperation={handleTableOperation}
              index={index}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default EmptyColumnCells;
