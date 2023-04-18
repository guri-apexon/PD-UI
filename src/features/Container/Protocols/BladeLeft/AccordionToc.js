import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Accordion from 'apollo-react/components/Accordion/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import TreeItem from 'apollo-react/components/TreeItem';
import ChevronRight from 'apollo-react-icons/ChevronRight';
import ChevronDown from 'apollo-react-icons/ChevronDown';

const noBorderStyle = {
  border: 'none',
};
function AccordionToc({
  level,
  sectionIndex,
  handlePageNo,
  subAccComponent,
  expanded,
  handleChange,
}) {
  return (
    <TreeItem
      key={level.link_id}
      label={level?.source_file_section}
      onClick={(e) => {
        if (level.levelNumber) handleChange(sectionIndex, level.link_id);
        handlePageNo(e, level.page, sectionIndex);
      }}
      nodeId={level.link_id}
      icon={
        expanded.includes(level.link_id) ? <ChevronDown /> : <ChevronRight />
      }
    >
      {subAccComponent}
    </TreeItem>
    // <Accordion
    //   key={React.key}
    //   style={noBorderStyle}
    //   expanded={level.levelNumber && expanded}
    // >
    //   <AccordionSummary
    //     onClick={(e) => {
    //       if (level.levelNumber) handleChange(sectionIndex);
    //       handlePageNo(e, level.page, sectionIndex);
    //     }}
    //   >
    //     <Typography
    //       className="header-unselect"
    //       title={level?.source_file_section}
    //     >
    //       {level?.source_file_section}
    //     </Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <div>{subAccComponent}</div>
    //   </AccordionDetails>
    // </Accordion>
  );
}

export default AccordionToc;

AccordionToc.propTypes = {
  level: PropTypes.isRequired,
  sectionIndex: PropTypes.isRequired,
  handlePageNo: PropTypes.isRequired,
  subAccComponent: PropTypes.isRequired,
  expanded: PropTypes.isRequired,
  handleChange: PropTypes.isRequired,
};
