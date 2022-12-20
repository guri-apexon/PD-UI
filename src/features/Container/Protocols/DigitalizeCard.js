import React, { useEffect, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';

import AccordionSummary from 'apollo-react/components/AccordionSummary';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import Drag from 'apollo-react-icons/Drag';
import Loader from '../../Components/Loader/Loader';
import {
  headerResult,
  protocolSummary,
  sectionDetailsResult,
} from './protocolSlice';
import Record from './records.json';

function Digitize({ sectionNumber, sectionRef }) {
  const dispatch = useDispatch();
  const summary = useSelector(headerResult);
  const protocolAllItems = useSelector(protocolSummary);
  const sectionHeaderDetails = useSelector(sectionDetailsResult);
  // const [data, setData] = useState(summary);
  const [expanded, setExpanded] = useState([]);
  const [loader, setLoader] = useState(false);

  const panels = (data) => {
    debugger;
    console.log(data, 'data123');
    const ex = [];
    const arraylength = data ? data.length : 0;
    for (let i = 0; i < arraylength; i++) {
      ex[i] = false;
    }
    return ex;
  };
  const handleChange = (panelIndex) => {
    setExpanded((oldPanels) => {
      const newPanels = [...oldPanels];
      for (let i = 0; i < newPanels.length; i++) {
        if (i !== panelIndex) {
          newPanels[i] = false;
        }
      }
      newPanels[panelIndex] = !newPanels[panelIndex];
      console.log(newPanels);
      return newPanels;
    });
  };
  const handleClick = (sectionNumber) => {
    console.log('click');
    setExpanded((oldPanels) => {
      console.log('test2');
      const newPanels = [...oldPanels];
      for (let i = 0; i < newPanels.length; i++) {
        if (i !== sectionNumber) {
          newPanels[i] = false;
        }
      }
      newPanels[sectionNumber] = !newPanels[sectionNumber];
      console.log(newPanels);
      return newPanels;
    });
  };

  useEffect(() => {
    if (sectionNumber === 'undefined' || sectionNumber === undefined) {
      //  refs[1].current.scrollIntoView({ behavior: 'smooth' });
    } else {
      sectionRef[sectionNumber].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
      handleClick(sectionNumber);
    }
  }, [sectionNumber]);

  useEffect(() => {
    if (!summary.data) {
      dispatch({ type: 'GET_PROTOCOL_SECTION' });
    }
    console.log('coming to useeffect 2nd');
    setExpanded(panels(summary.data));
  }, [summary]);

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
          <Loader />
        ) : (
          summary.data.map((items, index) => (
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
                <Accordion
                  expanded={expanded[index]}
                  onChange={() => handleChange(index)}
                >
                  <AccordionSummary
                    style={{
                      fontSize: '0.5em',
                    }}
                    onClick={() =>
                      dispatch({
                        type: 'GET_SECTION_LIST',
                        payload: {
                          linkId: items.link_id,
                          docId: items.doc_id,
                          protocol: protocolAllItems.data.protocol,
                        },
                      })
                    }
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
                        <Pencil style={{ paddingLeft: '20px' }} />
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
                      sectionHeaderDetails.data.map((value) => (
                        <Typography key={React.key}>{value.content}</Typography>
                      ))}
                  </AccordionDetails>
                </Accordion>
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
};
