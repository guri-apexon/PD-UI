import Tooltip from "apollo-react/components/Tooltip";
// import EyeHidden from "apollo-react-icons/EyeHidden";
import EyeShow from "apollo-react-icons/EyeShow";
import Plus from "apollo-react-icons/Plus";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../store/ActionTypes";

const AccordionHeader = ({ section, handleSectionClicked }) => {
  const dispatch = useDispatch();
  const sectionHeader = section.header;
  const sectionName = sectionHeader.source_file_section;
  const handleAddSection = (e, sectionInfo) => {
    e.stopPropagation();
    // console.log("Section Info", section);
    // const childSections = sectionInfo.child_secid_seq;
    // const maxSectionID = Math.max(...childSections.map((elem) => elem[0]));
    // console.log("Max Section ID", maxSectionID);
    dispatch({
      type: ActionTypes.ADD_SECTION,
      payload: { section: section, sectionName: "New Section" },
    });
  };
  return (
    <div
      className="accordion-parent-header"
      onClick={() => handleSectionClicked(section, sectionName)}
    >
      <div className="accordion-header-label">{sectionName.toLowerCase()} </div>
      <div className="accordion-header-icons">
        <Tooltip
          variant="dark"
          extraLabels={[
            {
              title: "Last Reviewed",
              subtitle: "12-Oct-2021",
            },
            { title: "Reviewd By", subtitle: "1072231" },
            { title: "No. of reviews", subtitle: "3" },
          ]}
          placement="top"
        >
          <EyeShow className="accordion-icon" />
        </Tooltip>
        <Tooltip variant="dark" title="Add Section" placement="top">
          <Plus
            className="accordion-icon"
            onClick={(e) => handleAddSection(e, sectionHeader)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default AccordionHeader;
