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
import { getKeyFromEnrichText } from '../../../../utils/utilFunction';
import { EnrichedValue } from '../protocolSlice';
import enrichedTerms from './clinicalTerms.json';
import './MedicalTerm.scss';

function PreferredTerm({
  preferredTarget,
  expanded,
  preferredText,
  preferredTerms,
  linkId,
  docId,
}) {
  const wrapperRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  console.log('SHUBHAM11', preferredText);
  console.log('SHUBHAM112', preferredTerms);

  const [selectedTerm, setSelectedTerm] = useState(null);
  const [childTermValue, setChildTermValue] = useState(false);
  const [newTermValue, setNewTermValue] = useState('');
  const [preferredTermArr, setpreferredTermArr] = useState([]);

  const [showIcons, setShowIcons] = useState(false);
  const [selectedChild, setSelectedChild] = useState(false);
  const [deleteAll, setdeleteAll] = useState(false);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (preferredTerms && preferredText) {
      console.log('SHUBHAM113', preferredTerms[preferredText]?.preferred_term);
      setpreferredTermArr(['abc', 'bvc']);
    }
  }, [preferredText]);

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

  useEffect(() => {
    setAnchorEl(preferredTarget || null);
    if (!preferredTarget) setSelectedTerm(null);
  }, [preferredTarget]);

  useEffect(() => {
    setNewTermValue(childTermValue);
  }, [childTermValue]);

  useEffect(() => {
    if (!expanded) {
      setAnchorEl(null);
    }
  }, [expanded]);

  if (!expanded) {
    return null;
  }

  function handlePencilClick(selectedItem) {
    setShowIcons(true);
    setSelectedChild(selectedItem);
    // setChildTermValue(selectedItem);
    // childArr.forEach((value) => {
    //   if (value === selectedItem) {
    //     setSelectedChild(value);
    //   }
    // });
  }

  return (
    <div className="enriched-menu-wrapper" data-testId="medical-term">
      <Popper
        data-testId="childpopper"
        open={!!anchorEl}
        anchorEl={anchorEl}
        className="popper"
        placement="right-start"
        transition
      >
        <Card interactive className="sub-popper">
          {preferredTermArr.length > 0 && (
            <div className="terms-list" ref={wrapperRef}>
              {preferredTermArr?.map((item) => {
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
                              //   onClick={handleCancelClick}
                            />
                            <StatusCheck
                              className="save"
                              //   onClick={handleSave}
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
              //   handleDeleteTag();
              setshowModal(false);
            },
            size: 'small',
          },
        ]}
        id="deletetag"
      >
        <div>
          {`Are you sure you want to delete the tag "${childTermValue}" from the term "${preferredText}"`}
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
          {`Are you sure you want to delete the tag(s) from the term "${preferredText}"`}
        </div>
      </Modal>
    </div>
  );
}

export default PreferredTerm;

PreferredTerm.propTypes = {
  preferredTarget: PropTypes.isRequired,
  expanded: PropTypes.isRequired,
  preferredText: PropTypes.isRequired,
  preferredTerms: PropTypes.isRequired,
  linkId: PropTypes.isRequired,
  docId: PropTypes.isRequired,
};
