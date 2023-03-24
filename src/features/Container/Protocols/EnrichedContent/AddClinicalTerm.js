import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Modal from 'apollo-react/components/Modal';
import FieldGroup from 'apollo-react/components/FieldGroup';
import TextField from 'apollo-react/components/TextField';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import './MedicalTerm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Enrichedword } from '../protocolSlice';

function AddClinicalTerm({ docId, linkId }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState('');
  const wordSelector = useSelector(Enrichedword);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [clinicalTerms, setClinicalTerms] = useState('');
  const [ontologyTerm, setOntologyTerm] = useState('');
  const [preferredTerm, setPreferredTerm] = useState('');
  const [isTextFieldEmpty, setIsTextFieldEmpty] = useState(true);

  useEffect(() => {
    if (window.getSelection().toString()) {
      setIsTextSelected(wordSelector.modal);
    } else {
      setIsTextSelected(false);
    }
  }, [wordSelector]);

  const handleClinicalTermsChange = (event) => {
    setClinicalTerms(event.target.value);
  };

  const handleOntologyChange = (event) => {
    setOntologyTerm(event.target.value);
  };

  const handlePreferredTermChange = (event) => {
    setPreferredTerm(event.target.value);
  };

  const handleOpen = (selectedText) => {
    setOpenModal(true);
    setSelectedText(selectedText);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setIsTextFieldEmpty(
      clinicalTerms.trim().length === 0 &&
        ontologyTerm.trim().length === 0 &&
        preferredTerm.trim().length === 0,
    );
  }, [clinicalTerms, ontologyTerm, preferredTerm]);

  const handleAddTag = () => {
    const tagData = {
      standard_entity_name: selectedText,
      iqv_standard_term: preferredTerm,
      ontology: ontologyTerm,
      clinical_terms: clinicalTerms,
      text_len: selectedText.length,
      start: '0',
      confidence: '100',
      parent_id: wordSelector?.word?.font_info?.parent_id,
      doc_id: docId,
      link_id: linkId,
    };
    dispatch({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId,
        linkId,
        data: tagData,
      },
    });
    setClinicalTerms('');
    setOntologyTerm('');
    setPreferredTerm('');
    handleClose();
  };

  return (
    <div data-testId="add-tag">
      {isTextSelected ? (
        <Button
          id="my-button"
          className="button"
          variant="primary"
          onClick={() => handleOpen(window.getSelection().toString())}
        >
          Add tag
        </Button>
      ) : null}

      <Modal
        open={openModal}
        onClose={() => handleClose()}
        buttonProps={[
          {},
          {
            label: 'Add tag',
            onClick: handleAddTag,
            disabled: isTextFieldEmpty,
          },
        ]}
      >
        <FieldGroup
          className="fieldgroup"
          header={`Add term to selected term/phrase: "${selectedText}"`}
        >
          <div>
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
            At least one of these options are required to be filled to add tag
          </div>
          <TextField
            label="Clinical terms"
            placeholder="Text area"
            onChange={handleClinicalTermsChange}
            value={clinicalTerms}
            fullWidth
          />
          <TextField
            label="Ontology"
            placeholder="Text area"
            onChange={handleOntologyChange}
            value={ontologyTerm}
            fullWidth
          />
          <TextField
            label="Preferred term"
            placeholder="Text area"
            onChange={handlePreferredTermChange}
            value={preferredTerm}
            fullWidth
          />
        </FieldGroup>
      </Modal>
    </div>
  );
}

export default AddClinicalTerm;
AddClinicalTerm.propTypes = {
  docId: PropTypes.isRequired,
  linkId: PropTypes.isRequired,
};
