import React, { useState, useEffect, useRef } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Typography from 'apollo-react/components/Typography';
import Accordion from 'apollo-react/components/Accordion';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useSelector, useDispatch } from 'react-redux';
import './BladeLeft.scss';

import { protocolTocData, TOCActive } from '../protocolSlice';

function BladeLeft({ handlePageNo, dataSummary }) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [tocActive, setTocActive] = useState();
  const tocActiveSelector = useSelector(TOCActive);
  useEffect(() => {
    if (tocActiveSelector) setTocActive(tocActiveSelector);
  }, [tocActiveSelector]);

  const [tocList, setTocList] = useState([]);

  const tocData = useSelector(protocolTocData);

  useEffect(() => {
    if (tocData.data?.length) setTocList(tocData.data);
  }, [tocData]);

  useEffect(() => {
    dispatch({
      type: 'GET_PROTOCOL_TOC_DATA',
      payload: {
        docId: dataSummary.id,
        tocFlag: 1,
      },
    });
    // eslint-disable-next-line
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleChange = (index) => {
    const tempTOCActive = [...tocActive];

    tempTOCActive[index] = !tempTOCActive[index];
    dispatch({
      type: 'SET_TOC_Active',
      payload: {
        data: tempTOCActive,
      },
    });
  };
  const handleClick = (e, item, index) => {
    handleChange(index);
    handlePageNo(e, item?.page, index);
  };

  return (
    <div className="bladeContainer" ref={wrapperRef}>
      <Blade
        data-testid="toc-component"
        onChange={onChange}
        open={open}
        expanded={expand}
        onClose={onClose}
        title="Navigation"
        className="blade"
        width={263}
        marginTop={141}
        hasBackdrop
        BackdropProps={{
          onClick: () => {
            setOpen(false);
          },
        }}
      >
        <div className="toc-wrapper">
          {tocList?.map((item, index) => {
            const sectionIndex = index;
            return (
              <Accordion
                key={React.key}
                style={{
                  border: 'none',
                }}
                expanded={tocActive[index]}
              >
                <AccordionSummary>
                  <Tooltip title={item.source_file_section} placement="right">
                    <Typography
                      className="header-unselect"
                      onClick={(e) => {
                        handleClick(e, item, index);
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
                              handlePageNo(e, level1.page, sectionIndex);
                            }}
                          >
                            {level1?.source_file_section}
                          </Typography>
                        </Tooltip>
                      </AccordionSummary>

                      {level1?.childlevel &&
                        level1?.childlevel.map((level2) => {
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
                                      handlePageNo(
                                        e,
                                        level2.page,
                                        sectionIndex,
                                      );
                                    }}
                                  >
                                    {level2.sub_Section}
                                  </Typography>
                                </Tooltip>
                              </AccordionSummary>
                              {level2?.childlevel &&
                                level2?.childlevel.map((level3) => {
                                  return (
                                    <Accordion
                                      key={React.key}
                                      style={{
                                        border: 'none',
                                      }}
                                    >
                                      <AccordionSummary>
                                        <Tooltip title={level3.sub_Section}>
                                          <Typography
                                            className="header-unselect"
                                            onClick={(e) => {
                                              handlePageNo(
                                                e,
                                                level3.page,
                                                sectionIndex,
                                              );
                                            }}
                                          >
                                            {level3.sub_Section}
                                          </Typography>
                                        </Tooltip>
                                      </AccordionSummary>
                                      {level3.childlevel &&
                                        level3?.childlevel.map((level4) => {
                                          return (
                                            <Accordion
                                              key={React.key}
                                              style={{
                                                border: 'none',
                                              }}
                                            >
                                              <AccordionSummary>
                                                <Tooltip
                                                  title={level4.sub_Section}
                                                >
                                                  <Typography
                                                    className="header-unselect"
                                                    onClick={(e) => {
                                                      handlePageNo(
                                                        e,
                                                        level4.page,
                                                        sectionIndex,
                                                      );
                                                    }}
                                                  >
                                                    {level4.sub_Section}
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
                    </Accordion>
                  );
                })}
              </Accordion>
            );
          })}
        </div>
      </Blade>
    </div>
  );
}
export default BladeLeft;

BladeLeft.propTypes = {
  // eslint-disable-next-line react/require-default-props
  handlePageNo: PropTypes.func,
  dataSummary: PropTypes.isRequired,
};
