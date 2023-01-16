import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Modal from 'apollo-react/components/Modal';
import Popper from 'apollo-react/components/Popper';
import TextField from 'apollo-react/components/TextField';
import Pencil from 'apollo-react-icons/Pencil';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import './MedicalTerm.scss';

const clinicalTermsMockData = [
  {
    value: 'Synonims',
    termLabel: 'Synonims',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
  {
    value: 'Clinical Terms',
    termLabel: 'Clinical Terms',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
  {
    value: 'Ontology',
    termLabel: 'Ontology',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
  {
    value: 'Prefered Term',
    termLabel: 'Preferred Term',
    data: [{ label: 'Euismod' }, { label: 'Molestie' }, { label: 'Luptatum' }],
  },
  {
    value: 'Classification',
    termLabel: 'Classification',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
];
function MedicalTerm({ enrichedTarget, expanded }) {
  const [clinicalTerms, setclinicalTerms] = useState(clinicalTermsMockData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [SanchorEl, setSAnchorEl] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [childTermValue, setChildTermValue] = useState(false);
  const [newTermValue, setNewTermValue] = useState('');

  const childDataArr = () => {
    return clinicalTerms.find((x) => x.termLabel === selectedTerm)?.data;
  };
  const handleSave = () => {
    if (newTermValue === '') {
      return false;
    }
    if (!childTermValue || !selectedTerm) return false;
    setclinicalTerms((prevState) =>
      prevState.map((prev) => {
        if (prev.termLabel === selectedTerm) {
          return {
            ...prev,
            data: prev.data.map((x) =>
              x.label === childTermValue ? { ...x, label: newTermValue } : x,
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
  if (!expanded) {
    return null;
  }

  return (
    <div className="enriched-menu-wrapper" data-testId="Termlist">
      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        placement="bottom-start"
        onClick={(e) => e.stopPropagation()}
      >
        <Card interactive className="main-popper">
          <div className="terms-list">
            {clinicalTerms.map((item) => {
              const isActive =
                selectedTerm === item.termLabel && item.data?.length;
              return (
                <li key={item.termLabel}>
                  <Button
                    data-testId="handleSave"
                    className="term-item"
                    onClick={(e) => {
                      setSelectedTerm(item.termLabel);
                      setSAnchorEl(!SanchorEl ? e.currentTarget : null);
                    }}
                  >
                    {item.termLabel}
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
        onClick={(e) => e.stopPropagation()}
      >
        <Card interactive className="sub-popper">
          <div className="terms-list">
            {childDataArr()?.map((item) => {
              return (
                <li key={item.label}>
                  <Button value={item.label} className="term-item">
                    <span className="sub-term-text">{item.label}</span>
                    <Pencil
                      className="edit-Icon"
                      onClick={() => {
                        setChildTermValue(item.label);
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
        onClick={(e) => e.stopPropagation()}
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
};
