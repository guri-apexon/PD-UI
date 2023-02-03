import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Modal from 'apollo-react/components/Modal';
import Popper from 'apollo-react/components/Popper';
import TextField from 'apollo-react/components/TextField';
import Pencil from 'apollo-react-icons/Pencil';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import enrichedTerms from './clinicalTerms.json';
import './MedicalTerm.scss';

function MedicalTerm({
  enrichedTarget,
  expanded,
  enrichedText,
  clinicalTerms: clinicalTermsArr,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [SanchorEl, setSAnchorEl] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [childTermValue, setChildTermValue] = useState(false);
  const [newTermValue, setNewTermValue] = useState('');
  const [clinicalTerms, setClinicalTerms] = useState([]);
  const [childArr, setChildArr] = useState([]);
  const [preferredTerm, setPreferredTerm] = useState();
  const [medicalterm, setMedicalterm] = useState();
  const [synonyms, setSynonyms] = useState();
  const [classification, setClassification] = useState();
  const [ontologyTemp, setOntologyTemp] = useState();

  console.log('enrichedTarget', enrichedTarget);
  console.log('enrichedText', enrichedText);
  console.log('clinicalTermsArr', clinicalTermsArr);

  const restructingObject = () => {
    console.log('teheye', Object.keys(clinicalTermsArr[enrichedText]));
    // console.log(
    //   'clinicalTermsArr baher',
    //   Object.keys(clinicalTermsArr[enrichedText])[0],
    // );
    for (
      let i = 0;
      i < Object.keys(clinicalTermsArr[enrichedText]).length;
      i++
    ) {
      console.log('for loop', Object.keys(clinicalTermsArr[enrichedText])[i]);
      if (Object.keys(clinicalTermsArr[enrichedText])[i] === 'preferred_term') {
        setPreferredTerm(Object.values(clinicalTermsArr[enrichedText])[i]);
      }
      if (Object.keys(clinicalTermsArr[enrichedText])[i] === 'synonyms') {
        setSynonyms(Object.values(clinicalTermsArr[enrichedText])[i]);
      }
      if (Object.keys(clinicalTermsArr[enrichedText])[i] === 'classification') {
        console.log('classification');
        setClassification(Object.values(clinicalTermsArr[enrichedText])[i]);
      }
      if (Object.keys(clinicalTermsArr[enrichedText])[i] === 'ontology') {
        setOntologyTemp(Object.values(clinicalTermsArr[enrichedText])[i]);
      }
      if (Object.keys(clinicalTermsArr[enrichedText])[i] === 'medical_term') {
        setMedicalterm(Object.values(clinicalTermsArr[enrichedText])[i]);
      }
    }
  };

  useEffect(() => {
    if (enrichedText) {
      setClinicalTerms([...enrichedTerms]);
      restructingObject();
    } else {
      setClinicalTerms([]);
      setSAnchorEl(null);
    }
    // eslint-disable-next-line
  }, [enrichedText, clinicalTermsArr]);

  useEffect(() => {
    if (selectedTerm) {
      const arr = clinicalTermsArr[enrichedText][selectedTerm]?.split(',');
      if (arr && arr.length === 1 && arr[0] === '') {
        setChildArr([]);
      } else {
        setChildArr(arr);
      }
    }
    // eslint-disable-next-line
  }, [selectedTerm]);
  console.log('SelectedTerm', selectedTerm);

  const handleSave = () => {
    if (newTermValue === '') {
      return false;
    }
    console.log('newTermValue', newTermValue);

    console.log('enrichedText save', enrichedText);
    if (!childTermValue || !selectedTerm) return false;
    const temp = [...childArr];

    const newArr = temp.map((x) => {
      if (x === childTermValue) {
        return newTermValue;
      }
      return x;
    });
    console.log('NewARR', newArr);
    setChildArr(newArr);
    setChildTermValue(null);
    // const clinicalTermSave = [...clinicalTermsArr];
    // console.log('clinicalTermSave', clinicalTermSave);

    let name;
    if (selectedTerm === 'synonyms') name = 'entity_xref';
    else if (selectedTerm === 'classification') name = 'entity_class';
    else if (selectedTerm === 'preferred_term') name = 'iqv_standard_term';
    const tempObj = {
      standard_entity_name: enrichedText,
      iqv_standard_term: preferredTerm,
      entity_class: classification,
      entity_xref: synonyms,
      ontology: ontologyTemp,
    };
    const saveObj = { ...tempObj, [name]: newArr.toString() };
    console.log('saveObj', saveObj);
    return true;
  };

  useEffect(() => {
    setAnchorEl(enrichedTarget || null);
    if (!enrichedTarget) setSelectedTerm(null);
  }, [enrichedTarget]);

  useEffect(() => {
    setNewTermValue(childTermValue);
  }, [childTermValue]);

  console.log('NewTermValue', newTermValue);
  console.log('clinicalTerms', clinicalTerms);
  useEffect(() => {
    if (!expanded) {
      setAnchorEl(null);
      setSAnchorEl(null);
    }
  }, [expanded]);

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
};
