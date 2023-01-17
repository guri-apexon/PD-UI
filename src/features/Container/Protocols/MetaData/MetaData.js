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
import MetadataTable from './MetaDataTable';
import './MetaData.scss';
import initialRows from './Records.json';
import MetaDataEdit from './MetaDataEdit';
import MetaDataEditTable from './MetaDataEditTable';
import CustomForm from './CustomForm';

function MetaData() {
  const accordianArray = [
    { name: 'Summary Fields', isEdit: false, isActive: false },
    { name: 'Patient Burden Variables', isEdit: false, isActive: false },
  ];

  useEffect(() => {}, []);

  const [accordianData, setAccordianData] = useState(accordianArray);
  const [rows, setRows] = useState(initialRows);
  const [metaDataList, setMetaDataList] = useState([]);

  const handleAccordian = (index) => {
    const accordianvalue = [...accordianData];
    accordianvalue[index].isActive = !accordianvalue[index].isActive;
    accordianvalue[index].isEdit = false;
    setAccordianData(accordianvalue);
  };

  const handleEdit = (index, e) => {
    e.stopPropagation();
    const accordianvalue = [...accordianData];
    accordianvalue[index].isEdit = true;
    accordianvalue[index].isActive = true;
    setAccordianData(accordianvalue);
  };

  const handleSave = (index, e) => {
    e.stopPropagation();
    setAccordianData(
      accordianData.map((acc, i) => {
        if (index === i) {
          return {
            ...acc,
            isEdit: false,
            rows: [...rows, ...metaDataList],
          };
        }
        return acc;
      }),
    );
    setMetaDataList([]);
  };

  // console.log('accordianData', accordianData);
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
              <Accordion expanded={level1.isActive}>
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
                  {level1?.isEdit ? (
                    <>
                      {/* <MetaDataEdit /> */}
                      <MetaDataEditTable
                        rows={rows}
                        setRows={setRows}
                        metaDataList={metaDataList}
                        setMetaDataList={setMetaDataList}
                      />
                    </>
                  ) : (
                    <MetadataTable accname={level1.name} />
                  )}
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
