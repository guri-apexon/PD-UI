import InfoIcon from 'apollo-react-icons/Info';
import Button from 'apollo-react/components/Button';
import FieldGroup from 'apollo-react/components/FieldGroup';
import IconButton from 'apollo-react/components/IconButton';
import Modal from 'apollo-react/components/Modal';
import TextField from 'apollo-react/components/TextField';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Enrichedword } from '../protocolSlice';
import './MedicalTerm.scss';

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

  const handleOpen = (selectedText) => {
    setOpenModal(true);
    setSelectedText(selectedText);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setIsTextFieldEmpty(
      !clinicalTerms.trim() && !ontologyTerm.trim() && !preferredTerm.trim(),
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
        onClose={handleClose}
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
            onChange={(e) => setClinicalTerms(e.target.value)}
            value={clinicalTerms}
            fullWidth
            data-testid="clinicalTerms-text"
          />
          <TextField
            label="Ontology"
            placeholder="Text area"
            onChange={(e) => setOntologyTerm(e.target.value)}
            value={ontologyTerm}
            fullWidth
            data-testid="ontology-text"
          />
          <TextField
            label="Preferred term"
            placeholder="Text area"
            onChange={(e) => setPreferredTerm(e.target.value)}
            value={preferredTerm}
            fullWidth
            data-testid="Preferred-term-text"
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
