import React, { useEffect, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import AccordionDetails from 'apollo-react/components/AccordionDetails';

import AccordionSummary from 'apollo-react/components/AccordionSummary';

import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import EyeShow from 'apollo-react-icons/EyeShow';
import Drag from 'apollo-react-icons/Drag';
import Records from './records.json';

function Digitize({ sectionNumber, sectionRef }) {
  const panels = () => {
    const ex = [];
    const arraylength = Records.length;
    for (let i = 0; i < arraylength; i++) {
      ex[i] = false;
    }
    return ex;
  };
  const [expanded, setExpanded] = useState(panels);
  const allOpen = expanded.every((exp) => exp);
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

  return (
    <Card className="protocol-column" style={{ borderRight: '0' }}>
      <div
        style={{
          fontWeight: 'bold',
          zIndex: 999,
          padding: 15,
          position: 'fixed',
          backgroundColor: '#FFFAFA',
          paddingTop: 0,
          paddingBottom: 0,
        }}
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
          // width: '100%',
          margin: 10,
        }}
        data-testid="protocol-column-wrapper"
      >
        {Records.map((items, index) => (
          <div
            key={React.key}
            ref={sectionRef ?? [index]}
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
                width: '100%',
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
                <Typography
                  style={{
                    fontSize: '1.5em',
                    fontweight: 'strong',
                  }}
                >
                  {items.source_file_section}
                  <div
                    style={{
                      paddingLeft: '90%',
                      marginTop: '-25px',
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <EyeShow />
                    <Pencil style={{ paddingLeft: '20px' }} />
                  </div>
                </Typography>
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
};
