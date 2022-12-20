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
import MultilineEdit from './Digitized_edit';

const EditHarddata =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

// import { userRole } from '../../../../AppConstant/AppConstant';

function Digitize({ sectionNumber, sectionRef, data }) {
  const panels = () => {
    const ex = [];
    const arraylength = Records.length;
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

  const [expanded, setExpanded] = useState(panels);
  const allOpen = expanded.every((exp) => exp);
  const handleChange = (panelIndex) => () => {
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
    <Card
      className="protocol-column protocol-digitize-column"
      style={{ borderRight: '0' }}
    >
      <div className="panel-heading">Digitized Data</div>
      <div
        className="digitize-panel-content"
        data-testid="protocol-column-wrapper"
      >
        {Records.map((items, index) => (
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
                      {data.userPrimaryRoleFlag === true ? null : (
                        <Pencil
                          Onclick={() => setEditFlag(true)}
                          style={{ paddingLeft: '20px' }}
                        />
                      )}
                      {/* <Pencil style={{ paddingLeft: '20px' }} /> */}
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {data.userPrimaryRoleFlag === true ? (
                      EditHarddata
                    ) : (
                      <MultilineEdit
                        editFlag={editFlag}
                        getedited={getedited}
                      />
                    )}
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
  data: PropTypes.isRequired,
};
