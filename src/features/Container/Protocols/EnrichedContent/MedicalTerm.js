import ArrowRight from 'apollo-react-icons/ArrowRight';
import CloseCircle from 'apollo-react-icons/CloseCircle';
import Pencil from 'apollo-react-icons/Pencil';
import StatusCheck from 'apollo-react-icons/StatusCheck';
import Trash from 'apollo-react-icons/Trash';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Modal from 'apollo-react/components/Modal';
import Popper from 'apollo-react/components/Popper';
import TextField from 'apollo-react/components/TextField';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getKeyFromEnrichText from './utilFunction';
import { EnrichedValue, Enrichedword } from '../protocolSlice';
import enrichedTerms from './clinicalTerms.json';
import { userId } from '../../../../store/userDetails';
import './MedicalTerm.scss';

function MedicalTerm({
  enrichedTarget,
  expanded,
  enrichedText,
  clinicalTerms: clinicalTermsArray,
  linkId,
  docId,
}) {
  const wrapperRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [SanchorEl, setSAnchorEl] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [clinicalTermsArr, setClinicalTermsArr] = useState({});
  const [childTermValue, setChildTermValue] = useState(false);
  const [newTermValue, setNewTermValue] = useState('');
  const [clinicalTerms, setClinicalTerms] = useState([]);
  const [childArr, setChildArr] = useState([]);
  const dispatch = useDispatch();
  const apiFlagselector = useSelector(EnrichedValue);
  const [tempChild, setTempChild] = useState([]);
  const [showIcons, setShowIcons] = useState(false);
  const [selectedChild, setSelectedChild] = useState(false);
  const [deleteAll, setdeleteAll] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const wordSelector = useSelector(Enrichedword);
  const loggedInUserId = useSelector(userId);
  useEffect(() => {
    setClinicalTermsArr(clinicalTermsArray);
    // eslint-disable-next-line
  }, [clinicalTermsArray]);

  const handleClickOutside = (event) => {
    if (wrapperRef?.current && !wrapperRef?.current?.contains(event.target)) {
      setSelectedChild(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  function handlePencilClick(selectedItem) {
    setShowIcons(true);
    setChildTermValue(selectedItem);
    childArr.forEach((value) => {
      if (value === selectedItem) {
        setSelectedChild(value);
      }
    });
  }

  function handleCancelClick() {
    setShowIcons(false);
    setChildTermValue(null);
    setSelectedChild(false);
  }

  const handleDeleteTag = (value) => {
    const updatedChildArr = childArr.filter((item) => item !== value);
    setChildArr(updatedChildArr);
    const name = getKeyFromEnrichText(selectedTerm);
    const tempObj = {
      standard_entity_name: enrichedText,
      iqv_standard_term: clinicalTermsArr[enrichedText]?.preferred_term,
      clinical_terms: clinicalTermsArr[enrichedText]?.clinical_terms,
      ontology: clinicalTermsArr[enrichedText]?.ontology,
      confidence: '0',
      start: '0',
      text_len: '0',
      parent_id: wordSelector?.word?.font_info?.roi_id?.para,
      synonyms: clinicalTermsArr[enrichedText]?.synonyms,
      classification: clinicalTermsArr[enrichedText]?.classification,
      preferred_term: clinicalTermsArr[enrichedText]?.preferred_term,
      entity_class: '',
      entity_xref: '',
      user_id: loggedInUserId,
    };

    let updatedStringArr = tempObj[name]?.split(',');
    updatedStringArr = updatedStringArr?.filter((e) => e !== childTermValue);
    const saveValue = updatedStringArr?.toString();

    setTempChild(updatedStringArr);
    setSAnchorEl(null);

    const saveObj = {
      ...tempObj,
      [name]: saveValue,
    };
    dispatch({
      type: 'SAVE_ENRICHED_DATA',
      payload: {
        docId,
        linkId,
        opType: 'delete',
        data: saveObj,
      },
    });
  };

  const handleDelete = () => {
    if (!selectedTerm) return;
    if (clinicalTermsArr && selectedTerm) {
      const updatedClinicalTermsArrr = {
        ...clinicalTermsArr,
        [enrichedText]: {
          ...clinicalTermsArr[enrichedText],
          [selectedTerm]: '',
        },
      };
      setClinicalTermsArr(updatedClinicalTermsArrr);
      setChildArr([]);
      const name = getKeyFromEnrichText(selectedTerm);

      const tempObj = {
        standard_entity_name: enrichedText,
        iqv_standard_term: clinicalTermsArr[enrichedText]?.preferred_term,
        clinical_terms: clinicalTermsArr[enrichedText]?.clinical_terms,
        ontology: clinicalTermsArr[enrichedText]?.ontology,
        confidence: '0',
        start: '0',
        text_len: '0',
        synonyms: clinicalTermsArr[enrichedText]?.synonyms,
        parent_id: wordSelector?.word?.font_info?.roi_id?.para,
        classification: clinicalTermsArr[enrichedText]?.classification,
        preferred_term: '',
        entity_class: '',
        entity_xref: '',
        user_id: loggedInUserId,
      };

      setTempChild([]);
      const saveObj = {
        ...tempObj,
        [name]: '',
      };
      dispatch({
        type: 'SAVE_ENRICHED_DATA',
        payload: {
          docId,
          linkId,
          opType: 'delete',
          data: saveObj,
        },
      });
    }
  };

  useEffect(() => {
    if (apiFlagselector && clinicalTermsArr) {
      setChildArr(tempChild);
      const obj = {
        ...clinicalTermsArr,
        [enrichedText]: {
          ...clinicalTermsArr[enrichedText],
          [selectedTerm]: tempChild?.toString(),
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

  useEffect(() => {
    if (enrichedText) {
      setClinicalTerms([...enrichedTerms]);
    } else {
      setClinicalTerms([]);
      setSAnchorEl(null);
    }
    // eslint-disable-next-line
  }, [enrichedText, clinicalTermsArr]);

  useEffect(() => {
    if (
      clinicalTermsArr &&
      enrichedText &&
      selectedTerm &&
      clinicalTermsArr[enrichedText] &&
      clinicalTermsArr[enrichedText][selectedTerm]
    ) {
      const arr = clinicalTermsArr[enrichedText][selectedTerm].split(',');

      if (arr && arr.length === 1 && arr[0] === '') {
        setChildArr([]);
      } else {
        setChildArr(arr);
      }
    } else {
      setChildArr([]);
    }
    // eslint-disable-next-line
  }, [selectedTerm]);

  const handleSave = () => {
    setSelectedChild(false);
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
    setSelectedChild(false);
    setChildTermValue(null);
    const name = getKeyFromEnrichText(selectedTerm);
    const tempObj = {
      standard_entity_name: enrichedText,
      iqv_standard_term: clinicalTermsArr[enrichedText]?.preferred_term,
      clinical_terms: clinicalTermsArr[enrichedText]?.clinical_terms,
      ontology: clinicalTermsArr[enrichedText]?.ontology,
      confidence: '0',
      start: '0',
      text_len: '0',
      synonyms: clinicalTermsArr[enrichedText]?.synonyms,
      parent_id: wordSelector?.word?.font_info?.roi_id?.para,
      classification: clinicalTermsArr[enrichedText]?.classification,
      preferred_term: clinicalTermsArr[enrichedText]?.preferred_term,
      entity_class: '',
      entity_xref: '',
      user_id: loggedInUserId,
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
    <div className="enriched-menu-wrapper" data-testId="medical-term">
      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        placement="bottom-start"
        className="popper"
      >
        <Card interactive className="main-popper">
          <div className="terms-list" data-testId="term-list">
            {clinicalTerms.map((item) => {
              const isActive = selectedTerm === item.key;
              return (
                <li key={item}>
                  <Button
                    data-testId="listItem"
                    className="term-item"
                    onClick={(e) => {
                      setSelectedTerm(item.key);
                      setSAnchorEl(!SanchorEl ? e.currentTarget : null);
                      setNewTermValue(childTermValue);
                    }}
                    disabled={isEmpty(
                      clinicalTermsArr?.[enrichedText]?.[item.key],
                    )}
                  >
                    {item.value}
                    {isActive && childArr.length > 0 && SanchorEl && (
                      <ArrowRight />
                    )}
                  </Button>
                </li>
              );
            })}
          </div>
          <div className="delete-tag" data-testid="delete-tag-icon">
            <Button
              onClick={() => setdeleteAll(true)}
              disabled={isEmpty(childArr)}
            >
              Delete tag
            </Button>
          </div>
        </Card>
      </Popper>
      <Popper
        data-testId="childpopper"
        open={!!SanchorEl}
        anchorEl={SanchorEl}
        className="popper"
        placement="right-start"
        transition
      >
        <Card interactive className="sub-popper">
          {childArr.length > 0 && (
            <div className="terms-list" ref={wrapperRef}>
              {childArr?.map((item) => {
                return (
                  <li key={item}>
                    {selectedChild === item ? (
                      <div className="text-area" data-testId="edit-btn-term1">
                        <TextField
                          data-testid="input-term1"
                          value={newTermValue}
                          onChange={(event) =>
                            setNewTermValue(event.target.value)
                          }
                        />
                        {showIcons && (
                          <div className="icons" data-testId="edit-icons">
                            <CloseCircle
                              className="cancel"
                              data-testid="cancel-icon"
                              // eslint-disable-next-line react/jsx-no-bind
                              onClick={handleCancelClick}
                            />
                            <StatusCheck
                              className="save"
                              onClick={handleSave}
                              data-testid="save-icon"
                            />
                            <Trash
                              data-testid="delete-icon"
                              className="delete"
                              onClick={() => setshowModal(true)}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button value={item} className="term-item">
                        <span
                          className="sub-term-text"
                          data-testid="selected-item"
                        >
                          {item}
                        </span>
                        <Pencil
                          data-testid="pencil-icon"
                          className="edit-Icon"
                          onClick={() => {
                            handlePencilClick(item);
                          }}
                        />
                      </Button>
                    )}
                  </li>
                );
              })}
            </div>
          )}
        </Card>
      </Popper>
      <Modal
        disableBackdropClick
        open={showModal}
        variant="default"
        onClose={() => {
          setshowModal(false);
        }}
        buttonProps={[
          { size: 'small' },
          {
            label: 'Delete',
            onClick: () => {
              handleDeleteTag(childTermValue);
              setshowModal(false);
            },
            size: 'small',
          },
        ]}
        id="deletetag"
      >
        <div>
          {`Are you sure you want to delete the tag "${childTermValue}" from the term "${enrichedText}"`}
        </div>
      </Modal>
      <Modal
        disableBackdropClick
        open={deleteAll}
        variant="default"
        onClose={() => {
          setdeleteAll(false);
        }}
        buttonProps={[
          { size: 'small' },
          {
            label: 'Delete',
            onClick: () => {
              // eslint-disable-next-line
              handleDelete();
              setdeleteAll(false);
            },
            size: 'small',
          },
        ]}
        id="deletetag"
      >
        <div>
          {`Are you sure you want to delete the tag(s) from the term "${enrichedText}"`}
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
