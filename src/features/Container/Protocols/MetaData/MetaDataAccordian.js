import React, { useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Typography from 'apollo-react/components/Typography';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Card from 'apollo-react/components/Card/Card';
import Pencil from 'apollo-react-icons/Pencil';
import Save from 'apollo-react-icons/Save';
import MetadataTable from './MetaDataTable';
import './MetaData.scss';
import MetaDataEdit from './MetaDataEdit';

function MetaDataAccordian() {
  const accordianArray = [
    { name: 'Summary Fields', isEdit: false, isActive: false },
    { name: 'Patient Burden Variables', isEdit: false, isActive: false },
  ];

  const [accordianData, setAccordianData] = useState(accordianArray);

  const handleAccordian = (index) => {
    const accordianvalue = [...accordianData];
    console.log(accordianvalue[index].isActive);
    accordianvalue[index].isActive = !accordianvalue[index].isActive;
    setAccordianData(accordianvalue);
  };

  const handleEdit = (index, e) => {
    e.stopPropagation();
    const accordianvalue = [...accordianData];
    console.log(accordianvalue[index].isActive);
    accordianvalue[index].isEdit = true;
    accordianvalue[index].isActive = true;
    setAccordianData(accordianvalue);
  };

  const handleSave = (index, e) => {
    e.stopPropagation();
    const accordianvalue = [...accordianData];
    console.log(accordianvalue[index].isActive);
    // accordianvalue[index].isActive = false;
    accordianvalue[index].isEdit = false;
    setAccordianData(accordianvalue);
  };

  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      style={{ borderRight: '0' }}
    >
      <div className="panel-heading" data-testid="header">
        MetaData
      </div>
      {accordianData?.map((level1, index1) => {
        return (
          <div key={React.key} className="metadata_item">
            <Accordion expanded={level1.isActive}>
              <AccordionSummary onClick={() => handleAccordian(index1)}>
                <div className="accordion_summary_container">
                  <Typography>{level1.name}</Typography>
                  <div className="metadata-flex">
                    {level1?.isEdit ? (
                      <span data-testId="pencilIcon">
                        <Save
                          onClick={(e) => {
                            handleSave(index1, e);
                          }}
                        />
                      </span>
                    ) : (
                      <span data-testId="saveIcon">
                        <Pencil
                          onClick={(e) => {
                            handleEdit(index1, e);
                          }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                {level1?.isEdit ? <MetaDataEdit /> : <MetadataTable />}
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </Card>
  );
}

export default MetaDataAccordian;
