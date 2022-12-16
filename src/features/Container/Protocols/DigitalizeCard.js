import React, { useEffect, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Card from 'apollo-react/components/Card';
import axios from 'axios';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import Drag from 'apollo-react-icons/Drag';
// import Records from './records.json';
function Digitize({ sectionNumber, sectionRef, headerDetails }) {
  const panels = () => {
    const ex = [];
    const arraylength = headerDetails.length;
    for (let i = 0; i < arraylength; i++) {
      ex[i] = false;
    }
    return ex;
  };
  const [expanded, setExpanded] = useState(panels);
  const allOpen = expanded.every((exp) => exp);
  const [test, setTest] = useState();
  const handleChange = (panelIndex) => () => {
    console.log('test1');
    setExpanded((oldPanels) => {
      console.log('test2');
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
  const onClickHandler = (event) => {
    // event.preventDefault();
    // const aidoc_id= 123
    // const link_level=34
    // const link_id=456
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
    console.log(headerDetails, 'headerDetails');
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
  }, [sectionNumber, headerDetails]);
  return (
    <Card
      className="protocol-column protocol-digitize-column"
      style={{ borderRight: '0' }}
    >
      <div
        style={{
          fontWeight: 'bold',
          zIndex: 1,
          padding: 15,
          backgroundColor: '#FFFAFA',
          paddingTop: 0,
          paddingBottom: 0,
        }}
        className="panel-heading"
      >
        Digitized Data
      </div>
      <div
        style={{
          scrollPadding: '50px 0px 0px 50px',
          padding: '6px 16px',
          paddingTop: '20px',
          overflowY: 'scroll',
          height: '65vh',
          position: 'fixed',
          margin: 10,
        }}
        data-testid="protocol-column-wrapper"
      >
        {headerDetails.map((value, index) => (
          <div
            key={React.key}
            ref={sectionRef[index]}
            style={{
              listStyleType: 'none',
              display: 'flex',
              flexDirection: 'row',
              padding: '2px',
            }}
          >
            <Drag
              style={{
                color: 'grey',
                fontSize: '1.2em',
                padding: '15px',
                paddingLeft: '5px',
              }}
            />
            <Accordion
              expanded={expanded[index]}
              style={{
                // width: '100%',
                marginBottom: '-2px',
                border: 0,
                borderTop: 0,
                borderRadius: 0,
                // height: '44px',
                backgroundColor: '#F8F8F9',
              }}
              onChange={handleChange(index)}
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
                      fontSize: '1.5em',
                      fontweight: 'strong',
                    }}
                    onClick={onClickHandler()}
                  >
                    {value.source_file_section}
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
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </Card>
  );
}
export default Digitize;
Digitize.propTypes = {
  sectionNumber: PropTypes.isRequired,
  sectionRef: PropTypes.isRequired,
  headerDetails: PropTypes.isRequired,
};
