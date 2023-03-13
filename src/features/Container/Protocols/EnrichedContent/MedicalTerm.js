import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Modal from 'apollo-react/components/Modal';
import Popper from 'apollo-react/components/Popper';
import TextField from 'apollo-react/components/TextField';
import Pencil from 'apollo-react-icons/Pencil';
import CloseCircle from 'apollo-react-icons/CloseCircle';
import CheckboxChecked from 'apollo-react-icons/CheckboxChecked';
import Trash from 'apollo-react-icons/Trash';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import enrichedTerms from './clinicalTerms.json';
import './MedicalTerm.scss';
import { EnrichedValue } from '../protocolSlice';

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
  const [showIcons, setShowIcons] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setClinicalTermsArr(clinicalTermsArray);
    // eslint-disable-next-line
  }, [clinicalTermsArray]);
  function handlePencilClick(selectedItem) {
    setShowIcons(true);
    if (childTermValue !== selectedItem) {
      setNewTermValue(selectedItem);
      setEditMode(true); // Enable edit mode when the pencil is clicked
    } else {
      setChildTermValue(null);
    }
  }
  function handleCancelClick() {
    setShowIcons(false);
    setChildTermValue(null);
  }

  const handleDeleteTag = (value) => {
    const result = childArr.filter((item) => item !== value);
    setChildArr(result);
  };

  useEffect(() => {
    if (apiFlagselector && clinicalTermsArr) {
      setChildArr(tempChild);
      const obj = {
        [enrichedText]: {
          ...clinicalTermsArr[enrichedText],
          [selectedTerm]: tempChild.toString(),
        },
      };
      setClinicalTermsArr(obj);
      dispatch({
        type: 'GET_ENRICHED_API',
        payload: { flag: false },
      });
    }
    // eslint-disable-next-line
  }, [apiFlagselector]);

  const restructingObject = () => {
    if (clinicalTermsArr) {
      Object.entries(clinicalTermsArr[enrichedText] || {}).forEach(
        (key, value) => {
          if (key === 'preferred_term') {
            setPreferredTerm(value);
          }
          if (key === 'synonyms') {
            setSynonyms(value);
          }
          if (key === 'classification') {
            setClassification(value);
          }
          if (key === 'ontology') {
            setOntologyTemp(value);
          }
        },
      );
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
    if (selectedTerm && clinicalTermsArr) {
      const arr = clinicalTermsArr[enrichedText][selectedTerm]?.split(',');
      if (arr && arr.length === 1 && arr[0] === '') {
        setChildArr([]);
      } else {
        setChildArr(arr);
      }
    }
    // eslint-disable-next-line
  }, [selectedTerm]);

  const handleSave = () => {
    if (newTermValue === '') {
      return false;
    }

    if (!childTermValue || !selectedTerm) return false;
    const temp = [...childArr];

    const newArr = temp.map((x) => {
      if (x === childTermValue) {
        return newTermValue;
      }
      return x;
    });
    setTempChild(newArr);
    setShowIcons(false);
    setChildTermValue(null);
    let name;
    if (selectedTerm === 'synonyms') name = 'entity_xref';
    else if (selectedTerm === 'classification') name = 'entity_class';
    else if (selectedTerm === 'preferred_term') name = 'iqv_standard_term';
    else if (selectedTerm === 'ontology') name = 'ontology';
    const tempObj = {
      standard_entity_name: enrichedText,
      iqv_standard_term: preferredTerm,
      entity_class: classification,
      entity_xref: synonyms,
      ontology: ontologyTemp,
    };
    const saveObj = { ...tempObj, [name]: newArr.toString() };

    dispatch({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId,
        linkId,
        data: saveObj,
      },
    });

    return true;
  };

  useEffect(() => {
    setAnchorEl(enrichedTarget || null);
    if (!enrichedTarget) setSelectedTerm(null);
  }, [enrichedTarget]);

  useEffect(() => {
    setNewTermValue(childTermValue);
  }, [childTermValue]);

  useEffect(() => {
    if (!expanded) {
      setAnchorEl(null);
      setSAnchorEl(null);
    }
  }, [expanded]);

  useEffect(() => {
    if (!anchorEl) {
      setSAnchorEl(null);
    }
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
                      setSAnchorEl(e.currentTarget);
                    }}
                  >
                    {item.value}
                    {isActive && childArr.length > 0 && <ArrowRight />}
                  </Button>
                </li>
              );
            })}
          </div>
          <div className="delete-tag">
            <Button onClick={() => handleDeleteTag()}>Delete tag</Button>
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
                      {!showIcons && (
                        <Pencil
                          className="edit-Icon"
                          data-testid="update-term-trigger"
                          onClick={() => {
                            handlePencilClick(item);
                          }}
                        />
                      )}
                      {showIcons && (
                        <div>
                          {editMode ? (
                            <TextField
                              value={newTermValue}
                              onChange={(event) =>
                                setNewTermValue(event.target.value)
                              }
                              onBlur={() => setEditMode(false)}
                            />
                          ) : (
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => handlePencilClick(item)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  handlePencilClick(item);
                                }
                              }}
                            >
                              {item}
                            </div>
                          )}

                          <CloseCircle
                            className="cancel"
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={handleCancelClick}
                          />
                          <CheckboxChecked
                            className="save"
                            onClick={handleSave}
                          />
                          <Trash
                            className="delete"
                            onClick={() => setChildTermValue(item)}
                          />
                        </div>
                      )}
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
        buttonProps={[
          { size: 'small' },
          {
            label: 'Delete',
            onClick: handleDeleteTag,

            size: 'small',
          },
        ]}
        id="deletetag"
      >
        <div>
          {`Are you sure you want to delete the tag " " from the term "${enrichedText}"`}
        </div>
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
