import { useEffect, useRef, useState } from 'react';
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
import MetaDataEditTable from './MetaDataEditTable';
import MetaDataTable from './MetaDataTable';
import './MetaData.scss';

function Accordian({
  standardList,
  accData,
  rows,
  suggestedSubList,
  isOpenSubText,
  setSuggestedSubList,
  setIsOpenSubText,
  setRows,
  handleAccordian,
  handleSave,
  handleDelete,
  handleEdit,
  updateRows,
  deleteRows,
  addSubAccordion,
  subAccComponent,
}) {
  const wrapperRef = useRef(null);
  const [isModal, setisModal] = useState(false);
  const [subSectionName, setSubSectionName] = useState(false);

  const handleChange = (event, newValue) => {
    setSubSectionName(newValue);
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       setIsOpenSubText(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [setIsOpenSubText, wrapperRef]);

  useEffect(() => {
    if (subSectionName) {
      addSubAccordion(subSectionName.label);
      setSuggestedSubList(
        suggestedSubList.filter((list) => list.label !== subSectionName.label),
      );
    }
    // eslint-disable-next-line
  }, [subSectionName]);
  return (
    <>
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
                  {accData?.level <= 5 && (
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
                  <Save
                    className="metadata-plus-size"
                    onClick={(e) => {
                      e.stopPropagation();
                      setisModal(true);
                    }}
                  />
                  {!standardList?.includes(accData?.name) && (
                    <Trash
                      className="metadata-plus-size mL"
                      onClick={handleDelete}
                    />
                  )}
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
          <div style={{ maxWidth: 400 }} ref={wrapperRef}>
            <AutocompleteV2
              label=""
              className="nameField"
              placeholder="Select or type sub-section name"
              source={suggestedSubList}
              fullWidth
              forcePopupIcon
              showClearIndicator
              value={subSectionName}
              onChange={handleChange}
              size="small"
            />
          </div>
        )}
        <AccordionDetails>
          {accData?.isEdit ? (
            <MetaDataEditTable
              updateRows={updateRows}
              rows={rows}
              setRows={setRows}
              data={accData}
              deleteRows={deleteRows}
            />
          ) : (
            // eslint-disable-next-line
            accData?._meta_data.length > 0 && (
              // eslint-disable-next-line
              <MetaDataTable metaData={accData?._meta_data} />
            )
          )}
          <div className="subAccContainer">{subAccComponent}</div>
        </AccordionDetails>
      </Accordion>
      <div className="modal">
        <Modal
          className="modal"
          open={isModal}
          onClose={() => setisModal(false)}
          // title="Header"
          title="Do You Really want to save it now or continue editing?"
          buttonProps={[
            { label: 'Continue Editing' },
            {
              label: 'save',
              onClick: (e) => {
                handleSave(e);
                setisModal(false);
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
  setIsOpenSubText: PropTypes.isRequired,
  setSuggestedSubList: PropTypes.isRequired,
  setRows: PropTypes.isRequired,
  handleAccordian: PropTypes.isRequired,
  handleSave: PropTypes.isRequired,
  handleDelete: PropTypes.isRequired,
  handleEdit: PropTypes.isRequired,
  updateRows: PropTypes.isRequired,
  deleteRows: PropTypes.isRequired,
  addSubAccordion: PropTypes.isRequired,
  subAccComponent: PropTypes.isRequired,
};

export default Accordian;
