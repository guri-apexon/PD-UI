import withStyles from '@material-ui/core/styles/withStyles';
import React, { useState, useEffect } from 'react';
import { neutral8 } from 'apollo-react/colors';
import Tooltip from 'apollo-react/components/Tooltip';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import Typography from 'apollo-react/components/Typography';
import Accordion from 'apollo-react/components/Accordion';
import AccordionSummary from 'apollo-react/components/AccordionSummary';

import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from 'react-virtualized';
import { useSelector, useDispatch } from 'react-redux';
import { protocolTocData } from '../protocolSlice';

import record from '../Dummy.json';
import './BladeLeft.scss';

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
      },
    });
  }, []);
  console.log('>>>>>>>>', tocList);
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

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });
  const rowRender = ({ key, index, style, parent }) => {
    const level1 = data[index];
    console.log('>>>data Virtual', level1.source_file_section);
    console.log('length', data.length);
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          {level1.source_file_section}
          {/* <Accordion
            key={React.key}
            style={{
              border: 'none',
            }}
          >
            <AccordionSummary>
              <Tooltip title={level1.source_file_section}>
                <Typography
                  className="header-unselect"
                  onClick={(e) => {
                    handlePageNo(e, level1.page, index);
                  }}
                >
                  {level1.source_file_section}
                </Typography>
              </Tooltip>
            </AccordionSummary>
            {level1?.subsection?.map((level2) => {
              return (
                <Accordion
                  key={React.key}
                  style={{
                    border: 'none',
                  }}
                >
                  <AccordionSummary>
                    <Tooltip title={level2?.section}>
                      <Typography
                        className="header-unselect"
                        onClick={(e) => {
                          handlePageNo(e, level1.pageNo, index);
                        }}
                      >
                        {level2?.section}
                      </Typography>
                    </Tooltip>
                  </AccordionSummary>
                  {level2.subSection1 &&
                    level2.subSection1.map((level3) => {
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
                                  handlePageNo(e, level3.pageNo, index);
                                }}
                              >
                                {level3.sub_Section}
                              </Typography>
                            </Tooltip>
                          </AccordionSummary>
                          {level3.subSection1 &&
                            level3.subSection1.map((level4) => {
                              return (
                                <Accordion
                                  key={React.key}
                                  style={{
                                    border: 'none',
                                  }}
                                >
                                  <AccordionSummary>
                                    <Tooltip title={level4.sub_Section}>
                                      <Typography
                                        className="header-unselect"
                                        onClick={(e) => {
                                          handlePageNo(e, level4.pageNo, index);
                                        }}
                                      >
                                        {level4.sub_Section}
                                      </Typography>
                                    </Tooltip>
                                  </AccordionSummary>
                                  {level4.subSection1 &&
                                    level4.subSection1.map((level5) => {
                                      return (
                                        <Accordion
                                          key={React.key}
                                          style={{
                                            border: 'none',
                                          }}
                                        >
                                          <AccordionSummary>
                                            <Tooltip title={level5.sub_Section}>
                                              <Typography
                                                className="header-unselect"
                                                onClick={(e) => {
                                                  handlePageNo(
                                                    e,
                                                    level5.pageNo,
                                                    index,
                                                  );
                                                }}
                                              >
                                                {level5.sub_Section}
                                              </Typography>
                                            </Tooltip>
                                          </AccordionSummary>
                                          {level5.subSection1 &&
                                            level5.subSection1.map((level6) => {
                                              return (
                                                <Accordion
                                                  key={React.key}
                                                  style={{
                                                    border: 'none',
                                                  }}
                                                >
                                                  <AccordionSummary>
                                                    <Tooltip
                                                      title={level6.sub_Section}
                                                    >
                                                      <Typography
                                                        className="header-unselect"
                                                        onClick={(e) => {
                                                          handlePageNo(
                                                            e,
                                                            level6.pageNo,
                                                            index,
                                                          );
                                                        }}
                                                      >
                                                        {level6.sub_Section}
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
          </Accordion> */}
        </div>
      </CellMeasurer>
    );
  };

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
          <div className="autoSizer">
            <AutoSizer>
              {({ width, height }) => {
                return (
                  <List
                    width={600}
                    height={400}
                    rowHeight={50}
                    rowCount={data.length}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    rowRenderer={rowRender}
                    overscanRowCount={5}
                    deferredMeasurementCache={cache}
                  />
                );
              }}
            </AutoSizer>
          </div>
          {/* <div style={{ paddingLeft: '7px' }}>
            {data?.map((item, index) => {
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

                  {item?.subsection?.map((level1) => {
                    return (
                      <Accordion
                        key={React.key}
                        style={{
                          border: 'none',
                        }}
                      >
                        <AccordionSummary>
                          <Tooltip title={level1?.section}>
                            <Typography
                              className="header-unselect"
                              onClick={(e) => {
                                handlePageNo(e, item.pageNo, index);
                              }}
                            >
                              {level1?.section}
                            </Typography>
                          </Tooltip>
                        </AccordionSummary>

                        {level1.subSection1 &&
                          level1.subSection1.map((level2) => {
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
                                {level2.subSection1 &&
                                  level2.subSection1.map((level3) => {
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
                                                  item.pageNo,
                                                  index,
                                                );
                                              }}
                                            >
                                              {level3.sub_Section}
                                            </Typography>
                                          </Tooltip>
                                        </AccordionSummary>
                                        {level3.subSection1 &&
                                          level3.subSection1.map((level4) => {
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
                                                          item.pageNo,
                                                          index,
                                                        );
                                                      }}
                                                    >
                                                      {level4.sub_Section}
                                                    </Typography>
                                                  </Tooltip>
                                                </AccordionSummary>
                                                {level4.subSection1 &&
                                                  level4.subSection1.map(
                                                    (level5) => {
                                                      return (
                                                        <Accordion
                                                          key={React.key}
                                                          style={{
                                                            border: 'none',
                                                          }}
                                                        >
                                                          <AccordionSummary>
                                                            <Tooltip
                                                              title={
                                                                level5.sub_Section
                                                              }
                                                            >
                                                              <Typography
                                                                className="header-unselect"
                                                                onClick={(
                                                                  e,
                                                                ) => {
                                                                  handlePageNo(
                                                                    e,
                                                                    item.pageNo,
                                                                    index,
                                                                  );
                                                                }}
                                                              >
                                                                {
                                                                  level5.sub_Section
                                                                }
                                                              </Typography>
                                                            </Tooltip>
                                                          </AccordionSummary>
                                                        </Accordion>
                                                      );
                                                    },
                                                  )}
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
          </div> */}
        </Blade>
      </div>
    </div>
  );
}
export default withStyles(styles)(BladeLeft);

BladeLeft.propTypes = {
  dataSummary: PropTypes.isRequired,
  // eslint-disable-next-line react/require-default-props
  handlePageNo: PropTypes.func,
};
