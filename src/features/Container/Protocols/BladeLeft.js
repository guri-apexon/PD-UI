import withStyles from '@material-ui/core/styles/withStyles';
import React, { useState, useEffect } from 'react';
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
import record from './Dummy.json';
import './BladeLeft.scss';

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
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState(record);

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e, expanded) => {
    setExpand(expanded);
  };

  // const data = [
  //   {
  //     section:
  //       'abcrtyuuhgfddfghgdvhtfgyfghjjyujnbvgyjbvghbvfghthgffyujjgggjjnbg',
  //     pageNo: 2,
  //     subsection: [
  //       {
  //         sub_section: 'subsection1',
  //         subSection1: [
  //           { sub_Section: 'Sub_Sub_section 1.1.1' },
  //           { sub_Section: 'Sub_Sub_section 1.1.2' },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     section: 'xyz1',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz2',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz3',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz4',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz5',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz6',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz6',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz6',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  //   {
  //     section: 'xyz6',
  //     pageNo: 5,
  //     subsection: [
  //       { sub_section: 'subsection1' },
  //       { sub_section: 'subsection1' },
  //     ],
  //   },
  // ];

  useEffect(() => {
    if (!open) {
      setOpen(true);
      setExpand(false);
    }
  }, [open]);

  return (
    <div>
      <div className="bladeContainer">
        <Blade
          onChange={onChange}
          open={open}
          expanded={expand}
          onClose={onClose}
          title="Navigation"
          className="blade"
          width={215}
          marginTop={159}
        >
          <div style={{ paddingLeft: '7px' }}>
            {data.map((item, index) => {
              return (
                <Accordion
                  key={React.key}
                  style={{
                    border: 'none',
                  }}
                >
                  <AccordionSummary>
                    <Tooltip title={item.source_file_section}>
                      <Typography
                        className="header-unselect"
                        onClick={(e) => {
                          handlePageNo(e, item.page, index);
                        }}
                      >
                        {item.source_file_section}
                      </Typography>
                    </Tooltip>
                  </AccordionSummary>

                  {/* {item.subsection.map((level1, index1) => {
                    return (
                      <Accordion
                        key={React.key}
                        style={{
                          border: 'none',
                        }}
                      >
                        <AccordionSummary>
                          <Tooltip title={item.section}>
                            <Typography
                              className="header-unselect"
                              onClick={(e) => {
                                handlePageNo(e, item.pageNo, index);
                              }}
                            >
                              {item.section}
                            </Typography>
                          </Tooltip>
                        </AccordionSummary>

                        {level1.subSection1 &&
                          level1.subSection1.map((level2, index2) => {
                            return (
                              <Accordion
                                key={React.key}
                                style={{
                                  border: 'none',
                                }}
                              >
                                <AccordionSummary>
                                  <Tooltip title={level2.sub_Section}>
                                    <Typography
                                      className="header-unselect"
                                      onClick={(e) => {
                                        handlePageNo(e, item.pageNo, index);
                                      }}
                                    >
                                      {level2.sub_Section}
                                    </Typography>
                                  </Tooltip>
                                </AccordionSummary>
                              </Accordion>
                            );
                          })}
                      </Accordion>
                    );
                  })} */}
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
