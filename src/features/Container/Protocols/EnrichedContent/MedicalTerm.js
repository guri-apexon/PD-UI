import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Modal from 'apollo-react/components/Modal';
import Popper from 'apollo-react/components/Popper';
import TextField from 'apollo-react/components/TextField';
import Pencil from 'apollo-react-icons/Pencil';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import enrichedTerms from './clinicalTerms.json';
import './MedicalTerm.scss';
import { EnrichedValue } from '../protocolSlice';
import {
  anchorElUtilsFun,
  apiFlagselectorUtilsFun,
  enrichedTextUtilsFun,
  expandedUtilsFun,
  handleSaveUtilsFun,
  restructingObjecttilsFun,
  selectedTermUtilsFun,
} from './utils';

function MedicalTerm({
  enrichedTarget,
  expanded,
  enrichedText,
  clinicalTerms: clinicalTermsArray,
  linkId,
  docId,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [SanchorEl, setSAnchorEl] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [clinicalTermsArr, setClinicalTermsArr] = useState();
  const [childTermValue, setChildTermValue] = useState(false);
  const [newTermValue, setNewTermValue] = useState('');
  const [clinicalTerms, setClinicalTerms] = useState([]);
  const [childArr, setChildArr] = useState([]);
  const [preferredTerm, setPreferredTerm] = useState();
  const [synonyms, setSynonyms] = useState();
  const [classification, setClassification] = useState();
  const [ontologyTemp, setOntologyTemp] = useState();
  const dispatch = useDispatch();
  const apiFlagselector = useSelector(EnrichedValue);
  const [tempChild, setTempChild] = useState();

  useEffect(() => {
    setClinicalTermsArr(clinicalTermsArray);
    // eslint-disable-next-line
  }, [clinicalTermsArray]);

  useEffect(() => {
    apiFlagselectorUtilsFun(
      apiFlagselector,
      clinicalTermsArr,
      setChildArr,
      tempChild,
      enrichedText,
      selectedTerm,
      setClinicalTermsArr,
      dispatch,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFlagselector]);

  const restructingObject = () => {
    restructingObjecttilsFun(
      clinicalTermsArr,
      enrichedText,
      setPreferredTerm,
      setSynonyms,
      setClassification,
      setOntologyTemp,
    );
  };

  useEffect(() => {
    enrichedTextUtilsFun(
      enrichedText,
      setClinicalTerms,
      enrichedTerms,
      restructingObject,
      setSAnchorEl,
    );
    // eslint-disable-next-line
  }, [enrichedText, clinicalTermsArr]);

  useEffect(() => {
    selectedTermUtilsFun(
      selectedTerm,
      clinicalTermsArr,
      enrichedText,
      setChildArr,
    );
    // eslint-disable-next-line
  }, [selectedTerm]);

  const handleSave = () => {
    handleSaveUtilsFun(
      newTermValue,
      childTermValue,
      selectedTerm,
      childArr,
      setTempChild,
      setChildTermValue,
      enrichedText,
      preferredTerm,
      classification,
      synonyms,
      ontologyTemp,
      dispatch,
      docId,
      linkId,
    );
  };

  useEffect(() => {
    setAnchorEl(enrichedTarget || null);
    if (!enrichedTarget) setSelectedTerm(null);
  }, [enrichedTarget]);

  useEffect(() => {
    setNewTermValue(childTermValue);
  }, [childTermValue]);

  useEffect(() => {
    expandedUtilsFun(expanded, setAnchorEl, setSAnchorEl);
  }, [expanded]);

  useEffect(() => {
    anchorElUtilsFun(anchorEl, setSAnchorEl);
  }, [anchorEl]);

  if (!expanded) {
    return null;
  }
  return (
    <div className="enriched-menu-wrapper" data-testId="term-list">
      <Popper open={!!anchorEl} anchorEl={anchorEl} placement="bottom-start">
        <Card interactive className="main-popper">
          <div className="terms-list">
            {clinicalTerms.map((item) => {
              const isActive = selectedTerm === item.key;
              return (
                <li key={item}>
                  <Button
                    data-testId="handleSave"
                    className="term-item"
                    onClick={(e) => {
                      setSelectedTerm(item.key);
                      setSAnchorEl(!SanchorEl ? e.currentTarget : null);
                    }}
                  >
                    {item.value}
                    {isActive && childArr.length > 0 && <ArrowRight />}
                  </Button>
                </li>
              );
            })}
          </div>
        </Card>
      </Popper>
      <Popper
        open={!!SanchorEl}
        anchorEl={SanchorEl}
        placement="right-start"
        transition
      >
        <Card interactive className="sub-popper">
          {childArr.length > 0 && (
            <div className="terms-list">
              {childArr?.map((item) => {
                return (
                  <li key={item}>
                    <Button value={item} className="term-item">
                      <span className="sub-term-text">{item}</span>
                      <Pencil
                        className="edit-Icon"
                        data-testid="update-term-trigger"
                        onClick={() => {
                          setChildTermValue(item);
                        }}
                      />
                    </Button>
                  </li>
                );
              })}
            </div>
          )}
        </Card>
      </Popper>
      <Modal
        disableBackdropClick
        open={childTermValue}
        variant="default"
        onClose={() => {
          setChildTermValue(null);
        }}
        title="Rename Clinical Term"
        buttonProps={[
          { size: 'small' },
          { label: 'Rename', onClick: handleSave, size: 'small' },
        ]}
        id="renameTermsModal"
      >
        <TextField
          size="small"
          fullWidth
          value={newTermValue}
          allowBlank="none"
          inputProps={{ 'data-testid': 'update-term-field' }}
          onChange={(e) => {
            setNewTermValue(e.target.value);
          }}
          placeholder="Enter clinical term name"
        />
      </Modal>
    </div>
  );
}

export default MedicalTerm;

MedicalTerm.propTypes = {
  enrichedTarget: PropTypes.isRequired,
  expanded: PropTypes.isRequired,
  enrichedText: PropTypes.isRequired,
  clinicalTerms: PropTypes.isRequired,
  linkId: PropTypes.isRequired,
  docId: PropTypes.isRequired,
};
