import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'apollo-react/components/Accordion';
import Typography from 'apollo-react/components/Typography';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import TextField from 'apollo-react/components/TextField';
import Pencil from 'apollo-react-icons/Pencil';
import Plus from 'apollo-react-icons/Plus';
import Save from 'apollo-react-icons/Save';
import MetaDataEditTable from './MetaDataEditTable';
import MetaDataTable from './MetaDataTable';

function Accordian({
  isMain,
  accData,
  metaDataList,
  isOpenSubText,
  sectionName,
  setSectionName,
  setIsOpenSubText,
  setMetaDataList,
  handleAccordian,
  handleSave,
  handleEdit,
  updateRows,
  addSubAccordion,
  subAccComponent,
}) {
  return (
    <Accordion expanded={accData.isActive}>
      <AccordionSummary
        data-testId="metadataAccordian"
        onClick={handleAccordian}
      >
        <div className="accordion_summary_container">
          <Typography>{accData.name}</Typography>
          <div className="metadata-flex">
            {accData?.isEdit ? (
              <>
                {isMain && (
                  <span data-testId="metadataplus">
                    <Plus
                      data-testId="metadataplus"
                      className="metadata-plus-size mR"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenSubText(!isOpenSubText);
                      }}
                    />
                  </span>
                )}
                <Save className="metadata-plus-size" onClick={handleSave} />
              </>
            ) : (
              <span data-testId="metadatapencil">
                <Pencil className="metadata-plus-size" onClick={handleEdit} />
              </span>
            )}
          </div>
        </div>
      </AccordionSummary>
      {isOpenSubText && (
        <div style={{ maxWidth: 400 }}>
          <TextField
            inputProps={{ 'data-testId': 'plusTextfield' }}
            label=""
            placeholder="Select or type sub-section name"
            className="nameField"
            fullWidth
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            onKeyPress={(e) => addSubAccordion(e, sectionName)}
            size="small"
          />
        </div>
      )}
      <AccordionDetails>
        {accData?.isEdit ? (
          <MetaDataEditTable
            updateRows={updateRows}
            metaDataList={metaDataList}
            setMetaDataList={setMetaDataList}
            data={accData}
          />
        ) : (
          <MetaDataTable metaData={accData?.metaData} />
        )}
        <div className="subAccContainer">{subAccComponent}</div>
      </AccordionDetails>
    </Accordion>
  );
}

Accordian.propTypes = {
  isMain: PropTypes.isRequired,
  accData: PropTypes.isRequired,
  metaDataList: PropTypes.isRequired,
  isOpenSubText: PropTypes.isRequired,
  sectionName: PropTypes.isRequired,
  setSectionName: PropTypes.isRequired,
  setIsOpenSubText: PropTypes.isRequired,
  setMetaDataList: PropTypes.isRequired,
  handleAccordian: PropTypes.isRequired,
  handleSave: PropTypes.isRequired,
  handleEdit: PropTypes.isRequired,
  updateRows: PropTypes.isRequired,
  addSubAccordion: PropTypes.isRequired,
  subAccComponent: PropTypes.isRequired,
};

export default Accordian;
