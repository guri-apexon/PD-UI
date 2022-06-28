// import { useDispatch } from "react-redux";
// import { ActionTypes } from "../../../store/ActionTypes";

import InlineEdit from "./InlineEdit";

const SectionBodyEdit = ({ section }) => {
  //   const dispatch = useDispatch();
  //   const sectionHeader = section.header;
  //   const sectionName = sectionHeader.source_file_section;
  //   const handleExpand = () => {
  //     dispatch({ type: ActionTypes.HANDLE_EXPAND_BPO, payload: { sectionName } });
  //   };
  return (
    <div className="section-body-edit" style={{ width: "90%" }}>
      <InlineEdit data={[]} />
    </div>
  );
};

export default SectionBodyEdit;
