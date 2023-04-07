import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import PropTypes from 'prop-types';
import Tooltip from 'apollo-react/components/Tooltip';
import React from 'react';
import Accordion from 'apollo-react/components/Accordion/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';

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
    <Accordion
      key={React.key}
      style={noBorderStyle}
      expanded={level.levelNumber && expanded}
    >
      <AccordionSummary
        onClick={(e) => {
          if (level.levelNumber) handleChange(sectionIndex);
          handlePageNo(e, level.page, sectionIndex);
        }}
      >
        <Tooltip title={level?.source_file_section}>
          <Typography className="header-unselect">
            {level?.source_file_section}
          </Typography>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
        <div>{subAccComponent}</div>
      </AccordionDetails>
    </Accordion>
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
