import React, { useEffect, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Card from 'apollo-react/components/Card';

import AccordionDetails from 'apollo-react/components/AccordionDetails';

import AccordionSummary from 'apollo-react/components/AccordionSummary';

import Typography from 'apollo-react/components/Typography';
import Drag from 'apollo-react-icons/Drag';
import Records from './records.json';

const panels = () => {
  const ex = [];
  const arraylength = Records.length;
  for (let i = 0; i < arraylength; i++) {
    ex[i] = false;
  }
  return ex;
};

function Digitize() {
  const [expanded, setExpanded] = useState(panels);
  const allOpen = expanded.every((exp) => exp);

  //   const onClick = () => {
  //     setExpanded((oldPanels) => oldPanels.map(() => !allOpen));
  //   };

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

  return (
    <Card className="protocol-column">
      {/* <div style={{fontWeight:'bold', zIndex:999,padding:15,position:'fixed',backgroundColor:"#FFFAFA", paddingTop:0,paddingBottom:0,margin:'10px'}}>Digitized Data</div> */}

      <div
        style={{
          scrollPadding: '50px 0px 0px 50px',
          padding: '6px 16px',
          paddingTop: '20px',
          overflowY: 'scroll',
          height: '65vh',
          // width: '100%',
        }}
        data-testid="protocol-column-wrapper"
      >
        {Records.map((items, index) => (
          <div
            key={React.key}
            style={{
              listStyleType: 'none',
              display: 'flex',
              flexDirection: 'row',
              padding: '2px',
            }}
          >
            <Drag style={{ color: 'grey', fontSize: '1em', padding: '15px' }} />
            <Accordion
              expanded={expanded[index]}
              style={{ width: '100%', marginBottom: '4px' }}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                style={{
                  fontSize: '0.5em',
                }}
              >
                <Typography style={{ fontSize: '1.5em' }}>
                  {items.source_file_section}
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
