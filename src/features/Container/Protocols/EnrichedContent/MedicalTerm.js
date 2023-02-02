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

    setChildArr(newArr);
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
