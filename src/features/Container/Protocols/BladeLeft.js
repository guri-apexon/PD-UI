import withStyles from '@material-ui/core/styles/withStyles';
import React, { useState } from 'react';

import { neutral8 } from 'apollo-react/colors';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Button from 'apollo-react/components/Button';
import Typography from 'apollo-react/components/Typography';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import Avatar from 'apollo-react/components/Avatar';

const styles = {
  content: {
    color: neutral8,
    lineHeight: '24px',
    marginTop: '50px',
  },
};

function BladeLeft({ handlePageNo }) {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const onClose = () => {
    // setOpen(false);
  };
  const onChange = (e, ex) => {
    setExpanded(ex);
    console.log('expanded', ex);
  };
  const onOpen = () => {
    setOpen(true);
    // setExpanded(true);
  };

  const data = [
    { section: 'abc', pageNo: 2 },
    { section: 'xyz', pageNo: 5 },
  ];

  return (
    <div>
      <Avatar size="small" onClick={onOpen}>
        <ArrowRight />
      </Avatar>

      <div>
        <Blade
          onChange={(e) => {
            onChange(e, expanded);
          }}
          open={open}
          expanded={expanded}
          onClose={onClose}
          title="Navigation"
          hasBackdrop
          style={{ width: '80px' }}
        >
          <div>
            {data.map((item, index) => {
              return (
                <Accordion
                  key={React.key}
                  style={{ background: '#f8f9fb;', border: 'none' }}
                >
                  <AccordionSummary
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <Typography
                      onClick={(e) => {
                        handlePageNo(e, item.pageNo, index);
                        console.log(item.pageNo);
                      }}
                    >
                      {item.section}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Subsection {index} </Typography>
                  </AccordionDetails>
                </Accordion>
                // <div key={React.key}>
                //   <div style={{ display: 'flex' }}>
                //     <ArrowDown />
                //     <Typography>{item.section}</Typography>
                //   </div>
                // </div>
              );
            })}
          </div>
        </Blade>
      </div>
    </div>
  );
}

// export default withStyles(styles)(BladeLeft);
export default BladeLeft;

BladeLeft.propTypes = {
  handlePageNo: PropTypes.isRequired,
};
