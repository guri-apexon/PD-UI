import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'apollo-react/components/Accordion';
import Modal from 'apollo-react/components/Modal';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Typography from 'apollo-react/components/Typography';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Pencil from 'apollo-react-icons/Pencil';
import Plus from 'apollo-react-icons/Plus';
import Save from 'apollo-react-icons/Save';
import Trash from 'apollo-react-icons/Trash';
import EyeShow from 'apollo-react-icons/EyeShow';
import MetaDataEditTable from './MetaDataEditTable';
import MetaDataTable from './MetaDataTable';
import './MetaData.scss';

function Accordian({
  standardList,
  accData,
  rows,
  suggestedSubList,
  isOpenSubText,
  deletedAttributes,
  setSuggestedSubList,
  setIsOpenSubText,
  setRows,
  handleAccordian,
  handleSave,
  handleDelete,
  handleEdit,
  addSubAccordion,
  subAccComponent,
  setDeletedAttributes,
}) {
  const [isModal, setIsModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [subSectionName, setSubSectionName] = useState(false);

  const handleChange = (event, newValue) => {
    console.log('handleChange', newValue, event.target.value);
    setSubSectionName(newValue);
  };

  useEffect(() => {
    if (subSectionName?.label) {
      addSubAccordion(subSectionName.label);
      setSuggestedSubList(
        suggestedSubList.filter((list) => list.label !== subSectionName.label),
      );
    }
    // eslint-disable-next-line
  }, [subSectionName]);

  const handlePlus = (e) => {
    e.stopPropagation();
    setIsOpenSubText(!isOpenSubText);
  };

  const handleSaveData = (e) => {
    e.stopPropagation();
    setIsDelete(false);
    setIsModal(true);
  };

  const handleTrash = (e) => {
    e.stopPropagation();
    setIsDelete(true);
    setIsModal(true);
  };

  return (
    <>
      <Accordion expanded={accData?.isActive}>
        <AccordionSummary
          data-testId="meta-item-accordion"
          onClick={handleAccordian}
        >
          <div className="accordion_summary_container">
            <Typography>{accData?.name}</Typography>
            <div className="metadata-flex">
              {accData?.isEdit ? (
                <>
                  {accData?.level <= 5 && (
                    <span
                      data-testId="metadataplus"
                      onClick={(e) => {
                        handlePlus(e);
                      }}
                      role="presentation"
                    >
                      <Plus className="metadata-plus-size mR" />
                    </span>
                  )}
                  <span
                    data-testId="metadatasave"
                    onClick={(e) => {
                      handleSaveData(e);
                    }}
                    role="presentation"
                  >
                    <Save className="metadata-plus-size" />
                  </span>
                  {!standardList?.includes(accData?.name) && (
                    <span
                      data-testId="metadata-trash"
                      onClick={(e) => {
                        handleTrash(e);
                      }}
                      onKeyDown
                      role="presentation"
                    >
                      <Trash className="metadata-plus-size mL" />
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span data-testId="eyeIcon">
                    <EyeShow style={{ paddingRight: '10px' }} />
                  </span>
                  <span data-testId="metadatapencil">
                    <Pencil
                      className="metadata-plus-size"
                      data-testid="handle-edit"
                      onClick={handleEdit}
                    />
                  </span>
                </>
              )}
            </div>
          </div>
        </AccordionSummary>
        {isOpenSubText && (
          <div data-testid="auto">
            <AutocompleteV2
              label=""
              className="nameField"
              placeholder="Select or type sub-section name"
              source={suggestedSubList}
              fullWidth
              forcePopupIcon
              data-testid="suggestion-field"
              showClearIndicator
              value={subSectionName}
              onChange={handleChange}
              inputProps={{ 'data-testid': 'customeform-AutoComplete' }}
              size="small"
            />
          </div>
        )}
        <AccordionDetails>
          {accData?.isEdit ? (
            <div data-testId="metadataEditTable">
              <MetaDataEditTable
                rows={rows}
                setRows={setRows}
                data={accData}
                deletedAttributes={deletedAttributes}
                setDeletedAttributes={setDeletedAttributes}
              />
            </div>
          ) : (
            // eslint-disable-next-line
            accData?._meta_data?.length > 0 && (
              // eslint-disable-next-line
              <MetaDataTable metaData={accData?._meta_data} />
            )
          )}
          <div className="subAccContainer">{subAccComponent}</div>
        </AccordionDetails>
      </Accordion>
      <div className="modal" data-testId="modal">
        <Modal
          className="modal"
          open={isModal}
          onClose={() => setIsModal(false)}
          title={
            isDelete
              ? 'Please confirm if you want to continue with deletion'
              : 'Do You Really want to save it now or continue editing?'
          }
          buttonProps={[
            {
              label: isDelete ? 'Cancel' : 'Continue Editing',
              'data-testid': 'update-term-field',
            },
            {
              label: isDelete ? 'Delete' : 'Save',
              'data-testid': 'save-term-field',
              onClick: (e) => {
                if (isDelete) {
                  handleDelete(e);
                } else {
                  handleSave(e);
                }
                setIsModal(false);
              },
            },
          ]}
          id="neutral"
        />
      </div>
    </>
  );
}

Accordian.propTypes = {
  standardList: PropTypes.isRequired,
  accData: PropTypes.isRequired,
  rows: PropTypes.isRequired,
  suggestedSubList: PropTypes.isRequired,
  isOpenSubText: PropTypes.isRequired,
  deletedAttributes: PropTypes.isRequired,
  setIsOpenSubText: PropTypes.isRequired,
  setSuggestedSubList: PropTypes.isRequired,
  setRows: PropTypes.isRequired,
  handleAccordian: PropTypes.isRequired,
  handleSave: PropTypes.isRequired,
  handleDelete: PropTypes.isRequired,
  handleEdit: PropTypes.isRequired,
  addSubAccordion: PropTypes.isRequired,
  subAccComponent: PropTypes.isRequired,
  setDeletedAttributes: PropTypes.isRequired,
};

export default Accordian;
