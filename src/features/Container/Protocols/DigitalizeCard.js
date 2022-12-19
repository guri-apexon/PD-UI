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

function Digitize({ sectionNumber, sectionRef, handlePageRight }) {
  const panels = () => {
    const ex = [];
    const arraylength = Records.length;
    for (let i = 0; i < arraylength; i++) {
      ex[i] = false;
    }
    return ex;
  };
  const [expanded, setExpanded] = useState(panels);

  const handleChange = (panelIndex, items) => () => {
    handlePageRight(items.page);
    setExpanded((oldPanels) => {
      const newPanels = [...oldPanels];
      for (let i = 0; i < newPanels.length; i++) {
        if (i !== panelIndex) {
          newPanels[i] = false;
        }
      }
      newPanels[panelIndex] = !newPanels[panelIndex];

      return newPanels;
    });
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
      handleClick(sectionNumber);
    }
  }, [sectionNumber]);

  return (
    <Card
      className="protocol-column protocol-digitize-column"
      style={{ borderRight: '0' }}
    >
      <div className="panel-heading">Digitized Data</div>
      <div
        className="digitize-panel-content"
        // style={{
        //   scrollPadding: '50px 0px 0px 50px',
        //   padding: '6px 16px',
        //   paddingTop: '20px',
        //   overflowY: 'scroll',
        //   height: '65vh',
        //   position: 'fixed',
        //   margin: 10,
        // }}
        data-testid="protocol-column-wrapper"
      >
        {Records.map((items, index) => (
          <div key={React.key} className="digitized_data_item">
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
                ref={sectionRef[index]}
                onChange={handleChange(index, items)}
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
                      {items?.source_file_section}
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
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
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
  handlePageRight: PropTypes.isRequired,
};
