import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Modal from 'apollo-react/components/Modal';
import FieldGroup from 'apollo-react/components/FieldGroup';
import TextField from 'apollo-react/components/TextField';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import './MedicalTerm.scss';
import { useDispatch } from 'react-redux';

function AddClinicalTerm({ docId }) {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [clinicalTerms, setClinicalTerms] = useState('');
  const [ontologyTerm, setOntologyTerm] = useState('');
  const [preferredTerm, setPreferredTerm] = useState('');

  const handleClinicalTermsChange = (event) => {
    setClinicalTerms(event.target.value);
    setText(event.target.value);
  };

  const handleOntologyChange = (event) => {
    setOntologyTerm(event.target.value);
    setText(event.target.value);
  };

  const handlePreferredTermChange = (event) => {
    setPreferredTerm(event.target.value);
    setText(event.target.value);
  };

  const handleOpen = (variant, selectedText) => {
    setState({ ...state, [variant]: true });
    setSelectedText(selectedText);
  };

  const handleClose = (variant) => {
    setState({ ...state, [variant]: false });
  };

  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString();
    setIsTextSelected(selectedText.length > 0);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  const isTextAreaFilled = text.trim().length > 0;
  const isAddTagButtonDisabled = !isTextAreaFilled;
  const handleAddTag = () => {
    const tagData = {
      standard_entity_name: selectedText,
      iqv_standard_term: preferredTerm,
      ontology: ontologyTerm,
      clinical_terms: clinicalTerms,
    };
    dispatch({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId,
        data: tagData,
      },
    });
    handleClose('neutral');
  };

  return (
    <div>
      {isTextSelected ? (
        <Button
          id="my-button"
          className="button-style"
          variant="primary"
          onClick={() =>
            handleOpen('neutral', window.getSelection().toString())
          }
        >
          Add tag
        </Button>
      ) : null}

      <Modal
        open={state.neutral}
        onClose={() => handleClose('neutral')}
        buttonProps={[
          {},
          {
            label: 'Add tag',
            disabled: isAddTagButtonDisabled,
            onClick: handleAddTag,
          },
        ]}
        id="neutral"
      >
        <FieldGroup
          header={`Add term to selected term/phrase: "${selectedText}"`}
          style={{ maxWidth: 540 }}
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
};