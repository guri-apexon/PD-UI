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

  useEffect(() => {
    setAnchorEl(enrichedTarget || null);
    if (!enrichedTarget) setSelectedTerm(null);
  }, [enrichedTarget]);
  return (
    <div>
      <Popper open={!!anchorEl} anchorEl={anchorEl}>
        <Card interactive>
          <div className="terms-list">
            {clinicalTerms.map((item) => {
              return (
                <li key={item.value}>
                  <Button
                    className="term-item"
                    onMouseOver={(e) => {
                      setSelectedTerm(item.text);
                      setSAnchorEl(!SanchorEl ? e.currentTarget : null);
                    }}
                    value={item.value}
                  >
                    {item.text}
                    <ArrowRight />
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
            {clinicalTerms
              .find((x) => x.text === selectedTerm)
              ?.map((item) => {
                return (
                  <li key={item.value}>
                    <Button value={item.value} className="term-item">
                      {item.text}
                      <Pencil className="edit-Icon" />
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
