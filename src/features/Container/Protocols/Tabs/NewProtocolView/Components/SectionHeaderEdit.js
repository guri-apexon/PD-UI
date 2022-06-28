import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../store/ActionTypes";

const SectionEdit = ({ section }) => {
  const dispatch = useDispatch();
  const sectionHeader = section.header;
  const sectionName = sectionHeader.source_file_section;
  const handleExpand = () => {
    dispatch({ type: ActionTypes.HANDLE_EXPAND_BPO, payload: { sectionName } });
  };
  return (
    <div className="accordion-parent-header" onClick={handleExpand}>
      <div className="accordion-header-label">{sectionName.toLowerCase()} </div>
    </div>
  );
};

export default SectionEdit;
