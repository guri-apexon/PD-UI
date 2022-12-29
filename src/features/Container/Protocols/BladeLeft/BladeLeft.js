import withStyles from '@material-ui/core/styles/withStyles';
import React, { useState, useEffect } from 'react';
import { neutral8 } from 'apollo-react/colors';
import Tooltip from 'apollo-react/components/Tooltip';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Typography from 'apollo-react/components/Typography';
import Accordion from 'apollo-react/components/Accordion';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useSelector, useDispatch } from 'react-redux';
import record from '../Records1.json';
import './BladeLeft.scss';

import { protocolTocData } from '../protocolSlice';

const styles = {
  blade: {
    color: neutral8,
    lineHeight: '24px',
    marginTop: '4.5%',
    width: '200px',
  },
};

function BladeLeft({ handlePageNo, dataSummary }) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const [data] = useState(record);
  const dispatch = useDispatch();

  const [tocList, setTocList] = useState([]);

  const tocData = useSelector(protocolTocData);

  useEffect(() => {
    setTocList(tocData.data);
  }, [tocData]);

  useEffect(() => {
    dispatch({
      type: 'GET_PROTOCOL_TOC_DATA',
      payload: {
        docId: dataSummary.id,
        tocFlag: 1,
      },
    });
  }, []);
  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e, expanded) => {
    setExpand(expanded);
  };

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
          width={263}
          marginTop={141}
          hasBackdrop
        >
          {/* <TextField
            icon={<Search />}
            placeholder="Search"
            className="search-Box"
          /> */}

          <div style={{ paddingLeft: '7px' }}>
            {tocList?.map((item, index) => {
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

                  {item?.childlevel?.map((level1) => {
                    return (
                      <Accordion
                        key={React.key}
                        style={{
                          border: 'none',
                        }}
                      >
                        <AccordionSummary>
                          <Tooltip title={level1?.source_file_section}>
                            <Typography
                              className="header-unselect"
                              onClick={(e) => {
                                handlePageNo(e, item.pageNo, index);
                              }}
                            >
                              {level1?.source_file_section}
                            </Typography>
                          </Tooltip>
                        </AccordionSummary>

                        {level1?.subSection1 &&
                          level1?.subSection1.map((level2) => {
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
                  })}
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
  // eslint-disable-next-line react/require-default-props
  handlePageNo: PropTypes.func,
  dataSummary: PropTypes.isRequired,
};
