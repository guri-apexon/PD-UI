import InfoIcon from 'apollo-react-icons/Info';
import Button from 'apollo-react/components/Button';
import FieldGroup from 'apollo-react/components/FieldGroup';
import IconButton from 'apollo-react/components/IconButton';
import Modal from 'apollo-react/components/Modal';
import TextField from 'apollo-react/components/TextField';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enrichedData, Enrichedword, preferredData } from '../protocolSlice';
import './MedicalTerm.scss';
import { getHierarchyName } from '../CustomComponents/PDTable/utils';
import { preferredTermsValidation } from './utilFunction';
import { userId } from '../../../../store/userDetails';
import { CONTENT_TYPE } from '../../../../AppConstant/AppConstant';
import { removeHtmlTags } from '../../../../utils/utilFunction';

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
  const [ptErrorMsg, setPtErrorMsg] = useState('');
  let headerLinkId;
  const loggedInUserId = useSelector(userId);
  const enrichedContent = useSelector(enrichedData);
  const preferredContent = useSelector(preferredData);

  useEffect(() => {
    const selected = window.getSelection().toString();
    setSelectedText(selected);
    setIsTextSelected(selected.trim() !== '');
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

  const handlePreferredTerm = (e) => {
    const preferedText = selectedText?.trim();
    const msg = preferredTermsValidation(
      e.target.value,
      preferredContent?.data[preferedText]?.preferred_term,
    );
    setPtErrorMsg(msg);
    setPreferredTerm(e.target.value);
  };

  const getOntologyValue = (clinicalTermsData) => {
    if (selectedText) {
      if (isEmpty(clinicalTermsData?.ontology)) {
        return ontologyTerm;
      }
      if (isEmpty(ontologyTerm)) {
        return clinicalTermsData?.ontology;
      }
      return `${clinicalTermsData?.ontology},${ontologyTerm}`;
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
      if (isEmpty(clinicalTermsData?.preferred_term)) {
        return preferredTerm;
      }
      if (isEmpty(preferredTerm)) {
        return clinicalTermsData?.preferred_term;
      }
      return `${clinicalTermsData?.preferred_term},${preferredTerm}`;
    }

    return '';
  };

  const getClinicalTermValues = (clinicalTermsData) => {
    if (selectedText) {
      if (isEmpty(clinicalTermsData?.clinical_terms)) {
        return clinicalTerms;
      }
      if (isEmpty(clinicalTerms)) {
        return clinicalTermsData?.clinical_terms;
      }
      return `${clinicalTermsData?.clinical_terms},${clinicalTerms}`;
    }

    return '';
  };

  const handleAddTag = () => {
    const clinicalTermsData = enrichedContent?.data[selectedText];
    const type = wordSelector?.word?.type;
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
    if (clinicalTermsData && selectedText && type) {
      tagData = {
        standard_entity_name: selectedText.trim(),
        iqv_standard_term: getPreferredTermValue(clinicalTermsData),
        ontology: getOntologyValue(clinicalTermsData),
        clinical_terms: getClinicalTermValues(clinicalTermsData),
        text_len: selectedText.length,
        start: '0',
        confidence: '100',
        parent_id: wordSelector?.word?.font_info?.roi_id?.para,
        doc_id: docId,
        link_id: linkId,
        hierarchy: getHierarchyName(type),
        user_id: loggedInUserId,
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
        hierarchy: getHierarchyName(type),
        user_id: loggedInUserId,
      };
    }

    dispatch({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId,
        linkId,
        data: tagData,
        headerLinkId: wordSelector?.word?.type === 'header' ? headerLinkId : '',
      },
    });
    setClinicalTerms('');
    setOntologyTerm('');
    setPreferredTerm('');
    handleClose();
  };

  const showPreferredTermText = () => {
    const content = removeHtmlTags(wordSelector?.word?.content);

    if (
      wordSelector?.word?.type === CONTENT_TYPE?.HEADER &&
      content?.trim() === selectedText.trim()
    )
      return true;
    return false;
  };

  return (
    <div data-testId="add-tag">
      {isTextSelected && selectedText?.trim()?.length > 1 && (
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
              disabled: isTextFieldEmpty || ptErrorMsg,
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
              {wordSelector?.word?.type === CONTENT_TYPE?.HEADER && (
                <>
                  <IconButton color="primary">
                    <InfoIcon />
                  </IconButton>
                  Select header including index for Preferred Term tagging
                </>
              )}
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
            {showPreferredTermText() && (
              <TextField
                label="Preferred term"
                placeholder="Text area"
                onChange={handlePreferredTerm}
                value={preferredTerm}
                fullWidth
                data-testid="Preferred-term-text"
                helperText="Ex: cpt_primary_objective"
              />
            )}
            {ptErrorMsg && (
              <div className="iconbutton-warning">{ptErrorMsg}</div>
            )}
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
