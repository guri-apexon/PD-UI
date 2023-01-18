import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'apollo-react/components/Accordion';
import Typography from 'apollo-react/components/Typography';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Pencil from 'apollo-react-icons/Pencil';
import Plus from 'apollo-react-icons/Plus';
import Save from 'apollo-react-icons/Save';
import MetaDataEditTable from './MetaDataEditTable';
import MetaDataTable from './MetaDataTable';

function Accordian({
  accData,
  metaDataList,
  setMetaDataList,
  handleAccordian,
  handleSave,
  handleEdit,
  updateRows,
  addSubAccordion,
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
                <Plus
                  className="metadata-plus-size"
                  onClick={addSubAccordion}
                />
                <Save className="metadata-plus-size" onClick={handleSave} />
              </>
            ) : (
              <Pencil className="metadata-plus-size" onClick={handleEdit} />
            )}
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        {accData?.isEdit ? (
          <MetaDataEditTable
            updateRows={updateRows}
            metaDataList={metaDataList}
            setMetaDataList={setMetaDataList}
            data={accData}
          />
        ) : (
          <MetaDataTable tableData={accData?.tableData} />
        )}
      </AccordionDetails>
    </Accordion>
  );
}

Accordian.propTypes = {
  accData: PropTypes.isRequired,
  metaDataList: PropTypes.isRequired,
  setMetaDataList: PropTypes.isRequired,
  handleAccordian: PropTypes.isRequired,
  handleSave: PropTypes.isRequired,
  handleEdit: PropTypes.isRequired,
  updateRows: PropTypes.isRequired,
  addSubAccordion: PropTypes.isRequired,
};

export default Accordian;
