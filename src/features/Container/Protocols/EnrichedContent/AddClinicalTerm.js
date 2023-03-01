import { useState, useEffect } from 'react';
import Button from 'apollo-react/components/Button';
import Modal from 'apollo-react/components/Modal';
import FieldGroup from 'apollo-react/components/FieldGroup';
import TextField from 'apollo-react/components/TextField';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import './MedicalTerm.scss';

function AddClinicalTerm() {
  const [state, setState] = useState(false);
  const [text, setText] = useState('');
  const [isTextSelected, setIsTextSelected] = useState(false);

  const handleOpen = (variant) => {
    setState({ ...state, [variant]: true });
  };

  const handleClose = (variant) => {
    setState({ ...state, [variant]: false });
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // Handle form submission here
  // }
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

  return (
    <div>
      {isTextSelected ? (
        <Button
          id="my-button"
          className="button-style"
          variant="primary"
          onClick={() => handleOpen('neutral')}
        >
          Add tag
        </Button>
      ) : null}

      <Modal
        open={state.neutral}
        onClose={() => handleClose('neutral')}
        buttonProps={[{}, { label: 'Add tag', disabled: !isTextAreaFilled }]}
        id="neutral"
      >
        <FieldGroup
          header="Add term to selected term/phrase"
          style={{ maxWidth: 540 }}
        >
          <div>
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
            Atleast one of these options are required to be filled to add tag
          </div>
          <TextField
            label="Synonyms"
            placeholder="Text area"
            onChange={handleTextChange}
            fullWidth
          />
          <TextField
            label="Clinical terms"
            placeholder="Text area"
            onChange={handleTextChange}
            fullWidth
          />
          <TextField
            label="Ontology"
            placeholder="Text area"
            onChange={handleTextChange}
            fullWidth
          />
          <TextField
            label="Preffered term"
            placeholder="Text area"
            onChange={handleTextChange}
            fullWidth
          />
          <TextField
            label="Class"
            placeholder="Text area"
            onChange={handleTextChange}
            fullWidth
          />
        </FieldGroup>
      </Modal>
    </div>
  );
}
export default AddClinicalTerm;
