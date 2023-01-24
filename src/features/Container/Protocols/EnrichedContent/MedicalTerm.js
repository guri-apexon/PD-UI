/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Modal from 'apollo-react/components/Modal';
import Popper from 'apollo-react/components/Popper';
import TextField from 'apollo-react/components/TextField';
import Pencil from 'apollo-react-icons/Pencil';
import ArrowRight from 'apollo-react-icons/ArrowRight';
// import CLINICAL_TERMS_DATA from './clinicalTerms.json';
import './MedicalTerm.scss';
// import { clinicalTerm } from '../protocolSlice';

function MedicalTerm({ enrichedTarget, expanded, sectionData }) {
  // const clinicalTermSelector = useSelector(clinicalTerm);
  // const dispatch = useDispatch();
  const [clinicalTerms, setclinicalTerms] = useState(sectionData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [SanchorEl, setSAnchorEl] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [childTermValue, setChildTermValue] = useState(false);
  const [newTermValue, setNewTermValue] = useState('');

  const childDataArr = () => {
    return clinicalTerms.find(
      (x) => x.sectionData.clinical_term === selectedTerm,
    )?.data;
  };
  const handleSave = () => {
    if (newTermValue === '') {
      return false;
    }
    if (!childTermValue || !selectedTerm) return false;
    setclinicalTerms((prevState) =>
      prevState.map((prev) => {
        if (prev.sectionData.clinical_term === selectedTerm) {
          return {
            ...prev,
            data: prev.data.map((x) =>
              x.sectiondata.clinical_term === childTermValue
                ? { ...x, label: newTermValue }
                : x,
            ),
          };
        }
        return prev;
      }),
    );
    setChildTermValue(null);
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
    }
  }, [expanded]);
  // useEffect(() => {
  //   dispatch({
  //     type: 'GET_CLINICAL_TERM',
  //   });
  // }, [clinicalTerms]);
  if (!expanded) {
    return null;
  }

  return (
    <div className="enriched-menu-wrapper" data-testId="term-list">
      <Popper open={!!anchorEl} anchorEl={anchorEl} placement="bottom-start">
        <Card interactive className="main-popper">
          <div className="terms-list">
            {clinicalTerms.map((item) => {
              const isActive =
                selectedTerm === item.sectionData.clinical_term &&
                item.data?.length;
              return (
                <li key={item.sectionData.clinical_term}>
                  <Button
                    data-testId="handleSave"
                    className="term-item"
                    onClick={(e) => {
                      setSelectedTerm(item.sectionData.clinical_term);
                      setSAnchorEl(!SanchorEl ? e.currentTarget : null);
                    }}
                  >
                    {item.sectionData.clinical_term}
                    {isActive && <ArrowRight />}
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
          <div className="terms-list">
            {childDataArr()?.map((item) => {
              return (
                <li key={item.sectiondata.clinical_term}>
                  <Button
                    value={item.sectiondata.clinical_term}
                    className="term-item"
                  >
                    <span className="sub-term-text">
                      {item.sectiondata.clinical_term}
                    </span>
                    <Pencil
                      className="edit-Icon"
                      onClick={() => {
                        setChildTermValue(item.sectiondata.clinical_term);
                      }}
                    />
                  </Button>
                </li>
              );
            })}
          </div>
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
  sectionData: PropTypes.isRequired,
};
