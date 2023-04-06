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

const noBorderStyle = {
  border: 'none',
};
function BladeLeft({ handlePageNo }) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [tocActive, setTocActive] = useState([]);
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

  const getValue = (index) => {
    const data = tocActive || [];
    if (data) {
      if (data?.length >= index) {
        return data[index];
      }
    }
    return false;
  };

  return (
    <div className="bladeContainer" ref={wrapperRef}>
      <Blade
        data-testid="toc-component"
        onChange={(e, expanded) => setExpand(expanded)}
        open={open}
        expanded={expand}
        onClose={() => setOpen(false)}
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
            const sectionIndex = index; // <= 0 ? 0 : index - 1;
            const expanded = getValue(index);

            return (
              <Accordion
                key={React.key}
                style={noBorderStyle}
                expanded={expanded}
                onClick={() => handleChange(index)}
              >
                <AccordionSummary>
                  <Tooltip title={item.source_file_section} placement="right">
                    <Typography
                      className="header-unselect"
                      onClick={(e) => {
                        handlePageNo(e, item.page, sectionIndex);
                      }}
                    >
                      {item.source_file_section}
                    </Typography>
                  </Tooltip>
                </AccordionSummary>

                {item?.childlevel?.map((level1) => {
                  return (
                    <Accordion key={React.key} style={noBorderStyle}>
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

                      {level1?.subSection1 &&
                        level1?.subSection1.map((level2) => {
                          return (
                            <Accordion key={React.key} style={noBorderStyle}>
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
};
