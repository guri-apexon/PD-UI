import InfoIcon from 'apollo-react-icons/Info';
import Button from 'apollo-react/components/Button';
import FieldGroup from 'apollo-react/components/FieldGroup';
import IconButton from 'apollo-react/components/IconButton';
import Modal from 'apollo-react/components/Modal';
import TextField from 'apollo-react/components/TextField';
import { isEmpty } from 'lodash';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Enrichedword, sectionDetails } from '../protocolSlice';
import './MedicalTerm.scss';

function AddClinicalTerm({ docId, linkId }) {
  // header_link_id
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState('');
  const wordSelector = useSelector(Enrichedword);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [clinicalTerms, setClinicalTerms] = useState('');
  const [ontologyTerm, setOntologyTerm] = useState('');
  const [preferredTerm, setPreferredTerm] = useState('');
  const [isTextFieldEmpty, setIsTextFieldEmpty] = useState(true);
  const sectionHeaderDetails = useSelector(sectionDetails);
  const { data: sectionData } = sectionHeaderDetails;
  let headerLinkId;

  useEffect(() => {
    const selected = window.getSelection().toString();
    setSelectedText(selected);
    setIsTextSelected(selected.trim() !== '');
    if (wordSelector?.word) {
      let level;
      if (wordSelector?.word.file_section_level === 1) {
        level = 'link_id';
      } else {
        // eslint-disable-next-line
        level = 'link_id_level' + wordSelector?.word.file_section_level;
      }

      headerLinkId = wordSelector?.word?.font_info[level];
      // console.log('SHUBHAM1234', wordSelector?.word?.font_info[level]);
      // console.log('SHUBHAM1234', wordSelector?.word);
      // console.log('SHUBHAM123', wordSelector?.word.file_section_level);
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
    if (!openModal) {
      setClinicalTerms('');
      setOntologyTerm('');
      setPreferredTerm('');
    }
  }, [clinicalTerms, ontologyTerm, preferredTerm, openModal, selectedText]);

  const getOntologyValue = (clinicalTermsData) => {
    if (selectedText) {
      if (isEmpty(clinicalTermsData[selectedText]?.ontology)) {
        return ontologyTerm;
      }
      if (isEmpty(ontologyTerm)) {
        return clinicalTermsData[selectedText]?.ontology;
      }
      return `${clinicalTermsData[selectedText]?.ontology},${ontologyTerm}`;
    }

    return '';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.modal') && !event.target.closest('.button')) {
        setIsTextSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getPreferredTermValue = (clinicalTermsData) => {
    if (selectedText) {
      if (isEmpty(clinicalTermsData[selectedText]?.preferred_term)) {
        return preferredTerm;
      }
      if (isEmpty(preferredTerm)) {
        return clinicalTermsData[selectedText]?.preferred_term;
      }
      return `${clinicalTermsData[selectedText]?.preferred_term},${preferredTerm}`;
    }

    return '';
  };

  const getHierarchyName = (type) => {
    if (isEqual(type, 'text')) {
      return 'paragraph';
    }
    if (isEqual(type, 'header')) {
      return 'header';
    }
    if (isEqual(type, 'table')) {
      return 'table';
    }
    return '';
  };

  const handleAddTag = () => {
    const result = sectionData?.[0]?.data?.filter(
      (item) =>
        item?.font_info?.roi_id?.para ===
        wordSelector?.word?.font_info?.roi_id?.para,
    );
    const clinicalTermsData = result[0]?.clinical_terms;
    let tagData;

    if (wordSelector?.word) {
      let level;
      if (wordSelector?.word.file_section_level === 1) {
        level = 'link_id';
      } else {
        // eslint-disable-next-line
        level = 'link_id_level' + wordSelector?.word.file_section_level;
      }

      headerLinkId = wordSelector?.word?.font_info[level];
    }
    if (clinicalTermsData && selectedText) {
      const keys = Object.keys(clinicalTermsData);
      if (keys.includes(selectedText)) {
        tagData = {
          standard_entity_name: selectedText.trim(),
          iqv_standard_term: getPreferredTermValue(clinicalTermsData),
          ontology: getOntologyValue(clinicalTermsData),
          clinical_terms: clinicalTerms,
          text_len: selectedText.length,
          start: '0',
          confidence: '100',
          parent_id: wordSelector?.word?.font_info?.roi_id?.para,
          doc_id: docId,
          link_id: linkId,
          hierarchy: getHierarchyName(result[0]?.type),
        };
      } else {
        tagData = {
          standard_entity_name: selectedText.trim(),
          iqv_standard_term: preferredTerm,
          ontology: ontologyTerm,
          clinical_terms: clinicalTerms,
          text_len: selectedText.length,
          start: '0',
          confidence: '100',
          parent_id: wordSelector?.word?.font_info?.roi_id?.para,
          doc_id: docId,
          link_id: linkId,
          hierarchy: getHierarchyName(result[0]?.type),
        };
      }
    } else {
      tagData = {
        standard_entity_name: selectedText.trim(),
        iqv_standard_term: preferredTerm,
        ontology: ontologyTerm,
        clinical_terms: clinicalTerms,
        text_len: selectedText.length,
        start: '0',
        confidence: '100',
        parent_id: wordSelector?.word?.font_info?.roi_id?.para,
        doc_id: docId,
        link_id: linkId,
        hierarchy: getHierarchyName(result[0]?.type),
      };
    }
    dispatch({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId,
        linkId,
        data: tagData,
        headerLinkId,
      },
    });
    setClinicalTerms('');
    setOntologyTerm('');
    setPreferredTerm('');
    handleClose();
  };

  return (
    <div data-testId="add-tag">
      {isTextSelected && selectedText?.trim() !== '' && (
        <Button
          id="my-button"
          className="button"
          variant="primary"
          size="small"
          onClick={() => handleOpen(selectedText)}
        >
          Add tag
        </Button>
      )}
      {openModal && selectedText?.trim() !== '' && (
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
      )}
    </div>
  );
}

export default AddClinicalTerm;
AddClinicalTerm.propTypes = {
  docId: PropTypes.isRequired,
  linkId: PropTypes.isRequired,
};
