/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import Typography from 'apollo-react/components/Typography';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Card from 'apollo-react/components/Card/Card';
import Pencil from 'apollo-react-icons/Pencil';
import Save from 'apollo-react-icons/Save';
import Plus from 'apollo-react-icons/Plus';
import { useSelector } from 'react-redux';
import MetadataTable from './MetaDataTable';
import './MetaData.scss';
import MetaDataEdit from './MetaDataEdit';
import { metaDataVariable } from '../protocolSlice';

function MetaData() {
  const [accordianData, setAccordianData] = useState();
  const metaDataSelector = useSelector(metaDataVariable);
  useEffect(() => {
    setAccordianData(metaDataSelector);
  }, [metaDataSelector]);

  const handleAccordian = (index) => {
    // const accordianvalue = [...accordianData];
    const accordianvalue = JSON.parse(JSON.stringify(accordianData));
    accordianvalue[index].isActive = true;
    accordianvalue[index].isEdit = false;
    setAccordianData(accordianvalue);
  };

  const handleEdit = (index, e) => {
    e.stopPropagation();
    const accordianvalue = JSON.parse(JSON.stringify(accordianData));
    accordianvalue[index].isEdit = true;
    accordianvalue[index].isActive = true;
    setAccordianData(accordianvalue);
  };

  const handleSave = (index, e) => {
    e.stopPropagation();
    const accordianvalue = JSON.parse(JSON.stringify(accordianData));
    console.log(accordianvalue[index].isActive);
    accordianvalue[index].isEdit = false;
    setAccordianData(accordianvalue);
  };

  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="metadata-accordian"
    >
      <div className="panel-heading ">
        <div className="metadat-flex-plus"> Metadata </div>
        <div className="metadata-flex metadata-plus-icon">
          <Plus size="small" className="metadata-plus-size " />
        </div>
      </div>
      <div className="metaData-boarder">
        {accordianData?.map((level1, index1) => {
          return (
            <div key={React.key} className="metadata_item">
              <Accordion>
                <AccordionSummary
                  data-testId="metadataAccordian"
                  onClick={() => handleAccordian(index1)}
                >
                  <div className="accordion_summary_container">
                    <Typography>{level1.name}</Typography>
                    <div className="metadata-flex">
                      {level1?.isEdit ? (
                        <span
                          data-testId="metasaveIcon"
                          onClick={(e) => {
                            handleSave(index1, e);
                          }}
                        >
                          <Save className="metadata-plus-size" />
                        </span>
                      ) : (
                        <span
                          data-testId="metapencilIcon"
                          onClick={(e) => {
                            handleEdit(index1, e);
                          }}
                        >
                          <Pencil className="metadata-plus-size" />
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  <div className="section-single-content">
                    {level1?.isEdit ? (
                      <MetaDataEdit />
                    ) : (
                      <MetadataTable metaData={level1.metaData} />
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default MetaData;
