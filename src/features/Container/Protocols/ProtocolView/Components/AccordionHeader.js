import Tooltip from "apollo-react/components/Tooltip";
// import EyeHidden from "apollo-react-icons/EyeHidden";
import EyeShow from "apollo-react-icons/EyeShow";

const AccordionHeader = ({ section, handleSectionClicked }) => {
  const sectionHeader = section.header;
  const sectionName = sectionHeader.source_file_section;
  return (
    <div
      className="accordion-parent-header"
      onClick={() => handleSectionClicked(section, sectionName)}
    >
      {sectionName.toLowerCase()}{" "}
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
        style={{ marginRight: 192 }}
      >
        <EyeShow style={{ color: "#0469a4", float: "right" }} />
      </Tooltip>
    </div>
  );
};

export default AccordionHeader;
