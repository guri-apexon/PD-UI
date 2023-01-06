import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'apollo-react/components/Button';
import Card from 'apollo-react/components/Card';
import Popper from 'apollo-react/components/Popper';
import Typography from 'apollo-react/components/Typography';
import Pencil from 'apollo-react-icons/Pencil';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import './MedicalTerm.scss';

const clinicalTerms = [
  {
    value: 'Synonims',
    text: 'Synonims',
    data: [{ value: 'Euismod' }, { value: 'Molestie' }, { value: 'Luptatum' }],
  },
  { value: 'Clinical Terms', text: 'Clinical Terms' },
  { value: 'Ontology', text: 'Ontology' },
  {
    value: 'Prefered Term',
    text: 'Preferred Term',
    data: [{ value: 'Euismod' }, { value: 'Molestie' }, { value: 'Luptatum' }],
  },
  { value: 'Classification', text: 'Classification' },
];
function MedicalTerm({ enrichedTarget }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [SanchorEl, setSAnchorEl] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const childDataArr = () => {
    return clinicalTerms.find((x) => x.text === selectedTerm)?.data;
  };
  const editItem = () => {
    console.log('editItem');
  };
  useEffect(() => {
    setAnchorEl(enrichedTarget || null);
    if (!enrichedTarget) setSelectedTerm(null);
  }, [enrichedTarget]);
  return (
    <div className="enriched-menu-wrapper">
      <Popper open={!!anchorEl} anchorEl={anchorEl}>
        <Card interactive className="main-popper">
          <div className="terms-list">
            {clinicalTerms.map((item) => {
              const isActive = selectedTerm === item.text && item.data?.length;
              return (
                <li key={item.value}>
                  <Button
                    className="term-item"
                    onClick={(e) => {
                      setSelectedTerm(item.text);
                      setSAnchorEl(!SanchorEl ? e.currentTarget : null);
                    }}
                    value={item.value}
                  >
                    {item.text}
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
                <li key={item.value}>
                  <Button value={item.value} className="term-item">
                    {item.value}
                    <Pencil className="edit-Icon" onClick={editItem} />
                  </Button>
                </li>
              );
            })}
          </div>
        </Card>
      </Popper>
    </div>
  );
}

export default MedicalTerm;

MedicalTerm.propTypes = {
  enrichedTarget: PropTypes.isRequired,
};
