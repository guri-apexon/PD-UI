import withStyles from '@material-ui/core/styles/withStyles';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { neutral8 } from 'apollo-react/colors';
import Tooltip from 'apollo-react/components/Tooltip';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Typography from 'apollo-react/components/Typography';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import ArrowDown from 'apollo-react-icons/ArrowDown';
import './LeftBlade.scss';

const styles = {
  blade: {
    color: neutral8,
    lineHeight: '24px',
    marginTop: '4.5%',
    width: '200px',
  },
};

function BladeLeft({ handlePageNo }) {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e, expanded) => {
    setExpanded(expanded);
    console.log({ expanded });
    console.log('Open', open);
  };

  const handleClick = (expanded) => {
    setExpanded(expanded);
    console.log('expandable', { expanded });
  };

  const data = [
    {
      section:
        'abcrtyuuhgfddfghgdvhtfgyfghjjyujnbvgyjbvghbvfghthgffyujjgggjjnbg',
      pageNo: 2,
      subsection: [{ sub_section: 'subsection1' }],
    },
    {
      section: 'xyz1',
      pageNo: 5,
      subsection: [
        { sub_section: 'subsection1' },
        { sub_section: 'subsection1' },
      ],
    },
    {
      section: 'xyz2',
      pageNo: 5,
      subsection: [
        { sub_section: 'subsection1' },
        { sub_section: 'subsection1' },
      ],
    },
    {
      section: 'xyz3',
      pageNo: 5,
      subsection: [
        { sub_section: 'subsection1' },
        { sub_section: 'subsection1' },
      ],
    },
    {
      section: 'xyz4',
      pageNo: 5,
      subsection: [
        { sub_section: 'subsection1' },
        { sub_section: 'subsection1' },
      ],
    },
    {
      section: 'xyz5',
      pageNo: 5,
      subsection: [
        { sub_section: 'subsection1' },
        { sub_section: 'subsection1' },
      ],
    },
    {
      section: 'xyz6',
      pageNo: 5,
      subsection: [
        { sub_section: 'subsection1' },
        { sub_section: 'subsection1' },
      ],
    },
  ];

  return (
    <div>
      <div style={{ backgroundColor: 'black' }}>
        <Blade
          onChange={onChange}
          open={open}
          expanded={expanded}
          // onClose={onClose}
          title="Navigation"
          className="blade"
          width={215}
          marginTop={170}
        >
          <div style={{ background: 'red' }}>
            {data.map((item, index) => {
              return (
                <Accordion
                  key={React.key}
                  style={{ background: '#f8f9fb;', border: 'none' }}
                >
                  <AccordionSummary expandIcon={<ArrowDown />}>
                    <Tooltip title={item.section}>
                      <Typography
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '30px',
                          marginTop: '3.5%',
                        }}
                        onClick={(e) => {
                          // setExpanded(false);
                          // setOpen(true);
                          // onChange(e,);
                          handlePageNo(e, item.pageNo, index);
                        }}
                      >
                        {item.section}
                      </Typography>
                    </Tooltip>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography>Subsection {index} </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </Blade>
      </div>
    </div>
  );
}

export default withStyles(styles)(BladeLeft);

BladeLeft.propTypes = {
  handlePageNo: PropTypes.isRequired,
};
