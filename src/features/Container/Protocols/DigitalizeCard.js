import React, { useEffect, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import { isArray } from 'lodash';

import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useSelector, useDispatch } from 'react-redux';

import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import { AutoSizer, List } from 'react-virtualized';
import Drag from 'apollo-react-icons/Drag';
import DigitizeAccordion from './DigitizeAccordion';
import MultilineEdit from './Digitized_edit';
import Loader from '../../Components/Loader/Loader';
import {
  headerResult,
  protocolSummary,
  sectionDetailsResult,
  setSectionLoader,
  resetSectionData,
} from './protocolSlice';

function Digitize({ sectionNumber, sectionRef, data, handlePageRight }) {
  const dispatch = useDispatch();
  const [headerList, setHeaderList] = useState([]);

  const summary = useSelector(headerResult);
  const protocolAllItems = useSelector(protocolSummary);
  const sectionHeaderDetails = useSelector(sectionDetailsResult);

  const [currentActiveCard, setCurrentActiveCard] = useState(null);
  // const [data, setData] = useState(summary);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    if (summary?.data) {
      setHeaderList(summary.data);
    }
  }, [summary]);

  const panels = (data) => {
    console.log(data, 'data123');
    const ex = [];
    const arraylength = data ? data.length : 0;
    for (let i = 0; i < arraylength; i++) {
      ex[i] = false;
    }
    return ex;
  };
  const [editFlag, setEditFlag] = useState();
  const getedited = (value) => {
    setEditFlag(value);
    console.log('getedied', getedited);
  };

  const handleChange = (panelIndex, items) => {
    handlePageRight(items.page);
    const newPanels = expanded.map(() => false);
    newPanels[panelIndex] = !newPanels[panelIndex];
    setExpanded(newPanels);
  };

  const handleClick = (sectionNumber) => {
    setExpanded((oldPanels) => {
      const newPanels = [...oldPanels];
      for (let i = 0; i < newPanels.length; i++) {
        if (i !== sectionNumber) {
          newPanels[i] = false;
        }
      }
      newPanels[sectionNumber] = !newPanels[sectionNumber];

      return newPanels;
    });
  };

  useEffect(() => {
    if (sectionNumber === 'undefined' || sectionNumber === undefined) {
      //  refs[1].current.scrollIntoView({ behavior: 'smooth' });
    } else if (
      sectionRef &&
      sectionRef[sectionNumber] &&
      sectionRef[sectionNumber].current
    ) {
      sectionRef[sectionNumber].current.scrollIntoView({
        behavior: 'instant',
      });
      setCurrentActiveCard(headerList[sectionNumber].link_id);
      console.clear();
      console.log(sectionNumber, headerList[sectionNumber].link_id);
      // handleClick(sectionNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionNumber]);

  useEffect(() => {
    console.log('coming to useeffect 2nd');
    setExpanded(panels(summary.data));
  }, [summary]);

  useEffect(() => {
    dispatch({ type: 'GET_PROTOCOL_SECTION' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAccordionClick = (index, items) => {
    if (expanded[index] === false) {
      dispatch(setSectionLoader());
      dispatch(resetSectionData());
      dispatch({
        type: 'GET_SECTION_LIST',
        payload: {
          linkId: items.link_id,
          docId: items.doc_id,
          protocol: protocolAllItems.data.protocol,
        },
      });
    }
  };

  return (
    <Card
      className="protocol-column protocol-digitize-column"
      style={{ borderRight: '0' }}
    >
      <div className="panel-heading">Digitized Data</div>
      <div
        className="digitize-panel-content"
        data-testid="protocol-column-wrapper"
      >
        {/* summary.data */}
        {!summary.data ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          headerList.map((items, index) => (
            <div
              key={React.key}
              ref={sectionRef[index]}
              className="digitized_data_item"
            >
              <Drag
                style={{
                  color: 'grey',
                  fontSize: '1.2em',
                  padding: '15px',
                  paddingLeft: '5px',
                }}
              />
              <div>
                <DigitizeAccordion
                  item={items}
                  protocol={protocolAllItems.data.protocol}
                  primaryRole={data.userPrimaryRoleFlag}
                  currentActiveCard={currentActiveCard}
                  setCurrentActiveCard={setCurrentActiveCard}
                />

                {/* <Accordion
                  expanded={expanded[index]}
                  onChange={() => handleChange(index, items)}
                  onClick={() => onAccordionClick(index, items)}
                >
                  <AccordionSummary
                    style={{
                      fontSize: '0.5em',
                    }}
                  >
                    <div
                      className=""
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 48,
                      }}
                    >
                      <Typography
                        style={{
                          fontweight: 'strong',
                        }}
                        // onClick={onClickHandler()}
                      >
                        {items.source_file_section}
                      </Typography>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <EyeShow />
                        {data.userPrimaryRoleFlag === true ? null : (
                          <Pencil
                            onClick={() => setEditFlag(true)}
                            style={{ paddingLeft: '20px' }}
                          />
                        )}
                      </div>
                    </div>
                  </AccordionSummary>

                  <AccordionDetails
                    style={{
                      width: '80% !important',
                      height: 'auto',
                      overflowX: 'scroll',
                      overflowY: 'scroll',
                    }}
                  >
                    {sectionHeaderDetails.data &&
                      isArray(sectionHeaderDetails.data) &&
                      sectionHeaderDetails.data.map((value) => (
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        <>
                          {editFlag ? (
                            <MultilineEdit
                              editFlag={editFlag}
                              getedited={getedited}
                            />
                          ) : (
                            <Typography key={React.key}>
                              {value.content}
                            </Typography>
                          )}
                        </>
                      ))}
                  </AccordionDetails>
                </Accordion>
       
        */}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

export default Digitize;

Digitize.propTypes = {
  sectionNumber: PropTypes.isRequired,
  sectionRef: PropTypes.isRequired,
  data: PropTypes.isRequired,
  handlePageRight: PropTypes.isRequired,
};
